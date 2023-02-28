const supertest = require("supertest");
const app = require("../app");
const Messages = require("../models/messages.model");

const api = supertest(app);

describe("Pruebas a la ruta /chat", () => {
  test("Probar que un post messages/chat retorna un status 201", async () => {
    await api
      .post("/messages/chat")
      .send({ message: "Hola, que tal", sender_id: 1, car_id: 1 })
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });
  test("Comprobar la información del mensaje enviado", async () => {
    const { body } = await api
      .post("/messages/chat")
      .send({ message: "Bien, ¿Y tú?", sender_id: 2, car_id: 1 });
    expect(body.body.message).toEqual("Bien, ¿Y tú?");
  });
});

describe("Pruebas a la ruta /:car_id/:sender_id", () => {
  test("Probar que un get a /messages/1/1 retorna un status 200", async () => {
    await api
      .get("/messages/1/1")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("Comprobar la información solicitada", async () => {
    const { body } = await api.get("/messages/1/1");
    const messageIndex = body.body.findIndex(
      (object) => object.message === "Hola, que tal"
    );
    expect(body.body[messageIndex].message).toEqual("Hola, que tal");
  });
});

describe("Pruebas a la ruta /chat/:id", () => {
  test("Probar que un put a chat/1 retorna un status 200", async () => {
    await api
      .put("/messages/chat/1")
      .send({ message: "Ya no quiero hablar contigo" })
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("Comprobar el mensaje editado", async () => {
    const {body} = await api.put("/messages/chat/1").send({message: "Mentiras, sí quiero"});
    expect(body.body.message).toEqual("Mentiras, sí quiero");
  });
  test("Probar que un delete a chat/1 retorna un status 200", async () => {
    await api.delete("/messages/chat/1").expect(200);
  })
});

// afterAll(async () => {
//     await Messages.destroy({
//         where: {car_id: 1}
//     })
// })
