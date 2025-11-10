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

        $username = $user->username;
        
        // Make an eloquent
        $documentsByUser = ImportedDocuments::where("username", $username)->get();
    }
}
