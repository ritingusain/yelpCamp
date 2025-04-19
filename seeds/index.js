const { places, descriptors } = require('./seedHelpers')
const mongoose = require('mongoose')
const Campground = require('../models/campground')

const cities = require('./cities')


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/yelp-camp');
  console.log("Database Connected")
}
const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000)
    const price = Math.floor(Math.random() * 30) + 10
    const camp = new Campground({
      //Your USER ID
      author: '67fd210f31d17958781a34bd',
      location: `${cities[random1000].city},${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude
        ]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dacbdqf0i/image/upload/v1744805203/YelpCamp/f7r1aovbvzgfzvl5mvhu.jpg',
          filename: 'YelpCamp/f7r1aovbvzgfzvl5mvhu',
        },
        {
          url: 'https://res.cloudinary.com/dacbdqf0i/image/upload/v1744803340/YelpCamp/ezumt4jkrzzls1katbuo.jpg',
          filename: 'YelpCamp/ezumt4jkrzzls1katbuo',
        },
      ],
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut nihil provident, iure eum aliquam soluta dolor incidunt molestias a natus!',
      price
    })
    await camp.save()
  }
}
seedDb();
