const cartItems = JSON.parse(localStorage.getItem('cartItems'))
cartContentPage = document.querySelector('.cart-content')

if(!cartItems) {
  cartContentPage.innerHTML = '<h2>Seu carrinho está vazio!</h2>'
} else {
  const shoppingCartSVG = document.querySelector('.shopping-cart')
  const qtdShoppingCart = shoppingCartSVG.lastElementChild

  qtdShoppingCart.classList.add('cart-with-elements')

  let qtdTotalOrders = 0
  let totalPrice = 0

  for(item of cartItems) {
    qtdTotalOrders += item.quantity
    totalPrice += Number(item.price.match(/\d*\.\d*/gi))
  }

  qtdShoppingCart.textContent = qtdTotalOrders

  cartContentPage.innerHTML = `<h2>Seus pedidos: </h2>`

  cartItems.forEach((item) => {
    cartContentPage.innerHTML += `<span>Pedido: ${item.name} - Preço: ${item.price} - Quantidade: ${item.quantity}</span> <button class="remove-cart-item btn-small btn btn-sm btn-outline-secondary">Remover ${item.name}</button><br>`
  })

  cartContentPage.innerHTML += `<br><div>Total dos pedidos: ${totalPrice.toFixed(2)}</div>`

  cartContentPage.innerHTML += `<button type="button" class="keep-buying btn-small btn btn-sm btn-outline-secondary">Continuar comprando</button>`
  cartContentPage.innerHTML += `<button type="button" class="finalize btn-small btn btn-sm btn-outline-secondary">Finalizar pedido</button>`
}

document.addEventListener('click', (event) => {
  const tag = event.target

  if(tag.classList[0] === 'remove-cart-item') {
    const cartItemRemoved = tag.textContent.replace('Remover ', '')
    tag.previousElementSibling.remove()
    const cartItems = JSON.parse(localStorage.getItem('cartItems'))
    let index = 0

    cartItems.map((item, index) => {
      if(item.name === cartItemRemoved) {
        index = index
        return
      }
    })
    cartItems.splice(index, 1)

    localStorage.setItem('cartItems', JSON.stringify(cartItems))
    document.location.reload()
  }

  if(tag.classList[0] === 'keep-buying') {
    document.location = 'index.html'
  }

  if(tag.classList[0] === 'finalize') {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'))
    if(cartItems.length > 0) {
      cartContentPage.innerHTML = `<h3>Escolha a  forma de pagamento</h3>
      <form class="confirm-order">
        <h4><input class="inputPix" type="checkbox" /> Pix</h4><br>
        <h4><input class="inputBoleto" type="checkbox" /> Boleto</h4><br>
        <h4><input class="inputCartaoDebito" type="checkbox" /> Cartão de Débito
        <h4><input class="inputCartaoCredito" type="checkbox" /> Cartão de Crédito


        <h4><input class="inputName" type="text" /> Digite seu nome completo</h4><br>
        <h4><input class="inputAdress" type="text" /> Digite seu endereço completo (Ex: Rua, N°, Bairro, Cidade)</h4><br>

        <button type="submit" class="confirm btn-small btn btn-sm btn-outline-secondary">Confirmar</button>
      </form>
      `
    }
   
  }

  if(tag.classList[0] === 'cancel') {
    localStorage.clear()
    document.location.reload()
  }

  if(tag.classList[0] === 'finalize-order') {
    localStorage.clear()
    alert('Pedido confirmado! Logo logo estará a caminho!')
    document.location = 'index.html'
  }
})

document.addEventListener('submit', (event) => {
  event.preventDefault()

  const pix = document.querySelector('.inputPix')
  const boleto = document.querySelector('.inputBoleto')
  const cartaoDebito = document.querySelector('.inputCartaoDebito')
  const cartaoCredito = document.querySelector('.inputCartaoCredito')

  let paymentWay = ''

  if(pix.checked) paymentWay = 'Pix'
  if(boleto.checked) paymentWay = 'Boleto'
  if(cartaoDebito.checked) paymentWay = 'Cartão de Débito'
  if(cartaoCredito.checked) paymentWay = 'Cartão de Crédito'

  const userName = document.querySelector('.inputName').value
  const adress = document.querySelector('.inputAdress').value

  console.log(userName)

  if(userName === '' || adress === '') {
    alert('Erro! Preencha todos os campos!')
    return
  }

  let cartItems = JSON.parse(localStorage.getItem('cartItems'))

  cartContentPage.innerHTML = `<h4>Resumo do pedido: </h4>`

  cartItems.forEach((item) => {
    cartContentPage.innerHTML += `<span>Pedido: ${item.name} - Preço: ${item.price} - Quantidade: ${item.quantity}</span><br>`
  })

  cartContentPage.innerHTML += `<p>Nome completo: ${userName}</p>
    <p>Endereço completo: ${adress}</p>
    <p>Forma de pagamento: ${paymentWay}</p>

    <button type="button" class="cancel btn-small btn btn-sm btn-outline-secondary">Cancelar</button>

    <button type="button" class="finalize-order btn-small btn btn-sm btn-outline-secondary">Finalizar</button>
  `
})