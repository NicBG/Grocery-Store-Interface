import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import wishlisticon from './wishlist-svgrepo-com.svg';

/*
const CATEGORIES = [
  ["Water", "Petfood"],
  ["Tissues", "Shampoo"],
  ["Diapers", "Babyfood"],
  ["Detergent", "Cleaning Supplies", "Soap"],
  ["Toilet Paper", "Paper Plates"],
  ["Fish", "Vegtables", "Potato", "Breakfast"],
  ["Meals", "International"],
  ["Pizza", "TV Dinners", "Perogies"],
  ["Ice Cream", "Bakery"],
  ["Cereal", "Jam"],
  ["Juice", "Coffie"],
  ["Snacks", "Cookies"],
  ["Soup", "Crackers"],
  ["Canned Food"],
  ["Indian", "Rice"],
  ["Asian", "Jamacian", "Beans"],
  ["Chips", "Nuts"],
  ["Soda"],
  ["Flour", "Baking", "Spices", "Sugar"],
  ["Tomato", "Pasta", "Mexican", "Plastic"],
  ["Oil", "Dressing", "Condiments"]
];
*/
const CATEGORIES = [
  ["Water", "Petfood"],
  ["Tissues", "Shampoo"],
  ["Diapers", "Babyfood"],
  ["Cleaning Supplies"],
  ["Toilet Paper", "Paper Plates"],
  ["Fish", "Vegtables"],
  ["Meat", "Fruit"],
  ["Pizza", "Soda"],
  ["Ice Cream", "Bakery"],
  ["Cereal", "Jam"],
  ["Juice", "Coffee"],
  ["Snacks", "Canned Food"],
  ["Soup", "Crackers"],
  ["Rice", "International"],
  ["Electronics", "Beans"],
  ["Nuts", "Flowers"],
  ["Baking", "Spices"],
  ["Pasta", "Plastics"],
  ["Oils", "Dressing & Condiments"]
];

