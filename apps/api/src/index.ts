import { log } from "@repo/logger";
import { createServer } from "./server";
//@ts-ignore
import bcrypt from "bcrypt";

const port = process.env.PORT || 5001;
const server = createServer();

type UserData = {
  username: string;
  name?: string;
  password: string;
  created_at: string;
};

const userData: UserData[] = [];

server.get("/", (req, res) => {
  res.send("HELLO WORLD");
});

//login
server.post("/login", (req, res) => {
  const body = req.body;

  const selectUser = userData.find((value) => value.username === body.username);

  if (!selectUser) {
    res.status(404);
    res.json({
      status: 404,
      message: "User not found",
    });
  }

  const comparePass = bcrypt.compareSync(body.password, selectUser?.password);
  if (!comparePass) {
    res.status(401);
    res.json({
      status: 401,
      message: "password is incorrect!",
    });
  }

  res.json({
    status: 200,
    message: "sign in sucessfull!",
    data: selectUser,
  });
});

//register
server.post("/register", (req, res) => {
  const body = req.body;

  if (!!userData.find((value) => value.username === body.username)) {
    res.status(409);
    res.json({
      status: 409,
      message: "username already exist!",
    });
  }

  const hashedPass = bcrypt.hashSync(body.password, 10);

  const data: UserData = {
    username: body.username,
    password: hashedPass,
    name: body.name,
    created_at: Date.now().toString(),
  };
  userData.push(data);

  res.json({
    status: 200,
    message: "success creating new account!",
    data,
  });
});

server.get("/user/:username", (req, res) => {
  const username = req.params["username"];

  const findUser = userData.find((value) => value.username === username);

  res.send({
    status: 200,
    message: "success",
    data: findUser,
  });
});

server.listen(port, () => {
  log(`api running on ${port}`);
});
