import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CertificateGenerator from "./certificate-generator";

describe("CertificateGenerator", () => {
  it("shows the empty-name placeholder in the card", () => {
    render(<CertificateGenerator />);

    expect(screen.getByText("ENTER YOUR NAME")).toBeInTheDocument();
  });

  it("renders the typed name live inside the card", () => {
    render(<CertificateGenerator />);
    const input = screen.getByLabelText("Certified name");

    fireEvent.change(input, { target: { value: "  Ada  " } });

    expect(screen.getByText("Ada")).toBeInTheDocument();
  });

  it("preserves spaces while typing a multi-word name", () => {
    render(<CertificateGenerator />);
    const input = screen.getByLabelText("Certified name") as HTMLInputElement;

    for (const character of "Ada Lovelace") {
      fireEvent.change(input, { target: { value: input.value + character } });
    }

    expect(screen.getByTestId("certificate-name")).toHaveTextContent("Ada Lovelace");
  });

  it("limits astral Unicode names to 32 code points", () => {
    render(<CertificateGenerator />);
    const input = screen.getByLabelText("Certified name");
    const emojiName = "😀".repeat(33);

    fireEvent.change(input, { target: { value: emojiName } });

    expect(input).toHaveValue("😀".repeat(32));
    expect(screen.getByText("32/32")).toBeInTheDocument();
  });

  it("shows the placeholder and zero count for whitespace-only input", () => {
    render(<CertificateGenerator />);
    const input = screen.getByLabelText("Certified name");

    fireEvent.change(input, { target: { value: "   " } });

    expect(screen.getByText("ENTER YOUR NAME")).toBeInTheDocument();
    expect(screen.getByText("0/32")).toBeInTheDocument();
  });

  it("clears the name when reset is pressed", () => {
    render(<CertificateGenerator />);
    const input = screen.getByLabelText("Certified name");

    fireEvent.change(input, { target: { value: "Ada" } });
    fireEvent.click(screen.getByRole("button", { name: "Clear name" }));

    expect(input).toHaveValue("");
    expect(screen.getByText("ENTER YOUR NAME")).toBeInTheDocument();
  });
});
