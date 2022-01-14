using Microsoft.AspNetCore.SignalR;
using Server.Api.Hubs.Clients;
using Server.Api.Models;
using System.Threading.Tasks;
using System;
namespace Server.Api.Hubs
{
    public class LobbyHub : Hub<ILobbyClient>
    {
        public async Task SendMessage(ChatMessage message)
        {
            Console.WriteLine("Sending Message ...");
            await Clients.All.ReceiveMessage(message);
            Console.WriteLine("Done Sending Message");
        }
    }
}