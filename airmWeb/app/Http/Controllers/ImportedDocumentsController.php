<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\ImportedDocuments;
use Exception;
use Illuminate\Support\Facades\Auth;

class ImportedDocumentsController extends Controller
{
    public function fetchFilePathByRowId(Request $request)
    {
        // Get the 'id' from the URL query string (?id=...)
        $rowId = $request->input('id'); 
        
        if (!$rowId) 
        {
            return response()->json(['error' => 'ID is missing'], 400);
        }

        // Make an eloquent
        $document = ImportedDocuments::where("id", $rowId)->first();

        if (!$document) 
        {
            return response()->json(['error' => 'Document not found'], 404);
        }
 
        return response()->json(['file_path' => $document->file_path]);
    }

    public function fetchRowByUser(Request $request)
    {
        // validate request
        $validated = $request->validate([
            'id' => 'required', 
        ]);

        $id = $request->id;
        
        // Make an eloquent
        $rowById = ImportedDocuments::where("username", $id)->get();

        // Return a view (and pass parameters to this view)
        return (json_encode($rowById));
    }

    public function fetchDocumentsByUser()
    {
        // Get the user object
        $user = Auth::user();

        if (!$user) {
            // Handle cases where no user is logged in, e.g., redirect to login
            return redirect('/login');
        }

        $username = auth()->user()->name;
        
        // Make an eloquent
        $documentsByUser = ImportedDocuments::where("username", $username)->get();

        // Return a view (and pass parameters to this view)
        return (json_encode($documentsByUser));
    }

    /**
     * Store a  created document record in storage (local).
     * This method receives the request from the React component.
     * posted to /documents/save-metadata
     */
    public function storeDocumentData(Request $request)
    {
        // Validate the incoming data
        //
        // This is a crucial security step. It ensures the 'document_name'
        // field exists, is a string, and isn't excessively long.
        $validated = $request->validate([
            'file' => 'required|file|mimes:csv,text|max:2048', // for the actual file
        ]);

        // Get the currently authenticated user
        //
        // The `auth` middleware on your route ensures that only logged-in
        // users can even reach this code.
        $user = Auth::user();

        // For the file
        $file = $request->file('file');

        if (!$user) {
            // Handle cases where no user is logged in, e.g., redirect to login
            return redirect('/login');
        }

        try 
        {
            // Create and populate the new database record ---
            //// OLD FOR USERNAME: auth()->id();
            //// $username = $user->name;
            $username = auth()->user()->name;

            // for the File Path
            $file_path = $file->store('imported_documents', 'public');
            $file_name = $file->getClientOriginalName();
            

            $document =                     new ImportedDocuments();
            $document->username =           $username; // Get username from the logged-in user
            $document->file_name =          $file_name; // Use the validated name
            $document->file_path =          $file_path;  // for the path where it was stored

            // Save the record to the database:
            //
            // The `save()` method performs the INSERT query.
            // The `created_at` timestamp is automatically filled in by Laravel.
            $document->save();

            // Send a successful response back to backend
            //
            // This confirms to the frontend that the operation worked.
            // The 201 status code means "Resource Created".
            return response()->json([
                'message' => 'Document upload saved successfully!',
            ], 201);
        }
        catch (Exception $e)
        {
            return response()->json([
                'message' => 'Error occurred during the file upload',
            ], 500);
        }

    }
}
