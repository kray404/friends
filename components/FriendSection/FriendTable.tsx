import Friend from "@/app/interfaces/Friend";
import { extractValidUrl } from "@/lib/extractValidUrl";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface FriendTableProps {
  friends: Friend[];
  // isLoading: boolean;
}

export default function FriendTable({ friends }: FriendTableProps) {
  return (
    <Table className="mt-5">
      <TableHeader>
        <TableRow>
          <TableHead>Number</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Picture Link</TableHead>
          <TableHead>Stream Link</TableHead>
          <TableHead>Note</TableHead>
          <TableHead>Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {friends.map((friend) => (
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
            <TableCell>{friend.notes}</TableCell>
            <TableCell>
              {new Date(friend.updatedAt).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
