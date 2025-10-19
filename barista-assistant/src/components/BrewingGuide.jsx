// src/components/BrewingGuide.jsx

import { motion } from 'framer-motion';

// رنگ‌های مواد اولیه جدید اضافه شدند
const ingredientColors = {
  coffee: '#6F4E37',
  milk: '#F5F5DC',
  water: '#A7D2E8',
  chocolate: '#4D2B1E',
  ice: '#E0F7FA',
  ice_cream: '#FFF9C4',
  chocolate_sauce: '#3E2723',
  nutella: '#A67B5B',
  soda: '#F5F5F5',
  lime: '#8BC34A',
  mint: '#2E7D32',
  caramel_sauce: '#BF360C',
  oreo: '#263238'
};

// تابع تشخیص رنگ متضاد برای خوانایی بهتر متن روی هر لایه
const getContrastColor = (hexColor) => {
  if (!hexColor || hexColor.length < 7) return '#000000';
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? '#000000' : '#FFFFFF';
};


function BrewingGuide({ drink }) {
  if (!drink) return null;

  const ingredients = Object.entries(drink.ingredients)
    .filter(([, gram]) => gram > 0);
  
  const totalGram = ingredients.reduce((sum, [, gram]) => sum + gram, 0);

  // ترجمه‌های جدید برای مواد اولیه
  const getIngredientName = (name) => {
    switch (name) {
      case 'coffee': return 'قهوه';
      case 'milk': return 'شیر';
      case 'water': return 'آب';
      case 'chocolate': return 'شکلات';
      case 'ice': return 'یخ';
      case 'ice_cream': return 'بستنی';
      case 'chocolate_sauce': return 'سس شکلات';
      case 'nutella': return 'نوتلا';
      case 'soda': return 'سودا';
      case 'lime': return 'لیمو';
      case 'mint': return 'نعنا';
      case 'caramel_sauce': return 'سس کارامل';
      case 'oreo': return 'اورئو';
      default: return name;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h3 className="text-2xl font-bold text-white mb-4 drop-shadow">راهنمای ترکیب</h3>
      
      <div className="relative w-60 h-80 border-8 border-gray-300 rounded-b-full rounded-t-xl bg-white/10 shadow-lg flex flex-col-reverse overflow-hidden">
        {ingredients.map(([name, gram], index) => {
          const heightPercentage = (gram / totalGram) * 100;
          const backgroundColor = ingredientColors[name];
          const textColor = getContrastColor(backgroundColor);
          
          return (
            <motion.div
              key={name}
              className="w-full relative flex items-center justify-center text-center"
              style={{
                height: `${heightPercentage}%`,
                backgroundColor: backgroundColor,
              }}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: `${heightPercentage}%`, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 + index * 0.2, ease: 'easeInOut' }}
            >
              <span 
                className="text-xs font-semibold z-10 drop-shadow-md p-1"
                style={{ color: textColor }}
              >
                {`${getIngredientName(name)}: ${gram} گرم`}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default BrewingGuide;