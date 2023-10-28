/// <reference types= "cypress" />

describe("Api Testing", () => {
  //Defining Variables
  const randomISBN = Math.floor(Math.random() * 7574);
  const randomAISLE = Math.floor(Math.random() * 718);
  const url = "https://rahulshettyacademy.com/Library";

  //
  const namePrefixesArray = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."];

  const randomNames = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eva",
    "Frank",
    "Grace",
    "Hannah",
    "Isaac",
    "Julia",
  ];

  const randomLastNames = [
    "Smith",
    "Johnson",
    "Brown",
    "Lee",
    "Davis",
    "Wilson",
    "Moore",
    "Garcia",
    "Martinez",
    "Robinson",
  ];

  const randomBookNames = [
    "The Enigmatic Prophecy",
    "Echoes of Eternity",
    "Shadows in the Mist",
    "Whispers of the Abyss",
    "Secrets of the Forgotten Realm",
    "Chronicles of the Lost City",
    "The Twilight Conspiracy",
    "Sins of the Silent Forest",
    "The Cryptic Chronicles",
    "Quest for the Elusive Relic",
  ];

  let randomPrefix = Math.floor(Math.random() * 5);
  let randomFN = Math.floor(Math.random() * randomNames.length);
  let randomLN = Math.floor(Math.random() * randomLastNames.length);
  let randomBN = Math.floor(Math.random() * randomBookNames.length);

  const deleteRequestBody = {
    ID: `${randomISBN}${randomAISLE}`,
  };

  const postRequestBody = {
    name: randomBookNames[randomBN],
    isbn: randomISBN,
    aisle: randomAISLE,
    author: `${namePrefixesArray[randomPrefix]} ${randomNames[randomFN]} ${randomLastNames[randomLN]}`,
  };

  it("Test Post Method", () => {
    cy.request({
      method: "POST",
      url: url + "/Addbook.php",
      body: postRequestBody,
    }).then((res) => {
      cy.log(res.body);
      expect(res.status).to.eq(200);
      expect(res.body.Msg).to.eq("successfully added");
    });
  }); //Post

  it("Test Get Method", () => {
    cy.request({
      method: "GET",
      url: url + `/GetBook.php?ID=${randomISBN}${randomAISLE}`,
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body[0].book_name).to.eq(postRequestBody.name);
      expect(parseInt(res.body[0].isbn)).to.eq(postRequestBody.isbn);
      expect(parseInt(res.body[0].aisle)).to.eq(postRequestBody.aisle);
      expect(res.body[0].author).to.eq(postRequestBody.author);
      cy.log(res.body[0]);
    });
  }); //Get

  it("Test Delete Method", () => {
    cy.request({
      method: "DELETE",
      url: url + "/DeleteBook.php",
      body: deleteRequestBody,
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.msg).to.eq("book is successfully deleted");
      cy.log(res.body);
    });
  }); //Delete
});
