import React, { useState, useRef, useEffect } from 'react';
import './App.css';

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
  { name: "Organic Lavender Soap", price: 4.99, category: "Shampoo", ratings: "5", description: "Soothing Lavender", image: "https://media.istockphoto.com/id/94567758/photo/baby-sumatran-orangutan-hanging-on-rope-against-white-background.jpg?s=612x612&w=0&k=20&c=BRdK1G6gVhaZ12A-zegLkJUHB9sFe_maSXTCrOjAPAQ=" }
];



function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [filterCategory, setFilterCategory] = useState(null);

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
    <>
      <div className='hide-scrollbar' style={{ background: 'white', border: "1px solid black", margin: "5px", cursor: 'pointer' }} onClick={() => handleClick()}>
        <table className='hide-scrollbar'>
          <tr>
            <td>{name}</td>
          </tr>
          <tr>
            <td>{product.price}$</td>
          </tr>
          <tr>
            <img src="https://static.vecteezy.com/system/resources/previews/021/952/562/original/tasty-hamburger-on-transparent-background-png.png" width="100" height="100" />
          </tr>
        </table>
      </div>
    </>
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
    <div style={{ overflow: 'auto', height: 'auto', direction: "ltr", zIndex: '100' }}>
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
    <form >
      <input
        type="text"
        value={filterText}
        placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)}
        style={{
          flexGrow: 1, // Allows the input to grow and fill available space
          padding: '10px',
          width: '700px',
          borderRadius: '20px',
          border: '1px solid black',
          boxShadow: '4px 4px 6px rgba(0, 0, 0, 0.2)',
          fontSize: '15px',
          marginRight: '10px', // Adds some space between the input and the button
        }}
      />
      <button
        onClick={() => onFilterTextChange("")}
        style={{
          padding: '10px',
          border: '1px solid black',
          borderRadius: '30px',
          boxShadow: '4px 4px 6px rgba(0, 0, 0, 0.2)',
          cursor: 'pointer', // Changes cursor to pointer on hover
        }}
      >
        Clear
      </button>
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

  return (
    <div

      style={{ display: 'flex', flexDirection: 'row', width: '125vw', height: "85vh", padding: '5vh 20vw' }}
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
      <button id={category} key={category} style={{ overflowY: 'auto', width: "10vw", height: "100vh", maxHeight: "100%", maxWidth: "100%", border: '1px solid black', marginBottom: "0.25vw" }}>
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
  width: '50%', // Fixed width for the image
  height: 'auto', // Maintain aspect ratio
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
          padding: '10px',
          borderRadius: '20px',
          cursor: 'pointer',
          position: 'fixed',
          top: '10px',
          right: '10px'
        }}>
          View Wishlist
        </button>

        {showWishlist && (
          <div className='hide-scrollbar' style={wishListOverlayStyle} onClick={toggleWishlist}>
            <div style={wishListContentStyle} onClick={(e) => e.stopPropagation()}>
              <div style={{ overflowY: 'auto', maxHeight: '100vh' }}> {/* Scrollable list */}
                { /*<span style={closeButtonStyle} onClick={toggleWishlist}>&times;</span> */}
                {wishlist.length === 0 ? (
                  <p>There's nothing in your wishlist.</p>
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






// function WishList({ wishlist }) {
//   const [showWishlist, setShowWishlist] = useState(false);

//   const toggleWishlist = () => {
//     setShowWishlist(!showWishlist);
//   };

//   return (
//     <>
//       <button onClick={toggleWishlist} style={{
//         padding: '10px',
//         borderRadius: '20px',
//         cursor: 'pointer',
//         position: 'fixed',
//         top: '10px',
//         right: '10px',
//         zIndex: 1000
//       }}>
//         View Wishlist
//       </button>

//       {showWishlist && (
//         <div style={modalOverlayStyle}>
//           <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
//             <span style={closeButtonStyle} onClick={toggleWishlist}>&times;</span>
//             <div style={{ overflowY: 'auto', maxHeight: '400px' }}> {/* Scrollable list */}
//               {wishlist.length === 0 ? (
//                 <p>There's nothing in your wishlist.</p>
//               ) : (
//                 wishlist.map((product, index) => (
//                   <div key={index} style={{ margin: '10px' }}>
//                     <img src={product.image} alt={product.name} style={{ width: '50%', height: 'auto' }} />
//                     <p>{product.name}</p>
//                     {/*
//                       I will be working on it soon to make it more detailed -Safran 
//                     */}
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }





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