import React, { useState, useEffect } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Common/Home";
import NewDeck from "./Decks/CreateDeck";
import EditDeck from "./Decks/EditDeck";
import StudyDeck from "./Decks/StudyDeck";
import Deck from "./Decks/Deck";
import EditCard from "./Card/EditCard";
import NewCard from "./Card/CreateCard";
import StudyCard from "./Decks/StudyCard";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { listDecks } from "../utils/api";
import 'bootstrap-icons/font/bootstrap-icons.css';

function Layout() {
  //setting the useState for "decks". This shows the list of decks.
  const [decks, setDecks] = useState([])

  useEffect(() => {

    setDecks([]) //is resetting the decks state to an empty array. This is done to ensure a clean slate before loading new deck data.
    const abortController = new AbortController()

    {/* this async function is creating a function to LOAD the decks by fetching the data through the API */}
    async function loadDecks() {
      try {
        const loadedDecks = await listDecks()
        setDecks(loadedDecks) //If successful, it updates the decks state with the loaded decks.
      } catch (error) {
        if(error.name !== "AbortError") { //if the error name is "AborError" then we're good. If the error is NOT "AbortError" then we display the error. 
          throw error
        }
      }
    }

    loadDecks() // is calling the loadDecks function to execute it.
    return () => abortController.abort()

  }, [])

  return (
    <>
      <Header />
      <div className="container">

        <Switch>

          <Route exact path="/">
            <Home decks={decks}/>
          </Route>

          <Route path={"/decks/new"}> {/*This connects the CreateDeck.js to the parent component which will show the DeckForm */}
            <NewDeck />
          </Route>

          <Route path={"/decks/:deckId/cards/new"}> 
            <NewCard />
          </Route>

          <Route path={"/decks/:deckId/cards/:cardId/study"}>
            <StudyCard />
          </Route>

          <Route path={"/decks/:deckId/study"}>
            <StudyDeck />
          </Route>

          <Route path={"/decks/:deckId/edit"}>
            <EditDeck />
          </Route>

          <Route path={"/decks/:deckId/cards/:cardId/edit"}>
            <EditCard />
          </Route>

          <Route path={"/decks/:deckId"} >
            <Deck />
          </Route>

          <Route> 
           <NotFound />
          </Route>

        </Switch>
      </div>
    </>
  );
}

export default Layout;
