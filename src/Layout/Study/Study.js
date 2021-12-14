import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { readDeck } from '../../utils/api/index.js'
import CardList from './CardList'


function Study() {
    const [deck, setDeck] = useState({})
    const {deckId} = useParams()
    
    useEffect(() => { 
        const findDeck = async () => { 
            const currDeck = await readDeck(deckId)
            setDeck(()=> currDeck)    
        }
        findDeck()
    }, [deckId])
    

    if (Object.keys(deck).length) {
        return (
            <div className="mx-auto" style={{fontFamily: "Space Grotesk"}}>
                {/* navigation bar */}
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb bg-light shadow bg-white rounded pt-2 d-flex justify-content-start">

                        <li className="breadcrumb-item">
                            <Link to={`/`}><i className="fa fa-home" aria-hidden="true" style={{color: "black"}}>
                                </i> 
                            </Link>
                        </li>
                        
                        <li className="breadcrumb-item">
                            <Link to={`/decks/${deckId}`}  style={{color: "black"}}>
                                Deck name
                            </Link>
                        </li>

                        <li className="breadcrumb-item" aria-current="page">
                            Study
                        </li>
                    </ol>
                </nav>
                
                {/* title */}
                <div>
                    <h4 className="font-weight-bold d-flex justify-content-center">{deck.name}</h4>
                </div>

                {/* card list */}
                <CardList cards={deck.cards}/>
            </div>
        )

    } else {
        return (
            <div className="spinner-border text-primary" role="status" style={{fontFamily: "Space Grotesk"}} >
                <span className="sr-only">
                   Loading...
                </span>
            </div>
        ) 
    }
}

export default Study