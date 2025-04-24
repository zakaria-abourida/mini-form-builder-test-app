import { useAppDispatch } from '@/app/hooks';
import { RootState } from '@/app/store';
import { toggleFormTitleInputVisibility } from '@/features/form-builder/form-builder-slice';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

function ToggleVisibility() {
    const dispatch = useAppDispatch();

    const { t } = useTranslation();

    const showInput = useSelector((state: RootState) => state.formBuilder.showFormTitleInput);

    const handleToggleVisibility = () => {
        dispatch(toggleFormTitleInputVisibility());
    };

    return (
        <>
            <label className="text-muted-foreground block text-xl">{t('form_label')}</label>
            <div className="flex items-center gap-2">
                <button
                    onClick={handleToggleVisibility}
                    className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors ${
                        showInput ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                >
                    <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            showInput ? 'translate-x-6' : 'translate-x-1'
                        }`}
                    />
                </button>
                <span className="text-sm font-medium text-gray-700">{showInput ? t('turn_off') : t('turn_on')}</span>
            </div>
        </>
    );
}

export default ToggleVisibility;
