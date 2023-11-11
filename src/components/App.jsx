'use client'

import React, { useEffect } from 'react'
import Header from './Header'
import CartSidebar from './CartSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading } from '@/redux/slices/cartSlice'
import { usePathname } from 'next/navigation'

export default function App({ children }) {
  const dispatch = useDispatch()
  const pathname = usePathname()
  const { cartItems, loading } = useSelector((state) => state.cart)

  useEffect(() => {
    dispatch(hideLoading())
  }, [dispatch])

  return (
    <div>
      <div
        className={`${
          loading
            ? ''
            : cartItems.length > 0 &&
              (pathname === '/' || pathname.indexOf('/product/') >= 0)
            ? 'mr-32'
            : ''
        }`}
      >
        <Header />
        <main className="p-4">{children}</main>
      </div>
      <CartSidebar />
    </div>
  )
}
