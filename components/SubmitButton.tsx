'use client';

import { useFormStatus } from 'react-dom';
import { Button, ButtonProps } from '@/components/ui/button';

export function SubmitButton({ children, ...rest }: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      type={pending ? 'button' : 'submit'}
      aria-disabled={pending}
      {...rest}
    >
      {children}
    </Button>
  );
}
