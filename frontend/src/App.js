
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

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

      </Switch>
    )}
    </>

  );
}

export default App;
