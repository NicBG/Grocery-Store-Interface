import React, { useState, useRef, useEffect } from 'react';

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
    <div style={{ overflow: 'auto', height: "830px", direction: "ltr" }}>
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
          zIndex: '1000'
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

function Store({ aisleCategories, addToWishlist }) {

  return (
    <div

      style={{ display: 'flex', flexDirection: 'row', width: '125vw', height: "85vh", padding: '8vh 15vw' }}
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
      key={key} style={{ display: 'flex', height: "90vh", /*flexDirection: 'column-reverse',*/ flexFlow: "column-reverse", justifyContent: 'space-around', marginLeft: paddingLeft ? '3vw' : '0.25vw', maxHeight: "100%", maxWidth: "100%" }}
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
      <button id={category} key={category} style={{ overflowY: 'auto', width: "10vw", height: "100vh", maxHeight: "100%", maxWidth: "100%", border: '1px solid black', marginBottom: "0.2vw", marginTop: "0.3vw" }}>
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
  const [wishListedProduct, setwishListedProduct] = useState(null);


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
              <img src={product.image} alt={product.name} style={{ width: '50%', height: 'auto' }} />
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
  background: 'rgba(0, 0, 0, 0.1)', // Semi-transparent overlay
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
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



function WishList({ wishlist }) {
  const [showWishlist, setShowWishlist] = useState(false);

  const toggleWishlist = () => {
    setShowWishlist(!showWishlist);
  };

  return (
    <>
      <button onClick={toggleWishlist} style={{
        padding: '10px',
        borderRadius: '20px',
        cursor: 'pointer',
        position: 'fixed',
        bottom: '30px',
        left: '60px',
        zIndex: 1000
      }}>
        View Wishlist
      </button>

      {showWishlist && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <span style={closeButtonStyle} onClick={toggleWishlist}>&times;</span>
            <div style={{ overflowY: 'auto', maxHeight: '400px' }}> {/* Scrollable list */}
              {wishlist.length === 0 ? (
                <p>There's nothing in your wishlist.</p>
              ) : (
                wishlist.map((product, index) => (
                  <div key={index} style={{ margin: '10px' }}>
                    <p>{product.name}</p>
                    {/*
                      I will be working on it soon to make it more detailed -Safran 
                    */}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}





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
        setLeftArrowColor('#FF0000');
        window.scrollBy(-scrollAmount, 0);
      } else if (direction === 'right') {
        setRightArrowColor('#FF0000');
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
      <style>{`
        body {
          margin: 0;
          padding: 0;
          background-color: #FFFFFF;
        }

        /* WebKit (Chrome, Safari) */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px; /* Add this line for the horizontal scrollbar */
        }

        ::-webkit-scrollbar-thumb {
          background-color: transparent;
        }

        /* Firefox */
        body {
          scrollbar-width: thin;
        }

        body::-webkit-scrollbar-thumb {
          background-color: transparent;
        }

        body::-webkit-scrollbar-track {
          background-color: #FFFFFF; /* Adjust this color as needed */
        }

        body::-webkit-scrollbar-track-piece {
          background-color: transparent;
        }

        .scroll-arrow {
          position: fixed;
          top: 20px; /* Adjust the positioning as needed */
          width: 50px;
          height: 30px;
          background-color: #ffffff;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          z-index: 1000;
        }

        .scroll-arrow-left {
          left: 250px;
        }

        .scroll-arrow-right {
          right: 20px;
        }

      `}</style>

      <div
        className="scroll-arrow scroll-arrow-left"
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
        className="scroll-arrow scroll-arrow-right"
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