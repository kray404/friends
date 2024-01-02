import Friend from "@/lib/interfaces/Friend";

/**
 * Submits friend data to the server.
 * @param friendData The friend data to be submitted.
 */
export async function handleSubmitFriendData(
  friendData: Friend
): Promise<void> {
  try {
    const bodyJSON = JSON.stringify(friendData);
    console.log("Submitting Friend Data:", bodyJSON);

    const response = await fetch("/api/friend/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyJSON,
    });

    const result = await response.json();
    if (response.ok) {
      console.log("Friend added/updated:", result);
      // Additional success logic here
    } else {
      console.error("Failed to add/update friend");
    }
  } catch (error) {
    console.error("Error submitting friend data:", error);
  }
}
