// src/components/DrinkDetails.jsx

import { motion, AnimatePresence } from 'framer-motion';
import BrewingGuide from './BrewingGuide'; // کامپوننت راهنما را وارد کنید

// کامپوننت نوار مواد
const IngredientBar = ({ name, gram, color, maxGram }) => {
  const percentage = maxGram > 0 ? (gram / maxGram) * 100 : 0;
  return (
    <div className="w-full mb-4">
      <div className="flex justify-between items-center mb-1 text-warm-light font-semibold">
        <span>{name}</span>
        <span className="font-vazir">{gram} گرم</span>
      </div>
      <div className="w-full bg-white/20 rounded-full h-2.5">
        <motion.div
          className="h-2.5 rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "circOut" }}
        />
      </div>
    </div>
  );
};

function DrinkDetails({ drink }) {
  const ingredients = drink ? Object.values(drink.ingredients) : [];
  const maxGram = Math.max(...ingredients, 1);

  const ingredientColors = {
      coffee: '#6F4E37',
      milk: '#F5F5DC',
      water: '#A7D2E8',
      chocolate: '#4D2B1E'
  };

  return (
    <AnimatePresence>
      {drink && (
        <motion.div
          key={drink.id}
          className="absolute inset-0 p-4 md:p-6 bg-black/30 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* استفاده از گرید برای نمایش سه ستون در کنار هم */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center h-full">
            
            {/* ستون اول: توضیحات و مواد تشکیل دهنده */}
            <div className="text-start h-full flex flex-col justify-center">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">{drink.name}</h2>
              <p className="text-warm-light leading-relaxed mb-6 text-sm lg:text-base">{drink.description}</p>
              
              <div>
                {Object.entries(drink.ingredients).map(([name, gram]) =>
                  gram > 0 && (
                    <IngredientBar
                      key={name}
                      name={name === 'coffee' ? 'قهوه' : name === 'milk' ? 'شیر' : name === 'water' ? 'آب' : 'شکلات'}
                      gram={gram}
                      color={ingredientColors[name] || '#FFFFFF'}
                      maxGram={maxGram}
                    />
                  )
                )}
              </div>
            </div>

            {/* ستون دوم: فنجان اصلی و انیمیشن بخار */}
            <div className="relative flex justify-center items-center h-80 order-first md:order-none">
              <motion.svg
                className="absolute -top-10 w-24 h-24 opacity-50"
                animate={{ y: [0, -20, 0], opacity: [0.5, 0.1, 0.5], scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <path d="M10 80 Q 20 50 30 80 T 50 80" stroke="#FFFFFF" fill="none" strokeWidth="2" />
                <path d="M20 70 Q 30 40 40 70 T 60 70" stroke="#E0E0E0" fill="none" strokeWidth="1.5" />
              </motion.svg>
              
              <motion.div
                className="w-48 h-40 rounded-b-full border-8 border-t-0"
                style={{ borderColor: '#E0E0E0' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="w-full h-full rounded-b-full"
                  style={{ backgroundColor: drink.cupColor }}
                  initial={{ height: 0 }}
                  animate={{ height: '100%' }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                />
              </motion.div>
            </div>

            {/* ستون سوم: راهنمای ترکیب */}
            <div className="h-full hidden md:block">
              <BrewingGuide drink={drink} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DrinkDetails;