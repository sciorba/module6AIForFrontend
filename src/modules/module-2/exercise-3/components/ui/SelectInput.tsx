interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  description?: string;
}

export function SelectInput({ id, label, value, onChange, options, description }: SelectInputProps) {
  return (
    <div className="py-3">
      <label htmlFor={id} className="block text-sm font-medium text-gray-900 dark:text-white transition-colors">
        {label}
      </label>
      {description && (
        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400 transition-colors">
          {description}
        </p>
      )}
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
