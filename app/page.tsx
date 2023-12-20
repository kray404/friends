import { friendData } from "@/lib/friendData";
import FriendSection from "@/components/FriendSection/FriendSection";

export default async function Home() {
  let friends = await friendData({
    seasonId: "nopixel_season_2",
    type: "friends",
  });

  let enemies = await friendData({
    seasonId: "nopixel_season_2",
    type: "enemies",
  });

  // console.log(friends);

  return (
    <main className="flex min-h-screen flex-col p-12">
      <FriendSection
        seasonId="nopixel_season_2"
        friends={friends}
        enemies={enemies}
      />
    </main>
  );
}
