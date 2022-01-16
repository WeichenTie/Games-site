using System.Threading.Tasks;
using Server.Api.Models;
using Server.Backend.Models;
using System.Collections.Generic;
namespace Server.Api.Hubs.Clients
{
    public interface ILobbyClient {
        Task RedirectToCharacterCreate();
        Task ReceiveMessage(ChatMessage message);
        Task JoinLobby();
        Task LeaveLobby();
        Task ReceiveAllPlayers(List<Player> players);
    }
}