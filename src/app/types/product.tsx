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
    price: number,
    composition: number,
    weight: number,
    category: Category,
    manufacturer: Manufacturer
};
