import { useState } from 'react';
import Header from './components/Header';
import DrinkDetails from './components/DrinkDetails';
import Footer from './components/Footer'; // ۱. فوتر را وارد کنید
import menuData from './data/menu.json';

function App() {
  const [selectedDrink, setSelectedDrink] = useState(menuData[2]);

  return (
    // ۲. کلاس‌های flex را برای چسباندن فوتر به پایین اضافه کنید
    <div 
      className="min-h-screen font-vazir text-coffee-brown overflow-hidden relative bg-cover bg-center flex flex-col"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/50 z-0" />
      
      {/* ۳. کلاس flex-grow را اضافه کنید تا این بخش فضای خالی را پر کند */}
      <main className="relative z-10 container mx-auto p-4 md:p-8 flex-grow">
        <Header menu={menuData} onSelectDrink={setSelectedDrink} selectedDrinkId={selectedDrink?.id} />
        
        <div className="relative min-h-[550px] mt-16">
          <DrinkDetails drink={selectedDrink} />
        </div>
      </main>

      {/* ۴. کامپوننت فوتر را در انتها قرار دهید */}
      <Footer />
    </div>
  );
}

export default App;