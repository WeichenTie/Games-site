using Microsoft.AspNetCore.SignalR;
using Server.Api.Hubs.Clients;
using Server.Api.Models;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.Linq;
namespace Server.Api.Hubs
{
    public class CharacterCreationHub : Hub<ICharacterCreationClient> {
        public override Task OnConnectedAsync()
        {
            Console.WriteLine("Connected to Character Hub...");
            return base.OnConnectedAsync();
        }


        public async Task SendMessage(UserData user)
        {

            Console.WriteLine("Creating Character...");
            Console.WriteLine("Character Created With: " + user.Name + " " + user.EyeIndex + " " + user.MouthIndex + " " + user.ColourIndex);
            await Clients.Caller.ReceiveToken(System.Guid.NewGuid().ToString());
        }
    }
}