export const material = (
  { env = {}, boards = [], materials = {} },
  {
    name = "",
    url = "",
    dotStudy = false,
    chapters = null,
    deliverables = false,
    milestone = 0,
  }
) => {
  const milestoneName = name.toLowerCase().replaceAll(" ", "-");

  // --- closed utilities for generating links ---

  const projectSearch = (label = "", linkText = label) =>
    `[${linkText}](https://github.com/${env.userName}/${env.repoName}/projects/${materials.board}?card_filter_query=milestone%3A${milestoneName}+label%3A${label})`;

  const issuesSearch = (label = "", linkText = label) =>
    `[${linkText}](https://github.com/${env.userName}/${env.repoName}/issues/?q=milestone%3A${milestoneName}+label%3A${label})`;

  // --- build the section ---

  const formattedName = name
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  let moduleSection = `### [${formattedName}](${
    dotStudy ? url + "/.study" : url
  }) \n\n- `;

  if (typeof chapters === "number") {
    moduleSection += `${chapters} chapter${chapters === 1 ? "" : "s"} | `;
  }

  moduleSection +=
    projectSearch("vocabulary") +
    " | " +
    projectSearch("snippet", "snippets") +
    " | ";

  if (deliverables) {
    moduleSection += projectSearch("deliverables", "deliverables") + " | ";
  }

  moduleSection +=
    issuesSearch("check-in", "check-ins") +
    " | " +
    issuesSearch("retrospective", "retrospectives") +
    " | ";

  moduleSection += `[milestone](https://github.com/lab-antwerp-1/home/milestone/${milestone})`;

  return moduleSection + "\n\n";
};
