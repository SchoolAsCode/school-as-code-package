import { nameToTitle } from "./name-to-title";

describe('convert name to a title', () => {
    it('should uppercase lowercase names', () => {
        const input = 'single-dash';
        const expected = 'Single Dash';
        const result = nameToTitle(input);

        expect(result).toEqual(expected);
    });

    it('should only uppercase first word if separated by spaces already', () => {
        const input = 'no dash';
        const expected = 'No dash';
        const result = nameToTitle(input);

        expect(result).toEqual(expected);
    });

    it('should ignore multiple dashes', () => {
        const input = 'single-dash and double-dash';
        const expected = 'Single Dash and double Dash';
        const result = nameToTitle(input);

        expect(result).toEqual(expected);
    });
});
