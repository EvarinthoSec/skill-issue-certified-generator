import { certificateCopy } from "./certificate-copy";

const CERTIFICATE_WIDTH = 1200;
const CERTIFICATE_HEIGHT = 760;

function escapeXml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&apos;",
      '"': "&quot;",
    };

    return entities[character];
  });
}

export function buildCertificateSvg(name: string): string {
  const displayName = name.trim() || certificateCopy.emptyName;
  const safeName = escapeXml(displayName);
  const safeDescription = escapeXml(`${certificateCopy.title} ${certificateCopy.certified} card for ${displayName}`);
  const nameFontSize = Array.from(displayName).length > 18 ? 48 : 76;
  const nameFit = Array.from(displayName).length > 14 ? ' textLength="860" lengthAdjust="spacingAndGlyphs"' : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${CERTIFICATE_WIDTH}" height="${CERTIFICATE_HEIGHT}" viewBox="0 0 ${CERTIFICATE_WIDTH} ${CERTIFICATE_HEIGHT}" role="img" aria-labelledby="title description">
  <title id="title">${escapeXml(certificateCopy.title)} ${escapeXml(certificateCopy.certified)}</title>
  <desc id="description">${safeDescription}</desc>
  <defs>
    <pattern id="scanlines" width="12" height="12" patternUnits="userSpaceOnUse">
      <path d="M0 1H12" stroke="#25231f" stroke-opacity=".08" stroke-width="1"/>
      <circle cx="3" cy="8" r=".8" fill="#ff4d3d" opacity=".1"/>
    </pattern>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="12" dy="14" stdDeviation="0" flood-color="#050505" flood-opacity=".35"/>
    </filter>
  </defs>
  <rect width="${CERTIFICATE_WIDTH}" height="${CERTIFICATE_HEIGHT}" rx="34" fill="#fffdf7" filter="url(#shadow)"/>
  <rect x="18" y="18" width="1164" height="724" rx="24" fill="url(#scanlines)"/>
  <rect x="28" y="28" width="1144" height="704" rx="22" fill="none" stroke="#25231f" stroke-width="3"/>
  <path d="M72 126 L1128 126" stroke="#25231f" stroke-width="2" opacity=".25"/>
  <path d="M72 632 L1128 632" stroke="#25231f" stroke-width="2" opacity=".25"/>
  <path d="M72 126 L72 158 M1128 126 L1128 158 M72 600 L72 632 M1128 600 L1128 632" stroke="#ff4d3d" stroke-width="5"/>
  <text x="78" y="92" fill="#25231f" font-family="Arial, sans-serif" font-size="22" font-weight="900" letter-spacing="5">SKILL ISSUE / 2026</text>
  <text x="78" y="226" fill="#25231f" font-family="Arial, sans-serif" font-size="82" font-weight="950" letter-spacing="-4">${escapeXml(certificateCopy.title)}</text>
  <text x="78" y="306" fill="#ff4d3d" font-family="Arial, sans-serif" font-size="82" font-weight="950" letter-spacing="-4">${escapeXml(certificateCopy.certified)}</text>
  <rect x="82" y="338" width="300" height="42" rx="5" fill="#ff4d3d"/>
  <text x="232" y="366" text-anchor="middle" fill="#25231f" font-family="Arial, sans-serif" font-size="17" font-weight="900" letter-spacing="1">${escapeXml(certificateCopy.stamp)}</text>
  <g transform="translate(1018 206)">
    <circle r="82" fill="#ff4d3d" stroke="#25231f" stroke-width="3"/>
    <circle r="66" fill="none" stroke="#25231f" stroke-width="3" stroke-dasharray="4 9"/>
    <text y="6" text-anchor="middle" fill="#25231f" font-family="Arial, sans-serif" font-size="48" font-weight="950">★</text>
    <text y="42" text-anchor="middle" fill="#25231f" font-family="Arial, sans-serif" font-size="14" font-weight="900" letter-spacing="2">${escapeXml(certificateCopy.approved)}</text>
  </g>
  <text x="600" y="438" text-anchor="middle" fill="#aaa49a" font-family="Arial, sans-serif" font-size="18" font-weight="900" letter-spacing="5">${escapeXml(certificateCopy.belongsTo)}</text>
  <text x="600" y="542" text-anchor="middle" fill="#25231f" font-family="Segoe Print, Bradley Hand, Comic Sans MS, sans-serif" font-size="${nameFontSize}" font-weight="800"${nameFit}>${safeName}</text>
  <path d="M260 576 C430 590 770 590 940 576" fill="none" stroke="#ff4d3d" stroke-width="4" stroke-linecap="round"/>
  <text x="78" y="680" fill="#aaa49a" font-family="Arial, sans-serif" font-size="15" font-weight="800" letter-spacing="2">${escapeXml(certificateCopy.certificateNo)}</text>
  <text x="1122" y="680" text-anchor="end" fill="#aaa49a" font-family="Segoe Print, Bradley Hand, Comic Sans MS, sans-serif" font-size="21" font-weight="800">${escapeXml(certificateCopy.committee)}</text>
  <text x="600" y="715" text-anchor="middle" fill="#6f6a62" font-family="Arial, sans-serif" font-size="12" font-weight="700" letter-spacing="1">${escapeXml(certificateCopy.generatedBy)}</text>
</svg>`;
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function downloadCertificateSvg(svg: string, filename = "skill-issue-certified.svg"): void {
  downloadBlob(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }), filename);
}

export async function downloadCertificatePng(
  svg: string,
  filename = "skill-issue-certified.png",
): Promise<void> {
  const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const imageUrl = URL.createObjectURL(svgBlob);

  try {
    const image = new Image();
    image.src = imageUrl;
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("Unable to render the certificate image."));
    });

    const canvas = document.createElement("canvas");
    canvas.width = CERTIFICATE_WIDTH;
    canvas.height = CERTIFICATE_HEIGHT;
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Canvas export is not supported in this browser.");
    }

    context.fillStyle = "#111214";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    const pngBlob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Unable to encode the certificate as PNG."));
      }, "image/png");
    });

    downloadBlob(pngBlob, filename);
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
}
