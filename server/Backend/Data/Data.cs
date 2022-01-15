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
            Lobby lobby = new Lobby("HOME");
            Data.Instance.AddLobby(lobby);
        }
        //////////////////////////////////////////////////////////
        //                    Data Fields                       //
        //////////////////////////////////////////////////////////
        private Dictionary<string, Player> players = new Dictionary<string, Player>();
        private Dictionary<string, Lobby> lobbies = new Dictionary<string, Lobby>();
        
        
        public void AddPlayer(Player player) {
            players.Add(player.UUID, player);
        }
        public void RemovePlayer(string token) {
            players.Remove(token);
        }
        public void AddLobby(Lobby lobby) {
            lobbies.Add(lobby.LOBBY_ID, lobby);
        }
        public void RemoveLobby(string lobbyID) {
            lobbies.Remove(lobbyID);
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

        public Lobby GetLobby(string lobbyId) {
            if (lobbies.ContainsKey(lobbyId)) {
                return lobbies[lobbyId];
            }
            else {
                Console.WriteLine("Lobby does not exist");
                return null;
            }
        }
    }
}