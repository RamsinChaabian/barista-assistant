// src/App.jsx

import { useState } from 'react';
import Header from './components/Header';
import DrinkDetails from './components/DrinkDetails';
import Footer from './components/Footer';
import menuData from './data/menu.json';

function App() {
  // اولین نوشیدنی گرم به عنوان پیش‌فرض انتخاب می‌شود
  const [selectedDrink, setSelectedDrink] = useState(menuData.find(d => d.category === 'گرم'));

  // جدا کردن منوها بر اساس دسته‌بندی
  const hotDrinks = menuData.filter(drink => drink.category === 'گرم');
  const coldDrinks = menuData.filter(drink => drink.category === 'سرد');

  const handleSelectDrink = (drink) => {
    setSelectedDrink(drink);
  };

  return (
    <div 
      className="min-h-screen font-vazir text-coffee-brown overflow-x-hidden relative bg-cover bg-center flex flex-col"
      style={{ backgroundImage: "url('background.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />
      
      <main className="relative z-10 w-full flex-grow grid grid-cols-1 md:grid-cols-12 md:gap-x-4 items-start py-4 md:py-8 px-4 md:pl-8 md:pr-4">
        
        <div className="md:col-span-2">
            <Header 
              hotDrinks={hotDrinks}
              coldDrinks={coldDrinks}
              onSelectDrink={handleSelectDrink} 
              selectedDrinkId={selectedDrink?.id}
            />
        </div>

        <div className="md:col-span-10 h-full">
            <DrinkDetails drink={selectedDrink} />
        </div>

      </main>

      <Footer />
    </div>
  );
}

export default App;