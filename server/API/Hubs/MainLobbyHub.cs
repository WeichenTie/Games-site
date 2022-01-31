using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.Linq;

using Server.Api.Hubs.Clients;
using Server.Api.Models;

using Server.Backend.DataStorage;
using Server.Backend.Lobbies;
using Server.Backend.Models;

namespace Server.Api.Hubs
{
    public class MainLobbyHub : ILobbyHub<Player, IMainLobbyClient> {
        //--------------------------------------------------------------
        //
        //--------------------------------------------------------------
        public async Task CreateLobby(string token, string lobbyType) {
            if (!await ValidateToken(token)) return;
            // create lobby
            ILobby lobby = ILobbyFactory.CreateLobby(lobbyType);
            Data.Instance.AddLobby(lobby);
            await JoinLobbyWithId(token, lobby.LOBBY_ID);
        }


        //--------------------------------------------------------------
        //
        //--------------------------------------------------------------
        public async Task JoinLobbyWithId(string token, string lobbyId) {
            Console.Out.WriteLine($"Attempting to join{token}, lobbyid: {lobbyId}");
            if (!await ValidateAll(token, lobbyId)) return;
            string url = $"/{Data.Instance.GetLobby<Player>(lobbyId).Type}?lobbyId={lobbyId}";
            await Clients.Caller.Redirect(url);
        }

        public override string GetLobbyType() {
            return "MainLobby";
        }
    }
}