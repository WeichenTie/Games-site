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
    public abstract class ILobbyHub<TPlayer, TClient> : Hub<TClient>
        where TPlayer : Player
        where TClient : class , ILobbyClient
    {
        public async override Task OnConnectedAsync() {
            Console.WriteLine($"Connect to Lobby Hub: {Context.ConnectionId}");
        }

        public async override Task OnDisconnectedAsync(Exception exception) {
            Console.WriteLine("Disconnecting from Lobby Hub: " + Context.ConnectionId);
            await LeaveLobby((string)Context.Items["token"], (string)Context.Items["lobbyId"]);
            await base.OnDisconnectedAsync(exception);
        }


        //-----------------------------------------------------------
        // Returns whether the token exists within the server.
        // Redirects the client to character create if not found.
        //-----------------------------------------------------------
        public virtual async Task<bool> ValidateToken(string token) {
            // Check if token exists
            bool isValid = Data.Instance.ContainsPlayer(token);
            if (!isValid) {
                Console.WriteLine("FAILED TOKEN VALIDATION REDIRECTING");
                await Clients.Caller.RedirectToCharacterCreate(); // Reroute client to character create
                return false;
            }
            Data.Instance.UpdateTokenConnection(token, Context.ConnectionId);
            return true;
        }
        //-----------------------------------------------------------
        // Returns whether the lobby exists within the server.
        // Redirects the client to main lobby if not found.
        //-----------------------------------------------------------
        public virtual async Task<bool> ValidateLobby(string lobbyId) {
            // Check if token exists
            bool isValid = Data.Instance.ContainsLobby(lobbyId);
            if (!isValid) {
                Console.WriteLine("FAILED LOBBY VALIDATION REDIRECTING");
                await Clients.Caller.RedirectToCharacterCreate(); // Reroute client to character create
                return false;
            }
            Data.Instance.UpdateTokenConnection(lobbyId, Context.ConnectionId);
            return true;
        }
        //-----------------------------------------------------------
        // Returns whether the lobby and token exists within the server.
        // Redirects the client if not found.
        //-----------------------------------------------------------
        public virtual async Task<bool> ValidateAll(string token, string lobbyId) {
            // Check if token exists
            return (await ValidateToken(token) && await ValidateLobby(lobbyId));
        }

        //-----------------------------------------------------------
        // Subscribes player to lobby
        //-----------------------------------------------------------
        public virtual async Task JoinLobby(string token, string lobbyId) {
            if (!await ValidateAll(token, lobbyId)) return;
            Context.Items.Add("token", token);
            Context.Items.Add("lobbyId", lobbyId);
            ILobby<TPlayer> lobby = Data.Instance.GetLobby<TPlayer>(lobbyId);
            lobby.AddPlayer(token);
            await GetAllPlayers(token, lobbyId);

        }

        //-----------------------------------------------------------
        // Unsubscribes player from lobby
        //-----------------------------------------------------------
        public virtual async Task LeaveLobby(string token, string lobbyId) {
            if (!await ValidateAll(token, lobbyId)) return;
            ILobby<TPlayer> lobby = Data.Instance.GetLobby<TPlayer>(lobbyId);
            lobby.RemovePlayer(token);
            await GetAllPlayers(token, lobbyId);
        }

        //-----------------------------------------------------------
        // Send message to all players in lobby
        //-----------------------------------------------------------
        public virtual async Task SendMessage(string token, string lobbyId, ChatMessage message) {
            if (!await ValidateAll(token, lobbyId)) return;
            message.Token = Data.Instance.GetPlayer(message.Token).name;
            ILobby<TPlayer> lobby = Data.Instance.GetLobby<TPlayer>(lobbyId);
            IReadOnlyList<string> tokens = lobby.getAllPlayerTokens();
            await Clients.Clients(Data.Instance.GetConnectionsFromTokens(tokens)).ReceiveMessage(message);
        }
        //-----------------------------------------------------------
        // Returns a list of all players in the lobby
        //-----------------------------------------------------------
        public virtual async Task GetAllPlayers(string token, string lobbyId) {
            if (!await ValidateAll(token, lobbyId)) return;
            ILobby<TPlayer> lobby = Data.Instance.GetLobby<TPlayer>(lobbyId);
            IReadOnlyList<string> tokens = lobby.getAllPlayerTokens();
            await Clients.Clients(Data.Instance.GetConnectionsFromTokens(tokens)).ReceiveAllPlayers(lobby.getPlayerObjects(tokens));
        }
    }
}