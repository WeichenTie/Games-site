import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useState } from "react";
import './CharacterCreation.css'
import Avatar from '../components/Avatar';




const CharacterCreation = (props) => {
    const [colourIndex, setColourIndex] = useState(0);
    const [eyeIndex, setEyeIndex] = useState(0);
    const [mouthIndex, setMouthIndex] = useState(0);

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
            <div className="form-box">
                <input className="name-input-box" type="text" autoComplete="off" placeholder="Input name here"/>
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
                <Link to={"/Lobby"}>
                    <button className="create-character" type="submit">Create Character</button>
                </Link>
            </div>
        </div>
    );
}
 
export default CharacterCreation;