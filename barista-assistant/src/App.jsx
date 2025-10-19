// src/App.jsx

import { useState } from 'react';
import Header from './components/Header';
import DrinkDetails from './components/DrinkDetails';
import Footer from './components/Footer';
import menuData from './data/menu.json';

function App() {
  const [activeCategory, setActiveCategory] = useState('گرم');
  
  // پیدا کردن اولین نوشیدنی از دسته فعال برای نمایش اولیه
  const [selectedDrink, setSelectedDrink] = useState(menuData.find(d => d.category === activeCategory));

  // فیلتر کردن منو بر اساس دسته فعال
  const filteredMenu = menuData.filter(drink => drink.category === activeCategory);

  const handleSelectDrink = (drink) => {
    setSelectedDrink(drink);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    // با تغییر دسته، اولین نوشیدنی از دسته جدید را انتخاب کن
    const firstDrinkOfCategory = menuData.find(d => d.category === category);
    setSelectedDrink(firstDrinkOfCategory);
  };

  return (
    <div 
      className="min-h-screen font-vazir text-coffee-brown overflow-hidden relative bg-cover bg-center flex flex-col"
      style={{ backgroundImage: "url('background.jpg')" }}
    >
      {/* ✨ تغییر در این خط */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />
      
      <main className="relative z-10 container mx-auto p-4 md:p-8 flex-grow">
        <Header 
          menu={filteredMenu} 
          onSelectDrink={handleSelectDrink} 
          selectedDrinkId={selectedDrink?.id}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange} 
        />
        
        <div className="relative min-h-[auto] md:min-h-[550px] mt-16">
          <DrinkDetails drink={selectedDrink} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;