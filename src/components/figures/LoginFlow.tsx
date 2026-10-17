import type { Locale } from '../../i18n';
import translations from '../../data/login-flow.json';

export default function LoginFlow({ lang = 'zh' }: { lang?: Locale }) {
  const copy = translations[lang];
  const ink = 'var(--color-ink, #253326)',
    quiet = 'var(--color-muted, #737373)',
    edge = 'var(--color-muted, #737373)',
    rule = 'var(--color-line, #e5e5e5)';
  const xB = 68,
    xE = 180,
    xG = 292,
    xK = 420;
  const head = (cx: number, w: number) => (
    <rect
      x={cx - w / 2}
      y="52"
      width={w}
      height="36"
      rx="6"
      fill="none"
      stroke={edge}
      strokeWidth="1.25"
    />
  );
  const msg = (x1: number, x2: number, y: number, dashed: boolean) => (
    <path
      d={`M${x1} ${y}H${x2}`}
      fill="none"
      stroke={edge}
      strokeWidth="1.25"
      strokeDasharray={dashed ? '4 4' : 'none'}
      markerEnd="url(#seq-arrow)"
    />
  );
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', fontFamily: 'inherit' }}
      viewBox="0 0 760 524"
      role="img"
      aria-label={copy.title}
      fontSize="13"
    >
      <defs>
        <marker
          id="seq-arrow"
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
      <text x="16" y="30" fontSize="15" fontWeight="600" fill={ink}>
        {copy.title}
      </text>
      <g stroke={rule} strokeWidth="1">
        <line x1="16" x2="744" y1="180" y2="180" />
        <line x1="16" x2="744" y1="260" y2="260" />
        <line x1="16" x2="744" y1="340" y2="340" />
        <line x1="16" x2="744" y1="400" y2="400" />
      </g>
      <g stroke={rule} strokeWidth="1.25">
        <line x1={xB} x2={xB} y1="88" y2="476" />
        <line x1={xE} x2={xE} y1="88" y2="476" />
        <line x1={xG} x2={xG} y1="88" y2="476" />
        <line x1={xK} x2={xK} y1="88" y2="476" />
      </g>
      <g>
        {head(xB, 104)}
        <text x={xB} y="74" textAnchor="middle" fontWeight="600" fill={ink}>
          {copy.browser}
        </text>
      </g>
      <g>
        {head(xE, 104)}
        <text x={xE} y="74" textAnchor="middle" fontWeight="600" fill={ink}>
          engawa
        </text>
      </g>
      <g>
        {head(xG, 104)}
        <text x={xG} y="74" textAnchor="middle" fontWeight="600" fill={ink}>
          Genkan
        </text>
      </g>
      <g>
        {head(xK, 120)}
        <rect x="360" y="58" width="3" height="24" fill={ink} />
        <text x={xK} y="74" textAnchor="middle" fontWeight="600" fill={ink}>
          kube-apiserver
        </text>
      </g>
      <g>
        {msg(xB, xE, 124, true)}
        {msg(xE, xB, 156, true)}
        {msg(xB, xG, 204, true)}
        {msg(xG, xE, 236, true)}
        {msg(xE, xG, 284, true)}
        {msg(xG, xE, 316, true)}
        {msg(xE, xB, 364, true)}
        {msg(xE, xK, 428, false)}
        {msg(xK, xE, 460, false)}
      </g>
      <text x="124" y="116" textAnchor="middle" fontSize="12" fill={quiet}>
        {copy.open}
      </text>
      <text x="124" y="148" textAnchor="middle" fontSize="12" fill={quiet}>
        {copy.redirect}
      </text>
      <text x="124" y="196" textAnchor="middle" fontSize="12" fill={quiet}>
        {copy.login}
      </text>
      <text x="236" y="228" textAnchor="middle" fontSize="12" fill={quiet}>
        {copy.code}
      </text>
      <text x="236" y="276" textAnchor="middle" fontSize="12" fill={quiet}>
        {copy.codeVerifier}
      </text>
      <text x="236" y="308" textAnchor="middle" fontSize="12" fill={quiet}>
        {copy.token}
      </text>
      <text x="124" y="356" textAnchor="middle" fontSize="12" fill={quiet}>
        {copy.sessionCookie}
      </text>
      <text x="236" y="420" textAnchor="middle" fontSize="12" fill={ink}>
        {copy.userToken}
      </text>
      <text x="236" y="452" textAnchor="middle" fontSize="12" fill={ink}>
        {copy.rbac}
      </text>
      <g>
        <text x="504" y="128" fontSize="12" fontWeight="600" fill={quiet}>
          1
        </text>
        <text x="520" y="128" fontSize="12" fill={ink}>
          {copy.note1a}
        </text>
        <text x="520" y="144" fontSize="12" fill={ink}>
          {copy.note1b}
        </text>
      </g>
      <g>
        <text x="504" y="208" fontSize="12" fontWeight="600" fill={quiet}>
          2
        </text>
        <text x="520" y="208" fontSize="12" fill={ink}>
          {copy.note2a}
        </text>
        <text x="520" y="224" fontSize="12" fill={ink}>
          {copy.note2b}
        </text>
      </g>
      <g>
        <text x="504" y="288" fontSize="12" fontWeight="600" fill={quiet}>
          3
        </text>
        <text x="520" y="288" fontSize="12" fill={ink}>
          {copy.note3a}
        </text>
        <text x="520" y="304" fontSize="12" fill={ink}>
          {copy.note3b}
        </text>
        <text x="520" y="320" fontSize="12" fill={ink}>
          {copy.note3c}
        </text>
      </g>
      <g>
        <text x="504" y="368" fontSize="12" fontWeight="600" fill={quiet}>
          4
        </text>
        <text x="520" y="368" fontSize="12" fill={ink}>
          {copy.note4a}
        </text>
        <text x="520" y="384" fontSize="12" fill={ink}>
          {copy.note4b}
        </text>
      </g>
      <g>
        <text x="504" y="432" fontSize="12" fontWeight="600" fill={quiet}>
          5
        </text>
        <text x="520" y="432" fontSize="12" fill={ink}>
          {copy.note5a}
        </text>
        <text x="520" y="448" fontSize="12" fill={ink}>
          {copy.note5b}
        </text>
        <text x="520" y="464" fontSize="12" fill={ink}>
          {copy.note5c}
        </text>
      </g>
      <g>
        <line x1="16" y1="500" x2="44" y2="500" stroke={edge} strokeWidth="1.25" />
        <text x="52" y="504" fontSize="11" fill={quiet}>
          {copy.tokenLegend}
        </text>
        <line
          x1="208"
          y1="500"
          x2="236"
          y2="500"
          stroke={edge}
          strokeWidth="1.25"
          strokeDasharray="4 4"
        />
        <text x="244" y="504" fontSize="11" fill={quiet}>
          {copy.loginLegend}
        </text>
      </g>
    </svg>
  );
}
