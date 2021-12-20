export const admin = (
    { env = {} },
    { name = '', userName = '', homePage = '' }
) => {
    // --- closed utilities for generating links ---

    const issues = (queryType = '', linkText = queryType) =>
        `[${linkText}](https://github.com/${env.userName}/${env.repoName}/issues/?q=${queryType}%3A${userName})`;

    // --- build the section ---

    const header = homePage
        ? `<h3 id="${userName}"><a href="${homePage}">${name}</a></h3>`
        : `<h3 id="${userName}">${name}</h3>`;

    const avatar = userName
        ? `![${userName} avatar](./${env.assetsPath.join(
              '/'
          )}/avatars/${userName}.jpeg)`
        : '';

    // add discussions?
    const links = [issues('assigned'), issues('commented'), issues('author')];

    const linksList = '- ' + links.join(' | ');

    return `
${header}

${linksList}

<details>
<summary>more about ${name}</summary>
<br>

${avatar}

</details>`;
};
