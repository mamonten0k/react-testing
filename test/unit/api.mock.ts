import { AxiosResponse } from "axios";
import { commerce } from "faker";
import { CartApi, ExampleApi } from "../../src/client/api";
import {
  Product,
  ProductShortInfo,
  CheckoutFormData,
  CheckoutResponse,
  CartState,
} from "../../src/common/types";

const generateProducts = () => {
  const products: Product[] = [];

  for (let id = 0; id < 12; id++) {
    products.push({
      id,
      name: `${commerce.productAdjective()} ${commerce.product()}`,
      description: commerce.productDescription(),
      price: Number(commerce.price()),
      color: commerce.color(),
      material: commerce.productMaterial(),
    });
  }

  return products;
};

export const products = generateProducts();

function getShortInfo({ id, name, price }: Product): ProductShortInfo {
  return { id, name, price };
}

export class MockApi extends ExampleApi {
  async getProducts() {
    return {
      data: products.map((product) => getShortInfo(product)),
    } as AxiosResponse<ProductShortInfo[], any>;
  }

  async getProductById(id: number) {
    return {
      data: products[id],
    } as AxiosResponse<Product, any>;
  }

  async checkout(form: CheckoutFormData, cart: CartState) {
    return {
      data: {
        id: 100500,
      },
    } as AxiosResponse<CheckoutResponse, any>;
  }
}

export class MockCartApi extends CartApi {
  cartState: CartState;

  getState(): CartState {
    return this.cartState || {};
  }

  setState(cart: CartState) {
    this.cartState = cart;
  }
}
// import { AxiosResponse } from "axios";
// import {
//   CartState,
//   CheckoutFormData,
//   CheckoutResponse,
//   Product,
//   ProductShortInfo,
// } from "../../src/common/types";
// import { ExampleApi } from "../../src/client/api";

// export class MockExampleApi extends ExampleApi {
//   private products: Product[] = [
//     {
//       id: 1,
//       name: "Халат",
//       price: 200,
//       description: "классный халат",
//       material: "хлопок",
//       color: "зеленый",
//     },
//     {
//       id: 2,
//       name: "Куртка",
//       price: 600,
//       description: "теплая куртка",
//       material: "пух",
//       color: "черная",
//     },
//     {
//       id: 3,
//       name: "Свитер",
//       price: 400,
//       description: "мягкий свитер",
//       material: "шерсть",
//       color: "красный",
//     },
//   ];

//   constructor(basename: string) {
//     super(basename);
//   }

//   async getProducts() {
//     return {
//       data: this.products.map(({ id, name, price }) => ({
//         id,
//         name,
//         price,
//       })),
//     } as AxiosResponse<ProductShortInfo[]>;
//   }

//   async getProductById(id: number) {
//     return {
//       data: this.products.find((product) => {
//         return product.id === id;
//       }),
//     } as AxiosResponse<Product>;
//   }

//   async checkout(form: CheckoutFormData, cart: CartState) {
//     return {
//       data: {
//         id: 234,
//       },
//     } as AxiosResponse<CheckoutResponse>;
//   }
// }
