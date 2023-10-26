import React, { useState, useEffect, useRef  } from 'react';
import Avatar from './Avatar';
import "../../styles/MapPage/ChatPage.css";



function LiveChat({ onClose, show, initialReceiver }) {
    // States
    const [username, setUsername] = useState('');
    const [receiverUsername, setReceiverUsername] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [chatSocket, setChatSocket] = useState(null);
    const [chatLog, setChatLog] = useState([]);
    const [chatMessage, setChatMessage] = useState('');
    const [display, setDisplay] = useState(show);
    const [auth, setAuth] = useState(null);
    const [chatRooms, setChatRooms] = useState([]);



    const handleCloseChat = () => {

        setDisplay(false);
        window.location.href = "/mapPage";
    };



    // Effects
    useEffect(initializeUser, []);
    useEffect(() => {
        console.log(username);
        if (username) {
            fetchUserChatrooms();
        }
    }, [username]);
    useEffect(handleWebSocketMessages, [chatSocket, chatLog, username]);
    useEffect(() => {
        if (initialReceiver) {
            setReceiverUsername(initialReceiver);
            joinRoom(); // Join the room once the initialReceiver is set
        }
    }, [initialReceiver]);
    function disconnectFromRoom() {
        if (chatSocket) {
            chatSocket.close();
            setChatSocket(null);
        }
    }

    function initializeUser() {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setAuth(parsedUser);
            setUsername(parsedUser.username);
            fetchUserChatrooms();
        }
    }


    function fetchUserChatrooms() {
        if (!username) return;

        fetch(`http://localhost:8000/chatroom/get_user_chatrooms/${username}`)
            .then(response => response.json())
            .then(data => {
                // Transform null chatlogs to empty arrays
                data.forEach(item => {
                    if (item.chatlog === null) {
                        item.chatlog = [];
                    }
                });


                if (data && data.length > 0) {
                    setChatRooms(data);
                    setChatLog(data[0].chatlog);  // At this point, data[0].chatlog will always be an array
                    setRoomNumber(data[0].room_name);
                }
            });
    }



    function handleWebSocketMessages() {
        if (chatSocket) {
            const handleNewMessage = (e) => {
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
    }

    function saveChatLogToBackend(logToSave) {
        fetch('http://localhost:8000/chatroom/save_chatlog/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ room_name: roomNumber, chatlog: logToSave }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data.message);
            })
            .catch(error => {
                console.error('Error saving chat log:', error);
            });
    }


    function joinRoom() {
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
            setChatSocket(null);
        }
    }

    function sendMessage() {
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
            setChatLog(prevLog => {
                const updatedLog = [...prevLog, sentMessage];
                saveChatLogToBackend(updatedLog);  // Saving the updated log right after determining its value
                return updatedLog;
            });
            setChatMessage('');
        } else {
            console.error('Error sending message: Chat socket is either not initialized, closing, or closed.');
        }
    }



    return (
        <div className={`chat-overlay ${display ? '' : 'chat-overlay-hidden'}`}>

            <div className="chat-container">
                <button className="close-chat" onClick={handleCloseChat}></button>
                <ChatSidebar
                    rooms={chatRooms}
                    onSelectRoom={room => {
                        disconnectFromRoom();
                        setChatLog(room.chatlog);
                        setRoomNumber(room.room_name);
                        setReceiverUsername(room.user2);
                    }}
                />
                <ChatWindow
                    username={username}
                    receiverUsername={receiverUsername}
                    chatMessage={chatMessage}
                    chatLog={chatLog}
                    chatSocket={chatSocket}
                    onJoinRoom={joinRoom}
                    onSendMessage={sendMessage}
                    onUpdateChatMessage={setChatMessage}
                />
            </div>
        </div>
    );
}

function ChatSidebar({ rooms, onSelectRoom }) {
    return (
        <div className="chat-sidebar">
            {rooms.map(room => (
                <ChatRoom key={room.room_name} room={room} onSelect={onSelectRoom} />
            ))}
        </div>
    );
}

function ChatRoom({ room, onSelect }) {
    return (
        <div className="chat-room" onClick={() => onSelect(room)}>
            <Avatar username={room.user2} />
            <span className="room-username">{room.user2}</span>
        </div>
    );
}

function ChatWindow({ username, receiverUsername, chatMessage, chatLog, chatSocket, onJoinRoom, onSendMessage, onUpdateChatMessage }) {
    const lastMessageRef = useRef(null);
    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatLog]);
    return (
        <div className="chat-window">
            <div className="chat-inputs">
                <input value={receiverUsername} onChange={e => onUpdateChatMessage(e.target.value)} placeholder="Enter receiver's username" />
                <button onClick={onJoinRoom}>Join</button>
            </div>
            <div className="chat-messages">
                { chatLog.map((message, index) => {
                    const isMyMessage = message.username === username;
                    return (
                        <div
                            key={index}
                            className={`chat-message ${isMyMessage ? 'sent' : 'received'}`}
                            ref={index === chatLog.length - 1 ? lastMessageRef : null}
                        >
                            <div key={index} className={`chat-message ${isMyMessage ? 'sent' : 'received'}`}>
                                <div className={`avatar ${isMyMessage ? 'my-avatar' : ''}`}>
                                    {message.username.slice(0, 2).toUpperCase()}
                                </div>
                                {isMyMessage ? (
                                    <>
                                        <span className="message-content my-message-content">{message.content}</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="message-content">{message.content}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="chat-inputs">
                <input value={chatMessage} onChange={e => onUpdateChatMessage(e.target.value)} autoComplete="off" placeholder="Type a message..." />
                <button onClick={onSendMessage} disabled={!chatSocket}>Send</button>
            </div>
        </div>
    );
}


export default LiveChat;
