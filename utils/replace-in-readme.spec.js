import { findAndReplace, replaceInReadme, replacerTemplate } from "./replace-in-readme";

describe('findAndReplace', () => {

    const oldReadme = "# The Original Readme\n" +

        "replace this string\n" +

        "no need to match this\n" +

        "## below is another string to be replaced\n" +

        "replace this string";

    test('takes a regex and replaces content in the old readme if it finds a similar named section', () => {
        const regex = new RegExp(
          'replace this string',
          'g'
        );
        const replacer = 'This string got replaced!!!'

        const expected = "# The Original Readme\n" +

            "This string got replaced!!!\n" +

            "no need to match this\n" +

            "## below is another string to be replaced\n" +

            "This string got replaced!!!";
        const result = findAndReplace(oldReadme, regex, replacer);

        expect(result).toEqual(expected);
    });

    test('adds the replacer at the bottom if it does not find any matches from the regex', () => {
        const regex = new RegExp(
            'try to find this string',
            'g'
        )
        const replacer = 'This does not match with anything';

        const expected = oldReadme + "\n\n" + replacer;
        const result = findAndReplace(oldReadme, regex, replacer);

        expect(result).toEqual(expected);
    });
});

describe('replaceInReadme', () => {
    const oldReadme = "# The title of the Readme\n" +

        "<!-- BEGIN MATERIALS -->\n" +

        "here is some content that might get replaced if there's a match\n" +

        "<!-- END MATERIALS -->\n" +

        "some content at the end that won't be replaced";

    test('replaces content between matching sections', () => {
        const section = 'Materials';
        const newContent = 'put this new content in the readme!';
        const expected = "# The title of the Readme\n" +

            "<!-- BEGIN MATERIALS -->\n" +

            newContent + "\n" +

            "<!-- END MATERIALS -->\n" +

            "some content at the end that won't be replaced";

        const result = replaceInReadme(section, newContent, oldReadme);

        expect(result).toEqual(expected);
    });

    test('adds content at the end if it does not find a matching section', () => {
        const section = 'NoMatches';
        const content = 'We added this because there are no matches';

        const expected = "# The title of the Readme\n" +

            "<!-- BEGIN MATERIALS -->\n" +

            "here is some content that might get replaced if there's a match\n" +

            "<!-- END MATERIALS -->\n" +

            "some content at the end that won't be replaced" +

            "\n\n" +

            "<!-- BEGIN NOMATCHES -->\n" +
            content + "\n" +
            "<!-- END NOMATCHES -->";

        const result = replaceInReadme(section, content, oldReadme);

        expect(result).toEqual(expected);
    });
});

describe('replacerTemplate', () => {
    test("doesn't error if it gets a blank sectionName and content", () => {
        const sectionName = '';
        const content = '';
        const expected = `<!-- BEGIN  -->\n\n<!-- END  -->`
        const result = replacerTemplate(sectionName, content)

        expect(result).toEqual(expected);
    });

    test('slots in the content in the section', () => {
        const sectionName = 'Micromaterials';
        const content = 'These materials are makin me thirsty!';
        const expected = `<!-- BEGIN Micromaterials -->\nThese materials are makin me thirsty!\n<!-- END Micromaterials -->`
        const result = replacerTemplate(sectionName, content)

        expect(result).toEqual(expected);
    });

});