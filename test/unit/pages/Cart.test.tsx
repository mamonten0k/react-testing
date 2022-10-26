import { it } from "@jest/globals";
import userEvent from "@testing-library/user-event";
import { waitForElementToBeRemoved } from "@testing-library/react";
import { render, renderRoute } from "../render";
import { products } from "../api.mock";

describe("<Cart>", () => {
  it("Добавленный товар находится в корзине", async () => {
    const { getByRole, queryByText, container } = render("/catalog/1");

    await waitForElementToBeRemoved(() => queryByText(/loading/i));
    userEvent.click(getByRole("button", { name: /add to cart/i }));
    userEvent.click(getByRole("link", { name: /cart/i }));

    expect(container.querySelector(".Cart-Count")).toHaveTextContent("1");
  });

  it("У добавленного в корзину товара отображаются название, цена, количество в корзине и общая стоимость", async () => {
    const { getByRole, queryByText, container } = render("/catalog/1");

    await waitForElementToBeRemoved(() => queryByText(/loading/i));
    userEvent.click(getByRole("button", { name: /add to cart/i }));
    userEvent.click(getByRole("link", { name: /cart/i }));

    expect(container.querySelector(".Cart-Name")).toBeInTheDocument();
    expect(container.querySelector(".Cart-Price")).toBeInTheDocument();
    expect(container.querySelector(".Cart-Count")).toBeInTheDocument();
    expect(container.querySelector(".Cart-Total")).toBeInTheDocument();
  });

  it("Добавленный повторно товар увеличивает <cart-count> элемента в корзине", async () => {
    const { getByRole, queryByText, container } = render("/catalog/1");

    await waitForElementToBeRemoved(() => queryByText(/loading/i));
    userEvent.click(getByRole("button", { name: /add to cart/i }));
    userEvent.click(getByRole("button", { name: /add to cart/i }));
    userEvent.click(getByRole("link", { name: /cart/i }));

    expect(container.querySelector(".Cart-Count")).toHaveTextContent("2");
  });

  it("Присутствует кнопка <Clear shopping cart>, при нажатии на которую все товары удаляются", async () => {
    const { getByRole, queryByText, getByText } = render("/catalog/1");

    await waitForElementToBeRemoved(() => queryByText(/loading/i));
    userEvent.click(getByRole("button", { name: /add to cart/i }));
    userEvent.click(getByRole("link", { name: /cart/i }));

    userEvent.click(getByRole("button", { name: /clear shopping cart/i }));
    getByText(/cart is empty/i);
  });

  it("Стоимость товаров одного типа подсчитывается в корзине корректно", async () => {
    const { getByRole, queryByText, container } = render("/catalog/1");
    const { price } = products[1];

    await waitForElementToBeRemoved(() => queryByText(/loading/i));
    userEvent.click(getByRole("button", { name: /add to cart/i }));
    userEvent.click(getByRole("button", { name: /add to cart/i }));
    userEvent.click(getByRole("link", { name: /cart/i }));

    const priceTotal = price * 2;
    expect(container.querySelector(".Cart-Total")).toHaveTextContent(
      priceTotal.toString()
    );
  });

  it("Если корзина пуста, отображается ссылка на каталог товаров", () => {
    const { getByRole } = renderRoute("/cart/");

    getByRole("link", { name: /catalog/i });
  });

  it("По умолчанию присвоен роут /cart", () => {
    const { container } = renderRoute("/cart");
    expect(container.firstChild).toHaveClass("Cart");
  });
});
