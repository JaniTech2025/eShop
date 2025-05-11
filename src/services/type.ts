// export type Product = {
//     id: string;
//     name: string;
//     price: number;
//     image: string;
//     qty: number;
//     favourited: boolean;
//   };

export type Product = {
  id: string,
  name: string;
  favourited: boolean;
  qty: number;
  variants: {
    qty: number;
    colour: string;
    image: string;
    price: number;
  }[];
  sku: string;
  createdAt: any;
  updatedAt: any;
};

