import { FC } from 'react';
import Navigation from '@/components/site/navigation';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
interface layoutProps {
  children: React.ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <main>
        <Navigation />
        {children}
      </main>
    </ClerkProvider>
  );
};

export default layout;
