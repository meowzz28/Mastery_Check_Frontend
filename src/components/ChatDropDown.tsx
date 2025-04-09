import * as React from "react";

const ChatDropdown: React.FC = () => {
  const [chatHistory, setChatHistory] = React.useState([
    { id: "1", title: "Chat 1" },
    { id: "2", title: "Chat 2" },
    { id: "3", title: "Chat 3" },
  ]);

  const [selectedChat, setSelectedChat] = React.useState<string | null>(null);

  const handleSelectChat = (chatId: string) => {
    setSelectedChat(chatId);
    // console.log("Selected chat ID:", chatId);
  };

  return (
    <div className="flex flex-col w-1/4 p-4 bg-gray-100 h-[80vh] border-r">
      <div className="flex-1">
        <h3 className="font-semibold mb-3">Past Practices</h3>
        <select
          className="w-full p-2 border rounded-lg"
          onChange={(e) => handleSelectChat(e.target.value)}
          value={selectedChat || ""}
        >
          <option value="">Select a chat</option>
          {chatHistory.map((chat) => (
            <option key={chat.id} value={chat.id}>
              {chat.title}
            </option>
          ))}
        </select>
      </div>
      <button
        className="w-full mt-3 p-2 bg-red-500 text-white rounded-lg"
        onClick={() => {
          if (window.confirm("Are you sure you want to delete current chat?")) {
            setChatHistory([]);
          }
        }}
      >
        Clear History
      </button>
    </div>
  );
};

export default ChatDropdown;
