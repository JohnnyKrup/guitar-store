export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  )

  if (existingCartItem) {
    // return a new array of cartItem, where the quantity of duplicates is increased
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    )
  }

  /**
   * quantity property gets attached the first time the code reaches this return
   * the if block if(existingCartItem) won't run when it is a new item
   * so every item in the cartItems will have a quantity property that can be increased or decreased
   */
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
}
