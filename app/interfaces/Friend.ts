export default interface Friend {
  id: string;
  number: string | null;
  name: string | null;
  description: string | null;
  imgUrl: string | null;
  twitchLink: string | null;
  otherNotes: string | null;
  seasonId: string;
  createdAt: Date;
  updatedAt: Date;
}
