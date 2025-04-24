import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (formData: { label: string; required: boolean; placeholder: string; options?: { label: string; value: string }[] }) => void;
    type: string;
}

const ModalForm: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, type }) => {
    const [formData, setFormData] = useState({
        label: '',
        required: false,
        placeholder: '',
        options: [] as { label: string; value: string }[],
    });

    const [currentOptionLabel, setCurrentOptionLabel] = useState('');
    const [currentOptionValue, setCurrentOptionValue] = useState('');
    const { t } = useTranslation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleAddOption = () => {
        if (currentOptionLabel.trim() !== '' && currentOptionValue.trim() !== '') {
            setFormData((prev) => ({
                ...prev,
                options: [...prev.options, { label: currentOptionLabel, value: currentOptionValue }],
            }));
            setCurrentOptionLabel('');
            setCurrentOptionValue('');
        } else {
            alert(t('both_label_and_value_required'));
        }
    };

    const handleSubmit = () => {
        if (
            (type === 'text_input' || type === 'textarea' || type === 'email_input' || type === 'password_input' || type === 'number_input') &&
            !formData.placeholder.trim()
        ) {
            alert(t('placeholder_required'));
            return;
        }

        if ((type === 'radio_button' || type === 'select') && formData.options.length < 2) {
            alert(t('please_add_at_least_two_option'));
            return;
        }
        if (type === 'checkbox' && formData.options.length === 0) {
            alert(t('please_add_at_least_one_option'));
            return;
        }

        onConfirm(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="w-full">
                                    <h3 className="mb-4 text-base font-semibold text-gray-900" id="modal-title">
                                        {t('create_field')}
                                    </h3>
                                    <div className="space-y-4">
                                        {(type === 'text_input' ||
                                            type === 'email_input' ||
                                            type === 'password_input' ||
                                            type === 'number_input') && (
                                            <>
                                                <input
                                                    type="text"
                                                    name="label"
                                                    placeholder={t('label')}
                                                    value={formData.label}
                                                    onChange={handleChange}
                                                    className="w-full rounded-md border px-3 py-2 text-sm"
                                                />
                                                <input
                                                    type="text"
                                                    name="placeholder"
                                                    placeholder={t('placeholder')}
                                                    value={formData.placeholder}
                                                    onChange={handleChange}
                                                    className="w-full rounded-md border px-3 py-2 text-sm"
                                                />
                                            </>
                                        )}

                                        {type === 'textarea' && (
                                            <>
                                                <input
                                                    type="text"
                                                    name="label"
                                                    placeholder={t('label')}
                                                    value={formData.label}
                                                    onChange={handleChange}
                                                    className="w-full rounded-md border px-3 py-2 text-sm"
                                                />
                                                <textarea
                                                    name="placeholder"
                                                    placeholder={t('placeholder')}
                                                    value={formData.placeholder}
                                                    onChange={(e) => setFormData((prev) => ({ ...prev, placeholder: e.target.value }))}
                                                    className="w-full rounded-md border px-3 py-2 text-sm"
                                                    rows={4}
                                                />
                                            </>
                                        )}

                                        {type === 'date_picker' && (
                                            <input
                                                type="text"
                                                name="label"
                                                placeholder={t('label')}
                                                value={formData.label}
                                                onChange={handleChange}
                                                className="w-full rounded-md border px-3 py-2 text-sm"
                                            />
                                        )}

                                        {type === 'range_slider' && (
                                            <>
                                                <input
                                                    type="text"
                                                    name="label"
                                                    placeholder={t('label')}
                                                    value={formData.label}
                                                    onChange={handleChange}
                                                    className="w-full rounded-md border px-3 py-2 text-sm"
                                                />
                                                <input
                                                    type="text"
                                                    name="placeholder"
                                                    placeholder={t('default_value')}
                                                    value={formData.placeholder}
                                                    onChange={handleChange}
                                                    className="w-full rounded-md border px-3 py-2 text-sm"
                                                />
                                            </>
                                        )}

                                        {type === 'paragraph' && (
                                            <textarea
                                                name="label"
                                                placeholder={t('content')}
                                                value={formData.label}
                                                onChange={(e) => setFormData((prev) => ({ ...prev, label: e.target.value }))}
                                                className="w-full rounded-md border px-3 py-2 text-sm"
                                                rows={4}
                                            />
                                        )}

                                        <div className="flex items-center gap-4">
                                            <span className="text-sm font-medium text-gray-700">{t('required')}:</span>
                                            <label className="flex items-center gap-1 text-sm">
                                                <input
                                                    type="radio"
                                                    name="required"
                                                    checked={formData.required === true}
                                                    onChange={() => setFormData((prev) => ({ ...prev, required: true }))}
                                                />
                                                {t('yes')}
                                            </label>
                                            <label className="flex items-center gap-1 text-sm">
                                                <input
                                                    type="radio"
                                                    name="required"
                                                    checked={formData.required === false}
                                                    onChange={() => setFormData((prev) => ({ ...prev, required: false }))}
                                                />
                                                {t('no')}
                                            </label>
                                        </div>

                                        {(type === 'radio_button' || type === 'checkbox' || type === 'select') && (
                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700">{t('option_list')}:</label>
                                                <div className="flex flex-col gap-2 sm:flex-row">
                                                    <input
                                                        type="text"
                                                        placeholder={t('add_option_label')}
                                                        value={currentOptionLabel}
                                                        onChange={(e) => setCurrentOptionLabel(e.target.value)}
                                                        className="w-full rounded-md border px-3 py-2 text-sm"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder={t('add_option_value')}
                                                        value={currentOptionValue}
                                                        onChange={(e) => setCurrentOptionValue(e.target.value)}
                                                        className="w-full rounded-md border px-3 py-2 text-sm"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={handleAddOption}
                                                        className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-600"
                                                    >
                                                        {t('add')}
                                                    </button>
                                                </div>
                                                {formData.options.length > 0 && (
                                                    <ul className="list-disc pl-5 text-sm text-gray-700">
                                                        {formData.options.map((option, index) => (
                                                            <li key={index}>
                                                                <strong>{option.label}</strong> —{' '}
                                                                <span className="text-gray-500">{option.value}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        )}

                                        {type === 'switch' && (
                                            <input
                                                type="text"
                                                name="label"
                                                placeholder={t('label')}
                                                value={formData.label}
                                                onChange={handleChange}
                                                className="w-full rounded-md border px-3 py-2 text-sm"
                                            />
                                        )}

                                        {type === 'button' && (
                                            <input
                                                type="text"
                                                name="label"
                                                placeholder={t('label')}
                                                value={formData.label}
                                                onChange={handleChange}
                                                className="w-full rounded-md border px-3 py-2 text-sm"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                            >
                                {t('confirm')}
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                                {t('cancel')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalForm;
