# Shopping Cart - Manual Test Cases

| ID | Test case | Automation status |
|---|---|---|
| CART-001 | Add a product to the cart | Covered by `tests/ui/cart.spec.ts` |
| CART-002 | Remove a product from the cart | Covered by `tests/ui/cart.spec.ts` |
| CART-003 | Change the product quantity | Covered by `tests/ui/cart.spec.ts` |
| CART-004 | Verify the total is recalculated after changing quantity | Covered by `tests/ui/cart.spec.ts` |
| CART-005 | Reject a quantity below the minimum | Manual only |

## CART-001: Add a Product to the Cart

**Preconditions:** The product catalog is available and contains an in-stock product.

| Step | Action | Expected result |
|---|---|---|
| 1 | Open the catalog and select an in-stock product. | The product details page is displayed with its name, price, and quantity control. |
| 2 | Click **Add to cart**. | A success message confirms that the product was added. |
| 3 | Open the cart. | The selected product appears in the cart with quantity 1 and its unit price. |

## CART-002: Remove a Product from the Cart

**Preconditions:** The cart contains one product.

| Step | Action | Expected result |
|---|---|---|
| 1 | Open the cart. | The product row and cart total are displayed. |
| 2 | Click the remove control for the product. | The product row disappears from the cart. |
| 3 | Check the cart contents. | The cart displays its empty state and no product row remains. |

## CART-003: Change the Product Quantity

**Preconditions:** The cart contains one product with quantity 1.

| Step | Action | Expected result |
|---|---|---|
| 1 | Open the cart and locate the product quantity field. | The quantity field contains 1. |
| 2 | Change the quantity to 2 and commit the field change. | The cart reflects quantity 2 for the selected product. |
| 3 | Recheck the quantity field after the update. | The value remains 2. |

## CART-004: Verify the Total Is Recalculated

**Preconditions:** The cart contains one product with a known unit price and quantity 1.

| Step | Action | Expected result |
|---|---|---|
| 1 | Record the product unit price and current cart total. | The cart total matches the unit price for quantity 1. |
| 2 | Change the product quantity to 2. | The line total and cart total update automatically. |
| 3 | Compare the new total with the unit price. | The total equals two times the unit price, subject to currency rounding. |

## CART-005: Reject a Quantity Below the Minimum

**Preconditions:** The cart contains one product and its quantity field is available.

| Step | Action | Expected result |
|---|---|---|
| 1 | Replace the quantity with 0 (or another value below the minimum). | The field rejects the value or displays a validation state. |
| 2 | Commit the field change. | The cart does not accept a quantity below 1; the quantity and total remain valid. |
| 3 | Refresh the cart and check the product row. | The product remains in the cart with a valid quantity. |

**Automation note:** CART-001 through CART-004 have corresponding coverage in `tests/ui/cart.spec.ts`. CART-005 is currently a manual test case.
