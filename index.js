// Import readlineSync module for user input
const readlineSync = require("readline-sync");

// Import the products array from the products module
const products = require("./products");

// Import the colors
const colors = require("colors");

//! products.js
// const products = [
//   { id: 1, name: "computer", price: 10 },
//   { id: 2, name: "mouse", price: 20 },
//   { id: 3, name: "keyboard", price: 30 },
//   { id: 4, name: "monitor", price: 10 },
//   { id: 5, name: "mic", price: 20 },
//   { id: 6, name: "headset", price: 30 },
//   { id: 7, name: "Product A", price: 10 },
//   { id: 8, name: "iphone", price: 20 },
//   { id: 9, name: "charger", price: 30 },
// ];

// Function to list products with colored output
async function listProducts() {
  // Dynamically import the chalk module for coloring terminal output
  const chalk = (await import("chalk")).default;
  // Print a heading in blue color
  console.log(chalk.underline.bold("Available Products:".rainbow));
  // Iterate over each product in the products array
  products.forEach((product) => {
    // Print each product's details with ID in green, Name in yellow, and Price in cyan
    console.log(
      `ID: ${chalk.green(product.id)}, Name: ${chalk.yellow(
        product.name
      )}, Price: ${chalk.cyan(product.price)}`
    );
  });
}

// Function to add a new product
async function addProduct() {
  // Dynamically import the chalk module for coloring terminal output
  const chalk = (await import("chalk")).default; //It pauses the execution of the function until the promise is resolved and returns the module object.
  // Prompt user to enter product name
  const name = readlineSync.question("Enter product name: ");
  // Prompt user to enter product price and convert it to a float
  const price = parseFloat(readlineSync.question("Enter product price: "));
  // Determine the new product's ID by incrementing the last product's ID or setting to 1 if no products exist
  const id = products.length ? products[products.length - 1].id + 1 : 1;
  // Add the new product to the products array
  products.push({ id, name, price });
  // Print a success message in green color
  console.log(chalk.green("Product added successfully!"));
}

// Function to delete a product
async function deleteProduct() {
  // Dynamically import the chalk module for coloring terminal output
  const chalk = (await import("chalk")).default;
  // Prompt user to enter the ID of the product to delete
  const productId = readlineSync.question(
    "Enter the ID of the product to delete: "
  );

  // Find the index of the product with the given ID
  const index = products.findIndex(
    (product) => product.id === parseInt(productId)
  );

  if (index !== -1) {
    // Remove the product from the array
    products.splice(index, 1);
    console.log(chalk.green("Product deleted successfully!"));
  } else {
    console.log(chalk.red("Product not found with that ID."));
  }
}

// Function to display the main menu and handle user choices
async function mainMenu() {
  // Dynamically import the chalk module for coloring terminal output
  const chalk = (await import("chalk")).default;
  while (true) {
    // Infinite loop to keep displaying the menu until the user chooses to exit
    // Print menu options in magenta color
    console.log(
      chalk.magenta(
        "\n1. List Products\n2. Add Product\n3. Delete Product\n4. Exit"
      )
    );
    // Prompt user to choose an option
    const choice = readlineSync.question("Choose an option: ");

    // Handle user's choice
    switch (choice) {
      case "1":
        // List products if user chooses option 1
        await listProducts();
        break;
      case "2":
        // Add a product if user chooses option 2
        await addProduct();
        break;
      case "3":
        // Delete a product if user chooses option 3
        await deleteProduct();
        break;
      case "4":
        // Exit the menu and print a goodbye message in red color if user chooses option 4
        console.log(chalk.red(" See you soon  , Goodbye!"));
        return; // Exit the function, breaking the infinite loop
      default:
        // Print an error message in red color if user enters an invalid option
        console.log(chalk.red("Invalid choice, please try again."));
    }
  }
}

// Call the mainMenu function to start the program
mainMenu();
