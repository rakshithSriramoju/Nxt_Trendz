import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
  }

  deleteCartItem = deleteId => {
    const {cartList} = this.state
    const newCartList = cartList.filter(
      eachProduct => eachProduct.id !== deleteId,
    )
    this.setState({cartList: newCartList})
  }

  onIncrementProduct = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachProduct => {
        if (eachProduct.id === id) {
          const updatedQuantity = eachProduct.quantity + 1
          return {...eachProduct, quantity: updatedQuantity}
        }
        return eachProduct
      }),
    }))
  }

  removeProductFromCart = id => {
    const {cartList} = this.state
    const updatedCart = cartList.filter(eachProduct => eachProduct.id !== id)
    this.setState({cartList: updatedCart})
  }

  onDecrementProduct = id => {
    const {cartList} = this.state
    const product = cartList.find(eachProduct => eachProduct.id === id)
    if (product.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachProduct => {
          if (id === eachProduct.id) {
            const quantity = eachProduct.quantity - 1
            return {...eachProduct, quantity}
          }
          return eachProduct
        }),
      }))
    } else {
      this.removeProductFromCart(id)
    }
  }

  removeAllProduct = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    console.log(<ProtectedRoute />)

    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            deleteCartItem: this.deleteCartItem,
            incrementProduct: this.onIncrementProduct,
            decrementProduct: this.onDecrementProduct,
            removeAllProduct: this.removeAllProduct,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductItemDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
