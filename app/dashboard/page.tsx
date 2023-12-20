import DashboardSection from "@/components/DashboardSection/DashboardSection";
import SessionProvider from "@/components/SessionProvider";
import { getServerSession } from "next-auth";

export default async function DashboardPage() {
  const session = await getServerSession();

  

  return (
    <SessionProvider session={session}>
      <DashboardSection session={session} />
    </SessionProvider>
  );
}
