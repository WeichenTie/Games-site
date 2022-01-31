using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Backend.Models;
using Server.Backend.Lobbies;

namespace Server.Backend.DataStorage {
    public sealed class Data
    {
        //////////////////////////////////////////////////////////
        //                     Singleton                        //
        //////////////////////////////////////////////////////////
        private static volatile Data instance;
        private static Object syncRootObject = new Object();
        private Data() {}
        public static Data Instance
        {
            get
            {
                if (instance == null)
                {
                    lock (syncRootObject)
                    {
                        if (instance == null)
                        {
                            instance = new Data();
                        }
                    }
                }
                return instance;
            }
        }
        public static void StartBackend() {
            ILobby<Player> lobby = new MainLobby("HOME");
            ILobby<Player> lobby1 = new MainLobby("pl2");
            Data.Instance.AddLobby(lobby);
            Data.Instance.AddLobby(lobby1);
        }
        //////////////////////////////////////////////////////////
        //                    Data Fields                       //
        //////////////////////////////////////////////////////////
        private Dictionary<string, string> tokenToConnection = new Dictionary<string, string>();
        private Dictionary<string, Player> players = new Dictionary<string, Player>();
        private Dictionary<string, ILobby> lobbies = new Dictionary<string, ILobby>();

        public void UpdateTokenConnection(string token, string connectionID) {
            if (!tokenToConnection.ContainsKey(token)) {
                tokenToConnection.Add(token, connectionID);
            }
            else {
                tokenToConnection[token] = connectionID;
            }
        }

        public IReadOnlyList<string> GetConnectionsFromTokens(IReadOnlyList<string> tokens) {
            List<string> connectionIDs = new List<string>();
            foreach (string token in tokens) {
                connectionIDs.Add(tokenToConnection[token]);
            }
            return connectionIDs;
        }

        public void AddPlayer(string token, Player player) {
            players.Add(token, player);
        }
        public void RemovePlayer(string token) {
            players.Remove(token);
        }
        public void AddLobby(ILobby lobby) {
            lobbies.Add(lobby.LOBBY_ID, lobby);
        }
        public void RemoveLobby(string lobbyID) {
            lobbies.Remove(lobbyID);
        }

        public bool ContainsPlayer(string token) {
            return token != null && players.ContainsKey(token);
        }
        public bool ContainsLobby(string lobby) {
            return lobby != null && lobbies.ContainsKey(lobby);
        }
        public Player GetPlayer(string token) {
            if (players.ContainsKey(token)) {
                return players[token];
            }
            else {
                Console.WriteLine("Player Does Not Exist");
                return null;
            }
        }
        public List<Player> GetAllPlayers() {
            return players.Values.ToList();
        }
        public List<string> GetAllPlayerTokens() {
            return players.Keys.ToList();
        }

        public ILobby<T> GetLobby<T>(string lobbyId) where T : Player {
            if (lobbies.ContainsKey(lobbyId)) {
                return (ILobby<T>)lobbies[lobbyId];
            }
            else {
                Console.WriteLine("Lobby does not exist");
                return null;
            }
        }
    }
}