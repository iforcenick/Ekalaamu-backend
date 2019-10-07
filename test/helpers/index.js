import chai from 'chai';

// Test case skeletons
const dataTestCase = (server, route, data) => {
  return chai
      .request(server)
      .post(route)
      .send(data)
};

export { dataTestCase };