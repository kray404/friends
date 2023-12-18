import { FriendData } from "@/components/FriendSection/FriendData";
import FriendSection from "@/components/FriendSection/FriendSection";

export default async function Home() {
  const initialPeople = await FriendData({
    seasonId: "nopixel_season_2",
    type: "friends",
  });

  console.log(initialPeople);

  return (
    <main className="flex min-h-screen flex-col p-12">
      <FriendSection
        seasonId="nopixel_season_2"
        initialPeople={initialPeople}
      />
    </main>
  );
}
