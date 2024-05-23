import { useEffect, useState } from "react";
import { useSocketStore } from "../store/socketStore";
import { useProfileStore } from "../store/userStore";

const ChatPopup = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { socket } = useSocketStore();
  const { user } = useProfileStore();

  useEffect(() => {
    if (socket) {
      socket.on("chat message", (msg) => {
        setMessages((messages) => [...messages, msg]);
      });
    }
    return () => {
      if (socket) {
        socket.off("chat message");
      }
    };
  }, [socket]);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("chat message", {
      username: user.username,
      message,
      id: user._id,
    });
    setMessage("");
  };

  return (
    <div className="fixed bottom-0 right-0 m-3 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden max-w-xs">
      <div className="p-4">
        <h2 className="font-bold text-lg">Chat</h2>
        <ul className="mt-2 flex flex-col gap-2">
          {messages.map((msg, index) => (
            <li key={index} className={`${user._id === msg.id && "ml-auto"}`}>
              <strong>
                {user._id === msg.id ? "You: " : `${msg.username}:`}
              </strong>{" "}
              {msg.message}
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-gray-300 p-4">
        <form onSubmit={sendMessage} className="flex flex-col gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow rounded-lg border border-gray-300 p-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg px-4 py-2"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPopup;
