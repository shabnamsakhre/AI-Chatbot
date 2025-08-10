import { useState, useRef, useEffect } from "react";
import "./App.css";

import { io } from "socket.io-client";

// MD Formatter
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

export default function App() {
  const [socket, setSocket] = useState(null);

  const [messages, setMessages] = useState([
    {
      sender: "Bot",
      text: "Hello! How can I help you today?",
      isUser: false,
      time: getCurrentTime(),
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  function getCurrentTime() {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const sendMessage = () => {
    if (!input.trim()) return;

    // Add user's message
    setMessages((prev) => [
      ...prev,
      { sender: "You", text: input, isUser: true, time: getCurrentTime() },
    ]);

    // Simulate bot reply
    // setTimeout(() => {
    //   setMessages((prev) => [
    //     ...prev,
    //     {
    //       sender: "Bot",
    //       text: "This is a sample AI response that can also be multi-line to show bubble resizing like WhatsApp.",
    //       isUser: false,
    //       time: getCurrentTime(),
    //     },
    //   ]);
    // }, 800);

    // Sending the input in backend to socket
    socket.emit("ai-message", input);

    setInput("");
    textareaRef.current.style.height = "auto"; // reset height after sending
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // prevent newline
      sendMessage();
    }
  };

  useEffect(() => {
    let socketInstance = io("http://localhost:3000");
    setSocket(socketInstance);

    socketInstance.on("ai-message-response", (data) => {
      const botMessage = {
        sender: "Bot",
        text: data.response,
        isUser: false,
        time: getCurrentTime(),
      };

      setMessages((prev) => [...prev, botMessage]);
    });

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  return (
    <div className="chat-container">
      <div className="chat-header">AI Chatbot</div>

      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message-wrapper ${msg.isUser ? "user" : "bot"}`}
          >
            <div className="sender">{msg.sender}</div>
            <div
              className={`message ${
                msg.isUser ? "user-message" : "bot-message"
              }`}
            >
              <span className="message-text">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
              </span>

              <span className="message-time">{msg.time}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <textarea
          ref={textareaRef}
          rows={1}
          placeholder="Type a message..."
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
