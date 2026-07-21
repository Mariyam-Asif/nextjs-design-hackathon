import { defineType } from 'sanity';

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    },
    {
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first. Leave at 0 for alphabetical order.',
      initialValue: 0,
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Only active categories appear in navigation',
      initialValue: true,
    },
  ],
});
