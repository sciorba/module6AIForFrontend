interface TextInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email";
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  description?: string;
}

export function TextInput({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  multiline = false,
  rows = 3,
  description,
}: TextInputProps) {
  const inputClasses =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-400";

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
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className={`mt-1.5 resize-none ${inputClasses}`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`mt-1.5 ${inputClasses}`}
        />
      )}
    </div>
  );
}
