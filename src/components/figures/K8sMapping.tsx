import type { Locale } from '../../i18n';
import translations from '../../data/k8s-mapping.json';

const ink = 'var(--color-ink, #253326)';
const quiet = 'var(--color-muted, #737373)';
const rule = 'var(--color-line, #e5e5e5)';
const surface = 'var(--color-surface, #fafaf9)';
const lime = 'var(--color-lime, #d7f593)';

export default function K8sMapping({ lang = 'zh' }: { lang?: Locale }) {
  const copy = translations[lang];
  const rows = [
    { k8s: 'Namespace', concept: copy.project },
    { k8s: 'Deployment / StatefulSet', concept: copy.service },
    { k8s: 'PersistentVolumeClaim', concept: copy.disk },
    { k8s: 'Service / HTTPRoute', concept: copy.network },
  ];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 760 316"
      role="img"
      aria-label={copy.aria}
      style={{ width: '100%', height: 'auto', fontFamily: 'inherit' }}
    >
      <defs>
        <marker
          id="map-arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="8"
          markerHeight="8"
          orient="auto"
        >
          <path
            d="M0 1 L9 5 L0 9"
            fill="none"
            stroke={ink}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
      </defs>
      <text x="24" y="52" fontSize="13" fill={quiet}>
        {copy.resources}
      </text>
      <text x="436" y="52" fontSize="13" fill={quiet}>
        {copy.concepts}
      </text>
      <text x="380" y="68" fontSize="13" textAnchor="middle" fill={ink}>
        {copy.inference}
      </text>
      <g fontSize="15">
        {rows.map(({ k8s, concept }, i) => {
          const y = 100 + i * 52;
          return (
            <g key={k8s}>
              <rect x="24" y={y} width="300" height="36" rx="8" fill={surface} stroke={rule} />
              <text x="42" y={y + 23} fontFamily="var(--font-mono, monospace)" fill={ink}>
                {k8s}
              </text>
              <line
                x1="326"
                y1={y + 18}
                x2="432"
                y2={y + 18}
                stroke={ink}
                strokeWidth="1.5"
                markerEnd="url(#map-arrow)"
              />
              <rect x="436" y={y} width="300" height="36" rx="8" fill={lime} stroke={ink} />
              <text x="454" y={y + 23} fill={ink}>
                {concept}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
