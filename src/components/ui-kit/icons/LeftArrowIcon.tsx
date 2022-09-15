import { memo } from 'react';
import { FCIcon } from 'components/ui-kit/icons/typedefs';

export const LeftArrowIcon: FCIcon = memo((props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M21.9206 9.98219L4.49997 9.98099L4.5 14.0171L21.9206 14.016C23.0345 14.016 23.9375 13.113 23.9375 11.9991C23.9375 10.8852 23.0345 9.98219 21.9206 9.98219Z" fill="currentColor" />
    <path d="M11.4104 0.590734L2.8519 9.14661L0.000207901 11.9985L2.8519 14.8524L11.4104 23.4093C12.198 24.1969 13.475 24.1969 14.2627 23.4093C15.0503 22.6216 15.0503 21.3446 14.2627 20.5569L5.7058 11.9985L14.2627 3.44305C15.0503 2.65541 15.0503 1.37838 14.2627 0.590734C13.475 -0.196911 12.198 -0.196911 11.4104 0.590734Z" fill="currentColor" />
  </svg>
));
