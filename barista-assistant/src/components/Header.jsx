import DrinkMenu from './DrinkMenu';

// کامپوننت جدید برای دکمه‌های انتخاب دسته
function CategorySelector({ activeCategory, onCategoryChange }) {
  return (
    <div className="flex justify-center gap-4 mb-8">
      <button 
        onClick={() => onCategoryChange('گرم')}
        className={`px-6 py-2 rounded-full text-lg font-semibold transition-all duration-300 ${activeCategory === 'گرم' ? 'bg-warm-light text-coffee-brown scale-110 shadow-lg' : 'bg-black/20 text-white hover:bg-white/30'}`}
      >
        🔥 نوشیدنی گرم
      </button>
      <button 
        onClick={() => onCategoryChange('سرد')}
        className={`px-6 py-2 rounded-full text-lg font-semibold transition-all duration-300 ${activeCategory === 'سرد' ? 'bg-warm-light text-coffee-brown scale-110 shadow-lg' : 'bg-black/20 text-white hover:bg-white/30'}`}
      >
        ❄️ نوشیدنی سرد
      </button>
    </div>
  );
}


function Header({ menu, onSelectDrink, selectedDrinkId, activeCategory, onCategoryChange }) {
  return (
    <header className="text-center mb-12">
      <h1 className="text-6xl md:text-8xl font-bold text-white drop-shadow-lg mb-4">
        کافه طبیب
      </h1>
      <p className="text-xl text-warm-light mb-8 drop-shadow">نوشیدنی رویایی خود را انتخاب کنید</p>
      
      {/* اضافه کردن کامپوننت انتخاب دسته */}
      <CategorySelector activeCategory={activeCategory} onCategoryChange={onCategoryChange} />
      
      <DrinkMenu menu={menu} onSelectDrink={onSelectDrink} selectedDrinkId={selectedDrinkId} />
    </header>
  );
}

export default Header;