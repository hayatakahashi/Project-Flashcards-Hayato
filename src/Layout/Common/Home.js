import React, { useState, useEffect } from 'react'
import ListDecks from '../Decks/DeckList'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const Home = ({ decks, setDecks }) => {
  return (
    <div>
        <Link to="/decks/new">
          <button className='btn btn-primary'>
            <i className='bi bi-plus'></i> Create Deck
          </button>
        </Link>
        <ListDecks decks={decks} setDecks={setDecks}/>
    </div>
  )
}

export default Home