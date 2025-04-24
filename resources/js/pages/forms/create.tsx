import { Head } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { useTranslation } from 'react-i18next';
import BackgroundColorPicker from './components/bgcolor-picker';
import FormBuilder from './components/form-builder';
import PublishButton from './components/publish-button';
import ToggleVisibility from './components/toggle-title';

// import CreateForm from './test';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create new form',
        href: 'forms/create',
    },
];

export default function CreateForm() {
    const { t } = useTranslation();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create form" />

            <div className="mt-15 mr-30 ml-30 flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex flex-wrap gap-4">
                    <FormBuilder />

                    <div className="flex flex-col space-y-4">
                        <div className={`border-black-500 inline-block gap-4 self-start rounded-lg border-2 p-12 shadow-md`}>
                            <ToggleVisibility />
                            <BackgroundColorPicker />
                        </div>
                        <PublishButton />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
