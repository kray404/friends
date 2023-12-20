import { Session } from "next-auth";

// Function to check if the user is authenticated
export async function isAuthenticated(
  session: Session | null
): Promise<boolean> {
  try {
    // If there is no session, return false
    if (!session || !session.user) {
      return false;
    }

    // Retrieve the username from the session
    const username = session?.user?.name ?? "";

    // Fetch the list of accepted users from the API
    const response = await fetch("/api/getAcceptedUsers");
    if (!response.ok) {
      // Handle the error if the API call fails
      console.error("Failed to fetch accepted users");
      return false;
    }

    const acceptedUsers = await response.json();

    // Check if the username exists in the list of accepted users
    const isAcceptedUser = acceptedUsers.some(
      (user: { username: string }) => user.username === username
    );

    // Return true if the user exists in the list of accepted users
    return isAcceptedUser;
  } catch (error) {
    console.error("Authentication check failed:", error);
    return false;
  }
}
