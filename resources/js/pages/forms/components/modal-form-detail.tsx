import { RootState } from '@/app/store';
import { toggleFormTitleInputVisibility } from '@/features/form-builder/form-builder-slice';
import { renderFormElement } from '@/helpers/form-builder/render-form-element';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    form: Form;
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

type FormField = {
    id: number;
    form_id: number;
    label: string;
    type: string;
    required: boolean;
    options?: string[];
    placeholder?: string;
    order: number;
};

const ModalFormDetail: React.FC<ModalProps> = ({ isOpen, onClose, form }) => {
    const dispatch = useDispatch();
    const elements = useSelector((state: RootState) => state.formBuilder.elements);
    const newElements = useSelector((state: RootState) => state.formBuilder.newElements);

    const handleToggleVisibility = () => {
        dispatch(toggleFormTitleInputVisibility());
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/75 transition-opacity">
            <div className="relative m-100 flex max-w-6xl flex-col items-center justify-center rounded-lg bg-white p-4 shadow-lg">
                <div className={`border-black-500 h-150 w-150 ${form.bg_color} max-w-full rounded-lg border-2 p-8 shadow-md`}>
                    <input
                        type="text"
                        defaultValue={form.title ?? 'Untitled element'}
                        placeholder="Untitled element"
                        className="mt-4 border-b-2 border-gray-300 pb-2 text-2xl font-bold text-black focus:outline-none"
                    />

                    <div className="mt-6">
                        <div className="space-y-2">
                            {form.fields.map((element, index) => (
                                <div key={index}>
                                    {renderFormElement(
                                        element,
                                        index,
                                        () => {},
                                        () => {},
                                        false,
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="right-4 bottom-4 m-4 inline-flex w-50 cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 focus:outline-none"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ModalFormDetail;
