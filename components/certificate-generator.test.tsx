import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CertificateGenerator from "./certificate-generator";

describe("CertificateGenerator", () => {
  it("shows the empty-name placeholder in the card", () => {
    render(<CertificateGenerator />);

    expect(screen.getByText("ใส่ชื่อของคุณ")).toBeInTheDocument();
  });

  it("renders the typed name live inside the card", () => {
    render(<CertificateGenerator />);
    const input = screen.getByLabelText("ชื่อผู้ได้รับการรับรอง");

    fireEvent.change(input, { target: { value: "  อานนท์  " } });

    expect(screen.getByText("อานนท์")).toBeInTheDocument();
  });

  it("clears the name when reset is pressed", () => {
    render(<CertificateGenerator />);
    const input = screen.getByLabelText("ชื่อผู้ได้รับการรับรอง");

    fireEvent.change(input, { target: { value: "Ada" } });
    fireEvent.click(screen.getByRole("button", { name: "ล้างชื่อ" }));

    expect(input).toHaveValue("");
    expect(screen.getByText("ใส่ชื่อของคุณ")).toBeInTheDocument();
  });
});
