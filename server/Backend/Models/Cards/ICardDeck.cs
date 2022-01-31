using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Server.Backend.DataStorage;
using Server.Backend.Models;

namespace Server.Backend.Models.Cards
{
    public abstract class ICardDeck<TCard> where TCard : ICard
    {
        private List<TCard> FullDeck = new List<TCard>();
        public LinkedList<TCard> Deck = new LinkedList<TCard>();
        public LinkedList<TCard> Graveyard = new LinkedList<TCard>();
        // Init
        public abstract void Init();
        // Draw Card
        public TCard Draw() {
            TCard card = Deck.ElementAt(0);
            Deck.RemoveFirst();
            return card;
        }
         
        // Draw From Location
        public TCard DrawFromLocation(int index) {
            TCard card = Deck.ElementAt(index);
            Deck.Remove(card);
            return card;
        }

        // Shuffle Deck
        public void Shuffle() {
            Random rand = new Random();
            Deck.OrderBy(x=>rand.Next());
        }

        // Peek Deck
        public IReadOnlyList<TCard> PeekMultiple(int depth) {
            List<TCard> cards = new List<TCard>(depth);
            LinkedListNode<TCard> node = Deck.First;
            for (int i = 0; i < depth; ++i) {
                cards.Add(node.Value);
                node = node.Next;
            }
            return cards;
        }
        public TCard PeekAt(int index) {
            
            TCard card = Deck.ElementAt(index);
            Deck.Remove(card);
            return card;
        }

        public void InsertAt(TCard card, int index) {
            LinkedListNode<TCard> node = Deck.First;
            for (int i = 0; i < index; ++i) {
                node = node.Next;
            }
            Deck.AddBefore(node, card);
        }
    }
}