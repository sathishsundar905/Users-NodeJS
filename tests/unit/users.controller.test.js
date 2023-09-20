const UsersController = require("../../controllers/users.controller");
const UsersModel = require("../../model/users.model");
const LoginUsersModel = require("../../model/loginUsers.model");
LoginUsersModel.create = jest.fn();
LoginUsersModel.findOne = jest.fn();
LoginUsersModel.findOneAndDelete = jest.fn();
LoginUsersModel.findByIdAndUpdate = jest.fn();

UsersModel.create = jest.fn();
UsersModel.find = jest.fn();
UsersModel.findById = jest.fn();
UsersModel.findByIdAndUpdate = jest.fn();
UsersModel.findByIdAndDelete = jest.fn();

const httpMocks = require("node-mocks-http");
const newUser = require("../mock-data/new-user.json");
const users = require("../mock-data/users.json");
const loginUser = require("../mock-data/login-user.json");
let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

/* describe("UsersController.validateUser", () => {
    beforeEach(() => {
        req.body = loginUser;
    })
    it("Should have a validateUser Function", () => {
        expect(typeof UsersController.validateUser).toBe("function");
    })

    it("Should call LoginUsersModel.findOne", async() => {
        LoginUsersModel.findOne.mockReturnValue(loginUser);
        await UsersController.validateUser(req, res, next);
        expect(LoginUsersModel.findOne).toBeCalledWith(loginUser);
    });

    it("Should return status 200", async() => {
        LoginUsersModel.findOne.mockReturnValue(loginUser);
        await UsersController.validateUser(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it("Should handle Errors", async() => {
        const errorMessage = {message:"Please Check the input"};
        const rejectedPromise = Promise.reject(errorMessage);
        LoginUsersModel.findOne.mockReturnValue(rejectedPromise);
        await UsersController.validateUser(req, res, next);
        expect(next).toBeCalledWith(errorMessage);

    });


}) */

describe("UsersController.createUser", () => {
    beforeEach(() => {
        req.body = newUser;
    })
    it("Should have a CreateUser Function", () => {
        expect(typeof UsersController.createUser).toBe("function");
    })

    it("Should call UsersModel.create", async() => {
        await UsersController.createUser(req, res, next);
        expect(LoginUsersModel.findOne).toBeCalled();
        expect(UsersModel.create).toBeCalledWith(newUser);
        expect(LoginUsersModel.create).toBeCalledWith(newUser);
    });

    it("Should return status 201", async() => {
       // LoginUsersModel.create.mockReturnValue(newUser);
        UsersModel.create.mockReturnValue(newUser);
        await UsersController.createUser(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it("Should return json body in response", async() => {
       // LoginUsersModel.create.mockReturnValue(newUser);
        UsersModel.create.mockReturnValue(newUser);
        await UsersController.createUser(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newUser);

    });

    it("Should handle Errors", async() => {
        const errorMessage = {message:"Please Check the input"};
        const rejectedPromise = Promise.reject(errorMessage);
        UsersModel.create.mockReturnValue(rejectedPromise);
        await UsersController.createUser(req, res, next);
        expect(next).toBeCalledWith(errorMessage);

    });


})

describe("UsersController.getUsers", () => {
    it("Should have a getUsers Function", () => {
        expect(typeof UsersController.getUsers).toBe("function");
    })

    it("Should call UsersModel.find", async() => {

        await UsersController.getUsers(req, res, next);
        expect(UsersModel.find).toBeCalledWith({});
    });

    it("Should return status 200", async() => {
        UsersModel.find.mockReturnValue(users);
        await UsersController.getUsers(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it("Should return json body in response", async() => {
        UsersModel.find.mockReturnValue(users);
        await UsersController.getUsers(req, res, next);
        expect(typeof Array.isArray(res)).toBeTruthy();
    });

    it("Should handle Errors", async() => {
        const errorMessage = {message:"Please Check the input"};
        const rejectedPromise = Promise.reject(errorMessage);
        UsersModel.create.mockReturnValue(rejectedPromise);
        await UsersController.createUser(req, res, next);
        expect(next).toBeCalledWith(errorMessage);

    });


})

describe("UsersController.getUserById", () => {

    beforeEach(() => {
        req.params.userId = "65099259fd1b170f97c355a9";
    })

    it("Should have a getUserById Function", () => {
        expect(typeof UsersController.getUserById).toBe("function");
    })

    it("Should call UsersModel.findById", async() => {
        await UsersController.getUserById(req, res, next);
        expect(UsersModel.findById).toBeCalledWith("65099259fd1b170f97c355a9");
    });

    it("Should return status 200", async() => {
        UsersModel.findById.mockReturnValue(newUser);
        await UsersController.getUserById(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it("Should return json body in response", async() => {
        UsersModel.findById.mockReturnValue(newUser);
        await UsersController.getUserById(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newUser);
    });



})

describe("UsersController.updateUser", () => {

    beforeEach(() => {
        req.params.userId = "65099259fd1b170f97c355a9";
        req.body = newUser;
    })

    it("Should have a updateUser Function", () => {
        expect(typeof UsersController.updateUser).toBe("function");
    })

    it("Should call UsersModel.findByIdAndUpdate", async() => {
        await UsersController.updateUser(req, res, next);
        expect(UsersModel.findByIdAndUpdate).toBeCalledWith(req.params.userId,req.body,{
            new:true,
            findAndModify:false
        });
    });

    it("Should return status 200", async() => {
        UsersModel.findByIdAndUpdate.mockReturnValue(newUser);
        await UsersController.updateUser(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it("Should return json body in response", async() => {
        UsersModel.findByIdAndUpdate.mockReturnValue(newUser);
        await UsersController.updateUser(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newUser);
    });



})

describe("UsersController.deleteUser", () => {

    beforeEach(() => {
        req.body = newUser;
    })

    it("Should have a updateUser Function", () => {
        expect(typeof UsersController.deleteUser).toBe("function");
    })

    it("Should call UsersModel.findByIdAndDelete", async() => {
        await UsersController.deleteUser(req, res, next);
        expect(UsersModel.findByIdAndDelete).toBeCalledWith(req.params.userId);
    });

    it("Should return status 200", async() => {
        UsersModel.findByIdAndDelete.mockReturnValue(newUser);
        await UsersController.deleteUser(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it("Should return json body in response", async() => {
        UsersModel.findByIdAndDelete.mockReturnValue(newUser);
        await UsersController.updateUser(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newUser);
    });



})