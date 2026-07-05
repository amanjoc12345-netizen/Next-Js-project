import { auth } from "@/auth";
import DashboardClient from "@/components/DashboardClient";

/**
 * Protected Dashboard Page (Server Component).
 * Fetches the user session on the server side and feeds it to the high-fidelity
 * interactive client dashboard.
 */
export default async function DashboardPage() {
  const session = await auth();

  return <DashboardClient session={session} />;
}
