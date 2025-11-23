import React, { useState, useMemo } from 'react';
import { MIGRATION_DATA } from './data/migrationData';
import { Category } from './types';
import CheatSheetCard from './components/CheatSheetCard';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    return MIGRATION_DATA.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.unityCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.godotCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col font-sans overflow-x-hidden">
      {/* Navbar */}
      <nav className="bg-[#1a1a1a]/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-800 h-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-8 h-8 rounded bg-gradient-to-tr from-black to-gray-700 flex items-center justify-center border border-gray-600">
                 <span className="text-white font-bold text-xs">U</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div className="w-8 h-8 rounded bg-[#478cbf] flex items-center justify-center border border-blue-400">
                 <span className="text-white font-bold text-xs">G</span>
              </div>
              <span className="ml-2 font-bold text-lg sm:text-xl tracking-tight text-white hidden sm:block">UniDot Migration</span>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md ml-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-full leading-5 bg-[#0f0f0f] text-gray-300 placeholder-gray-500 focus:outline-none focus:bg-[#1a1a1a] focus:border-[#478cbf] focus:ring-1 focus:ring-[#478cbf] text-sm transition-all"
                  placeholder="Search API..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

             <div className="hidden md:block ml-4 shrink-0">
               <a href="https://docs.godotengine.org/en/stable/" target="_blank" rel="noreferrer" className="text-xs text-[#478cbf] hover:underline">Official Docs</a>
             </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 gap-6 pt-0 lg:pt-8">
        
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24 flex flex-col max-h-[calc(100vh-8rem)]">
            <h2 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3 px-3 shrink-0">Categories</h2>
            <div className="overflow-y-auto pr-2 custom-scrollbar space-y-1 pb-4">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedCategory === 'All' 
                    ? 'bg-[#478cbf] text-white' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                All Topics
              </button>
              {Object.values(Category).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedCategory === cat 
                      ? 'bg-[#478cbf] text-white' 
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Mobile Filter (Horizontal Scroll) */}
        <div className="lg:hidden w-screen -mx-4 sm:-mx-6 px-4 sm:px-6 sticky top-16 z-40 bg-[#121212]/95 backdrop-blur border-b border-gray-800 py-3 shadow-md">
           <div className="overflow-x-auto flex gap-2 no-scrollbar pb-1">
             <button
                onClick={() => setSelectedCategory('All')}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border flex-shrink-0 transition-colors ${
                  selectedCategory === 'All' 
                    ? 'bg-[#478cbf] border-[#478cbf] text-white' 
                    : 'bg-[#1a1a1a] border-gray-700 text-gray-400'
                }`}
              >
                All
              </button>
              {Object.values(Category).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border flex-shrink-0 transition-colors ${
                    selectedCategory === cat 
                      ? 'bg-[#478cbf] border-[#478cbf] text-white' 
                      : 'bg-[#1a1a1a] border-gray-700 text-gray-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
           </div>
        </div>

        {/* Grid */}
        <main className="flex-1 min-w-0 mt-4 lg:mt-0">
          <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2">
             <div>
                <h1 className="text-2xl font-bold text-white mb-1">
                  {selectedCategory === 'All' ? 'Scripting Cheat Sheet' : selectedCategory}
                </h1>
                <p className="text-gray-400 text-sm">
                   Comparison for Unity 6 (C#) and Godot 4.5+ (GDScript).
                </p>
             </div>
             <div className="text-gray-500 text-xs font-mono">
               {filteredData.length} items found
             </div>
          </div>
          
          {filteredData.length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {filteredData.map((item) => (
                <CheatSheetCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500 bg-[#1a1a1a] rounded-lg border border-gray-800">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               <p className="text-lg">No matches found for "{searchQuery}"</p>
               <p className="text-sm mt-2 text-gray-600">Try searching for functionality (e.g., "Rotate", "Timer")</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;