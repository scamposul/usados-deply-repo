const { faker } = require("@faker-js/faker");

const reviewsSeed = (sellerIds, carIds) => {
  const reviews = [];

  for (let i = 0; i < 30; i++) {
    const createdAt = faker.date.recent();
    const review = {
      id: faker.datatype.uuid(),
      rating: faker.datatype.number({ min: 1, max: 5 }),
      title: faker.lorem.sentence(3),
      comment: faker.lorem.sentences(2),
      seller_id: faker.helpers.arrayElement(sellerIds),
      car_id: faker.helpers.arrayElement(carIds),
      createdAt,
      updatedAt: createdAt,
    };

    reviews.push(review);
  }

  return reviews;
};

module.exports = reviewsSeed;
