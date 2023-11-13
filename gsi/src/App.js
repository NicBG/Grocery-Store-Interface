import { useState } from 'react';

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar 
        filterText={filterText} 
        onFilterTextChange={setFilterText}
        inStockOnly={inStockOnly} 
        onInStockOnlyChange={setInStockOnly} />
      <ProductTable 
        products={products} 
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    //<span style={{ color: 'red' }}>
    <span>
      {product.name}
    </span>;

  return (
    <div style={{border: "1px solid black", margin: "10px"}}>
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
      <tr>
        <img src="https://static.vecteezy.com/system/resources/previews/021/952/562/original/tasty-hamburger-on-transparent-background-png.png" width="100" height="100"/>
      </tr>
    </div>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
  });

  return (
    <table>
      <tbody>{rows}</tbody>
    </table>
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
    </form>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", name: "Apple"},
  {category: "Fruits", price: "$1", name: "Dragonfruit"},
  {category: "Fruits", price: "$2", name: "Passionfruit"},
  {category: "Vegetables", price: "$2", name: "Spinach"},
  {category: "Vegetables", price: "$4", name: "Pumpkin"},
  {category: "Vegetables", price: "$1", name: "Peas"}
];

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

const Box = ({ dataArray }) => (
  <div style={{display: 'flex', flexDirection: 'row-reverse', margin: '10px' }}>
    {dataArray.map((subArray, index) => (
      <div key={index} style={{ display: 'flex', height: "500px", flexDirection: 'column-reverse', justifyContent: 'space-between', paddingLeft: index % 2 === 1 ? '20px' : '0px'}}>
        {subArray.map((text, subIndex) => (
          <button key={subIndex} style={{height: "100%", border: '1px solid black', padding: '5px' }}>{text}</button>
        ))}
      </div>
    ))}
  </div>
);

function Store({aisleCategories}) {
  return (
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <div style={{display: 'flex', flexDirection: 'row-reverse', margin: '10px' }}>
      {aisleCategories.map((categories, index) => (
        <Aisle key={index} categories={categories} aisleNumber={index}/>
      ))}
    </div>
  </div>
  );
}

function Aisle({key, categories, aisleNumber}) {

  const paddingLeft = aisleNumber % 2 === 1; // This is so every other ailse is back-to-back like in a store

  return (
      <div key={key} style={{ display: 'flex', height: "500px", flexDirection: 'column-reverse', justifyContent: 'space-between', marginLeft: paddingLeft ? '20px' : '2px'}}>
        {categories.map((category, subIndex) => (
          <SubAisle key={category} category={category}/>
        ))}
      </div>
  );
}

function SubAisle({key, category}) {
  return (
      <button key={category} style={{height: "100%", border: '1px solid black', marginBottom: "2px"}}>{category}</button>
  );
}

export default function App() {
  //return <FilterableProductTable products={PRODUCTS} />;
  return <Store aisleCategories={CATEGORIES}/>
}