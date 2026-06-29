# Specification — Phase 2: Core Functionality & Stability

---

## Goal

Establish a fully functional, stable eCommerce application by resolving all critical blockers and completing essential user journeys that enable customers to browse products, view details, manage their cart, and complete purchases.

**Why this matters:**

- Customers cannot use the application until it starts and core features work
- Broken user flows prevent any business value
- Missing functionality blocks product launch
- Data integrity issues cause incorrect orders and customer frustration
- Incomplete features create poor user experience and abandoned carts

**What success looks like:**

An application that starts reliably, allows customers to complete all essential eCommerce tasks from product discovery through checkout, displays products consistently with images, handles user interactions correctly, and provides appropriate feedback during loading, empty, and error states.

---

## User Scenarios

### Scenario 1: New Customer Browses and Purchases

A first-time customer visits the site to find and purchase a product:

1. Opens the website and sees the home page with featured products
2. Navigates to the shop page to browse the full catalog
3. Clicks on a product to view full details, images, and description
4. Adds the product to their cart
5. Continues browsing and adds another product
6. Views their cart to review items and quantities
7. Proceeds to checkout
8. Fills out billing information
9. Completes the order
10. Sees order confirmation

**Expected outcome:** Customer successfully completes purchase without errors or broken functionality.

### Scenario 2: Returning Customer Uses Search

A customer knows what they want and uses search:

1. Opens the website
2. Uses search to find a specific product
3. Clicks on a product from search results
4. Adds product to cart from the detail page
5. Views cart
6. Proceeds to checkout
7. Completes order

**Expected outcome:** Search, product detail, cart, and checkout all work correctly together.

### Scenario 3: Customer Manages Cart

A customer adjusts their cart before purchasing:

1. Browses products and adds three items to cart
2. Opens cart to review
3. Increases quantity of one item
4. Decreases quantity of another item
5. Removes the third item completely
6. Sees correct prices and totals throughout
7. Proceeds to checkout

**Expected outcome:** Cart operations work correctly, quantities update properly, totals calculate accurately, and removed items disappear.

### Scenario 4: Customer Encounters Issues

A customer experiences network issues or data problems:

1. Opens website while product service is slow - sees loading indicator
2. Searches for nonexistent product - sees "no results found" message
3. Network request fails - sees error message with helpful guidance
4. Returns to shop - products load successfully

**Expected outcome:** Application handles loading, empty, and error states gracefully without crashing.

---

## Functional Requirements

### FR-1: Application Startup (Addresses CRIT-001)

**Behavior:** The application must start successfully and remain running without crashes.

**Observable requirements:**

- Starting the development server completes without errors
- Accessing the application URL in a browser loads the home page
- The home page displays within 10 seconds of navigation
- No error messages appear in the browser
- The application does not crash during normal use
- All pages remain accessible after startup

**Verification:**
- Start server, open browser to application URL
- Home page loads and displays content
- Navigate to all pages - all load successfully
- No console errors, no error screens, no crashes

**Failure mode:** If dependencies are incompatible or missing, the application fails to start or crashes during use.

---

### FR-2: Product Data Loading (Addresses CRIT-002)

**Behavior:** Products must load from the content management system and display consistently across all pages.

**Observable requirements:**

- Home page displays multiple products with images, titles, prices, stock status
- Shop page displays all available products
- Search results display matching products based on query
- Each product shows: image, title, description, price, stock status
- Products appear within 5 seconds of page load
- If products fail to load, a user-friendly error message appears: "Unable to load products. Please try again."

**Search functionality:**
- Search begins after user types minimum 2 characters
- Search executes with 300ms debounce (live search as user types)
- Pressing Enter performs the same search
- Empty search query displays all products
- Search matches against product title, description, category, and tags (case-insensitive)
- Search supports partial and contains matching (e.g., "cha" finds "chair", "modern chair" finds products with both words)
- Results are sorted by relevance first, then alphabetically when relevance is equal
- Search with no results displays: "No products found for '[query]'" with "Browse All Products" button and suggestion to try different keywords
- All matching products are displayed using existing product grid layout

**Verification:**
- Visit home page → products visible within 5 seconds
- Visit shop page → full product catalog visible
- Type "ch" in search → no results yet (less than 2 chars)
- Type "cha" → search executes, shows matching products
- Continue typing "chair" → results update with debounce
- Press Enter → same search results
- Search for nonsense term → "No products found" message with action button
- Clear search → all products display
- All product information displays correctly on all pages

