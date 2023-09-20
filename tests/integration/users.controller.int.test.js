const request = require("supertest");
const app = require("../../app");
const newUser = require("../mock-data/new-user.json");
const loginUser = require("../mock-data/login-user.json");
const { validate } = require("../../model/users.model");

const endpointUrl = "/users/";
const endpointUrlLogin = "/login/";
let userId;
describe(endpointUrl, () => {
    let firstUserId;
    test("GET" + endpointUrl, async () => {
        const response = await request(app).get(endpointUrl).send();
        expect(response.statusCode).toBe(200);
        expect(typeof Array.isArray(response.body)).toBeTruthy();
        if(response.body.length > 0){
        expect(response.body[0].userName).toBeDefined();
        expect(response.body[0].password).toBeDefined();
        firstUserId = response.body[0]._id;
        }


    })

    test("GET" + endpointUrl + ":userId", async () => {
        const response = await request(app).get(endpointUrl + firstUserId).send();
        expect(response.statusCode).toBe(200);
        expect(response.body.userName).toBe(newUser.userName);
        expect(response.body.password).toBe(newUser.password);



    })

    it("POST" + endpointUrl, async () => {
        const response = await request(app).post(endpointUrl).send(newUser);
        expect(response.statusCode).toBe(201);
        expect(response.body.userName).toBe(newUser.userName);
        expect(response.body.password).toBe(newUser.password);
        userId = response.body._id;

    })


    it("PUT" + endpointUrl + ":userId", async () => {
        const response = await request(app).put(endpointUrl + userId).send(newUser);
        expect(response.statusCode).toBe(200);
        expect(response.body.userName).toBe(newUser.userName);
        expect(response.body.password).toBe(newUser.password);

    })

    it("DELETE" + endpointUrl + ":userId", async () => {
        const response = await request(app).delete(endpointUrl + userId).send(newUser);
        expect(response.statusCode).toBe(200);
        expect(response.body.userName).toBe(newUser.userName);
        expect(response.body.password).toBe(newUser.password);

    })

    it("Should return error on malformed data" + endpointUrl, async () => {
        const response = await request(app).post(endpointUrl).send({});
        expect(response.statusCode).toBe(500);
    })

})

describe(endpointUrlLogin, () => {
    it("POST" + endpointUrlLogin, async () => {
        const response = await request(app).post(endpointUrlLogin + "validate").send(loginUser);
        expect(response.statusCode).toBe(200);
        expect(response.body.userName).toBe(loginUser.userName);
        expect(response.body.password).toBe(loginUser.password);

    })


    

})