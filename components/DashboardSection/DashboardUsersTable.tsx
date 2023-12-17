import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AcceptedUser from "@/app/interfaces/AcceptedUser";

interface DashboardUsersTableProps {
  users: AcceptedUser[];
}

export default function DashboardUsersTable({
  users,
}: DashboardUsersTableProps) {
  return (
    <Table className="mt-5">
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold">User</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length > 0 ? (
          users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
            </TableRow>
          ))
        ) : (
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
