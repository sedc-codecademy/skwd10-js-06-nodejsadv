const service = require("./demoTest");

describe("DEMO", () => {
  // describe("SUM TWO NUMBERS", () => {

  // })

  test("Sum two numbers", () => {
    const result = service.sumTwoNumbers(10, 5);
    expect(result).toEqual(15);
  });

  test("SayHi", () => {
    const result = service.sayHi("Goce Kabov");
    expect(result).toBe("Hi there Goce Kabov");
  });
});
