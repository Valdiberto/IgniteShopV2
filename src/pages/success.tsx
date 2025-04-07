import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'

import { stripe } from '@/lib/stripe'
import {
  ImageContainer,
  ImagesContainer,
  SuccessContainer,
} from '@/styles/pages/success'

interface SuccessProps {
  customerName: string
  productsImages: string[]
}

export default function Success({
  customerName,
  productsImages,
}: SuccessProps) {
  const totalProducts = productsImages.length

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada!</h1>
        <ImagesContainer>
          {productsImages.map((imageUrl, index) => (
            <ImageContainer key={index}>
              <Image src={imageUrl} width={120} height={120} alt="" />
            </ImageContainer>
          ))}
        </ImagesContainer>

        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de {totalProducts}{' '}
          {totalProducts === 1 ? 'camiseta' : 'camisetas'} já está a caminho da
          sua casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  if (!session.customer_details || !session.customer_details.name) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const customerName = session.customer_details.name
  const productsImages =
    session.line_items?.data.map((item) => {
      const product = item.price?.product as Stripe.Product | undefined
      return product?.images?.[0] ?? '/fallback-image.png'
    }) ?? []
  return {
    props: {
      customerName,
      productsImages,
    },
  }
}
