import { it } from "@jest/globals";
import { waitForElementToBeRemoved } from "@testing-library/react";
import { render, renderRoute } from "../render";
import { products } from "../api.mock";

describe("<Catalog>", () => {
  it("В каталоге отображаются товары, список которых пришел с сервера", async () => {
    const { queryByText, container } = renderRoute("/catalog");

    await waitForElementToBeRemoved(() => queryByText(/loading/i));
    const elements = container.getElementsByClassName("row")[1];
    const elementsLength = elements.childNodes.length;
    expect(elementsLength).toEqual(products.length);
  });

  it("Для каждого товара в каталоге отображается его название, цена и кнопка <Add To Cart>", async () => {
    const { queryByText, getAllByTestId } = render("/catalog");

    await waitForElementToBeRemoved(() => queryByText(/loading/i));

    for (let index in products) {
      let markup = getAllByTestId(index)[0];
      expect(markup).toHaveTextContent(products[index].name);
      expect(markup).toHaveTextContent(products[index].price.toString());

      let link = markup.querySelector("a");
      expect(link).toHaveAttribute("href", `/catalog/${products[index].id}`);
    }
  });

  // если товар уже добавлен в корзину, в каталоге и на странице товара должно отображаться сообщение об этом unit-test

  it("По умолчанию присвоен роут /catalog", () => {
    const { container } = renderRoute("/catalog");
    expect(container.firstChild).toHaveClass("Catalog");
  });
});
