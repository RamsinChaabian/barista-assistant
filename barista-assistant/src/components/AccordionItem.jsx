// src/components/AccordionItem.jsx

import { motion, AnimatePresence } from 'framer-motion';
import DrinkMenu from './DrinkMenu';

function AccordionItem({ title, menu, isOpen, onToggle, onSelectDrink, selectedDrinkId }) {
  return (
    <div>
      <motion.button
        onClick={onToggle}
        className="w-full flex justify-between items-center px-4 py-2.5 rounded-lg text-lg font-bold bg-black/20 text-white focus:outline-none"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>{title}</span>
        <motion.span
          animate={{ rotate: isOpen ? -90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          👈
        </motion.span>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-2">
              <DrinkMenu
                menu={menu}
                onSelectDrink={onSelectDrink}
                selectedDrinkId={selectedDrinkId}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AccordionItem;