<?php

namespace App\Http\Controllers;

use App\Models\ImportedDocuments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PredictionController extends Controller
{
    /**
     * Trigger the ML Model for a specific document.
     * 
     * @param string $id The ID of the document to process
     */
    public function predict($id)
    {
        try 
        {
            // 1. Find the document record in your database
            $document = ImportedDocuments::where('id', $id)->first();

            if (!$document)
            {
                return response()->json([
                    "error" => "Document ID $id not found",
                ], 404);
            }
            // Get the path string directly from the database object
            $dbFilePath = $document->file_path;
            
            // Laravel storage usually looks like "uploads/file.csv"
            // But the internal system needs "C:\xampp\htdocs\storage\app\public\uploads\file.csv"
            
            // Fix: remove 'storage/' prefix if your DB saves it with that prefix
            $relativePath = str_replace('storage/', '', $dbFilePath);
            
            if (!Storage::disk('public')->exists($relativePath)) 
            {
                return response()->json([
                    'status' => 'error',
                    'message' => 'File exists in Database but not on Disk',
                    'path_tried' => $relativePath
                ], 404);
            }

            $absolutePath = Storage::disk('public')->path($relativePath);

            // ---------------------------------------------------------
            // 3. SEND TO PYTHON
            // ---------------------------------------------------------
            $fastApiUrl = env('ML_MODEL_URL', 'http://127.0.0.1:8010') . '/predict';

            $response = Http::timeout(60)->attach(
                'file', 
                fopen($absolutePath, 'r'), 
                basename($absolutePath)
            )->post($fastApiUrl);

            return $response->json();

        } 
        catch (\Exception $e) 
        {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}