import { useAppDispatch } from '@/app/hooks';
import { formBuilderThunk } from '@/features/form-builder/form-builder-thunk';
import { t } from 'i18next';

function PublishButton() {
    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        dispatch(formBuilderThunk.sendFormAsync());
    };

    return (
        <div className="m-1">
            <button
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
            >
                {t('publish_form')}
            </button>
        </div>
    );
}

export default PublishButton;
