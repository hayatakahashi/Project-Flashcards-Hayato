import React, { useState } from 'react'
import { useHistory, Link, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import 'bootstrap-icons/font/bootstrap-icons.css';


const StudyCard = ({cards}) => {

    const initialState = {
      onBack: false,  //is a boolean that determines if the back of the card is currently being shown.
      currentCard: 0,  //keeps track of which card in the array the user is currently studying.
    }

    const [studySession, setStudySession] = useState({...initialState})

    const { deckId } = useParams()  //gets parameters from the URL, like deckId
    const history = useHistory()  //provides access to the history object which you can use to navigate programmatically.


{/* This function determines what happens when the user clicks "Next". 
If there's another card to study, it moves to that card. 
If it's the last card, it prompts the user to either restart the study session or go back to the homepage. */}
    const handleNext = () => {
      if (studySession.currentCard < cards.length -1) {
        setStudySession({
          ...studySession,  //takes all the current properties of the studySession state.
          currentCard: studySession.currentCard + 1,  //increments the currentCard index by 1, meaning it moves to the next card in the deck.
          onBack: false,  //ensures that the next card will show its front side first (and not its back).
        })
      } else {
        const confirm = window.confirm("Restart cards? Click cancel to return to the home page.")
        if (confirm) {
          setStudySession(initialState)
        } else {
          history.push("/")
        }
      }
    } 


  // handleFlip, is responsible for toggling between the front and back of the current card being studied.
    const handleFlip = () => {
      if (studySession.onBack) {
        setStudySession({
          ...studySession,
          onBack: false
        })
      } else {
        setStudySession({
          ...studySession, 
          onBack: true
        })
      }
    }


{/* The reason for adding 1 is because studySession.currentCard is an index, and indices in JavaScript are 0-based. 
This means the first card is 0, the second card is 1, and so on. 
However, for a user-friendly display, we don't want to show "Card 0 of 5"; 
instead, we'd want to show "Card 1 of 5". Hence the addition of 1. */}


    if (cards.length > 2) {
      return (
        <div className='container'>
          <div className='card w-100'>
            <div className='card-body'>
              <h4 className='card-title'>
                {/*Shows the number of cards out of the length of the cards. */}
                Card {studySession.currentCard + 1} of {cards.length} 
              </h4>
              <p className='card-text' font-weight-lighter>
{/* The paragraph will display the back content of the current card if studySession.onBack is true, otherwise, it will display the front content.  */}
 {/* IF studySession is onBack, THEN (?) for the CARDS, show the BACK of the CURRENTCARD in the studySession
 ELSE (:) show the FRONT of the CARDS of the CURRENT card in the studySession */}               
                {studySession.onBack
                ? cards[studySession.currentCard].back
                : cards[studySession.currentCard].front
                }
              </p>
              <button className='btn btn-secondary mr-1'
              onClick={handleFlip}>Flip</button>
{/*utilizes the logical AND operator. The NEXT button will only show 
if the studySession is showing the BACK of the card. If it's showing the front..
The NEXT button won't appear. */}
              {studySession.onBack && (
                <button className='btn btn-primary' onClick={handleNext}>Next</button>
              )}
            </div>
          </div>
        </div>
      )
    } else {
        return (
          <>
          <h5>Not enough cards.</h5>
          <div className='row my-4'>
              <p>You need at least 3 cards to study. This deck has {cards.length} cards</p>
          </div>
          <div className='row my-5'>
            <Link to={`/decks/${deckId}/cards/new`}>
              <button className='btn btn-primary'>
                <i className='bi bi-plus mr-1'></i>
                Add Card
              </button>
            </Link>
          </div>
          </>
        )
    }
}

export default StudyCard