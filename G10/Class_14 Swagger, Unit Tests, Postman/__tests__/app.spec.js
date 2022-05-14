const app = require("../app");
const request = require("supertest");

describe("APP", () => {
  describe("/books", () => {
    test("GET /books returns 200 status", async () => {
      const response = await request(app).get("/books").send();
      expect(response.statusCode).toBe(200);
    });
    test("GET /books returns correct data", async () => {
      const response = await request(app).get("/books").send();
      expect(response.body).toEqual([
        {
          id: 1,
          name: "Harry Poter 1",
          author: "J.K. Rolling",
        },
        {
          id: 2,
          name: "Harry Poter 2",
          author: "J.K. Rolling",
        },
      ]);
    });

    test("GET /users returns correct data", async () => {
      const response = await request(app).get("/books").send();
      expect(response.headers["content-type"]).toContain("application/json");
    });
  });

  describe("/books/:id", () => {
    test("GET /users/2 returns correct results", async () => {
      const response = await request(app).get("/books/2").send();
      expect(response.body).toEqual({
        id: 2,
        name: "Harry Poter 2",
        author: "J.K. Rolling",
      });
      expect(response.statusCode).toBe(200);
    });
    test("GET /users/4 returns 404", async () => {
      const response = await request(app).get("/books/4").send();
      expect(response.body).toEqual({ message: "No book found with that id" });
      expect(response.statusCode).toBe(404);
    });
  });

  describe("POST /books", () => {
    test("Post /books returns correct response", async () => {
      const response = await request(app).post("/books").send({
        name: "Goces Book",
        author: "Goce Kabov",
      });
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({ success: true, id: 3 });
    });
  });
});
