import { useEffect } from "react";
import ChatGroupCard from "./components/ChatGroupCard";
import { IoChatbubblesSharp } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { message } from "antd";
import clientWebSocket from "../../services/webSocketClient";
import CreateChatGroup from "../CreateChatGroup/CreateChatGroup";
import { useModalStore } from "../../store/showModal/showModal";
import { fetchChatGroups, useChatStore } from "../../store/chatGroups/chatGroups";
import { useCurrentChatGroupStore } from "../../store/currentChatGroup/currentChatGroup";
import { useNavigate } from "react-router-dom";
import { ChatGroup } from "../../interface/chat-group.interface";

export default function ChatSidebar() {
  const { chatGroups, setChatGroups } = useChatStore();
  const { setCurrentChatGroup } = useCurrentChatGroupStore();
  const { setShowModal } = useModalStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchChatGroups()
  }, []);

  useEffect(() => {
    const socket = clientWebSocket();

    const heartbeat = () => {
      if (!socket) return;
      if (socket.readyState !== 1) return;
      socket.send(JSON.stringify({ ping: "Pong" }));
      setTimeout(heartbeat, 10000);
    };
    socket.onopen = function () {
      heartbeat();
      message.success("Seu chat groups foi encontrado! ✅");
    };

    const listener = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data.type === "heartbeat" || chatGroups.some(group => group.id === data.group.id)) {
        return;
      }
      setChatGroups(prevState => {
        return [...prevState, data.group];
      });
    };

    socket.addEventListener("message", listener);
    socket.onclose = function () {
      message.error("Erro ao conectar (onclose)");
    };
    socket.onerror = function (error) {
      console.log(error)
      message.error("Erro ao conectar (onerror)");
    };

  }, [chatGroups]);

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  }

  const handleGroupClick = (group: ChatGroup) => {
    setCurrentChatGroup(group);
  };
  return (
    <div className="flex flex-col h-full bg-gray-200 ">
      <div className="p-4 bg-white border-r border-gray-300 flex-grow overflow-y-auto">
        <header className="flex justify-between items-center p-3 pb-8">
          <div className="flex items-center gap-2">
            <span className="text-2xl text-gray-800 font-bold text-center ">Chat Envio</span>
            <span className="text-2xl text-green-600 font-bold text-center"><IoChatbubblesSharp /></span>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="text-sm text-white bg-green-600 px-2 py-1 rounded-full hover:bg-green-500">
            Criar Grupo
          </button>
        </header>
        <nav className="flex items-center mx-5 mb-3 rounded-full">
          <button
            className={`text-sm font-medium rounded-full p-2 px-4 hover:bg-green-700 bg-green-600 text-white`}
          >
            Meus Grupos
          </button>
        </nav>
        <div className="flex flex-col ">
          <main>
            {chatGroups.length === 0 ? (
              <div className="text-center">Nenhuma mensagem disponível</div>
            ) : (
              chatGroups.map((group, index) => (
                <ChatGroupCard
                  key={index}
                  isSelected={false}
                  group={group}
                  onClick={() => handleGroupClick(group)}
                />
              ))
            )}
          </main>
        </div>
      </div>
      <CreateChatGroup />
      <div className="flex gap-2 items-center w-36 rounded-full p-2 px-4 hover:shadow-md">
        <span className="text-green-600">
          <LuLogOut size={14} />
        </span>
        <span className="text-green-600" onClick={handleLogOut}>Logout</span>
      </div>
    </div>
  );
}
