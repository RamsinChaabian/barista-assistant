// src/components/DrinkMenu.jsx

import { motion, AnimatePresence } from 'framer-motion';

function DrinkMenu({ menu, onSelectDrink, selectedDrinkId }) {
  return (
    <motion.nav 
      className="flex flex-col gap-1.5 pr-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence>
        {menu.map((drink, index) => {
          const isActive = drink.id === selectedDrinkId;
          return (
            <motion.button
              layout
              key={drink.id}
              onClick={() => onSelectDrink(drink)}
              className={`w-full text-right px-3 py-1.5 rounded-md text-base font-medium transition-colors duration-200
                ${isActive ? 'bg-white/20 text-warm-light' : 'text-white/80 hover:bg-white/10'}`
              }
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: 'spring', stiffness: 400, damping: 40, delay: index * 0.05 }}
            >
              {drink.name}
            </motion.button>
          );
        })}
      </AnimatePresence>
    </motion.nav>
  );
}

export default DrinkMenu;