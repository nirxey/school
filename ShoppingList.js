import React, { useState } from 'react';
import './index.css'; 

function ShoppingList() {
  const [listName, setListName] = useState('Shopping List');
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [showInvitePopup, setShowInvitePopup] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);

  // Add item to the list
  const addItem = () => {
    if (itemName.trim() !== '') {
      setItems([...items, { name: itemName, completed: false }]);
      setItemName('');
    }
  };

  // Toggle item completion
  const toggleItemCompletion = (index) => {
    const newItems = [...items];
    newItems[index].completed = !newItems[index].completed;
    setItems(newItems);
  };

  // Remove item from the list
  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  // Handle invite
  const handleInvite = () => {
    console.log(`Inviting ${inviteEmail}...`);
    setInviteEmail('');
    setShowInvitePopup(true);
    setTimeout(() => {
      setShowInvitePopup(false);
    }, 2000);
  };

  const leaveList = () => {
    window.location.href = "https://www.google.com";
  };

  const filterHighlightedItems = () => {
    const highlightedItems = items.filter(item => item.completed);
    setFilteredItems(highlightedItems);
  };

  const cancelFilter = () => {
    setFilteredItems([]);
  };

  return (
    <div>
      <h1 className="listName">
        <input
          type="text"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          className="listNameInput" 
        />
      </h1>
      <div>
        <span>Invite a member</span>{' '} {}
        <input 
          type="text" 
          placeholder="Enter email" 
          value={inviteEmail} 
          onChange={(e) => setInviteEmail(e.target.value)} 
        />
        <button onClick={handleInvite}>Invite</button>
      </div>
      <div>
        <button className="leaveListButton" onClick={leaveList}>Leave list</button>
      </div>
      <input
        type="text"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        placeholder="Add an item..."
      />
      <button onClick={addItem}>Add Item</button>
      <button onClick={filterHighlightedItems}>Filter Highlighted Items</button>
      <button onClick={cancelFilter}>Cancel Filter</button>
      <ul>
        {(filteredItems.length > 0 ? filteredItems : items).map((item, index) => (
          <li key={index}>
            <span className={item.completed ? 'completed' : ''}>{item.name}</span>
            <button onClick={() => toggleItemCompletion(index)}>Mark</button>
            <button onClick={() => removeItem(index)}>Remove</button>
          </li>
        ))}
      </ul>
      {showInvitePopup && (
        <div className="popup">
          Invite sent!
        </div>
      )}
    </div>
  );
}

export default ShoppingList;
