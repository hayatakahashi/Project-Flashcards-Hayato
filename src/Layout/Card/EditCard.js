import React, { useState, useEffect } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import CardForm from './CardForm'
import BreadCrumb from '../Common/BreadCrumb'
import { readCard, readDeck, updateCard } from '../../utils/api'


const EditCard = () => {

    const { deckId, cardId } = useParams()  //cardId is a dynamic value coming from the URL, representing the ID of the card you want to edit.
    const history = useHistory()
    const [deck, setDeck] = useState({})
    const [card, setCard] = useState({})


    useEffect(() => {
        const loadDeck = async () => setDeck(await readDeck(deckId))  //fetches a specific deck using the readDeck(deckId) function. 
        loadDeck()   //the deckId from the URL acts as a unique identifier telling your component which specific deck's data to fetch and display.

        const loadCard = async () => setCard(await readCard(cardId)) 
        loadCard()
    }, [deckId,cardId])


    //Updates the card's local state when a user makes changes in the form.
    //keep the card state synchronized with what's in the form. 
    //This ensures that when the user submits the form, we have the most recent data to send to the server.
    const handleChange = ({ target }) => {
        setCard({
            ...card,
            [target.name]: target.value
        })
    }


    // Defines what happens when the form is submitted.
    //Once the user is satisfied with their edits, this function 
    //sends the updated card data to the server and redirects the user back to the deck view. 
    const handleSubmit = (event) => {
        event.preventDefault()
        async function updateCardData() {
            try {

// it sends the updated card data (card we're working on) to be saved in the database of cards.
                await updateCard(card)  
                history.push(`/decks/${deckId}`)
            } catch (error) {
                if (error.name !== "AbortError") {
                    throw error
                }
            }
        }
        updateCardData()
    }




  return (
    <div>
        <BreadCrumb link={`/decks/${deckId}`} linkName={`Deck ${deck.name}`} pageName={`Edit Card ${cardId}`} />
        <div className='row w-100'>
            <CardForm formData={card} handleChange={handleChange} handleSubmit={handleSubmit} />
        </div>
        <div>
            <Link to={`/decks/${deckId}`} className="btn btn-secondary mr-1">Cancel</Link>
            <button type='submit' className='btn btn-primary' onClick={handleSubmit} >Save</button>
        </div>
    </div>
  )
}

export default EditCard