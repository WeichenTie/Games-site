using System.Threading.Tasks;
using Server.Api.Models;
namespace Server.Api.Hubs.Clients
{
    public interface ICharacterCreationClient {
        Task ReceiveToken(string token);
    }
}