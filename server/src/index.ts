import express from 'express';
import { AppDataSource } from './data-source';
import { User } from './entity/User';
const app = express();
const port = 3005;

app.get('/', (req, res) => {
  res.send('Hello World!');
});


AppDataSource.initialize()
    .then(async (connection: any) => {
        console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.dateOfBirth = new Date("2019-01-16");
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");
    })
    .catch((error: unknown) => console.log(error))

    

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});