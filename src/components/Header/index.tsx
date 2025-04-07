import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import logoImg from '../../assets/logo.svg'
import { Cart } from '../cart'
import { HeaderContainer } from './styles'

export function Header() {
  const { pathname } = useRouter()

  const ShowCartButton = pathname !== '/success'
  return (
    <HeaderContainer>
      <Link href="/">
        <Image src={logoImg} alt="" />
      </Link>

      {ShowCartButton && <Cart />}
    </HeaderContainer>
  )
}
