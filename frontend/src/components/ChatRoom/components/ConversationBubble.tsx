import { FaUserAlt } from "react-icons/fa";

interface ConversationBubbleProps {
  fromMe: boolean;
  message: string;
  username: string;
}

export default function ConversationBubble({ fromMe, message, username }: ConversationBubbleProps) {
  return (
    <div className={`flex gap-2 items-end p-8 w-1/2 ${fromMe ? 'justify-end' : 'justify-start'}`}>
      {!fromMe ? (
        <>
          <div className="bg-green-600 p-2 rounded-full">
            <span className="text-white"><FaUserAlt size={10} /></span>
          </div>
          <div className="flex flex-col gap-2 bg-gray-200 p-5 rounded rounded-r-3xl rounded-tl-3xl rounded-bl-none">
            <span className="text-xs text-green-600 font-semibold">{username}</span>
            <span>{message}</span>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-2 bg-green-200 p-5 rounded rounded-l-3xl rounded-tr-3xl rounded-br-none">
            <span className="text-xs text-green-600 font-semibold">{username}</span>
            <span>{message}</span>
          </div>
          <div className="bg-green-600 p-2 rounded-full">
            <span className="text-white"><FaUserAlt size={10} /></span>
          </div>
        </>
      )}
    </div>
  );
}
