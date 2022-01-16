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
    public class LobbyHub : Hub<ILobbyClient> {
        public async override Task OnConnectedAsync() {
            Console.WriteLine("A NEW PLAYER HAS JOINED");
        }

        public override Task OnDisconnectedAsync(Exception exception) {
            Console.WriteLine(Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }

        // Returns whether the token exists within the server.
        // Redirects the client to character create if not found.
        public async Task<bool> ValidateToken(string token) {
            bool isValid = Data.Instance.ContainsPlayer(token); // Check if token exists
            if (!isValid) {
                Console.WriteLine("FAILED VALIDATION REDIRECTING");
                await Clients.Caller.RedirectToCharacterCreate(); // Reroute client to character create
                return false;
            }
            return true;
        }

        public async Task CreateLobby(string token) {
            if (!await ValidateToken(token)) return;
            string lobbyId = System.Guid.NewGuid().ToString();
            Lobby newLobby = new Lobby(lobbyId);
            newLobby.AddPlayer(token);
            Data.Instance.AddLobby(newLobby);
            await JoinLobby(token, lobbyId);
        }
        public async Task JoinLobby(string token, string lobbyId) {
            if (!await ValidateToken(token)) return;
            // Add connection to group then associate connection with token
            await Groups.AddToGroupAsync(Context.ConnectionId, lobbyId);
            Data.Instance.AddConnection(Context.ConnectionId, token);
            // Add player to lobby then sends list of all players back to group
            Data.Instance.GetLobby(lobbyId).AddPlayer(token); 
            await Clients.Group(lobbyId).ReceiveAllPlayers(Data.Instance.GetLobby(lobbyId).GetAllPlayersAsList());
        }
        public async Task LeaveLobby(string token, string lobbyId) {
            if (!await ValidateToken(token)) return;
            // Remove connection from group and dissociate connection with token
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, lobbyId); 
            Data.Instance.RemoveConnection(Context.ConnectionId);
            // Remove client from lobby
            Data.Instance.GetLobby(lobbyId).RemovePlayer(token);
            // Sends back new list of all clients in this lobby
            List<Player> players = Data.Instance.GetLobby(lobbyId).GetAllPlayersAsList();
            await Clients.Group(lobbyId).ReceiveAllPlayers(players);
        }
        public async virtual Task SendMessage(string token, string lobbyId, ChatMessage message) {
            if (!await ValidateToken(token)) return;
            message.Token = Data.Instance.GetPlayer(message.Token).name;
            await Clients.Group(lobbyId).ReceiveMessage(message);
        }
        public async Task GetAllPlayers(string token, string lobbyId) {
            if (!await ValidateToken(token)) return;
            List<Player> players = Data.Instance.GetLobby(lobbyId).GetAllPlayersAsList();
            await Clients.All.ReceiveAllPlayers(players);
            //Console.WriteLine($"Returning all players of lobby: {lobbyId}");
        }
    }
}