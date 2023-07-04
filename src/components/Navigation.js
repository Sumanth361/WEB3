import { ethers } from 'ethers';

const Navigation = ({ account, setAccount }) => {
    const connectHandler = async () => {
        const accounts = await window.ethereum.request({method : "eth_requestAccounts"});
        const account = ethers.utils.getAddress(accounts[0])
        setAccount(account)
    }

    return (
        <nav>
            <div className='nav__brand'>
                <h1>DAPP</h1>
            </div>

            <input
                 type='text'
                 className='nav__search'
            /> 
            {account ? (
            <button
               type='button'
               className='nav__connect'
            >
                {account.slice(0,6)+'...'+ account.slice(38,42)}
            </button>
            ):(
                <button
                    type='button'
                    className='nav__connect'
                    onClick={connectHandler}
                >
                    Connect
                </button>
            )}    
            <ul className='nav__links'>
                <li><a href="#clothing and jewelary">Clothing and jewellary</a></li>  
                <li><a href="#Electronics and gadjets">Electronics and gadjets</a></li> 
                <li><a href="#Toys and gaming">Toys and gaming</a></li> 
            </ul>    
        </nav>
    );
}

export default Navigation;