
// console.log(navbar)

// evento directamente en el html
// <button onclick="alert('hola')" id="navbarBtn" class="navbar__btn-link">

// navbarBtn.onclick = function () {
//   alert('desde una propiedad del elemento en el html')
// }

// handler
// const fn = function (e) {
//   console.log(navbarNav)
//   navbarNav.classList.toggle('active')
// }

// start navbar btn menu
const navbarBtn = document.getElementById('navbarBtn')
const navbarNav = document.querySelector('.navbar__nav')

navbarBtn.addEventListener('click', function (e) {
  console.log(navbarNav)
  navbarNav.classList.toggle('active')
})
// end navbar btn menu

// navbarBtn.removeEventListener('click', fn)

// Arreglo de Productos
const products = [
  {
    id: 1,
    name: 'Product 1',
    price: 350,
    image: 'https://images.unsplash.com/photo-1583512603866-910c8542ba1b?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388',
    description: 'Casa de campaña chica'
  },
  {
    id: 2,
    name: 'Product 2',
    price: 200,
    image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=344',
    description: 'Rascadera para gatos'
  },
  {
    id: 3,
    name: 'Product 3',
    price: 130,
    image: 'https://images.unsplash.com/photo-1629907730422-3303af15a34b?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388',
    description: 'Sudadera Numero#5'
  },
  {
    id: 4,
    name: 'Product 4',
    price: 100,
    image: 'https://images.unsplash.com/photo-1611507929725-ff07cda3c8c2?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387',
    description: 'Peluche de Dinosaurio'
  },
  {
    id: 5,
    name: 'Product 5',
    price: 10,
    image: 'https://images.unsplash.com/photo-1508609540374-67d1601ba520?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=385',
    description: 'Premios'
  },
  {
    id: 6,
    name: 'Product 6',
    price: 50,
    image: 'https://images.unsplash.com/photo-1645460497521-2de254f90e2a?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386',
    description: 'Tazas'
  },
]

const wrapperProducts = document.getElementById('wrapper-products')

let productsHTML = ''

// Bucle
// for (let i = 0; i < products.length; i++) {
//   console.log('bucle: ',products[i])
// }

// Iteradores for of
for (let product of products) {
  productsHTML += `
  <div class="wrapper__product">
    <div class="wrapper__product-img">
      <img src="${product.image}" alt="${product.name}" class="wrapper__product-img-item">
    </div>
    <div class="wrapper__product-content">
      <h3 class="wrapper__product-title">${product.name}</h3>
      <p class="wrapper__product-text">
      ${product.description}
      </p>
      <div class="wrapper__product-btn">
      <span class="wrapper__product-btn-text">$ ${product.price}</span>
        <button class="wrapper__product-btn-item" data-id="${product.id}">
          <i class='bx bx-shopping-bag'></i>
          <span class="wrapper__product-btn-text">Add to Cart</span>
        </button>
      </div>
    </div>
    </div>
  `
}

wrapperProducts.insertAdjacentHTML('beforeend', productsHTML)

let cart = []

function find(id) {
  for (let product of products) {
    if (product.id === id) {
      return product
    }
  }
}

function addToCart(id) {
  const product = find(id)
  cart.push(product)
}

wrapperProducts.addEventListener('click', function (e) {
  if (e.target.closest('.wrapper__product-btn-item')) {
    const id = e.target.closest('.wrapper__product-btn-item').dataset.id
    addToCart(+id)
    renderCart()
  }
})

const wrapperCart = document.getElementById('wrapper-cart')

function renderCart() {
  let cartHTML = ''

  for (let product of cart) {
    cartHTML += `
    <div class="cart__item">
    <div class="cart__item-img">
    <img src="${product?.image}" alt="${product.name}" class="cart__item-img-item">
    </div>
    <div class="cart__item-content">
    <h3 class="cart__item-title">${product.name}</h3>
    <p class="cart__item-text">
    ${product.description}
    </p>
    <div class="cart__item-btn">
    <span class="cart__item-btn-text">$ ${product.price}</span>
    <button class="cart__item-btn-item" data-id="${product.id}">
    <i class='bx bx-x'></i>
    </button>
    </div>
    </div>
    </div>
    `
  }
  const cartTotal = document.getElementById('cart-total')

  wrapperCart.innerHTML = cartHTML.length > 0 ? cartHTML : '<p>No hay productos</p>'
  cartTotal.innerHTML = `$ ${sumTotal()}`
}

renderCart()

function sumTotal() {
  let sum = 0
  for (let product of cart) {
    sum += product.price
  }
  return sum
}

function removeFromCart (id) {
  let newArr = []
  for (let product of cart) {
    if(product.id !== id) {
      newArr.push(product)
    }
  }
  cart = newArr
}

wrapperCart.addEventListener('click', function (e) {
  if (e.target.closest('.cart__item-btn-item')) {
    const id = e.target.closest('.cart__item-btn-item').dataset.id
    removeFromCart(+id)
    renderCart()
  }
})

const checkout = document.getElementById('checkout')

checkout.addEventListener('click', function (e) {
  if(e.target.closest('.wrapper__sidebar-cart-btn-link')) {
    alert('Gracias por tu compra')
    cart = []
    renderCart()
  }
})