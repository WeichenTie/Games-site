using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.Linq;

using Server.Api.Hubs.Clients;

using Server.Backend.DataStorage;
using Server.Backend.Models;

namespace Server.Api.Hubs
{
    public class CharacterCreationHub : Hub<ICharacterCreationClient> {
        public async override Task OnConnectedAsync() {
            Console.WriteLine("Connecting to CharacterCreationHub: " + Context.ConnectionId);
        }

        public override Task OnDisconnectedAsync(Exception exception) {
            Console.WriteLine("Disconnecting from CharacterCreationHub: " + Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }
        public async Task CreateCharacter(Player player)
        {
            string token = System.Guid.NewGuid().ToString();
            Data.Instance.AddPlayer(token, player);
            Console.WriteLine($"Created Character: Token: {token} Name: {player.name} Indexes: {player.eyeIndex} + {player.mouthIndex} + {player.colourIndex}");
            await Clients.Caller.ReceiveToken(token);
        }
    }
}