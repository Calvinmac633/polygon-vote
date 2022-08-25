import React from "react";
import './card.scss';
import { vote } from '../Web3Client'

function Card({ ticker, pair, setPair, currentAccount }) {
    return (
        <>
        {(pair && (
           <div className='rounded overflow-hidden shadow-xl m-2 p-2 bg-white w-5/6 max-w-xl'>
           <div className="flex flex-row justify-between m-2 mb-4 align-middle">
             <img className="w-8 h-8 sm:w-8 sm:h-8 md:w-16 md:h-16 lg:w-32 lg:h-32" src={pair.a.image} alt='token' />
             <h1 className="text-2xl sm:m-0 lg:m-12" style={{fontFamily: 'Cutive Mono', fontWeight: '700'}}>{pair.a.ticker}  /  {pair.b.ticker}</h1>
             <img className="w-8 h-8 sm:w-8 sm:h-8 md:w-16 md:h-16 lg:w-32 lg:h-32" src={pair.b.image} alt='token' />
           </div>
         <div className="flex flex-row border">
             <div style={{width: `${pair.a.percent}%`, backgroundColor: `${pair.a.backgroundColor}`}} className="items-center justify-center text-white h-10 ">
                 {(pair.a.percent)}%
             </div>
             <div style={{width: `${pair.b.percent}%`, backgroundColor: `${pair.b.backgroundColor}`}} className="items-center justify-center text-white h-10">
                 {(pair.b.percent)}%
             </div>
         </div>
         {pair.alreadyVoted ? (
              <div className="flex flex-row justify-between m-4">
                 <div className="votes">
                <p>votes: {pair.a.vote}</p>
                </div>
              <div>Already Voted!</div>
              <div className="votes">
                <p>votes: {pair.b.vote}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-row justify-between">
              <div className="votes">
                <p>votes: {pair.a.vote}</p>
              <button
              onClick={() => {
                vote(ticker, true, currentAccount)
              }}
                //   onClick={() => {
                //       if(isAuthenticated){
                //           vote(true)
                //       }else{
                //           alert("Authenticate to vote!")
                //       }
                //   }}
                  className="learn-more"
               >{pair.a.name}
               </button>
              </div>
              <div className="votes">
              <p>votes: {pair.b.vote}</p>
              <button
              onClick={() => {
                vote(ticker, false, currentAccount)
              }}
                //   onClick={() => {
                //       if(isAuthenticated){
                //           vote(false)
                //       }else{
                //           alert("Authenticate to vote!")
                //       }
                //   }}
                  className="learn-more"
               >{pair.b.name}
               </button>
              </div>
          </div>
            )}
         </div>
        ))}
        </>
    )
}

export default Card;