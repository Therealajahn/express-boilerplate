
const app = require('../src/app')

describe("App", ()=>{
        it("GET / respond with a 200 containing 'Hello World'",()=>{
            return supertest(app)
                .get('/')
                .expect(200, "Hello World");            
        })
    }
)