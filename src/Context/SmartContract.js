import { createContext, useMemo, useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import { ContractABI, ContractAddress } from '../Utils/Constant';
import { useNavigate } from 'react-router-dom';

export const SmartContractContext = createContext();

// export const getAlchemyProvider = () => {
//     const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/xKv2aklTs2Uf4DyCKzxvanihhrNKnjc0") // api_key
//     // const signer = provider.getSigner()
//     return provider;
// }

const getMetamaskProvider = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return provider;
};

const SmartContractProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const [isProviderConfirmed, setIsProviderConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [providers, setProviders] = useState(['0x336fa634e585077b5c6866ffe2d61c0ff6c62d69']);

  const navigate = useNavigate();
  // const LotteryContract = getContract();
  // On each refresh/render, check if user had connected his wallet to this site anytime in past.
  /*
            eth_accounts returns an array that is either empty or contains a single account address. 
            The returned address, if any, is the address of the most recently used account that the caller(website) is permitted to access.
            Callers are identified by their URL origin, which means that all sites with the same origin share the same permissions.
        */
  const selectDashboardAndRedirect = (account) => {
    // console.log(account, providers.indexOf(account));
    if (providers.indexOf(account) === -1) {
      navigate('/customer-dashboard');
    } else {
      navigate('/provider-dashboard');
    }
  };
  const checkIfConnectedInPast = async () => {
    try {
      if (typeof window.ethereum === 'undefined') {
        console.log('No Wallet Installed'); // no need to alert
      } else if (!window.ethereum.isMetaMask) {
        console.log('Metamask not installed'); // no need to alert
      } else {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length) {
          setIsLoading(true);
          setCurrentAccount(accounts[0]);
          // disable connect button, connected
          setIsLoading(false);

          // get providers list function  and then
          // providers list pass as argument to below function as 2nd argument

          selectDashboardAndRedirect(accounts[0]);
          return accounts[0];
        }
      }
    } catch (error) {
      console.log(error);
    }
    return '';
  };

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum === 'undefined') {
        // alert('Please Install MetaMask');
      } else if (!window.ethereum.isMetaMask) {
        // alert('Currently we have support only for MetaMask');
      } else {
        setIsLoading(true);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }); // metamask prompt opens and awaits approval
        setCurrentAccount(accounts[0]);
        // disable connect button, connected
        setIsLoading(false);
        // get providers list function  and then

        selectDashboardAndRedirect(accounts[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const providerListener = async (contract) => {
    contract.on('providerAdded', () => {
      // setIsReadLoading(true);
      // getReadOnlyData(currentAccount);
      setIsLoading(false);
      // alert('Provider successfully added.');
    });
  };

  const transactionListener = async (contract, _energyAmount) => {
    contract.on('transactionRecorded', async () => {
      // setIsReadLoading(true);
      // getReadOnlyData(currentAccount);
      setIsLoading(false);
      console.log('transaction successfully recorded');
      await fetch(`https://api.thingspeak.com/update?api_key=UL4KQTJO4IL80PVJ&field3=${_energyAmount}&field4=1`);
    });
  };

  // use metamask provider for connect wallet and register new provider
  const addProvider = async (_rate, _location, _availableChargingPorts) => {
    // console.log(ContractABI);
    try {
      if (!currentAccount) {
        // alert('Connect Your Wallet');
      } else {
        setIsLoading(true);
        const MetamaskProvider = getMetamaskProvider();
        const signer = MetamaskProvider.getSigner();
        const contract = new ethers.Contract(ContractAddress, ContractABI, signer);
        providerListener(contract);
        await contract.addProvider(currentAccount, _rate, _location, _availableChargingPorts);
        setIsProviderConfirmed(true);
      }
    } catch (error) {
      console.log(error);
      // alert(JSON.stringify(error));
      setIsLoading(false);
    }
  };

  const payAmount = async (_totalPrice, _energyAmount, _toAddress, _timestamp) => {
    try {
      // use metamask provider for connect wallet and payment option
      if (!currentAccount) {
        // alert('Connect Your Wallet');
      } else {
        setIsLoading(true);
        const MetamaskProvider = getMetamaskProvider();
        const signer = MetamaskProvider.getSigner();
        const contract = new ethers.Contract(ContractAddress, ContractABI, signer);
        transactionListener(contract, _energyAmount);

        // await perform transaction
        const _value = parseInt(_totalPrice * 10000000000, 10).toString();
        const transactionParameters = {
          from: currentAccount, // sender wallet address
          to: _toAddress, // receiver address
          value: BigNumber.from(_value).mul(BigNumber.from('100000000'))
        };
        // console.log(transactionParameters.value);
        await signer.sendTransaction(transactionParameters);
        await contract.recordTransaction(currentAccount, _toAddress, _energyAmount, _value, _timestamp);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getConsumerData = async () => {
    try {
      if (!currentAccount) {
        // alert('Connect Your Wallet');
        return null;
      }
      const MetamaskProvider = getMetamaskProvider();
      const contract = new ethers.Contract(ContractAddress, ContractABI, MetamaskProvider);
      const consumerData = await contract.getTransactions(currentAccount);
      console.log(currentAccount);
      return consumerData;
    } catch (error) {
      // alert(error);
      return error;
    }
  };

  const getProviderData = async () => {
    try {
      if (!currentAccount) {
        // alert('Connect Your Wallet');
        return null;
      }
      const MetamaskProvider = getMetamaskProvider();
      const contract = new ethers.Contract(ContractAddress, ContractABI, MetamaskProvider);
      const providerData = await contract.providers(currentAccount);
      return providerData;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  const getAllProviders = async () => {
    try {
      const MetamaskProvider = getMetamaskProvider();
      const contract = new ethers.Contract(ContractAddress, ContractABI, MetamaskProvider);
      const providerList = await contract.providers();
      console.log(providerList);
      return providerList;
    } catch (error) {
      // alert(error);
      return error;
    }
  };

  // const pickWinner = async () => {
  //     try {
  //         if(!participated)
  //         {
  //             alert("This button should not appear for user who hasn't participated")
  //         }
  //         else {
  //             setIsLoading(true);
  //             const MetamaskProvider = getMetamaskProvider();
  //             const signer = MetamaskProvider.getSigner();
  //             const contract = new ethers.Contract(ContractAddress, ContractABI, signer);
  //             WinnerListener(contract);
  //             await contract.pickWinner();
  //         }
  //     }
  //     catch (error) {
  //         console.log(error);
  //         setIsLoading(false);
  //     }
  // }

  //     const getReadOnlyData = async (r) => {
  //     try {
  //     // use alchemy providers for retrieving data which is needed on page load
  //         const AlchemyProvider = getAlchemyProvider();
  //         const contract = new ethers.Contract(ContractAddress, ContractABI, AlchemyProvider);

  //         const players_count = await contract.getPlayersCount();
  //         const total_amount = await contract.totalAmount();
  //         const time_left = await contract.getTimeLeft();
  //         const winners_data = await contract.getWinners();

  //         // setPlayersCount(players_count.toNumber());
  //         // setTotalAmount(ethers.utils.formatEther(total_amount));

  //         // const structuredWinners = winners_data.map((winner)=> ({
  //         //     winnerAddress: winner.winner,
  //         //     amount: ethers.utils.formatEther(winner.amount),
  //         //     keyword: keywordArray[~~(Math.random() * keywordArray.length)],
  //         // }))
  //         // setWinners(structuredWinners);

  //         // let rst;
  //         // if(r){
  //         //     rst = await contract.hasPlayer(r);
  //         //     setParticipated(rst);
  //         // }

  //         // if(time_left.toNumber()===256)
  //         // {
  //         //     setTimeLeft(-1);
  //         // }
  //         // else
  //         // {
  //         //     setTimeLeft(time_left.mul(1000).toNumber());
  //         // }
  //     } catch(error){
  //         console.log(error);
  //     }
  //     // setIsReadLoading(false);
  // }
  const value = useMemo(
    () => ({
      getMetamaskProvider,
      checkIfConnectedInPast,
      connectWallet,
      addProvider,
      payAmount,
      getConsumerData,
      getProviderData,
      getAllProviders,
      currentAccount,
      isLoading,
      providers,
      isProviderConfirmed
    }),
    []
  );
  return <SmartContractContext.Provider value={value}>{children}</SmartContractContext.Provider>;
};

export default SmartContractProvider;
