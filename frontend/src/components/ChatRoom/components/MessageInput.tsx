import { ChangeEvent, MouseEventHandler } from "react";
import { IoIosSend } from "react-icons/io";

interface MessageInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function MessageInput({ value, onChange, onClick }: MessageInputProps) {
  return (
    <div className="flex items-center p-8">
      <input
        type="text"
        placeholder="Digite sua mensagem"
        className="flex-grow bg-gray-200 p-3 rounded-full mr-4"
        value={value} // Valor do campo de entrada
        onChange={onChange}
      />
      <div className="bg-green-600 text-white p-3 rounded-full">
        <button onClick={onClick}>
          <IoIosSend />
        </button>
      </div>
    </div>
  );
}
