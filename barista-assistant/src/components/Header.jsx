// src/components/Header.jsx

import AccordionItem from './AccordionItem';

function Header({ hotDrinks, coldDrinks, syrupDrinks, onSelectDrink, selectedDrinkId, openCategory, setOpenCategory }) {
  const categories = [
    { title: '🔥 نوشیدنی‌های گرم', menu: hotDrinks, key: 'hot' },
    { title: '❄️ نوشیدنی‌های سرد', menu: coldDrinks, key: 'cold' },
    { title: '🍹 شربت‌ها', menu: syrupDrinks, key: 'syrup' },
  ];

  return (
    <header className="text-right">
      <p className="text-lg text-warm-light mb-5 drop-shadow">نوشیدنی خود را انتخاب کنید</p>
      
      <div className="flex flex-col gap-4">
        {categories.map(category => (
          <AccordionItem
            key={category.key}
            title={category.title}
            menu={category.menu}
            isOpen={openCategory === category.key}
            onToggle={() => setOpenCategory(openCategory === category.key ? null : category.key)}
            onSelectDrink={onSelectDrink}
            selectedDrinkId={selectedDrinkId}
          />
        ))}
      </div>
    </header>
  );
}

export default Header;