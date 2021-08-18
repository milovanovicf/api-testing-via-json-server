/// <reference types='cypress' />

describe("Post Request", () => {
  var titleOFPosts = new Array();
  let randomTitle =
    Math.random()
      .toString(36)
      .substring(1) +
    Math.random()
      .toString(36)
      .substring(1);

  it("Create a new post via /posts api", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/posts/",
      body: {
        title: randomTitle,
        author: "Filip",
      },
    }).then((response) => {
      expect(response.status).to.eql(201);
    });
  });
  it("Validate title of latest post", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/posts/",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => {
        let body = JSON.parse(JSON.stringify(response.body));
        body.forEach(function(item) {
          titleOFPosts.push(item["title"]);
        });
      })
      .then(() => {
        var latestPost = titleOFPosts[titleOFPosts.length - 1];
        expect(latestPost).to.eq(randomTitle);
      });
  });
});
