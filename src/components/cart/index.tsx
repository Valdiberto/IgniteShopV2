import { ShoppingCartSimple, X } from '@phosphor-icons/react'
import axios from 'axios'
import Image from 'next/image'
import { Dialog } from 'radix-ui'
import { useState } from 'react'

import { useCart } from '@/hooks/useCart'

import {
  CardBadge,
  CartButton,
  CartClose,
  CartContent,
  CartFinalization,
  CartFinalizationDetails,
  CartProduct,
  CartProductDetails,
  CartProductImage,
} from './styles'

export function Cart() {
  const { cartItems, removeCartItem } = useCart()
  const cartQuantity = cartItems.length

  const totalItemsPrice = cartItems.reduce((acc, item) => {
    const numericPrice = Number(item.price.replace(/\D/g, '')) / 100
    return acc + numericPrice * item.quantity
  }, 0)

  const formattedCartTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(totalItemsPrice)

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  async function handleCheckout() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        products: cartItems,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreatingCheckoutSession(false)
      console.error(err)
      alert('Erro ao iniciar o checkout!')
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <CartButton>
          <CardBadge empty={cartQuantity === 0}>
            {' '}
            <span>{cartQuantity}</span>{' '}
          </CardBadge>
          <ShoppingCartSimple size={24} weight="duotone" />
        </CartButton>
      </Dialog.Trigger>

      <Dialog.Portal>
        <CartContent>
          <Dialog.Title>Sacola de Compras</Dialog.Title>
          <CartClose>
            <X size={24} weight="bold" />
          </CartClose>
          <section>
            {cartItems.length <= 0 && (
              <p>Parece que seu carrinho está vazio : (</p>
            )}
            {cartItems.map((cartItem) => (
              <CartProduct key={cartItem.id}>
                <CartProductImage>
                  <Image
                    src={cartItem.imageUrl}
                    width={101}
                    height={93}
                    alt=""
                  />
                </CartProductImage>
                <CartProductDetails>
                  <p>{cartItem.name}</p>
                  <strong> {cartItem.price}</strong>
                  <button
                    onClick={() => {
                      console.log('removendo:', cartItem.id)
                      removeCartItem(cartItem.id)
                    }}
                  >
                    Remover
                  </button>
                </CartProductDetails>
              </CartProduct>
            ))}
          </section>
          <CartFinalization>
            <CartFinalizationDetails>
              <div>
                <span>Quantidade</span>
                <p>
                  {cartQuantity} {cartQuantity > 1 ? 'itens' : 'item'}
                </p>
              </div>
              <div>
                <p>Valor total</p>
                <span>{formattedCartTotal}</span>
              </div>
            </CartFinalizationDetails>
            <button
              disabled={isCreatingCheckoutSession || cartQuantity <= 0}
              onClick={handleCheckout}
            >
              Finalizar compra
            </button>
          </CartFinalization>
        </CartContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
