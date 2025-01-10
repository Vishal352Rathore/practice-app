import React, { useState, useEffect, useRef } from "react";


export default function ChaiPoint() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(0);


  useEffect(() => {

    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(result => {
        console.log(result)
        setProducts(result.products)
      });

    let data = localStorage.getItem("cart");
    setCount(+data);

  }, [])


  const addCart = (ele) => {

    if (!cart.some((item) => item.productBrand === ele)) {
      let obj = { productBrand: ele, count: 1 }
      let finalArr = [...cart];
      finalArr.push(obj);
      setCart(finalArr);
      setCart(prevCart => [...prevCart, { productBrand: ele, count: 1 }]);

    } else {
      setCart(prev => prev.map((item, index) =>
        item.productBrand === ele ? { ...item, count: item.count + 1 } : item
      ))
    }

    setCount(prev => {
      if (prev >= 0) { return prev + 1 }
    })
  }

  const removeCart = (ele) => {

    setCart(prev => prev.map((item, index) =>
      item.productBrand === ele ? { ...item, count: item.count > 0 ? item.count - 1 : item.count } : item
    ))

    setCount(prev => {
      if (prev > 0) {
        return prev - 1
      } else {
        return prev;
      }
    }
    )
  }

  const clearCart = () => {
    setCart([]);
    setCount(0);
    localStorage.setItem("cart", 0);
  }

  useEffect(() => {
    console.log("count", count);
    localStorage.setItem("cart", count);
  }, [count])

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{count} Items in Cart</h1>
        <button
          onClick={clearCart}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Clear Cart
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2">Cart Products</h2>
      <div className="mb-4">
        {cart?.map((ele, index) => (
          <div key={index} className="border-b py-2">
            <p className="font-medium">{ele.productBrand}</p>
            <p className="text-gray-600">Quantity: {ele.count}</p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-2">Products</h2>
      {products?.slice(0, 5).map((ele, index) => (
        <div key={index} className="flex justify-between items-center border-b py-2">
          <p className="font-medium">{ele.brand}</p>
          <div>
            <button
              onClick={() => addCart(ele.brand)}
              className="mr-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Add to cart
            </button>
            <button
              onClick={() => removeCart(ele.brand)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Remove from cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
