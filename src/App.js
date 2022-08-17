import React, { useEffect } from 'react';
import './App.css'
import {init} from './Web3Client'

function App() {

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="App">
      <div className='text-3xl underline'>
        Hello World
      </div>
    </div>
  )
}

export default App
