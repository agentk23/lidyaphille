import { type SchemaTypeDefinition } from 'sanity'
import { imageType } from './image'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [imageType],
}
