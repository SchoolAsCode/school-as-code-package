const allowedCharacters = "abcdefghijklmnopqrstuvwxyz0123456789 ";

export const nameToKey = (name = "") => {
  if (typeof name === 'string') {
    return name
      .toLowerCase()
      .split("")
      .filter((char) => allowedCharacters.includes(char))
      .join("")
      .replaceAll(" ", "-");
  } else {
    return ""
  }
}
