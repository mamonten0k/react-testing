import React from "react";
import { it } from "@jest/globals";
import { renderRoute, renderFragment } from "../render";

import { Contacts } from "../../../src/client/pages/Contacts";

describe("<Contacts>", () => {
  it("Представляет собой статичный контент", () => {
    const { asFragment } = renderFragment(<Contacts />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("По умолчанию присвоен роут /contacts", () => {
    const { container } = renderRoute("/contacts");
    expect(container.firstChild).toHaveClass("Contacts");
  });
});
