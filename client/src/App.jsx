import React, { useEffect, useState } from 'react';
import { auth } from "./firebase";
import Login from "./LoginComponents/Login";
import Home from "./Home";

function App() {
  /*const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in.
        setUser(authUser);
      } else {
        // User is signed out.
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);*/

  return (
    <>
    {/* <div>
      {user ? (
        <Home />
      ) : (
        <Login />
      )}
    </div> */}
        <Login />

    </>
  )
}

export default App
