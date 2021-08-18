/// <reference types='cypress' />

describe("Update Request", () => {
  it("Update an existing post via /posts api", () => {
    cy.request({
      method: "PUT",
      url: "http://localhost:3000/posts/2",
      body: {
        title: "Where can i buy apples?",
        author: "Tom Jack",
      },
    }).then((response) => {
      expect(response.status).to.eql(200);
    });
  });
});
