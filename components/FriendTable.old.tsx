// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import Friend from "../app/interfaces/Friend";
// import Link from "next/link";

// interface FriendTableProps {
//   friends: Friend[];
//   isLoading: boolean;
// }

// export default function FriendTable({ friends, isLoading }: FriendTableProps) {
//   const [showLoadingError, setShowLoadingError] = useState(false);

//   useEffect(() => {
//     let timeout: NodeJS.Timeout;
//     if (isLoading) {
//       timeout = setTimeout(() => setShowLoadingError(true), 5000);
//     } else {
//       setShowLoadingError(false);
//     }

//     return () => clearTimeout(timeout);
//   }, [isLoading]);

//   const extractValidUrl = (url: string | null): string => {
//     if (url === null) {
//       return "";
//     }

//     const urlRegex = /(https?:\/\/[^\s]+)/g;
//     const matches = url.match(urlRegex);
//     if (matches && matches[0]) {
//       try {
//         new URL(matches[0]);
//         return matches[0];
//       } catch (_) {
//         return "";
//       }
//     }
//     return "";
//   };

//   const SkeletonRow = () => (
//     <TableRow>
//       <TableCell>
//         <div className="h-4 bg-gray-200 rounded"></div>
//       </TableCell>
//       <TableCell>
//         <div className="h-4 bg-gray-200 rounded"></div>
//       </TableCell>
//       <TableCell>
//         <div className="h-4 bg-gray-200 rounded"></div>
//       </TableCell>
//       <TableCell>
//         <div className="h-4 bg-gray-200 rounded"></div>
//       </TableCell>
//       <TableCell>
//         <div className="h-4 bg-gray-200 rounded"></div>
//       </TableCell>
//       <TableCell>
//         <div className="h-4 bg-gray-200 rounded"></div>
//       </TableCell>
//     </TableRow>
//   );

//   const NoDataMessage = () => (
//     <TableRow>
//       <TableCell colSpan={6} className="text-center">
//         No friends :(
//       </TableCell>
//     </TableRow>
//   );

//   return (
//     <Table>
//       <TableCaption>Total: {friends.length} Friends</TableCaption>
//       <TableHeader>
//         <TableRow>
//           <TableHead className="w-[100px]">Number</TableHead>
//           <TableHead>Name</TableHead>
//           <TableHead>Picture Link</TableHead>
//           <TableHead>Twitch Channel</TableHead>
//           <TableHead>Note</TableHead>
//           <TableHead>Updated</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {isLoading && !showLoadingError ? (
//           Array.from({ length: 10 }).map((_, index) => (
//             <SkeletonRow key={index} />
//           ))
//         ) : (!isLoading && friends.length === 0) || showLoadingError ? (
//           <NoDataMessage />
//         ) : (
//           friends.map((friend) => (
//             <TableRow key={friend.id}>
//               <TableCell className="font-medium">{friend.number}</TableCell>
//               <TableCell>{friend.name}</TableCell>
//               <TableCell>
//                 {extractValidUrl(friend.imgUrl) ? (
//                   <Link
//                     href={extractValidUrl(friend.imgUrl)}
//                     className="hover:underline"
//                     target="_blank"
//                   >
//                     {friend.imgUrl}
//                   </Link>
//                 ) : (
//                   friend.imgUrl
//                 )}
//               </TableCell>
//               <TableCell>
//                 {extractValidUrl(friend.twitchLink) ? (
//                   <Link
//                     href={extractValidUrl(friend.twitchLink)}
//                     className="hover:underline"
//                     target="_blank"
//                   >
//                     {friend.twitchLink}
//                   </Link>
//                 ) : (
//                   friend.twitchLink
//                 )}
//               </TableCell>
//               <TableCell>{friend.notes}</TableCell>
//               <TableCell>
//                 {new Date(friend.updatedAt).toLocaleDateString()}
//               </TableCell>
//             </TableRow>
//           ))
//         )}
//       </TableBody>
//     </Table>
//   );
// }
