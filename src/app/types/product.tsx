export type Category = {
    name: string,
    description: string
};
 
export type Manufacturer = {
    name: string
};

// TODO: Make different descriptions for different options
export type Description = {
    option1: string,
    option2: string,
    option3: string,
    option4: string
}

export type Product = {
    id: string,
    name: string,
    description: string,
    price: string,
    composition: string,
    weight: string,
    instock: number,
    photo_id: string,
    category: Category,
    manufacturer: Manufacturer
};