**Failure mode:** If credentials are missing or incorrect, no products appear, error messages display instead of products, or search doesn't work correctly.

---

### FR-3: Product Detail Page (Addresses HIGH-002)

**Behavior:** Every product must have a dedicated detail page that displays complete product information and allows adding to cart.

**Observable requirements:**

- Clicking any product from any location (home, shop, search) navigates to that product's detail page
- Product detail page URL format: `/shop/[slug]` where slug is the unique product slug from Sanity
- Each product has a unique, stable, human-readable URL (e.g., `/shop/modern-dining-chair`)
- Product detail page displays:
  - Product image(s)
  - Product title
  - Full product description
  - Current price
  - Stock status (In Stock, Low Stock, or Out of Stock)
  - "Add to Cart" button (enabled for In Stock and Low Stock, disabled for Out of Stock)
- "Add to Cart" button adds the product to cart when enabled
- After adding to cart, user sees confirmation (visual feedback or cart count update)
- If product slug does not exist, shows 404 Not Found page
- URL can be bookmarked and shared
- Product slugs remain stable once published

**Verification:**
- Click product from home page → detail page loads at `/shop/[slug]`
- Click product from shop page → detail page loads at `/shop/[slug]`
- Click product from search results → detail page loads at `/shop/[slug]`
- Detail page shows all required information
- "Add to Cart" works for available products
- "Add to Cart" is disabled for out of stock products
- URL is unique per product
- Copy URL, paste in new tab → same product loads
- Navigate to `/shop/invalid-slug` → 404 page appears

**Failure mode:** If product detail page doesn't exist, clicking a product does nothing, navigates to wrong page, shows error, or URL is not stable/shareable.

---

### FR-4: Cart Functionality from All Locations (Addresses HIGH-003)

**Behavior:** Users must be able to add products to cart from every location where "Add to Cart" appears.

**Observable requirements:**

- "Add to Cart" button exists on:
  - Product cards on home page
  - Product cards on shop page
  - Product cards in search results
  - Product detail page
- Clicking "Add to Cart" from any location:
  - Adds product to cart successfully
  - Shows visual confirmation
  - Updates cart count indicator
- Cart contains the added product when opened
- Product appears with correct title, price, and quantity

**Verification:**
- Add product from home page → appears in cart
- Add product from shop page → appears in cart
- Add product from search results → appears in cart
- Add product from detail page → appears in cart
- All added products visible when cart is opened

**Failure mode:** If "Add to Cart" doesn't work from a location, clicking does nothing, shows error, or product doesn't appear in cart.

---

### FR-5: Cart Operations (Addresses MEDIUM-003)

**Behavior:** Users must be able to view cart contents, update quantities, remove items, see accurate totals, and be notified of price or stock changes.

**Observable requirements:**

- Opening cart displays all added products
- Each cart item shows:
  - Product image
  - Product title
  - Unit price (always reflects current price from Sanity)
  - Quantity selector
  - Line total (price × quantity)
  - Remove button
  - Stock status indicator (In Stock, Low Stock, Out of Stock) if applicable
- Cart refreshes product prices when loaded
- If any prices changed since last cart view, displays banner: "Prices have been updated for X item(s) in your cart"
- Price changes show old price (strikethrough) and new price
- Price change banner is informational (no user action required)
- Increasing quantity:
  - Cannot exceed available stock (quantity selector limited to stock level)
  - Updates quantity display immediately
  - Recalculates line total
  - Recalculates cart total
- Decreasing quantity:
  - Updates quantity display immediately
  - Recalculates line total
  - Recalculates cart total
- Quantity cannot be reduced below 1 via quantity controls
- If available stock drops below current cart quantity, displays warning: "Only X items are currently available" and quantity selector maximum updates
- User must manually reduce quantity to available stock
- Removing an item:
  - Removes item from cart immediately
  - Item no longer appears in cart
  - Cart total recalculates
- Out of stock products:
  - Remain in cart
  - Display "Out of Stock" badge
  - Visually distinguished (reduced opacity or disabled quantity controls)
  - Excluded from cart subtotal
  - Included in cart count until removed
  - Must be removed before checkout can complete
