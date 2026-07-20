import { defineType } from "sanity"

export const banner = defineType({
  name: "banner",
  title: "Promotional Banner",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      name: "message",
      title: "Message",
      type: "text",
      validation: (rule) => rule.required(),
    },
    {
      name: "image",
      title: "Image",
      type: "image",
    },
    {
      name: "ctaText",
      title: "CTA Text",
      type: "string",
    },
    {
      name: "ctaUrl",
      title: "CTA URL",
      type: "string",
    },
    {
      name: "placement",
      title: "Placement",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Header Banner", value: "header" },
          { title: "Home Page", value: "home" },
          { title: "Shop Page", value: "shop" },
          { title: "Product Detail Page", value: "product" },
        ],
      },
      validation: (rule) => rule.required(),
    },
    {
      name: "priority",
      title: "Priority",
      type: "number",
      initialValue: 0,
      validation: (rule) => rule.required(),
    },
    {
      name: "startDate",
      title: "Start Date",
      type: "datetime",
      validation: (rule) => rule.required(),
    },
    {
      name: "endDate",
      title: "End Date",
      type: "datetime",
      validation: (rule) => rule.required(),
    },
    {
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      initialValue: true,
      validation: (rule) => rule.required(),
    },
  ],
})
