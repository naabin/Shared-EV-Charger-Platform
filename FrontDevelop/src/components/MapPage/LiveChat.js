import "../../styles/MapPage/ChatPage.css";
import React, { useState, useEffect } from 'react';
import Avatar from './Avatar';  // Adjust the import path if necessary
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
                console.log(data);  // Log the data to the console
                const type = data.username === username ? 'sent' : 'received';
                const receivedMessage = {
                    type: type,
                    username: data.username,
                    content: data.message
                };
                // Check if the received message is identical to the last sent message
                const lastMessage = chatLog[chatLog.length - 1];
                if (lastMessage && lastMessage.type === 'sent' && lastMessage.content === data.message) {
                    return;  // Skip adding this message to the chatLog
                }
                setChatLog(prevLog => [...prevLog, receivedMessage]);
            };

            chatSocket.onmessage = handleNewMessage;

            return () => {
                chatSocket.removeEventListener('message', handleNewMessage);
            };
        }
    }, [chatSocket, chatLog, username]);




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
                        <div key={index} className={`chat-message ${message.type === 'sent' ? 'sent-message-container' : 'received-message-container'}`}>
                            <div className="avatar-container">
                                <Avatar username={message.username} isSender={message.type === 'sent'} />
                            </div>
                            <div className="message-text">
                                <span className={message.type === 'sent' ? 'sent-message' : 'received-message'}>
                                    {message.content}
                                </span>
                            </div>
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