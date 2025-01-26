export const enum ShoppingStage {
    Cart = "Cart",
    Shipping = "Shipping",
    Checkout = "Checkout", 
};

export const ShoppingStages = {
    values: [
        ShoppingStage.Cart,
        ShoppingStage.Shipping,
        ShoppingStage.Checkout,
    ]
} as const;
