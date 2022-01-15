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
        public async Task CreateCharacter(Player player)
        {
            string token = System.Guid.NewGuid().ToString();
            player.UUID = token;
            Data.Instance.AddPlayer(player);
            Console.WriteLine($"Created Character: UUID: {player.UUID} Name: {player.name} Indexes: {player.eyeIndex} + {player.mouthIndex} + {player.colourIndex}");
            await Clients.Caller.ReceiveToken(token);
        }
    }
}