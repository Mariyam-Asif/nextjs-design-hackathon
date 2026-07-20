import { defineType } from "sanity"

export const contactSubmission = defineType({
  name: "contactSubmission",
  title: "Contact Form Submission",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
      readOnly: true,
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required().email(),
      readOnly: true,
    },
    {
      name: "subject",
      title: "Subject",
      type: "string",
      validation: (rule) => rule.required(),
      readOnly: true,
    },
    {
      name: "message",
      title: "Message",
      type: "text",
      validation: (rule) => rule.required(),
      readOnly: true,
    },
    {
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      validation: (rule) => rule.required(),
      readOnly: true,
    },
    {
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Read", value: "read" },
          { title: "Responded", value: "responded" },
        ],
      },
      initialValue: "new",
      validation: (rule) => rule.required(),
    },
  ],
})
