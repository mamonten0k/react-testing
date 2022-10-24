import React from "react";
import { it } from "@jest/globals";
import { renderRoute, renderFragment } from "../render";

import { Delivery } from "../../../src/client/pages/Delivery";

describe("<Delivery>", () => {
  it("Представляет собой статичный контент", () => {
    const { asFragment } = renderFragment(<Delivery />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("По умолчанию присвоен роут /delivery", () => {
    const { container } = renderRoute("/delivery");
    expect(container.firstChild).toHaveClass("Delivery");
  });
});
