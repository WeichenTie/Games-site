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
    public class LoveLetterLobbyHub : ILobbyHub<Player, ILoveLetterClient> {
        public override string GetLobbyType() {
            return "LoveLetter";
        }
    }
}