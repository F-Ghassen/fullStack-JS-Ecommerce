"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const User_1 = require("./entity/User");
const app = (0, express_1.default)();
const port = 3005;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
data_source_1.AppDataSource.initialize()
    .then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Inserting a new user into the database...");
    const user = new User_1.User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.dateOfBirth = new Date("2019-01-16");
    yield connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);
    console.log("Loading users from the database...");
    const users = yield connection.manager.find(User_1.User);
    console.log("Loaded users: ", users);
    console.log("Here you can setup and run express/koa/any other framework.");
}))
    .catch((error) => console.log(error));
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map