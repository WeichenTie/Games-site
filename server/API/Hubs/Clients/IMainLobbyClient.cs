using System.Threading.Tasks;
namespace Server.Api.Hubs.Clients {
    public interface IMainLobbyClient : ILobbyClient {
        Task RedirectToLobby(string url, string lobbyId);
    }
}