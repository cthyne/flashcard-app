import React from 'react';
import {Link} from 'react-router-dom';

// create a function for the card form that takes in props
// including the card, it's deck's id, the form's submit 
// component, and the form's change component
function CardForm(
      { submitForm, 
        changeForm, 
        card, 
        deckId }
    ) {
    
    // using these props, display the following content on the page:
    return (

        <form 
        id="cardForm" 
        onSubmit={submitForm}
        style={{fontFamily: "Space Grotesk"}}
        >
               <div className="w-100 m-4">
               <div className="form-group">
                    {/* a text area for the front of the card's content */}
                    <label>
                        Front
                    </label>
                    <textarea  
                        name="front"
                        value={card.front}
                        onChange={changeForm}
                        id="front" 
                        className="form-control d-flex justify-content-start card w-100 mb-4 border-dark" 
                        placeholder="Enter a question"
                        rows={4}
                    />
                </div>

                <div className="form-group">
                    {/* a text area for the back of the card's content */}
                    <label>Back</label>
                    <textarea
                    name="back" 
                    value={card.back}
                    onChange={changeForm}
                    className="form-control card w-100 mb-4 border-dark" 
                    id="back" 
                    placeholder="Enter an answer"
                    rows={4}
                    />
                </div>

               </div>
                {/* a button for when card form is completed */}
                <Link 
                    to={`/decks/${deckId}`} 
                    name="cancel" 
                    className="btn btn-secondary mr-3">
                    Done
                </Link>

                {/* a button for saving the card's content */}
                <button 
                    type="submit" 
                    className="btn btn-primary">
                    Save
                </button>
                
            </form>
    )

}

export default CardForm;