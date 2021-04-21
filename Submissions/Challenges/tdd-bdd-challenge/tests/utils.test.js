const mocha = require("mocha")
const chai = require("chai")
const utils = require("../utils")
const { util } = require("chai")
const expect = chai.expect

// ========================================================
// NOTE: https://mochajs.org/#arrow-functions
// Passing arrow functions (“lambdas”) to Mocha is discouraged.
// Lambdas lexically bind this and cannot access the Mocha context.
// ========================================================

it("should say hello", function() {
  const hello = utils.sayHello()
  expect(hello).to.be.a("string")
  expect(hello).to.equal("Hello")
  expect(hello).with.lengthOf(5)
})

// ========================================================
// Level 1 Challenges
// 1. Write the pending tests check that they are pending, like this:
//    it("should do something that you want done")
// 2. Next, write the test and see that it fails.
// 3. Write the code in the utils.js file to make the test pass.
// 4. Finally see if you would like to refactor your code at all.
// This is called "Red-Green-Refactor"
// ========================================================

it("Should return the area of a rectangle", function() {
  const width = 5, height = 2, area = utils.area(width, height)
  expect(width).to.be.a("number")
  expect(height).to.be.a("number")
  expect(area).to.be.a("number")
  expect(area).to.equal(width * height)
})

it("Should return the perimeter of a rectangle", function() {
  const width = 5, height = 2, perimeter = utils.perimeter(width, height)
  expect(width).to.be.a("number")
  expect(height).to.be.a("number")
  expect(perimeter).to.be.a("number")
  expect(perimeter).to.equal((width*2) + (height*2))
})

it("Should return the area of a circle with radius", function() {
  const pi = 3.14, radius = 2, area = utils.circleArea(radius)
  expect(radius).to.be.a("number")
  expect(area).to.be.a("number")
  expect(area).to.equal(pi * (radius^2))
})

// ========================================================
// Level 2 Challenges
// ========================================================
// NOTE: The following unimplemented test cases are examples
// of "Pending Tests" in Chai. Someone should write these
// tests eventually.
// ========================================================

beforeEach((done) => {
  utils.clearCart()
  done()
})

it("Should create a new (object) Item with name and price", function() {
  const item = utils.createItem("apple", 0.99)
  expect(item).to.be.a("object")
  expect(item).to.have.property("name", "apple")
  expect(item).to.have.property("price", 0.99)
  expect(item).to.have.property("quantity", 1)
})

it("Should return an array containing all items in cart", function() {
  const cart = utils.getShoppingCart()
  expect(cart).to.be.a("array")
  expect(cart.length).to.be.equal(0)
})

it("Should add a new item to the shopping cart", function() {
  const item = utils.createItem("apple", 0.99)
  utils.addItemToCart(item)
  const cart = utils.getShoppingCart()
  expect(item).to.be.a("object")
  expect(cart).to.be.a("array")
  expect(cart).to.contain(item)
})

it("Should return the number of items in the cart", function() {
  let numberOfItems = utils.getNumItemsInCart()
  expect(numberOfItems).to.equal(0)
  utils.addItemToCart(utils.createItem("apple", 0.99))
  numberOfItems = utils.getNumItemsInCart()
  expect(numberOfItems).to.equal(1)
})

it("Should remove items from cart", function() {
  const item = utils.createItem("apple", 0.99)
  utils.addItemToCart(item)
  const removedItem = utils.removeItemFromCart(item)
  expect(removedItem).to.be.a("object")
  expect(removedItem).to.equal(item)
  expect(utils.getShoppingCart()).to.not.contain(item)
})

// ========================================================
// Stretch Challenges
// ========================================================

it("Should update the count of items in the cart", function() {
  const item = utils.createItem("apple", 0.99)
  utils.addItemToCart(item)
  utils.addItemToCart(item)
  const cart = utils.getShoppingCart()
  expect(cart.length).to.equal(1)
  expect(cart[0].quantity).to.equal(2)
})

it("Should validate that an empty cart has 0 items")

it("Should return the total cost of all items in the cart", function() {
  const appleItem = utils.createItem("apple", 1), peachItem = utils.createItem("peach", 1)
  utils.addItemToCart(appleItem)
  utils.addItemToCart(appleItem)
  utils.addItemToCart(peachItem)
  expect(utils.getCartTotal()).to.equal(3)
})
