import AgencyDetails from '@/components/forms/AgencyDetails';
import { getAuthUserDetails, verifyAndAcceptInvitation } from '@/lib/queries';
import { currentUser } from '@clerk/nextjs';
import { Plan } from '@prisma/client';
import { redirect } from 'next/navigation';
import { FC } from 'react';

interface pageProps {
  searchParams: {
    plan: Plan;
    state: string;
    code: string;
  };
}

const page: FC<pageProps> = async ({ searchParams }) => {
  const agencyId = await verifyAndAcceptInvitation();
  console.log('agencyId is ', agencyId);

  //get users details
  const user = await getAuthUserDetails();
  if (agencyId) {
    if (user?.role === 'SUBACCOUNT_GUEST' || user?.role === 'SUBACCOUNT_USER')
      return redirect('/subaccount');
    else if (user?.role === 'AGENCY_OWNER' || user?.role === 'AGENCY_ADMIN') {
      if (searchParams.plan) {
        return redirect(
          `/agency/${agencyId}/billing?plan=${searchParams.plan}`
        );
      }
      // Stripe requires this state in searchParams
      if (searchParams.state) {
        const statePath = searchParams.state.split('__')[0];
        const stateAgencyId = searchParams.state.split('__')[1];
        if (!stateAgencyId) return <div>Not authorized</div>;
        return redirect(
          `/agency/${stateAgencyId}/${statePath}?code=${searchParams.code}`
        );
      } else {
        return redirect(`/agency/${agencyId}`);
      }
    } else {
      return <div>Not authorized</div>;
    }
  }

  const authUser = await currentUser();

  //if user fails everything above, i.e they do not have a subaccount, they do not own an agency.. let them create agency now
  return (
    <div className="flex justify-center items-center mt-4">
      <div className="max-w-[850px] border-[1px] p-4 rounded-xl">
        {authUser?.emailAddresses[0].emailAddress}
        <h1 className="text-4xl">Create an Agency</h1>
        <AgencyDetails
          data={{ companyEmail: authUser?.emailAddresses[0].emailAddress }}
        />
      </div>
    </div>
  );
};

export default page;
