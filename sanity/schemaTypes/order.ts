import { defineType, defineField } from 'sanity'

export const order = defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    defineField({
      name: 'orderNumber',
      title: 'Order Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Processing', value: 'processing' },
          { title: 'Shipped', value: 'shipped' },
          { title: 'Delivered', value: 'delivered' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
      initialValue: 'pending',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paymentStatus',
      title: 'Payment Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Paid', value: 'paid' },
          { title: 'Failed', value: 'failed' },
        ],
      },
      initialValue: 'pending',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paymentMethod',
      title: 'Payment Method',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customerInfo',
      title: 'Customer Information',
      type: 'object',
      fields: [
        { name: 'firstName', type: 'string', title: 'First Name', validation: (Rule) => Rule.required() },
        { name: 'lastName', type: 'string', title: 'Last Name', validation: (Rule) => Rule.required() },
        { name: 'companyName', type: 'string', title: 'Company Name' },
        { name: 'country', type: 'string', title: 'Country', validation: (Rule) => Rule.required() },
        { name: 'streetAddress', type: 'string', title: 'Street Address', validation: (Rule) => Rule.required() },
        { name: 'city', type: 'string', title: 'City', validation: (Rule) => Rule.required() },
        { name: 'province', type: 'string', title: 'Province/State' },
        { name: 'zipCode', type: 'string', title: 'ZIP Code', validation: (Rule) => Rule.required() },
        { name: 'phone', type: 'string', title: 'Phone', validation: (Rule) => Rule.required() },
        { name: 'email', type: 'string', title: 'Email', validation: (Rule) => Rule.required().email() },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Order Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'product',
              type: 'reference',
              to: [{ type: 'product' }],
              title: 'Product',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'productId',
              type: 'string',
              title: 'Product ID',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'title',
              type: 'string',
              title: 'Product Title',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'quantity',
              type: 'number',
              title: 'Quantity',
              validation: (Rule) => Rule.required().min(1),
            },
            {
              name: 'price',
              type: 'string',
              title: 'Price at Time of Order',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'subtotal',
      title: 'Subtotal',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'total',
      title: 'Total',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'PKR',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'additionalInfo',
      title: 'Additional Information',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      orderNumber: 'orderNumber',
      total: 'total',
      status: 'status',
      customerName: 'customerInfo.firstName',
    },
    prepare(selection) {
      const { orderNumber, total, status, customerName } = selection
      return {
        title: `Order ${orderNumber}`,
        subtitle: `${customerName} - $ ${total?.toLocaleString()} - ${status}`,
      }
    },
  },
})
