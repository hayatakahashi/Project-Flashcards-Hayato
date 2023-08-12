import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { readDeck } from '../../utils/api'
import BreadCrumb from '../Common/BreadCrumb'
import StudyCard from './StudyCard'

{/* 
Purpose: 
The StudyDeck serves as a container or a wrapper for studying a specific deck. 
It fetches the deck data from the server and displays relevant details, as well as rendering the individual study cards for user interaction.

Primary Actions:
Upon mounting, it fetches the specific deck's data based on the deck's ID obtained from the URL.
Displays a breadcrumb for better UI navigation.
Renders the StudyCard component, which will show the individual cards from the fetched deck. */}



const StudyDeck = () => {

    const [deck, setDeck] = useState({})
    const {deckId} = useParams()

    useEffect(() => {
        async function loadDeck() {
            const newDeck = await readDeck(deckId)
            setDeck(newDeck)
            console.log(newDeck);
        }

        loadDeck()
    }, [deckId])


 // IF the deck object has any keys (length > 0), THEN show the following info.
 // IF there's nothing or 0 or empty object {}, then show "Loading deck here..."    

    if (Object.keys(deck).length) {
        return (
            <>
            <BreadCrumb link={`/decks/${deckId}`} linkName={deck.name} pageName={"Study"} />
            <div className='row'>
                <h2>Study: {deck.name}</h2>
            </div>
            <div className='row'>
                <StudyCard cards={deck.cards} />
            </div>
            </>
        )
    } else return "Loading deck here..."
}

export default StudyDeck