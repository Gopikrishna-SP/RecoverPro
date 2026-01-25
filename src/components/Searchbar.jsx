import React, { useState } from 'react';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const location = useLocation();
useEffect(() => {
  setIsFocused(false);
  setSearchValue('');
}, []);

  const [recentSearches, setRecentSearches] = useState([
    'Dashboard Analytics',
    'User Management',
    'Loan Applications',
    'Transaction History'
  ]);
  const [suggestions, setSuggestions] = useState([
    { icon: TrendingUp, label: 'My Allocation', category: 'Pages' },
    { icon: TrendingUp, label: '', category: 'Pages' },
    { icon: TrendingUp, label: 'Settings', category: 'Pages' },
    { icon: TrendingUp, label: 'Loans', category: 'Pages' }
  ]);

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const handleSearchSubmit = (query) => {
    if (query.trim()) {
      if (!recentSearches.includes(query)) {
        setRecentSearches([query, ...recentSearches.slice(0, 3)]);
      }
      setSearchValue('');
      setIsFocused(false);
      console.log('Searching for:', query);
    }
  };

  const handleClearSearch = () => {
    setSearchValue('');
  };

  const handleRemoveRecent = (item) => {
    setRecentSearches(recentSearches.filter(s => s !== item));
  };

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: inherit;
}

.search-wrapper {
  position: relative;
  font-family: 'Inter', sans-serif;
  width: 100%;
}

.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  padding: 10px 12px;
  border-radius: 8px;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 12px;
  color: #94a3b8;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding-left: 40px;
  padding-right: 40px;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  color: #0f172a;
}

.search-input::placeholder {
  color: #94a3b8;
}

.search-input:focus {
  color: #0f172a;
}

.clear-btn {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  color: #64748b;
  padding: 4px;
}

.clear-btn:hover {
  color: #2563eb;
}

.search-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 8px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 20px 40px rgba(15,23,42,.15);
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.2s ease;
  max-height: 400px;
  overflow-y: auto;
  backdrop-filter: blur(20px);
}

.search-dropdown.open {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-section {
  padding: 12px 0;
  border-bottom: 1px solid #e5e7eb;
}

.dropdown-section:last-child {
  border-bottom: none;
}

.section-title {
  padding: 0 16px;
  font-size: 11px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.search-item {
  padding: 10px 16px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #334155;
  font-size: 14px;
}

.search-item:hover {
  background-color: #eff6ff;
  color: #2563eb;
}

.search-item-icon {
  flex-shrink: 0;
  color: #64748b;
}

.search-item:hover .search-item-icon {
  color: #2563eb;
}

.search-item-content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-item-label {
  font-weight: 500;
}

.search-item-category {
  font-size: 12px;
  color: #64748b;
}

.remove-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #64748b;
  transition: color 0.2s;
  padding: 4px;
  display: flex;
  align-items: center;
}

.remove-btn:hover {
  color: #dc2626;
}

.empty-state {
  padding: 32px 16px;
  text-align: center;
  color: #64748b;
}

.empty-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.empty-text {
  font-size: 14px;
}

.search-dropdown::-webkit-scrollbar {
  width: 6px;
}

.search-dropdown::-webkit-scrollbar-track {
  background: transparent;
}

.search-dropdown::-webkit-scrollbar-thumb {
  background: rgba(148,163,184,0.4);
  border-radius: 3px;
}

.search-dropdown::-webkit-scrollbar-thumb:hover {
  background: rgba(148,163,184,0.6);
}

@media (max-width: 768px) {
  .search-wrapper {
    max-width: 100%;
  }

  .search-dropdown {
    width: 100vw;
    left: 50%;
    transform: translateX(-50%) translateY(0);
    border-radius: 0;
    max-height: 60vh;
  }

  .search-dropdown.open {
    transform: translateX(-50%) translateY(0);
  }
}`}</style>

      <div className="search-wrapper">
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearchSubmit(searchValue);
              }
            }}
          />
          {searchValue && (
            <button className="clear-btn" onClick={handleClearSearch}>
              <X size={16} />
            </button>
          )}
        </div>


        <div className={`search-dropdown ${isFocused ? 'open' : ''}`}>
          {searchValue ? (
            filteredSuggestions.length > 0 ? (
              <div className="dropdown-section">
                <div className="section-title">Suggestions</div>
                {filteredSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="search-item"
                    onClick={() => handleSearchSubmit(suggestion.label)}
                  >
                    <div className="search-item-icon">
                      <suggestion.icon size={16} />
                    </div>
                    <div className="search-item-content">
                      <span className="search-item-label">{suggestion.label}</span>
                      <span className="search-item-category">{suggestion.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <div className="empty-text">No results found</div>
              </div>
            )
          ) : (
            <>
              {recentSearches.length > 0 && (
                <div className="dropdown-section">
                  <div className="section-title">Recent Searches</div>
                  {recentSearches.map((search, index) => (
                    <div key={index} className="search-item">
                      <Clock size={16} className="search-item-icon" />
                      <div className="search-item-content">
                        <span
                          className="search-item-label"
                          onClick={() => handleSearchSubmit(search)}
                          style={{ cursor: 'pointer', flex: 1 }}
                        >
                          {search}
                        </span>
                      </div>
                      <button
                        className="remove-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveRecent(search);
                        }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="dropdown-section">
                <div className="section-title">Quick Links</div>
                {suggestions.slice(0, 4).map((suggestion, index) => (
                  <div
                    key={index}
                    className="search-item"
                    onClick={() => handleSearchSubmit(suggestion.label)}
                  >
                    <div className="search-item-icon">
                      <suggestion.icon size={16} />
                    </div>
                    <div className="search-item-content">
                      <span className="search-item-label">{suggestion.label}</span>
                      <span className="search-item-category">{suggestion.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}