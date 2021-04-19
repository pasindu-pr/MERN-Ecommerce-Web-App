import Product from "../Models/productModel.js";
import connectDatabase from "../MongoDB/connectDB.js";
import dotenv from "dotenv";

const products = [
  {
    name: "LG 65' Class 4K UHD 2160P Smart TV 65UN6950ZUA 2020 Model",
    image: "/images/products/television.png",
    price: 300,
    description:
      "Put your entertainment on full display. Available in a variety of sizes, LG UHD TV (UN6950) is engineered with real 4K displays for four times the resolution of standard TV. Its processor enhances color, contrast, clarity and detail, while compatibility with smart assistants like Google home and Alexa allows for convenient voice control.",
    rating: 5,
    reviews: [],
    numOfReviews: 0,
    category: "Televisions",
    brand: "LG",
    stockCount: 5,
  },

  {
    name:
      "Lifestyle Solutions Taryn 3 Seat Upholstered Microfiber Rolled Arm Sectional Sofa",
    image: "/images/products/sofa.jpg",
    price: 380,
    description:
      "The Taryn Sectional Sofa is the 3 Seat set designed to fit your space and style. Built for lasting quality, the Taryn combines form, function and ease of assembly designed for the everyday life. The design lines and scale of the Taryn sectional brings a modern touch to spaces large and small with versatile elegance. High density foam cushions with rolled arms and beautifully button tufted back surround your body with comfort and is poised to transform any room into your favorite place to let go of the day and relax in pure bliss. Combining premium Dark Grey microfiber upholstered fabric and solid eucalyptus wooden frame, this durable plush sectional invites you to rest in the knowledge of years of enjoyment to come.",
    rating: 3.6,
    reviews: [],
    numOfReviews: 0,
    category: "Furniture",
    brand: "Life Style Solutions",
    stockCount: 4,
  },

  {
    name:
      "Vintage Home & Shop Wall Lamp Indoor Lighting Knob Switch Retro Black & White Case Bedside Lamps E27",
    image: "/images/products/light.jpg",
    price: 14.8,
    description:
      "The three lights of this sleek torchiere floor lamp offer ample illumination for any space in your home. The metal design features an all-black finish paired with white plastic shades. An individual on/off switch for each light allows you to control the light output to create the ideal lighting solution for your decor.",
    rating: 4.1,
    reviews: [],
    numOfReviews: 0,
    category: "Furniture",
    brand: "Unbranded",
  },

  {
    name: "Ontainment Small Pop Crate",
    image: "/images/products/pet.jpg",
    price: 21.8,
    description:
      "Travel crates are just a necessity of life if you want to get your furry best friend on the road with you. But the usual plastic ones are quite bulky, and where do you store them when you’re not on the road? The Pop Crate from Sport Pet is the proper answer. It has a sturdy metal locking gate, with a durable turn-dial latching system to stay in place. But unlike rigid plastic travel crates, it folds down compactly thanks to a collapsible design.",
    rating: 5,
    reviews: [],
    numOfReviews: 0,
    category: "Pet Section",
    brand: "Unbranded",
  },
];

dotenv.config();

const addProducts = async () => {
  connectDatabase();

  try {
    const added = await Product.insertMany(products);

    if (added) {
      console.log("Added");
    }
  } catch (error) {
    console.log(error);
  }
};

addProducts();

export default products;
