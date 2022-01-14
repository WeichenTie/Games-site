using System.Threading.Tasks;
using Server.Api.Models;
namespace Server.Api.Hubs.Clients
{
    public interface IChatClient {
        Task ReceiveMessage(ChatMessage message);
    }
}