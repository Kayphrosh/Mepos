import React, { useState } from "react";
import { itemsData } from "./items-data";
import PosTable from "./pos-table";
import PosPayment from "./pos-payment";
import './pos.scss'



const Pos = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="role-container users-container pos-container">
    
          <div className="filter-container">
            <div className="search">
              <input
                type="search"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button>
              <select>
                <option value="All" placeholder="All">All</option>
                {itemsData.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.itemName}
                  </option>
                ))}
              </select>
              </button>
            </div>
    
          </div>
    
          <PosTable searchQuery={searchQuery} />
          <PosPayment/>
        </div>
    );

};

export default Pos;