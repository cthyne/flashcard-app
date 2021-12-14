import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory, useRouteMatch } from "react-router-dom";
import { deleteCard, readDeck } from "../../utils/api/index.js";
import { deleteDeck } from "../../utils/api/index.js";

// create a function that retrieves an updated deck's id,
// fetches it's card data, and sets the deck's useState to
// contain it's content
function Deck({ updateDecks }) {
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();
  const history = useHistory();
  const { url } = useRouteMatch();
  const { id, name, description, cards } = deck;

  useEffect(() => {
    const abortController = new AbortController();
    const deckInfo = async () => {
      const response = await readDeck(deckId, abortController.signal);
      setDeck(() => response);
    };
    deckInfo();
    return () => abortController.abort();
  }, [deckId]);

  // create a handler for the delete button
  const deleteHandler = async () => {
    // if the button is clicked and confirmed by the user, delete the deck using it's id
    if (
      window.confirm(
        "Are you sure you want to delete this deck? You will not be able to recover it."
      )
    ) {
      await deleteDeck(id);
      // use updateDecks() to subtract it from the card deck
      updateDecks(-1);
      // redirect to the home page
      history.push("/");
      // if the delete is not confirmed, leave the deck as is and remain on the same page
    } else {
      history.go(0);
    }
  };

  // if there is no deck or no cards, return the following webpage
  // that displays "loading..."
  if (!deck || !cards) {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      // if a deck or cards are present, return a webpage with the following content
    );
  } else {
    return (
      <div style={{ fontFamily: "Space Grotesk" }}>
        {/* a navigation bar with the following links */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-light shadow bg-white rounded pt-2 d-flex justify-content-start">
            {" "}
            {/* a link to the home page */}
            <li className="breadcrumb-item">
              <Link to={`/`}>
                <i
                  className="fas fa-home"
                  style={{ color: "black" }}
                  aria-hidden="true"
                ></i>
              </Link>
            </li>
            {/* a string containing the deck's name */}
            {/* <li className="breadcrumb-item">{name}</li> */}
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`} style={{ color: "black" }}>
                {name}
              </Link>
            </li>
            <li className="breadcrumb-item">Cards</li>
          </ol>
        </nav>

        {/* a container holding the card deck, including their name,
                description, a button to study it, a button to edit it, a 
                button to add cards to the deck, and a button to delete it */}

        <div className="card border-0 mb-4">
          <div className="card-body">
            <div className="row">
              <h5 className="card-title ml-3">{name}</h5>
            </div>

            {/* deck description */}
            <p className="card-text">{description}</p>

            <div className="row justify-content-end">
              {/* edit button */}
              <Link
                to={`/decks/${id}/edit`}
                className="btn btn-lg btn-outline-secondary pl-1 pr-1 ml-2 pt-3"
              >
                <i
                  aria-hidden="true"
                  style={{ color: "black" }}
                  className="bi bi-pencil-fill p-2"
                ></i>
              </Link>

              {/* study button */}
              <Link
                to={`/decks/${id}/study`}
                className="btn btn-lg btn-outline-secondary pl-1 pr-1 ml-2 pt-3"
              >
                <i className="bi bi-book p-2" style={{ color: "black" }}></i>
              </Link>

              {/* add cards button */}
              <Link
                to={`/decks/${id}/cards/new`}
                className="btn btn-lg btn-outline-secondary pl-1 pr-1 ml-2 pt-3"
              >
                <i
                  className="fa fa-plus p-2"
                  style={{ color: "black" }}
                  aria-hidden="true"
                ></i>
              </Link>

              {/* delete button */}
              <button
                onClick={deleteHandler}
                name="delete"
                value={id}
                className="btn btn-lg btn-outline-secondary p-1 ml-2"
              >
                <i
                  className="fa fa-trash p-2"
                  style={{ color: "black" }}
                  aria-hidden="true"
                ></i>
              </button>
            </div>
          </div>
        </div>

        {/* a container containing all cards, including their front, back
                an edit button, and a delete button */}

        <div className="row pl-4 pb-2">
          <h1>Cards</h1>
        </div>

        {cards.map((card, index) => (
          <div className="row d-flex justify-content-center" key={index}>
            <div className="card col-sm-5 m-4">
              <div className="row card-body">
                {/* front */}
                <h4 className="col-6 card-text">{card.front}</h4>
              </div>

              <div className="d-flex justify-content-end pl-4">
                {/* edit button */}
                <Link
                  to={`${url}/cards/${card.id}/edit`}
                  className="btn btn-lg btn-outline-secondary pt-3 pb-3 pl-3 pr-3 m-4"
                >
                  <i
                    aria-hidden="true"
                    style={{ color: "black" }}
                    className="bi bi-pencil-fill pl-2 pr-2"
                  ></i>
                </Link>

                <Link
                  onClick={async () => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this card? You will not be able to recover it."
                      )
                    ) {
                      await deleteCard(card.id);
                      updateDecks(-1);
                      history.go(0);
                    } else {
                      history.go(0);
                    }
                  }}
                  name="deleteCard"
                  value={card.id}
                  className="btn btn-lg btn-outline-secondary pt-3 pb-3 pl-3 pr-3 ml-0 mr-4 mt-4 mb-4"
                >
                  <i
                    className="fa fa-trash p-2"
                    style={{ color: "black" }}
                    aria-hidden="true"
                  ></i>{" "}
                </Link>
              </div>
            </div>
            <div className="card col-sm-5 m-4">
              <div className="row card-body">
                {/* front */}

                {/* back */}
                <h4 className="col-6 card-text">{card.back}</h4>
              </div>

              <div className="d-flex justify-content-end pl-4">
                {/* edit button */}
                <Link
                  to={`${url}/cards/${card.id}/edit`}
                  className="btn btn-lg btn-outline-secondary pt-3 pb-3 pl-3 pr-3 m-4"
                >
                  <i
                    aria-hidden="true"
                    style={{ color: "black" }}
                    className="bi bi-pencil-fill pl-2 pr-2"
                  ></i>
                </Link>

                <Link
                  onClick={async () => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this card? You will not be able to recover it."
                      )
                    ) {
                      await deleteCard(card.id);
                      updateDecks(-1);
                      history.go(0);
                    } else {
                      history.go(0);
                    }
                  }}
                  name="deleteCard"
                  value={card.id}
                  className="btn btn-lg btn-outline-secondary pt-3 pb-3 pl-3 pr-3 ml-0 mr-4 mt-4 mb-4"
                >
                  <i
                    className="fa fa-trash p-2"
                    style={{ color: "black" }}
                    aria-hidden="true"
                  ></i>{" "}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Deck;

// The Deck screen has the following features:

// The path to this screen should include the deckId (i.e., /decks/:deckId).
// There is a breadcrumb navigation bar with a link to home / followed by the name of the deck (e.g., Home/React Router).
// The screen includes the deck name (e.g., "React Router") and deck description (e.g., "React Router is a collection of navigational components that compose declaratively in your application").
// The screen includes "Edit", "Study", "Add Cards", and "Delete" buttons. Each button takes the user to a different destination, as follows:

// | Button Clicked | Destination |
// | -------------- | ---------------------------------------------------------------------------------------------- |
// | "Edit" | Edit Deck Screen |
// | "Study" | Study screen |
// | "Add Cards" | Add Card screen |
// | "Delete" | Shows a warning message before deleting the deck]( See the "Delete Card Prompt" section below) |

// Each card in the deck:

// is listed on the page under the "Cards" heading.
// shows a question and the answer to the question.
// has an “Edit” button that takes the user to the Edit Card screen when clicked.
// has a “Delete” button that allows that card to be deleted.