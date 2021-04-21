// ========================================================
// Level 1 Challenges
// ========================================================

const sayHello = () => {
  return "Hello"
}

const area = (w, h) => {
  return w * h
}

const perimeter = (w, h) => {
  return w + w + h + h
}

const circleArea = r => {
  return 3.14 * (r^2)
}

// ========================================================
// Level 2 Challenges
// ========================================================
// NOTE: You will need to implement methods below (not yet
// defined) in order to make the tests pass.
// ========================================================

const shoppingCart = []

const clearCart = () => {
  shoppingCart.length = 0
}

const createItem = (name, price) => {
  return { name, price, quantity: 1 }
}

const getShoppingCart = () => {
  return shoppingCart
}

const addItemToCart = (item) => {
  const itemIndex = shoppingCart.indexOf(item)
  if (itemIndex != -1) {
    shoppingCart[itemIndex].quantity += 1;
  } else {
    shoppingCart.push(item)
  }
}

const getNumItemsInCart = () => {
  return shoppingCart.length
}

const removeItemFromCart = (item) => {
  if (getNumItemsInCart() === 0 || shoppingCart.indexOf(item) === -1) {
    return null
  }
  return shoppingCart.splice(shoppingCart.indexOf(item))[0]
}

const getCartTotal = () => {
  return shoppingCart.reduce((x, y) => (x.price*x.quantity) + (y.price*y.quantity))
}

module.exports = {
  sayHello, area, perimeter, circleArea,
  clearCart, createItem, getShoppingCart, addItemToCart,
  getNumItemsInCart, removeItemFromCart, getCartTotal
}
