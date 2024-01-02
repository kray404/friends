import Friend from "./interfaces/Friend";

export function sortFriends(friends: Friend[]): Friend[] {
  return friends.sort((a: Friend, b: Friend) => {
    const numA = a.number ?? "";
    const numB = b.number ?? "";

    if (isNaN(Number(numA)) === isNaN(Number(numB))) {
      return numA.localeCompare(numB, undefined, { numeric: true });
    }
    return isNaN(Number(numA)) ? 1 : -1;
  });
}
