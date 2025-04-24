<?php

namespace App\Http\Controllers;

use App\Models\Form;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FormController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $forms = $user->forms()->with('fields')->get();

        return Inertia::render('dashboard', [
            'forms' => $forms,
        ]);
    }

    public function create()
    {
        return Inertia::render('forms/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'nullable|string',
            'bg_color' => 'nullable|string',
        ]);


        $form = Form::create([
            'title' => $validated['title'],
            'bg_color' => $validated['bg_color'],
            'user_id' => auth()->id()
        ]);


        return Inertia::render('dashboard', [
            'success' => 'Form successfully created!',
            'form_id' => $form->id,
        ]);
    }

    public function edit(Form $form)
    {
        return Inertia::render('form/edit', ['form' => $form]);
    }

    public function update(Request $request, Form $form)
    {
        $request->validate([
            'title' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $form->update($request->only('title', 'description'));

        return redirect()->back()->with('success', 'Form successfully created!');
    }

    public function destroy(Form $form)
    {
        $form->delete();
        return redirect()->route('forms.index');
    }
}
