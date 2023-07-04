import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Rating from './Rating'

import close from '../assets/close.svg'

const Product = ({ item, provider, account, app, togglePop }) => {
  const [order, setOrder] = useState(null)
  const [hasbought, setHasbought] = useState(false)

  const fetchDetails = async () =>{
    const events = await app.queryFilter('Buy')
    const orders = events.filter(
      (event)=> event.args.buyer === account && event.args.itemId.toString() === item.id.toString()
    )
    if(orders.length ===0) return

    const order = await app.orders(account, orders[0].args.orderId)
    setOrder(order)
  }

  const buyHandler= async() =>{
   const signer = await provider.getSigner()
   let transaction = app.connect(signer).buy(item.id, {value: item.cost})
   //await transaction.wait()
   setHasbought(true)
  }
  useEffect(()=>{
    fetchDetails()
  },[hasbought])

  return (
    <div className="product">
      <div className='product__details'>
        <div className='product__image'>
          <img src={item.image} alt="Product"/>
        </div>
        <div className='product__overview'>
          <h1>{item.mane}</h1>

          <Rating value={item.rating} />

          <hr/>
          <p>{item.address}</p>
          <h2>{ethers.utils.formatUnits(item.cost.toString(),'ether')} ETH</h2>
          <hr/>

          <h2>Overview</h2>
          <p>
            {item.description}
            Lorem ipsum dolor sit amet. Id voluptatem assumenda ut nihil recusandae sed voluptas earum ea ratione perspiciatis sit nihil repudiandae aut corporis eligendi id amet fugit. Qui necessitatibus consequatur ut corrupti maiores non galisum molestiae vel quisquam internos ut voluptatem dolorum. 
          </p>
          </div>
          <div className='product__order'>
            <h1>{ethers.utils.formatUnits(item.cost.toString(),'ether')} ETH</h1>
            <p>
              FREE DELIVERY <br/>
              <strong>
                {new Date(Date.now()+345600000).toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'})}
              </strong>
            </p>
            {item.stock >0 ? (
              <p>In stock</p>
            ):(
              <p>Out of stock</p>  
            )}
            <button className='product__buy' onClick={buyHandler}>
              Buy Now
            </button>

            <p><small>Ships from</small> APP</p>
            <p><small>Sold by</small> APP</p>
            </div>

            {order && (
              <div className='product__bought'>
                Item bought on <br/>
                <strong>
                  {new Date(Number(order.time.toString() + '000')).toLocaleDateString(
                    undefined,
                    {
                      weekday:'long',
                      hour:'numeric',
                      minute:'numeric',
                      second:'numeric'
                    })}
                </strong>
              </div>  
            )}      
            </div>

            <button onClick={togglePop} className='product__close'>
              <img src={close} alt='Close'/>
            </button>

        </div>  
  );
}

export default Product;