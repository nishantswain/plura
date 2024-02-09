import React, { FC } from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-full w-full justify-center items-center">
      {children}
    </div>
  );
};

export default AuthLayout;
