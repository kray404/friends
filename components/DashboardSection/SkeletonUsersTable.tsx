import { Fragment } from "react";
import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function SkeletonUsersTable() {
  // Number of skeleton rows
  const skeletonRows = 5;

  // Generate skeleton row
  const skeletonRow = () => (
    <TableRow>
      <TableCell>
        <Skeleton className="h-4 w-40" />
      </TableCell>
    </TableRow>
  );

  return (
    <Table className="mt-5">
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(skeletonRows)].map((_, index) => (
          <Fragment key={index}>{skeletonRow()}</Fragment>
        ))}
      </TableBody>
    </Table>
  );
}
