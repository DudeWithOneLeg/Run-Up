
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, Link } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import GroupInfo from "./components/GroupInfo";
import GroupEventsToggle from "./components/GroupEventsToggle";
import GroupForm from "./components/GroupForm/GroupForm";
import UpdateGroupForm from "./components/UpdateGroupForm";
import EventForm from "./components/EventForm";
import LandingPage from "./components/LandingPage";
import EventInfo from "./components/EventInfo";
import UpdateEventForm from "./components/UpdateEventForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  console.log("APP COMPONENT INITIATED")

  useEffect(() => {
    console.log("APP COMPONENT USEEFFECT")
    dispatch(sessionActions.restoreUser())
      .catch((error) => {
        console.log("THERES NO USER", error);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }, [dispatch]);

  return (
    <>
    <Navigation isLoaded={isLoaded} />
    {isLoaded && (

      <Switch>
        <Route exact path='/'>
          <LandingPage />
        </Route>
        <Route exact path='/events/:page/:size'>
          <GroupEventsToggle />
        </Route>
        <Route exact path='/groups/:page/:size'>
          <GroupEventsToggle />
        </Route>
        <Route exact path='/groups/:groupId/events/new'>
          <EventForm />
        </Route>
        <Route exact path='/groups/new'>
          <GroupForm />
        </Route>
        <Route exact path='/groups/:id'>
          <GroupInfo />
        </Route>
        <Route exact path='/groups/:id/edit'>
          <UpdateGroupForm />
        </Route>
        <Route exact path='/events/:eventId'>
          <EventInfo />
        </Route>
        <Route exact path='/events/:eventId/edit'>
          <UpdateEventForm />
        </Route>
      </Switch>


    )}
    </>

  );
}

export default App;
