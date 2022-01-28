using System.Threading.Tasks;
using Server.Api.Models;
using Server.Backend.Models;
using System.Collections.Generic;
namespace Server.Api.Hubs.Clients
{
    public interface ILobbyClient {
        Task RedirectToCharacterCreate();
        Task Redirect(string addr);
        Task ReceiveMessage(ChatMessage message);
        Task JoinLobby();
        Task LeaveLobby();
        Task ReceiveAllPlayers(IReadOnlyList<Player> players);
    }
}