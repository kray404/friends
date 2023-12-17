import FriendSection from "@/components/FriendSection/FriendSection";

interface MyParams {
  seasonId: string;
}

export default function SeasonPage({ params }: { params: MyParams }) {
  const seasonId = params.seasonId;

  return (
    <main className="flex min-h-screen flex-col p-12">
      <FriendSection seasonId={seasonId} />
    </main>
  );
}
