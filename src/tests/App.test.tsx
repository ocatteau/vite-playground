import App from "../../src/App";
import { render, screen } from "@testing-library/react";

describe("App tests", () => {
  it("should render the title", () => {
    render(<App/>);

    expect(screen.getByRole("heading")).toHaveTextContent("App");
  });
});