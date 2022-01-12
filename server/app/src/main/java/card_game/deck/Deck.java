package card_game.deck;

import java.util.*;

public class Deck<T extends Card> {
    private List<T> fullDeck = new ArrayList<>();
    private List<T> currentDeck;

    private void loadFromJson(List<String> paths) {

    }

    public void init(List<String> paths) {
        loadFromJson(paths);
        currentDeck = new ArrayList<>(fullDeck);
    }

    public void shuffle() {
        Collections.shuffle(currentDeck);
    }

    public T draw(int index) {
        return currentDeck.remove(index);
    }

    public T draw() {
        return draw(0);
    }

    public void insertTop(T card) {
        currentDeck.add(0, card);
    }

    public void insertBottom(T card) {
        currentDeck.add(card);
    }

    public void insertAt(T card, int index) {
        currentDeck.add(index, card);
    }

    public List<T> peek(int number) {
        List<T> peeked = new ArrayList<>();
        for (int i = 0; i < number; i++) {
            peeked.add(currentDeck.get(i));
        }
        return peeked;
    }

}
