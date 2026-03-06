import { BookmarkIcon } from '@heroicons/react/16/solid'
import { defineField, defineType } from 'sanity'

const ALLOWED_TAGS = [
  'edgar',
  'financial-data',
  'data-infrastructure',
  'quant-research',
  'deterministic-data',
  'point-in-time',
  'restatements',
  'data-lineage',
  'api',
  'datasets',
]

export const tagType = defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  icon: BookmarkIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value) return 'Title is required'
          return ALLOWED_TAGS.includes(value)
            ? true
            : `Tag must be one of: ${ALLOWED_TAGS.join(', ')}`
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
  ],
})

