export type Category = {
    name: string,
    description: string
};
 
export type Manufacturer = {
    name: string
};

export type Product = {
    id: string,
    name: string,
    description: string,
    price: string,
    composition: string,
    weight: string,
    // category: Category,
    // manufacturer: Manufacturer
};
