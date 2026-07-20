import { defineType } from "sanity"

export const hero = defineType({
  name: "hero",
  title: "Hero Banner",
  type: "document",
  fields: [
    {
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      name: "subheadline",
      title: "Subheadline",
      type: "string",
    },
    {
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      validation: (rule) => rule.required(),
    },
    {
      name: "primaryCtaText",
      title: "Primary CTA Text",
      type: "string",
    },
    {
      name: "primaryCtaUrl",
      title: "Primary CTA URL",
      type: "string",
    },
    {
      name: "secondaryCtaText",
      title: "Secondary CTA Text",
      type: "string",
    },
    {
      name: "secondaryCtaUrl",
      title: "Secondary CTA URL",
      type: "string",
    },
    {
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      initialValue: false,
    },
  ],
})
