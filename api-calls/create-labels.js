import fetch from "node-fetch";

const BASE_URL = "https://api.github.com/repos";

const standardLabels = [
  "check-in",
  "deliverable",
  "snippet",
  "vocabulary",
  "retrospective",
];

export const createLabels = async ({ materials = {}, env = {} }) => {
  // --- create complete array of labels ---

  const maxChapters = materials.path.reduce(
    (maxChapters, material) =>
      material.chapters > maxChapters ? material.chapters : maxChapters,
    0
  );

  const chapterLabels = Array(maxChapters)
    .fill(["chapter-", "checked-"])
    .flatMap((labelNames, i) =>
      labelNames.map((labelName) => labelName + (i + 1))
    );

  const labels = [...standardLabels, ...chapterLabels];

  // --- send and await requests ---

  const headers = {
    Accept: "application/vnd.github.v3+json",
    Authorization: `Bearer ${env.token}`,
  };

  return await Promise.all(
    labels.map((label) => {
      console.log("label: ", label);
      // fetch(`${BASE_URL}/${env.GITHUB_ACTOR}/${env.repoName}/labels`, {
      //   method: "POST",
      //   body: JSON.stringify(label),
      //   headers,
      // })
    })
  );
};
