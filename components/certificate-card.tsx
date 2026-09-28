type CertificateCardProps = {
  name: string;
};

export default function CertificateCard({ name }: CertificateCardProps) {
  const displayName = name || "ใส่ชื่อของคุณ";

  return (
    <article
      aria-label="ตัวอย่างการ์ด Skill Issue Certified"
      className="pencil-card relative overflow-hidden p-7 sm:p-10"
    >
      <div className="relative z-10 flex min-h-[360px] flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="pencil-label">SKILL ISSUE / 2026</p>
            <p className="mt-2 text-sm text-[var(--ink-soft)]">ใบรับรองความเก่งแบบไม่เป็นทางการ</p>
          </div>
          <div className="pencil-seal" aria-hidden="true">★</div>
        </div>

        <div className="py-10 text-center">
          <p className="pencil-kicker">THIS CARD BELONGS TO</p>
          <p className="pencil-name" data-testid="certificate-name">
            {displayName}
          </p>
          <div className="mx-auto mt-4 h-px w-40 bg-[var(--ink)] opacity-60" />
        </div>

        <div className="flex items-end justify-between gap-4 text-xs text-[var(--ink-soft)]">
          <span>certified by the pencil committee</span>
          <span aria-hidden="true">✎</span>
        </div>
      </div>
    </article>
  );
}
