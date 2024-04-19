/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { message } from "antd";
import { useMessageStore } from "../../store/chatGroups/messages";
import { messageService } from "../../services/MessageService/messageService";
import { useCurrentChatGroupStore } from "../../store/currentChatGroup/currentChatGroup";
import MessageInput from "./components/MessageInput";
import ConversationBubble from "./components/ConversationBubble";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Dropdown, Menu } from "antd";
import clientWebSocket from "../../services/webSocketClient";

export default function ChatRoom() {
  const { currentChatGroup } = useCurrentChatGroupStore();
  const { messages, setMessages, setLoading } = useMessageStore();
  const [selectedId, setSelectedId] = useState("");
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    if (currentChatGroup) {
      setSelectedId(currentChatGroup.id)
    }
  }, [currentChatGroup]);

  const dummy = useRef<HTMLDivElement>(null);

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
      if (data.type === "heartbeat") {
        return;
      }
      setMessages((prevState) => {
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

  }, [messages]);

  useEffect(() => {
    if (selectedId) {
      const fetchInitialMessages = async () => {
        try {
          setLoading(true);
          const response = await messageService.getChatMessages(selectedId);
          setMessages(response);
        } catch (error) {
          console.error("Erro ao buscar as mensagens:", error);
          message.error("Erro ao buscar as mensagens");
        } finally {
          setLoading(false);
        }
      };

      fetchInitialMessages();
    }
  }, [selectedId]);

  useEffect(() => {
    if (dummy.current) {
      dummy.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  const handleMessageOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(event.target.value);
  };

  const handleCreateMessage = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (messageText.trim() !== "" && currentChatGroup) {
      try {
        const newMessageData = {
          text: messageText,
          fromMe: true,
          chatGroupId: currentChatGroup.id,
        };
        await messageService.sendMessage(newMessageData);
        setMessageText("");
      } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
        message.error("Erro ao enviar mensagem");
      }
    }
  };

  return (
    <div className="max-w-full flex flex-col h-screen">
      <div className="flex justify-between items-center p-4 border-b-1 border-gray-300 mx-5 ">
        <header className="flex flex-col">
          <span className="text-lg text-gray-800 font-semibold">{currentChatGroup?.name}</span>
          <span className="text-sm text-gray-600">{currentChatGroup?.description}</span>
        </header>
      </div>
      <div className="flex flex-col flex-grow overflow-y-auto">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-4">Nenhuma mensagem</div>
        ) : (
          messages.map((message, index) => (
            <div key={index} className={`flex ${message.fromMe ? 'justify-end' : 'justify-start'}`}>
              <ConversationBubble
                message={message.text}
                username={message.sender}
                fromMe={message.fromMe}
              />
            </div>
          ))
        )}
        <div ref={dummy}></div>
      </div>

      <div>
        <MessageInput
          value={messageText}
          onChange={handleMessageOnChange}
          onClick={handleCreateMessage}
        />
      </div>
    </div>
  );
}
