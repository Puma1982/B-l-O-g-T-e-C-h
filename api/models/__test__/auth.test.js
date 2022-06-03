const newUser = require("./auth.js");

describe('user service', () => {

    test('does nothing if separation is already correct',()=>{
        const {  username,  email, password} = newUser.newUser(
            'Haithem',
            'griss_hai2005@hotmail.com',
            'Haithem', 
        );
         expect(username).toEqual('Haithem');
         expect(email).toEqual('griss_hai2005@hotmail.com');
         expect(password).toEqual('Haithem');
    });
    test('correct separation of surname if it contains spaces',()=>{
        const {  username,  email, password} = newUser.auth(
            'Haithem',
            'griss_hai2005@hotmail.com',
            'Haithem', 
        );
         expect(username).toEqual('griss_hai2005@hotmail.com');
         expect(email).toEqual('Haithem');
         expect(password).toEqual('Haithem');
        });
    
});