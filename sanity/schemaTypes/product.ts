import { defineType } from "sanity"

export const product = defineType({
    name: "product",
    title: "Product",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            validation: (rule) => rule.required(),
            type: "string"
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
                slugify: (input: string) => {
                    return input
                        .toLowerCase()
                        .trim()
                        .split(/\s+/) // Split by whitespace
                        .slice(0, 4) // Take first 4 words
                        .join('-') // Join with hyphens
                        .replace(/[^\w\-]+/g, '') // Remove all non-word chars except hyphens
                        .replace(/\-\-+/g, '-') // Replace multiple hyphens with single hyphen
                        .replace(/^-+/, '') // Trim hyphens from start
                        .replace(/-+$/, ''); // Trim hyphens from end
                },
            },
            validation: (rule) => rule.required(),
        },
        {
            name:"description",
            type:"text",
            validation: (rule) => rule.required(),
            title:"Description",
        },
        {
            name: "productImage",
            type: "image",
            validation: (rule) => rule.required(),
            title: "Product Image"
        },
        {
            name: "price",
            type: "number",
            validation: (rule) => rule.required(),
            title: "Price",
        },
        {
            name: "currency",
            type: "string",
            title: "Currency",
            options: {
                list: [
                    { title: "Pakistani Rupee (Rs)", value: "Rs" },
                    { title: "US Dollar ($)", value: "$" },
                    { title: "Euro (€)", value: "€" },
                    { title: "British Pound (£)", value: "£" },
                    { title: "Indian Rupee (₹)", value: "₹" },
                ],
            },
            initialValue: "$",
            validation: (rule) => rule.required(),
        },
        {
            name: "tags",
            type: "array",
            title: "Tags",
            of: [{ type: "string" }]
        },
        {
            name:"dicountPercentage",
            type:"number",
            title:"Discount Percentage",
        },
        {
            name:"isNew",
            type:"boolean",
            title:"New Badge",
        },
        {
            name:"stockStatus",
            type:"string",
            title: "Stock Status",
            validation: (rule)=>
                rule.required().custom((value)=>{
                    if(["inStock", "outOfStock", "lowStock"].includes(value as string)){
                        return true;
                    }
                    return "Invalid stock status value. Allowed values: 'inStock', 'outOfStock', 'lowStock'.";
                }),
                options:{
                    list: [
                        {title: "In Stock", value: "inStock"},
                        {title: "Out Of Stock", value: "outOfStock"},
                        {title: "Low Stock", value: "lowStock"},
                    ],
                },
                initialValue: "inStock"
        },
        {
            name: "stockQuantity",
            type: "number",
            title: "Stock Quantity",
            validation: (rule) => rule.required().min(0),
            initialValue: 0,
            description: "Available quantity in stock. Set to 0 for out of stock items."
        },
    ],
});