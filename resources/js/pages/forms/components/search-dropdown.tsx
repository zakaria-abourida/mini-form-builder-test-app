import { addNewElement } from '@/features/form-builder/form-builder-slice';
import { t } from 'i18next';
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import ModalForm from './custum-element-form/modal-form';

interface Option {
    label: string;
    value: string;
    title: string;
    required: boolean;
    placeholder: string;
    type: string;
}

interface Props {
    options: Option[];
}

const SearchDropdown: React.FC<Props> = ({ options }) => {
    const dispatch = useDispatch();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchQuery.toLowerCase()));

    const handleOptionClick = (option: Option) => {
        setSelectedOption(option);
        setIsModalOpen(true);
        setSearchQuery('');
        setIsDropdownOpen(false);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleFormSubmit = (formData: { label: string; required: boolean; placeholder: string }) => {
        if (selectedOption) {
            const mergedData = { ...selectedOption, ...formData };

            dispatch(addNewElement(mergedData));
        }
        setIsModalOpen(false);
    };

    return (
        <div className="relative mt-5 w-fit">
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex cursor-pointer items-center gap-2 rounded-md border-2 border-dashed border-blue-500 px-4 py-2 text-sm text-blue-500 hover:bg-blue-50"
            >
                <span className="text-base">+</span> {t('add_new_element', 'Add new element')}
            </button>

            {isDropdownOpen && (
                <div className="absolute z-50 mt-2 w-90 rounded-md border border-gray-200 bg-white shadow-lg">
                    <div className="m-3 flex items-center rounded border border-black px-3 py-2">
                        <input
                            type="text"
                            placeholder={t('search')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full border-none p-1 text-sm text-black focus:outline-none"
                        />
                        <FiSearch className="ml-2 text-gray-400" size={25} />
                    </div>
                    <ul className="max-h-48 overflow-y-auto text-sm">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <li
                                    key={option.type}
                                    onClick={() => handleOptionClick(option)}
                                    className="cursor-pointer px-4 py-2 text-black hover:bg-gray-100"
                                >
                                    {option.label}
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-2 text-gray-400">No matches found</li>
                        )}
                    </ul>
                </div>
            )}

            {isModalOpen && selectedOption && (
                <ModalForm isOpen={isModalOpen} onClose={handleModalClose} onConfirm={handleFormSubmit} type={selectedOption.type} />
            )}
        </div>
    );
};

export default SearchDropdown;
