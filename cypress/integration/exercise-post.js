/// <reference types='cypress' />

describe("Post, Get, Delete Requests", () => {
  let randomString = Math.random()
    .toString(36)
    .substring(2);
  let randomNumber = Math.trunc(Math.random() * 1000 + 1);
  let comments = new Array();
  it("Create a new comment", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/comments/",
      body: {
        body: randomString,
        postId: randomNumber,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
  });
  it("Locate and assert the new comment", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/comments/",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => {
        let body = JSON.parse(JSON.stringify(response.body));
        body.forEach(function(item) {
          comments.push(item["body"]);
        });
      })
      .then(() => {
        var latestPost = comments[comments.length - 1];
        expect(latestPost).to.eq(randomString);
      });
  });

  it("Delete new comment", () => {
    //if you delete one comment it deletes all of them
    cy.request({
      method: "DELETE",
      url: "http://localhost:3000/comments/" + comments.length,
    }).then((response) => {
      expect(response.status).to.eql(200);
    });
  });
});
