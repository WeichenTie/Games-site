import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { connect, useSelector } from 'react-redux';

const useLobby = (_url, _lobbyID = null, clientMethods = []) => {

    const url = useRef(_url);
    const isConnected = useRef(false);
    const [connection, setConnection] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [lobbyID, setLobbyID] = useState(_lobbyID != null ? _lobbyID :
        searchParams.get("lobbyId") != null ? searchParams.get("lobbyId") : "__INVALID__");

    const [chat, setChat] = useState([]);
    const [allPlayers, setAllPlayers] = useState([]);

    const navigate = useRef(useNavigate());
    const token = useSelector(state => state.token);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(url.current)
            .withAutomaticReconnect()
            .build();
        setConnection(newConnection);
        console.log("Set connection");
    }, [url]);

    useEffect(() => {
        const loadConnection = async () => {
            clientMethods.forEach(async obj => {
                console.log(obj.name);
                console.log(obj.method);
                await connection.on(obj.name, obj.method);
            });
            await connection.on('RedirectToCharacterCreate', () => {
                navigate.current("/");
            });
            await connection.on('ReceiveMessage', message => {
                setChat(prevChat => [...prevChat, message]);
            });
            await connection.on('Redirect', (url) => {
                navigate.current(url);
            });
            await connection.on('ReceiveAllPlayers', allPlayers => {
                setAllPlayers(allPlayers);
            });
            await connection.start()
            console.log('Connected to: ' + url);
            await joinLobby();
            isConnected.current = true;
        }
        if (connection) {
            loadConnection();
            console.log("DONE LOADING");
            return async () => {
                console.log("dismounting");
                await connection.stop();
            }
        }
    }, [connection]);

    const sendMessage = async (message) => {
        const chatMessage = {
            token: token,
            message: message
        };
        try {
            await connection.send('SendMessage', token, lobbyID, chatMessage);
        }
        catch (e) {
            console.log(e);
        }
    }

    const joinLobby = async () => {
        console.log("joining with token: " + token);
        try {
            await connection.send('JoinLobby', token, lobbyID);
        }
        catch (e) {
            console.log(e);
        }
    }

    const leaveLobby = async () => {
        try {
            console.log("Leaving with token: " + token);
            await connection.send('LeaveLobby', token, lobbyID);
        }
        catch (e) {
            console.log(e);
        }
    }

    const getAllPlayers = async () => {
        try {
            await connection.send('GetAllPlayers', token);
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        {
            connection,
            token,
            isConnected,
            lobbyID,
            chat,
            sendMessage,
            allPlayers,
        }
    );
}

export default useLobby;