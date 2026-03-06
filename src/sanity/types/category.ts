import { TagIcon } from '@heroicons/react/16/solid'
import { defineField, defineType } from 'sanity'

const ALLOWED_CATEGORIES = ['Product', 'Engineering', 'Data & Research']

export const categoryType = defineType({
  name: 'category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value) return 'Title is required'
          return ALLOWED_CATEGORIES.includes(value)
            ? true
            : `Category must be one of: ${ALLOWED_CATEGORIES.join(', ')}`
        }),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
})
