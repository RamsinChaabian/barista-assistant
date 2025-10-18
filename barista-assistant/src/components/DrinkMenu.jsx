import { motion } from 'framer-motion';

function DrinkMenu({ menu, onSelectDrink, selectedDrinkId }) {
  return (
    <nav className="flex justify-center flex-wrap gap-3 md:gap-5">
      {menu.map((drink) => {
        const isActive = drink.id === selectedDrinkId;
        return (
          <motion.button
            key={drink.id}
            onClick={() => onSelectDrink(drink)}
            className={`px-6 py-2 rounded-full text-lg font-semibold transition-all duration-300
              ${isActive ? 'bg-warm-light text-coffee-brown scale-110 shadow-lg' : 'bg-black/20 text-white hover:bg-white/30'}`
            }
            whileHover={{ scale: isActive ? 1.1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {drink.name}
          </motion.button>
        );
      })}
    </nav>
  );
}

export default DrinkMenu;