/* eslint-disable @typescript-eslint/no-unused-vars */
import ChatSidebar from "../../components/ChatSidebar/ChatSidebar";
import ChatRoom from "../../components/ChatRoom/ChatRoom";

export default function Chat() {
  return (
    <div className="h-full flex p-2 w-full fixed">
      <div className="w-1/4">
        <ChatSidebar />
      </div>
      <div className="w-3/4">
        <ChatRoom
        />
      </div>
    </div>
  );
}
