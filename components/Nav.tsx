import { getServerSession } from "next-auth";
import Navbar from "./NavBar";

export default async function Nav() {
  const session = await getServerSession();
  return <Navbar user={session?.user} />;
}
