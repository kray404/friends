import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Friend from "../app/interfaces/Friend";
import Link from "next/link";

interface FriendTableProps {
  friends: Friend[];
}

export default function FriendTable({
  friends,
  isLoading,
}: FriendTableProps & { isLoading: boolean }) {
  // Helper function to check if a string is a valid URL
  const extractValidUrl = (url: string | null): string => {
    if (url === null) {
      return "";
    }

    // Regular expression to match a basic URL pattern
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matches = url.match(urlRegex);
    if (matches && matches[0]) {
      try {
        new URL(matches[0]);
        return matches[0];
      } catch (_) {
        return "";
      }
    }
    return "";
  };

  const SkeletonRow = () => (
    <TableRow>
      <TableCell>
        <div className="h-4 bg-gray-200 rounded"></div>
      </TableCell>
      <TableCell>
        <div className="h-4 bg-gray-200 rounded"></div>
      </TableCell>
      <TableCell>
        <div className="h-4 bg-gray-200 rounded"></div>
      </TableCell>
      <TableCell>
        <div className="h-4 bg-gray-200 rounded"></div>
      </TableCell>
      <TableCell>
        <div className="h-4 bg-gray-200 rounded"></div>
      </TableCell>
      <TableCell>
        <div className="h-4 bg-gray-200 rounded"></div>
      </TableCell>
    </TableRow>
  );

  return (
    <Table>
      <TableCaption>Total: {friends.length} Friends</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Number</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Picture Link</TableHead>
          <TableHead>Twitch Channel</TableHead>
          <TableHead>Note</TableHead>
          <TableHead>Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <SkeletonRow key={index} />
            ))
          : friends.map((friend) => (
              <TableRow key={friend.id}>
                <TableCell className="font-medium">{friend.number}</TableCell>
                <TableCell>{friend.name}</TableCell>
                <TableCell>
                  {extractValidUrl(friend.imgUrl) ? (
                    <Link
                      href={extractValidUrl(friend.imgUrl)}
                      className="hover:underline"
                      target="_blank"
                    >
                      {friend.imgUrl}
                    </Link>
                  ) : (
                    friend.imgUrl
                  )}
                </TableCell>
                <TableCell>
                  {extractValidUrl(friend.twitchLink) ? (
                    <Link
                      href={extractValidUrl(friend.twitchLink)}
                      className="hover:underline"
                      target="_blank"
                    >
                      {friend.twitchLink}
                    </Link>
                  ) : (
                    friend.twitchLink
                  )}
                </TableCell>
                <TableCell>{friend.otherNotes}</TableCell>
                <TableCell>
                  {new Date(friend.updatedAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
}
