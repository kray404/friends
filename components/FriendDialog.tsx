"use client";

import Friend from "@/app/interfaces/Friend";
import Season from "@/app/interfaces/Season";
import { FriendOperationType } from "@/lib/friendOperationType";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface FriendDialogProps {
  seasons: Season[];
  operation: FriendOperationType;
  friend?: Friend;
  onSubmit: (data: Friend) => void;
}

export default function FriendDialog({
  seasons,
  operation,
  friend,
  onSubmit,
}: FriendDialogProps) {
  // Initialize the friend data state
  const [friendData, setFriendData] = useState<Friend>({
    id: "",
    number: "",
    name: "",
    imgUrl: "",
    twitchLink: "",
    notes: "",
    seasonId: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  useEffect(() => {
    if (friend && ["Edit", "View"].includes(operation)) {
      setFriendData(friend);
    }
  }, [friend, operation]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFriendData({ ...friendData, [e.target.name]: e.target.value });
  };

  const handleSeasonIdChange = (selectedValue: string) => {
    setFriendData({ ...friendData, seasonId: selectedValue });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(friendData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{operation} Friend</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{operation} Friend</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="number" className="text-right">
                Number
              </Label>
              <Input
                id="number"
                name="number"
                value={friendData.number || ""}
                onChange={handleChange}
                className="col-span-3"
                disabled={operation === "View"}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={friendData.name || ""}
                onChange={handleChange}
                className="col-span-3"
                disabled={operation === "View"}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imgUrl" className="text-right">
                Image URL
              </Label>
              <Input
                id="imgUrl"
                name="imgUrl"
                value={friendData.imgUrl}
                onChange={handleChange}
                className="col-span-3"
                disabled={operation === "View"}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="twitchLink" className="text-right">
                Twitch Link
              </Label>
              <Input
                id="twitchLink"
                name="twitchLink"
                value={friendData.twitchLink}
                onChange={handleChange}
                className="col-span-3"
                disabled={operation === "View"}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Input
                id="notes"
                name="notes"
                value={friendData.notes || ""}
                onChange={handleChange}
                className="col-span-3"
                disabled={operation === "View"}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="seasonId" className="text-right">
                Season
              </Label>
              <Select
                name="seasonId"
                onValueChange={(e) => handleSeasonIdChange(e)}
                disabled={operation === "View"}
              >
                <SelectTrigger className="w-max">
                  <SelectValue placeholder="Select a Season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {seasons.map((season) => (
                      <SelectItem key={season.id} value={season.id}>
                        {season.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={operation === "View"}>
              {operation === "Add" ? "Add" : "Update"} Friend
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
