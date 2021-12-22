export const learner = (
  { materials = {}, env = {} },
  { name = '', user = '', homePage = '' },
) => {
  // --- closed utilities for generating links ---

  const projectSearch = (label = '', linkText = label) =>
    `[${linkText}](https://github.com/${env.user}/${env.repo}/projects/${materials.board.number}?card_filter_query=autho%3A${name}+label%3A${label})`;

  const issuesSearch = (label = '', linkText = label) =>
    `[${linkText}](https://github.com/${env.user}/${env.repo}/issues/?q=author%3A${user}+label%3A${label})`;

  // --- build the section ---

  const header = homePage
    ? `<h3 id="${user}"><a href="${homePage}">${name}</a></h3>`
    : `<h3 id="${user}"><a href="https://github.com/${user}">${name}</a></h3>`;

  const avatar = `![${user} avatar](./${env.assetsPath.join(
    '/',
  )}/avatars/${user}.jpeg)`;

  const links = [
    issuesSearch('question', 'questions'),
    issuesSearch('help-wanted'),
  ];
  // can do the same for issues & PRs
  for (const label of materials.board.labels) {
    links.push(projectSearch(label.name, label.name + ' tickets'));
  }

  const linksList = '- ' + links.join(' | ');

  const activity = `![${user} github activity](https://ghchart.rshah.org/${user})`;

  const stats = `![${user} github stats](https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=default&hide_title=true&hide_rank=true)`;

  return `
${header}

${linksList}

<details>
<summary>more about ${name}</summary>
<br>

${avatar}

${activity}

${stats}

</details>`;
};
