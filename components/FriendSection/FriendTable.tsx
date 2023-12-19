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
}

export default function FriendTable({ friends }: FriendTableProps) {
  return (
    <Table className="mt-5 border">
      <TableHeader>
        <TableRow>
          <TableHead>Number</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="xl:table-cell hidden">Picture Link</TableHead>
          <TableHead className="xl:table-cell hidden">Stream Link</TableHead>
          <TableHead>Note</TableHead>
          <TableHead className="xl:table-cell hidden">Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {friends.length > 0 ? (
          friends.map((friend, index) => (
            <TableRow
              key={friend.id}
              className={index % 2 === 0 ? "bg-background" : "bg-secondary"}
            >
              <TableCell className="font-medium">{friend.number}</TableCell>
              <TableCell>{friend.name}</TableCell>
              <TableCell className="xl:table-cell hidden">
                {extractValidUrl(friend.imgUrl) ? (
                  <Link
                    href={extractValidUrl(friend.imgUrl)}
                    className="hover:underline hover:text-blue-600"
                    target="_blank"
                  >
                    {friend.imgUrl}
                  </Link>
                ) : (
                  friend.imgUrl
                )}
              </TableCell>
              <TableCell className="xl:table-cell hidden">
                {extractValidUrl(friend.twitchLink) ? (
                  <Link
                    href={extractValidUrl(friend.twitchLink)}
                    className="hover:underline hover:text-blue-600"
                    target="_blank"
                  >
                    {friend.twitchLink}
                  </Link>
                ) : (
                  friend.twitchLink
                )}
              </TableCell>
              <TableCell>{friend.notes}</TableCell>
              <TableCell className="xl:table-cell hidden">
                {new Date(friend.updatedAt).toLocaleDateString("en-US")}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              <p>Nobody here :(</p>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
