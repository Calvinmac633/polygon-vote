import Web3 from 'web3';
import MarketSentiment from './utils/MarketSentiment.json'
let selectedAccount;
let provider = window.ethereum;
let isInitialized = false;

export const init = async () => {
  const web3 = new Web3(provider);
  const networkId = await web3.eth.net.getId();

  //TODO: test with regular Polygon mainnet
  if (networkId !== 80001) {
    alert('Switch network to Polygon Mumbai Testnet!')
  }

    if (typeof provider !== 'undefined'){
      provider
        .request({ method: 'eth_requestAccounts'})
        .then((accounts) => {
            selectedAccount = accounts[0];
        })
        .catch((err) => {
          console.log('error: ', err)
        })

        window.ethereum.on('accountsChanged', function (accounts) {
            selectedAccount = accounts[0];
            window.location.reload();
        });

        window.ethereum.on('chainChanged', function (accounts) {
          selectedAccount = accounts[0];
          window.location.reload();
      });
    }
    
    const votesContract = new web3.eth.Contract(
      MarketSentiment.abi, 
      '0xb61074165788aDFC4a17C300b702AF2D8de85FB4'
      )

    let options = {
      filter: {
          // value: [],
      },
      fromBlock: 27578100,
      toBlock: 'latest'
  };
  

  const pastEvents = await votesContract.getPastEvents('tickerupdated', options)
    .then(response => {
      return response
    })
    isInitialized = true;
    return {pastEvents, selectedAccount}
}

export const vote = async (ticker, upDown, currentAccount) => {
  if (!isInitialized) {
    await init();
  }
  const web3 = new Web3(provider);
   // eslint-disable-next-line
  const networkId = await web3.eth.net.getId();

  const votesContract = new web3.eth.Contract(
    MarketSentiment.abi, 
    '0xb61074165788aDFC4a17C300b702AF2D8de85FB4'
    )

    votesContract.methods.vote(ticker, upDown).send({from: currentAccount, gasPrice: 100000000000, gasLimit: 200000})
    .then(function(receipt){
      window.location.reload();
    });
}

