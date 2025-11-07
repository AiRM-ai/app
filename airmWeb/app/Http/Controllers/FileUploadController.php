<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FileUploadController extends Controller
{
    public function store(Request $request)
    {
        if ($request->hasFile('files')) {
            $files = $request->file('files');
            foreach ($files as $file) {
                // This is where the file is actually stored!
                $path = $file->store('uploads', 'public');
            }

            // After storing, the files will be in:
            // your_project/storage/app/public/uploads
            
            return response()->json(['message' => 'Files uploaded successfully']);
        }

        return response()->json(['message' => 'No files were uploaded'], 400);
    }
}