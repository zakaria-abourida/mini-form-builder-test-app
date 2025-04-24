import React, { useRef, useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';

interface DropdownProps {
    onEdit: () => void;
    onDelete: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({ onEdit, onDelete }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const excludedElementRef = useRef(null);

    const handleClick = (event: MouseEvent) => {
        if (excludedElementRef.current && excludedElementRef.current.contains(event.target as Node)) {
            return;
        }
        setIsDropdownOpen(false);
    };

    document.addEventListener('click', handleClick);

    return (
        <div ref={excludedElementRef} className="relative">
            <button
                className="flex h-9.5 w-9.5 cursor-pointer items-center justify-center rounded border border-gray-300 bg-white hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                <FiMoreVertical className="text-gray-600" size={25} />
            </button>

            {isDropdownOpen && (
                <div className="absolute right-0 z-10 m-5 w-32 rounded bg-white shadow-md">
                    <ul className="py-1">
                        <li
                            onClick={() => {
                                onDelete();
                                setIsDropdownOpen(false);
                            }}
                            className="cursor-pointer px-4 py-2 text-sm text-red-500 hover:bg-red-100"
                        >
                            Delete
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
