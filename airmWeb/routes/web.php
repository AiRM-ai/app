<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

// My Controllers:
use App\Http\Controllers\ImportedDocumentsController;
use App\Http\Controllers\ItemsListController;
use App\Http\Controllers\PredictionController;

// NOTES
// return view("folderName.viewName");
// tells php to return the view from resources/views/folderName/viewName
// no need to include blade.php

Route::get('/', function () 
{
    return view('website.homepage');
});

Route::get('/home', function () 
{
    return view('website.homepage');
});

Route::get('/about', function () {
    return view('website.about.about');
});

Route::get('/contact', function () {
    return view('website.contact');
});

Route::get('/product', function () {
    return view('website.product.product');
});

Route::get('/team', function () {
    return view('website.about.team');
});

Route::get('/tech', function () {
    return view('website.about.tech');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () 
{
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// --------------------------------
// APPLICATION ROUTES
Route::get('/app', function () 
{
    return view('application.applicationDashboard');
})->middleware(['auth', 'verified'])->name('application.applicationDashboard');

// --------------------------------
// API ROUTES

// FILES:
// For File Upload
Route::post('/api/documents/upload', [ImportedDocumentsController::class, 'storeDocumentData'])->middleware('auth', 'verified');
// For fetching files (by user)
Route::get('/api/documents/fetch-documents-by-user', [ImportedDocumentsController::class, 'fetchDocumentsByUser'])->middleware('auth', 'verified');
// For getting the file path (by row/document id)
Route::get('api/documents/fetch-file-path-by-id', [ImportedDocumentsController::class, 'fetchFilePathByRowId'])->middleware('auth', 'verified');
//Route::get('/api/documents/fetch-file-path-by-id', function() {return "HELLO FROM route /fetch-file-path-by-id";})->middleware('auth', 'verified'); // testing

// ITEMS:
// For adding items
Route::post('/data/add-item', [ItemsListController::class, 'addItem'])->middleware('auth', 'verified');
// For deleting items
Route::post('/data/delete-item', [ItemsListController::class, 'deleteItem'])->middleware('auth', 'verified');
// For fetching/getting items (also by user obv)
Route::get('/data/get-items-by-user', [ItemsListController::class, 'fetchItemsByUser'])->middleware('auth', 'verified');
// For fetching item by item id
Route::get('/data/get-item-by-id', [ItemsListController::class, 'fetchItemByItemId'])->middleware('auth', 'verified');

// MODEL PREDICTION ROUTES
// This creates the URL: http://your-site/predictions/generate/{id}
Route::prefix('predictions')->group(function () 
{
    Route::get('/generate/{id}', [PredictionController::class, 'predict']);
});


// --------------------------------

require __DIR__.'/auth.php';
