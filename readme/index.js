import prettier from "prettier";

import { top } from "./top.js";
import { gettingStarted } from "./getting-started.js";
import { section } from "./section.js";

import { material } from "./components/material.js";
import { suggestedStudy } from "./components/suggested-study.js";
import { learner } from "./components/learner.js";
import { teacher } from "./components/teacher.js";
import { admin } from "./components/admin.js";

export const readme = (config) =>
  prettier.format(
    `

${top(config)}

---

${gettingStarted(config)}

---

${
  config?.materials?.path?.length > 0
    ? section(config, {
        title: "Path",
        intro: config.materials.description,
        component: material,
        data: config.materials.path,
      })
    : ""
}
${
  config.materials?.suggestedStudy?.length > 0
    ? `

---

${section(config, {
  title: "Suggested Study",
  component: suggestedStudy,
  data: config.materials.suggestedStudy,
  collapse: true,
})}
`
    : ""
}
${
  config?.learners?.length > 0
    ? `

---

${section(config, {
  title: "Learners",
  component: learner,
  data: config.learners,
})}
`
    : ""
}
${
  config?.teachers?.length > 0
    ? `

---

${section(config, {
  title: "Teachers",
  component: teacher,
  data: config.teachers,
})}
`
    : ""
}
${
  config?.admins?.length > 0
    ? `

---

${section(config, {
  title: "Admins",
  component: admin,
  data: config.admins,
})}
`
    : ""
}
`,
    { printWidth: 80, proseWrap: "always", parser: "markdown" }
  );
