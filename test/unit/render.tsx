import React from "react";
import { Route, Router, Switch } from "react-router";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import { render as reactRender } from "@testing-library/react";
import { initStore } from "../../src/client/store";
import { MockApi, MockCartApi } from "./api.mock";

import "@testing-library/jest-dom/extend-expect";

import { Home } from "../../src/client/pages/Home";
import { Catalog } from "../../src/client/pages/Catalog";
import { Product } from "../../src/client/pages/Product";
import { Delivery } from "../../src/client/pages/Delivery";
import { Contacts } from "../../src/client/pages/Contacts";
import { Cart } from "../../src/client/pages/Cart";

import { Application } from "../../src/client/Application";

export function render(route: string) {
  const api = new MockApi("hw/store");
  const cart = new MockCartApi();
  const store = initStore(api, cart);

  const history = createMemoryHistory({
    initialEntries: [route || "/"],
    initialIndex: 0,
  });

  return reactRender(
    <Router history={history}>
      <Provider store={store}>
        <Application />
      </Provider>
    </Router>
  );
}

export function renderRoute(path: string) {
  const api = new MockApi("hw/store");
  const cart = new MockCartApi();
  const store = initStore(api, cart);

  const history = createMemoryHistory({
    initialEntries: [path],
    initialIndex: 0,
  });

  return reactRender(
    <Router history={history}>
      <Provider store={store}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/catalog" exact component={Catalog} />
          <Route path="/catalog/:id" component={Product} />
          <Route path="/delivery" component={Delivery} />
          <Route path="/contacts" component={Contacts} />
          <Route path="/cart" component={Cart} />
        </Switch>
      </Provider>
    </Router>
  );
}

export function renderFragment(component: React.ComponentElement<any, any>) {
  const api = new MockApi("/hw/store");
  const cart = new MockCartApi();
  const store = initStore(api, cart);

  const history = createMemoryHistory({
    initialEntries: ["/"],
    initialIndex: 0,
  });

  return reactRender(
    <Router history={history}>
      <Provider store={store}>{component}</Provider>
    </Router>
  );
}
