import React, { useState } from 'react';
import './App.css';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    ingredients: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const addItem = () => {
    if (newItem.name.trim() !== '' && newItem.price.trim() !== '' && newItem.ingredients.trim() !== '') {
      setMenuItems([...menuItems, newItem]);
      setNewItem({
        name: '',
        price: '',
        ingredients: ''
      });
    }
  };

  const removeItem = (index) => {
    const updatedMenuItems = [...menuItems];
    updatedMenuItems.splice(index, 1);
    setMenuItems(updatedMenuItems);
  };

  return (
    <div className="menu-container">
      <div className="left-section">
        <h2>Adicionar Item</h2>
        <div>
          <label>Nome:</label>
          <input type="text" name="name" value={newItem.name} onChange={handleInputChange} />
        </div>
        <div>
          <label>Preço:</label>
          <input type="number" name="price" value={newItem.price} onChange={handleInputChange} />
        </div>
        <div>
          <label>Ingredientes:</label>
          <input type="text" name="ingredients" value={newItem.ingredients} onChange={handleInputChange} />
        </div>
        <button onClick={addItem}>Adicionar</button>
      </div>
      <div className="right-section">
        <h2>Menu</h2>
        {menuItems.map((item, index) => (
          <div key={index} className="menu-item">
            <div>
              <strong>{item.name}</strong> - {item.price}
            </div>
            <div>Ingredients: {item.ingredients}</div>
            <button onClick={() => removeItem(index)}>Remover</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
