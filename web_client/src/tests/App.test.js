import { render, screen } from "@testing-library/react";
import App from "../App";
import { MemoryRouter } from "react-router-dom";

describe("App", () => {
  it("should not render any search bar", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    const search = screen.queryByPlaceholderText("Search");
    expect(search).toBeNull();
  });
});
