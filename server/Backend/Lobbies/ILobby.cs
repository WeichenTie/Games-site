using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Server.Backend.DataStorage;
using Server.Backend.Models;

namespace Server.Backend.Lobbies {
    public abstract class ILobby<T> : ILobby where T : Player {
        
        protected Dictionary<string, T> players = new Dictionary<string, T>();
        public string Type = "";

        protected ILobby(string lobbyID) : base(lobbyID) {}
        public abstract void AddPlayer(string token);
        public virtual void RemovePlayer(string token) {
            players.Remove(token);
        }
        // Returns whether a player exists within this lobby
        public bool ContainsPlayer(string token) {
            return players.Keys.Contains(token);
        }

        public virtual IReadOnlyList<string> getAllPlayerTokens() {
            return players.Keys.ToList();
        }
        public virtual IReadOnlyList<T> getPlayerObjects(IReadOnlyList<string> tokens) {
            List<T> players = new List<T>();
            foreach (var token in tokens) {
                players.Add(this.players[token]);
            }
            return players;
        }
    }

    public class ILobby
    {
        public readonly string LOBBY_ID;
        protected ILobby(string lobbyID) {
            this.LOBBY_ID = lobbyID;
        }
    }
}