export const learner = (
    { materials = {}, env = {} },
    { name = '', userName = '', homePage = '' }
) => {
    const deliverablesExist = materials.path.find(
        (material) => material.deliverables === false
    )
        ? false
        : true;

    // --- closed utilities for generating links ---

    const projectSearch = (label = '', linkText = label) =>
        `[${linkText}](https://github.com/${env.userName}/${env.repoName}/projects/${materials.board}?card_filter_query=autho%3A${name}+label%3A${label})`;

    const issuesSearch = (label = '', linkText = label) =>
        `[${linkText}](https://github.com/${env.userName}/${env.repoName}/issues/?q=author%3A${userName}+label%3A${label})`;

    // --- build the section ---

    const header = homePage
        ? `<h3 id="${userName}"><a href="${homePage}">${name}</a></h3>`
        : `<h3 id="${userName}">${name}</h3>`;

    const avatar = `![${userName} avatar](./${env.assetsPath.join(
        '/'
    )}/avatars/${userName}.jpeg)`;

    const links = [
        issuesSearch('question', 'questions'),
        issuesSearch('help-wanted'),
        issuesSearch('check-in', 'check-ins'),
    ];
    if (deliverablesExist) {
        links.push(projectSearch('deliverable', 'deliverables'));
    }
    links.push(
        issuesSearch('retrospective', 'retrospectives'),
        `[${userName}](https://github.com/${userName})`
    );

    const linksList = '- ' + links.join(' | ');

    const activity = `![${userName} github activity](https://ghchart.rshah.org/${userName})`;

    const stats = `![${userName} github stats](https://github-readme-stats.vercel.app/api?username=${userName}&show_icons=true&theme=default&hide_title=true&hide_rank=true)`;

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
