import React, { useState } from 'react';
import { Search, X, Clock, TrendingUp } from 'lucide-react';

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          background: #0f172a;
        }

        .search-wrapper {
          position: relative;
          font-family: 'Inter', sans-serif;
          width: 100%;
          max-width: 400px;
        }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(30, 41, 59, 0.8);
          padding: 10px 16px;
          border-radius: 8px;
          border: 1px solid rgba(42, 63, 82, 0.6);
          transition: all 0.2s;
          backdrop-filter: blur(10px);
        }

        .search-bar:focus-within {
          background: rgba(30, 41, 59, 0.95);
          border-color: #60a5fa;
          box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.15), 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .search-icon {
          color: #6b7a8a;
          flex-shrink: 0;
        }

        .search-input {
          border: none;
          background: none;
          outline: none;
          width: 100%;
          font-size: 14px;
          color: #f0f4f8;
          font-family: 'Inter', sans-serif;
        }

        .search-input::placeholder {
          color: #6b7a8a;
        }

        .clear-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #6b7a8a;
          transition: color 0.2s;
          display: flex;
          align-items: center;
          padding: 4px;
          flex-shrink: 0;
        }

        .clear-btn:hover {
          color: #60a5fa;
        }

        .search-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          margin-top: 8px;
          background: linear-gradient(135deg, #1a2332 0%, #151e2b 100%);
          border: 1px solid rgba(42, 63, 82, 0.8);
          border-radius: 12px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);
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
          border-bottom: 1px solid rgba(42, 63, 82, 0.5);
        }

        .dropdown-section:last-child {
          border-bottom: none;
        }

        .section-title {
          padding: 0 16px;
          font-size: 11px;
          font-weight: 700;
          color: #6b7a8a;
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
          color: #d1d8e0;
          font-size: 14px;
        }

        .search-item:hover {
          background: rgba(96, 165, 250, 0.1);
          color: #60a5fa;
        }

        .search-item-icon {
          flex-shrink: 0;
          color: #6b7a8a;
        }

        .search-item:hover .search-item-icon {
          color: #60a5fa;
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
          color: #6b7a8a;
        }

        .remove-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #6b7a8a;
          transition: color 0.2s;
          padding: 4px;
          display: flex;
          align-items: center;
        }

        .remove-btn:hover {
          color: #f87171;
        }

        .empty-state {
          padding: 32px 16px;
          text-align: center;
          color: #6b7a8a;
        }

        .empty-icon {
          font-size: 32px;
          margin-bottom: 8px;
        }

        .empty-text {
          font-size: 14px;
        }

        /* Scrollbar styling */
        .search-dropdown::-webkit-scrollbar {
          width: 6px;
        }

        .search-dropdown::-webkit-scrollbar-track {
          background: transparent;
        }

        .search-dropdown::-webkit-scrollbar-thumb {
          background: rgba(96, 165, 250, 0.2);
          border-radius: 3px;
        }

        .search-dropdown::-webkit-scrollbar-thumb:hover {
          background: rgba(96, 165, 250, 0.3);
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
        }
      `}</style>

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