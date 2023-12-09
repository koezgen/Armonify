import RecommendationsTable from './RecommendationsTable';
import FriendRecomsTable from './FriendRecomsTable';
import { Heading } from '@chakra-ui/react'

function RecommendationsPage() {

  return (
      <div className="flex flex-col items-center justify-center min-h-full w-full bg-[#081730] text-white overflow-y-auto pb-96">
        <Heading className="mt-20 font-semibold">Get Recommendations by Armonify™</Heading>
          <div className="pt-5"></div>
        <RecommendationsTable />
          <div className="my-20"></div>
        <FriendRecomsTable />
      </div>
  );
}

export default RecommendationsPage;