import { DocumentIcon } from '@heroicons/react/16/solid'
import { groq } from 'next-sanity'
import { defineField, defineType } from 'sanity'
import { apiVersion } from '../env'

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

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) =>
        Rule.required().error('A slug is required for the post URL.'),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      validation: (Rule) =>
        Rule.required().error(
          'A publication date is required for ordering posts.',
        ),
    }),
    defineField({
      name: 'isFeatured',
      type: 'boolean',
      initialValue: false,
      validation: (Rule) =>
        Rule.custom(async (isFeatured, { getClient }) => {
          if (isFeatured !== true) {
            return true
          }

          let featuredPosts = await getClient({ apiVersion })
            .withConfig({ perspective: 'previewDrafts' })
            .fetch<number>(
              groq`count(*[_type == 'post' && isFeatured == true])`,
            )

          return featuredPosts > 3
            ? 'Only 3 posts can be featured at a time.'
            : true
        }),
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: { type: 'author' },
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(1)
          .error('Exactly one category is required.'),
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tag' } }],
      validation: (Rule) =>
        Rule.required()
          .min(4)
          .max(6)
          .custom(async (value, context) => {
            if (!Array.isArray(value)) return 'Tags are required'
            if (value.length < 4 || value.length > 6) return true
            const refs = value
              .map((item) => (item as { _ref?: string })?._ref)
              .filter((ref): ref is string => Boolean(ref))
            if (refs.length !== value.length) return 'All tags must be references'

            const tags = await context
              .getClient({ apiVersion })
              .withConfig({ perspective: 'previewDrafts' })
              .fetch<{ slug?: { current?: string } }[]>(
                groq`*[_type == "tag" && _id in $ids]{slug}`,
                { ids: refs },
              )

            const slugs = tags
              .map((tag) => tag.slug?.current)
              .filter((slug): slug is string => Boolean(slug))

            const hasInvalid = slugs.some((slug) => !ALLOWED_TAGS.includes(slug))
            return hasInvalid
              ? `Only predefined tags are allowed: ${ALLOWED_TAGS.join(', ')}`
              : true
          }),
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      author: 'author.name',
      isFeatured: 'isFeatured',
    },
    prepare({ title, author, media, isFeatured }) {
      return {
        title,
        subtitle: [isFeatured && 'Featured', author && `By ${author}`]
          .filter(Boolean)
          .join(' | '),
        media,
      }
    },
  },
  orderings: [
    {
      name: 'isFeaturedAndPublishedAtDesc',
      title: 'Featured & Latest Published',
      by: [
        { field: 'isFeatured', direction: 'desc' },
        { field: 'publishedAt', direction: 'desc' },
      ],
    },
  ],
})
