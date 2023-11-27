import React, { useState, useRef, useEffect } from 'react';


function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [filterCategory, setFilterCategory] = useState(null);

  // <div style={{position: 'absolute', height: '750px', width: "500px", overflow: 'auto', direction: 'ltr'}}></div>

  return (
    <div>
      <div style={{
        position: 'fixed',
        top: '3%',
        left: '60%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        textAlign: 'center'
      }}>
        <SearchBar
          filterText={filterText}
          onFilterTextChange={setFilterText} />
      </div>
      <div style={{ position: 'fixed' }}>
        <ProductTable
          products={products}
          filterText={filterText} />
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
    <div style={{ background: 'white', border: "1px solid black", margin: "10px", cursor: 'pointer' }} onClick={() => handleClick()}>
      <tr>
        <td>{name}</td>
      </tr>
      <tr>
        <td>{product.price}$</td>
      </tr>
      <tr>
        <img src="https://static.vecteezy.com/system/resources/previews/021/952/562/original/tasty-hamburger-on-transparent-background-png.png" width="100" height="100" />
      </tr>
    </div>
  );
}

function ProductTable({ products, filterText }) {
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
    <div style={{ overflow: 'auto', height: "750px", direction: "ltr" }}>
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
        value={filterText}
        placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)}
        style={{
          width: '30%',
          padding: '10px',
          position: 'relative',
          left: '-60px',
          top: '-10px',
          //margin: '0px 20px 10px 0px',
          borderRadius: '20px',
          border: '1px solid black',
          boxShadow: '4px 4px 6px red',
          fontSize: '18px',
        }}
      />
      <button
        onClick={() => onFilterTextChange("")}
        style={{
          width: '70px',
          padding: '10px',
          position: 'relative',
          left: '-30px',
          top: '-10px',
          //margin: '0px 20px 10px 0px',
          borderRadius: '30px',
          //border: '1px solid black',
          boxShadow: '4px 4px 6px red',
          //fontSize: '18px',
        }}

      >Clear</button>
    </form >
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

const PRODUCTS = [
  // Water
  { name: "Bottled Water 500ml", price: 1.99, category: "Water" },
  { name: "Spring Water 1L", price: 2.49, category: "Water" },
  { name: "Mineral Water 750ml", price: 1.79, category: "Water" },
  { name: "Purified Water 1.5L", price: 2.99, category: "Water" },
  { name: "Sparkling Water 330ml", price: 1.49, category: "Water" },
  { name: "Coconut Water 500ml", price: 2.29, category: "Water" },
  { name: "Flavored Watermelon Water", price: 2.79, category: "Water" },
  { name: "Alkaline Water 1L", price: 3.99, category: "Water" },
  { name: "Sport Electrolyte Water", price: 2.99, category: "Water" },
  { name: "Artesian Water 750ml", price: 2.69, category: "Water" },

  // Petfood
  { name: "Dry Dog Food 5kg", price: 12.99, category: "Petfood" },
  { name: "Canned Cat Food 400g", price: 1.49, category: "Petfood" },
  { name: "Pet Treats Variety Pack", price: 5.99, category: "Petfood" },
  { name: "Premium Catnip", price: 3.99, category: "Petfood" },
  { name: "Grain-Free Dog Treats", price: 4.49, category: "Petfood" },
  { name: "Wet Puppy Food 300g", price: 2.99, category: "Petfood" },
  { name: "Fish Flavored Cat Litter", price: 7.99, category: "Petfood" },
  { name: "Small Animal Hay 1kg", price: 6.49, category: "Petfood" },
  { name: "Bird Seed Mix", price: 4.99, category: "Petfood" },
  { name: "Natural Rawhide Bones", price: 8.99, category: "Petfood" },

  // Tissues, Shampoo
  { name: "Facial Tissues 3-Ply", price: 1.79, category: "Tissues" },
  { name: "Pocket-Sized Tissue Pack", price: 0.99, category: "Tissues" },
  { name: "Aloe Vera Shampoo 500ml", price: 5.99, category: "Shampoo" },
  { name: "Anti-Dandruff Shampoo 250ml", price: 4.49, category: "Shampoo" },
  { name: "Moisturizing Body Wash", price: 6.99, category: "Shampoo" },
  { name: "Scented Bath Bombs Set", price: 9.99, category: "Shampoo" },
  { name: "Gentle Baby Shampoo 200ml", price: 3.99, category: "Shampoo" },
  { name: "Hypoallergenic Baby Wipes", price: 2.49, category: "Shampoo" },
  { name: "Exfoliating Shower Gel", price: 7.49, category: "Shampoo" },
  { name: "Organic Lavender Soap", price: 4.99, category: "Shampoo" },
];

function Store({ aisleCategories }) {

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
    <div style={{ display: 'flex', flexDirection: 'row', width: '125vw', height: "100vh", padding: '5vh 20vw' }}>
      {aisleCategories.map((categories, index) => (
        <Aisle key={index} categories={categories} aisleNumber={index} />
      ))}
    </div>
  );
}

function Aisle({ key, categories, aisleNumber }) {

  const paddingLeft = aisleNumber % 2 === 1; // This is so every other aisle is back-to-back like in a store

  return (
    <div key={key} style={{ display: 'flex', height: "100vh", /*flexDirection: 'column-reverse',*/ flexFlow: "column-reverse", justifyContent: 'space-around', marginLeft: paddingLeft ? '4vw' : '0.25vw', maxHeight: "100%", maxWidth: "100%" }}>
      {categories.map((category, subIndex) => (
        <Shelf key={category} category={category} />
      ))}
    </div>
  );
}

function Shelf({ key, category }) {

  const products = PRODUCTS.filter(p => p.category == category);

  return (
    <>
      <button id={category} key={category} style={{ overflowY: 'auto', width: "10vw", height: "100vh", maxHeight: "100%", maxWidth: "100%", border: '1px solid black', marginBottom: "0.25vw" }}>
        <ShelvedProducts products={products} />
      </button>
      <text style={{ textAlign: 'center', border: '1px solid black', marginBottom: '0.25vh' }} >{category}</text>
    </>
  );
}

function ShelvedProducts({ products }) {

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
              <p>Work in progress :(</p> {/* New Component */}
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
        <img key={id} id={id} src="https://media.istockphoto.com/id/94567758/photo/baby-sumatran-orangutan-hanging-on-rope-against-white-background.jpg?s=612x612&w=0&k=20&c=BRdK1G6gVhaZ12A-zegLkJUHB9sFe_maSXTCrOjAPAQ=" style={{ maxWidth: "100%", height: 'auto' }}></img>

        <ProductModal />
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
        <FilterableProductTable products={PRODUCTS} />
        <Store aisleCategories={CATEGORIES} />
      </div>
    </>
  );
}