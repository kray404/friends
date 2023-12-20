import Friend from "@/app/interfaces/Friend";
import Season from "@/app/interfaces/Season";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import FriendTable from "../FriendSection/FriendTable";

interface DashboardFriendTabProps {
  seasons: Season[];
  friends: Friend[];
}

export default function DashboardFriendTab({
  seasons,
  friends,
}: DashboardFriendTabProps) {
  const formatSeasonId = (id: string): string => {
    const parts = id.split("_");
    return `${parts[0].toUpperCase()} Season ${parts[2]}`;
  };

  const getFriendsBySeason = (seasonId: string): Friend[] => {
    return friends.filter((friend) => friend.seasonId === seasonId);
  };

  return (
    <Tabs defaultValue={seasons[0].id}>
      <TabsList className="grid w-full grid-cols-3">
        {seasons.map((season) => (
          <TabsTrigger key={season.id} value={season.id}>
            {formatSeasonId(season.id)}
          </TabsTrigger>
        ))}
      </TabsList>
      {seasons.map((season) => (
        <TabsContent key={season.id} value={season.id}>
          <FriendTable friends={getFriendsBySeason(season.id)} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
