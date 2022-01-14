using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Backend.Lobby {
    public class Lobby {
        public readonly string LOBBY_ID;

        public List<string> Players { get; private set; }

        private List<string> Messages = new List<string>();

        public Lobby(string lobbyId) {
            this.Players = new List<string>();
            this.Messages = new List<string>();

            this.LOBBY_ID = lobbyId;
        }



    }
}