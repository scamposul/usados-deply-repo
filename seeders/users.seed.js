const { faker } = require("@faker-js/faker");
const { encryptPassword } = require("../helpers/encryptPassword");
const crypto = require("crypto");

const userSeed = async () => {
  const users = [];
  const usersPassword = await encryptPassword("1234");

  for (let i = 0; i < 30; i++) {
    const createdAt = faker.date.recent();
    const user = {
      id: faker.datatype.uuid(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.helpers.unique(faker.internet.email, [
        this.firstName,
        this.lastName,
      ]),
      profileImage: "https://unsplash.com/photos/b5JksapY8pM",
      phone: faker.phone.number("3##-###-####"),
      password: usersPassword,
      verificationToken: crypto.randomBytes(40).toString("hex"),
      verified: true,
      createdAt,
      updatedAt: createdAt,
    };

    users.push(user);
  }

  return users;
};

module.exports = userSeed;
