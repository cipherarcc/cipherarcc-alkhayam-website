// ============================================================
// AL KHAYAM RESTAURANT — MENU DATA
// ============================================================
// Pricing:
//   Single: price: 7
//   Double: price: { small: 6, large: 10 }
// ============================================================

const RESTAURANT = {
  name: "Al Khayam",
  tagline: "Bakery & Restaurant",
  whatsapp: "971565043688",
  phone: "+971565043688",
  address: "Awfaq Building, Amman Street, Al Qusais Ind 3, Beside Masjidul Muthaqeen, Dubai, UAE",
  maps: "https://maps.app.goo.gl/Lop6t3asYqe2o2Xo8",
  hours: "5:30 AM — 12:00 AM",
  fridayBreak: "12:15 PM — 1:00 PM"
};

const CATEGORIES = {
  breakfast:   { name: "Breakfast",              order: 1,  icon: "🍳" },
  bread:       { name: "Bread Basket",           order: 2,  icon: "🍞" },
  sandwich:    { name: "Sandwiches & Shawarma",  order: 3,  icon: "🌯" },
  snack_plate: { name: "Snack Plate",            order: 4,  icon: "🍟" },
  snacks:      { name: "Snacks",                 order: 5,  icon: "🥟" },
  hot:         { name: "Hot Beverages",          order: 6,  icon: "☕" },
  juice:       { name: "Juice",                  order: 7,  icon: "🥤" },
  soft:        { name: "Soft Drinks",            order: 8,  icon: "🥫" },
  mutton:      { name: "Mutton",                 order: 9,  icon: "🍖" },
  beef:        { name: "Beef",                   order: 10, icon: "🥩" },
  chicken:     { name: "Chicken",                order: 11, icon: "🍗" },
  egg:         { name: "Egg",                    order: 12, icon: "🥚" },
  veg:         { name: "Veg Dishes",             order: 13, icon: "🥬" },
  fish:        { name: "Fish",                   order: 14, icon: "🐟" },
  fried_rice:  { name: "Fried Rice",             order: 15, icon: "🍚" },
  noodles:     { name: "Noodles",                order: 16, icon: "🍜" },
  biryani:     { name: "Biryani & Rices",        order: 17, icon: "🍛" },
  charcoal:    { name: "Charcoal",               order: 18, icon: "🔥" },
  burger:      { name: "Burger",                 order: 19, icon: "🍔" }
};

