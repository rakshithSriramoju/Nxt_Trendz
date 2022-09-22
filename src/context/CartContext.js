import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  deleteCartItem: () => {},
  decrementProduct: () => {},
  incrementProduct: () => {},
  removeAllProduct: () => {},
})

export default CartContext
