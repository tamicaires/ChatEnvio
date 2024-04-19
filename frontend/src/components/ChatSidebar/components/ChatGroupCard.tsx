import { TiGroup } from "react-icons/ti";
import { ChatGroup } from "../../../interface/chat-group.interface";

interface ChatGroupCardProps {
  isSelected: boolean;
  group: ChatGroup;
  onClick: () => void;
}

export default function ChatGroupCard({ isSelected, group, onClick }: ChatGroupCardProps) {
  return (
    <div className={`flex gap-3 py-5 px-4 border-b-1 items-center hover:bg-gray-50 border-gray-300 ${isSelected ? 'shadow-lg bg-green-100' : ''}`} onClick={onClick}>
      <div className="bg-gray-200 p-3 rounded-full">
        <span className="text-green-600"><TiGroup size={25} /></span>
      </div>
      <div>
        <h3 className="text-md font-semibold">{group.name}</h3>
        <span className="text-sm text-gray-500">{group.description}</span>
      </div>
    </div>
  );
}
