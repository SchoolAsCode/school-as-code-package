export const top = ({ env = {}, materials = {} }) =>
    `# ${
        env.repoName
            ? env.repoName
                  .split('-')
                  .map((word) => word[0].toUpperCase() + word.slice(1))
                  .join(' ')
            : 'Study Repo'
    }

> - [Issues](https://github.com/${env.userName}/${env.repoName}/issues):
>   [\`help-wanted\`](https://github.com/${env.userName}/${
        env.repoName
    }/issues?q=is%3Aopen+label%3Ahelp-wanted),
>   [\`question\`](https://github.com/${env.userName}/${
        env.repoName
    }/issues?q=is%3Aopen+label%3Aquestion)
> - [Pull Requests](https://github.com/${env.userName}/${env.repoName}/pulls)
> - [Discussions](https://github.com/${env.userName}/${
        env.repoName
    }/discussions/)
> - [Study Board](https://github.com/${env.userName}/${env.repoName}/projects/${
        materials.board
    })
>
> <details>
> <summary>Tech Support</summary>
>
> [![Rubber Ducky](./${env.assetsPath.join(
        '/'
    )}/rubber-ducky.png)](https://rubberduckdebugging.com/)
>
>  </details>`;
