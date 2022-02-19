
export const replacerTemplate = (sectionName, content) => {
  return `<!-- BEGIN ${sectionName} -->\n${content}\n<!-- END ${sectionName} -->`;
}

export const findAndReplace = (oldReadme, regex, replacer) => {
  return oldReadme.match(regex)
    ? oldReadme.replace(regex, replacer)
    : `${oldReadme}\n\n${replacer}`;
}

export const replaceInReadme = (section = '', content = '', oldReadme = '') => {
  const sectionName = section.toUpperCase();
  const regex = new RegExp(
    `(<!--[ \t]*BEGIN ${sectionName}[ \t]*-->)([^]*)(<!--[ \t]*END ${sectionName}[ \t]*-->)`,
    'g',
  );
  const replacer = replacerTemplate(sectionName, content);

  return findAndReplace(oldReadme, regex, replacer);
};
