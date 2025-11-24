<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class PredictionController extends Controller
{
    public function getPrediction(Request $request)
    {
        $csvContent = $request->input('csv_content'); // The raw CSV string
        $fileName = $request->input('file_name', 'data.csv'); // The original file name

        $fastApiUrl = 'http://127.0.0.1:8000/model/prediction'; 
      // in the prediction.py file its post@model/prediction 

        try {
          
            
            $response = Http::attach(
                'file', // This must match `file: UploadFile = File(...)` in your FastAPI route
                $csvContent,
                $fileName
            )->post($fastApiUrl);

            // Forward response back to the frontend
            return response()->json($response->json(), $response->status());

        } catch (\Exception $e) {
            
            return response()->json([
                'error' => 'Failed to connect to the prediction service.',
                'details' => $e->getMessage()
            ], 503);
        }
    }
}