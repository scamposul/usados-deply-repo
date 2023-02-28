const supertest = require("supertest");
const app = require("../app");
const Cars = require("../models/cars.model");

const api = supertest(app);

const newCar = {
  year: 2020,
  brand: "Renault",
  model: "Logan",
  color: "white",
  transmission: "mechanic",
  doors: "4",
  engine_capacity: "1.4 L",
  km: 50000,
  last_plate: 4,
  city: "Riohacha",
  price: 40000000,
  seller_id: 1,
  type: "sedan",
  fuel: "petrol",
};

describe("Pruebas a la ruta /post", () => {
  test("Probar que un post a /vehicles/post retorna un status 201", async () => {
    await api
      .post("/vehicles/post")
      .send(newCar)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });
  Cars.destroy({
    where: {
      model: "Logan",
    },
  });
  test("Comprobar la información enviada", async () => {
    const { body } = await api.post("/vehicles/post").send(newCar);
    expect(body.body.model).toEqual("Logan");
  });
});

describe("Pruebas a la ruta /all", () => {
  test("Probar que un get a /vehicles/all retorna un status 200", async () => {
    await api
      .get("/vehicles/all")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("Probar que un get a /vehicles/all retorna un arreglo", async () => {
    const { body } = await api.get("/vehicles/all");
    expect(body.body).toBeInstanceOf(Array);
  });
});

describe("Pruebas a la ruta /all/:seller_id", () => {
  test("Probar que un get a /vehicles/all/1 retorna un status 200", async () => {
    await api
      .get("/vehicles/all/1")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("Probar que un get a /vehicles/all/1 retorna un arreglo", async () => {
    const { body } = await api.get("/vehicles/all/1");
    expect(body.body).toBeInstanceOf(Array);
  });
  test("Comprobar la información solicitada", async () => {
    const { body } = await api.get("/vehicles/all/1");
    for (let i = 0; i < body.body.length; i++) {
      const index = body.body.findIndex((object) => object.seller_id === 1);
      expect(body.body[index].seller_id).toEqual(1);
    }
  });
});

describe("Pruebas a la ruta /edit/:id", () => {
  const newInfo = {
    color: "white",
  };
  const oldInfo = {
    color: "black",
  };
  test("Probar que un put a /vehicles/edit/1 retorna un status 200", async () => {
    await api
      .put("/vehicles/edit/1")
      .send(newInfo)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("Comprobar la información editada", async () => {
    const { body } = await api.put("/vehicles/edit/1").send(oldInfo);
    expect(body.body.color).toEqual(oldInfo.color);
  });
});

describe("Pruebas a la ruta /remove/:id", () => {
  test("Probar que un delete a /vehicles/remove/1 retorna un status 200", async () => {
    await api
      .delete("/vehicles/remove/1")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

afterAll(async () => {
    await Cars.destroy({
        where: {model: "Logan"}
    });
    await Cars.create({
        year: 2021,
        brand: "Toyota",
        model: "Supra",
        color: "black",
        transmission: "automatic",
        doors: "3",
        engine_capacity: "5.0 L",
        km: 50000,
        last_plate: 1,
        city: "Barranquilla",
        price: 200000000,
        seller_id: 1,
        type: "coupe",
        fuel: "petrol",
        images:
          ["https://picolio.auto123.com/auto123-media/articles/2020/12/67715/Toyota-GR-Supra-30-2021%20(17)fr.jpg?crop=0,682,2998,999&amp;scaledown=1024"],
      });
});
