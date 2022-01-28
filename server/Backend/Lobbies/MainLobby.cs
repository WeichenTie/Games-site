using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Server.Backend.DataStorage;
using Server.Backend.Models;

namespace Server.Backend.Lobbies {
    public class MainLobby : ILobby<Player>
    {
        public MainLobby(string lobbyID) : base(lobbyID)
        {
            this.Type = "MAIN";
        }
        public override void AddPlayer(string token)
        {
            if (ContainsPlayer(token)) return;
            players.Add(token, Data.Instance.GetPlayer(token));
        }
    }

}