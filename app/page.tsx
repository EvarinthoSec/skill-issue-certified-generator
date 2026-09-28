import CertificateGenerator from "@/components/certificate-generator";

export default function Home() {
  return (
    <main className="pencil-page flex-1 px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <header className="pencil-panel mb-6 flex items-center justify-between gap-4 px-5 py-4 sm:px-7">
          <div>
            <p className="pencil-label">KITH-STYLE CERTIFICATE LAB</p>
            <h1 className="mt-2 text-xl font-bold sm:text-2xl">Skill Issue Certified</h1>
          </div>
          <span className="pencil-mark" aria-hidden="true">✎</span>
        </header>

        <section className="pencil-panel mb-8 px-5 py-8 sm:px-8 sm:py-12">
          <p className="pencil-label">A VERY SERIOUS CERTIFICATE</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
            ความเก่งที่ต้องมีชื่อคุณอยู่บนการ์ด
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--ink-soft)] sm:text-lg">
            สร้างการ์ดรับรองสไตล์ลายเส้นดินสอสำหรับคนที่ผ่านทุก skill issue มาได้อย่างภาคภูมิใจ
          </p>
        </section>

        <CertificateGenerator />
      </div>
    </main>
  );
}
