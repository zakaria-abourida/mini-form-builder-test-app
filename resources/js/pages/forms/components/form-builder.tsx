import { RootState } from '@/app/store';
import { addNewElement, deleteElement, setFormTitle, toggleFormTitleInputVisibility } from '@/features/form-builder/form-builder-slice';
import { renderFormElement } from '@/helpers/form-builder/render-form-element';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import SearchDropdown from './search-dropdown';

function FormBuilder() {
    const dispatch = useDispatch();
    const elements = useSelector((state: RootState) => state.formBuilder.elements);
    const newElements = useSelector((state: RootState) => state.formBuilder.newElements);

    const handleAddOption = (newOption: {
        id: string;
        value: string;
        label: string;
        options?: string[];
        placeholder?: string;
        required?: boolean;
    }) => {
        dispatch(addNewElement(newOption));
    };
    const { t } = useTranslation();
    const handleDeleteElement = (id: string) => {
        dispatch(deleteElement(id));
    };

    const showInput = useSelector((state: RootState) => state.formBuilder.showFormTitleInput);

    const handleToggleVisibility = () => {
        dispatch(toggleFormTitleInputVisibility());
    };

    const currentColor = useSelector((state: RootState) => state.formBuilder.bGColor);
    const formTitle = useSelector((state: RootState) => state.formBuilder.formTitle);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFormTitle(e.target.value));
    };
    return (
        <div className={`border-black-500 ${currentColor} max-w-full flex-2 rounded-lg border-2 p-8 shadow-md sm:max-w-[72%]`}>
            {showInput && (
                <input
                    type="text"
                    value={formTitle}
                    placeholder={t('untitled_fo')}
                    onChange={handleTitleChange}
                    className="mt-4 border-b-2 border-gray-300 pb-2 text-2xl font-bold text-black focus:outline-none"
                />
            )}
            <div className="mt-6">
                <div className="space-y-2">
                    {newElements.map((element, index) => (
                        <div key={index}>
                            {renderFormElement(
                                element,
                                index,
                                () => {},
                                () => handleDeleteElement(element.id),
                                true,
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <SearchDropdown
                options={elements}
                onSelect={(selectedOption: {
                    id: string;
                    value: string;
                    label: string;
                    options?: string[];
                    placeholder?: string;
                    required?: boolean;
                }) => {
                    handleAddOption(selectedOption);
                }}
            />
        </div>
    );
}

export default FormBuilder;
