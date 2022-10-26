import { AxiosResponse } from "axios";
import { commerce } from "faker";
import { CartApi, ExampleApi } from "../../src/client/api";
import { Product, ProductShortInfo, CartState} from "../../src/common/types";

function getProductShortInfo({ id, name, price }: Product): ProductShortInfo {
  return { id, name, price };
}

export class MockApi extends ExampleApi {
  async getProducts() {
    return {
      data: products.map((product) => getProductShortInfo(product)),
    } as AxiosResponse<ProductShortInfo[], any>;
  }

  async getProductById(id: number) {
    return {
      data: products[id],
    } as AxiosResponse<Product, any>;
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

const getProductsForCatalog = () => {
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

export const products = getProductsForCatalog();
