export const gettingStarted = ({ env }) =>
  `
## Getting Started

Cloning, installing, and running quality checks.

<details>
<summary>expand/collapse</summary>
<br>

1. \`git clone git@github.com:${env.userName}/${env.repoName}.git\`
2. \`cd ${env.repoName}\`
3. \`npm install\`

## Code Quality Checks

- \`npm run format\`: Makes sure all the code in this repository is well-formatted
  (looks good).
- \`npm run lint:ls\`: Checks to make sure all folder and file names match the
  repository conventions.
- \`npm run lint:md\`: Will lint all of the Markdown files in this repository.
- \`npm run lint:css\`: Will lint all of the CSS files in this repository.
- \`npm run validate:html\`: Validates all HTML files in your project.
- \`npm run spell-check\`: Goes through all the files in this repository looking
  for words it doesn't recognize. Just because it says something is a mistake
  doesn't mean it is! It doesn't know every word in the world. You can add new
  correct words to the [./.cspell.json](./.cspell.json) file so they won't cause
  an error.
- \`npm run accessibility -- ./path/to/file.html\`: Runs an accessibility analysis
  on all HTML files in the given path and writes the report to
  \`/accessibility_report\`

## Continuous Integration (CI)

When you open a PR to \`main\`/\`master\` in your repository, GitHub will
automatically do a linting check on the code in this repository, you can see
this in the[./.github/workflows/lint.yml](./.github/workflows/lint.yml) file.

If the linting fails, you will not be able to merge the PR. You can double check
that your code will pass before pushing by running the code quality scripts
locally.

</details>`;
