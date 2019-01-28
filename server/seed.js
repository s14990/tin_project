const mongoose = require('mongoose');

const db = require('./models')
const md5 = require('md5');

const users = [
  { username: 'Admin', password: md5('password'), email: 's14990@pjwstk.edu.pl', isvalidated: true ,rank: "admin"},
  { username: 'testuser1', password: md5('password2'), email: 'dimonus2798@gmail.com' }
];
const medicines = [
  { med_name: 'Medicine1' },
  { med_name: 'Med2' }
];
const ingredients = [
  { ingr_name: 'Ingredient1' },
  { ingr_name: 'Ingr2' }
];

const seed = async function () {
  try {
    //Add User
    await db.User.remove({});
    console.log('Removed all Users');
    users.map(async function (user) {
      const newuser = await db.User.create(user);
      await newuser.save();
    });
    console.log('Created users');

    //Add Medicine
    await db.Medicine.remove({});
    console.log('Removed all Med');
    medicines.map(async function (med) {
      const newmed = await db.Medicine.create(med);
      await newmed.save();
    });
    console.log('Created Meds');

    //Add ingredients
    await db.Ingredient.remove({});
    console.log('Removed all Ingredients');
    ingredients.map(async function (ingr) {
      const newingr = await db.Ingredient.create(ingr);
      await newingr.save();
    });
    console.log('Created Ingr');

    //Add Receipt
    await db.Receipt.remove({});
    console.log('Removed all Receipts');
    const med1= await db.Medicine.findOne({ med_name: 'Medicine1' });
    const med2= await db.Medicine.findOne({ med_name: 'Med2' });
    const ingr1= await db.Ingredient.findOne({ ingr_name: 'Ingredient1' });
    const ingr2= await db.Ingredient.findOne({ ingr_name: 'Ingr2' });
    const receipts = [
      { med: med1, ingr: ingr1, mass: '10g'},
      { med: med1, ingr: ingr2, mass: '20g'},
      { med: med2, ingr: ingr1, mass: '5g'}
    ]
    receipts.map(async function (rec) {
      const newrec = await db.Receipt.create(rec);
      await newrec.save();
    });
    console.log('Created Receipts');

  } catch (err) {
    console.error(err);
  }
  //Add Order
  await db.Order.remove({});
  console.log('Removed all Orders');
  const med1= await db.Medicine.findOne({ med_name: 'Medicine1' });
  const med2= await db.Medicine.findOne({ med_name: 'Med2' });
  const user2 = await db.User.findOne({ username: 'testuser1' });
  const orders = [
    { med: med1, user: user2,status:"Waiting"},
    { med: med2, user: user2,status:"Completed"}
  ]
  orders.map(async function (order) {
    const neworder = await db.Order.create(order);
    await neworder.save();
  });
  console.log('Created Orders');

//Storage
  await db.Storage.remove({});
  console.log('Removed all Storage');
  const strs = [
    { med: med1, number:"21",status:"Waiting"},
    { med: med2, number:"33",status:"Completed"}
  ]
  strs.map(async function (str) {
    const newstr = await db.Storage.create(str);
    await newstr.save();
  });
  console.log('Created Storages');
//Price
  await db.Price.remove({});
  console.log('Removed all Prices')
  const prices = [
    { med: med1, cena:"21zl"},
    { med: med2, cena:"33$"}
  ]
  prices.map(async function (price) {
    const newpr = await db.Price.create(price);
    await newpr.save();
  });
  console.log('Created Prices');

}

seed();