import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { FC } from 'react';

interface layoutProps {
  children: React.ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>{children}</ClerkProvider>
  );
};

export default layout;
