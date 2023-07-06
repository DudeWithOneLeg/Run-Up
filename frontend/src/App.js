
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, Link } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import GroupInfo from "./components/GroupInfo";
import GroupEventsToggle from "./components/GroupEventsToggle";
import GroupEvents from "./components/GroupEvents";
import GroupForm from "./components/GroupForm/GroupForm";

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
        <Link to='/groups'>See all groups</Link>
        </Route>
        <Route exact path='/events'>
          <GroupEventsToggle />
        </Route>
        <Route exact path='/groups'>
          <GroupEventsToggle />
        </Route>
        <Route exact path='/groups/new'>
          <GroupForm />
        </Route>
        <Route exact path='/groups/:id'>
          <GroupInfo />
          <GroupEvents />
        </Route>

      </Switch>


    )}
    </>

  );
}

export default App;
