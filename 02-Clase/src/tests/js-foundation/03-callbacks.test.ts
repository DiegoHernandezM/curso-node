import { getUserById } from "../../js-foundation/03-callbacks";


describe('js-foundation/03-callbacks.ts', () => {
    test('getUserById should return an error if user is not found with id 100', () =>{
        const id = 100;
        getUserById(id, (err, user) => {
            expect(err).toBe(`User not found with id ${id}`);
            expect(user).toBeUndefined();
        });
    });
    
});
