import { getObjectsFromEntries } from ".";

describe('returning objects from entries', () => {
    test('returns entire object without any undefined keys', () => {
        const input = {
            'firstKey': 'this',
            'secondKey': 'defined',
        };
        const result = getObjectsFromEntries(input);

        expect(result).toEqual(input);
    });

    test('filters out undefined key values', () => {
        const input = {
            'firstKey': "definitely here",
            'secondKey': undefined,
        }
        const expected = {
            'firstKey': "definitely here",
        }
        const result = getObjectsFromEntries(input);

        expect(result).toEqual(expected);
    });

    test('returns empty object if all keys are undefined', () => {
        const input = {
            'firstKey': undefined,
            'secondKey': undefined,
        }
        const expected = {};
        const result = getObjectsFromEntries(input);

        expect(result).toEqual(expected);
    });

    test('maintains nesting in nested object without undefineds', ()=> {
        const input = {
            'firstKey': {
                'secondLevelKey': [
                    "this",
                    "that",
                    "the other",
                ]
            },
            'secondKey': {
                'arrayOfObjects': [
                    {'oh yes': 'wait'},
                    {'a minute': 'mr postman'}
                ],
                'justAString': 'yep'
            }
        };
        const result = getObjectsFromEntries(input);

        expect(result).toEqual(input);
    });

    test('does not filter out undefineds at second level of nesting', () => {
        const input = {
            'firstKey': {
                'secondLevelKey': [
                    "this",
                    "that",
                    "the other",
                ]
            },
            'secondKey': {
                'arrayOfObjects': [
                    {'oh yes': 'wait'},
                    {'a minute': undefined}
                ],
                'justAString': 'yep'
            }
        };
        const result = getObjectsFromEntries(input);

        expect(result).toEqual(input);
    });
});