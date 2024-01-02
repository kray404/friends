import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AcceptedUser from "@/lib/interfaces/AcceptedUser";

interface DashboardUsersTableProps {
  users: AcceptedUser[];
  username: string;
}

export default function DashboardUsersTable({
  users,
  username,
}: DashboardUsersTableProps) {
  return (
    <Table className="mt-5">
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold">User</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              {user.username}
              {user.username === username && (
                <span className="ml-2">&lt;-- This is you</span>
              )}
            </TableCell>
          </TableRow>
        ))}
        {users.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              Nobody here :(
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
