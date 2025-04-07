import * as Dialog from '@radix-ui/react-dialog'

import { styled } from '@/styles'

export const CartButton = styled('button', {
  border: 'none',

  cursor: 'pointer',
  position: 'relative',
  borderRadius: 6,
  backgroundColor: '#202024',
  padding: '0.75rem',
  svg: {
    color: '$gray300',
    '&:hover': {
      color: '$green300',
    },
  },
})

export const CardBadge = styled('div', {
  borderRadius: '50%',
  width: '1.5rem',
  height: '1.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: 'calc(-0.5rem / 2)',
  right: 'calc(-1.0rem / 2)',
  outline: '3px solid $gray900',

  span: {
    fontSize: '0.875rem',
    color: '$white',
    fontWeight: 'bold',
  },

  variants: {
    empty: {
      true: {
        display: 'none',
      },

      false: {
        backgroundColor: '$green500',
        color: '$gray300',
      },
    },
  },
})

export const CartContent = styled(Dialog.Content, {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  background: '$gray800',
  width: '30rem',
  padding: '3rem',
  paddingTop: '4.5rem',
  boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8)',
  display: 'flex',
  flexDirection: 'column',

  h2: {
    fontWeight: 700,
    fontSize: '$lg',
    marginBottom: '2rem',
    color: '$gray100',
  },

  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
})

export const CartClose = styled(Dialog.Close, {
  background: 'none',
  border: 'none',
  color: '$gray300',
  position: 'absolute',
  top: '1.75rem',
  right: '1.75rem',
})

export const CartProduct = styled('div', {
  display: 'flex',
})

export const CartProductImage = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  width: '6.3125rem',
  height: '5.8125rem',
  marginRight: '1.125rem',
})

export const CartProductDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',

  p: {
    fontSize: '$md',
    color: '$gray300',
  },
  strong: {
    marginTop: 4,
    fontSize: '$md',
    fontWeight: 700,
  },
  button: {
    marginTop: 'auto',
    width: 'max-content',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',

    color: '$green500',
    fontSize: '1rem',
    fontWeight: 700,
  },
})

export const CartFinalization = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginTop: 'auto',
  button: {
    textAlign: 'center',
    width: '100%',
    padding: '1.25rem',
    border: 'none',
    borderRadius: 8,
    backgroundColor: '$green500',
    color: '$gray100',
    fontSize: '$md',
    fontWeight: 700,
    height: '4.3125rem',

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },

    '&:not(:disabled):hover': {
      backgroundColor: '$green300',
    },
  },
})

export const CartFinalizationDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  marginBottom: 55,

  div: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    p: {
      fontSize: '$md',
      color: '$gray300',
    },

    '&:last-child': {
      fontweight: 'bold',

      Span: {
        fontSize: '$md',
      },

      p: {
        color: '$gray100',
        FontSize: 'xl',
      },
    },
  },
})
