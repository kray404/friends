import Dashboard from "@/components/DashboardSection/Dashboard";
import SessionProvider from "@/components/SessionProvider";
import { getServerSession } from "next-auth";

export default async function DashboardPage() {
  const session = await getServerSession();

  const username = session?.user?.name ?? "";

  return (
    <SessionProvider session={session}>
      <Dashboard username={username} />
    </SessionProvider>
  );
}
