import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
  focusable: false,
};

export function ArchitectureIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 20h18" />
      <path d="M5.5 20V9.2L12 4l6.5 5.2V20" />
      <path d="M9.5 20v-5.5h5V20" />
      <path d="M12 4v3.2" />
    </svg>
  );
}

export function EnergyIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M13.2 3 6 13.4h4.6L10 21l7.4-10.6h-4.7L13.2 3Z" />
    </svg>
  );
}

export function StructureIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 4h16v16H4z" />
      <path d="M4 9.3h16M4 14.7h16M9.3 4v16M14.7 4v16" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 12h15" />
      <path d="m13.5 6 6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17 17 7" />
      <path d="M8.5 7H17v8.5" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="11" r="6.4" />
      <path d="m15.8 15.8 4 4" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 8h16M4 16h16" />
    </svg>
  );
}

export function ExpandIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 4H4v5M15 20h5v-5M20 9V4h-5M4 15v5h5" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m6 9.5 6 6 6-6" />
    </svg>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
    </svg>
  );
}

export function CarbonIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17.5c-2.4 0-4-1.6-4-3.9 0-2.2 1.6-3.9 3.9-3.9.5-2.4 2.6-4.2 5.2-4.2 2.9 0 5.2 2.3 5.2 5.2 0 .4 0 .7-.1 1 1.6.4 2.8 1.8 2.8 3.6 0 2-1.6 3.6-3.6 3.6H7Z" />
    </svg>
  );
}

export function ScoreIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 16a8 8 0 1 1 16 0" />
      <path d="m12 16 4.2-5" />
      <path d="M4 19.5h16" />
    </svg>
  );
}

export function LeafIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 19c0-7 5-12 14-13 .6 8-4.4 13-11 13H5Z" />
      <path d="M5 19c2.6-3.6 5.6-6 9-7.6" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17 7h.01" />
    </svg>
  );
}

export const disciplineIcons = {
  architecture: ArchitectureIcon,
  energy: EnergyIcon,
  structure: StructureIcon,
};

export const metricIcons = {
  sun: SunIcon,
  energy: EnergyIcon,
  carbon: CarbonIcon,
  score: ScoreIcon,
};
