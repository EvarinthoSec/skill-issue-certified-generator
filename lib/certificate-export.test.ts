import { describe, expect, it } from "vitest";
import { buildCertificateSvg } from "./certificate-export";

describe("buildCertificateSvg", () => {
  it("includes the normalized display name in the export", () => {
    const svg = buildCertificateSvg("  Ada Lovelace  ");

    expect(svg).toContain("Ada Lovelace");
    expect(svg).toContain("SKILL ISSUE");
    expect(svg).toContain("CERTIFIED");
  });

  it("escapes user content before putting it into SVG markup", () => {
    const svg = buildCertificateSvg("<Ada & Grace>");

    expect(svg).toContain("&lt;Ada &amp; Grace&gt;");
    expect(svg).not.toContain("<Ada & Grace>");
  });

  it("uses the English empty state", () => {
    expect(buildCertificateSvg("   ")).toContain("ENTER YOUR NAME");
  });
});