const PRODUCTS = [
  // Water
  { name: "Bottled Water 500ml", price: 1.99, category: "Water", ratings: "4", description: "Fresh Taste", image: "https://media.istockphoto.com/id/94567758/photo/baby-sumatran-orangutan-hanging-on-rope-against-white-background.jpg?s=612x612&w=0&k=20&c=BRdK1G6gVhaZ12A-zegLkJUHB9sFe_maSXTCrOjAPAQ=" },
  { name: "Spring Water 1L", price: 2.49, category: "Water", ratings: "5", description: "Natural Spring", image: "https://media.istockphoto.com/id/94567758/photo/baby-sumatran-orangutan-hanging-on-rope-against-white-background.jpg?s=612x612&w=0&k=20&c=BRdK1G6gVhaZ12A-zegLkJUHB9sFe_maSXTCrOjAPAQ=" },
  { name: "Mineral Water 750ml", price: 1.79, category: "Water", ratings: "3", description: "Rich Minerals", image: "https://media.istockphoto.com/id/94567758/photo/baby-sumatran-orangutan-hanging-on-rope-against-white-background.jpg?s=612x612&w=0&k=20&c=BRdK1G6gVhaZ12A-zegLkJUHB9sFe_maSXTCrOjAPAQ=" },
  { name: "Purified Water 1.5L", price: 2.99, category: "Water", ratings: "4", description: "Pure Hydration", image: "https://media.istockphoto.com/id/94567758/photo/baby-sumatran-orangutan-hanging-on-rope-against-white-background.jpg?s=612x612&w=0&k=20&c=BRdK1G6gVhaZ12A-zegLkJUHB9sFe_maSXTCrOjAPAQ=" },
  { name: "Sparkling Water 330ml", price: 1.49, category: "Water", ratings: "3", description: "Lively Bubbles", image: "https://media.istockphoto.com/id/94567758/photo/baby-sumatran-orangutan-hanging-on-rope-against-white-background.jpg?s=612x612&w=0&k=20&c=BRdK1G6gVhaZ12A-zegLkJUHB9sFe_maSXTCrOjAPAQ=" },
  { name: "Coconut Water 500ml", price: 2.29, category: "Water", ratings: "5", description: "Tropical Feel", image: "https://media.istockphoto.com/id/94567758/photo/baby-sumatran-orangutan-hanging-on-rope-against-white-background.jpg?s=612x612&w=0&k=20&c=BRdK1G6gVhaZ12A-zegLkJUHB9sFe_maSXTCrOjAPAQ=" },
  { name: "Flavored Watermelon Water", price: 2.79, category: "Water", ratings: "4", description: "Fruity Splash", image: "https://media.istockphoto.com/id/94567758/photo/baby-sumatran-orangutan-hanging-on-rope-against-white-background.jpg?s=612x612&w=0&k=20&c=BRdK1G6gVhaZ12A-zegLkJUHB9sFe_maSXTCrOjAPAQ=" },
  { name: "Alkaline Water 1L", price: 3.99, category: "Water", ratings: "4", description: "Balanced pH", image: "https://media.istockphoto.com/id/94567758/photo/baby-sumatran-orangutan-hanging-on-rope-against-white-background.jpg?s=612x612&w=0&k=20&c=BRdK1G6gVhaZ12A-zegLkJUHB9sFe_maSXTCrOjAPAQ=" },
  { name: "Sport Electrolyte Water", price: 2.99, category: "Water", ratings: "5", description: "Energy Boost", image: "https://media.istockphoto.com/id/94567758/photo/baby-sumatran-orangutan-hanging-on-rope-against-white-background.jpg?s=612x612&w=0&k=20&c=BRdK1G6gVhaZ12A-zegLkJUHB9sFe_maSXTCrOjAPAQ=" },
  { name: "Artesian Water 750ml", price: 2.69, category: "Water", ratings: "3", description: "Smooth Taste", image: "https://media.istockphoto.com/id/94567758/photo/baby-sumatran-orangutan-hanging-on-rope-against-white-background.jpg?s=612x612&w=0&k=20&c=BRdK1G6gVhaZ12A-zegLkJUHB9sFe_maSXTCrOjAPAQ=" },

  // Petfood
  { name: "Dry Dog Food 5kg", price: 12.99, category: "Petfood", ratings: "4", description: "Nutritious Meal", image: "https://media.istockphoto.com/id/94567758/photo/baby-sumatran-orangutan-hanging-on-rope-against-white-background.jpg?s=612x612&w=0&k=20&c=BRdK1G6gVhaZ12A-zegLkJUHB9sFe_maSXTCrOjAPAQ=" },
  { name: "Canned Cat Food 400g", price: 1.49, category: "Petfood", ratings: "5", description: "Delicious Tuna", image: "https://media.istockphoto.com/id/94567758/photo/baby-sumatran-orangutan-hanging-on-rope-against-white-background.jpg?s=612x612&w=0&k=20&c=BRdK1G6gVhaZ12A-zegLkJUHB9sFe_maSXTCrOjAPAQ=" },
  { name: "Pet Treats Variety Pack", price: 5.99, category: "Petfood", ratings: "4", description: "Tasty Mix", image: "https://media.istockphoto.com/id/94567758/photo/baby-sumatran-orangutan-hanging-on-rope-against-white-background.jpg?s=612x612&w=0&k=20&c=BRdK1G6gVhaZ12A-zegLkJUHB9sFe_maSXTCrOjAPAQ=" },
  { name: "Premium Catnip", price: 3.99, category: "Petfood", ratings: "3", description: "Cats Love It", image: "https://media.istockphoto.com/id/94567758/photo/baby-sumatran-orangutan-hanging-on-rope-against-white-background.jpg?s=612x612&w=0&k=20&c=BRdK1G6gVhaZ12A-zegLkJUHB9sFe_maSXTCrOjAPAQ=" },
  { name: "Grain-Free Dog Treats", price: 4.49, category: "Petfood", ratings: "5", description: "Healthy Snack", image: "https://media.istockphoto.com/id/94567758/photo/baby-sumatran-orangutan-hanging-on-rope-against-white-background.jpg?s=612x612&w=0&k=20&c=BRdK1G6gVhaZ12A-zegLkJUHB9sFe_maSXTCrOjAPAQ=" },
  { name: "Wet Puppy Food 300g", price: 2.99, category: "Petfood", ratings: "4", description: "Puppy Favorite", image: "https://media.istockphoto.com/id/94567758/photo/baby-sumatran-orangutan-hanging-on-rope-against-white-background.jpg?s=612x612&w=0&k=20&c=BRdK1G6gVhaZ12A-zegLkJUHB9sFe_maSXTCrOjAPAQ=" },
  { name: "Fish Flavored Cat Litter", price: 7.99, category: "Petfood", ratings: "3", description: "Odor Control", image: "https://media.istockphoto.com/id/94567758/photo/baby-sumatran-orangutan-hanging-on-rope-against-white-background.jpg?s=612x612&w=0&k=20&c=BRdK1G6gVhaZ12A-zegLkJUHB9sFe_maSXTCrOjAPAQ=" },
  { name: "Small Animal Hay 1kg", price: 6.49, category: "Petfood", ratings: "4", description: "Natural Hay", image: "https://media.istockphoto.com/id/94567758/photo/baby-sumatran-orangutan-hanging-on-rope-against-white-background.jpg?s=612x612&w=0&k=20&c=BRdK1G6gVhaZ12A-zegLkJUHB9sFe_maSXTCrOjAPAQ=" },
  { name: "Bird Seed Mix", price: 4.99, category: "Petfood", ratings: "5", description: "Birds' Delight", image: "https://media.istockphoto.com/id/94567758/photo/baby-sumatran-orangutan-hanging-on-rope-against-white-background.jpg?s=612x612&w=0&k=20&c=BRdK1G6gVhaZ12A-zegLkJUHB9sFe_maSXTCrOjAPAQ=" },
  { name: "Natural Rawhide Bones", price: 8.99, category: "Petfood", ratings: "4", description: "Chewy Fun", image: "https://media.istockphoto.com/id/94567758/photo/baby-sumatran-orangutan-hanging-on-rope-against-white-background.jpg?s=612x612&w=0&k=20&c=BRdK1G6gVhaZ12A-zegLkJUHB9sFe_maSXTCrOjAPAQ=" },

  // Tissues, Shampoo
  { name: "Facial Tissues 3-Ply", price: 1.79, category: "Tissues", ratings: "4", description: "Soft Touch", image: "https://media.istockphoto.com/id/94567758/photo/baby-sumatran-orangutan-hanging-on-rope-against-white-background.jpg?s=612x612&w=0&k=20&c=BRdK1G6gVhaZ12A-zegLkJUHB9sFe_maSXTCrOjAPAQ=" },
  { name: "Pocket-Sized Tissue Pack", price: 0.99, category: "Tissues", ratings: "5", description: "Convenient Pack", image: "https://media.istockphoto.com/id/94567758/photo/baby-sumatran-orangutan-hanging-on-rope-against-white-background.jpg?s=612x612&w=0&k=20&c=BRdK1G6gVhaZ12A-zegLkJUHB9sFe_maSXTCrOjAPAQ=" },
  { name: "Aloe Vera Shampoo 500ml", price: 5.99, category: "Shampoo", ratings: "4", description: "Soothing Cleanse", image: "https://media.istockphoto.com/id/94567758/photo/baby-sumatran-orangutan-hanging-on-rope-against-white-background.jpg?s=612x612&w=0&k=20&c=BRdK1G6gVhaZ12A-zegLkJUHB9sFe_maSXTCrOjAPAQ=" },
  { name: "Anti-Dandruff Shampoo 250ml", price: 4.49, category: "Shampoo", ratings: "3", description: "Dandruff Control", image: "https://media.istockphoto.com/id/94567758/photo/baby-sumatran-orangutan-hanging-on-rope-against-white-background.jpg?s=612x612&w=0&k=20&c=BRdK1G6gVhaZ12A-zegLkJUHB9sFe_maSXTCrOjAPAQ=" },
  { name: "Moisturizing Body Wash", price: 6.99, category: "Shampoo", ratings: "5", description: "Hydrating Formula", image: "https://media.istockphoto.com/id/94567758/photo/baby-sumatran-orangutan-hanging-on-rope-against-white-background.jpg?s=612x612&w=0&k=20&c=BRdK1G6gVhaZ12A-zegLkJUHB9sFe_maSXTCrOjAPAQ=" },
  { name: "Scented Bath Bombs Set", price: 9.99, category: "Shampoo", ratings: "4", description: "Relaxing Scents", image: "https://media.istockphoto.com/id/94567758/photo/baby-sumatran-orangutan-hanging-on-rope-against-white-background.jpg?s=612x612&w=0&k=20&c=BRdK1G6gVhaZ12A-zegLkJUHB9sFe_maSXTCrOjAPAQ=" },
  { name: "Gentle Baby Shampoo 200ml", price: 3.99, category: "Shampoo", ratings: "5", description: "Mild Care", image: "https://media.istockphoto.com/id/94567758/photo/baby-sumatran-orangutan-hanging-on-rope-against-white-background.jpg?s=612x612&w=0&k=20&c=BRdK1G6gVhaZ12A-zegLkJUHB9sFe_maSXTCrOjAPAQ=" },
  { name: "Hypoallergenic Baby Wipes", price: 2.49, category: "Shampoo", ratings: "3", description: "Gentle Cleaning", image: "https://media.istockphoto.com/id/94567758/photo/baby-sumatran-orangutan-hanging-on-rope-against-white-background.jpg?s=612x612&w=0&k=20&c=BRdK1G6gVhaZ12A-zegLkJUHB9sFe_maSXTCrOjAPAQ=" },
  { name: "Exfoliating Shower Gel", price: 7.49, category: "Shampoo", ratings: "4", description: "Deep Exfoliation", image: "https://media.istockphoto.com/id/94567758/photo/baby-sumatran-orangutan-hanging-on-rope-against-white-background.jpg?s=612x612&w=0&k=20&c=BRdK1G6gVhaZ12A-zegLkJUHB9sFe_maSXTCrOjAPAQ=" },
  { name: "Organic Lavender Soap", price: 4.99, category: "Shampoo", ratings: "5", description: "Soothing Lavender", image: "https://media.istockphoto.com/id/94567758/photo/baby-sumatran-orangutan-hanging-on-rope-against-white-background.jpg?s=612x612&w=0&k=20&c=BRdK1G6gVhaZ12A-zegLkJUHB9sFe_maSXTCrOjAPAQ=" },

  { name: "Diapers Pack", price: 18.99, category: "Diapers", image: "https://pngimg.com/d/diaper_PNG42.png" },
  { name: "Baby Food Jar", price: 1.79, category: "Babyfood", image: "https://s38174.pcdn.co/wp-content/uploads/2019/01/EB_BabyFoodJars_Carrots_4oz_Front-300x300.png" },
  { name: "All-Purpose Cleaner", price: 3.49, category: "Cleaning Supplies", image: "https://assets.shop.loblaws.ca/products/21207721/b1/en/front/21207721_front_a01_@2.png" },
  { name: "Toilet Paper Roll", price: 15.99, category: "Toilet Paper", image: "https://i5.walmartimages.ca/images/Enlarge/905/656/6000204905656.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF" },
  { name: "Disposable Paper Plates", price: 2.49, category: "Paper Plates", image: "https://m.media-amazon.com/images/I/714nsdu6sfL._AC_UF1000,1000_QL80_.jpg" },
  { name: "Fresh Salmon", price: 9.99, category: "Fish", image: "https://assets.shop.loblaws.ca/products/20772308/b2/en/front/20772308_front_a06_@2.png" },
  { name: "Mixed Vegetables", price: 2.49, category: "Vegetables", image: "https://assets.shop.loblaws.ca/products/20316388/b2/en/front/20316388_front_a06_@2.png" },
  { name: "Thai Curry Paste", price: 3.99, category: "International", image: "https://assets.shop.loblaws.ca/products/20712986/b1/en/front/20712986_front_a01_@2.png" },
  { name: "Frozen Pizza", price: 5.99, category: "Pizza", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6mlFRZxp3jf9F8tVw7PvQhOH6m-OEmp7H2g&usqp=CAU" },
  { name: "Vanilla Ice Cream", price: 4.99, category: "Ice Cream", image: "https://i5.walmartimages.com/asr/fa82fc0e-fa4a-46f8-a390-038d06fe9146.4ab4b32aba6628eb97b5bc30227b6047.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF" },
  { name: "Fresh Baguette", price: 2.49, category: "Bakery", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1fIMVnVOTuGovvGLmoPzAL67ccNo9NdfgMQ&usqp=CAU" },
  { name: "Breakfast Cereal", price: 3.99, category: "Cereal", image: "https://assets.shop.loblaws.ca/products/21103503/b1/en/angle/21103503_angle_a01_@2.png" },
  { name: "Strawberry Jam", price: 2.79, category: "Jam", image: "https://assets.shop.loblaws.ca/products/20308397001/b2/en/front/20308397001_front_a06_@2.png" },
  { name: "Orange Juice", price: 2.99, category: "Juice", image: "https://storage.googleapis.com/images-sof-prd-9fa6b8b.sof.prd.v8.commerce.mi9cloud.com/product-images/detail/00059600060211.jpg" },
  { name: "Ground Coffee", price: 16.99, category: "Coffee", image: "https://m.media-amazon.com/images/I/81ms6TpLMEL._AC_UF1000,1000_QL80_.jpg" },
  { name: "Potato Chips", price: 1.99, category: "Snacks", image: "https://storage.googleapis.com/images-sof-prd-9fa6b8b.sof.prd.v8.commerce.mi9cloud.com/product-images/zoom/00060410016930.jpg" },
  { name: "Chocolate Chip Cookies", price: 2.49, category: "Snacks", image: "https://assets.shop.loblaws.ca/products/20612257/b3/en/front/20612257_front_a06_@2.png" },
  { name: "Chicken Noodle Soup", price: 1.79, category: "Soup", image: "https://www.campbellsoup.ca/wp-content/uploads/2012/07/con_chicknoodle_csca.png" },
  { name: "Mixed Vegetable Can", price: 0.99, category: "Canned Food", image: "https://www.delmonte.com/sites/default/files/products//2017-09/mixedvegetables-nosaltadded.png" },
  { name: "Basmati Rice", price: 4.99, category: "Rice", image: "https://assets.shop.loblaws.ca/products/20787290/b2/en/front/20787290_front_a06_@2.png" },
  { name: "AA Batteries", price: 5.49, category: "Electronics", image: "https://m.media-amazon.com/images/I/714ieWrwbPL.jpg" },
  { name: "Canned Black Beans", price: 1.49, category: "Beans", image: "https://assets.shop.loblaws.ca/products/20325921005/b2/en/front/20325921005_front_a06_@2.png" },
  { name: "Mixed Nuts", price: 4.99, category: "Nuts", image: "https://m.media-amazon.com/images/I/71jvU7QEbML._AC_UF1000,1000_QL80_.jpg" },
  { name: "Cola", price: 1.29, category: "Soda", image: "https://i5.walmartimages.com/asr/ce466cd0-297c-4619-a115-605117c166da.e0444bfd6ab887dfbafba896ce106f4f.jpeg?odnHeight=450&odnWidth=450&odnBg=ffffff" },
  { name: "Baking Flour", price: 2.49, category: "Baking", image: "https://m.media-amazon.com/images/I/819XlmS5XmL._AC_UF1000,1000_QL80_.jpg" },
  { name: "Mixed Spices", price: 3.99, category: "Spices", image: "https://m.media-amazon.com/images/I/61sbnmvTCDL.jpg" },
  { name: "Penne Pasta", price: 1.99, category: "Pasta", image: "https://m.media-amazon.com/images/I/810iFl7wP1L._AC_UF1000,1000_QL80_.jpg" },
  { name: "Plastic Storage Containers", price: 6.99, category: "Plastics", image: "https://m.media-amazon.com/images/I/71nFDTAOu3L.jpg" },
  { name: "Olive Oil", price: 8.99, category: "Oils", image: "https://assets.shop.loblaws.ca/products/20160496002/b2/en/front/20160496002_front_a06_@2.png" },
  { name: "Caesar Dressing", price: 2.99, category: "Dressing & Condiments", image: "https://assets.shop.loblaws.ca/products/20628297004/b2/en/front/20628297004_front_a06_@2.png" },
  { name: "Baby Cereal", price: 1.99, category: "Babyfood", image: "https://assets.shop.loblaws.ca/products/20358339006/b2/en/front/20358339006_front_a06_@2.png" },
  { name: "Bleach", price: 6.99, category: "Cleaning Supplies", image: "https://images.homedepot.ca/productimages/p_1000661431.jpg?product-images=l" },
  { name: "Trash Tissue", price: 15.99, category: "Toilet Paper", image: "https://images.dailyhive.com/20200315161754/shutterstock_1122871010.jpeg" },
  { name: "40 Paper Plates", price: 6.99, category: "Paper Plates", image: "https://apim.canadiantire.ca/v1/product/api/v1/product/image/0429200p?baseStoreId=CTR&lang=en_CA&subscription-key=c01ef3612328420c9f5cd9277e815a0e&imwidth=640" },
  { name: "Frozen Fish Sticks", price: 4.99, category: "Fish", image: "https://i5.walmartimages.com/asr/8664e28f-880f-4182-8f2c-76f2bccc2cfe.738cfc499d1b1fd04b38607ff88a02ec.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF" },
  { name: "Potato", price: 0.99, category: "Vegtables", image: "https://www.dole.com/-/media/project/dole/produce-images/vegetables/potatoes_cut_web.png?rev=b1a051bd8a484f0fa16cb33d70f738d6&hash=2FD99C8B77805DF39C6AA4C8F0C2AA9C" },
  { name: "Whole Chicken", price: 8.99, category: "Meat", image: "https://static01.nyt.com/images/2020/05/01/science/01TB-CHICKEN/01TB-CHICKEN-videoSixteenByNine3000.jpg?year=2020&h=1688&w=3000&s=08d78bcca3d81952683068193e144be7e941d5e4711d1ab521355c31e30381b5&k=ZQJBKqZ0VN&tw=1" },
  { name: "Banana", price: 0.99, category: "Fruit", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Single.jpg/640px-Banana-Single.jpg" },
  { name: "Pizza Starter Kit", price: 5.99, category: "Pizza", image: "https://i5.walmartimages.ca/images/Enlarge/665/658/6000204665658.jpg" },
  { name: "Club Soda", price: 1.99, category: "Soda", image: "https://canadadry.ca/wp-content/uploads/2021/02/Club-Soda-FR-Shadow.png" },
  { name: "Chocolate Ice Cream", price: 8.99, category: "Ice Cream", image: "https://www.haagen-dazs.ca/sites/default/files/2023-01/Haagen-Dazs%20Chocolate%208x450ml%20CA%20%28EA%29downsized.png" },
  { name: "Morning Oats", price: 5.99, category: "Cereal", image: "https://m.media-amazon.com/images/I/81noCJ5IVGL._AC_UF1000,1000_QL80_.jpg" },
  { name: "Blueberry Jam", price: 5.99, category: "Jam", image: "https://assets.shop.loblaws.ca/products/20308397007/b2/en/front/20308397007_front_a06_@2.png" },
  { name: "Bread", price: 3.99, category: "Bakery", image: "https://hips.hearstapps.com/hmg-prod/images/sliced-white-bread-in-plastic-bag-isolated-on-white-royalty-free-image-1670528444.jpg" },
  { name: "Apple Juice", price: 1.99, category: "Juice", image: "https://assets.shop.loblaws.ca/products/20501952/b1/en/front/20501952_front_a01_@2.png" },
  { name: "Cookies", price: 3.99, category: "Snacks", image: "https://assets.shop.loblaws.ca/products/21358407/b2/en/front/21358407_front_a06_@2.png" },
  { name: "Mushroom Soup", price: 2.99, category: "Soup", image: "https://www.campbellsoup.ca/wp-content/uploads/2012/07/campbells-condensed-cream-of-mushroom.png" },
  { name: "Type-C Charger", price: 5.99, category: "Electronics", image: "https://m.media-amazon.com/images/I/51qzSTd-1BL._AC_UF894,1000_QL80_.jpg" },
  { name: "Pinto Beans", price: 3.99, category: "Beans", image: "https://assets.shop.loblaws.ca/products/20907711/b2/en/front/20907711_front_a06_@2.png" },
  { name: "Trail Mix", price: 16.99, category: "Nuts", image: "https://images.costco-static.com/ImageDelivery/imageService?profileId=12026539&itemId=1474436-894&recipeName=680" },
  { name: "Simple Bouquet", price: 19.99, category: "Flowers", image: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,w_730/k%2FEdit%2F2021-05-Grocery-Store-Flowers%2FFresh_Bouquet_1" },
  { name: "Molasses", price: 31.99, category: "Baking", image: "https://m.media-amazon.com/images/I/51q5fpy4QzL.jpg" },
  { name: "Kosher Salt", price: 12.99, category: "Spices", image: "https://assets.bonappetit.com/photos/57bf2336a184a3c9209db22e/master/w_1600%2Cc_limit/diamond-kosher-salt.jpg" },
  { name: "Spaghetti", price: 4.99, category: "Pasta", image: "https://www.barilla.com//-/media/images/ca/products/new-product-shots/spaghetti.png" },
  { name: "Sandwich Bags", price: 24.00, category: "Plastic", image: "https://m.media-amazon.com/images/I/61nASg8CRgL.jpg" },
  { name: "Canola Oil", price: 17.00, category: "Oil", image: "https://i5.walmartimages.com/asr/86c3d6a0-9899-497b-b0cc-823efd625b65.f35fdb7ce908b558e3f138e3fc944a8a.jpeg?odnHeight=450&odnWidth=450&odnBg=ffffff" },
  { name: "BBQ Sauce", price: 5.99, category: "Dressing & Condiments", image: "https://assets.shop.loblaws.ca/products/20627619007/b1/en/front/20627619007_front_a01_@2.png" }

];



function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [filterCategory, setFilterCategory] = useState(null);
  const [isSearchBarClicked, setIsSearchBarClicked] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleFilterTextChange = (newFilterText) => {
    setFilterText(newFilterText);
  };

  const handleSearchBarClick = () => {
    if(!isSearchBarClicked && !isButtonClicked){
      setIsSearchBarClicked(!isSearchBarClicked);
    }
  };

  const handleButtonClick = () => {
    setIsButtonClicked(!isButtonClicked);
  }

  // <div style={{position: 'absolute', height: '750px', width: "500px", overflow: 'auto', direction: 'ltr'}}></div>

  return (
    <div>
      <div style={{
        
        position: 'fixed', // Keeps the element in the same place even when scrolling
        top: '10px', // 10px from the top of the viewport
        left: '50%', // Moves the left edge of the div to the center of the viewport
        transform: 'translateX(-50%)', // Shifts the div back to the left by half its own width
        zIndex: '10'
        
      }}>
        <SearchBar
          filterText={filterText}
          onFilterTextChange={setFilterText}
          isSearchBarClicked={isSearchBarClicked}
          onSearchBarClick={handleSearchBarClick}
          isButtonClicked={isButtonClicked}
          onButtonClick={handleButtonClick} />
      </div>
      
    </div>
  );
}

function ProductRow({ product }) {

  const [scrollToComponent, setScrollComponent] = useState(false);

  useEffect(() => {
    if (scrollToComponent) {
      const shelfItem = document.getElementById(`${product.category}`);
      const productItem = document.getElementById(`${product.name}-shelved`);

      if (shelfItem) {
        shelfItem.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })

        if (productItem) {
          productItem.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        }
      }
    }

    setScrollComponent(false);
  }, [scrollToComponent]);

  const name = product.stocked ? product.name :
    <span>
      {product.name}
    </span>;

  function handleClick() {
    setScrollComponent(true);
  }

  return (
    <div style={{ background: 'white', border: "1px solid black", margin: "5px", cursor: 'pointer' }} onClick={() => handleClick()}>
      <tr>
        <td>{name}</td>
      </tr>
      <tr>
        <td>{product.price}$</td>
      </tr>
      <tr>
        <img src={product.image} width="100" height="100" />
      </tr>
    </div>
  );
}

function ProductTable({ products, filterText, isSearchBarClicked }) {
  const [opacity, setOpacity] = useState(0);
  const [animatedProducts, setAnimatedProducts] = useState([products]);
  const [showBar, setShowBar] = useState('hidden');

  useEffect(() => {
    if (isSearchBarClicked) {
      // If search bar is clicked, fade in
      setOpacity(1);

      const timeoutIds = products.map((product, index) => {
        return setTimeout(() => {
          setAnimatedProducts((prevProducts) => [...prevProducts, product]);
        }, index * 300); // Delay increases for each product
      });
      setShowBar('auto');
      document.body.classList.add('body-margin-35');
      
      return () => {
        // Clear the timeouts to avoid memory leaks
        timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
      };
      
    } else {
      // If search bar is not clicked, fade out
      setOpacity(0);
      setAnimatedProducts([]); // Reset animated products
      setShowBar('hidden');
      document.body.classList.remove('body-margin-35');
    }
  }, [isSearchBarClicked, products]);
  
  const rows = products
    .filter((product) => product.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1)
    .map((product) => (
      <ProductRow
        product={product}
        key={product.name}
      />
    ));

  const tableContainerStyle = {
    overflowY: showBar, // Apply vertical scrollbar
    height: '98vh',
    width: '25vh',
    direction: 'ltr',
    zIndex: '100',
    marginLeft: '-600px',
    marginTop: '-70px',
    
  };

  const tableStyle = {
    opacity: opacity,
    transition: 'opacity 0.5s ease-in-out',
    overflowY: 'hidden',
  };

  return (
    <div style={tableContainerStyle}>
      <table style={tableStyle} className='hide-scrollbar'>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

function SearchBar({ filterText, onFilterTextChange, isSearchBarClicked, onSearchBarClick, isButtonClicked, onButtonClick }) {
  return (
    <form>
      <div
        onClick={onSearchBarClick} 
        style={{
        display: 'flex', // Flex container to align input and button
        alignItems: 'center', // Align items vertically in the center
        borderRadius: '20px', // Rounded corners
        border: '2px solid black', // Border like the input
        boxShadow: '4px 4px 6px rgba(0, 0, 0, 0.2)', // Shadow effect
        width: '700px', // Width of the entire container
        overflow: 'hidden' // Ensures the button stays within the container's border

      }}>
        <input
          type="text"
          value={filterText}
          placeholder="Search..."
          onChange={(e) => onFilterTextChange(e.target.value)}
          style={{
            flexGrow: 1, // Allows the input to grow and fill available space
            padding: '10px',
            border: 'none', // Removes border
            borderRadius: '20px', // Rounded corners
            fontSize: '15px',
            outline: 'none' // Removes the outline on focus
          }}
        />
        <button
          onClick={() => onFilterTextChange("")}
          style={{
            padding: '0px',
            border: 'none', // Removes border
            backgroundColor: 'transparent', // Makes background transparent
            cursor: 'pointer', // Changes cursor to pointer on hover
            borderRadius: '0px 20px 20px 0px', // Rounded corners on the right side
            marginRight: '-1px' // Aligns button with the container's border
          }}
        >
          <svg className='search-delete-icon search-delete-btn-clicked' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.23 9.78L15.01 12L17.23 14.22C17.52 14.51 17.52 14.99 17.23 15.28C17.08 15.43 16.89 15.5 16.7 15.5C16.51 15.5 16.32 15.43 16.17 15.28L13.95 13.06L11.73 15.28C11.58 15.43 11.39 15.5 11.2 15.5C11.01 15.5 10.82 15.43 10.67 15.28C10.38 14.99 10.38 14.51 10.67 14.22L12.89 12L10.67 9.78C10.38 9.49 10.38 9.01 10.67 8.72C10.96 8.43 11.44 8.43 11.73 8.72L13.95 10.94L16.17 8.72C16.46 8.43 16.94 8.43 17.23 8.72C17.52 9.01 17.52 9.49 17.23 9.78ZM21.32 7V17C21.32 17.96 20.54 18.75 19.57 18.75H7.64C7.02999 18.75 6.48 18.44 6.16 17.93L2.87 12.66C2.62 12.26 2.62 11.74 2.87 11.33L6.16 6.07C6.48 5.56 7.04 5.25 7.64 5.25H19.58C20.54 5.25 21.33 6.04 21.33 7H21.32ZM19.82 7C19.82 6.86 19.71 6.75 19.57 6.75H7.64C7.54999 6.75 7.47 6.79 7.43 6.87L4.22 12L7.43 17.13C7.48 17.2 7.56 17.25 7.64 17.25H19.58C19.72 17.25 19.83 17.14 19.83 17V7H19.82Z" fill="#000000" />
          </svg>
        </button>
      </div>
      
      {isSearchBarClicked && <div>
        <button
          onClick={onButtonClick} 
          style={{
            padding: '1vw 2vh',
            border: 'none', // Removes border
            backgroundColor: 'transparent', // Makes background transparent
            cursor: 'pointer', // Changes cursor to pointer on hover
            marginLeft: '-370px',
            marginTop: '-200px'
          
          }}
        >
          <svg className='search-delete-icon search-delete-btn-clicked' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm3.707,12.293a1,1,0,1,1-1.414,1.414L12,13.414,9.707,15.707a1,1,0,0,1-1.414-1.414L10.586,12,8.293,9.707A1,1,0,0,1,9.707,8.293L12,10.586l2.293-2.293a1,1,0,0,1,1.414,1.414L13.414,12Z"/>
          </svg>
        </button>
      </div>}
      {isSearchBarClicked && !isButtonClicked && <div>
        {(
          <ProductTable products={PRODUCTS} filterText={filterText} isSearchBarClicked={isSearchBarClicked} />
        )}
      </div> 
      }
    </form>
  );
}


/*
const CATEGORIES = [
  ["Water"],
  ["Petfood"],
  ["Tissues", "Shampoo"],
  ["Diapers", "Babyfood"],
  ["Detergent", "Cleaning Supplies", "Soap"],
  ["Toilet Paper", "Paper Plates"],
  ["Fish", "Vegtables", "Potato", "Breakfast"],
  ["Meals", "International"],
  ["Pizza", "TV Dinners", "Perogies"],
  ["Ice Cream", "Bakery"],
  ["Cereal", "Jam"],
  ["Juice", "Coffie"],
  ["Snacks", "Cookies"],
  ["Soup", "Crackers"],
  ["Canned Food"],
  ["Indian", "Rice"],
  ["Asian", "Jamacian", "Beans"],
  ["Chips", "Nuts"],
  ["Soda"],
  ["Flour", "Baking", "Spices", "Sugar"],
  ["Tomato", "Pasta", "Mexican", "Plastic"],
  ["Oil", "Dressing", "Condiments"]
];
*/


function Store({ aisleCategories, addToWishlist }) {
  //style={{ display: 'flex', flexDirection: 'row', width: '125vw', height: "80vh", padding: '9vh 15vw' }}
  return (
    <div
      style={{ display: 'flex', flexDirection: 'row', width: '125vw', height: "88vh", padding: '7vh 13vw 0vh' }}
    >
      {aisleCategories.map((categories, index) => (
        <Aisle key={index} categories={categories} aisleNumber={index} addToWishlist={addToWishlist} />
      ))}
    </div>
  );
}

function Aisle({ key, categories, aisleNumber, addToWishlist }) {
  const paddingLeft = aisleNumber % 2 === 1; // This is so every other aisle is back-to-back like in a store

  return (
    <div
      key={key} style={{ display: 'flex', height: "90vh", /*flexDirection: 'column-reverse',*/ flexFlow: "column-reverse", justifyContent: 'space-around', marginLeft: paddingLeft ? '4vw' : '0.25vw', maxHeight: "100%", maxWidth: "100%" }}
    >
      {categories.map((category, subIndex) => (
        <Shelf key={category} category={category} addToWishlist={addToWishlist} />
      ))}
    </div>
  );
}


function Shelf({ key, category, addToWishlist }) {

  const products = PRODUCTS.filter(p => p.category == category);

  return (
    <>
      <button id={category} key={category} style={{ overflowY: 'auto', width: "10vw", height: "100vh", maxHeight: "100%", maxWidth: "100%", border: '1px solid black', marginBottom: "0.25vw"}}>
        <ShelvedProducts products={products} addToWishlist={addToWishlist} />
      </button>
      <text style={{ textAlign: 'center', border: '1px solid black', marginBottom: '0.25vh' }}
      >{category} </text>
    </>
  );
}


function ShelvedProducts({ products, addToWishlist }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <>
      {products.map(product => (
        <img
          key={product.name}
          src={product.image}
          alt={product.name}
          style={{ maxWidth: "100%", height: 'auto', cursor: 'pointer' }}
          onClick={() => openModal(product)}
        />
      ))}
      <ProductModal product={selectedProduct} isOpen={modalOpen} closeModal={closeModal} addToWishlist={addToWishlist} />
    </>
  );
}


function ProductModal({ product, isOpen, closeModal, addToWishlist }) {


  const handleAddToWishlist = () => {
    addToWishlist(product);
  };



  // Function to render star ratings
  const renderStars = () => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} style={{ color: i < product.ratings ? 'gold' : 'grey', fontSize: '30px' }}>★</span>
      );
    }
    return stars;
  };


  return (
    <>
      <div>
        {isOpen && product && (
          <div style={modalOverlayStyle} onClick={closeModal}>
            <div style={{ ...modalContentStyle, display: 'flex' }} onClick={(e) => e.stopPropagation()}>
              <span style={closeButtonStyle} onClick={closeModal}>&times;</span>
              <img src={product.image} alt={product.name} style={imageStyle} />
              <div style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h1>{product.name}</h1>
                <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>{renderStars()}</div>
                <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}><h2>Price: ${product.price}</h2></div>
                <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}><h3>Description: {product.description}</h3></div>
                <button onClick={handleAddToWishlist} style={{ backgroundColor: 'orange', border: 'none', padding: '10px', cursor: 'pointer' }}>Add to Wishlist</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}



