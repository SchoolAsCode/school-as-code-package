export const materials = (
  { env = {}, materials = {} },
  {
    name = '',
    url = '',
    // dotStudy = false,
    board = materials.board,
    chapters = null,
    deliverables = materials.deliverables,
    milestone = 0,
    description = '',
    gitpod = materials.gitpod,
  },
) => {
  const milestoneName = name.toLowerCase().replaceAll(' ', '-');

  // --- closed utilities for generating links ---

  const projectSearch = (label = '', linkText = label) =>
    `[${linkText}](https://github.com/${env.user}/${env.repo}/projects/${materials.board.number}?card_filter_query=milestone%3A${milestoneName}+label%3A${label})`;

  const issuesSearch = (label = '', linkText = label) =>
    `[${linkText}](https://github.com/${env.user}/${env.repo}/issues/?q=milestone%3A${milestoneName}+label%3A${label})`;

  // --- build the section ---

  const formattedName = name
    .split('-')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');

  let moduleSection = `### [${formattedName}](${url})`;

  moduleSection += '\n\n- ';

  if (gitpod) {
    moduleSection += ` [open in gitpod](https://gitpod.io/#${url}) | `;
  }

  if (typeof chapters === 'number') {
    moduleSection += `${chapters} chapter${chapters === 1 ? '' : 's'} | `;
  }

  // can do the same for issues & PRs
  for (const label of board.labels) {
    moduleSection += projectSearch(label.name, label.name + ' tickets') + ' | ';
  }

  // moduleSection += issuesSearch("check-in", "check-ins") + " | ";

  if (materials.vocabulary) {
    moduleSection += projectSearch('vocabulary') + ' | ';
  }

  if (materials.snippets) {
    moduleSection += projectSearch('snippet', 'snippets') + ' | ';
  }

  if (deliverables) {
    moduleSection += projectSearch('deliverables', 'deliverables') + ' | ';
  }

  if (materials.retros) {
    moduleSection += issuesSearch('retrospective', 'retros') + ' | ';
  }

  moduleSection += `[milestone](https://github.com/${env.user}/${env.repo}/milestone/${milestone})`;

  if (description) {
    moduleSection += ' \n\n' + description;
  }

  return moduleSection + '\n\n';
};
