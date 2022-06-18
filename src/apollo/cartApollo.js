import { makeVar } from '@apollo/client'

const data = JSON.parse(localStorage.getItem('shopping_cart'))
export const cartItems = data ? makeVar([...data]) : makeVar([])

const findProdInCart = (cart, product) => {
    const id = product.id
    console.log("🚀 ~ file: cartApollo.js ~ line 8 ~ findProdInCart ~ id", id)
    for (let index in cart) {
        if (cart[index].product._id === id) return index
    }
    return -1
}

export const addToCart = (product, quantity) => {
    const clone = [...cartItems()]
    const index = findProdInCart(cartItems(), product)
    if (index === -1)
        clone.push({
            product: product,
            quantity: quantity,
        })
    else clone[index].quantity += quantity
    cartItems([...clone])
    localStorage.setItem('shopping_cart', JSON.stringify(cartItems()))
}

export const updateCart = (product, quantity) => {
    const updateArr = [...cartItems()]
    const elem = findProdInCart(cartItems(), product)
    if (elem !== -1) updateArr[elem].quantity += quantity
    cartItems([...updateArr])
    localStorage.setItem('shopping_cart', JSON.stringify(cartItems()))
}

export const removeFromCart = (product) => {
    const cloneArr = [...cartItems()]
    const prod = findProdInCart(cartItems(), product)
    if (prod !== -1) cloneArr.splice(prod, 1)
    cartItems([...cloneArr])
    localStorage.setItem('shopping_cart', JSON.stringify(cartItems()))
}

export const setCart = (productArr) =>{
    cartItems(productArr)
}

export const dropCart = () => { 
    cartItems([])
 }
