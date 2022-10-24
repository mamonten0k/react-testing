import React from "react";
import { it } from "@jest/globals";
import { renderRoute, renderFragment } from "../render";

import { Home } from "../../../src/client/pages/Home";

describe("<Home>", () => {
  it("Представляет собой статичный контент", () => {
    const { asFragment } = renderFragment(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("По умолчанию присвоен роут /", () => {
    const { container } = renderRoute("/");
    expect(container.firstChild).toHaveClass("Home");
  });
});
