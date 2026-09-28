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

  it("limits astral Unicode names to 32 code points", () => {
    render(<CertificateGenerator />);
    const input = screen.getByLabelText("ชื่อผู้ได้รับการรับรอง");
    const emojiName = "😀".repeat(33);

    fireEvent.change(input, { target: { value: emojiName } });

    expect(input).toHaveValue("😀".repeat(32));
    expect(screen.getByText("32/32")).toBeInTheDocument();
  });

  it("shows the placeholder and zero count for whitespace-only input", () => {
    render(<CertificateGenerator />);
    const input = screen.getByLabelText("ชื่อผู้ได้รับการรับรอง");

    fireEvent.change(input, { target: { value: "   " } });

    expect(screen.getByText("ใส่ชื่อของคุณ")).toBeInTheDocument();
    expect(screen.getByText("0/32")).toBeInTheDocument();
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
