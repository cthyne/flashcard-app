import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api/index.js";
import CardForm from "./CardForm.js";

// create a component for adding a card to a deck that takes in
// the function updateDecks(newDecks) as a prop. this function
// takes the current number of decks, and returns it after adding
// the newly added decks

function AddCard() {
  // the original state of a card deck is an empty array
  const [deck, setDeck] = useState([]);

  // the original state of a card is an object containing
  // empty strings for the front and back of the card, as
  // well as it's deck's id
  const [card, addCard] = useState({ front: "", back: "", deckId: "" });

  // create a variable for a deck's id to be used as a parameter
  const { deckId } = useParams();

  // use useEffect() to create a callback function with a deck's
  // id as a dependency
  useEffect(() => {
    // use abortController() to abort any web requests for different
    // decks
    const abortController = new AbortController();

    // create a variable that takes a deck's id, and returns it's
    // api url
    const deckInfo = async () => {
      const response = await readDeck(deckId, abortController.signal);
      // with this url, set an array containing the data from the deck
      setDeck(() => response);
    };

    // return the newly created deck
    deckInfo();
    return () => abortController.abort();
  }, [deckId]);

  // changeForm takes the targeted deck, and modifies a card's
  // useState to also contain it's name and value
  const changeForm = ({ target }) => {
    addCard({ ...card, [target.name]: target.value });
  };

  const submitForm = (event) => {
    event.preventDefault();
    // uses 'addCard' to add the new card to deck.
    addCard({ ...card, deckId: deckId });
    // use 'createCard()' from utils/api/index.js;
    // makes a post request to add the card to the decks
    // card list, and stringify's so it is no longer an object.
    createCard(deckId, card);
    // returns a new length of the card deck using 'updateDecks()'
    //updateDecks(1)
    // reset the deck initial state
    console.log("'submitForm' saved");
    addCard({ front: "", back: "", deckId: "" });
  };

  // display the web page with the following content
  return (
    <div className="col-9 mx-auto" style={{ fontFamily: "Space Grotesk" }}>
      {/*navigation bar */}
      <div className="row pl-4 pb-2">
        <h1>Add Card</h1>
      </div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-light shadow bg-white rounded pt-2 d-flex justify-content-start ml-4 mr-4 pr-4">
          {/* a link to the home page */}
          <li className="breadcrumb-item">
            <Link to={`/`}>
              <i
                className="fa fa-home"
                style={{ color: "black" }}
                aria-hidden="true"
              ></i>
            </Link>
          </li>

          {/* a link to the deck */}
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`} style={{ color: "black" }}>
              {/* Deck name */}
              {deck.name} 
            </Link>
          </li>

          {/* a link for adding a card */}
          <Link className="breadcrumb-item" to={`/decks/${deckId}/cards/new`} style={{ color: "black" }}> Add Card</Link>
        </ol>
      </nav>

      <div className="row  d-flex justify-content-start pb-2">
        {/* a heading that display's the deck's name and "add card" */}
        <h4>{deck.name}</h4>
      </div>

      {/* display the card form using the cardForm component which will
            display a form for adding content to the front and back of the card,
            as well as a button for finishing, and one for saving the card */}
      <CardForm
        submitForm={submitForm}
        changeForm={changeForm}
        card={card}
        deckId={deckId}
      />
    </div>
  );
}

export default AddCard;