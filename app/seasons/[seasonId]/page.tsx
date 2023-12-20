import { friendData } from "@/lib/friendData";
import FriendSection from "@/components/FriendSection/FriendSection";

interface MyParams {
  seasonId: string;
}

export default async function SeasonPage({ params }: { params: MyParams }) {
  const seasonId = params.seasonId;

  let friends = await friendData({
    seasonId: seasonId,
    type: "friends",
  });

  let enemies = await friendData({
    seasonId: seasonId,
    type: "enemies",
  });

  return (
    <main className="flex min-h-screen flex-col p-12">
      <FriendSection seasonId={seasonId} friends={friends} enemies={enemies} />
    </main>
  );
}
