using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using System;

using Server.Api.Hubs.Clients;
using Server.Api.Models;

using Server.Backend.DataStorage;
using Server.Backend.Lobbies;
using Server.Backend.Models;

namespace Server.Api.Hubs
{
    public class LobbyHub : Hub<ILobbyClient> {
        string _token = "";
        public async override Task OnConnectedAsync() {
            await Clients.Caller.GetToken();
            await JoinLobby(_token, "HOME");
        }
        public async Task SendServerToken(string token) {
            _token = token;
        }

        public async Task CreateLobby(string token) {
            string lobbyId = System.Guid.NewGuid().ToString();
            Lobby newLobby = new Lobby(lobbyId);
            newLobby.AddPlayer(token);
            Data.Instance.AddLobby(newLobby);
            await JoinLobby(token, lobbyId);
            Console.WriteLine($"{token} created lobby: {lobbyId}");
        }
        public async Task LeaveLobby(string token, string lobbyId) {
            Data.Instance.GetLobby(lobbyId).RemovePlayer(token);
            await Clients.Caller.LeaveLobby();
            Console.WriteLine($"{token} left lobby: {lobbyId}");
        }
        public async Task JoinLobby(string token, string lobbyId) {
            Data.Instance.GetLobby(lobbyId).AddPlayer(token);
            await Clients.Caller.JoinLobby();
            Console.WriteLine($"{token} joined lobby: {lobbyId}");
        }
        public async virtual Task SendMessage(ChatMessage message) {
            await Clients.All.ReceiveMessage(message);
            Console.WriteLine($"{message.Token} sent: {message.Message}");
        }
        public async Task GetAllPlayers(string lobbyId) {
            Player[] players = Data.Instance.GetLobby(lobbyId).GetAllPlayersAsArray();
            await Clients.All.ReceiveAllPlayers(players);
            Console.WriteLine($"Returning all players of lobby: {lobbyId}");
        }
    }
}