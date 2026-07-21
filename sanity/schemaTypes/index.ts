import { type SchemaTypeDefinition } from 'sanity';
import { product } from './product';
import { order } from './order';
import { hero } from './hero';
import { banner } from './banner';
import { contactSubmission } from './contactSubmission';
import { blogPost } from './blogPost';
import { category } from './category';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, order, hero, banner, contactSubmission, blogPost, category],
};
