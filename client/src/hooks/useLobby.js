import { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { useSelector } from 'react-redux';

const useLobby = (url) => {
    const urlRef = useRef(url);
    const [ connection, setConnection ] = useState(null);
    
    const [ chat, setChat ] = useState([]);
    const token = useSelector(state => state.token);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(urlRef.current)
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');
                    connection.on('ReceiveMessage', message => {
                        setChat(prevChat => [...prevChat, message]);
                    });
                    connection.on('GetToken', () => {
                        
                    });
                    connection.on('JoinLobby', () => {
                        
                    });
                    connection.on('LeaveLobby', () => {
                        
                    });
                    connection.on('ReceiveAllPlayers', message => {
                        
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    const sendMessage = async (message) => {
        const chatMessage = {
            token: token,
            message: message
        };
        try {
            await connection.send('SendMessage', chatMessage);
        }
        catch(e) {
            console.log(e);
        }
    }
    const joinLobby = async (user, message) => {
        const chatMessage = {
            user: user,
            message: message
        };
        try {
            await connection.send('SendMessage', chatMessage);
        }
        catch(e) {
            console.log(e);
        }
    }
    const getAllPlayers = async () => {
        try {
            await connection.send('GetAllPlayers');
        }
        catch(e) {
            console.log(e);
        }
    }
    return (
        {connection,chat,sendMessage,getAllPlayers,joinLobby}
    );
}
 
export default useLobby;