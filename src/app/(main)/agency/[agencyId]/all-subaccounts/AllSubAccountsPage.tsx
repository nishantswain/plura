import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { getAuthUserDetails } from '@/lib/queries';
import { SubAccount } from '@prisma/client';
import { AlertDialogTrigger } from '@radix-ui/react-alert-dialog';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import DeleteButton from './_components/DeleteButton';

interface AllSubAccountsPageProps {
  params: { agencyId: string };
}

const AllSubAccountsPage: FC<AllSubAccountsPageProps> = async ({ params }) => {
  const user = await getAuthUserDetails();
  if (!user) return;

  return (
    <AlertDialog>
      <div className="flex flex-col">
        <Button>Create</Button>
        <Command className="rounded-lg bg-transparent">
          <CommandInput placeholder="Search Account...">
            <CommandList>
              <CommandEmpty>No Results Found.</CommandEmpty>
              <CommandGroup heading="Sub Accounts">
                {!!user.Agency?.SubAccount.length ? (
                  user.Agency.SubAccount.map((subAccount: SubAccount) => (
                    <CommandItem
                      key={subAccount.id}
                      className="h-32 !bg-background my-2 text-primary border-[1px] border-border p-4 rounded-lg hover:!bg-background cursor-pointer transition-all"
                    >
                      <Link
                        href={`/subaccount/${subAccount.id}`}
                        className="flex gap w-full h-full"
                      >
                        <div className="relative w-32">
                          <Image
                            src={subAccount.subAccountLogo}
                            alt="subaccount logo"
                            fill
                            className="rounded-md object-contain bg-muted/50 p-4"
                          />
                        </div>
                        <div className="flex flex-col justify-between">
                          <div className="flex flex-col">
                            {subAccount.name}
                            <span className="text-muted-foreground text-xs"></span>
                          </div>
                        </div>
                      </Link>
                      <AlertDialogTrigger asChild>
                        {' '}
                        <Button
                          size={'sm'}
                          variant={'destructive'}
                          className="text-red-600 w-20 hover:bg-red-600 hover:text-white"
                        >
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-left">
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will delete the
                            subaccount and all data related to the subaccount.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex items-center">
                          <AlertDialogCancel className="mb-2 "></AlertDialogCancel>
                          <AlertDialogAction className="bg-destructive hover:bg-destructive">
                            <DeleteButton subAccountId={subAccount.id} />
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </CommandItem>
                  ))
                ) : (
                  <div className="text-muted-foreground text-center p-4">
                    No sub accounts
                  </div>
                )}
              </CommandGroup>
            </CommandList>
          </CommandInput>
        </Command>
      </div>
    </AlertDialog>
  );
};

export default AllSubAccountsPage;
