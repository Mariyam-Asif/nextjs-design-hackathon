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
    ],
});