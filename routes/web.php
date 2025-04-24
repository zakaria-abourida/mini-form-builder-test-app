<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FormController;
use App\Http\Controllers\FormFieldController;


Route::get('/', function (): mixed {
    return redirect('/login');
})->name('home');


Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', [FormController::class, 'index'])->name('dashboard');


    Route::get('/forms/create', [FormController::class, 'create'])->name('forms.create');
    Route::post('/forms', [FormController::class, 'store'])->name('forms.store');


    Route::post('/forms/{form}/fields', [FormFieldController::class, 'store'])->name('form-fields.store');
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
