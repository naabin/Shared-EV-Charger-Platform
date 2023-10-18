import React, { useState, useEffect } from 'react';
import Avatar from './Avatar';
import "../../styles/MapPage/ChatPage.css";

function LiveChat({ onClose, show }) {
    const [username, setUsername] = useState('');
    const [receiverUsername, setReceiverUsername] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [chatSocket, setChatSocket] = useState(null);
    const [chatLog, setChatLog] = useState([]);
    const [chatMessage, setChatMessage] = useState('');
    const [display, setDisplay] = useState(show);
    const [auth, setAuth] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [chatRooms, setChatRooms] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("user")) {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            setAuth(storedUser);
            setUsername(storedUser.username);
        }
    }, []);  // Only run once when component mounts



    useEffect(() => {
        if (username)
        {
            fetch(`http://localhost:8000/chatroom/get_user_chatrooms/${username}`)
                .then(response => response.json())
                .then(data => {
                    if (data && data.length > 0 && data[0].chatlog) {
                        setChatRooms(data);
                        setChatLog(data[0].chatlog);
                        setRoomNumber(data[0].room_name);
                    }
                });
        }

    }, [username]);

    useEffect(() => {
        if (auth && auth.access) {
            setIsLoggedIn(true);
        }
    }, [auth]);  // Run whenever `auth` changes



    useEffect(() => {
        const interval = setInterval(() => {
            saveChatLogToBackend();
        }, 300000);  // 300,000 milliseconds = 5 minutes

        return () => clearInterval(interval);  // Clear the interval when the component is unmounted
    }, [chatLog]);  // Run whenever `chatLog` changes

    const saveChatLogToBackend = () => {
        // API call to save the chatlog
        fetch('http://localhost:8000/chatroom/save_chatlog/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ room_name: roomNumber, chatlog: chatLog }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);  // You can handle the response here if needed
            });
    };

    const joinRoom = () => {
        if (!chatSocket) {
            fetch('http://localhost:8000/chatroom/get_chatroom/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sender: username, receiver: receiverUsername }),
            })
                .then(response => response.json())
                .then(data => {
                    setRoomNumber(data.room_name);
                    const newSocket = new WebSocket('ws://localhost:8001/ws/chat/' + data.room_name + '/');
                    setChatSocket(newSocket);
                    console.log("join successfully")
                });
        } else {
            chatSocket.close();
        }
    };

    const sendMessage = () => {
        if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
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
            saveChatLogToBackend();
        } else {
            console.error('Error sending message: Chat socket is either not initialized, closing, or closed.');
        }
    };

    if (chatSocket) {
        chatSocket.onclose = (event) => {
            if (event.wasClean) {
                console.log(`Closed cleanly, code=${event.code}, reason=${event.reason}`);
            } else {
                console.error('Connection died'); // e.g. server process killed or network down
                // You can try to reconnect here or notify the user
            }
        };

        chatSocket.onerror = (error) => {
            console.error(`WebSocket Error: ${error.message}`);
            // Notify the user about the error
        };
    }

    const handleCloseChat = () => {
        saveChatLogToBackend();
        onClose();
    };



    useEffect(() => {
        if (chatSocket) {
            const handleNewMessage = function(e) {
                const data = JSON.parse(e.data);
                const type = data.username === username ? 'sent' : 'received';
                const receivedMessage = {
                    type: type,
                    username: data.username,
                    content: data.message
                };
                const lastMessage = chatLog[chatLog.length - 1];
                if (lastMessage && lastMessage.type === 'sent' && lastMessage.content === data.message) {
                    return;
                }
                setChatLog(prevLog => [...prevLog, receivedMessage]);
            };
            chatSocket.onmessage = handleNewMessage;
            return () => {
                chatSocket.removeEventListener('message', handleNewMessage);
            };
        }
    }, [chatSocket, chatLog, username]);

    function ChatRoomList({ rooms, onSelectRoom }) {
        return (
            <div className="chat-room-list">
                {rooms.map(room => (
                    <div key={room.room_name} className="chat-room" onClick={() => onSelectRoom(room)}>
                        <Avatar username={room.user2} />
                        <span className="room-username">{room.user2}</span>
                    </div>

                ))}
            </div>
        );
    }

    return (
        <div className={`chat-overlay ${display ? '' : 'chat-overlay-hidden'}`}>
            <button className="close-chat" onClick={handleCloseChat}>X</button>

            <div className="chat-container">

                <div className="chat-sidebar">
                    <ChatRoomList rooms={chatRooms} onSelectRoom={(selectedRoom) => {
                        setChatLog(selectedRoom.chatlog);
                        setRoomNumber(selectedRoom.room_name);
                        setReceiverUsername(selectedRoom.user2); // add this line
                    }} />
                </div>
                <div className="chat-window">

                    <div className="chat-inputs">
                        <input value={receiverUsername} onChange={e => setReceiverUsername(e.target.value)} placeholder="Enter receiver's username" />
                        <button onClick={joinRoom}>Join</button>
                    </div>
                    <div className="chat-messages">
                        {chatLog.map((message, index) => {
                            const isMyMessage = message.username === username;

                            return (
                                <div key={index} className={`chat-message ${isMyMessage ? 'my-message-container' : 'others-message-container'}`}>
                                    {!isMyMessage && (
                                        <div className="avatar-container">
                                            <Avatar username={message.username} />
                                        </div>
                                    )}
                                    <div className="message-text">
                                        <span className={isMyMessage ? 'sent-message' : 'received-message'}>
                                            {message.content}
                                        </span>
                                    </div>
                                    {isMyMessage && (
                                        <div className="avatar-container">
                                            <Avatar username={message.username} />
                                        </div>
                                    )}
                                </div>
                            );
                        })}


                    </div>

                    <div className="chat-inputs">
                        <input value={chatMessage} onChange={e => setChatMessage(e.target.value)} autoComplete="off" placeholder="Type a message..."/>
                        <button onClick={sendMessage} disabled={!chatSocket}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LiveChat;
