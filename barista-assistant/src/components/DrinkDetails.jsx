// src/components/DrinkDetails.jsx

import { motion, AnimatePresence } from 'framer-motion';
import BrewingGuide from './BrewingGuide';

// (کامپوننت IngredientBar بدون تغییر باقی می‌ماند)
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

// (انیمیشن بخار گرم بدون تغییر)
const HotSteamAnimation = () => {
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    initialX: Math.random() * 50 - 25,
    duration: 4 + Math.random() * 4,
    delay: Math.random() * 5,
    sway: Math.random() * 30 - 15,
  }));

  return (
    <motion.svg
      className="absolute -top-40 left-1/2 -translate-x-1/2 w-52 h-40"
      viewBox="0 0 120 100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <defs>
        <filter id="heatDistortion">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.03 0.1"
            numOctaves="2"
            result="turbulence"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="6"
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <feGaussianBlur stdDeviation="0.5" />
        </filter>
      </defs>

      <motion.g style={{ filter: 'url(#heatDistortion)' }}>
        {particles.map(p => (
          <motion.circle
            key={p.id}
            cx={60 + p.initialX}
            cy={110}
            r={2 + Math.random() * 3}
            fill="rgba(255, 248, 231, 0.6)"
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: -120,
              x: [0, p.sway, 0],
              scale: [0.5, 1.5, 1],
              opacity: [0, 1, 0.5, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.g>
    </motion.svg>
  );
};

// انیمیشن سرما با ابعاد مشابه انیمیشن گرما
const ColdEffectAnimation = () => {
  const fogPaths = [
    {
      d: "M 10,100 Q 40,60 70,100 T 110,100",
      duration: 8,
      delay: 0,
    },
    {
      d: "M 15,105 Q 50,70 80,105 T 125,105",
      duration: 10,
      delay: 2,
    },
    {
      d: "M 20,95 Q 60,55 90,95 T 100,95",
      duration: 9,
      delay: 4,
    }
  ];

  return (
    <motion.svg
      className="absolute -top-40 left-1/2 -translate-x-1/2 w-52 h-40" // ابعاد مشابه گرما
      viewBox="0 0 120 100" // viewBox مشابه گرما
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      transition={{ duration: 1 }}
    >
      <defs>
        <filter id="coldFog">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" />
        </filter>
      </defs>
      <g style={{ filter: 'url(#coldFog)' }}>
        {fogPaths.map((path, i) => (
          <motion.path
            key={i}
            d={path.d}
            stroke="white"
            strokeWidth="5"
            fill="none"
            initial={{ y: 0, x: 0, opacity: 0 }}
            animate={{
              y: -100, // حرکت به سمت بالا
              opacity: [0, 1, 1, 0],
              x: [0, 10, -10, 0], // حرکت آرام افقی
            }}
            transition={{
              duration: path.duration,
              delay: path.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </g>
    </motion.svg>
  );
};


// (کامپوننت اصلی DrinkDetails بدون تغییر در منطق اصلی)
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
          className="relative p-4 md:p-6 bg-black/30 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10 min-h-[720px] flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 items-center h-full flex-grow">

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

            <div className="h-full flex justify-center items-center order-1 md:order-2 md:col-span-1">
              <BrewingGuide drink={drink} />
            </div>

            <div className="relative flex flex-col justify-center items-center h-full order-3 md:order-3 md:col-span-1">
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
              >
                <motion.div
                  className="relative w-48 h-40 bg-white rounded-t-xl rounded-b-3xl shadow-lg"
                  animate={{
                    y: [0, -6, 0, 6, 0],
                    rotate: [0, 1.5, -1.5, 1.5, 0],
                    x: [0, 2, -2, 2, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {drink.category === 'گرم' && <HotSteamAnimation />}
                  {drink.category === 'سرد' && <ColdEffectAnimation />}

                  <motion.div
                    className="absolute bottom-0 left-0 right-0 rounded-b-3xl"
                    style={{
                      backgroundColor: drink.cupColor,
                      boxShadow: `inset 0 10px 20px rgba(0,0,0,0.2), 0 0 20px ${drink.cupColor}`,
                    }}
                    initial={{ height: 0 }}
                    animate={{ height: '85%' }}
                    transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                  />
                  <motion.svg
                    className="absolute -right-10 top-6 w-20 h-24"
                    viewBox="0 0 100 100"
                  >
                    <motion.path
                      d="M 50,20 C 80,20 80,80 50,80"
                      stroke="white"
                      strokeWidth="15"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.8 }}
                    />
                  </motion.svg>
                </motion.div>
                <div className="absolute -bottom-2 -left-6 w-60 h-6 bg-white rounded-full shadow-inner" />
              </motion.div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DrinkDetails;