const MENU = [
  // BREAKFAST
  { cat: "breakfast", name: "Single Dosa", price: 1.50, desc: "Single plain dosa" },
  { cat: "breakfast", name: "Egg Dosa", price: 8, desc: "Dosa topped with egg" },
  { cat: "breakfast", name: "Ghee Roast", price: 7, desc: "Crispy roast with pure ghee" },
  { cat: "breakfast", name: "Gravy Non Veg", price: 4, desc: "Chicken gravy" },
  { cat: "breakfast", name: "Gravy Veg", price: 3, desc: "Vegetable gravy" },
  { cat: "breakfast", name: "Green Peas Curry", price: { small: 5, large: 8 }, desc: "Green peas in spiced gravy" },
  { cat: "breakfast", name: "Masala Dosa", price: 7, desc: "Crispy dosa with spiced potato filling" },
  { cat: "breakfast", name: "Onion Dosa", price: 7, desc: "Dosa topped with fresh onions" },
  { cat: "breakfast", name: "Onion Oothappam", price: 7, desc: "Thick uttapam with onions" },
  { cat: "breakfast", name: "Oothappam", price: 7, desc: "Soft & fluffy uttapam" },
  { cat: "breakfast", name: "Plain Dosa", price: 5, desc: "Simple & crispy golden dosa" },
  { cat: "breakfast", name: "Poori Bhaji", price: 7, desc: "Fluffy poori with spicy potato curry" },
  { cat: "breakfast", name: "Porotta Beef Curry Combo", price: 12, desc: "Porotta with beef curry" },
  { cat: "breakfast", name: "Single Puri", price: 1.50, desc: "Single fluffy puri" },
  { cat: "breakfast", name: "Set Dosa", price: 5, desc: "Soft set dosa with chutney" },
  { cat: "breakfast", name: "Upma", price: 5, desc: "Traditional semolina dish" },
  { cat: "breakfast", name: "Vada Set", price: 7, desc: "Crispy vada with chutney" },

  // BREAD BASKET
  { cat: "bread", name: "Butter Naan", price: 3, desc: "Soft naan brushed with butter" },
  { cat: "bread", name: "Butter Rotti", price: 3, desc: "Butter-roasted rotti" },
  { cat: "bread", name: "Chapathi", price: 1, desc: "Soft whole wheat flatbread" },
  { cat: "bread", name: "Garlic Naan", price: 3, desc: "Aromatic naan with fresh garlic" },
  { cat: "bread", name: "Gravy Porotta", price: 2, desc: "Porotta with gravy" },
  { cat: "bread", name: "Khubz", price: 1, desc: "Arabic flatbread" },
  { cat: "bread", name: "Malabar Porotta", price: 1, desc: "Flaky layered porotta" },
  { cat: "bread", name: "Plain Naan", price: 2.50, desc: "Classic soft naan" },
  { cat: "bread", name: "Wheat Porotta", price: 1.50, desc: "Healthy wheat porotta" },
  { cat: "bread", name: "Tandoori Rotti", price: 1, desc: "Tandoor-baked rotti" },

  // SANDWICHES & SHAWARMA
  { cat: "sandwich", name: "Beef Sandwich", price: 7, desc: "Tender beef with fresh veggies" },
  { cat: "sandwich", name: "Boiled Egg Sandwich", price: 5, desc: "Fresh boiled egg sandwich" },
  { cat: "sandwich", name: "Chicken Sandwich", price: 6, desc: "Grilled chicken sandwich" },
  { cat: "sandwich", name: "Chilly Porotta Sandwich", price: 6, desc: "Spicy porotta sandwich" },
  { cat: "sandwich", name: "Double Omelette Sandwich", price: 6, desc: "Double omelette sandwich" },
  { cat: "sandwich", name: "Egg Sandwich", price: 5, desc: "Boiled egg sandwich" },
  { cat: "sandwich", name: "Veg Sandwich", price: 5, desc: "Fresh vegetable sandwich" },
  { cat: "sandwich", name: "Porotta Chicken Shawarma", price: 7, desc: "Shawarma wrapped in porotta" },
  { cat: "sandwich", name: "Chicken Shawarma Plate", price: 15, desc: "Full plate chicken shawarma" },
  { cat: "sandwich", name: "SPL Chicken Shawarma", price: 8, desc: "Special chicken shawarma" },
  { cat: "sandwich", name: "Double Egg Porotta Sandwich", price: 6, desc: "Double egg porotta sandwich" },
  { cat: "sandwich", name: "Double Porotta Egg Sandwich", price: 6, desc: "Double porotta egg sandwich" },
  { cat: "sandwich", name: "Chicken Shawarma", price: { small: 6, large: 10 }, desc: "Juicy grilled chicken wrap" },
  { cat: "sandwich", name: "Wheat Porotta Egg Sandwich", price: 5, desc: "Wheat porotta with egg" },
  { cat: "sandwich", name: "Wheat Porotta Chicken Sandwich", price: 6, desc: "Wheat porotta with chicken" },
  { cat: "sandwich", name: "Wheat Porotta Veg Sandwich", price: 5, desc: "Wheat porotta with veggies" },

  // SNACK PLATE
  { cat: "snack_plate", name: "French Fries", price: { small: 5, large: 10 }, desc: "Crispy golden french fries" },

  // SNACKS
  { cat: "snacks", name: "Pazham Pori", price: 2, desc: "Sweet banana fritters" },
  { cat: "snacks", name: "Biscuit", price: 1, desc: "Tea biscuit" },
  { cat: "snacks", name: "Bread Pocket", price: 3, desc: "Bread pocket snack" },
  { cat: "snacks", name: "Chicken Cutlet", price: 2.50, desc: "Crispy chicken cutlet" },
  { cat: "snacks", name: "Chicken Puff", price: 2.50, desc: "Flaky puff with chicken" },
  { cat: "snacks", name: "Chicken Samoosa", price: 1.50, desc: "Crispy chicken samosa" },
  { cat: "snacks", name: "Cream Bun", price: 1, desc: "Soft cream bun" },
  { cat: "snacks", name: "Cup Cake", price: 1, desc: "Sweet cupcake" },
  { cat: "snacks", name: "Dhal Vada", price: 1, desc: "Crispy lentil vada" },
  { cat: "snacks", name: "Egg Baji", price: 1, desc: "Egg baji" },
  { cat: "snacks", name: "Egg Puff", price: 2, desc: "Puff with egg filling" },
  { cat: "snacks", name: "Medhu Vada", price: 1, desc: "Crispy medhu vada" },
  { cat: "snacks", name: "Mualku Baji", price: 1, desc: "Crispy mualku baji" },
  { cat: "snacks", name: "Ney Pathiri", price: 1, desc: "Crispy rice pathiri" },
  { cat: "snacks", name: "Neyyappam", price: 1, desc: "Sweet rice pancake" },
  { cat: "snacks", name: "Onion Vada", price: 1, desc: "Vada with fresh onions" },
  { cat: "snacks", name: "Pakkoda", price: 1, desc: "Crispy pakkoda" },
  { cat: "snacks", name: "Punjabi Samoosa", price: 1, desc: "Punjabi style samosa" },
  { cat: "snacks", name: "Slice Cake", price: 1, desc: "Slice of cake" },
  { cat: "snacks", name: "Ladu", price: 1, desc: "Sweet ladu" },
  { cat: "snacks", name: "Jam Roll", price: 1, desc: "Sweet jam roll" },
  { cat: "snacks", name: "Mixture", price: 1, desc: "Crispy mixture" },

  // HOT BEVERAGES
  { cat: "hot", name: "Fresh Milk Boost", price: 3, desc: "Boost with fresh milk" },
  { cat: "hot", name: "Fresh Milk Horlicks", price: 3, desc: "Horlicks with fresh milk" },
  { cat: "hot", name: "Black Coffee", price: 2, desc: "Strong black coffee" },
  { cat: "hot", name: "Black Tea", price: 1, desc: "Strong & refreshing black tea" },
  { cat: "hot", name: "Black Tea Ginger", price: 1.50, desc: "Black tea with ginger" },
  { cat: "hot", name: "Black Tea Full Option", price: 2, desc: "Black tea with all spices" },
  { cat: "hot", name: "Chukku Kappi", price: 3, desc: "Traditional dry ginger coffee" },
  { cat: "hot", name: "Normal Coffee", price: 2, desc: "Classic coffee" },
  { cat: "hot", name: "Fresh Milk Coffee", price: 3, desc: "Coffee with fresh milk" },
  { cat: "hot", name: "Green Tea", price: { small: 1, large: 2 }, desc: "Healthy green tea" },
  { cat: "hot", name: "Karak Tea", price: 2, desc: "Authentic Arabic milk tea" },
  { cat: "hot", name: "Milk", price: 2.50, desc: "Fresh milk" },
  { cat: "hot", name: "Mint Tea", price: 1.50, desc: "Refreshing mint tea" },
  { cat: "hot", name: "Lemon Tea", price: 1.50, desc: "Zesty lemon tea" },

  // JUICE
  { cat: "juice", name: "Avocado Juice", price: 10, desc: "Creamy avocado juice" },
  { cat: "juice", name: "Banana Juice", price: { small: 4, large: 8 }, desc: "Fresh banana juice" },
  { cat: "juice", name: "Carrot Juice", price: { small: 4, large: 8 }, desc: "Fresh carrot juice" },
  { cat: "juice", name: "Lemon Soda", price: { small: 6, large: 8 }, desc: "Refreshing lemon soda" },
  { cat: "juice", name: "Fresh Lime", price: { small: 5, large: 8 }, desc: "Fresh lime juice" },
  { cat: "juice", name: "Lemon Mint", price: 5, desc: "Refreshing lemon mint" },
  { cat: "juice", name: "Mango Juice", price: 10, desc: "Sweet mango juice" },
  { cat: "juice", name: "Orange Juice", price: 10, desc: "Fresh orange juice" },

  // SOFT DRINKS
  { cat: "soft", name: "7UP Can", price: 3, desc: "Chilled 7UP can" },
  { cat: "soft", name: "Pepsi Can", price: 3, desc: "Chilled Pepsi can" },
  { cat: "soft", name: "Mountain Dew Can", price: 3, desc: "Chilled Mountain Dew can" },
  { cat: "soft", name: "Laban Up", price: 1, desc: "Refreshing laban drink" },
  { cat: "soft", name: "Mineral Water", price: { small: 1, large: 2 }, desc: "Chilled mineral water" },

  // MUTTON
  { cat: "mutton", name: "Mutton Curry", price: { small: 12, large: 18 }, desc: "Rich traditional mutton curry" },
  { cat: "mutton", name: "Mutton Kadai", price: { small: 13, large: 19 }, desc: "Spicy mutton kadai" },
  { cat: "mutton", name: "Mutton Roast", price: 22, desc: "Slow-roasted tender mutton" },

  // BEEF
  { cat: "beef", name: "Beef Chilli", price: 16, desc: "Spicy beef chilli" },
  { cat: "beef", name: "Beef Curry", price: { small: 10, large: 16 }, desc: "Traditional beef curry" },
  { cat: "beef", name: "Beef Fry", price: { small: 12, large: 17 }, desc: "Crispy fried beef" },
  { cat: "beef", name: "Beef Kadai", price: { small: 12, large: 16 }, desc: "Spicy beef kadai" },
  { cat: "beef", name: "Beef Roast", price: { small: 12, large: 18 }, desc: "Slow-roasted beef" },
  { cat: "beef", name: "Liver", price: 10, desc: "Spiced liver fry" },

  // CHICKEN
  { cat: "chicken", name: "Butter Chicken", price: { small: 13, large: 20 }, desc: "Creamy tomato chicken curry" },
  { cat: "chicken", name: "Chicken 65", price: { small: 16, large: 21 }, desc: "Spicy deep-fried chicken" },
  { cat: "chicken", name: "Chicken Fry", price: 10, desc: "Crispy fried chicken" },
  { cat: "chicken", name: "Chicken Kuruma", price: 12, desc: "Creamy chicken kuruma" },
  { cat: "chicken", name: "Chicken Roast", price: { small: 12, large: 18 }, desc: "Slow-roasted chicken" },
  { cat: "chicken", name: "Chicken Tikka", price: { small: 14, large: 22 }, desc: "Grilled chicken tikka" },
  { cat: "chicken", name: "Chicken Chilly", price: { small: 15, large: 22 }, desc: "Spicy chicken chilli" },
  { cat: "chicken", name: "Chicken Chukka", price: { small: 12, large: 17 }, desc: "Dry chicken chukka" },
  { cat: "chicken", name: "Chicken Kadai", price: { small: 12, large: 19 }, desc: "Spicy chicken kadai" },
  { cat: "chicken", name: "Chicken Masala", price: { small: 10, large: 13 }, desc: "Rich chicken masala" },
  { cat: "chicken", name: "Chicken Pepper", price: { small: 13, large: 20 }, desc: "Pepper chicken fry" },
  { cat: "chicken", name: "Chicken Curry", price: { small: 9, large: 15 }, desc: "Traditional chicken curry" },
  { cat: "chicken", name: "SPL Chicken Curry", price: 12, desc: "Special chicken curry" },

  // EGG
  { cat: "egg", name: "Egg Boiled", price: 1, desc: "Boiled egg" },
  { cat: "egg", name: "Egg Burji", price: { small: 6, large: 11 }, desc: "Spiced scrambled egg" },
  { cat: "egg", name: "Egg Curry", price: { small: 6, large: 10 }, desc: "Egg curry" },
  { cat: "egg", name: "Egg Double Half Fry", price: 5, desc: "Double egg half fry" },
  { cat: "egg", name: "Egg Single Half Fry", price: 3, desc: "Single egg half fry" },
  { cat: "egg", name: "Egg Omelette", price: { small: 2, large: 5 }, desc: "Fluffy egg omelette" },
  { cat: "egg", name: "Egg Roast", price: { small: 6, large: 10 }, desc: "Roasted egg masala" },

  // VEG DISHES
  { cat: "veg", name: "Aloo Gobi", price: { small: 8, large: 14 }, desc: "Potato & cauliflower curry" },
  { cat: "veg", name: "Aloo Zeera", price: { small: 7, large: 13 }, desc: "Cumin potato curry" },
  { cat: "veg", name: "Butter Dhal", price: { small: 7, large: 13 }, desc: "Creamy butter dhal" },
  { cat: "veg", name: "Chana Masala", price: { small: 5, large: 8 }, desc: "Spiced chickpea curry" },
  { cat: "veg", name: "Chilly Gobi Small", price: 13, desc: "Spicy cauliflower (small)" },
  { cat: "veg", name: "Dhal Fry", price: { small: 5, large: 8 }, desc: "Fried dhal" },
  { cat: "veg", name: "Dhal Tadka", price: { small: 7, large: 13 }, desc: "Tempered dhal" },
  { cat: "veg", name: "Gobi Manchurian", price: { small: 10, large: 15 }, desc: "Indo-Chinese cauliflower" },
  { cat: "veg", name: "Mix Veg", price: { small: 5, large: 8 }, desc: "Mixed vegetable curry" },
  { cat: "veg", name: "Mushroom Masala", price: { small: 8, large: 13 }, desc: "Spiced mushroom curry" },
  { cat: "veg", name: "Paneer Burji", price: { small: 12, large: 18 }, desc: "Crumbled paneer masala" },
  { cat: "veg", name: "Paneer Butter Masala", price: { small: 12, large: 16 }, desc: "Creamy paneer curry" },
  { cat: "veg", name: "Paneer Kadai", price: { small: 11, large: 15 }, desc: "Spicy paneer kadai" },
  { cat: "veg", name: "Paneer Palak", price: { small: 10, large: 13 }, desc: "Spinach paneer curry" },
  { cat: "veg", name: "Vegetable Kurma", price: { small: 7, large: 15 }, desc: "Vegetable kurma" },

  // FISH
  { cat: "fish", name: "Fish (ASP)", price: 0, desc: "Fresh fish (market price)" },

  // FRIED RICE
  { cat: "fried_rice", name: "Beef Fried Rice", price: 16, desc: "Beef fried rice" },
  { cat: "fried_rice", name: "Chicken Fried Rice", price: 16, desc: "Chicken fried rice" },
  { cat: "fried_rice", name: "Egg Fried Rice", price: 13, desc: "Egg fried rice" },
  { cat: "fried_rice", name: "Mixed Fried Rice", price: 20, desc: "Mixed fried rice" },
  { cat: "fried_rice", name: "Mutton Fried Rice", price: 20, desc: "Mutton fried rice" },
  { cat: "fried_rice", name: "Schezwan Fried Rice", price: 18, desc: "Spicy schezwan fried rice" },
  { cat: "fried_rice", name: "Vegetable Fried Rice", price: 13, desc: "Vegetable fried rice" },

  // NOODLES
  { cat: "noodles", name: "Beef Noodles", price: 16, desc: "Beef noodles" },
  { cat: "noodles", name: "Chicken Noodles", price: 14, desc: "Chicken noodles" },
  { cat: "noodles", name: "Egg Noodles", price: 12, desc: "Egg noodles" },
  { cat: "noodles", name: "Mixed Noodles", price: 18, desc: "Mixed noodles" },
  { cat: "noodles", name: "Mutton Noodles", price: 18, desc: "Mutton noodles" },
  { cat: "noodles", name: "Veg Noodles", price: 12, desc: "Vegetable noodles" },

  // BIRYANI & RICES
  { cat: "biryani", name: "Barik Set", price: 10, desc: "Barik rice set" },
  { cat: "biryani", name: "Motta Set", price: 10, desc: "Motta rice set" },
  { cat: "biryani", name: "Barik Rice", price: 6, desc: "Barik rice" },
  { cat: "biryani", name: "Motta Rice", price: 6, desc: "Motta rice" },
  { cat: "biryani", name: "Beef Biriyani", price: 16, desc: "Flavorful beef biryani" },
  { cat: "biryani", name: "Biriyani Rice", price: 8, desc: "Plain biriyani rice" },
  { cat: "biryani", name: "Bombay Biryani", price: 12, desc: "Bombay style biryani" },
  { cat: "biryani", name: "Charcoal Biryani", price: 13, desc: "Charcoal-cooked biryani" },
  { cat: "biryani", name: "Charcoal Biryani White Rice", price: 13, desc: "Charcoal biryani with white rice" },
  { cat: "biryani", name: "Charcoal Biryani Dum Rice", price: 14, desc: "Charcoal dum biryani" },
  { cat: "biryani", name: "Chicken Dum Biryani", price: 15, desc: "Aromatic dum biryani" },
  { cat: "biryani", name: "Chicken Fry Biryani", price: 15, desc: "Chicken fry biryani" },
  { cat: "biryani", name: "Chicken Mandi", price: 13, desc: "Arabic chicken mandi" },
  { cat: "biryani", name: "Egg Biryani", price: 13, desc: "Egg biryani" },
  { cat: "biryani", name: "Ghee Rice & Chicken Fry Combo", price: 14, desc: "Ghee rice with chicken fry" },
  { cat: "biryani", name: "Mutton Biryani", price: 20, desc: "Rich mutton biryani" },
  { cat: "biryani", name: "Pallikettu", price: 12, desc: "Pallikettu biryani" },

  // CHARCOAL
  { cat: "charcoal", name: "Charcoal Full Meal", price: 40, desc: "Full charcoal meal" },
  { cat: "charcoal", name: "Charcoal Half", price: 22, desc: "Half charcoal meal" },
  { cat: "charcoal", name: "Charcoal Quarter", price: 13, desc: "Quarter charcoal meal" },
  { cat: "charcoal", name: "Charcoal Quarter Only", price: 9, desc: "Quarter charcoal (meat only)" },
  { cat: "charcoal", name: "Hummus", price: 5, desc: "Creamy hummus dip" },

  // BURGER
  { cat: "burger", name: "Chicken Burger", price: 7, desc: "Juicy chicken burger" }
];