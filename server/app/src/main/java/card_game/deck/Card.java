package card_game.deck;
import java.util.List;

import com.google.gson.*;

public abstract class Card {
    public abstract JsonObject toJsonObject();
    public abstract List<? extends Card> loadCards();
}