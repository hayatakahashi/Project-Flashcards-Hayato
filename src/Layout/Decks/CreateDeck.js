import React, { useState } from 'react'
import { createDeck } from '../../utils/api'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import DeckForm from './DeckForm'
import BreadCrumb from '../Common/BreadCrumb'
import 'bootstrap-icons/font/bootstrap-icons.css';


const NewDeck = () => {

{/* It provides an initial structure for the formData and sets the initial values for the fields in your form to empty strings.  */}
const initialFormState = {
    name: "",
    description: "",
}
const history = useHistory()

//This is used to keep track of the form inputs. The initial state is an object with empty strings
const [formData, setFormData] = useState({...initialFormState})

{/* The handleChange function updates the formData state to reflect the current text in each input field when the user types. */}
const handleChange = ({target}) => {
    setFormData({
        ...formData,
        [target.name]: target.value
    })
}

{/* Purpose of the handleSubmit function is to handle the process of creating a new deck when the user submits the form. */}
const handleSubmit = (event) => {
    event.preventDefault() //Preventing the default form submission behavior to stop the page from refreshing.


    async function deckCreate() {
        try {
            const newDeck = await createDeck(formData) //Collecting the user's inputs from the form (which is held in the formData state) and Sending the user's input to the server to create a new deck by making an API call.
            history.push(`/decks/${newDeck.id}`) //Navigating to the newly created deck's page after the deck is successfully created.
        } catch (error) {
            if (error===!"AbortError") {
                throw error
            }
        }
    }

    deckCreate()

}


  return (
    <div>
        <BreadCrumb link={`/decks/new`} pageName={"Create Deck"} />
        <div>
        <h1>Create Deck</h1>
        <br />
        <DeckForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}/>
        <br />
        <br />
        <Link to="/"><button className="btn btn-secondary mr-1">Cancel</button></Link> 
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </div>
    </div>
  )
}

export default NewDeck