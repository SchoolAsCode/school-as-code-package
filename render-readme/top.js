import { nameToTitle } from '../utils/name-to-title.js';

export const top = ({ env = {}, materials = {} }) =>
  `# ${env.repo ? nameToTitle(env.repo) : 'Study Repo'}

> - [Study Board](https://github.com/${env.user}/${env.repo}/projects/${
    materials.board.number
  })
> - [Issues](https://github.com/${env.user}/${env.repo}/issues)
>   - [\`help-wanted\`](https://github.com/${env.user}/${
    env.repo
  }/issues?q=is%3Aopen+label%3Ahelp-wanted)
>   - [\`question\`](https://github.com/${env.user}/${
    env.repo
  }/issues?q=is%3Aopen+label%3Aquestion)
> - [Pull Requests](https://github.com/${env.user}/${env.repo}/pulls)
> - [Shared Notes](./shared-notes)

---

`;
