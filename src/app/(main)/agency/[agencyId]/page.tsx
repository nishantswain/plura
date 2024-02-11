import { FC } from 'react';

interface pageProps {
  params: { agencyId: string };
}

const page: FC<pageProps> = ({ params: { agencyId } }) => {
  return <div>{agencyId}</div>;
};

export default page;
