import Dropdown from './button-dropdown';

type FormField = {
    id: number;
    form_id: number;
    label: string;
    type: string;
    required: boolean;
    options?: { label: string; value: string }[];
    placeholder?: string;
    order: number;
};

export function renderFormElement(
    element: FormField,
    index: number,
    onEdit: (index: number, value?: string) => void,
    onDelete: (index: number) => void,
    visibleEditElementButton?: boolean,
) {
    const renderElement = () => {
        switch (element.type) {
            case 'text_input':
                return (
                    <div className="flex w-full flex-col gap-2">
                        <label className="text-sm font-bold text-gray-700">
                            {element.label}
                            {element.required && <span className="text-red-500">*</span>}
                        </label>
                        <input
                            type="text"
                            placeholder={element.placeholder}
                            className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-black"
                            onChange={(e) => onEdit(index, e.target.value)}
                            required={element.required}
                        />
                    </div>
                );

            case 'number_input':
                return (
                    <div className="flex w-full flex-col gap-2">
                        <label className="text-sm font-bold text-gray-700">
                            {element.label}
                            {element.required && <span className="text-red-500">*</span>}
                        </label>
                        <input
                            type="number"
                            placeholder={element.placeholder}
                            className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-black"
                            onChange={(e) => onEdit(index, e.target.value)}
                            required={element.required}
                        />
                    </div>
                );

            case 'email_input':
                return (
                    <div className="flex w-full flex-col gap-2">
                        <label className="text-sm font-bold text-gray-700">
                            {element.label}
                            {element.required && <span className="text-red-500">*</span>}
                        </label>
                        <input
                            type="email"
                            placeholder={element.placeholder}
                            className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-black"
                            onChange={(e) => onEdit(index, e.target.value)}
                            required={element.required}
                        />
                    </div>
                );

            case 'password_input':
                return (
                    <div className="flex w-full flex-col gap-2">
                        <label className="text-sm font-bold text-gray-700">
                            {element.label}
                            {element.required && <span className="text-red-500">*</span>}
                        </label>
                        <input
                            type="password"
                            placeholder={element.placeholder}
                            className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-black"
                            onChange={(e) => onEdit(index, e.target.value)}
                            required={element.required}
                        />
                    </div>
                );

            case 'date_picker':
                return (
                    <div className="flex w-full flex-col gap-2">
                        <label className="text-sm font-bold text-gray-700">
                            {element.label}
                            {element.required && <span className="text-red-500">*</span>}
                        </label>
                        <input
                            type="date"
                            className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-black"
                            onChange={(e) => onEdit(index, e.target.value)}
                            required={element.required}
                        />
                    </div>
                );

            case 'textarea':
                return (
                    <div className="flex w-full flex-col gap-2">
                        <label className="text-sm font-bold text-gray-700">
                            {element.label}
                            {element.required && <span className="text-red-500">*</span>}
                        </label>
                        <textarea
                            placeholder={element.placeholder}
                            className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-black"
                            onChange={(e) => onEdit(index, e.target.value)}
                            required={element.required}
                            rows={4}
                        />
                    </div>
                );

            case 'checkbox':
                return (
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-700">
                            {element.label}
                            {element.required && <span className="text-red-500">*</span>}
                        </label>
                        <div className="flex flex-wrap gap-4">
                            {element.options?.map((option, optionIndex) => (
                                <div key={optionIndex} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id={`checkbox-${index}-${optionIndex}`}
                                        name={`checkbox-group-${index}`}
                                        value={option.value}
                                        className="h-4 w-4 cursor-pointer"
                                        onChange={(e) => onEdit(index, e.target.value)}
                                    />
                                    <label htmlFor={`checkbox-${index}-${optionIndex}`} className="text-sm text-black">
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'radio_button':
                return (
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-700">
                            {element.label}
                            {element.required && <span className="text-red-500">*</span>}
                        </label>
                        <div className="flex flex-wrap gap-4">
                            {element.options?.map((option, optionIndex) => (
                                <div key={optionIndex} className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        id={`radio-${index}-${optionIndex}`}
                                        name={`radio-group-${index}`}
                                        value={option.value}
                                        className="h-4 w-4 cursor-pointer"
                                        onChange={(e) => onEdit(index, e.target.value)}
                                    />
                                    <label htmlFor={`radio-${index}-${optionIndex}`} className="text-sm text-black">
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'select':
                return (
                    <div className="flex w-full flex-col gap-2">
                        <label className="text-sm font-bold text-gray-700">
                            {element.label}
                            {element.required && <span className="text-red-500">*</span>}
                        </label>
                        <select
                            className="rounded border border-gray-300 px-3 py-2 text-sm text-black"
                            onChange={(e) => onEdit(index, e.target.value)}
                            required={element.required}
                        >
                            <option value="">{element.placeholder || 'Select an option'}</option>
                            {element.options?.map((option, idx) => (
                                <option key={idx} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                );

            case 'switch':
                return (
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-bold text-gray-700">
                            {element.label}
                            {element.required && <span className="text-red-500">*</span>}
                        </label>
                        <label className="relative inline-flex cursor-pointer items-center">
                            <input type="checkbox" className="peer sr-only" onChange={(e) => onEdit(index, e.target.checked.toString())} />
                            <div className="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                        </label>
                    </div>
                );

            case 'range_slider':
                return (
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-700">
                            {element.label}
                            {element.required && <span className="text-red-500">*</span>}
                        </label>
                        <input type="range" min="0" max="100" className="w-full" onChange={(e) => onEdit(index, e.target.value)} />
                        <div className="text-sm text-gray-500">{element.placeholder}</div>
                    </div>
                );

            case 'button':
                return (
                    <button className="rounded bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-700" onClick={() => onEdit(index)}>
                        {element.label || 'Button'}
                    </button>
                );

            case 'paragraph':
                return <p className="text-sm text-gray-600">{element.label}</p>;

            default:
                return <div className="text-sm text-gray-500">Unknown element type: {element.type}</div>;
        }
    };

    return (
        <div key={index} className="relative flex flex-row items-center gap-4 rounded-lg p-4">
            <div className="flex-grow">{renderElement()}</div>
            {visibleEditElementButton !== false && <Dropdown onEdit={() => onEdit(index, element.label)} onDelete={() => onDelete(index)} />}
        </div>
    );
}
