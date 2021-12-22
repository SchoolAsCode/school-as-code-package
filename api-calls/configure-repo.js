import fetch from "node-fetch";

export const configureRepo = async (config) => {
  console.log("configuring repository");
  // require review
  // require re-review for stale PRs
  // enable discussions
  //  out of scope
  // enable actions
  //  https://docs.github.com/en/rest/reference/actions#set-github-actions-permissions-for-an-organization
  // ... check docs in antwerp/admin + notes from gelila
};
