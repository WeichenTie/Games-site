using System.Threading.Tasks;
using Server.Api.Models;
using Server.Backend.Models;
namespace Server.Api.Hubs.Clients
{
    public interface ILobbyClient {
        Task GetToken();
        Task ReceiveMessage(ChatMessage message);
        Task JoinLobby();
        Task LeaveLobby();
        Task ReceiveAllPlayers(Player[] players);
    }
}