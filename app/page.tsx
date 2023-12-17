import FriendSection from "@/components/FriendSection/FriendSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <FriendSection seasonId="nopixel_season_2" />
      {/* <FriendTable friends={friends} isLoading={!friends.length} /> */}
    </main>
  );
}
