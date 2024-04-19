interface LabelProps {
  text: string;
  htmlFor: string;
}

export function Label({ text, htmlFor }: LabelProps) {
  return (
    <div className="px-2">
      <label
        htmlFor={htmlFor}
        className="block mb-1 text-sm font-semibold text-gray-900">
        {text}
      </label>
    </div>
  )
}