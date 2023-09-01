import { User, Item, db } from './model.js';

await db.sync({ force: true})

// export async function seedDatabase() {

  // Create a new Item 'Gumbo Tee' and assign it to variable gumboTee
  await Item.create({
    item_Id: 1,
    item_Name: 'Gumbo Tee',
    item_Definition: 'Made from the finest wool...',
    price: 19.99
  });

  // Create a new Item 'Gumbo Shorts' and assign it to variable gumboShorts
  await Item.create({
    item_Id: 2,
    item_Name: 'Gumbo Shorts',
    item_Definition: 'Made from the best materials...',
    price: 15.99
  });

  // Create a new Item 'Gumbo Hat' and assign it to variable gumboHat
  await Item.create({
    item_Id: 3,
    item_Name: 'Gumbo Hat',
    item_Definition: 'This is the coolest hat...',
    price: 10.99
  });

  // Create a new User 'Tyler Jerman' and assign it to variable tylerJ
  await User.create({
    user_Id: 1,
    username: 'tylerjerman',
    password: 'jylerterman'
  });

  await db.close()

  // Find the User with user_Id of 1 and assign it to variable admin
  // const admin = await User.findOne({ user_Id: 1 });

  // Return the created items and users
//   return { gumboTee, gumboHat, gumboShorts, tylerJ, admin };
// }

// Call the seedDatabase function, and handle success and failure cases
// seedDatabase().then(results => {
//   console.log("Database seeded successfully"); // Log success message
// }).catch(error => {
//   console.error("Error seeding database:", error); // Log error message
// });

// Exports
// export { gumboTee, gumboHat, gumboShorts, tylerJ, admin };