export default interface Friend {
  id: string;
  number: string | null;
  name: string | null;
  imgUrl: string;
  twitchLink: string;
  notes: string | null;
  seasonId: string;
  createdAt: Date;
  updatedAt: Date;
}
