import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useFetch } from '../hooks/useFetch'

beforeEach(() => {
  vi.clearAllMocks()
})

describe('useFetch', () => {
  it('returns isLoading while fetching', async () => {
    globalThis.fetch = vi.fn().mockImplementation(
      () => new Promise(resolve =>
        setTimeout(() => resolve({
          ok: true,
          json: async () => ({ data: 'algo' }),
        }), 100)
      )
    )

    const { result } = renderHook(() => useFetch('http://fake.com'))
    expect(result.current.isLoading).toBe(true)
  })

  it('returns data when fetch goes right', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ name: 'libro' }),
    })

    const { result } = renderHook(() => useFetch('http://fake.com'))

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.data).toEqual({ name: 'libro' })
    expect(result.current.error).toBeNull()
  })

  it('returns error when fetch fails', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    })

    const { result } = renderHook(() => useFetch('http://fake.com'))

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.error).toBe('HTTP error: 404')
    expect(result.current.data).toBeNull()
  })

  it('doesnt fetch when url is null', () => {
    globalThis.fetch = vi.fn()
    renderHook(() => useFetch(null))
    expect(globalThis.fetch).not.toHaveBeenCalled()
  })

  it('return error when la network fails', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

    const { result } = renderHook(() => useFetch('http://fake.com'))

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.error).toBe('Network error')
  })
})