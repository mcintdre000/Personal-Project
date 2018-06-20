import React, { Component } from 'react';
import axios from 'axios';
import { arrayToArrayofObject } from '../../utils/functions';

export default class AdminOrders extends Component {
  constructor(){
    super()
        this.state={
            orders:[]
        }

    
}
componentDidMount(){
    axios.get('/api/allOrders').then( response => {
        console.log("response on admin orders page",response.data)
        this.setState({
            orders: response.data
        })
      }).catch( err => { console.log( err ) })
}

  

  render() {
    console.log("value from backend", this.state.orders)
    const orderArrayOfProductObj= arrayToArrayofObject(this.state.orders)
    console.log(orderArrayOfProductObj)  

    let newArray = this.state.orders.map(key => {
            // console.log('orderArrayOfProductObj', orderArrayOfProductObj, 'key', key, 'orderArrayOfProductObj[key].orderamount', orderArrayOfProductObj[key].orderamount,  'orderArrayOfProductObj[key].orderDate', orderArrayOfProductObj[key].orderDate, 'orderArrayOfProductObj[key].products', orderArrayOfProductObj[key].products)
            return(
                <div>
                    <p> Order ID: { key.orderid }</p>
                    <p> Username: { key.username }</p>
                    <p> Order Date: { key.orderdate }</p>
                    <p> Order Amount: { key.orderamount }</p>
                    <p> Order Products: { key.productname }</p>
                    <br/>
                </div>
            )
    })

    return (
      <div>
    
<h1> All orders </h1>
  { newArray }
        </div>

      
    );
  }
}