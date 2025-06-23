import type { IconProps } from '@/components/icons';

export const SiteLogo = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth="16"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M32 192L96 96L160 192L224 96" />
    </svg>
  );
};
