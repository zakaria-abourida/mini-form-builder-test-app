import { Link, usePage } from '@inertiajs/react';
import { Eye, Plus } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppLayout from '../layouts/app-layout';
import ModalFormDetail from './forms/components/modal-form-detail';

export default function Dashboard() {
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
        name: string;
        required: boolean;
        options?: string[];
        placeholder?: string;
        order: number;
    };

    const { forms } = usePage<{ forms: Form[] }>().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedForm, setSelectedForm] = useState<Form | null>(null);
    const { t } = useTranslation();

    const openModal = (form: Form) => {
        setSelectedForm(form);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedForm(null);
    };

    const sortedForms = [...forms].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return (
        <AppLayout>
            <div className="relative m-10 overflow-x-auto shadow-md sm:rounded-lg">
                <div className="m-4 flex justify-end">
                    <Link
                        href="/forms/create"
                        className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 focus:outline-none"
                    >
                        <Plus className="h-4 w-4" />
                        Add New
                    </Link>
                </div>

                <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                    <thead className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                {t('title')}
                            </th>
                            <th scope="col" className="px-6 py-3">
                                {t('background_color')}
                            </th>
                            <th scope="col" className="px-6 py-3">
                                {t('created_at')}
                            </th>
                            <th scope="col" className="px-6 py-3">
                                {t('action')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedForms.map((form, index) => (
                            <tr
                                key={index}
                                className="border-b border-gray-200 odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800"
                            >
                                <th scope="row" className="px-6 py-4 text-xl whitespace-nowrap text-gray-900 dark:text-white">
                                    {form.title ?? t('untitled_fo')}
                                </th>
                                <td className="px-6 py-4">
                                    <div className="mt-5 mb-4">
                                        <div className="mt-2 flex gap-4">
                                            <div className="border-black-500 flex h-7 w-7 items-center justify-center rounded-full border-4">
                                                <div className={`h-5 w-5 cursor-pointer rounded-full ${form.bg_color}`}></div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {new Date(form.created_at).toLocaleDateString('fr-FR')}{' '}
                                    {new Date(form.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => openModal(form)}
                                        className="inline-flex cursor-pointer items-center font-medium text-blue-600 hover:underline dark:text-blue-500"
                                    >
                                        {t('show_form')} <Eye className="ml-1" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedForm && <ModalFormDetail isOpen={isModalOpen} onClose={closeModal} form={selectedForm} />}
        </AppLayout>
    );
}
