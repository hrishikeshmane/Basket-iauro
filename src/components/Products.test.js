import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Products } from "./Products";

test("on empty selected product list the start subscription is disabled", async () => {
  render(
    <BrowserRouter>
      <Products />
    </BrowserRouter>
  );
  expect(await screen.findByRole('button', { name: /Start Subscription/i })).not.toBeEnabled();
});

