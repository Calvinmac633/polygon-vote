import Web3 from 'web3';
import MarketSentiment from './utils/MarketSentiment.json'

let selectedAccount;

export const init = async () => {
    let provider = window.ethereum;

    if (typeof provider !== 'undefined'){
      provider
        .request({ method: 'eth_requestAccounts'})
        .then((accounts) => {
            selectedAccount = accounts[0];
            console.log('accounts in useEffect: ', accounts)
        })
        .catch((err) => {
          console.log('error: ', err)
        })

        window.ethereum.on('accountsChanged', function (accounts) {
            selectedAccount = accounts[0];
            console.log('accounts changed: ', accounts)
        });
    }
    
    console.log('selectedaccount: ', selectedAccount)

    const web3 = new Web3(provider);
    const networkId = await web3.eth.net.getId();
    console.log('networkIDdddd: ', networkId)

    const votesContract = new web3.eth.Contract(
      MarketSentiment.abi, 
      '0xb61074165788aDFC4a17C300b702AF2D8de85FB4'
      )

    console.log('votesCOntract: ', votesContract)

    let options = {
      filter: {
          // value: [],
      },
      fromBlock: 27578100,
      toBlock: 'latest'
  };
  

  const pastEvents = await votesContract.getPastEvents('tickerupdated', options)
    .then(response => {
      console.log('response past events: ', response)
      return response
    })
    
    const getAllEvents = await votesContract.events.allEvents();
    console.log('getallEvents: ', getAllEvents)

    const btcEthVotes = await votesContract.methods.getVotes('btc-eth').call();
    const ethLinkVotes = await votesContract.methods.getVotes('eth-link').call();
    const bnbSolVotes = await votesContract.methods.getVotes('bnb-sol').call();
    const maticAvaxVotes = await votesContract.methods.getVotes('matic-avax').call();
    
    const votes = {
      btcEth: btcEthVotes,
      ethLink: ethLinkVotes,
      bnbSol: bnbSolVotes,
      maticAvax: maticAvaxVotes,
    }

    console.log('votes: ', votes)
    console.log('pastEvents: ', pastEvents)
    return pastEvents
}