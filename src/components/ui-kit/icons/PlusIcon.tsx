import { memo } from 'react';
import { FCIcon } from 'components/ui-kit/icons/typedefs';

export const PlusIcon: FCIcon = memo((props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M22.2857 10.2857H13.7143V1.71429C13.7143 0.768 12.9463 0 12 0C11.0537 0 10.2857 0.768 10.2857 1.71429V10.2857H1.71429C0.768 10.2857 0 11.0537 0 12C0 12.9463 0.768 13.7143 1.71429 13.7143H10.2857V22.2857C10.2857 23.232 11.0537 24 12 24C12.9463 24 13.7143 23.232 13.7143 22.2857V13.7143H22.2857C23.232 13.7143 24 12.9463 24 12C24 11.0537 23.232 10.2857 22.2857 10.2857Z" fill="currentColor" />
  </svg>
));
