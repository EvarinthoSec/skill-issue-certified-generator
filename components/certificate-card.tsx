import { certificateCopy } from "../lib/certificate-copy";

type CertificateCardProps = {
  name: string;
};

export default function CertificateCard({ name }: CertificateCardProps) {
  const displayName = name || certificateCopy.emptyName;

  return (
    <article
      aria-label={certificateCopy.ariaLabel}
      className="pencil-card relative overflow-hidden p-7 text-[var(--card-ink)] sm:p-10"
    >
      <div className="relative z-10 flex min-h-[360px] flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="certificate-overline">SKILL ISSUE / 2026</p>
            <h3 className="certificate-title">{certificateCopy.title}</h3>
            <h3 className="certificate-title certificate-title-accent">{certificateCopy.certified}</h3>
            <p className="certificate-subtitle">{certificateCopy.subtitle}</p>
          </div>
          <div className="pencil-seal" aria-hidden="true">★</div>
        </div>

        <div className="py-10 text-center">
          <p className="certificate-kicker">{certificateCopy.belongsTo}</p>
          <p className="pencil-name" data-testid="certificate-name">
            {displayName}
          </p>
          <div className="certificate-rule mx-auto mt-4 h-px w-40" />
        </div>

        <div className="certificate-footer">
          <span>{certificateCopy.certificateNo}</span>
          <span className="certificate-signature">{certificateCopy.committee}</span>
        </div>
        <p className="certificate-generated">{certificateCopy.generatedBy}</p>
      </div>
    </article>
  );
}
