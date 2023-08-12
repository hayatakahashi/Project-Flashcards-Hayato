import React, { useState, useEffect } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { readDeck, deleteDeck } from '../../utils/api'
import BreadCrumb from '../Common/BreadCrumb'
import CardsList from '../Card/CardsList'
import 'bootstrap-icons/font/bootstrap-icons.css';


const Deck = () => {


{/* "I expect the current URL (the route) to have a parameter called deckId."
"Capture that parameter's value and store it in a constant called deckId."
So, if the current URL was /decks/5, after that line of code, the constant deckId would hold the value "5". */}

  const { deckId } = useParams()
  const [deck, setDeck] = useState({})
  const history = useHistory()

  useEffect(() => {
    async function loadDeck() {
      if (deckId) {
        const loadedDeck = await readDeck(deckId)
        setDeck(loadedDeck)
      }
    }
    loadDeck()
  }, [deckId])

  //delete deck coming soon
  const handleDeckDelete = async () => {
    const confirm = window.confirm("Delete this deck? You will not be able to recover it.")
    if (confirm) {
      await deleteDeck(deckId)
      history.push("/") //this send user to home page after the deck is deleted.
    }
  }


  if (deck.id) {
    return (
      <div>
        <BreadCrumb link={`/decks/${deckId}`} linkName={deck.name} pageName={deck.name} />
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
          <div className='row justify-content-between'>
            <div className='col-8'>

              <Link to={`/decks/${deckId}/edit`}>
                <button className='btn btn-secondary mr-1'>
                  <i className="bi bi-pencil mr-1"></i>
                  Edit
                </button>
              </Link>

              <Link to={`/decks/${deckId}/study`}>
                <button className='btn btn-secondary mr-1'>
                  <i class="bi bi-book mr-1"></i>
                  Study
                </button>
              </Link>

              <Link to={`/decks/${deckId}/cards/new`}>
                <button className='btn btn-primary'>
                  <i class="bi bi-plus mr-1"></i>
                  Add Card
                </button>
              </Link>

            </div>
            <div className='col-2'>
              <button className='btn btn-danger' onClick={handleDeckDelete}><i className='bi bi-trash'></i></button>
            </div>
          </div>

{/* This line is effectively passing the current deck state from the Deck component as a prop named deck to the CardsList component.
When the CardsList component receives this deck prop, it has access to the array of cards (i.e., deck.cards), and then it maps over this array to display each card in the list. */}

          <CardsList deck={deck} />
      </div>
    )
  }
  return "No deck here! Please create a new deck"
}

export default Deck