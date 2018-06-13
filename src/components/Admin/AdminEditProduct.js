import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { getProducts, actions } from '../../ducks/reducer';


class AdminEditProduct extends Component {
    constructor( props ){
        super( props )

        this.state= {
          loading: false
        }
      }
      componentDidMount( props ){
        axios.get( '/api/shop' )
          .then( products => {
            this.props.getProducts( products.data )
            // console.log( '--------products', products.data )
            this.setState({
              loading: true
            })
          }).catch( err => { console.log( err ) })
      }

      // deleteProduct( id ) {
      //   axios.delete( `/api/shop/${ id }` ).then( res => {
      //       this.props.getProducts( res.data )
      //   }).catch( err => { console.log( err ) })
      // }

    render() {
          const products = this.props.products ? this.props.products.map( ( e, i ) => {
            // console.log('----------e', e);
            return <div key={ i } className='item'>
            <div>
          {/* create variable to hold the value of the updated text */}
                    <h1 onClick={ f => f.target.contentEditable=true} onBlur={ f => this.props.editProduct( e.productid, 'productname', f.target.innerText ) }>{ e.productname }</h1>
                    <h2 onClick={ f => f.target.contentEditable=true} onBlur={ f => this.props.editProduct( e.productid, 'productcartdesc', f.target.innerText ) }> { e.productcartdesc } </h2>
                    <img src ={ e.productimage } alt={e.productname}  />
                    <h3>{ e.productshortdesc } </h3>
                    <span>${ e.productprice }</span>

                    <p>{ e.productstock }</p>
                    <button onClick={ () => this.props.deleteProduct( e.productid ) } >Delete Product</button>
            </div>
                   </div>
          }): 'nothing to display'
        return (
            <div>
                { this.state.loading ? products : <img src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif' />}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      products: state.products,
      cart: state.cart
    }
  }
  export default connect( mapStateToProps, { getProducts, ...actions })( AdminEditProduct )