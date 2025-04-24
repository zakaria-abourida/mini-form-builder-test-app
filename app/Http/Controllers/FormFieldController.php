<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\FormField;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

use Inertia\Inertia;



class FormFieldController extends Controller
{
    public function store(Request $request, $formId)
    {
        $request->validate([
            // 'label' => 'required|string',
            // 'name' => 'required|string',
            // 'type' => 'required|string',
            // 'options' => 'nullable|array',
            // 'required' => 'boolean',
            // 'order' => 'nullable|integer',
        ]);

        $fields = $request->input('fields', []);

        // dd($request);
        foreach ($fields as $fieldData) {
            FormField::create([
                'form_id' => $formId,
                'uuid' => Str::uuid()->toString(),
                'label' => $fieldData['label'],
                'type' => $fieldData['type'],
                'options' => $fieldData['options'] ?? [],
                'required' => $fieldData['required'] ?? false,
                'order' => $fieldData['order'] ?? 0,
            ]);
        }


        return Inertia::location('/dashboard');
    }

    public function update(Request $request, FormField $field)
    {
        $request->validate([
            'label' => 'required|string',
            'name' => 'required|string',
            'type' => 'required|string',
            'options' => 'nullable|array',
            'required' => 'boolean',
            'order' => 'nullable|integer',
        ]);

        $field->update($request->all());

        return redirect()->back();
    }

    public function destroy(FormField $field)
    {
        $field->delete();
        return redirect()->back();
    }
}
