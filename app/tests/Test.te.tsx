
const {Product, capitalizeFirstLetter} = require("./classes");

describe("Product class", () => {

  test("creates product correctly", () => {

    const product = new Product("iPhone17ProMaxUltraYou", 12323, 2, "electronics", false);

    expect(product.name).toBe("iPhone17ProMaxUltraYou");
    expect(product.price).toBe(12323);
    expect(product.quantity).toBe(2);
  });

//   test("usedStatus returns Yes", () => {
//     const product = new Product("MacBook", 23321, 1, "tech", true);

//     expect(product.usedStatus).toBe("Yes");
//   });

//   test("usedStatus returns No", () => {
//     const product = new Product("MacBook", 12424, 1, "tech", false);

//     expect(product.usedStatus).toBe("No");
//   });

//   test("toHTMLRow generates HTML", () => {
//     const product = new Product("Mouse", 20, 5, "accessories", false);

//     const html = product.toHTMLRow();

//     expect(html).toContain("<td>Mouse</td>");
//     expect(html).toContain("<td>Accessories</td>");
//     expect(html).toContain("<td>No</td>");
//   });

// });

// describe("capitalizeFirstLetter", () => {

//   test("capitalizes word", () => {
//     expect(capitalizeFirstLetter("books")).toBe("Books");
//   });

//   test("empty string", () => {
//     expect(capitalizeFirstLetter("")).toBe("");
//   });

//   test("null value", () => {
//     expect(capitalizeFirstLetter(null)).toBe("");
//   });

});