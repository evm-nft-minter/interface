import { memo } from 'react';
import { FCIcon } from 'components/ui-kit/icons/typedefs';

export const ImageIcon: FCIcon = memo((props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fillRule="evenodd" clipRule="evenodd" d="M24 21.3333V2.66667C24 1.2 22.8 0 21.3333 0H2.66667C1.2 0 0 1.2 0 2.66667V21.3333C0 22.8 1.2 24 2.66667 24H21.3333C22.8 24 24 22.8 24 21.3333ZM7.33333 14L10.6667 18L15.3333 12L21.3333 20H2.66667L7.33333 14Z" fill="currentColor" />
  </svg>
));
