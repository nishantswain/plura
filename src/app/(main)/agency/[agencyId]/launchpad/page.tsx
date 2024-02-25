import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FC } from 'react';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full h-full max-w-[800px]">
        <Card className="border-none">
          <CardHeader>
            <CardTitle>Lets get started!</CardTitle>
            <CardDescription>
              Follow the steps below to get your account setup.
            </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
