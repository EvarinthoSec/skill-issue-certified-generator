"use client";

import { useState } from "react";
import CertificateCard from "./certificate-card";
import { normalizeCertificateName } from "../lib/certificate";

export default function CertificateGenerator() {
  const [name, setName] = useState("");
  const displayName = normalizeCertificateName(name);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
      <section className="pencil-panel p-6 sm:p-8" aria-labelledby="generator-heading">
        <p className="pencil-label">START HERE</p>
        <h2 id="generator-heading" className="mt-3 text-3xl font-bold sm:text-4xl">
          ใส่ชื่อ แล้วรับใบรับรอง
        </h2>
        <p className="mt-4 max-w-md text-sm leading-7 text-[var(--ink-soft)]">
          พิมพ์ชื่อของคุณเพื่อดูตัวอย่างการ์ด Skill Issue Certified แบบลายเส้นดินสอทันที
        </p>

        <div className="mt-8">
          <label className="pencil-label" htmlFor="certificate-name">
            ชื่อผู้ได้รับการรับรอง
          </label>
          <input
            id="certificate-name"
            name="certificate-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={32}
            autoComplete="name"
            placeholder="เช่น อานนท์ ใจดี"
            className="pencil-input mt-3 w-full px-4 py-3 text-base"
          />
          <div className="mt-2 flex items-center justify-between gap-4 text-xs text-[var(--ink-soft)]">
            <span>แสดงผลแบบเรียลไทม์</span>
            <span>{displayName.length}/32</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setName("")}
          className="pencil-button mt-6 w-full px-4 py-3 text-sm font-bold"
        >
          ล้างชื่อ
        </button>
      </section>

      <div>
        <CertificateCard name={displayName} />
      </div>
    </div>
  );
}
