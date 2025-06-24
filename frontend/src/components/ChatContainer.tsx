import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageSkeleton from "./MessageSkeleton";

const ChatContainer = () => {
  const { messages, fetchMessages, isMessagesLoading, selectedUser } =
    useChatStore();

  useEffect(() => {
    fetchMessages(selectedUser!.id);
  }, [selectedUser?.id]);

  if (isMessagesLoading)
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        {/* <MessageInput /> */}
      </div>
    );
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
    </div>
  );
};

export default ChatContainer;
