import React, { useState, useEffect } from 'react';


function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [filterCategory, setFilterCategory] = useState(null);

  // <div style={{position: 'absolute', height: '750px', width: "500px", overflow: 'auto', direction: 'ltr'}}></div>

  return (
    <div style={{position: 'fixed'}}>
      <SearchBar 
        filterText={filterText} 
        onFilterTextChange={setFilterText}/>
      <ProductTable 
        products={products} 
        filterText={filterText}/>
    </div>
  );
}

function ProductRow({ product }) {

  const [scrollToComponent, setScrollComponent] = useState(false);

  useEffect(() => {
    if(scrollToComponent) {
      const shelfItem = document.getElementById(`${product.category}`);
      const productItem = document.getElementById(`${product.name}-shelved`);

      if(shelfItem) {
        shelfItem.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'})

        if(productItem) {
          productItem.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'});
        }
      }
    }

    setScrollComponent(false);
  }, [scrollToComponent, product.category, product.name]); // Include product.category and product.name in the dependency array

  const name = product.stocked ? product.name :
    <span>
      {product.name}
    </span>;

  function handleClick() {
    setScrollComponent(true);
  }

  return (
    <div style={{background: 'white', border: "1px solid black", margin: "10px", cursor: 'pointer'}} onClick={() => handleClick()}>
      <tr>
        <td>{name}</td>
      </tr>
      <tr>
        <td>{product.price}$</td>
      </tr>
      <tr>
        <img src={product.path} alt="https://static.vecteezy.com/system/resources/previews/021/952/562/original/tasty-hamburger-on-transparent-background-png.png" width="100" height="100"/>
      </tr>
    </div>
  );
}

