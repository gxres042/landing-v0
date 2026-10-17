import type { Locale } from '../../i18n';
import translations from '../../data/hotel-keycard.json';

export default function HotelKeycard({ lang = 'zh' }: { lang?: Locale } = {}) {
  const t = translations[lang];
  const ink = 'var(--color-ink, #253326)',
    quiet = 'var(--color-muted, #737373)',
    edge = 'var(--color-muted, #737373)',
    rule = 'var(--color-line, #e5e5e5)',
    bad = 'var(--color-fail, #c44935)';
  const pUser =
      'M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z',
    pBell =
      'M24,184H232a8,8,0,0,0,0-16h-8V152a96.12,96.12,0,0,0-88-95.66V40h16a8,8,0,0,0,0-16H104a8,8,0,0,0,0,16h16V56.34A96.12,96.12,0,0,0,32,152v16H24a8,8,0,0,0,0,16Zm24-32a80,80,0,0,1,160,0v16H48Zm192,56a8,8,0,0,1-8,8H24a8,8,0,0,1,0-16H232A8,8,0,0,1,240,208Z',
    pCard =
      'M200,112a8,8,0,0,1-8,8H152a8,8,0,0,1,0-16h40A8,8,0,0,1,200,112Zm-8,24H152a8,8,0,0,0,0,16h40a8,8,0,0,0,0-16Zm40-80V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56ZM216,200V56H40V200H216Zm-80.26-34a8,8,0,1,1-15.5,4c-2.63-10.26-13.06-18-24.25-18s-21.61,7.74-24.25,18a8,8,0,1,1-15.5-4,39.84,39.84,0,0,1,17.19-23.34,32,32,0,1,1,45.12,0A39.76,39.76,0,0,1,135.75,166ZM96,136a16,16,0,1,0-16-16A16,16,0,0,0,96,136Z',
    pBag =
      'M104,88v96a8,8,0,0,1-16,0V88a8,8,0,0,1,16,0Zm24-8a8,8,0,0,0-8,8v96a8,8,0,0,0,16,0V88A8,8,0,0,0,128,80Zm32,0a8,8,0,0,0-8,8v96a8,8,0,0,0,16,0V88A8,8,0,0,0,160,80Zm48-16V208a16,16,0,0,1-16,16H176v16a8,8,0,0,1-16,0V224H96v16a8,8,0,0,1-16,0V224H64a16,16,0,0,1-16-16V64A16,16,0,0,1,64,48H88V24A24,24,0,0,1,112,0h32a24,24,0,0,1,24,24V48h24A16,16,0,0,1,208,64ZM104,48h48V24a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8Zm88,160V64H64V208H192Z',
    pLock =
      'M128,112a28,28,0,0,0-8,54.83V184a8,8,0,0,0,16,0V166.83A28,28,0,0,0,128,112Zm0,40a12,12,0,1,1,12-12A12,12,0,0,1,128,152Zm80-72H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Z',
    pDoor =
      'M232,216H208V40a16,16,0,0,0-16-16H64A16,16,0,0,0,48,40V216H24a8,8,0,0,0,0,16H232a8,8,0,0,0,0-16ZM64,40H192V216H64Zm104,92a12,12,0,1,1-12-12A12,12,0,0,1,168,132Z',
    pBox =
      'M224,64H176V56a24,24,0,0,0-24-24H104A24,24,0,0,0,80,56v8H32A16,16,0,0,0,16,80V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V80A16,16,0,0,0,224,64ZM96,56a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM224,80v32H192v-8a8,8,0,0,0-16,0v8H80v-8a8,8,0,0,0-16,0v8H32V80Zm0,112H32V128H64v8a8,8,0,0,0,16,0v-8h96v8a8,8,0,0,0,16,0v-8h32v64Z',
    pKey =
      'M216.57,39.43A80,80,0,0,0,83.91,120.78L28.69,176A15.86,15.86,0,0,0,24,187.31V216a16,16,0,0,0,16,16H72a8,8,0,0,0,8-8V208H96a8,8,0,0,0,8-8V184h16a8,8,0,0,0,5.66-2.34l9.56-9.57A79.73,79.73,0,0,0,160,176h.1A80,80,0,0,0,216.57,39.43ZM224,98.1c-1.09,34.09-29.75,61.86-63.89,61.9H160a63.7,63.7,0,0,1-23.65-4.51,8,8,0,0,0-8.84,1.68L116.69,168H96a8,8,0,0,0-8,8v16H72a8,8,0,0,0-8,8v16H40V187.31l58.83-58.82a8,8,0,0,0,1.68-8.84A63.72,63.72,0,0,1,96,95.92c0-34.14,27.81-62.8,61.9-63.89A64,64,0,0,1,224,98.1ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z',
    pFinger =
      'M72,128a134.63,134.63,0,0,1-14.16,60.47,8,8,0,1,1-14.32-7.12A118.8,118.8,0,0,0,56,128,71.73,71.73,0,0,1,83,71.8,8,8,0,1,1,93,84.29,55.76,55.76,0,0,0,72,128Zm56-8a8,8,0,0,0-8,8,184.12,184.12,0,0,1-23,89.1,8,8,0,0,0,14,7.76A200.19,200.19,0,0,0,136,128,8,8,0,0,0,128,120Zm0-32a40,40,0,0,0-40,40,8,8,0,0,0,16,0,24,24,0,0,1,48,0,214.09,214.09,0,0,1-20.51,92A8,8,0,1,0,146,226.83,230,230,0,0,0,168,128,40,40,0,0,0,128,88Zm0-64A104.11,104.11,0,0,0,24,128a87.76,87.76,0,0,1-5,29.33,8,8,0,0,0,15.09,5.33A103.9,103.9,0,0,0,40,128a88,88,0,0,1,176,0,282.24,282.24,0,0,1-5.29,54.45,8,8,0,0,0,6.3,9.4,8.22,8.22,0,0,0,1.55.15,8,8,0,0,0,7.84-6.45A298.37,298.37,0,0,0,232,128,104.12,104.12,0,0,0,128,24ZM94.4,152.17A8,8,0,0,0,85,158.42a151,151,0,0,1-17.21,45.44,8,8,0,0,0,13.86,8,166.67,166.67,0,0,0,19-50.25A8,8,0,0,0,94.4,152.17ZM128,56a72.85,72.85,0,0,0-9,.56,8,8,0,0,0,2,15.87A56.08,56.08,0,0,1,184,128a252.12,252.12,0,0,1-1.92,31A8,8,0,0,0,189,168a8.39,8.39,0,0,0,1,.06,8,8,0,0,0,7.92-7,266.48,266.48,0,0,0,2-33A72.08,72.08,0,0,0,128,56Zm57.93,128.25a8,8,0,0,0-9.75,5.75c-1.46,5.69-3.15,11.4-5,17a8,8,0,0,0,5,10.13,7.88,7.88,0,0,0,2.55.42,8,8,0,0,0,7.58-5.46c2-5.92,3.79-12,5.35-18.05A8,8,0,0,0,185.94,184.26Z';
  const icon = (d: string, x: number, y: number, s: number, c: string) => (
    <path d={d} transform={`translate(${x} ${y}) scale(${s / 256})`} fill={c} />
  );
  const box = (x: number, y: number, w: number, h: number) => (
    <rect x={x} y={y} width={w} height={h} rx="6" fill="none" stroke={edge} strokeWidth="1.25" />
  );
  const W = 136,
    yA = 84,
    hA = 108,
    yB = 248;
  const c1 = 92,
    c2 = 284,
    c3 = 476,
    c4 = 668;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', fontFamily: 'inherit' }}
      viewBox="0 0 760 540"
      role="img"
      aria-label={t.title}
      fontSize="13"
    >
      <defs>
        <marker
          id="card-arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0 0L10 5L0 10z" fill={edge} />
        </marker>
        <marker
          id="card-arrow-bad"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0 0L10 5L0 10z" fill={bad} />
        </marker>
      </defs>
      <text x="24" y="30" fontSize="15" fontWeight="600" fill={ink}>
        {t.title}
      </text>
      <g fill="none" stroke={edge} strokeWidth="1.25" strokeDasharray="4 4">
        <path d={`M${c2} ${yA}V64H${c4}V${yA}`} markerEnd="url(#card-arrow)" />
      </g>
      <text x={c3} y="56" textAnchor="middle" fontSize="12" fill={quiet}>
        {t.publicKey}
      </text>
      <g>
        {box(24, yA, W, hA)}
        {icon(pUser, c1 - 12, 96, 24, ink)}
        <text x={c1} y="142" textAnchor="middle" fontWeight="600" fill={ink}>
          {t.guest}
        </text>
        <text x={c1} y="160" textAnchor="middle" fontSize="12" fill={quiet}>
          {t.user}
        </text>
        <text x={c1} y="178" textAnchor="middle" fontSize="12" fill={ink}>
          {t.hasPasskey}
        </text>
      </g>
      <g>
        {box(216, yA, W, hA)}
        {icon(pBell, c2 - 12, 96, 24, ink)}
        <text x={c2} y="142" textAnchor="middle" fontWeight="600" fill={ink}>
          {t.frontDesk}
        </text>
        <text x={c2} y="160" textAnchor="middle" fontSize="12" fill={quiet}>
          {t.issuer}
        </text>
        <text x={c2} y="178" textAnchor="middle" fontSize="12" fill={ink}>
          {t.issueCard}
        </text>
      </g>
      <g>
        {box(408, yA, W, hA)}
        {icon(pBag, c3 - 12, 96, 24, ink)}
        <text x={c3} y="142" textAnchor="middle" fontWeight="600" fill={ink}>
          {t.bellhop}
        </text>
        <text x={c3} y="160" textAnchor="middle" fontSize="12" fill={quiet}>
          {t.platform}
        </text>
        <text x={c3} y="178" textAnchor="middle" fontSize="12" fill={ink}>
          {t.carryCard}
        </text>
      </g>
      <g>
        {box(600, yA, W, hA)}
        <rect x="600" y="92" width="3" height="92" fill={ink} />
        {icon(pLock, c4 - 12, 96, 24, ink)}
        <text x={c4} y="142" textAnchor="middle" fontWeight="600" fill={ink}>
          {t.doorLock}
        </text>
        <text x={c4} y="160" textAnchor="middle" fontSize="12" fill={quiet}>
          {t.apiServer}
        </text>
        <text x={c4} y="178" textAnchor="middle" fontSize="12" fill={ink}>
          {t.verify}
        </text>
      </g>
      <g fill="none" stroke={edge} strokeWidth="1.25">
        <path d="M160 138H216" markerEnd="url(#card-arrow)" />
        <path d="M352 138H408" markerEnd="url(#card-arrow)" />
        <path d="M544 138H600" markerEnd="url(#card-arrow)" />
        <path d={`M${c4} 192V${yB}`} markerEnd="url(#card-arrow)" />
      </g>
      {icon(pFinger, 178, 106, 20, ink)}
      <text x="188" y="158" textAnchor="middle" fontSize="12" fill={quiet}>
        {t.passkey}
      </text>
      <text x="380" y="128" textAnchor="middle" fontSize="12" fill={quiet}>
        {t.keycard}
      </text>
      <text x="572" y="128" textAnchor="middle" fontSize="12" fill={quiet}>
        {t.present}
      </text>
      <text x="676" y="226" fontSize="12" fill={quiet}>
        {t.allow}
      </text>
      <g>
        <path
          d={`M624 192V212H${c3}V${yB}`}
          fill="none"
          stroke={bad}
          strokeWidth="1.25"
          markerEnd="url(#card-arrow-bad)"
        />
        <circle cx="490" cy="232" r="4" fill={bad} />
        <text x="500" y="236" fontSize="12" fill={ink}>
          {t.forbidden}
        </text>
      </g>
      <g>
        {box(600, yB, W, 84)}
        {icon(pDoor, c4 - 12, 260, 24, ink)}
        <text x={c4} y="304" textAnchor="middle" fontWeight="600" fill={ink}>
          {t.room}
        </text>
        <text x={c4} y="322" textAnchor="middle" fontSize="12" fill={quiet}>
          {t.resources}
        </text>
      </g>
      <g>
        {box(408, yB, W, 84)}
        {icon(pBox, c3 - 12, 260, 24, ink)}
        <text x={c3} y="304" textAnchor="middle" fontWeight="600" fill={ink}>
          {t.supplyRoom}
        </text>
        <text x={c3} y="322" textAnchor="middle" fontSize="12" fill={quiet}>
          {t.clusterOps}
        </text>
        <text x="408" y="356" fontSize="12" fill={ink}>
          {t.touchAgain}
        </text>
        <text x="408" y="374" fontSize="12" fill={ink}>
          {t.adminRequired}
        </text>
      </g>
      <path d={`M380 138V274H352`} fill="none" stroke={rule} strokeWidth="1.25" />
      <g>
        {box(24, yB, 328, 212)}
        <text x="40" y="274" fontWeight="600" fill={ink}>
          {t.token}
        </text>
        <text x="40" y="294" fontSize="12" fill={quiet}>
          {t.identity}
        </text>
        <rect
          x="40"
          y="308"
          width="296"
          height="56"
          rx="6"
          fill="none"
          stroke={rule}
          strokeWidth="1.25"
        />
        {icon(pCard, 52, 320, 24, ink)}
        <text x="88" y="332" fontWeight="600" fill={ink}>
          {t.normalCard}
        </text>
        <text x="88" y="350" fontSize="12" fill={ink}>
          {t.normalLifetime}
        </text>
        <rect
          x="40"
          y="376"
          width="296"
          height="76"
          rx="6"
          fill="none"
          stroke={rule}
          strokeWidth="1.25"
        />
        {icon(pCard, 52, 388, 24, ink)}
        <text x="88" y="400" fontWeight="600" fill={ink}>
          {t.adminCard}
        </text>
        <text x="88" y="418" fontSize="12" fill={ink}>
          {t.adminLifetime}
        </text>
        <text x="88" y="436" fontSize="12" fontFamily="ui-monospace, monospace" fill={quiet}>
          {t.elevatedGroup}
        </text>
      </g>
      <line x1="24" y1="492" x2="736" y2="492" stroke={rule} />
      <g>
        {icon(pKey, 24, 504, 20, bad)}
        <text x="52" y="519" fill={ink}>
          {t.contrast}
        </text>
      </g>
    </svg>
  );
}
