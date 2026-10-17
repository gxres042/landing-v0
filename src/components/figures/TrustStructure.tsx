import type { Locale } from '../../i18n';
import translations from '../../data/trust-structure.json';

export default function TrustStructure({ lang = 'zh' }: { lang?: Locale } = {}) {
  const t = translations[lang];
  const ink = 'var(--color-ink, #253326)',
    quiet = 'var(--color-muted, #737373)',
    edge = 'var(--color-muted, #737373)',
    rule = 'var(--color-line, #e5e5e5)',
    bad = 'var(--color-fail, #c44935)';
  const box = (x: number, y: number, w: number, h: number) => (
    <rect x={x} y={y} width={w} height={h} rx="6" fill="none" stroke={edge} strokeWidth="1.25" />
  );
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', fontFamily: 'inherit' }}
      viewBox="0 0 760 476"
      role="img"
      aria-label={t.title}
      fontSize="13"
    >
      <defs>
        <marker
          id="zt-arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0 0L10 5L0 10z" fill={edge} />
        </marker>
      </defs>
      <text x="24" y="30" fontSize="15" fontWeight="600" fill={ink}>
        {t.title}
      </text>
      <line x1="384" y1="52" x2="384" y2="432" stroke={rule} />
      <text x="24" y="68" fontWeight="600" fill={ink}>
        {t.traditional}
      </text>
      <text x="400" y="68" fontWeight="600" fill={ink}>
        {t.zeroTrust}
      </text>
      <g>
        {box(136, 88, 120, 40)}
        <text x="196" y="112" textAnchor="middle" fill={ink}>
          {t.user}
        </text>
      </g>
      <g fill="none" stroke={edge} strokeWidth="1.25">
        <path d="M196 128V164" markerEnd="url(#zt-arrow)" />
        <path d="M196 240V280" markerEnd="url(#zt-arrow)" />
      </g>
      <text x="206" y="150" fontSize="12" fill={quiet}>
        {t.plaintext}
      </text>
      <g>
        <rect
          x="56"
          y="164"
          width="280"
          height="76"
          rx="6"
          fill="none"
          stroke={bad}
          strokeWidth="1.25"
        />
        <circle cx={lang === 'en' ? 160 : 172} cy="184" r="4" fill={bad} />
        <text x="196" y="188" textAnchor="middle" fontWeight="600" fill={ink}>
          {t.platform}
        </text>
        <text x="196" y="208" textAnchor="middle" fontSize="12" fill={ink}>
          {t.holdsSecrets}
        </text>
        <text x="196" y="226" textAnchor="middle" fontSize="12" fill={ink}>
          {t.privileged}
        </text>
      </g>
      <text x="206" y="264" fontSize="12" fill={quiet}>
        {t.credentials}
      </text>
      <g>
        {box(96, 280, 200, 40)}
        <text x="196" y="304" textAnchor="middle" fill={ink}>
          {t.projects}
        </text>
      </g>
      <g>
        <circle cx="28" cy="416" r="4" fill={bad} />
        <text x="40" y="420" fontSize="12" fill={quiet}>
          {t.breach}
        </text>
      </g>
      <g>
        {box(460, 88, 120, 40)}
        <text x="520" y="112" textAnchor="middle" fill={ink}>
          {t.user}
        </text>
      </g>
      <g>
        {box(648, 88, 88, 56)}
        <text x="692" y="112" textAnchor="middle" fontWeight="600" fill={ink}>
          {t.issuer}
        </text>
        <text x="692" y="130" textAnchor="middle" fontSize="12" fill={quiet}>
          {t.issuesOnly}
        </text>
      </g>
      <g fill="none" stroke={edge} strokeWidth="1.25">
        <path d="M520 128V164" markerEnd="url(#zt-arrow)" />
        <path d="M520 220V256" markerEnd="url(#zt-arrow)" />
        <path d="M520 312V348" markerEnd="url(#zt-arrow)" />
      </g>
      <g fill="none" stroke={edge} strokeWidth="1.25" strokeDasharray="4 4">
        <path d="M648 108H580" markerEnd="url(#zt-arrow)" />
        <path d="M692 144V284H610" markerEnd="url(#zt-arrow)" />
      </g>
      <text x="614" y="100" textAnchor="middle" fontSize="12" fill={quiet}>
        {t.issueToken}
      </text>
      <text x="530" y="150" fontSize="12" fill={quiet}>
        {t.userToken}
      </text>
      <g>
        {box(430, 164, 180, 56)}
        <text x="520" y="188" textAnchor="middle" fontWeight="600" fill={ink}>
          {t.engawa}
        </text>
        <text x="520" y="206" textAnchor="middle" fontSize="12" fill={quiet}>
          {t.noPrivileges}
        </text>
      </g>
      <text x="530" y="242" fontSize="12" fill={quiet}>
        {t.forward}
      </text>
      <text x="651" y="276" textAnchor="middle" fontSize="12" fill={quiet}>
        {t.publicKey}
      </text>
      <g>
        {box(430, 256, 180, 56)}
        <rect x="430" y="264" width="3" height="40" fill={ink} />
        <text x="520" y="280" textAnchor="middle" fontWeight="600" fill={ink}>
          {t.apiServer}
        </text>
        <text x="520" y="298" textAnchor="middle" fontSize="12" fill={ink}>
          {t.verify}
        </text>
      </g>
      <text x="530" y="334" fontSize="12" fill={quiet}>
        {t.rbacRead}
      </text>
      <g>
        {box(460, 348, 120, 40)}
        <text x="520" y="372" textAnchor="middle" fill={ink}>
          {t.secret}
        </text>
      </g>
      <text x="400" y="420" fontSize="12" fill={quiet}>
        {t.decision}
      </text>
      <g>
        <line x1="24" y1="452" x2="52" y2="452" stroke={edge} strokeWidth="1.25" />
        <text x="60" y="456" fontSize="11" fill={quiet}>
          {t.direction}
        </text>
        <line
          x1="176"
          y1="452"
          x2="204"
          y2="452"
          stroke={edge}
          strokeWidth="1.25"
          strokeDasharray="4 4"
        />
        <text x="212" y="456" fontSize="11" fill={quiet}>
          {t.offPath}
        </text>
      </g>
    </svg>
  );
}
