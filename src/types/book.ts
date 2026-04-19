export interface Book {
  key: string
  title: string
  author_name?: string[]
  cover_i?: number
  first_publish_year?: number
  subject?: string[]
}

export interface OpenLibraryResponse {
  numFound: number
  start: number
  docs: Book[]
}