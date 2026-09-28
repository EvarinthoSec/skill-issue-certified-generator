"use client";

import { useState } from "react";
import CertificateCard from "./certificate-card";
import {
  limitCertificateNameInput,
  MAX_CERTIFICATE_NAME_LENGTH,
  normalizeCertificateName,
} from "../lib/certificate";
import {
  buildCertificateSvg,
  downloadCertificatePng,
  downloadCertificateSvg,
} from "../lib/certificate-export";

export default function CertificateGenerator() {
  const [name, setName] = useState("");
  const [exporting, setExporting] = useState<"png" | "svg" | null>(null);
  const displayName = normalizeCertificateName(name);

  async function handleExport(format: "png" | "svg") {
    const svg = buildCertificateSvg(displayName);
    setExporting(format);

    try {
      if (format === "svg") {
        downloadCertificateSvg(svg);
      } else {
        await downloadCertificatePng(svg);
      }
    } finally {
      setExporting(null);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
      <section className="pencil-panel p-6 sm:p-8" aria-labelledby="generator-heading">
        <p className="pencil-label">START HERE</p>
        <h2 id="generator-heading" className="mt-3 text-3xl font-bold sm:text-4xl">
          Add your name, get certified
        </h2>
        <p className="mt-4 max-w-md text-sm leading-7 text-[var(--ink-soft)]">
          Type your name to preview your Skill Issue Certified card instantly.
        </p>

        <div className="mt-8">
          <label className="pencil-label" htmlFor="certificate-name">
            Certified name
          </label>
          <input
            id="certificate-name"
            name="certificate-name"
            value={name}
            onChange={(event) => setName(limitCertificateNameInput(event.target.value))}
            autoComplete="name"
            placeholder="e.g. Ada Lovelace"
            className="pencil-input mt-3 w-full px-4 py-3 text-base"
          />
          <div className="mt-2 flex items-center justify-between gap-4 text-xs text-[var(--ink-soft)]">
            <span>Live preview</span>
            <span>{Array.from(displayName).length}/{MAX_CERTIFICATE_NAME_LENGTH}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setName("")}
          className="pencil-button mt-6 w-full px-4 py-3 text-sm font-bold"
        >
          Clear name
        </button>

        <div className="mt-8 border-t-2 border-dashed border-[var(--ink)]/30 pt-6">
          <p className="pencil-label">EXPORT YOUR CARD</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => void handleExport("png")}
              disabled={exporting !== null}
              className="export-button"
            >
              {exporting === "png" ? "Preparing..." : "Download PNG"}
            </button>
            <button
              type="button"
              onClick={() => void handleExport("svg")}
              disabled={exporting !== null}
              className="export-button export-button-secondary"
            >
              {exporting === "svg" ? "Preparing..." : "Download SVG"}
            </button>
          </div>
          <p className="mt-2 text-xs text-[var(--ink-soft)]">
            PNG for sharing. SVG for editing and printing.
          </p>
        </div>
      </section>

      <div>
        <CertificateCard name={displayName} />
      </div>
    </div>
  );
}
