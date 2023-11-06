import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

const initialState = Cookies.get('cart')
  ? {
      ...JSON.parse(Cookies.get('cart')),
      loading: true,
    }
  : {
      loading: true,
      cartItems: [],
      shoppingAddress: {},
      paymentMethod: '',
    }

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2) // 12.3456 to 12.35
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload
      const existltem = state.cartItems.find((x) => x.id === item.id)
      if (existltem) {
        state.cartItems = state.cartItems.map((x) =>
          x.id === existltem.id ? item : x
        )
      } else {
        state.cartItems = [...state.cartItems, item]
      }
      state.itemPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      )
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 100)
      state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice))
      state.totalPrice = addDecimals(
        Number(state.itemsPrice) +
          Number(state.shippingPrice) +
          Number(state.taxPrice)
      )

      Cookies.set('cart', JSON.stringify(state))
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((X) => X.id !== action.payload)
      state.itemPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      )
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 100)
      state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice))
      state.totalPrice = addDecimals(
        Number(state.itemsPrice) +
          Number(state.shippingPrice) +
          Number(state.taxPrice)
      )

      Cookies.set('cart', JSON.stringify(state))
    },
    hideLoading: (state) => {
      state.loading = false
    },
  },
})

export const { addToCart, removeFromCart, hideLoading } = cartSlice.actions

export default cartSlice.reducer