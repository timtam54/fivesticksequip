"use client"

import { useState } from "react"
import { Plus, Minus, ShoppingCart, Barcode } from "lucide-react"
import Header from "@/components/header"

// Simulated product database
const products: { [key: string]: { name: string; weight: number } } = {
  "123456": { name: "pump31", weight: 0.50 },
  "234567": { name: "pump43", weight: 0.30 },
  "345678": { name: "pump53", weight: 0.60 },
  "456789": { name: "pump23", weight: 2.50 },
  "567890": { name: "pump13", weight: 1.20 },
}

type CartItem = {
  id: number
  name: string
  weight: number
  quantity: number
}

export default function Component() {
  const [cart, setCart] = useState<CartItem[]>([{id:1,name:'pump89',weight:0.34,quantity:1},{id:2,name:'pump12',weight:0.44,quantity:1}])
  const [barcodeInput, setBarcodeInput] = useState("")

  const addToCart = (barcode: number) => {
    const product = products[barcode]
    if (product) {
      setCart(currentCart => {
        const existingItem = currentCart.find(item => item.id === barcode)
        if (existingItem) {
          return currentCart.map(item =>
            item.id === barcode ? { ...item, quantity: item.quantity + 1 } : item
          )
        } else {
          return [...currentCart, { id: barcode, ...product, quantity: 1 }]
        }
      })
    }
    setBarcodeInput("")
  }

  const removeFromCart = (id: number) => {
    setCart(currentCart =>
      currentCart.map(item =>
        item.id === id
          ? item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : null
          : item
      ).filter(Boolean) as CartItem[]
    )
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.weight * item.quantity, 0)

  return (
    <>
    <Header activePage={"Barcode Transfer"} />
    <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">Barcode Scanner Cart</h1>
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            placeholder="Scan barcode..."
            value={barcodeInput}
            onChange={(e) => setBarcodeInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addToCart(parseFloat( barcodeInput))
              }
            }}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => addToCart(parseFloat( barcodeInput))}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Barcode className="w-4 h-4 inline-block mr-2" />
            Scan
          </button>
        </div>
        <div className="space-y-2">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <span className="text-gray-800">{item.name}</span>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">{(item.weight * item.quantity).toFixed(2)}kg</span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-gray-800">{item.quantity}</span>
                <button
                  onClick={() => addToCart(item.id)}
                  className="p-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-6 py-4 bg-gray-100 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <ShoppingCart className="w-5 h-5 text-gray-600" />
          <span className="text-lg font-semibold text-gray-800">Total:</span>
        </div>
        <span className="text-2xl font-bold text-gray-800">{totalPrice.toFixed(2)}kg</span>
      </div>
    </div>
    </>
  )
}