- Cart total accurately sums all line totals (excluding out of stock items)
- When cart is empty, displays "Your cart is empty" message with link to shop

**Verification:**
- Add multiple products to cart
- Change product price in Sanity
- Reload cart → price updates, banner appears showing change
- Increase quantity → line total and cart total update correctly
- Try to increase beyond stock → selector limited, cannot exceed
- Decrease quantity → line total and cart total update correctly
- Remove item → item disappears, total recalculates
- Remove all items → "empty cart" message appears
- Mark product as out of stock in Sanity
- Reload cart → product marked unavailable, excluded from total, cart count still includes it
- Math checks: Cart total = sum of (price × quantity) for all available items

**Failure mode:** If cart operations fail, quantities don't update, prices don't refresh, totals are wrong, items don't remove, stock limits aren't enforced, or cart displays incorrect information.

---

### FR-6: Cart Persistence (Addresses MEDIUM-003)

**Behavior:** Cart contents must persist across browser sessions, page navigations, and refreshes until checkout, manual clearing, or expiration.

**Observable requirements:**

- Cart data is stored in browser localStorage (not sessionStorage)
- Adding items to cart, then navigating to another page, then returning to cart → all items still present
- Closing and reopening cart → same items present
- Closing browser completely, reopening site → cart items persist
- Refreshing browser page → cart items persist
- Cart persists for up to 30 days of inactivity
- After 30 days with no cart updates, cart automatically expires and is cleared
- Cart is cleared immediately after successful order completion
- Cart count indicator shows correct number of items throughout navigation
- Cart persists across different sessions on the same browser/device

**Verification:**
- Add 3 products to cart
- Navigate to home, shop, contact, back to cart → cart contains all 3 products
- Refresh page → cart still contains all 3 products
- Close browser completely
- Reopen browser and visit site → cart still contains all 3 products
- Cart count shows "3" throughout all navigation
- Complete an order → cart is emptied
- Wait 30 days → cart expires (cannot be manually tested, implementation must include expiration logic)

**Failure mode:** If persistence fails, cart items disappear when navigating, cart resets on refresh, cart doesn't survive browser close, or cart doesn't expire properly.

---

### FR-7: Cart Unique Identifiers (Addresses MEDIUM-003)

**Behavior:** Cart must use stable, unique product identifiers to prevent incorrect item handling.

**Observable requirements:**

