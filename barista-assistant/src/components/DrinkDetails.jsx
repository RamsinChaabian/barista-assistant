// src/components/DrinkDetails.jsx

import { motion, AnimatePresence } from 'framer-motion';
import BrewingGuide from './BrewingGuide';

// کامپوننت نوار نمایش مواد اولیه (بدون تغییر)
const IngredientBar = ({ name, gram, color, maxGram }) => {
  const percentage = maxGram > 0 ? (gram / maxGram) * 100 : 0;
  
  const getIngredientName = (name) => {
    const names = {
      coffee: 'قهوه', milk: 'شیر', water: 'آب', chocolate: 'شکلات',
      ice: 'یخ', ice_cream: 'بستنی', chocolate_sauce: 'سس شکلات',
      nutella: 'نوتلا', soda: 'سودا', lime: 'لیمو', mint: 'نعنا',
      caramel_sauce: 'سس کارامل', oreo: 'اورئو'
    };
    return names[name] || name;
  };
  
  return (
    <div className="w-full mb-4">
      <div className="flex justify-between items-center mb-1 text-warm-light font-semibold">
        <span>{getIngredientName(name)}</span>
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

// کامپوننت انیمیشن بخار گرم (بدون تغییر)
const HotSteamAnimation = () => (
  <motion.svg
    className="absolute -top-10 w-24 h-24 opacity-50"
    animate={{ y: [0, -20, 0], opacity: [0.5, 0.1, 0.5], scale: [1, 1.1, 1] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
  >
    <path d="M10 80 Q 20 50 30 80 T 50 80" stroke="#FFFFFF" fill="none" strokeWidth="2" />
    <path d="M20 70 Q 30 40 40 70 T 60 70" stroke="#E0E0E0" fill="none" strokeWidth="1.5" />
  </motion.svg>
);

// ✨ کامپوننت انیمیشن سرما (اصلاح شده)
const ColdEffectAnimation = () => {
  // موقعیت‌های جدید برای فاصله بیشتر و توزیع بهتر
  const particles = [
    { x: 10, y: 35, delay: 0, scale: 0.8 },
    { x: 30, y: 15, delay: 0.8, scale: 1 },
    { x: 60, y: 40, delay: 1.5, scale: 0.9 },
    { x: 85, y: 20, delay: 2.2, scale: 1.1 },
  ];

  return (
    // کانتینر SVG بزرگتر شده و به فنجان نزدیک‌تر است
    <motion.svg
      className="absolute -top-8 w-40 h-24 opacity-70"
      viewBox="0 0 100 50" // viewBox برای کنترل بهتر موقعیت‌ها
    >
      {particles.map((p, i) => (
        <motion.path
          key={i}
          d="M10 10 L12 6 L14 10 L18 12 L14 14 L12 18 L10 14 L6 12 L10 10 Z"
          fill="#FFFFFF"
          initial={{ x: p.x, y: p.y, scale: p.scale }}
          animate={{
            y: [p.y, p.y - 15, p.y], // حرکت عمودی بیشتر
            x: [p.x, p.x + 8, p.x - 8, p.x], // حرکت افقی ملایم
            opacity: [0.8, 0.2, 0.8],
            rotate: [0, 180, 360], // چرخش برای حس بهتر
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </motion.svg>
  );
};

// کامپوننت اصلی (بدون تغییر منطقی)
function DrinkDetails({ drink }) {
  const ingredients = drink ? Object.entries(drink.ingredients) : [];
  const maxGram = drink ? Math.max(...Object.values(drink.ingredients).filter(val => val > 0), 1) : 1;

  const ingredientColors = {
    coffee: '#6F4E37', milk: '#F5F5DC', water: '#A7D2E8', chocolate: '#4D2B1E',
    ice: '#E0F7FA', ice_cream: '#FFF9C4', chocolate_sauce: '#3E2723',
    nutella: '#A67B5B', soda: '#F5F5F5', lime: '#8BC34A', mint: '#2E7D32',
    caramel_sauce: '#BF360C', oreo: '#263238'
  };

  return (
    <AnimatePresence mode="wait">
      {drink && (
        <motion.div
          key={drink.id}
          className="relative p-4 md:p-6 bg-black/30 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 items-center h-full">
            
            <div className="text-start h-full flex flex-col justify-center order-2 md:order-1 md:col-span-1">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">{drink.name}</h2>
              <p className="text-warm-light leading-relaxed mb-6 text-sm lg:text-base">{drink.description}</p>
              <div>
                {ingredients.map(([name, gram]) =>
                  gram > 0 && (
                    <IngredientBar
                      key={name} name={name} gram={gram}
                      color={ingredientColors[name] || '#FFFFFF'}
                      maxGram={maxGram}
                    />
                  )
                )}
              </div>
            </div>

            <div className="h-full order-1 md:order-2 md:col-span-1 mt-8 md:mt-0">
              <BrewingGuide drink={drink} />
            </div>

            <div className="relative flex justify-center items-center h-80 order-3 md:order-3 md:col-span-1">
              {drink.category === 'گرم' && <HotSteamAnimation />}
              {drink.category === 'سرد' && <ColdEffectAnimation />}
              
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

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DrinkDetails;