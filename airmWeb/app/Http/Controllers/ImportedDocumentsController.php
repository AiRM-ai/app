<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\ImportedDocuments;
use Illuminate\Support\Facades\Auth;

class ImportedDocumentsController extends Controller
{
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
        return ($documentsByUser);
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
            'document_name' => 'required|string|max:255',
        ]);

        // Get the currently authenticated user
        //
        // The `auth` middleware on your route ensures that only logged-in
        // users can even reach this code.
        $user = Auth::user();

        if (!$user) {
            // Handle cases where no user is logged in, e.g., redirect to login
            return redirect('/login');
        }

        // echo $user->username;

        // Create and populate the new database record ---
        //// OLD FOR USERNAME: auth()->id();
        //// $username = $user->name;
        $username = auth()->user()->name;

        $document = new ImportedDocuments();
        $document->username      = $username; // Get username from the logged-in user
        $document->document_name = $validated['document_name']; // Use the validated name

        // Save the record to the database:
        //
        // The `save()` method performs the INSERT query.
        // The `created_at` timestamp is automatically filled in by Laravel.
        $document->save();

        // Send a successful response back to React
        //
        // This confirms to the frontend that the operation worked.
        // The 201 status code means "Resource Created".
        return response()->json([
            'message' => 'Document record saved successfully!',
        ], 201);
    }
}
