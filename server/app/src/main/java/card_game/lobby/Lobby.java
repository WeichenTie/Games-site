package card_game.lobby;

import java.util.*;
import java.util.stream.Collectors;

import card_game.lobby.players.Player;


public abstract class Lobby {
    private static Map<String, Lobby> lobbies = new HashMap<String, Lobby>();
    
    protected List<Player> players = new ArrayList<>();
    private String id;
    private Map<String, String> messages = new HashMap<String, String>();
    private int maxLobbySize;
    private int maxActivePlayers;
    private boolean isPrivate;

    //////////////////////////////////////////////////////////////////
    //                                                              //
    //                    Player Related Functions                  //
    //                                                              //
    //////////////////////////////////////////////////////////////////
    public List<Player> getPlayers() {
        return new ArrayList<>(players);
    }

    public void addPlayer(Player player) {
        players.add(player);
    }

    public boolean removePlayer(Player player) {
        return players.remove(player);
    }

    public void clearPlayers() {
        players.clear();
    }

    //////////////////////////////////////////////////////////////////
    //                                                              //
    //                     Lobby Related Functions                  //
    //                                                              //
    //////////////////////////////////////////////////////////////////

    public static void createLobby(String type) {

    }

    public static void removeLobby(String id) {

    }

    public static Lobby getLobbyFromId(String id) {
        return lobbies.get(id);
    }

    public static List<Lobby> getAllLobbiesOfType(Class<?> cls) {
        return lobbies.values().stream().filter(e->cls.isInstance(e)).collect(Collectors.toList());
    }

    public String getId() {
        return id;
    }
    //////////////////////////////////////////////////////////////////
    //                                                              //
    //                     Game Related Functions                   //
    //                                                              //
    //////////////////////////////////////////////////////////////////
    protected abstract void startGame();
    protected abstract void endGame();
}
