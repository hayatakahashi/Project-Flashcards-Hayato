import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { deleteDeck } from '../../utils/api'

const ListDecks = ({ decks }) => {

  const handleDelete = async ({ target }) => {
    const confirm = window.confirm("Delete this deck? You will not be able to recover it.")

    if(confirm) {
      const id = target.getAttribute('data-deckid')
      await deleteDeck(id)
      window.location.reload()
    }
  }


  return (
    <div>
      {decks.map((deck) => {
        return (
        <div className="card w-100 my-3" key={deck.id}>
          <div className="card-body"> 
          <h3 className='card-title'>{deck.name}</h3>
          <p>{deck.cards.length} cards</p>
          <p className='card-text'>{deck.description}</p>
          <div className='container'>
            <Link to={`/decks/${deck.id}`}>
              <button className='btn btn-secondary'>
                <span class="bi bi-eye mr-1"></span>
                View
                </button>
            </Link>
            <Link to={`/decks/${deck.id}/study`}>
              <button className='btn btn-primary'>Study</button>
            </Link>
            <button className='btn btn-danger' 
            data-deckid={deck.id} 
            onClick={handleDelete}>Delete</button>
          </div>
          </div>
        </div>
        )
      })}
    </div>
  )
}

export default ListDecks