import Web3 from 'web3';

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

    //const web3 = new Web3[provider]();

    //THIS IS WHAT was cauing issuesss
    // const web3 = new Web3[provider];

    const web3 = new Web3(provider);
    const networkId = await web3.eth.net.getId();
    console.log('networkIDdddd: ', networkId)


}