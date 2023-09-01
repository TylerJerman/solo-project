import { User, Item, db } from './model.js';

await db.sync({ force: true})

  await Item.create({
    item_Id: 1,
    item_Name: 'Gumbo Tee',
    item_Definition: 'Made from the finest wool...',
    price: 19.99
  });

  await Item.create({
    item_Id: 2,
    item_Name: 'Gumbo Shorts',
    item_Definition: 'Made from the best materials...',
    price: 15.99
  });

  await Item.create({
    item_Id: 3,
    item_Name: 'Gumbo Hat',
    item_Definition: 'This is the coolest hat...',
    price: 10.99
  });

  await User.create({
    user_Id: 1,
    username: 'tylerjerman',
    password: 'jylerterman'
  });

  await db.close()
