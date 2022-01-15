using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Server.Backend.DataStorage;
using Server.Backend.Models;

namespace Server.Backend.Lobbies {
    public class Lobby {
        public readonly string LOBBY_ID;
        private HashSet<string> players;
        private List<string> messages;
        public Lobby(string lobbyId) {
            this.players = new HashSet<string>();
            this.messages = new List<string>();
            this.LOBBY_ID = lobbyId;
        }
        public void AddPlayer(string token) {
            players.Add(token);
        }
        public void RemovePlayer(string token) {
            players.Remove(token);
        }
        // Returns an Array of all Players
        public HashSet<Player> GetAllPlayersAsHashSet() {
            return players.Select(p => Data.Instance.GetPlayer(p)).ToHashSet();
        }
        // Returns an Array of all Players
        public Player[] GetAllPlayersAsArray() {
            return players.Select(p => Data.Instance.GetPlayer(p)).ToArray();
        }
        // Returns whether a player exists within this lobby
        public bool ContainsPlayer(string token) {
            return players.Contains(token);
        }
        // TODO: Implement chatting 
        public virtual void AddMessage(string player) {
            messages.Add(player + "Sent a message");
        }
    }
}