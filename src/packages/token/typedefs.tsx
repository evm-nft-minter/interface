export interface TokenAttribute {
  id: string
  traitType: string
  value: string
}

export interface TokenMetadata {
  image: File
  name?: string | null
  description?: string | null
  attributes?: TokenAttribute[] | null
}
