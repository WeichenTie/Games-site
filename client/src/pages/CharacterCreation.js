import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useState } from "react";
import './CharacterCreation.css'
import Avatar from '../components/Avatar';


class CharacterCreation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            col : 'black',
        };
    }

    componentWillMount() {
        console.log("HEYHEYHEY");
    }
    componentWillUnmount() {
        console.log("BYE BYE");
    }

    render() {
        this.a = 2;
        //this.setState();
        return (
            <div className="page-container">
                <div className="logo">
                </div>
                <div className="form-box">
                    <input className="name-input-box" type="text" autoComplete="off" placeholder="Input name here"/>
                    <div className="character-customization-box">
                        <div className="arrow-group" id="left-arrow-group">
                            <div className="arrow left-character-arrow"></div>
                            <div className="arrow left-character-arrow"></div>
                            <div className="arrow left-character-arrow"></div>
                        </div>
                        <div className="character-display">
                            <Avatar/>
                        </div>
                        <div className="arrow-group" id="right-arrow-group">
                            <div className="arrow right-character-arrow" style={{backgroundColor: `${this.state.col}`}}></div>
                            <div className="arrow right-character-arrow"></div>
                            <div className="arrow right-character-arrow"></div>
                        </div>
                    </div>
                    <button className="create-character" onClick={() => {
                        this.setState({col : 'purple'})}}>Create Character</button>
                    <Link to={"/Lobby"}>
                        <button className="create-character-button" type="submit">Create Character</button>
                    </Link>
                </div>
            </div>
        );
    }
}
 
export default CharacterCreation;