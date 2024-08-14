(function start() {
  document.addEventListener('click', (event) => {
    const tag = event.target

    const shoppingCartSVG = document.querySelector('.shopping-cart')
    const qtdShoppingCart = shoppingCartSVG.lastElementChild

    const ordersCheckbox = document.querySelectorAll('#order-checked')
    
    if(tag.classList[0] === 'button-add-to-cart') {
      qtdShoppingCart.classList.add('cart-with-elements')
      const shoppingCart = []

      ordersCheckbox.forEach(orderCheck => {
        if (orderCheck.checked === true) {
          const orderName = orderCheck.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent

          const orderPrice = orderCheck.parentElement.parentElement.firstElementChild.textContent

          shoppingCart.push({ name: orderName, price: orderPrice })
        }
      })

      console.log(shoppingCart)
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
  })
})()