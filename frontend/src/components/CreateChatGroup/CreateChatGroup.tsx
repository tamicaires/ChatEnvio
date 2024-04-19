import { Modal } from "antd";
import Input from "../Form/Input";
import { useModalStore } from "../../store/showModal/showModal";
import { Label } from "../Form/Label";
import { useState } from "react";
import { chatService } from "../../services/ChatService/chatService";
import { ChatGroup } from "../../interface/chat-group.interface";

export default function CreateChatGroup() {
  const { showModal, setShowModal } = useModalStore();
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");

  const handleCreateGroup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const chatData = {
      name: groupName,
      description: groupDescription
    };
    console.log('chatData', chatData)
    const chatGroup: ChatGroup = await chatService.createChat(chatData);
    await chatService.addUserToChat(chatGroup.id)
    setShowModal(false);
  };

  return (
    <Modal
      open={showModal}
      onCancel={() => setShowModal(false)}
      footer={false}
      style={{ maxWidth: "fit-content" }}
    >
      <div className="flex flex-col gap-3 justify-center content-center">
        <header className="flex flex-col pb-4">
          <span className="text-2xl text-center text-green-600 font-bold">Crie grupo</span>
          <span className="text-md text-center text-gray-600 font-medium">Converse com seus amigos</span>
        </header>
        <form onSubmit={handleCreateGroup} className="flex flex-col gap-3">
          <Label
            htmlFor="name"
            text="Nome do Grupo"
          />
          <Input
            name="name"
            onChange={(e) => setGroupName(e.target.value)}
          />

          <Label
            htmlFor="description"
            text="Descrição do Grupo"
          />
          <Input
            name="description"
            onChange={(e) => setGroupDescription(e.target.value)}
          />
          <button type="submit" className="bg-green-700 text-white px-3 py-1 rounded-xl self-center w-full">
            Criar Grupo
          </button>
        </form>
      </div>
    </Modal>
  )
}
