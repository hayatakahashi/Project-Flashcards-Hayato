import React, {useEffect, useState} from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import DeckForm from './DeckForm'
import BreadCrumb from '../Common/BreadCrumb'
import { readDeck, updateDeck } from '../../utils/api'

const EditDeck = () => {
  
    const initialFormState = {
        name: "",
        description: ""
    }

    const [deck, setDeck] = useState({...initialFormState})
    const history = useHistory() //a way for you to manage and interact with the browser's session history but within the context of your React app.
    const {deckId} = useParams() //extracting the deckId value from the URL's dynamic segment.


{/* the primary goal of this useEffect is to fetch the specific deck's data 
when the EditDeck component is mounted (or when the deckId changes) and 
then update the component's state with this data to reflect any changes. 
This allows the component to have the latest data from the backend to display and edit. */}


    useEffect(() => {
        async function loadDeck() {
            try {
                const loadedDeck = await readDeck(deckId)
                setDeck(loadedDeck)
            } catch (error) {
                if (error.name !== "AbortError") {
                    throw error
                }
            }
        }
        loadDeck()
    }, [deckId]) // <-- useEffect runs whenever deckId value changes


// The handleChange function is an event handler designed to update 
// the local state (deck) when changes are made to an input field within a form.

    const handleChange= (({target}) => { // extracting the target info, which will be triggered by the input field.
        setDeck({
            ...deck,
            [target.name]: target.value
// if you have an input element like <input name="description" ... />, then target.name would be "description".
// if the user typed "Hello" into an input box with name="description", 
// the line [target.name]: target.value would be equivalent to { description: "Hello" }.
        })
    })

{/* the handleSubmit function's purpose is to handle the submission of the form to edit a deck. 
When triggered, it sends the updated deck data to be saved (via an API call or some other means), 
and then it navigates the user to the page of the updated deck. */}

    const handleSubmit = (even) => {
        event.preventDefault()
        async function updateDeckData() {  // async function called updateDeckData to update the deck we are currently on.
            await updateDeck(deck)         // calls the updateDeck function with the "deck" we're on.
            history.push(`/decks/${deck.id}`)   // Takes user to the deck they just updated.
        }
        updateDeckData()
    }

    return (
        <div>
            <BreadCrumb link={`/decks/${deckId}/edit`} linkName={deck.name} pageName={"Edit"} />
            <div className='container'>
                <div className='row'>
                    <h1>Edit Deck</h1>
                    <br />
                </div>
                <div className='row w-100'>

{/* formData={deck} passes the current state of the deck to the DeckForm
    handleChange provides DeckForm with the handleChange function
    handleSubmit provides DeckForm with the handleSubmit function.
    These 3 are passed in the arguments section in DeckForm component*/}

                    <DeckForm formData={deck} handleChange={handleChange} handleSubmit={handleSubmit} />

                </div>
                <div className='row'>
                <Link to={`/decks/${deckId}`}><button className='btn btn-secondary mr-1'>Cancel</button></Link>
                <button type='submit' className='btn btn-primary' onClick={handleSubmit}>Save</button>
                </div>
            </div>
        </div>
    )




}

export default EditDeck