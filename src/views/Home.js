import React from 'react'
import { useSelector } from 'react-redux'

function Home(props) {
  const auth = useSelector(store=>store.firebase.auth);
  const authuid = auth.uid;
   return (
    <div className="container">
      <h1 className="center">Home</h1>
      {(authuid)?(
        <>
        <p className="center flow-text green-text">Is Authticated</p>
        <p className="center">authuid: {authuid}</p>
        </>
      ):(
        <p className="center flow-text red-text">Not Authticated</p>
      )}
    </div>
  )
}

export default Home
