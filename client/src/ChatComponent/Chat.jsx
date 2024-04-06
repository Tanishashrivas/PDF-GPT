import React, { useState, useRef } from "react";
import "./chat.css";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const messageListRef = useRef(null);

  const sendMessage = () => {
    if (inputValue.trim() !== "") {
      setMessages(messages => [...messages, { text: inputValue, sender: "user" }]);
      setInputValue("");
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  };

 
  return (
    <div className="chat-container">
      <div className="message-list" ref={messageListRef}>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="inputBox">
        <input
          className="messageInput"
          type="text"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
