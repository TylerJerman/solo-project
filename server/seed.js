// Import the Item and User models from model.js
import { Item, User } from './model.js';

// Define an asynchronous function to seed the database
async function seedDatabase() {

  // Create a new Item 'Gumbo Tee' and assign it to variable gumboTee
  const gumboTee = await Item.create({
    item_Id: 1,
    item_Name: 'Gumbo Tee',
    item_Description: 'Made from the finest wool...',
    price: 19.99
  });

  // Create a new Item 'Gumbo Shorts' and assign it to variable gumboShorts
  const gumboShorts = await Item.create({
    item_Id: 2,
    item_Name: 'Gumbo Shorts',
    item_Description: 'Made from the best materials...',
    price: 19.99
  });

  // Create a new Item 'Gumbo Hat' and assign it to variable gumboHat
  const gumboHat = await Item.create({
    item_Id: 3,
    item_Name: 'Gumbo Hat',
    item_Description: 'This is the coolest hat...',
    price: 19.99
  });

  // Create a new User 'Tyler Jerman' and assign it to variable tylerJ
  const tylerJ = await User.create({
    user_Id: 1,
    email_Id: 'tyler.s.jerman@gmail.com',
    first_Name: 'Tyler',
    last_Name: 'Jerman'
  });

  // Find the User with user_Id of 1 and assign it to variable admin
  const admin = await User.findOne({ user_Id: 1 });

  // Return the created items and users
  return { gumboTee, gumboHat, gumboShorts, tylerJ, admin };
}

// Call the seedDatabase function, and handle success and failure cases
seedDatabase().then(results => {
  console.log("Database seeded successfully"); // Log success message
}).catch(error => {
  console.error("Error seeding database:", error); // Log error message
});

// Export the variables to make them available in other parts of your application
export { gumboTee, gumboHat, gumboShorts, tylerJ, admin };