const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};

const modalContentStyle = {
  background: '#fff',
  padding: '20px',
  borderRadius: '8px',
  position: 'relative'
};

const closeButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  fontSize: '20px',
  cursor: 'pointer',
};


const wishListOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'start',
  zIndex: 1000
};

const wishListContentStyle = {
  background: 'rgba(0, 0, 0, 0.0)', //making it transparent while maintaining an effect, put rgba(0, 0, 0, 0.0) if you want to see the background
  top: '-30px',
  padding: '10px',
  borderRadius: '8px',
  position: 'relative'
};

const imageStyle = {
  width: '450px', // Fixed width for the image
  height: '300px', // Maintain aspect ratio
  marginRight: '10px' // Space between image and text
};

/////////
function WishList({ wishlist }) {
  const [showWishlist, setShowWishlist] = useState(false);

  const toggleWishlist = () => {
    setShowWishlist(!showWishlist);
  };

  const cardStyle = {
    backgroundColor: 'white', // White background for each card
    padding: '10px',    //inside content padding
    margin: '40px 0',    //card padding with outside semi-transparent border
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
    borderRadius: '8px', // Rounded corners
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <button onClick={toggleWishlist} style={{
          padding: '0px',
          borderRadius: '0px',
          cursor: 'pointer',
          position: 'fixed',
          top: '10px',
          right: '10px',
          background: 'transparent',
          border: 'none'
        }}>
          <svg className='wishlist-icon wishlist-btn-clicked' viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" ><path d="M9.06,25C7.68,17.3,12.78,10.63,20.73,10c7-.55,10.47,7.93,11.17,9.55a.13.13,0,0,0,.25,0c3.25-8.91,9.17-9.29,11.25-9.5C49,9.45,56.51,13.78,55,23.87c-2.16,14-23.12,29.81-23.12,29.81S11.79,40.05,9.06,25Z" />
          </svg>
        </button>

        {showWishlist && (
          <div className='hide-scrollbar' style={wishListOverlayStyle} onClick={toggleWishlist}>
            <div style={wishListContentStyle} onClick={(e) => e.stopPropagation()}>
              <div style={{ overflowY: 'auto', maxHeight: '100vh' }}> {/* Scrollable list */}
                { /*<span style={closeButtonStyle} onClick={toggleWishlist}>&times;</span> */}
                {wishlist.length === 0 ? (
                  <div style={{ ...cardStyle, height: '100px', width: '300px' }}>
                    <h3>There's nothing in your wishlist.</h3>
                  </div>
                ) : (
                  wishlist.map((product, index) => (
                    <div key={index} style={cardStyle}>
                      <img src={product.image} alt={product.name} style={imageStyle} />
                      <div>
                        <h1 style={{ margin: 0 }}>{product.name}</h1>
                        <button style={{ backgroundColor: 'orange', border: 'none', padding: '10px', marginRight: '10px', marginTop: '20px', cursor: 'pointer' }}>Remove From Wishlist</button>
                        <button style={{ backgroundColor: 'orange', border: 'none', padding: '10px', cursor: 'pointer' }}>Take me there</button>
                        {/* Additional product details can be added here */}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}


/*
export default function App() {

  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (product) => {
    // Add product to wishlist if not already present
    if (!wishlist.some(wishlistProduct => wishlistProduct.name === product.name)) {
      setWishlist([...wishlist, product]);
    }
    console.log(wishlist);
  };


  return (
    <>
      <div>
        <WishList wishlist={wishlist} />
        <FilterableProductTable products={PRODUCTS} />
        <Store aisleCategories={CATEGORIES} addToWishlist={addToWishlist} />
      </div>
    </>
  );
}

*/
export default function App() {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (product) => {
    // Add product to wishlist if not already present
    if (!wishlist.some(wishlistProduct => wishlistProduct.name === product.name)) {
      setWishlist([...wishlist, product]);
    }
    console.log(wishlist);
  };


  const [scrollInterval, setScrollInterval] = useState(null);
  const [leftArrowColor, setLeftArrowColor] = useState('#000000');
  const [rightArrowColor, setRightArrowColor] = useState('#000000');

  const startScrolling = (direction) => {
    const scrollAmount = 8; // Adjust the scroll amount as needed

    setScrollInterval(setInterval(() => {
      if (direction === 'left') {
        setLeftArrowColor('#FF0000'); //once clicked, turns red
        window.scrollBy(-scrollAmount, 0);
      } else if (direction === 'right') {
        setRightArrowColor('#FF0000'); //once clicked, turns red
        window.scrollBy(scrollAmount, 0);
      }
    }, 16)); // Adjust the interval (in milliseconds) for smoother scrolling
  };

  const stopScrolling = () => {
    setLeftArrowColor('#000000');
    setRightArrowColor('#000000');
    clearInterval(scrollInterval);
    setScrollInterval(null);
  };

  return (
    <>
      <div
        className="scroll-arrow btn scroll-arrow-left"
        onMouseDown={() => startScrolling('left')}
        onMouseUp={stopScrolling}
        onMouseLeave={stopScrolling}

      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 38">
          <g data-name="20-Arrow Left">
            <path d="M16 0a16 16 0 1 0 16 16A16 16 0 0 0 16 0zm0 30a14 14 0 1 1 14-14 14 14 0 0 1-14 14z"
              fill={leftArrowColor}
            />
            <path d="m8.41 15 5.29-5.29-1.41-1.42-7 7a1 1 0 0 0 0 1.41l7 7 1.41-1.41L8.41 17H27v-2z"
              fill={leftArrowColor}
            />
          </g>
        </svg>
      </div>

      <div
        className="scroll-arrow btn scroll-arrow-right"
        onMouseDown={() => startScrolling('right')}
        onMouseUp={stopScrolling}
        onMouseLeave={stopScrolling}

      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 38">
          <g data-name="19-Arrow Right">
            <path d="M16 0a16 16 0 1 0 16 16A16 16 0 0 0 16 0zm0 30a14 14 0 1 1 14-14 14 14 0 0 1-14 14z"
              fill={rightArrowColor}
            />
            <path d="m26.71 15.29-7-7-1.42 1.42 5.3 5.29H5v2h18.59l-5.29 5.29 1.41 1.41 7-7a1 1 0 0 0 0-1.41z"
              fill={rightArrowColor}
            />
          </g>
        </svg>
      </div>
      <div>
        <WishList wishlist={wishlist} />
        <FilterableProductTable products={PRODUCTS} />
        <Store aisleCategories={CATEGORIES} addToWishlist={addToWishlist} />
      </div>
    </>
  );
}

/*
body {
        margin: 0;
        padding: 0;
        background-color: #FFFFFF;
      }

      
      ::-webkit-scrollbar {
        width: 8px;
        height: 18px; 
      }

      ::-webkit-scrollbar-thumb {
        background-color: transparent;
      }

      
      body {
        scrollbar-width: thin;
      }

      body::-webkit-scrollbar-thumb {
        background-color: #888;
      }

      body::-webkit-scrollbar-track {
        background-color: #FFFFFF; 
      }

      body::-webkit-scrollbar-track-piece {
        background-color: transparent;
      }


*/