// * 1) Display all of the items available for sale. Include the ids, 
//    names, and prices of products for sale.
// * 2) The app should then prompt users with two messages.
//   * 2a) The first should ask them the ID of the product they would 
//       like to buy.
//   * 2b) The second message should ask how many units of the product 
//       they would like to buy.
// * 3) Once the customer has placed the order, your application should 
//    check if your store has enough of the product to meet the 
//    customer's request.
//   * 3a) If not, the app should log a phrase like `Insufficient 
//       quantity!`, and then prevent the order from going through.
// * 4)  However, if your store _does_ have enough of the product, you 
//     should fulfill the customer's order.
//   * 4a) This means updating the SQL database to reflect the remaining 
//       quantity.
//   * 4b) Once the update goes through, show the customer the total 
//       cost of their purchase.

// Add required node modules.
var mysql = require("mysql");
var inquirer = require("inquirer");

// Connect to mysql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

// Connect to the DB
connection.connect(function (err) {
  if (err) throw err;
});

// Start program
start();

function start() {
  console.clear()
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    // Connection successful provided the connection ID
    for (var i = 0; i < res.length; i++) {
      console.log(`${res[i].item_id}\t`, `${res[i].product_name}\t`, `${res[i].price}\t`, `${res[i].stock_quantity}`);
    }
    purchaseProduct();
  })
}

function purchaseProduct() {
  inquirer
    .prompt([
      {
        name: "itemId",
        type: "input",
        message: "What item would you like to purchase?"
      },
      {
        name: "stock_Q",
        type: "input",
        message: "How many units would you like to purchase?"
      }
    ])
    .then(function (answer) {
      var newQuantity;
      var totalPrice;
      connection.query("SELECT * FROM products WHERE item_id = ? ", [answer.itemId], function (err, res) {
        if (err) throw err;
        // If quanty is available update database with new stock quantity.
        if (answer.stock_Q < res[0].stock_quantity) {
          // Find the new quantity
          newQuantity = res[0].stock_quantity - answer.stock_Q;
          totalPrice = res[0].price * answer.stock_Q
          console.log(` Product: ${res[0].product_name}\n`, 
                      `Price: ${res[0].price}\n`, 
                      `Quantity Ordered: ${answer.stock_Q}\n`, 
                      `Total Price: $${totalPrice.toFixed(2)}`);
          connection.query("UPDATE products SET ? WHERE ?", [{ stock_quantity: newQuantity }, { item_id: answer.itemId }], function (error) {
            if (error) throw err;
          });
        } else {
          console.log(`Insufficient quantity!`);
        }
        
        // Run the program again?

        inquirer
          .prompt([
            {
              name: "again",
              type: "input",
              message: "Do you want to place another order? (y/n)",
            }
          ])
          .then(function (answer) {
            if (answer.again === "y") {
              start();
            } else {
              console.log(`Thank you for shopping at Bamazon!\n\nHave a great day!`)
              connection.end()
            }
          })
      })
    })
}