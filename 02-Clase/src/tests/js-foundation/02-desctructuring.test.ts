import {characters} from '../../js-foundation/02-destructuring';

describe ('js-foundation/02-destructuring.ts', () => {
    test('characters should contain Batman', () =>{
        expect(characters).toContain('Batman');
    });

    test('first character should be Flash and second Superman', () =>{
        expect(characters[0]).toBe('Flash');
        expect(characters[1]).toBe('Superman');
    });
});
