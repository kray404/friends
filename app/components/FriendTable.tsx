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
import Friend from "../interfaces/Friend";

interface FriendTableProps {
  friends: Friend[];
}

const FriendTable: React.FC<FriendTableProps> = ({ friends }) => {
  return (
    <Table>
      <TableCaption>Four Tees Friends</TableCaption>
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
        {friends.map((friend) => (
          <TableRow key={friend.id}>
            <TableCell className="font-medium">{friend.number}</TableCell>
            <TableCell>{friend.name}</TableCell>
            <TableCell>{friend.imgUrl}</TableCell>
            <TableCell>{friend.twitchLink}</TableCell>
            <TableCell>{friend.otherNotes}</TableCell>
            <TableCell>
              {new Date(friend.updatedAt).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}></TableCell>
          <TableCell className="text-right">
            Total: {friends.length} Friends
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default FriendTable;
