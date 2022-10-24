import { it } from "@jest/globals";
import userEvent from "@testing-library/user-event";
import { waitForElementToBeRemoved } from "@testing-library/react";
import { render, renderRoute } from "../render";
import { products } from "../api.mock";

describe("<Cart>", () => {
  it("Добавленный элемент находится в корзине", async () => {
    const { getByRole, queryByText, container } = render("/catalog/1");

    await waitForElementToBeRemoved(() => queryByText(/loading/i));
    userEvent.click(getByRole("button", { name: /add to cart/i }));
    userEvent.click(getByRole("link", { name: /cart/i }));

    expect(container.querySelector(".Cart-Count")).toHaveTextContent("1");
  });

  it("Добавленный повторно элемент увеличивает cart-count элемента в корзине", async () => {
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

  it("Стоимость элементов одного типа подсчитывается в корзине корректно", async () => {
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
