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

export default function SkeletonFriendTable() {
  // Number of skeleton rows
  const skeletonRows = 5;

  // Generate skeleton row
  const skeletonRow = () => (
    <TableRow>
      <TableCell>
        <Skeleton className="h-4 w-20" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-40" />
      </TableCell>
      <TableCell className="xl:table-cell hidden">
        <Skeleton className="h-4 w-40" />
      </TableCell>
      <TableCell className="xl:table-cell hidden">
        <Skeleton className="h-4 w-40" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-60" />
      </TableCell>
      <TableCell className="xl:table-cell hidden">
        <Skeleton className="h-4 w-20" />
      </TableCell>
    </TableRow>
  );

  return (
    <Table className="mt-5">
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
        {[...Array(skeletonRows)].map((_, index) => (
          <Fragment key={index}>{skeletonRow()}</Fragment>
        ))}
      </TableBody>
    </Table>
  );
}
