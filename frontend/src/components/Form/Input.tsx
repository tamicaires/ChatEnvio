interface InputProps {
  name: string;
  type?: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ name, onChange, type, placeholder, }: InputProps) {
  return (
    <div className="px-2 pb-3">
      <input
        type={type}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        className="flex rounded border shadow-sm text-sm p-2 px-4 py-1.5 text-gray-700 focus:outline-none focus:blue-2 focus:ring-blue-500 focus:border-blue-500 w-full`"
      />
    </div>
  );
}

