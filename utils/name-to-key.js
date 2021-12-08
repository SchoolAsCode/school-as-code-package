const allowedCharacters = "abcdefghijklmnopqrstuvwxyz0123456789 ";

export const nameToKey = (name = "") =>
  name
    .toLowerCase()
    .split("")
    .filter((char) => allowedCharacters.includes(char))
    .join("")
    .replaceAll(" ", "-");
