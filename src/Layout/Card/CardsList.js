import React from 'react'
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { deleteCard, deleteDeck, updateDeck } from '../../utils/api'
import 'bootstrap-icons/font/bootstrap-icons.css';


const CardsList = ({deck}) => {

  //Extracts the deckId parameter from the current route.
  const { deckId } = useParams()



  const hadnleCardDelete = async ({target}) => {
    const confirm = window.confirm("Delete this deck? You will not be able to recover it.")
    if (confirm) {
      deleteCard(target.value) // Calls the deleteCard function with the card's ID (held in the button's value attribute) as an argument. This should send a request to the backend to delete the specific card.
      .then(updateDeck(deckId)) // After the card is deleted, the updateDeck function is called to refresh or update the deck's data. 
      .then(window.location.reload()) // Finally, after the deck is updated, the page is forcefully reloaded using window.location.reload().
    }
  }



  return (
    <div className='container'>
      <h2>Cards</h2>
      <div className='card-list'>
        {/* For every card in that array, it will render the following JSX: */}
        {deck.cards.map((card) => ( //deck prop in CardsList refers to the deck state from your Deck component is an array of card objects that you're mapping over to render each card. 
          <div className='card' key={card.id}>
            <div className='card-body'>
              <div className='container'>
                <div className='row justify-content-start my-2'>
                  <div className='col-6'>
                    {card.front}
                  </div>
                  <div className='col-6'>
                    {card.back}
                  </div>
                </div>
                <div className='row'>
                  <div className='col-9'>

                  </div>
                  <div className='col-3 pt-2 pb-1'>
                    <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
                      <button className='btn btn-secondary mr-1'>
                        <i className='bi bi-pencil mr-1'></i>Edit
                        </button>
                    </Link>
                    <button onClick={hadnleCardDelete} value={card.id} className='btn btn-danger'>
                      <i value={card.id} className='bi bi-trash'></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CardsList