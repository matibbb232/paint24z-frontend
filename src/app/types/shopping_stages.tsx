export const enum ShoppingStage {
    Cart = "Cart",
    Checkout = "Checkout", 
    Shipping = "Shipping",
};

export const ShoppingStages = {
    values: [
        ShoppingStage.Cart,
        ShoppingStage.Checkout,
        ShoppingStage.Shipping,
    ]
} as const;
