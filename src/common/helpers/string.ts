// TODO: reconsider improving this function later
export function getInitials(name: string): string {
  if (typeof name !== "string") return "?";

  const sanitizedName = name.trim().replace(/[^\p{L}\p{N}\s-]+/gu, "");
  if (!sanitizedName) return "?";

  const nameParts = sanitizedName.split(/\s+/).filter(Boolean);
  if (nameParts.length === 0) return "?";

  const firstName = nameParts[0] ?? "";
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

  const extractFirstLetter = (text: string): string => {
    return /\p{L}/u.exec(text)?.[0]?.toUpperCase() ?? "";
  };

  const firstInitial = extractFirstLetter(firstName);

  // Handle hyphenated last names by taking the first part
  const lastInitial = lastName
    ? extractFirstLetter(lastName.split("-")[0] ?? "")
    : "";

  return firstInitial + lastInitial || "?";
}
