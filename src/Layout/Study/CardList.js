import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

function CardList({ cards }) {
  const [currentCard, setCurrentCard] = useState(0);
  // set the card to be on the front side
  const [frontSide, setFrontSide] = useState(true);
  const { deckId } = useParams();
  const history = useHistory();

  // if user is on the last card in the deck, notify to restart it,
  // or return to home page if not
  const nextHandler = () => {
    if (currentCard === cards.length - 1) {
      window.confirm(
        "Click OK to restart the deck, or CANCEL to return to the homepage."
      )
        ? setCurrentCard(() => 0)
        : history.push("/");

      // if not, go to next card
    } else {
      setCurrentCard((currentCard) => currentCard + 1);
      setFrontSide(() => !frontSide);
    }
  };

  // if user flips card, change sides
  const flipHandler = () => {
    setFrontSide(() => !frontSide);
  };

  // if there are more than two cards in the deck
  if (cards.length > 2) {
    return (
      <div style={{ fontFamily: "Space Grotesk" }} className="row p-3">
        <div className="card w-100">
          <div className="card-body">
            <h5 className="card-title">
              Card {currentCard + 1} of {cards.length}
            </h5>

            <p className="card-text">
              {frontSide ? cards[currentCard].front : cards[currentCard].back}
            </p>

            {/* flip card button */}
            <button onClick={flipHandler} className="btn btn-secondary mr-3">
              Flip
            </button>

            {/* if card is on back side, provide a button to go to next card */}
            {frontSide ? null : (
              <button onClick={nextHandler} className="btn btn-primary">
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="row p-3" style={{fontFamily: "Space Grotesk"}}>
        <div className="pl-4 pr-4 w-100">
          <div className="card-body">
          <div className="row pl-3 pb-2">
        <h1>Your Cards</h1>
      </div>
            <div className="card m-4 shadow p-2 mb-5 bg-white rounded">
              <div className="card-body">
                <h4 className="card-title d-flex justify-content-center pt-3">
                  Front of card
                </h4>

                <Link
                  to={`/decks/${deckId}/cards/new`}
                  className="btn d-flex justify-content-end"
                ></Link>
              </div>

              {/* flip card button */}
              <button
                onClick={flipHandler}
                className="btn btn-light border-dark mb-4 mx-auto pl-4 pr-4 pb-2 pt-2"
              >
                Flip
              </button>

              {/* if card is on back side, provide a button to go to next card */}
            </div>
            <div className="card m-4 shadow p-2 mb-5 bg-white rounded">
              <div className="card-body">
                <h4 className="card-title d-flex justify-content-center pt-3">
                  Front of card
                </h4>

                <Link
                  to={`/decks/${deckId}/cards/new`}
                  className="btn d-flex justify-content-end"
                ></Link>
              </div>

              {/* flip card button */}
              <button
                onClick={flipHandler}
                className="btn btn-light border-dark mb-4 mx-auto pl-4 pr-4 pb-2 pt-2"
              >
                Flip
              </button>

              {/* if card is on back side, provide a button to go to next card */}
            </div>

            <div className="card m-4 shadow p-2 mb-5 bg-white rounded">
              <div className="card-body">
                <h4 className="card-title d-flex justify-content-center pt-3">
                  Front of card
                </h4>

                <Link
                  to={`/decks/${deckId}/cards/new`}
                  className="btn d-flex justify-content-end"
                ></Link>
              </div>

              {/* flip card button */}
              <button
                onClick={flipHandler}
                className="btn btn-light border-dark mb-4 mx-auto pl-4 pr-4 pb-2 pt-2"
              >
                Flip
              </button>

              {/* if card is on back side, provide a button to go to next card */}
            </div>
            <div className="card m-4 shadow p-2 mb-5 bg-white rounded">
              <div className="card-body">
                <h4 className="card-title d-flex justify-content-center pt-3">
                  Front of card
                </h4>

                <Link
                  to={`/decks/${deckId}/cards/new`}
                  className="btn d-flex justify-content-end"
                ></Link>
              </div>

              {/* flip card button */}
              <button
                onClick={flipHandler}
                className="btn btn-light border-dark mb-4 mx-auto pl-4 pr-4 pb-2 pt-2"
              >
                Flip
              </button>

              {/* if card is on back side, provide a button to go to next card */}
            </div>
            <div className="row mx-auto w-75">
            <Link to={`/decks/new`}  className="btn-lg btn-success mb-3 mx-auto pr-4">
              <i className="fa fa-plus mr-2 pl-2" aria-hidden="true">
              </i> 
              Add Card
            </Link>
        </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CardList;