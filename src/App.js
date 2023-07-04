import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Navigation from './components/Navigation'
import Section from './components/Section'
import Product from './components/Product'

// ABIs
import Dappazon from './abis/Dappazon.json'


// Config
import config from './config.json'

function App() {
  const [account, setAccount] = useState(null)
  const [app ,setApp]= useState(null)
  const [provider, setProvider] = useState(null)

  const [electronics, setElectronics] = useState(null)
  const [clothing, setClothing] = useState(null)
  const [toys, setToys] = useState(null)
  const [item, setItem] = useState({})
  const [toggle, setToggle]= useState(false)

  const togglePop =(item) =>{
    setItem(item)
    toggle ? setToggle(false) : setToggle(true)
  }

  const loadBlockchainData = async () => {
    //connect to blockchain
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)

    const network = await provider.getNetwork()
    console.log(network)

    //connect to smart contract (JS version of smart contract)
    const app = new ethers.Contract(config[network.chainId].dappazon.address,
    Dappazon,
    provider
    )
    setApp(app)
   
    //Load products

    const items = []
    for(var i=0;i<9;i++){   //from smartcontrct
      const item = await app.items(i+1)
      items.push(item)
    }
    const electronics = items.filter((item) => item.category === 'electronics')
    const clothing = items.filter((item) => item.category === 'clothing')
    const toys = items.filter((item) => item.category === 'toys')
    setElectronics(electronics)
    setClothing(clothing)
    setToys(toys)
   
  }

  useEffect(()=>{
    loadBlockchainData()
  },[])

  return(
    <div>
      <Navigation account={account} setAccount={setAccount}/>
      <h2>BEST SELLER</h2>
      {electronics && clothing && toys && (
        <>
        <Section title={"Clothing & Jewellary"} items={clothing} togglePop={togglePop} />
        <Section title={"Electronics & gadjets"} items={electronics} togglePop={togglePop} />
        <Section title={"Toys & gamming"} items={toys} togglePop={togglePop} />
        </>
      )}

      {toggle && (
        <Product item={item} provider={provider} account={account} app={app} togglePop={togglePop}/>
      )}
    </div>
  );
}

export default App;

