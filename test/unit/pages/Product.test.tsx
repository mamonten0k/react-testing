import React from "react";
import { it } from "@jest/globals";
import userEvent from "@testing-library/user-event";
import { renderFragment } from "../render";
import { products } from "../api.mock";

import { ProductDetails } from "../../../src/client/components/ProductDetails";

describe("<Product>", () => {
  it("При добавлении предмета в корзину на странице появится надпись <Item in cart>", async () => {
    const { getByText, getByRole } = renderFragment(
      <ProductDetails product={products[0]} />
    );

    userEvent.click(getByRole("button", { name: /add to cart/i }));
    getByText(/item in cart/i);
  });
});
