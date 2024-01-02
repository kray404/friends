"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Season from "@/lib/interfaces/Season";
import { Button } from "../ui/button";

interface DashboardAddFriendProps {
  seasons: Season[];
}

export default function DashboardAddFriendDialog({
  seasons,
}: DashboardAddFriendProps) {
  const [friendData, setFriendData] = useState({
    number: "",
    name: "",
    imgUrl: "",
    twitchLink: "",
    notes: "",
    seasonId: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFriendData({ ...friendData, [e.target.name]: e.target.value });
  };

  const handleSeasonIdChange = (selectedValue: string) => {
    setFriendData({ ...friendData, seasonId: selectedValue });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const bodyJSON = JSON.stringify(friendData);
      console.log(bodyJSON);

      const response = await fetch("/api/friend/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: bodyJSON,
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Friend added:", result);
        // Reset the form or close the dialog
      } else {
        console.error("Failed to add friend");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Friend</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Friend</DialogTitle>
            <DialogDescription>
              Enter the details of the friend to add them to the database.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="number" className="text-right">
                Number
              </Label>
              <Input
                id="number"
                name="number"
                value={friendData.number}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={friendData.name}
                onChange={handleChange}
                className="col-span-3"
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
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Input
                id="notes"
                name="notes"
                value={friendData.notes}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="seasonId" className="text-right">
                Season
              </Label>
              <Select
                name="seasonId"
                onValueChange={(e) => handleSeasonIdChange(e)}
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
            <Button type="submit">Add Friend</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
