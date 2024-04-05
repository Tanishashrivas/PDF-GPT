import React, { useState } from "react";

function ChatHistory() {
  const [chats, setChats] = useState([]);
  const [showNewChat, setShowNewChat] = useState(false);
  const [newChatName, setNewChatName] = useState("");

  const handleSelectChat = () => {
    setShowNewChat(true);
  };


  const handleNewChatConfirm = () => {
    const newChat = (
      <div key={chats.length} className="chatBox">
        <span>{newChatName}</span>
      </div>
    );
    setChats(prevChats => [...prevChats, newChat]);
    setNewChatName("");
    setShowNewChat(false);
  };

  return (
    <>
      {/* <div className="chatBox" id="chat"> */}
        {chats}
        {showNewChat && (
          <div className="chatBox">
            <input
              type="text"
              className="newChatName"
              value={newChatName}
              onChange={(e) => setNewChatName(e.target.value)}
              placeholder="Enter chat name"
            />
            <button className="newChatConfirm" onClick={handleNewChatConfirm}>→</button>
          </div>
        )}
      {/* </div> */}
      <button className="newChat" onClick={handleSelectChat}>
        New Chat
      </button>
    </>
  );
}

export default ChatHistory;
