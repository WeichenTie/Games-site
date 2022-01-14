using System.Threading.Tasks;
using Server.Api.Models;
namespace Server.Api.Hubs.Clients
{
    public interface ILobbyClient {
        Task ReceiveMessage(ChatMessage message);
        Task StartGame(ChatMessage message);
    }
}