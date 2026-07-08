"use server";

import { writeClient, client } from "@/sanity/lib/client";
import { generateUniqueOrderNumber, validateCheckoutForm } from "../utils/orderUtils";
import { validateCartAgainstSanity } from "../utils/validationUtils";

interface OrderData {
  formData: any;
  cartItems: any[];
  paymentMethod: string;
  subtotal: number;
}

export async function createOrder(orderData: OrderData) {
  try {
    const { formData, cartItems, paymentMethod, subtotal } = orderData;

    // Validate form
    const validation = validateCheckoutForm(formData);
    if (!validation.valid) {
      return {
        success: false,
        error: validation.errors[0],
      };
    }

    // Validate cart not empty
    if (cartItems.length === 0) {
      return {
        success: false,
        error: "Cart is empty",
      };
    }

    // CRITICAL: Validate prices and stock against current Sanity data
    const cartValidation = await validateCartAgainstSanity(cartItems, client);

    if (!cartValidation.valid) {
      // Return specific error with validation details
      if (cartValidation.priceChanges.length > 0) {
        return {
          success: false,
          error: "Prices have changed. Please review your cart and try again.",
          priceChanges: cartValidation.priceChanges,
          validationErrors: cartValidation.errors,
        };
      }

      if (cartValidation.stockIssues.length > 0) {
        return {
          success: false,
          error: "Some items are out of stock or have insufficient quantity. Please update your cart.",
          stockIssues: cartValidation.stockIssues,
          validationErrors: cartValidation.errors,
        };
      }

      return {
        success: false,
        error: cartValidation.errors[0] || "Order validation failed",
        validationErrors: cartValidation.errors,
      };
    }

    // Generate unique order number
    const orderNumber = await generateUniqueOrderNumber(writeClient);

    // Fetch current validated prices and currencies for order (use Sanity as source of truth)
    const productIds = cartItems.map((item: any) => item.id);
    const query = `*[_type == "product" && _id in $ids]{
      _id,
      price,
      currency
    }`;
    const currentProducts = await client.fetch(query, { ids: productIds });
    const productPriceMap: Record<string, number> = {};
    const productCurrencyMap: Record<string, string> = {};
    currentProducts.forEach((product: any) => {
      productPriceMap[product._id] = product.price;
      productCurrencyMap[product._id] = product.currency || '$';
    });

    // Use first item's currency for the order (or enhance to handle multi-currency)
    const orderCurrency = cartItems[0]?.currency || productCurrencyMap[cartItems[0]?.id] || '$';

    // Calculate validated total using current Sanity prices
    const validatedTotal = cartItems.reduce((total: number, item: any) => {
      const currentPrice = productPriceMap[item.id] || 0;
      return total + currentPrice * item.quantity;
    }, 0);

    // Prepare order data with validated current prices
    const sanityOrderData = {
      _type: "order",
      orderNumber,
      createdAt: new Date().toISOString(),
      status: "pending",
      paymentStatus: "pending",
      paymentMethod:
        paymentMethod === "bank_transfer"
          ? "Direct Bank Transfer"
          : paymentMethod === "cod"
          ? "Cash On Delivery"
          : "Direct Bank Transfer",
      customerInfo: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        companyName: formData.companyName || undefined,
        country: formData.country,
        streetAddress: formData.streetAddress,
        city: formData.city,
        province: formData.province || undefined,
        zipCode: formData.zipCode,
        phone: formData.phone,
        email: formData.email,
      },
      items: cartItems.map((item: any) => {
        const validatedPrice = productPriceMap[item.id] || 0;
        const itemCurrency = productCurrencyMap[item.id] || orderCurrency;
        return {
          _type: "object",
          _key: item.id,
          product: {
            _type: "reference",
            _ref: item.id,
          },
          productId: item.id,
          title: item.title,
          quantity: item.quantity,
          price: `${itemCurrency} ${validatedPrice}`,
          lineTotal: validatedPrice * item.quantity,
        };
      }),
      subtotal: validatedTotal,
      total: validatedTotal,
      currency: orderCurrency,
      additionalInfo: formData.additionalInfo || undefined,
    };

    // Create order in Sanity
    await writeClient.create(sanityOrderData);

    return {
      success: true,
      orderNumber,
    };
  } catch (error: any) {
    console.error("Order creation failed:", error);
    return {
      success: false,
      error: error.message || "Failed to create order",
    };
  }
}
