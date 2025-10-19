import { motion, AnimatePresence } from 'framer-motion';

function DrinkMenu({ menu, onSelectDrink, selectedDrinkId }) {
  return (
    <nav className="flex justify-center flex-wrap gap-3 md:gap-5 min-h-[50px]">
      {/* mode="popLayout" به AnimatePresence کمک می‌کند تا انیمیشن‌های چیدمان را بهتر مدیریت کند.
      */}
      <AnimatePresence mode="popLayout">
        {menu.map((drink) => {
          const isActive = drink.id === selectedDrinkId;
          return (
            <motion.button
              // ✨ این پراپرتی جادویی، مشکل پرش را حل می‌کند!
              layout
              key={drink.id}
              onClick={() => onSelectDrink(drink)}
              className={`px-6 py-2 rounded-full text-lg font-semibold transition-colors duration-300
                ${isActive ? 'bg-warm-light text-coffee-brown scale-110 shadow-lg' : 'bg-black/20 text-white hover:bg-white/30'}`
              }
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              // استفاده از انیمیشن فنری (spring) برای حس طبیعی‌تر
              transition={{ type: 'spring', stiffness: 500, damping: 30, duration: 0.2 }}
              whileHover={{ scale: isActive ? 1.1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {drink.name}
            </motion.button>
          );
        })}
      </AnimatePresence>
    </nav>
  );
}

export default DrinkMenu;