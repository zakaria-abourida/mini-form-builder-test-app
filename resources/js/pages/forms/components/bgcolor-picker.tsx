import { useAppDispatch } from '@/app/hooks';
import { RootState } from '@/app/store';
import { setColorBG } from '@/features/form-builder/form-builder-slice';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

function BackgroundColorPicker() {
    const dispatch = useAppDispatch();
    const currentColor = useSelector((state: RootState) => state.formBuilder.bGColor);
    const { t } = useTranslation();

    const colors = [
        { color: 'bg-white', label: 'White' },
        { color: 'bg-red-400', label: 'Red' },
        { color: 'bg-blue-400', label: 'Blue' },
        { color: 'bg-green-400', label: 'Green' },
    ];

    const handleColorChange = (color: string) => {
        console.log('Selected color:', color);
        console.log('Selected color:', color);
        dispatch(setColorBG(color));
    };

    return (
        <div className="mt-5 mb-4">
            <h3 className="text-sm font-medium text-gray-700"> {t('background_color')}</h3>
            <div className="mt-2 flex gap-4">
                {colors.map(({ color, label }) => (
                    <div
                        key={color}
                        className={`flex h-7 w-7 items-center justify-center rounded-full ${
                            currentColor === color ? 'border-black-500 border-4' : 'border border-gray-300'
                        }`}
                    >
                        <div onClick={() => handleColorChange(color)} className={`h-5 w-5 cursor-pointer rounded-full ${color}`} title={label}></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BackgroundColorPicker;
