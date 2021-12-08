export const suggestedStudy = ({}, { name = "", url = "", description = "" }) =>
  `
- [${name || url}](${url})${description ? `: ${description}` : ""}`;
