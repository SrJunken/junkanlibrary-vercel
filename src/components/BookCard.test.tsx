import { describe, it, expect, vi } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '../test/testUtils'
import BookCard from '../components/BookCard'
import type { Book } from '../types/book'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return { ...actual, useNavigate: () => mockNavigate }
})

const fakeBook: Book = {
  key: '/works/OL45804W',
  title: 'The Hobbit',
  author_name: ['J.R.R. Tolkien'],
  cover_i: 12345,
}

const bookWithoutCover: Book = {
  key: '/works/OL99999W',
  title: 'No Cover Book',
  author_name: ['Unknown'],
}

describe('BookCard', () => {
  it('muestra título y autor', () => {
    renderWithProviders(<BookCard book={fakeBook} />)
    expect(screen.getByText('The Hobbit')).toBeInTheDocument()
    expect(screen.getByText('J.R.R. Tolkien')).toBeInTheDocument()
  })

  it('muestra la imagen de portada cuando hay cover_i', () => {
    renderWithProviders(<BookCard book={fakeBook} />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', expect.stringContaining('12345'))
  })

  it('Shows no cover when there is no cover', () => {
    renderWithProviders(<BookCard book={bookWithoutCover} />)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(screen.getByText('no cover')).toBeInTheDocument()
  })

  it('navega a la página de detalle al hacer click', () => {
    renderWithProviders(<BookCard book={fakeBook} />)
    fireEvent.click(screen.getByText('The Hobbit'))
    expect(mockNavigate).toHaveBeenCalledWith('/books/OL45804W')
  })
})