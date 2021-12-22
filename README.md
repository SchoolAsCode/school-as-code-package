# School as Code: NPM package

Why an NPM package?

- it can be used to set up the repository locally
- it can be run by an action to set up the repository with one click
- easier to develop than an action

---

## In the Bin

- **`/avatars.js`**: Fetches and saves the GitHub avatar for each learner into
  the `.school/assets/avatars` folder. These are used in the rendered README.
- **`/collaborators.js`**: Adds each learner as a collaborator in the
  repository.
- **`/full-setup.js`**: Does all of these things. Does not render the README
  until after the projecting is setup, it needs board and milestone numbers to
  render the README.
- **`/projecting.js``**: Setups up a project board, creates configured labels,
  and one milestone per material. It persists an updated config with the
  milestone and board numbers added (this is used to render the README).
- **`/render-readme.js`**: Renders a README with the configured materials,
  learners, and links filtering over repository issues & project board.
