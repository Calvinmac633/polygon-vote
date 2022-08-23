import React, { useEffect, useState } from 'react';
import './App.css'
import {init} from './Web3Client'

const App = () => {
  const [votes, setVotes] = useState(null);

  useEffect(() => {
    init().then((response) => {
      console.log('rESPONSE: ', response)
      setVotes(response)
      // return response
    })
  }, []);

  console.log('votes from setvotes: ', votes)

  return (
    <>
      <div className="App">
        <div>
          <h1>polyVote</h1>
        </div>
      </div>
    </>
  )
}

export default App