function ProductTable({ products, filterText}) {
  const rows = [];

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
  });

  return (
   <div style={{overflow: 'auto', height:"750px", direction: "ltr"}}>
      <table>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

function SearchBar({
  filterText,
  onFilterTextChange,
}) {
  return (
    <form>
      <input 
        type="text" 
        value={filterText} placeholder="Search..." 
        onChange={(e) => onFilterTextChange(e.target.value)} />
      <button onClick={() => onFilterTextChange("")}>clear</button>
    </form>
  );
}


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
  { name: "Spring Water 1L", price: 2.49, category: "Water", path: "https://assets.shop.loblaws.ca/products/20154975/b2/en/front/20154975_front_a06_@2.png"},
  { name: "Mineral Water 750ml", price: 1.79, category: "Water", path: "https://m.media-amazon.com/images/I/71CNOMDLFCL.jpg" },
  { name: "Purified Water 1.5L", price: 2.99, category: "Water", path: "https://i.ebayimg.com/images/g/OEsAAOSwL2BjZRDr/s-l1200.webp" },
  { name: "Sparkling Water 330ml", price: 1.49, category: "Water", path: "https://shoptoronto.eataly.ca/cdn/shop/products/wfv07YX_e1a3cfb0-433d-4802-bd44-93d2c80a544c.jpg?v=1625672423" },
  { name: "Coconut Water 500ml", price: 2.29, category: "Water", path: "https://assets.shop.loblaws.ca/products/20689784/b2/en/front/20689784_front_a06_@2.png" },
  { name: "Flavored Watermelon Water", price: 2.79, category: "Water", path: "https://assets.shop.loblaws.ca/products/20998285/b2/en/front/20998285_front_a06_@2.png" },
  { name: "Alkaline Water 1L", price: 3.99, category: "Water", path: "https://assets.shop.loblaws.ca/products/21286579/b2/en/front/21286579_front_a06_@2.png" },
  { name: "Sport Electrolyte Water", price: 2.99, category: "Water", path: "https://www.vitaminwatercanada.ca/content/dam/nagbrands/ca/vitaminwater/en/products/vitaminwater-restore/vitaminwaterrestoreBottle591mL-productImageSmall.png" },
  { name: "Artesian Water 750ml", price: 2.69, category: "Water", path: "https://assets.shop.loblaws.ca/products/20122176/b1/en/front/20122176_front_a01_@2.png" },

  // Petfood
  { name: "Dry Dog Food 5kg", price: 12.99, category: "Petfood", path: "https://www.mypedigree.ca/sites/g/files/fnmzdf1841/files/migrate-product-files/images/kopochjwhudp4hbxyl7a.png" },
  { name: "Canned Cat Food 400g", price: 1.49, category: "Petfood", path: "https://atlas-content-cdn.pixelsquid.com/stock-images/cat-food-5EXlZl2-600.jpg" },
  { name: "Pet Treats Variety Pack", price: 5.99, category: "Petfood", path: "https://www.purina.ca/sites/default/files/styles/kraken_product_carousel_regular/public/2022-07/00055800432612_A1C1_0.png?itok=UPTCe1AZ" },
  { name: "Premium Catnip", price: 3.99, category: "Petfood", path: "https://www.rovr.ca/cdn/shop/products/MiniSingle_grande.png?v=1585512998" },
  { name: "Grain-Free Dog Treats", price: 4.49, category: "Petfood", path: "https://www.hillspet.ca/content/dam/pim/hills/en_ca/hills/treats/soft-baked-naturals-duck-pumpkin-treats-productShot_500.png" },
  { name: "Wet Puppy Food 300g", price: 2.99, category: "Petfood", path: "https://www.petmax.ca/cdn/shop/products/image_5afe2c44-8517-4e54-9fcc-4a79cc98e952.png?v=1683141753" },
  { name: "Fish Flavored Cat Food", price: 7.99, category: "Petfood", path: "https://assets.shop.loblaws.ca/products/20549411/b1/en/front/20549411_front_a01_@2.png" },
  { name: "Small Animal Hay 1kg", price: 6.49, category: "Petfood", path: "https://cdn.shoplightspeed.com/shops/618184/files/32394826/1000x640x2/kaytee-kaytee-natural-timothy-hay-14-kg.jpg" },
  { name: "Bird Seed Mix", price: 4.99, category: "Petfood", path: "https://assets.shop.loblaws.ca/products/21308565/b1/en/front/21308565_front_a01_@2.png" },
  { name: "Natural Rawhide Bones", price: 8.99, category: "Petfood", path: "https://assets.shop.loblaws.ca/products/21081425/b3/en/front/21081425_front_a06_@2.png" },

  // Tissues, Shampoo
  { name: "Facial Tissues 3-Ply", price: 1.79, category: "Tissues", path: "https://assets.shop.loblaws.ca/products/20978539/b3/en/front/20978539_front_a06_@2.png" },
  { name: "Pocket-Sized Tissue Pack", price: 0.99, category: "Tissues", path: "https://prolificproducts.ca/cdn/shop/products/ScreenShot2022-06-19at10.17.21PM.png?v=1655702261" },
  { name: "Aloe Vera Shampoo 500ml", price: 5.99, category: "Shampoo", path: "https://www.herbalglo.com/wp-content/uploads/2021/12/herbal-glo-plant-based-aloe-vera-shampoo.png" },
  { name: "Anti-Dandruff Shampoo 250ml", price: 4.49, category: "Shampoo", path: "https://assets.shop.loblaws.ca/products/21505049/b1/en/front/21505049_front_a01_@2.png" },
  { name: "Moisturizing Body Wash", price: 6.99, category: "Shampoo", path: "https://assets.shop.loblaws.ca/products/21230881/b2/en/front/21230881_front_a06_@2.png" },
  { name: "Scented Bath Bombs Set", price: 9.99, category: "Shampoo", path: "https://assets.unileversolutions.com/v1/35513801.png" },
  { name: "Gentle Baby Shampoo 200ml", price: 3.99, category: "Shampoo", path: "https://assets.shop.loblaws.ca/products/21112357/b2/en/front/21112357_front_a06_@2.png" },
  { name: "Hypoallergenic Baby Wipes", price: 2.49, category: "Shampoo", path: "https://assets.shop.loblaws.ca/products/21540710/b3/en/front/21540710_front_a06_@2.png" },
  { name: "Exfoliating Shower Gel", price: 7.49, category: "Shampoo", path: "https://assets.shop.loblaws.ca/products/21241168/b2/en/front/21241168_front_a06_@2.png" },
  { name: "Organic Lavender Soap", price: 4.99, category: "Shampoo", path: "https://www.ameolife.com/cdn/shop/files/lavender_5af8e872-bc83-4f0a-a89a-d1b8f8ee1195.png?v=1690455961" },

  {name: "Diapers Pack", price: 18.99, category: "Diapers", path: "https://pngimg.com/d/diaper_PNG42.png"}, 
  {name: "Baby Food Jar", price: 1.79, category: "Babyfood", path: "https://s38174.pcdn.co/wp-content/uploads/2019/01/EB_BabyFoodJars_Carrots_4oz_Front-300x300.png"},
  {name: "All-Purpose Cleaner", price: 3.49, category: "Cleaning Supplies", path: "https://assets.shop.loblaws.ca/products/21207721/b1/en/front/21207721_front_a01_@2.png"}, 
  {name: "Toilet Paper Roll", price: 15.99, category: "Toilet Paper", path: "https://i5.walmartimages.ca/images/Enlarge/905/656/6000204905656.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"},  
  {name: "Disposable Paper Plates", price: 2.49, category: "Paper Plates", path: "https://m.media-amazon.com/images/I/714nsdu6sfL._AC_UF1000,1000_QL80_.jpg"}, 
  {name: "Fresh Salmon", price: 9.99, category: "Fish", path: "https://assets.shop.loblaws.ca/products/20772308/b2/en/front/20772308_front_a06_@2.png"},  
  {name: "Mixed Vegetables", price: 2.49, category: "Vegetables", path: "https://assets.shop.loblaws.ca/products/20316388/b2/en/front/20316388_front_a06_@2.png"}, 
  {name: "Thai Curry Paste", price: 3.99, category: "International", path: "https://assets.shop.loblaws.ca/products/20712986/b1/en/front/20712986_front_a01_@2.png"},  
  {name: "Frozen Pizza", price: 5.99, category: "Pizza", path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6mlFRZxp3jf9F8tVw7PvQhOH6m-OEmp7H2g&usqp=CAU"}, 
  {name: "Vanilla Ice Cream", price: 4.99, category: "Ice Cream", path: "https://i5.walmartimages.com/asr/fa82fc0e-fa4a-46f8-a390-038d06fe9146.4ab4b32aba6628eb97b5bc30227b6047.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"},  
  {name: "Fresh Baguette", price: 2.49, category: "Bakery", path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1fIMVnVOTuGovvGLmoPzAL67ccNo9NdfgMQ&usqp=CAU"}, 
  {name: "Breakfast Cereal", price: 3.99, category: "Cereal", path: "https://assets.shop.loblaws.ca/products/21103503/b1/en/angle/21103503_angle_a01_@2.png"},  
  {name: "Strawberry Jam", price: 2.79, category: "Jam", path: "https://assets.shop.loblaws.ca/products/20308397001/b2/en/front/20308397001_front_a06_@2.png"}, 
  {name: "Orange Juice", price: 2.99, category: "Juice", path: "https://storage.googleapis.com/images-sof-prd-9fa6b8b.sof.prd.v8.commerce.mi9cloud.com/product-images/detail/00059600060211.jpg"}, 
  {name: "Ground Coffee", price: 16.99, category: "Coffee", path: "https://m.media-amazon.com/images/I/81ms6TpLMEL._AC_UF1000,1000_QL80_.jpg"},  
  {name: "Potato Chips", price: 1.99, category: "Snacks", path: "https://storage.googleapis.com/images-sof-prd-9fa6b8b.sof.prd.v8.commerce.mi9cloud.com/product-images/zoom/00060410016930.jpg"}, 
  {name: "Chocolate Chip Cookies", price: 2.49, category: "Snacks", path: "https://assets.shop.loblaws.ca/products/20612257/b3/en/front/20612257_front_a06_@2.png"},  
  {name: "Chicken Noodle Soup", price: 1.79, category: "Soup", path: "https://www.campbellsoup.ca/wp-content/uploads/2012/07/con_chicknoodle_csca.png"}, 
  {name: "Mixed Vegetable Can", price: 0.99, category: "Canned Food", path: "https://www.delmonte.com/sites/default/files/products//2017-09/mixedvegetables-nosaltadded.png"}, 
  {name: "Basmati Rice", price: 4.99, category: "Rice", path: "https://assets.shop.loblaws.ca/products/20787290/b2/en/front/20787290_front_a06_@2.png"},  
  {name: "AA Batteries", price: 5.49, category: "Electronics", path: "https://m.media-amazon.com/images/I/714ieWrwbPL.jpg"}, 
  {name: "Canned Black Beans", price: 1.49, category: "Beans", path: "https://assets.shop.loblaws.ca/products/20325921005/b2/en/front/20325921005_front_a06_@2.png"},  
  {name: "Mixed Nuts", price: 4.99, category: "Nuts", path: "https://m.media-amazon.com/images/I/71jvU7QEbML._AC_UF1000,1000_QL80_.jpg"}, 
  {name: "Cola", price: 1.29, category: "Soda", path: "https://i5.walmartimages.com/asr/ce466cd0-297c-4619-a115-605117c166da.e0444bfd6ab887dfbafba896ce106f4f.jpeg?odnHeight=450&odnWidth=450&odnBg=ffffff"}, 
  {name: "Baking Flour", price: 2.49, category: "Baking", path: "https://m.media-amazon.com/images/I/819XlmS5XmL._AC_UF1000,1000_QL80_.jpg"}, 
  {name: "Mixed Spices", price: 3.99, category: "Spices", path: "https://m.media-amazon.com/images/I/61sbnmvTCDL.jpg"}, 
  {name: "Penne Pasta", price: 1.99, category: "Pasta", path: "https://m.media-amazon.com/images/I/810iFl7wP1L._AC_UF1000,1000_QL80_.jpg"}, 
  {name: "Plastic Storage Containers", price: 6.99, category: "Plastics", path: "https://m.media-amazon.com/images/I/71nFDTAOu3L.jpg"}, 
  {name: "Olive Oil", price: 8.99, category: "Oils", path: "https://assets.shop.loblaws.ca/products/20160496002/b2/en/front/20160496002_front_a06_@2.png"}, 
  {name: "Caesar Dressing", price: 2.99, category: "Dressing & Condiments", path: "https://assets.shop.loblaws.ca/products/20628297004/b2/en/front/20628297004_front_a06_@2.png"}, 
  {name: "Baby Cereal", price: 1.99, category: "Babyfood", path: "https://assets.shop.loblaws.ca/products/20358339006/b2/en/front/20358339006_front_a06_@2.png"}, 
  {name: "Bleach", price: 6.99, category: "Cleaning Supplies", path: "https://images.homedepot.ca/productimages/p_1000661431.jpg?product-images=l"}, 
  {name: "Trash Tissue", price: 15.99, category: "Toilet Paper", path: "https://images.dailyhive.com/20200315161754/shutterstock_1122871010.jpeg"}, 
  {name: "40 Paper Plates", price: 6.99, category: "Paper Plates", path: "https://apim.canadiantire.ca/v1/product/api/v1/product/image/0429200p?baseStoreId=CTR&lang=en_CA&subscription-key=c01ef3612328420c9f5cd9277e815a0e&imwidth=640"}, 
  {name: "Frozen Fish Sticks", price: 4.99, category: "Fish", path: "https://i5.walmartimages.com/asr/8664e28f-880f-4182-8f2c-76f2bccc2cfe.738cfc499d1b1fd04b38607ff88a02ec.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"}, 
  {name: "Potato", price: 0.99, category: "Vegtables", path: "https://www.dole.com/-/media/project/dole/produce-images/vegetables/potatoes_cut_web.png?rev=b1a051bd8a484f0fa16cb33d70f738d6&hash=2FD99C8B77805DF39C6AA4C8F0C2AA9C"}, 
  {name: "Whole Chicken", price: 8.99, category: "Meat", path: "https://static01.nyt.com/images/2020/05/01/science/01TB-CHICKEN/01TB-CHICKEN-videoSixteenByNine3000.jpg?year=2020&h=1688&w=3000&s=08d78bcca3d81952683068193e144be7e941d5e4711d1ab521355c31e30381b5&k=ZQJBKqZ0VN&tw=1"}, 
  {name: "Bannana", price: 0.99, category: "Fruit", path: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Single.jpg/640px-Banana-Single.jpg"}, 
  {name: "Pizza Starter Kit", price: 5.99, category: "Pizza", path: "https://i5.walmartimages.ca/images/Enlarge/665/658/6000204665658.jpg"}, 
  {name: "Club Soda", price: 1.99, category: "Soda", path: "https://canadadry.ca/wp-content/uploads/2021/02/Club-Soda-FR-Shadow.png"}, 
  {name: "Chocolate Ice Cream", price: 8.99, category: "Ice Cream", path: "https://www.haagen-dazs.ca/sites/default/files/2023-01/Haagen-Dazs%20Chocolate%208x450ml%20CA%20%28EA%29downsized.png"}, 
  {name: "Morning Oats", price: 5.99, category: "Cereal", path: "https://m.media-amazon.com/images/I/81noCJ5IVGL._AC_UF1000,1000_QL80_.jpg"}, 
  {name: "Blueberry Jam", price: 5.99, category: "Jam", path: "https://assets.shop.loblaws.ca/products/20308397007/b2/en/front/20308397007_front_a06_@2.png"}, 
  {name: "Bread", price: 3.99, category: "Bakery", path: "https://hips.hearstapps.com/hmg-prod/images/sliced-white-bread-in-plastic-bag-isolated-on-white-royalty-free-image-1670528444.jpg"}, 
  {name: "Apple Juice", price: 1.99, category: "Juice", path: "https://assets.shop.loblaws.ca/products/20501952/b1/en/front/20501952_front_a01_@2.png"}, 
  {name: "Cookies", price: 3.99, category: "Snacks", path: "https://assets.shop.loblaws.ca/products/21358407/b2/en/front/21358407_front_a06_@2.png"}, 
  {name: "Mushroom Soup", price: 2.99, category: "Soup", path: "https://www.campbellsoup.ca/wp-content/uploads/2012/07/campbells-condensed-cream-of-mushroom.png"}, 
  {name: "Type-C Charger", price: 5.99, category: "Electronics", path: "https://m.media-amazon.com/images/I/51qzSTd-1BL._AC_UF894,1000_QL80_.jpg"}, 
  {name: "Pinto Beans", price: 3.99, category: "Beans", path: "https://assets.shop.loblaws.ca/products/20907711/b2/en/front/20907711_front_a06_@2.png"}, 
  {name: "Trail Mix", price: 16.99, category: "Nuts", path: "https://images.costco-static.com/ImageDelivery/imageService?profileId=12026539&itemId=1474436-894&recipeName=680"}, 
  {name: "Simple Bouquet", price: 19.99, category: "Flowers", path: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,w_730/k%2FEdit%2F2021-05-Grocery-Store-Flowers%2FFresh_Bouquet_1"}, 
  {name: "Molasses", price: 31.99, category: "Baking", path: "https://m.media-amazon.com/images/I/51q5fpy4QzL.jpg"}, 
  {name: "Kosher Salt", price: 12.99, category: "Spices", path: "https://assets.bonappetit.com/photos/57bf2336a184a3c9209db22e/master/w_1600%2Cc_limit/diamond-kosher-salt.jpg"}, 
  {name: "Spaghetti", price: 4.99, category: "Pasta", path: "https://www.barilla.com//-/media/images/ca/products/new-product-shots/spaghetti.png"}, 
  {name: "Sandwich Bags", price: 24.00, category: "Plastic", path: "https://m.media-amazon.com/images/I/61nASg8CRgL.jpg"}, 
  {name: "Canola Oil", price: 17.00, category: "Oil", path: "https://i5.walmartimages.com/asr/86c3d6a0-9899-497b-b0cc-823efd625b65.f35fdb7ce908b558e3f138e3fc944a8a.jpeg?odnHeight=450&odnWidth=450&odnBg=ffffff"}, 
  {name: "BBQ Sauce", price: 5.99, category: "Dressing & Condiments", path: "https://assets.shop.loblaws.ca/products/20627619007/b1/en/front/20627619007_front_a01_@2.png"}

];

function Store({aisleCategories}) {

  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    // Set a timeout to start scrolling after 3000 milliseconds (3 seconds)
    const timeoutId = setTimeout(() => {
      setScrolling(true);
    }, 1000);

    // Clear the timeout to avoid triggering the scrolling if the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div style={{display: 'flex', flexDirection: 'row', width: '125vw', height: "100vh", padding: '5vh 20vw'}}>
      {aisleCategories.map((categories, index) => (
        <Aisle key={index} categories={categories} aisleNumber={index}/>
      ))}
    </div>
  );
}

function Aisle({key, categories, aisleNumber}) {

  const paddingLeft = aisleNumber % 2 === 1; // This is so every other aisle is back-to-back like in a store

  return (
      <div key={key} style={{ display: 'flex', height: "100vh", /*flexDirection: 'column-reverse',*/ flexFlow: "column-reverse", justifyContent: 'space-around', marginLeft: paddingLeft ? '4vw' : '0.25vw', maxHeight: "100%", maxWidth: "100%"}}>
        {categories.map((category, subIndex) => (
          <Shelf key={category} category={category}/>
        ))}
      </div>
  );
}

function Shelf({key, category}) {

  const products = PRODUCTS.filter(p => p.category === category);

  return (
    <>
      <button id={category} key={category} style={{overflowY: 'auto', width: "10vw", height: "100vh", maxHeight: "100%", maxWidth: "100%", border: '1px solid black', marginBottom: "0.25vw"}}>
          <ShelvedProducts products={products}/>
      </button>
      <text style={{textAlign: 'center', border: '1px solid black', marginBottom: '0.25vh'}} >{category}</text>
     </>
  );
}

function ShelvedProducts({products}) {

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  function ProductModal() { // Saffran!!!
    return (
      <div>
        {modalOpen && (
          <div style={modalOverlayStyle} onClick={closeModal}>
            <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
              <span style={closeButtonStyle} onClick={closeModal}>&times;</span>
              <p>This is the content of the modal.</p> {/* New Component */}
            </div>
          </div>
        )}
      </div>
    );
  }

  const productImages = []
  products.forEach(p => {
    
    const id = `${p.name}-shelved`;

    productImages.push(
      <button onClick={openModal}>
        <img key={id} id={id} src={p.path} alt="https://media.istockphoto.com/id/94567758/photo/baby-sumatran-orangutan-hanging-on-rope-against-white-background.jpg?s=612x612&w=0&k=20&c=BRdK1G6gVhaZ12A-zegLkJUHB9sFe_maSXTCrOjAPAQ=" style={{maxWidth: "100%", height: 'auto'}}></img>

        <ProductModal/>
      </button>
    );
  });

  return productImages;
  
}


const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.1)', // Semi-transparent overlay
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalContentStyle = {
  background: '#fff',
  padding: '20px',
  borderRadius: '8px',
  position: 'relative',
};

const closeButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  fontSize: '20px',
  cursor: 'pointer',
};


export default function App() {

  return (
    <>
      <div>
        <FilterableProductTable products={PRODUCTS}/>
        <Store aisleCategories={CATEGORIES}/>
      </div>
    </>
  );
}