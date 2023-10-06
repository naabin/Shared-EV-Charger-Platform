import "../../styles/MapPage/ChatPage.css";
import React, { useState, useEffect } from 'react';
function LiveChat({ onClose , show}) {

    let [username, setUsername] = useState('');
    let [roomNumber, setRoomNumber] = useState('');
    let [chatSocket, setChatSocket] = useState(null);
    let [chatLog, setChatLog] = useState([]);
    let [chatMessage, setChatMessage] = useState('');
    const [display, setDisplay] = useState(show);

    const joinRoom = () => {
        if (!chatSocket) {
            // Create a new websocket object
            const newSocket = new WebSocket('ws://localhost:8001/ws/chat/' + roomNumber + '/');
            setChatSocket(newSocket);
        } else {
            // Close the existing websocket connection
            chatSocket.close();
        }
    };

    const sendMessage = () => {
        if (chatSocket) {
            chatSocket.send(JSON.stringify({
                'username': username,
                'message': chatMessage
            }));
            const sentMessage = {
                type: 'sent',
                username: username,
                content: chatMessage
            };
            setChatLog(prevLog => [...prevLog, sentMessage]);
            setChatMessage('');
        } else {
            console.error('Error sending message: Chat socket is null');
        }
    };

    useEffect(() => {
        if (chatSocket) {
            const handleNewMessage = function(e) {
                const data = JSON.parse(e.data);
                const type = data.username === username ? 'sent' : 'received'; // Compare to the current user's name
                const receivedMessage = {
                    type: type,
                    username: data.username,
                    content: data.message
                };
                setChatLog(prevLog => [...prevLog, receivedMessage]);
            };

            chatSocket.onmessage = handleNewMessage;

            return () => { // Clean up function
                chatSocket.removeEventListener('message', handleNewMessage);
            };
        }
    }, [chatSocket]);



    return (

        <div className={`chat-overlay ${display ? '' : 'chat-overlay-hidden'}`}>
            <div className="chat-window">

                <button className="close-chat" onClick={onClose}>X</button>
                <div className="chat-inputs">
                    <input value={username} onChange={e => setUsername(e.target.value)}placeholder="Enter your username" />
                    <input value={roomNumber} onChange={e => setRoomNumber(e.target.value)} placeholder="Enter room number" />
                    <button onClick={joinRoom}>Join</button>
                </div>
                <div className="chat-messages">
                    {chatLog.map((message, index) => (
                        <div key={index}>
                            <span className={message.type === 'sent' ? 'sent-message' : 'received-message'}>
                                {message.content}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="chat-inputs">
                    <input value={chatMessage} onChange={e => setChatMessage(e.target.value)} autoComplete="off" placeholder="Type a message..." />
                    <button onClick={sendMessage} disabled={!chatSocket}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default LiveChat;