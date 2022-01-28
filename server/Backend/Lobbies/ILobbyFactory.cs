using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Server.Backend.DataStorage;
using Server.Backend.Models;

namespace Server.Backend.Lobbies {
    public class ILobbyFactory {
        public static ILobby CreateLobby(string lobbyType) {
            string id = Guid.NewGuid().ToString();

            switch (lobbyType) {
                case "MAIN":
                    return new MainLobby(id);
            }
            return null;
        }
    }

}