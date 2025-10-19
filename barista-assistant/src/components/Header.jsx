// src/components/Header.jsx

import DrinkMenu from './DrinkMenu';

function Header({ hotDrinks, coldDrinks, onSelectDrink, selectedDrinkId }) {
  return (
    <header className="text-right">
      <p className="text-lg text-warm-light mb-5 drop-shadow">نوشیدنی خود را انتخاب کنید</p>
      
      <div className="flex flex-col gap-4">
        
        {/* دسته گرم */}
        <div>
          <h3 className="w-full px-4 py-2.5 rounded-lg text-lg font-bold bg-black/20 text-white">
            🔥 نوشیدنی‌های گرم
          </h3>
          <div className="mt-2">
            <DrinkMenu 
              menu={hotDrinks} 
              onSelectDrink={onSelectDrink} 
              selectedDrinkId={selectedDrinkId} 
            />
          </div>
        </div>

        {/* دسته سرد */}
        <div>
          <h3 className="w-full px-4 py-2.5 rounded-lg text-lg font-bold bg-black/20 text-white">
            ❄️ نوشیدنی‌های سرد
          </h3>
          <div className="mt-2">
            <DrinkMenu 
              menu={coldDrinks} 
              onSelectDrink={onSelectDrink} 
              selectedDrinkId={selectedDrinkId} 
            />
          </div>
        </div>

      </div>
    </header>
  );
}

export default Header;