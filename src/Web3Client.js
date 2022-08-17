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

    const votes = await votesContract.methods.getVotes('btc-eth').call();

    console.log('votes: ', votes)
}