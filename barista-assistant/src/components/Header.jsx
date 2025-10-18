import DrinkMenu from './DrinkMenu';

function Header({ menu, onSelectDrink, selectedDrinkId }) {
  return (
    <header className="text-center mb-12">
      <h1 className="text-6xl md:text-8xl font-bold text-white drop-shadow-lg mb-4">
        کافه طبیب
      </h1>
      <p className="text-xl text-warm-light mb-8 drop-shadow">نوشیدنی رویایی خود را انتخاب کنید</p>
      <DrinkMenu menu={menu} onSelectDrink={onSelectDrink} selectedDrinkId={selectedDrinkId} />
    </header>
  );
}

export default Header;