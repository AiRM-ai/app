<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ImportedDocuments extends Model
{
    use HasFactory;

    // Table to store the imported documents
    protected $table = "imported_documents";

    // These are the attributes that are mass assignable:
    /**
     * 'username', // username of which kid uploaded the file
     * 'document_name',  // original file name
     * 'file', // file object - not stored in database - simply for parsing the metadata
     * 'file_path', // stored file path on the laravel server: storage/public/app
     * 
     * @var array
     */
    protected $fillable = [
        'username',
        'file_name', 
        'file_path',
    ];
}
