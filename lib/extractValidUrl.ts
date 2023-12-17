export const extractValidUrl = (url: string | null): string => {
  if (url === null) {
    return "";
  }

  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const matches = url.match(urlRegex);
  if (matches && matches[0]) {
    try {
      new URL(matches[0]);
      return matches[0];
    } catch (_) {
      return "";
    }
  }
  return "";
};
