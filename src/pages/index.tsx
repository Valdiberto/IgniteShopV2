import 'keen-slider/keen-slider.min.css'

import { ShoppingCart } from '@phosphor-icons/react'
import { useKeenSlider } from 'keen-slider/react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Stripe from 'stripe'

import { CartItem } from '@/contexts/CartContext'
import { useCart } from '@/hooks/useCart'
import { stripe } from '@/lib/stripe'
import { HomeContainer, Product } from '@/styles/pages/home'

interface HomeProps {
  products: CartItem[]
}

export default function Home({ products }: HomeProps) {
  const { addToCart, checkIfItemAlreadyExists } = useCart()
  const [isFirstSlide, setIsFirstSlide] = useState(true)
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48,
    },
    mode: 'snap',
  })

  useEffect(() => {
    const slider = instanceRef.current
    if (!slider) return

    const updateSlideState = () => {
      setIsFirstSlide(slider.track.details.rel === 0)
    }

    slider.on('slideChanged', updateSlideState)
    updateSlideState()
  }, [instanceRef])

  function handleAddToCart(
    e: React.MouseEvent<HTMLButtonElement>,
    product: CartItem,
  ) {
    e.preventDefault()

    addToCart(product)

    alert('Item adicionado ao carrinho!')
  }
  return (
    <>
      <HomeContainer
        ref={sliderRef}
        className="keen-slider"
        style={{
          paddingLeft: isFirstSlide ? '351px' : '0',
        }}
      >
        <Head>
          <title>Home | Ignite Shop</title>
        </Head>

        {products.map((product) => {
          return (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              prefetch={false}
            >
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt="" />

                <footer>
                  <strong>{product.name}</strong>
                  <div>
                    <span>{product.price}</span>

                    <button
                      disabled={checkIfItemAlreadyExists(product.id)}
                      onClick={(e) => handleAddToCart(e, product)}
                    >
                      <ShoppingCart size={34} weight="duotone" />
                    </button>
                  </div>
                </footer>
              </Product>
            </Link>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount! / 100),
      defaultPriceId: price.id,
    }
  })
  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2hours,
  }
}
