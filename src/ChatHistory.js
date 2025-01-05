import React from 'react';

const ChatHistory = ({ messages }) => (
  <div className="chat-history">
    <h3>Chat History</h3>
    <ul>
      {messages.map((message, index) => (
        <li key={index} className={message.type}>
          <strong>{message.type === 'user' ? 'You' : 'Character'}:</strong> {message.text}
        </li>
      ))}
    </ul>
  </div>
);

export default ChatHistory;