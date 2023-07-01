import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Details_Albums from "../components/Details_Albums";

describe("Details test", () => {
  it("should render an image modal window", () => {
    const { container } = render(
      <MemoryRouter>
        <Details_Albums />
      </MemoryRouter>
    );
    const detailExpand = container.getElementsByClassName("details");
    expect(detailExpand.length).toBe(1);
  });
});
