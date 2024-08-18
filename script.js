(function start() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems'))

  if(cartItems) {
    const shoppingCartSVG = document.querySelector('.shopping-cart')
    const qtdShoppingCart = shoppingCartSVG.lastElementChild

    qtdShoppingCart.classList.add('cart-with-elements')

    let qtdTotalOrders = 0

    for(item of cartItems) {
      qtdTotalOrders += item.quantity
    }

    qtdShoppingCart.textContent = qtdTotalOrders
  }

  document.addEventListener('click', (event) => {
    const tag = event.target

    const shoppingCartSVG = document.querySelector('.shopping-cart')
    const qtdShoppingCart = shoppingCartSVG.lastElementChild

    const ordersCheckbox = document.querySelectorAll('#order-checked')
    const shoppingCart = []
    let cartItems = null
    let qtdOrder = 0
    
    if(tag.classList[0] === 'button-add-to-cart') {
      ordersCheckbox.forEach(orderCheckbox => {
        if (orderCheckbox.checked === true) {
          const orderName = orderCheckbox.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent

          const orderPriceTag = orderCheckbox.parentElement.parentElement.firstElementChild
          const orderPrice = orderPriceTag.textContent

          qtdOrder = Number(orderPriceTag.nextElementSibling.children[2].textContent)

          if(qtdOrder === 0) {
            alert("Escolha ao menos 1 unidade do pedido selecionado para adicionar ao carrinho!")
            return
          }

          cartItems = JSON.parse(localStorage.getItem('cartItems'))

          if(cartItems) {
            cartItems.push({ name: orderName, price: orderPrice, quantity: qtdOrder })
          } else {
            shoppingCart.push({ name: orderName, price: orderPrice, quantity: qtdOrder })
          }
        }
      })

      if(shoppingCart.length > 0) {
        qtdShoppingCart.classList.add('cart-with-elements')

        let qtdTotalOrders = 0

        for(item of shoppingCart) {
          qtdTotalOrders += item.quantity
        }

        qtdShoppingCart.textContent = qtdTotalOrders

        const cartItems = JSON.parse(localStorage.getItem('cartItems'))

        if(cartItems) {
          cartItems.push
        }

        localStorage.setItem('cartItems', JSON.stringify(shoppingCart))
      }

      if(cartItems) {
        qtdShoppingCart.classList.add('cart-with-elements')

        let qtdTotalOrders = 0

        for(item of cartItems) {
          qtdTotalOrders += item.quantity
        }

        qtdShoppingCart.textContent = qtdTotalOrders

        localStorage.setItem('cartItems', JSON.stringify(cartItems))
      }
    }

    if(tag.classList[0] === 'button-add-one') {
      const qtdOrders = tag.previousElementSibling
      let qtdNumber = Number(qtdOrders.textContent)
      qtdNumber++
      qtdOrders.innerText = qtdNumber
    } else if(tag.classList[0] === 'button-remove-one') {
      const qtdOrders = tag.nextElementSibling
      let qtdNumber = Number(qtdOrders.textContent)

      if (qtdNumber === 0) return

      qtdNumber--
      qtdOrders.innerText = qtdNumber
    }

    if(tag.classList[0] === 'button-go-to-cart') {
      document.location = 'shopping-cart.html'
    }
  })
})()