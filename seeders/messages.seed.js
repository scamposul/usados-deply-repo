const { faker } = require("@faker-js/faker");

const messagesSeed = (senderIds, carIds) => {
  const messages = [];

  for (let i = 0; i < 10; i++) {
    const createdAt = faker.date.recent();
    const message = {
      id: faker.datatype.uuid(),
      message: faker.lorem.sentences(2),
      sender_id: faker.helpers.arrayElement(senderIds),
      car_id: faker.helpers.arrayElement(carIds),
    };

    messages.push(message);
  }

  return messages;
};

module.exports = messagesSeed;
