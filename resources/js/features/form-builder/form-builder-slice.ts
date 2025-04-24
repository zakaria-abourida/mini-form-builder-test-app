import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

type FormField = {
    id: string;
    form_id: number;
    label: string;
    type: string;
    required: boolean;
    options?: string[];
    placeholder?: string;
    order: number;
};

type Form = {
    id: number;
    title: string;
    description?: string;
    bg_color: string;
    created_at: string;
    updated_at: string;
    is_active: boolean;
    fields: FormField[];
};

interface NewElementPayload {
    label: string;
    type: string;
    required: boolean;
    options?: string[];
    placeholder?: string;
}

interface FormBuilderState {
    elements: { label: string; type: string }[];
    newElements: FormField[];
    showFormTitleInput: boolean;
    bGColor: string;
    formTitle: string;
    loading: boolean;
    forms: Form[];
}

const initialState: FormBuilderState = {
    elements: [
        { label: 'Text Input', type: 'text_input' },
        { label: 'Textarea', type: 'textarea' },
        { label: 'Number Input', type: 'number_input' },
        { label: 'Email Input', type: 'email_input' },
        { label: 'Password Input', type: 'password_input' },
        { label: 'Date Picker', type: 'date_picker' },
        { label: 'Checkbox', type: 'checkbox' },
        { label: 'Radio Button', type: 'radio_button' },
        { label: 'Select Dropdown', type: 'select' },
        { label: 'Switch', type: 'switch' },
        { label: 'Range Slider', type: 'range_slider' },
        { label: 'Button', type: 'button' },
        { label: 'Paragraph', type: 'paragraph' },
    ],
    newElements: [],
    showFormTitleInput: true,
    bGColor: 'bg-white',
    formTitle: '',
    loading: false,
    forms: [],
};

const formBuilderSlice = createSlice({
    name: 'formBuilder',
    initialState,
    reducers: {
        addNewElement(state, action: PayloadAction<NewElementPayload>) {
            const newElement: FormField = {
                id: uuidv4(),
                form_id: 0,
                label: action.payload.label.trim(),
                type: action.payload.type,
                required: action.payload.required,
                options: action.payload.options ?? [],
                placeholder: action.payload.placeholder ?? '',
                order: state.newElements.length + 1,
            };

            state.newElements.push(newElement);
        },

        deleteElement(state, action: PayloadAction<string>) {
            state.newElements = state.newElements.filter((element) => element.id !== action.payload);
        },

        toggleFormTitleInputVisibility(state) {
            state.showFormTitleInput = !state.showFormTitleInput;
        },

        setColorBG(state, action: PayloadAction<string>) {
            state.bGColor = action.payload;
        },

        setFormTitle(state, action: PayloadAction<string>) {
            state.formTitle = action.payload;
        },

        resetBuilder(state) {
            state.newElements = [];
            state.formTitle = '';
            state.bGColor = 'bg-white';
            state.showFormTitleInput = true;
        },

        setForms(state, action: PayloadAction<Form[]>) {
            state.forms = action.payload;
        },
    },
});

export const { addNewElement, deleteElement, toggleFormTitleInputVisibility, setColorBG, setFormTitle, resetBuilder, setForms } =
    formBuilderSlice.actions;

export default formBuilderSlice.reducer;
