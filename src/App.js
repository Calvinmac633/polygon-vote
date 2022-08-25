import React, { useEffect, useState } from 'react';
import './App.css'
import {init} from './Web3Client'
import solanaLogo from './assets/solana.png'
import bitcoinLogo from './assets/bitcoin.png'
import ethereumLogo from './assets/ethereum.png'
import binanceLogo from './assets/binance.png'
import chainlinkLogo from './assets/chainlink.png'
import polygonLogo from './assets/polygon.png'
import avalanceLogo from './assets/avalanche.png';
import Card from './components/card';
import { shortenAddress } from './utils/shortenAddress';
const { ethereum } = window;
let btcEthVoteFlag;
let ethLinkVoteFlag;
let bnbSolVoteFlag;
let maticAvaxVoteFlag;



const App = () => {
  // eslint-disable-next-line
  const [votes, setVotes] = useState(null);
  const [account, setAccount] = useState();
  const [btceth, setBtcEth] = useState();
  const [ethlink, setEthLink] = useState();
  const [bnbsol, setBnbSol] = useState();
  const [maticavax, setMaticAvax] = useState();

  
const connectWallet = async (setAccount) => {
  console.log('connect?')
  try {
      if(!ethereum) return alert("Please install metamask!");
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      window.location.reload();
  } catch (error) {
      console.log('error: ', error)
      alert("Please install and Log in via metamask!");
      throw new Error("No ethereum object!")
  }
}

  useEffect(() => {
    init().then((response) => {
      console.log('RESPONSE: ', response)
      setAccount(response.selectedAccount)
      setVotes(response.pastEvents)
      const reverseEvents = response.pastEvents.slice().reverse();
      getVotes("btc-eth", setBtcEth, reverseEvents, response.selectedAccount);
      getVotes("eth-link", setEthLink, reverseEvents, response.selectedAccount);
      getVotes("bnb-sol", setBnbSol, reverseEvents, response.selectedAccount);
      getVotes("matic-avax", setMaticAvax, reverseEvents, response.selectedAccount);
    })
  }, []);

  async function getVotes(tick, setPair, pastEvents, selectedAccount) {
    console.log('pastEvents: ', pastEvents)
    if (pastEvents && selectedAccount) {
      pastEvents.map((vote) => {
        if (vote.returnValues.voter.toUpperCase() === selectedAccount.toUpperCase()) {
          switch (vote.returnValues.ticker) {
            case 'btc-eth':
              btcEthVoteFlag = true;
              break;
            case 'eth-link':
              ethLinkVoteFlag = true;
              break;
            case 'bnb-sol':
              bnbSolVoteFlag = true;
              break;
            case 'matic-avax':
              maticAvaxVoteFlag = true;
              break;
            default:
              break;
          }
        }
        return vote.returnValues
      })
      let pair = pastEvents.find(vote => vote.returnValues.ticker === tick)
      // console.log('pair: ', pair)
      switch (pair.returnValues.ticker) {
        case 'btc-eth': 
          pair = {
            a: {
              name: 'Bitcoin',
              ticker: 'BTC',
              vote: parseInt(pair.returnValues.a),
              percent: ((parseInt(pair.returnValues.a)/(parseInt(pair.returnValues.a)+parseInt(pair.returnValues.b)))*100).toFixed(0), 
              backgroundColor: 'rgb(247,149,29)',
              image: bitcoinLogo
            },
            b: {
              name: 'Ethereum',
              ticker: 'ETH',
              vote: parseInt(pair.returnValues.b),
              percent:  ((parseInt(pair.returnValues.b)/(parseInt(pair.returnValues.a)+parseInt(pair.returnValues.b)))*100).toFixed(0), 
              backgroundColor: 'rgb(104,110,148)',
              image: ethereumLogo
            },
            alreadyVoted: btcEthVoteFlag
          }
          break;
          case 'eth-link': 
          pair = {
            a: {
              name: 'Ethereum',
              ticker: 'ETH',
              vote: pair ? parseInt(pair.returnValues.a) : 0,
              percent: pair ? ((parseInt(pair.returnValues.a)/(parseInt(pair.returnValues.a)+parseInt(pair.returnValues.b)))*100).toFixed(0) : 0, 
              backgroundColor: 'rgb(104,110,148)',
              image: ethereumLogo
            },
            b: {
              name: 'Chainlink',
              ticker: 'LINK',
              vote: pair ? parseInt(pair.returnValues.b) : 0,
              percent: pair ? ((parseInt(pair.returnValues.b)/(parseInt(pair.returnValues.a)+parseInt(pair.returnValues.b)))*100).toFixed(0) : 0, 
              backgroundColor: 'rgb(42,90,218)',
              image: chainlinkLogo
            },
            alreadyVoted: ethLinkVoteFlag
          }
          break;
          case 'bnb-sol': 
          pair = {
            a: {
              name: 'Binance',
              ticker: 'BNB',
              vote: pair ? parseInt(pair.returnValues.a) : 0,
              percent: pair ? ((parseInt(pair.returnValues.a)/(parseInt(pair.returnValues.a)+parseInt(pair.returnValues.b)))*100).toFixed(0) : 0, 
              backgroundColor: 'rgb(240,185,11)',
              image: binanceLogo
            },
            b: {
              name: 'Solana',
              ticker: 'SOL',
              vote: pair ? parseInt(pair.returnValues.b) : 0,
              percent: pair ? ((parseInt(pair.returnValues.b)/(parseInt(pair.returnValues.a)+parseInt(pair.returnValues.b)))*100).toFixed(0) : 0, 
              backgroundColor: 'rgb(95,199,193)',
              image: solanaLogo
            },
            alreadyVoted: bnbSolVoteFlag
          }
          break;
          case 'matic-avax': 
          pair = {
            a: {
              name: 'Polygon',
              ticker: 'MATIC',
              vote: pair ? parseInt(pair.returnValues.a) : 0,
              percent: pair ? ((parseInt(pair.returnValues.a)/(parseInt(pair.returnValues.a)+parseInt(pair.returnValues.b)))*100).toFixed(0) : 0, 
              backgroundColor: 'rgb(130,71,229)',
              image: polygonLogo
            },
            b: {
              name: 'Avalanche',
              ticker: 'AVAX',
              vote: pair ? parseInt(pair.returnValues.b) : 0,
              percent: pair ? ((parseInt(pair.returnValues.b)/(parseInt(pair.returnValues.a)+parseInt(pair.returnValues.b)))*100).toFixed(0) : 0, 
              backgroundColor: 'rgb(232,65,66)',
              image: avalanceLogo
            },
            alreadyVoted: maticAvaxVoteFlag
          }
          break;
          default:
            return {
              error: 'PAIR CASE NOT FOUND'
            };
      }
      setPair(pair);
    } else {
      console.log('Error')
    }
  }

  return (
    <>
      <div className="App app-background h-[200vh]">
      <div className='header shadow-lg  white-glassmorphism p-3 pb-8 sticky top-0 z-10'>
        <h1 className='text-5xl'>polyVote</h1>
      </div>
        <div className='flex flex-col justify-center md:flex-row'>
          <div className='shadow-xl m-4'>
            <div className='lg:text-3xl md:text-2xl sm:text-2xl text-white m-6 text-center'>Which asset will outperform?</div>
            <div className='lg:text-base md:text-sm sm:text-sm text-white m-6 text-center'>Vote for all the pairs below to be eligible for future airdrops!</div>

          </div>
          <div className='flex flex-col justify-center items-center'>
            {(!account && (
              <button 
              onClick={connectWallet}
              className="bg-maticDark hover:bg-matic text-white font-bold mb-2 py-2 px-4 rounded">
              Connect Wallet
            </button>
            ))}
            {(account && (
              <div className='text-white mb-2 shadow-xl p-6 rounded'>Wallet connected: <br/>{shortenAddress(account)}</div>
            ))}
          </div>
        </div>
     
        <div className='flex flex-col justify-center items-center min-h-screen pb-12'>
          {/* {(!btceth && ( */}
            {/* <div className='text-white text-4xl'>Loading...</div> */}
          {/* ))} */}
        <Card
        ticker={"btc-eth"}
        pair={btceth}
        setPair={setBtcEth}
        currentAccount={account}
        />
        <Card
        ticker={"eth-link"}
        pair={ethlink}
        setPair={setBtcEth}
        currentAccount={account}
        />
        <Card
        ticker={"bnb-sol"}
        pair={bnbsol}
        setPair={setBtcEth}
        currentAccount={account}
        />
        <Card
        ticker={"matic-avax"}
        pair={maticavax}
        setPair={setBtcEth}
        currentAccount={account}
        />
      </div>
      </div>
    </>
  )
}

export default App