import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from '../redux/actions'
import './CharacterCreation.css'
import Avatar from '../components/avatar/Avatar';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';




const CharacterCreation = (props) => {
    const [colourIndex, setColourIndex] = useState(0);
    const [eyeIndex, setEyeIndex] = useState(0);
    const [mouthIndex, setMouthIndex] = useState(0);
    const [connection, setConnection] = useState(null);
    const [name, setName] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector(state=>state.token);


    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('http://127.0.0.1:5000/create-character')
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        setConnection(newConnection);
        console.log('Connected!');
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    connection.on('ReceiveToken', token => {
                        console.log("SETTING TOKEN: "+ token);
                        dispatch(setToken(token));
                        console.log("DONE SETTING TOKEN: "+ token);
                        navigate("/Chat");
                        console.log("CHANGING PAGE: "+ token);
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    const createCharacter = async () => {
        const playerData = {
            name: name,
            eyeIndex: eyeIndex,
            mouthIndex: mouthIndex,
            colourIndex: colourIndex,
        };
        try {
            console.log("SENDING CREATE CHAR REQUEST: "+ token);
            await connection.send('CreateCharacter', playerData);
            console.log("DONE SENDING CREATE CHAR REQUEST: "+ token)
        }
        catch(e) {
            console.log(e);
        }
    }
    async function handleCharacterCreate(e) {
        e.preventDefault();
        const isNameValid = name && name !== ''; // check for valid message
        if (isNameValid) {
            console.log("CREATING CHARACTER: "+ token)
            await createCharacter();
        }
    }
    function incrementIndex (setter, newValue, max) {
        if (newValue >= max) {
            newValue = 0;
        } else if (newValue < 0) {
            newValue = max - 1;
        }
        setter(newValue);
    }
    return (
        <div className="page-container">
            <div className="logo">
            </div>
            <form className="form-box" onSubmit={(e) => handleCharacterCreate(e)}>
                <input className="name-input-box" type="text" autoComplete="off" placeholder="Input name here" onChange={(e) => setName(e.target.value)} value={name}/>
                <div className="character-customization-box">
                    <div className="arrow-group" id="left-arrow-group">
                        <div className="arrow arrow-left" onClick={() => {incrementIndex(setEyeIndex, eyeIndex - 1, 31)}}></div>
                        <div className="arrow arrow-left" onClick={() => {incrementIndex(setMouthIndex, mouthIndex - 1, 24)}}></div>
                        <div className="arrow arrow-left" onClick={() => {incrementIndex(setColourIndex, colourIndex - 1, 18)}}></div>
                    </div>
                    <Avatar
                        size={96}
                        colourIndex={colourIndex}
                        mouthIndex={mouthIndex}
                        eyeIndex={eyeIndex}>
                    </Avatar>
                    <div className="arrow-group" id="right-arrow-group">
                        <div className="arrow arrow-right" onClick={() => {incrementIndex(setEyeIndex, eyeIndex + 1, 31)}}></div>
                        <div className="arrow arrow-right" onClick={() => {incrementIndex(setMouthIndex, mouthIndex + 1, 24)}}></div>
                        <div className="arrow arrow-right" onClick={() => {incrementIndex(setColourIndex, colourIndex + 1, 18)}}></div>
                    </div>
                </div>
                <button className="create-character" type="submit" >Create Character</button>
            </form>
        </div>
    );
}
 
export default CharacterCreation;