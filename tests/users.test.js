const supertest = require("supertest");
const app = require("../app");
const Users = require("../models/users.model");

const api = supertest(app);

describe("Pruebas a la ruta /register", () => {
  const newUser = {
    fristName: "nemesio",
    lastName: "camacho",
    email: "nemesio@gmail.com",
    phone: "1234567891",
    password: "1234",
    password2: "1234",
  };
  test("Probar que un post a /register crea un nuevo usuario", async () => {
    await api.post("/user/register").send(newUser).expect(201);
    Users.destroy({ where: { email: newUser.email } });
  });
  test("Comprobar la información del usuario creado", async () => {
    const { body } = await api.post("/user/register").send(newUser);
    expect(body.body.user.email).toEqual(newUser.email);
  });
});

describe("Pruebas para la ruta /login", () => {
  const credentials = {
    email: "nemesio@gmail.com",
    password: "1234",
  };
  const fakeCredentials = {
    email: "nemesio@gmail.com",
    password: "1235",
  };
  test("Probar que un post a /login con credenciales correctas retorna un status 200", async () => {
    await api
      .post("/user/login")
      .send(credentials)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("Probar que un post a /login con credenciales incorrectas retorna un status 401", async () => {
    await api.post("/user/login").send(fakeCredentials).expect(401);
  });
});

describe("Pruebas a /all", () => {
  test("Probar que un get a /all retorna un json", async () => {
    await api
      .get("/user/all")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("Probar que un get a /all retorna un arreglo", async () => {
    const { body } = await api.get("/user/all");
    expect(body.body).toBeInstanceOf(Array);
  });
});

describe("Pruebas a la ruta /:id", () => {
  test("Probar que un get a /1 retorna un status 200", async () => {
    await api
      .get("/user/1")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("Probar que un get a /1 retorna un objeto", async () => {
    const res = await api.get("/user/1");
    expect(res.body).toBeInstanceOf(Object);
  });
});
describe("Pruebas a la ruta /edit/:id", () => {
  const oldInfo = {
    fristName: "Anselmo",
  };
  const newInfo = {
    fristName: "Temístocles",
  };
  test("Probar que un put a /edit/1 retorna un status 200", async () => {
    await api
      .put("/user/edit/1")
      .send(newInfo)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("Comprobar la información del usuario editado", async () => {
    const { body } = await api.put("/user/edit/1").send(oldInfo);
    expect(body.body.fristName).toEqual(oldInfo.fristName);
  });
});
describe("Pruebas a la ruta /delete/:id", () => {
  test("Probar que un delete a /user/delete/1 retorna un status 200", async () => {
    await api
      .delete("/user/delete/1")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});
afterAll(async () => {
  await Users.destroy({
    where: {
      email: "nemesio@gmail.com",
    },
  });
  await Users.create({
    id: 1,
    fristName: "Anselmo",
    lastName: "Riquelme",
    email: "anselmoriquelme@gmail.com",
    phone: "1234567890",
    password: "1234",
    password2: "1234"
  });
});