- Adding two different products with similar or identical names adds both products separately
- Updating quantity of one product does not affect other products
- Removing one product does not affect other products
- Cart correctly handles:
  - Products with identical names
  - Products with similar names
  - Same product added multiple times (increases quantity, doesn't duplicate)

**Verification:**
- Add Product A (ID: 1, name: "Chair")
- Add Product B (ID: 2, name: "Chair")
- Cart shows 2 separate line items
- Update quantity of first "Chair" → only first item updates
- Remove first "Chair" → second "Chair" remains
- Add same product twice → quantity increases to 2, not duplicate entries

**Failure mode:** If identifiers are unstable, products merge incorrectly, wrong products update, or cart loses items.

---

### FR-8: Checkout Flow (Addresses HIGH-004)

**Behavior:** Users must be able to complete checkout from cart, provide billing information, select a payment method, and receive order confirmation.

**Observable requirements:**

- "Proceed to Checkout" button exists in cart
- Clicking "Proceed to Checkout" navigates to checkout page
- Checkout page displays:
  - Order summary (all cart items, quantities, prices)
  - Order total
  - Billing information form with fields:
    - First name (required, 2-100 characters, letters/spaces/hyphens/apostrophes)
    - Last name (required, 2-100 characters, letters/spaces/hyphens/apostrophes)
    - Email (required, valid email format with @ and domain)
    - Phone number (required, 7-15 digits, accepts +, -, spaces, parentheses)
    - Country/Region selector (required)
    - Street address (required)
    - City (required)
    - State/Province selector (required, populated based on selected country)
    - ZIP/Postal code (required, 3-10 alphanumeric characters)
    - Company name (optional)
    - Order notes (optional textarea for delivery instructions or special requests)
  - Payment method selection (mock/demo payment options displayed)
  - Currency display
- Form validates required fields before submission
- Validation errors appear inline near each field with specific messages
- Missing or invalid fields prevent submission
- Completing all required fields enables "Place Order" button
- Submitting order:
  - Performs final validation against current Sanity data (prices, stock)
  - If prices changed, updates order summary and requires user to click "Place Order" again
  - If stock insufficient, blocks order and shows error message
  - Shows processing indicator
  - Generates unique order number (format: ORD-XXXXXXXX, uppercase A-Z + digits 2-9, excluding 0,1,O,I,L)
  - Creates order record in Sanity CMS with:
    - Order number
    - Order date/timestamp
    - Order status: "Confirmed"
    - Payment status: "Pending"
    - Selected payment method
    - Customer billing information (all form fields)
    - Cart items (product _id, slug, title, image URL, unit price, quantity, line total)
    - Subtotal and total
    - Currency
    - Customer notes
  - Clears cart
  - Redirects to confirmation page at `/checkout/confirmation?order=ORD-XXXXXXXX`
- Order confirmation page displays:
  - "Thank you for your order" message
  - Order number
  - Order summary (items, quantities, total)
  - Billing information provided
  - Order status
- Confirmation page retrieves order from Sanity using order number
- Refreshing confirmation page continues to display same order
- Invalid order number shows "Order not found" message
- After order completion, cart is emptied

**Verification:**
- Add products to cart
- Click "Proceed to Checkout" → checkout page loads
- Leave required fields empty, attempt submit → validation errors appear
- Fill invalid email → validation error appears
- Fill all required fields correctly, select payment method, submit → order processes
- Confirmation page appears at unique URL with order details
- Copy confirmation URL, paste in new tab → same order loads
- Return to cart → cart is empty
- Order exists in Sanity with all required fields

**Failure mode:** If checkout fails, users can't submit orders, form doesn't validate, order doesn't save in Sanity, confirmation doesn't appear, or cart doesn't clear.

---

### FR-9: Product Images (Addresses HIGH-005)

**Behavior:** Product images must display correctly everywhere products appear.

**Observable requirements:**

- Every product displays its image on:
  - Home page product cards
  - Shop page product cards
  - Search results product cards
  - Product detail page
  - Cart line items
  - Checkout order summary
- Images load within 5 seconds
- If image fails to load, placeholder image or product title appears
- Images are properly sized for their container
- Images do not distort aspect ratio

**Verification:**
- Browse home, shop, search → all products show images
- Open product detail → product image displays
- Add product to cart → product image shows in cart
- Proceed to checkout → product images show in order summary
- All images load correctly without errors

**Failure mode:** If images fail, products show broken image icons, blank spaces, or no visual representation.

---

### FR-10: Loading States (Addresses MEDIUM-004)

**Behavior:** The application must display loading indicators during asynchronous operations.

**Observable requirements:**

- When products are loading, a loading indicator displays
- Loading indicator appears for:
  - Initial page load (home, shop, search)
  - Product detail page load
  - Search query execution
  - Checkout submission
- Loading indicator is visible and clear (spinner, skeleton, or "Loading..." text)
- Loading indicator disappears when content loads
- Content does not "flash" or appear before loading indicator on slow connections

**Verification:**
- Navigate to shop with slow network → loading indicator appears
- Indicator disappears when products load
- Submit search → loading indicator appears during search
- Submit checkout → loading indicator appears during processing

**Failure mode:** If loading states are missing, users see blank screens or frozen interfaces and don't know if application is working.

---

### FR-11: Empty States (Addresses MEDIUM-004)

**Behavior:** The application must display appropriate messages when no content is available.

**Observable requirements:**

- Empty cart displays: "Your cart is empty" with link to shop
- Search with no results displays: "No products found for '[query]'" with suggestion to try different search
- If product catalog is empty, displays: "No products available at this time"
- Empty states are clear and helpful
- Empty states provide next action (link to shop, suggestion to search differently)

**Verification:**
- Open cart when empty → empty message displays
- Search for nonsense term → "no results" message displays
- Empty messages are clear and actionable

**Failure mode:** If empty states are missing, users see blank pages or confusing empty layouts without guidance.

---

### FR-12: Error States (Addresses MEDIUM-004)

**Behavior:** The application must display user-friendly error messages when operations fail.

**Observable requirements:**

- If products fail to load, display: "Unable to load products. Please try again."
- If cart operation fails, display: "Unable to update cart. Please try again."
- If checkout fails, display: "Unable to process order. Please check your information and try again."
- Error messages are:
  - Displayed clearly on screen
  - User-friendly (no technical jargon or stack traces)
  - Actionable (suggest retry or alternate action)
- Application does not crash when errors occur
- Users can retry the failed operation

**Verification:**
- Simulate network failure during product load → error message appears
- Simulate network failure during checkout → error message appears
- Error messages are readable and helpful
- Application remains usable after error

**Failure mode:** If error handling is missing, users see crashes, blank pages, or cryptic error messages.

---

## Edge Cases & Business Rules

### EC-1: Product Availability

**Rule:** Products may have different stock statuses that affect availability.

**Expected behavior:**
- In Stock: Product can be added to cart, quantity selector available up to stock limit
- Low Stock: Product can be added to cart, displays "Low Stock" badge on product pages and in cart, quantity selector limited to available stock
- Out of Stock: Product cannot be added to cart, "Add to Cart" button is disabled or replaced with "Out of Stock" message

**Verification:** Products with different stock statuses behave correctly on product pages, in cart, and at checkout.

### EC-2: Quantity Limits

**Rule:** Cart quantity must be positive integers limited by available stock.

**Expected behavior:**
- Minimum quantity: 1 (cannot reduce below 1 via controls)
- Maximum quantity: Limited to available stock for that product
- Quantity selector disabled or capped at maximum available
- Non-integer quantities: Not accepted (quantity field only accepts whole numbers)
- Zero or negative: Not possible via UI controls
- If stock decreases after item is in cart, quantity selector updates to new maximum
- User must manually adjust if cart quantity exceeds current stock

**Verification:** Quantity controls enforce valid values and respect stock limits.

### EC-3: Price Display and Changes

**Rule:** Prices must display consistently with currency formatting and always reflect current Sanity data.

**Expected behavior:**
- All prices show currency symbol (e.g., "Rs 2,500" or "$25.00")
- Decimal places consistent across all displays
- Thousands separators where appropriate
- Line totals = unit price × quantity
- Cart total = sum of all line totals (excluding out of stock items)
- Prices refresh when cart loads
- Prices refresh when checkout page loads
- Prices validated before order creation
- Price changes trigger informational banner with old price (strikethrough) and new price
- At checkout, if price changes after page load, order summary refreshes and user must click "Place Order" again

**Verification:** All prices formatted correctly, all calculations accurate, price changes properly communicated.

### EC-4: Product Identification

**Rule:** Products are uniquely identified by Sanity _id, not title or slug.

**Expected behavior:**
- Two products can have identical names
- Cart treats them as separate line items (different _id)
- Updating one does not affect the other
- Each maintains separate quantity and line total
- Cart operations use _id internally for all matching and updates

**Verification:** Add products with same name, verify cart handles independently based on _id.

### EC-5: Unavailable Products in Cart

**Rule:** Products that become unavailable while in cart remain visible but excluded from checkout.

**Expected behavior:**
- Out of stock products remain in cart
- Display "Out of Stock" badge
- Visually distinguished (reduced opacity, disabled quantity controls)
- Excluded from cart subtotal and total
- Included in cart item count
- "Proceed to Checkout" button remains enabled
- At checkout, if out of stock items remain, "Place Order" button validation fails
- Error message: "Please remove unavailable items from your cart before placing order"
- User must return to cart and remove unavailable items

**Verification:** Mark product as out of stock, verify cart and checkout behavior matches requirements.

### EC-6: Form Validation

**Rule:** Required checkout fields must be validated with specific rules before order submission.

**Expected behavior:**
- Empty required fields prevent submission with specific inline error messages
- Email validation: Standard HTML5 email format (must contain @ and valid domain)
- Phone validation: 7-15 digits after removing formatting characters, accepts international formats with +, -, spaces, parentheses
- ZIP/Postal code: 3-10 alphanumeric characters
- Name fields: 2-100 characters, allow letters, spaces, hyphens, apostrophes, trim whitespace
- Validation errors appear inline near the field
- Error messages are specific ("Email is required" or "Invalid email format" not "Invalid form")
- Correcting errors removes error messages
- Form can be submitted once all validations pass

**Verification:** Test empty fields, invalid formats, boundary values, verify validation works correctly.

### EC-7: Order Number Generation

**Rule:** Order numbers must be unique, random, and follow a specific format.

**Expected behavior:**
- Format: ORD-XXXXXXXX (exactly 8 characters after prefix)
- Character set: Uppercase A-Z and digits 2-9 only
- Excluded characters: 0, 1, O, I, L (to avoid visual confusion)
- Generation: Application generates before saving to Sanity
- Uniqueness: Check against all existing orderNumber values in Sanity
- Collision handling: Retry up to 5 times if collision detected
- If all 5 retries fail: Show generic error "Unable to process order. Please try again." and do not create order
- Order number saved in Sanity Order document

**Verification:** Generate multiple orders, verify format compliance, verify uniqueness.

### EC-8: Navigation After Order

**Rule:** After successful order, user cannot accidentally resubmit.

**Expected behavior:**
- Order confirmation page displays at `/checkout/confirmation?order=ORD-XXXXXXXX`
- Page retrieves order from Sanity using order number
- Refreshing confirmation page continues to display same order
- Invalid order number shows "Order not found" message
- Pressing browser back button does not resubmit order
- Cart is emptied after successful order
- User must add new products to place another order
- Confirmation page has no "Submit Order" or "Place Order" button

**Verification:** Complete order, verify cart empty, verify cannot resubmit, verify confirmation URL is stable.

### EC-9: Concurrent Cart Operations

**Rule:** Multiple cart operations in quick succession should not corrupt cart state.

**Expected behavior:**
- Rapidly clicking "Add to Cart" multiple times increases quantity correctly (not duplicate entries)
- Quickly updating quantity multiple times applies final value
- Simultaneous operations don't cause duplicate entries or lost items
- Cart state remains consistent after rapid operations

**Verification:** Rapidly perform cart operations, verify final state is correct and consistent.

### EC-10: Product Data Consistency

**Rule:** Product information must remain consistent across all pages and reflect current Sanity data.

**Expected behavior:**
- Product title, price, image, and stock status are identical on:
  - Home page
  - Shop page
  - Search results
  - Product detail
  - Cart (prices always current, other data from cart entry)
  - Checkout order summary
- If product data updates in CMS, changes appear throughout after refresh
- Cart prices always reflect current Sanity prices
- Order summary at checkout reflects current data

**Verification:** Same product appears with consistent data on all pages, price updates propagate correctly.

### EC-11: URL Stability and Sharing

**Rule:** Product detail URLs must be stable and shareable.

**Expected behavior:**
- Each product has unique URL: `/shop/[slug]`
- URL uses product slug from Sanity
- Copying and sharing URL loads correct product
- Invalid product slug shows 404 page
- Product URLs work after browser refresh
- URLs remain stable once product is published

**Verification:** Share product URL, open in new tab, verify same product loads. Test invalid slug.

---

## Out of Scope

### Not Included in Phase 2:

1. **User Authentication** — Guest checkout only, no user accounts or login
2. **Payment Processing** — Checkout form only, no actual payment integration
3. **Order History** — No ability to view past orders
4. **Wishlist Functionality** — Wishlist UI may exist but functionality not implemented
5. **Product Filtering** — Basic catalog browsing only, no filter/sort features
6. **Product Reviews/Ratings** — Display only if in data, no user submission
7. **Product Comparison** — Comparison page may exist but functionality not priority
8. **Shipping Calculation** — No shipping cost calculation
9. **Tax Calculation** — No tax calculation
10. **Promotional Codes/Discounts** — No coupon functionality
11. **Inventory Management** — Stock status displayed but not decremented
12. **Email Notifications** — No order confirmation emails
13. **Performance Optimization** — Functional correctness prioritized over speed
14. **Accessibility Enhancements** — WCAG compliance deferred to later phase
15. **Security Hardening** — Beyond basic input validation
16. **SEO Optimization** — Deferred to later phase
17. **Analytics Integration** — Deferred to later phase
18. **Multi-language Support** — Single language only
19. **Multi-currency Support** — Single currency only

These features belong to Phase 3, 4, 5, or future phases.

---

## Acceptance Criteria

### AC-1: Application Starts Successfully

- [ ] Development server starts without errors
- [ ] Accessing application URL loads home page
- [ ] Home page displays within 10 seconds
- [ ] No error messages in browser console
- [ ] Application does not crash during use
- [ ] All routes are accessible

### AC-2: Products Load Everywhere

- [ ] Home page displays products with images, titles, prices, stock status
- [ ] Shop page displays full product catalog
- [ ] Search with 2+ characters displays matching products
- [ ] Search with less than 2 characters does not trigger search
- [ ] Empty search displays all products
- [ ] Search matches title, description, category, and tags
- [ ] Search results ordered by relevance, then alphabetically
- [ ] Search with no results shows "No products found" message with action button
- [ ] All product information is visible and correct
- [ ] Products load within 5 seconds
- [ ] Failed product load shows user-friendly error message

### AC-3: Product Detail Pages Work

- [ ] Clicking any product from home navigates to `/shop/[slug]`
- [ ] Clicking any product from shop navigates to `/shop/[slug]`
- [ ] Clicking any product from search navigates to `/shop/[slug]`
- [ ] Detail page shows all required product information
- [ ] "Add to Cart" button works from detail page for available products
- [ ] "Add to Cart" button disabled for out of stock products
- [ ] Each product has unique, shareable URL with slug
- [ ] Copying and pasting URL loads correct product
- [ ] Invalid slug shows 404 page
- [ ] Product slugs remain stable

### AC-4: Cart Works From All Locations

- [ ] "Add to Cart" works from home page product cards
- [ ] "Add to Cart" works from shop page product cards
- [ ] "Add to Cart" works from search results
- [ ] "Add to Cart" works from product detail page
- [ ] All added products appear in cart correctly
- [ ] Cart count indicator updates after adding products

### AC-5: Cart Operations Function Correctly

- [ ] Cart displays all added products
- [ ] Cart refreshes prices when loaded
- [ ] Price change banner appears when prices changed
- [ ] Old price shown with strikethrough, new price displayed
- [ ] Increasing quantity updates line total and cart total correctly
- [ ] Quantity selector limited to available stock
- [ ] Cannot increase quantity beyond stock limit
- [ ] Decreasing quantity updates totals correctly
- [ ] Quantity cannot go below 1
- [ ] Removing item removes it from cart immediately
- [ ] Cart total = sum of all available line totals (math is correct)
- [ ] Out of stock products marked with badge
- [ ] Out of stock products excluded from total
- [ ] Out of stock products still counted in cart count
- [ ] Out of stock products visually distinguished
- [ ] Empty cart shows "Your cart is empty" message with shop link

### AC-6: Cart Persists Correctly

- [ ] Cart items remain when navigating between pages
- [ ] Cart items remain after closing and reopening cart
- [ ] Cart items persist after page refresh
- [ ] Cart items persist after closing and reopening browser
- [ ] Cart persists across sessions on same device/browser
- [ ] Cart expires after 30 days of inactivity
- [ ] Cart is cleared after successful order
- [ ] Cart count indicator shows correct count throughout navigation

### AC-7: Cart Uses Stable Identifiers

- [ ] Adding two products with same name creates two separate cart items (different _id)
- [ ] Updating one product doesn't affect other products
- [ ] Removing one product doesn't affect other products
- [ ] Same product added twice increases quantity, doesn't duplicate
- [ ] Cart operations use product _id internally

### AC-8: Checkout Flow Completes

- [ ] "Proceed to Checkout" button navigates to checkout
- [ ] Checkout displays order summary with current prices
- [ ] Checkout displays all required form fields
- [ ] Checkout displays payment method selection
- [ ] Checkout displays currency
- [ ] Checkout displays optional order notes field
- [ ] Form validates all required fields with specific inline errors
- [ ] Email validation: requires @ and valid domain
- [ ] Phone validation: 7-15 digits, accepts international format
- [ ] ZIP validation: 3-10 alphanumeric characters
- [ ] Name validation: 2-100 characters, allows letters/spaces/hyphens/apostrophes
- [ ] Invalid submission shows specific error messages per field
- [ ] Valid submission processes order
- [ ] Price validation runs before order creation
- [ ] If prices changed, order summary updates and requires re-submission
- [ ] Stock validation runs before order creation
- [ ] If stock insufficient, order blocked with clear error
- [ ] Processing indicator appears during order creation
- [ ] Order number generated in format ORD-XXXXXXXX
- [ ] Order number uses only A-Z (uppercase) and 2-9
- [ ] Order number excludes 0, 1, O, I, L
- [ ] Order number uniqueness checked against Sanity
- [ ] Order saved to Sanity with all required fields
- [ ] Order status: "Confirmed"
- [ ] Payment status: "Pending"
- [ ] Order includes all cart items with correct data
- [ ] Cart is emptied after successful order
- [ ] Redirects to `/checkout/confirmation?order=ORD-XXXXXXXX`
- [ ] Confirmation page displays all order details
- [ ] Confirmation page retrieves order from Sanity
- [ ] Refreshing confirmation page shows same order
- [ ] Invalid order number shows "Order not found"
- [ ] Cannot accidentally resubmit order

### AC-9: Product Images Display

- [ ] Images display on home page
- [ ] Images display on shop page
- [ ] Images display in search results
- [ ] Images display on product detail page
- [ ] Images display in cart
- [ ] Images display in checkout order summary
- [ ] Images load within 5 seconds
- [ ] Failed images show placeholder or product title

### AC-10: Loading States Appear

- [ ] Loading indicator appears during product load (home, shop, search)
- [ ] Loading indicator appears during search execution
- [ ] Loading indicator appears during checkout submission
- [ ] Loading indicator disappears when operation completes
- [ ] Loading indicators are visible and clear

### AC-11: Empty States Display

- [ ] Empty cart shows "Your cart is empty" message with shop link
- [ ] Search with no results shows "No products found for '[query]'" with action
- [ ] Empty states are clear and actionable
- [ ] Empty states provide next action

### AC-12: Error States Display

- [ ] Failed product load shows error: "Unable to load products. Please try again."
- [ ] Failed cart operation shows appropriate error message
- [ ] Failed checkout shows error: "Unable to process order. Please check your information and try again."
- [ ] Error messages are user-friendly (no technical jargon)
- [ ] Error messages are actionable
- [ ] Application remains usable after error
- [ ] Users can retry failed operations

### AC-13: Edge Cases Handled

- [ ] In Stock products can be added to cart
- [ ] Low Stock products show badge and can be added to cart
- [ ] Out of stock products cannot be added to cart
- [ ] Quantity must be positive integers
- [ ] Quantity limited to available stock
- [ ] Prices display with consistent currency formatting
- [ ] Price changes properly communicated with banners
- [ ] Products with identical names handled independently by _id
- [ ] Out of stock items remain in cart but excluded from totals
- [ ] Out of stock items block order submission with clear message
- [ ] Form validation enforces all specified rules
- [ ] Order numbers follow exact format requirements
- [ ] Order numbers are unique with collision detection
- [ ] Checkout order summary refreshes if prices change
- [ ] Order cannot be accidentally resubmitted
- [ ] Rapid cart operations don't corrupt state
- [ ] Product data consistent across all pages
- [ ] Product URLs are stable and shareable
- [ ] 404 page shown for invalid product slugs

### AC-14: No Regressions

- [ ] All functionality that worked before still works
- [ ] No previously working pages are broken
- [ ] No new errors introduced
- [ ] Application stability has not degraded

### AC-15: Audit Findings Resolved

- [ ] CRIT-001 resolved: Application starts successfully with correct dependencies
- [ ] CRIT-002 resolved: Products load from Sanity CMS
- [ ] HIGH-002 resolved: Product detail pages exist at `/shop/[slug]` and work
- [ ] HIGH-003 resolved: Cart works from search results
- [ ] HIGH-004 resolved: Checkout flow is complete with order creation and confirmation
- [ ] HIGH-005 resolved: Product images display correctly everywhere
- [ ] MEDIUM-003 resolved: Cart uses stable unique identifiers (_id)
- [ ] MEDIUM-004 resolved: Loading, empty, and error states present and appropriate

---

## Definition of Complete

Phase 2 is complete when:

1. All acceptance criteria are satisfied
2. All listed audit findings are resolved
3. All user scenarios complete successfully
4. All functional requirements are met
5. All edge cases are handled correctly
6. The application is stable and does not crash
7. Users can complete the full journey: browse → detail → cart → checkout → confirmation
8. No Critical or High functional issues remain
9. No regressions have been introduced
10. A reviewer can manually verify every requirement by following test steps

Phase 2 is **not complete** if:
- Application fails to start
- Any core user journey is broken
- Cart operations are incorrect
- Checkout cannot be completed
- Product images don't display
- Any acceptance criterion is not met

**The application must be fully functional for essential eCommerce tasks before proceeding to Phase 3.**
