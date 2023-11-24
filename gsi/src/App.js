import React, { useState, useRef, useEffect } from 'react';

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [filterCategory, setFilterCategory] = useState(null);

  // <div style={{position: 'absolute', height: '750px', width: "500px", overflow: 'auto', direction: 'ltr'}}></div>

  return (
    <div style={{ position: 'fixed' }}>
      <SearchBar
        filterText={filterText}
        onFilterTextChange={setFilterText} />
      <ProductTable
        products={products}
        filterText={filterText} />
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
        shelfItem.scrollIntoView({ behavior: 'smooth' })

        if (productItem) {
          productItem.scrollIntoView({ behavior: 'smooth' });
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
        value={filterText} placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)} />
      <button onClick={() => onFilterTextChange("")}>clear</button>
    </form>
  );
}
/*
const PRODUCTS = [
  {category: "Fruits", price: "$1", name: "Apple"},
  {category: "Fruits", price: "$1", name: "Dragonfruit"},
  {category: "Fruits", price: "$2", name: "Passionfruit"},
  {category: "Vegetables", price: "$2", name: "Spinach"},
  {category: "Vegetables", price: "$4", name: "Pumpkin"},
  {category: "Vegetables", price: "$1", name: "Peas"},
  {category: "Fruits", price: "$1", name: "Pear"},
  {category: "Fruits", price: "$1", name: "Peach"},
  {category: "Fruits", price: "$2", name: "Plumb"},
  {category: "Vegetables", price: "$2", name: "Carrot"},
  {category: "Vegetables", price: "$4", name: "Squash"},
  {category: "Vegetables", price: "$1", name: "Beans"},
];
*/

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

function Store({ aisleCategories }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '125vw', height: "125vw", padding: '5vh 20vw' }}>
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
      {
        categories.map((category, subIndex) => (
          <Shelf key={category} category={category} />
        ))
      }
    </div >
  );
}

function Shelf({ key, category }) {

  const [focused, setFocused] = useState(false);

  function ShelvedProducts({ products }) {

    const productImages = []

    products.forEach(p => {

      const id = `${p.name}-shelved`;

      productImages.push(
        <img key={id} id={id} src="https://static.vecteezy.com/system/resources/previews/021/952/562/original/tasty-hamburger-on-transparent-background-png.png" style={{ maxWidth: "100%", height: 'auto', border: '1px solid black' }}></img>
      );
    });

    return productImages;

  }

  function FocusedShelf(category) {
    const products = PRODUCTS.filter(p => p.category == category);
    return <ShelvedProducts products={products} />
  }

  function UnfocusedShelf(category) {
    return category;
  }


  return (
    <button id={category} key={category} style={{ overflowY: 'auto', width: "10vw", height: "100vh", maxHeight: "100%", maxWidth: "100%", border: '1px solid black', marginBottom: "0.25vw" }} onClick={() => setFocused(!focused)}>
      {focused ? FocusedShelf(category) : UnfocusedShelf(category)}
    </button>
  );
}

export default function App() {
  console.log(CATEGORIES);

  return (
    <>
      <FilterableProductTable products={PRODUCTS} />
      <Store aisleCategories={CATEGORIES} />
    </>
  );
}