<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

// My Controllers:
use App\Http\Controllers\ImportedDocumentsController;

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
// For File Upload
Route::post('/documents/save-metadata', [ImportedDocumentsController::class, 'storeDocumentData'])->middleware('auth', 'verified');

// --------------------------------

require __DIR__.'/auth.php';
