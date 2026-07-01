
import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, ShoppingBag, Plus, Minus, Star, Image as ImageIcon } from "lucide-react";
import { motion } from "motion/react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const MENU_ITEMS = {
  1: [ // Burger King
    { id: '1-1', name: 'Classic Burger', price: 249, type: 'nonveg', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80', description: 'Delicious beef patty with lettuce' },
    { id: '1-2', name: 'Cheese Burger', price: 299, type: 'nonveg', image: 'https://media.istockphoto.com/id/531580333/photo/burger.webp?a=1&b=1&s=612x612&w=0&k=20&c=2tT4eh0p42wIOAFzxPqML1XdiXSVXqJJAkduExK0IxQ=', description: 'Classic burger with melted cheese' },
    { id: '1-3', name: 'Chicken Burger', price: 229, type: 'nonveg', image: 'https://media.istockphoto.com/id/1199148347/photo/the-concept-of-american-cuisine-italian-double-king-burger-with-french-fries-on-a-wooden.webp?a=1&b=1&s=612x612&w=0&k=20&c=H55n1Mi-Y_Ig6LOoGxYS93mCbGz75EwQ35JDdPzGLGA=', description: 'Crispy fried chicken burger' },
    { id: '1-4', name: 'Double Burger', price: 399, type: 'nonveg', image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGJ1cmdlciUyMGtpbmd8ZW58MHx8MHx8fDA%3D', description: 'Two beef patties with extra toppings' },
    { id: '1-5', name: 'Mushroom Swiss Burger', price: 349, type: 'nonveg', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80', description: 'Juicy beef with mushrooms and swiss cheese' },
    { id: '1-6', name: 'Spicy Pepper Burger', price: 299, type: 'nonveg', image: 'https://images.unsplash.com/photo-1689317616777-2e1ca1348bfa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fGJ1cmdlciUyMGtpbmd8ZW58MHx8MHx8fDA%3D', description: 'Flaming hot with jalapeños and chipotle mayo' },
    { id: '1-7', name: 'Crispy Fries', price: 149, type: 'veg', image: 'https://plus.unsplash.com/premium_photo-1683121324230-2702ea6b47be?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODd8fGJ1cmdlciUyMGtpbmd8ZW58MHx8MHx8fDA%3D', description: 'Golden crispy French fries with sea salt' },
    { id: '1-8', name: 'Onion Rings', price: 159, type: 'veg', image: 'https://images.unsplash.com/photo-1643018987067-17aafb8890ad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTd8fGJ1cmdlciUyMGtpbmd8ZW58MHx8MHx8fDA%3D', description: 'Crunchy battered onion rings' },
    { id: '1-9', name: 'Cola', price: 79, type: 'veg', image: 'https://images.unsplash.com/photo-1644902617089-c40d0345c878?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YnVyZ2VyJTIwcGhvdG9zfGVufDB8fDB8fHww', description: 'Ice-cold refreshing cola' },
    { id: '1-10', name: 'Milkshake', price: 129, type: 'veg', image: 'https://images.unsplash.com/photo-1582762147076-6d985d99975a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGJ1cmdlciUyMHBob3Rvc3xlbnwwfHwwfHx8MA%3D%3D', description: 'Creamy vanilla or chocolate milkshake' },
    { id: '1-11', name: 'Egg Burger', price: 269, type: 'nonveg', image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80', description: 'Beef burger topped with a fried egg' },
    { id: '1-12', name: 'Spicy Egg Wrap', price: 199, type: 'nonveg', image: 'https://images.unsplash.com/photo-1678110707493-8d05425137ac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGJ1cmdlciUyMHBob3Rvc3xlbnwwfHwwfHx8MA%3D%3D', description: 'Tortilla wrap filled with spicy scrambled egg and veggies' },
    { id: '1-13', name: 'Chili Egg Sandwich', price: 279, type: 'nonveg', image: 'https://plus.unsplash.com/premium_photo-1684534125392-e527ed4024e7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fGJ1cmdlciUyMHBob3Rvc3xlbnwwfHwwfHx8MA%3D%3D', description: 'Grilled sandwich with boiled egg and chili sauce' },
  ],
  2: [ // Pizza Hut
    { id: '2-1', name: 'Margherita Pizza', price: 399, type: 'veg', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80', description: 'Fresh tomato, mozzarella, and basil' },
    { id: '2-2', name: 'Pepperoni Pizza', price: 499, type: 'nonveg', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UGVwcGVyb25pJTIwUGl6emF8ZW58MHx8MHx8fDA%3D', description: 'Pepperoni with mozzarella cheese' },
    { id: '2-3', name: 'Veggie Pizza', price: 349, type: 'veg', image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fFZlZ2dpZSUyMFBpenphfGVufDB8fDB8fHww', description: 'Mixed vegetables pizza' },
    { id: '2-4', name: 'BBQ Chicken Pizza', price: 549, type: 'nonveg', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=400&q=80', description: 'Grilled chicken with BBQ sauce' },
    { id: '2-5', name: 'Meat Lovers Pizza', price: 599, type: 'nonveg', image: 'https://images.unsplash.com/photo-1705286324371-d6a6d9519dc2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWVhdCUyMExvdmVycyUyMFBpenphfGVufDB8fDB8fHww', description: 'Loaded with chicken, beef, and sausage' },
    { id: '2-6', name: 'Seafood Pizza', price: 649, type: 'nonveg', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80', description: 'Fresh prawns and squid with garlic' },
    { id: '2-7', name: 'Paneer Tikka Pizza', price: 449, type: 'veg', image: 'https://media.istockphoto.com/id/1221513938/photo/pizza.webp?a=1&b=1&s=612x612&w=0&k=20&c=b336Tyc6i-T9l7sB_Z0dVdV9WAjBQPSwOWONSIqvNGs=', description: 'Indian style with paneer and tandoori spices' },
    { id: '2-8', name: 'Garlic Bread', price: 149, type: 'veg', image: 'https://plus.unsplash.com/premium_photo-1711752902734-a36167479983?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8R2FybGljJTIwQnJlYWR8ZW58MHx8MHx8fDA%3D', description: 'Crispy bread with garlic butter' },
    { id: '2-9', name: 'Garlic Dip', price: 69, type: 'veg', image: 'https://plus.unsplash.com/premium_photo-1722260201854-b9c4f0f68d98?w=600&auto=format&fit=crop&q=60', description: 'Creamy garlic dip for pizza' },
    { id: '2-10', name: 'Iced Tea', price: 99, type: 'veg', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SWNlZCUyMFRlYXxlbnwwfHwwfHx8MA%3D%3D', description: 'Refreshing lemon iced tea' },
    { id: '2-11', name: 'Egg & Cheese Pizza', price: 429, type: 'nonveg', image: 'https://images.unsplash.com/photo-1608840042765-356cda07504e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0', description: 'Pizza topped with scrambled eggs and extra cheese' },
    { id: '2-12', name: 'Spicy Jalapeño Pizza', price: 459, type: 'veg', image: 'https://images.unsplash.com/photo-1592861764633-8278f6f6a322?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3BpY3klMjBwaXp6YXxlbnwwfHwwfHx8MA%3D%3D', description: 'Vegetarian pizza loaded with jalapeños and chili flakes' },
    { id: '2-13', name: 'Hot Egg Pizza', price: 449, type: 'nonveg', image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80', description: 'Spicy pizza crowned with fried egg and chili oil' },
  ],
  3: [ // Sushi Biryani
    { id: '3-1', name: 'Hyderabadi Dum Biryani', price: 299, type: 'nonveg', image: 'https://media.istockphoto.com/id/2251662921/photo/image-of-indian-buffet-banquet-with-butter-chicken-biryani-rice-raita-pickled-onions-beetroot.webp?a=1&b=1&s=612x612&w=0&k=20&c=CROj4YZV0KIvcvp1XunJIfcYo_KylxnA4WgniDl9RDk=', description: 'Aromatic basmati rice cooked with tender chicken, caramelized onions, and authentic Hyderabadi spices' },
    { id: '3-2', name: 'Hyderabadi fry piece Biryani', price: 349, type: 'nonveg', image: 'https://media.istockphoto.com/id/1158330960/photo/image-of-eating-supermarket-takeaway-indian-food-of-chicken-biryani-saffron-pilau-rice-in.webp?a=1&b=1&s=612x612&w=0&k=20&c=2ajJ5TDP5OeAZKvrtl6XDB_8DzxDv6S6pAJ2YYL2VKQ=', description: 'Crispy fried chicken pieces layered with fragrant rice and boiled eggs' },
    { id: '3-11', name: 'Hyderabadi Zafrani Biryani', price: 319, type: 'nonveg', image: 'https://media.istockphoto.com/id/1323585788/photo/close-up-image-of-non-stick-frying-pan-containing-rice-dish-of-chicken-biryani-topped-with.webp?a=1&b=1&s=612x612&w=0&k=20&c=4xg47EKfchilksG_PPkI8ItIIVllbGuYTYTkvOkr_RQ=', description: 'Premium saffron-infused biryani with tender meat and rich spices' },
    { id: '3-12', name: 'Telangana Chicken Biryani', price: 339, type: 'nonveg', image: 'https://media.istockphoto.com/id/1443200084/photo/close-up-image-of-round-copper-metal-catering-bowl-containing-rice-dish-of-chicken-biryani-on.webp?a=1&b=1&s=612x612&w=0&k=20&c=J3fyHpLfEL5GOVA-8U394VDRTbEl7TKhuTGkxZX6aGI=', description: 'Traditional Telangana style chicken biryani with local spices' },
    { id: '3-13', name: 'Ulavacharu Biryani', price: 359, type: 'nonveg', image: 'https://media.istockphoto.com/id/2191680458/photo/light-chicken-curry-with-rice-and-yogurt.webp?a=1&b=1&s=612x612&w=0&k=20&c=tboWSwfcB_j50dins28JF-5BX0C8054wMy7WHOMeRUI=', description: 'Horse gram curry based biryani with unique Andhra flavors' },
    { id: '3-3', name: 'Nellore Chicken Biryani', price: 449, type: 'nonveg', image: 'https://media.istockphoto.com/id/1226929045/photo/close-up-image-of-plate-containing-indian-take-away-rice-dish-of-chicken-biryani-served-with.webp?a=1&b=1&s=612x612&w=0&k=20&c=7Cba0em3TX0rQGlwjpjehHkI-0zfu5GyXr0aHk1sFAo=', description: 'Authentic Nellore style chicken biryani with coastal spices' },
    { id: '3-4', name: 'Guntur Biryani', price: 399, type: 'nonveg', image: 'https://media.istockphoto.com/id/1416484323/photo/vegetable-pilau.webp?a=1&b=1&s=612x612&w=0&k=20&c=CrmWIxtexJ0K6W0rkQ8-ce0cebE8Q6KcezkxOmfC8zU=', description: 'Spicy Guntur style biryani with chili-infused flavors' },
    { id: '3-5', name: 'Ambur-style Andhra Biryani', price: 379, type: 'nonveg', image: 'https://media.istockphoto.com/id/2233317856/photo/image-of-family-enjoying-indian-takeaway-dinner-at-dining-table-set-place-biryani-chicken.webp?a=1&b=1&s=612x612&w=0&k=20&c=EaPyJ2I0sz0B7bcXy_uWRADVjSGPUGuJbZch0FPMsP8=', description: 'Tamil Nadu style biryani with unique spice blend' },
    { id: '3-6', name: 'Donne Biryani (Bangalore)', price: 499, type: 'nonveg', image: 'https://media.istockphoto.com/id/1420989326/photo/delicious-karnataka-style-donne-biryani-serving.jpg?s=612x612&w=0&k=20&c=LZrT032r4bZiCjNNE5TBebfFEtGK8uwrxynB8GToP5A= ', description: 'Karnataka style mutton biryani cooked in leaf' },
    { id: '3-7', name: 'Bhatkali Biryani', price: 359, type: 'nonveg', image: 'https://media.istockphoto.com/id/1227591928/photo/image-of-terracotta-pot-containing-indian-take-away-rice-dish-of-chicken-biryani-served-with.webp?a=1&b=1&s=612x612&w=0&k=20&c=l_MncjpsTR-RFTN67lXcJ8LIFlCDKYS-NsX8iB6KK0Q=', description: 'Maharashtrian style biryani with Bhatkali masala' },
    { id: '3-8', name: 'Dindigul Thalappakatti Biryani', price: 89, type: 'veg', image: 'https://media.istockphoto.com/id/2252155058/photo/image-of-spoon-serving-saffron-yellow-chicken-biryani-rice-from-terracotta-pot-accompanied-by.webp?a=1&b=1&s=612x612&w=0&k=20&c=OoArDbwBeHiYkCkifObzmDkt44f-DleAQIMLyvBZKJY=', description: 'Famous Tamil Nadu biryani with unique spice preparation' },
    { id: '3-9', name: 'Ambur Biryani', price: 119, type: 'veg', image: 'https://media.istockphoto.com/id/2251662922/photo/image-of-indian-food-featuring-chicken-biryani-with-saffron-infused-rice-yellow-and-green.webp?a=1&b=1&s=612x612&w=0&k=20&c=qP_QNR6CqtXzJ6TofCdKcpH2z4c0Nw5_boTUtc7pXnk=', description: 'Vegetarian version of the famous Ambur biryani' },
    { id: '3-10', name: 'Chettinad Biryani', price: 79, type: 'veg', image: 'https://media.istockphoto.com/id/2260264484/photo/image-of-indian-takeaway-chicken-dum-biryani-in-terracotta-clay-pot-handi-served-with-flaky.webp?a=1&b=1&s=612x612&w=0&k=20&c=EmgR5hO9tZJxdaxAQEvztGI8oPCvInWlMChqXeKvTM0=', description: 'Chettinad style biryani with aromatic spices' },
  ],
  4: [ // Green Garden
    { id: '4-1', name: 'Caesar Salad', price: 229, type: 'veg', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80', description: 'Romaine lettuce with parmesan' },
    { id: '4-2', name: 'Greek Salad', price: 249, type: 'veg', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=400&q=80', description: 'Feta cheese and olives' },
    { id: '4-3', name: 'Kale Salad', price: 279, type: 'veg', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80', description: 'Nutritious kale with dressing' },
    { id: '4-4', name: 'Avocado Toast', price: 199, type: 'veg', image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXZhY2FkbyUyMHRvYXN0fGVufDB8fDB8fHww', description: 'Toasted bread with fresh avocado' },
    { id: '4-5', name: 'Quinoa Bowl', price: 349, type: 'veg', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80', description: 'Superfood quinoa with roasted veggies' },
    { id: '4-6', name: 'Caprese Sandwich', price: 219, type: 'veg', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=400&q=80', description: 'Tomato, mozzarella, and basil' },
    { id: '4-7', name: 'Veggie Wrap', price: 199, type: 'veg', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80', description: 'Fresh vegetables in whole wheat wrap' },
    { id: '4-8', name: 'Hummus Platter', price: 169, type: 'veg', image: 'https://images.unsplash.com/photo-1772795682257-ccb3ac896e4a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SHVtbXVzJTIwUGxhdHRlcnxlbnwwfHwwfHx8MA%3D%3D', description: 'Creamy hummus with pita chips' },
    { id: '4-9', name: 'Fresh Juice', price: 99, type: 'veg', image: 'https://images.unsplash.com/photo-1772795682257-ccb3ac896e4a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SHVtbXVzJTIwUGxhdHRlcnxlbnwwfHwwfHx8MA%3D%3D ', description: 'Fresh orange and carrot juice' },
    { id: '4-10', name: 'Smoothie Bowl', price: 199, type: 'veg', image: 'https://images.unsplash.com/photo-1590301157284-ab2f8707bdc1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8U21vb3RoaWUlMjBCb3dsfGVufDB8fDB8fHww', description: 'Berry smoothie with granola toppings' },
    { id: '4-11', name: 'Spicy Kale Salad', price: 279, type: 'veg', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400&q=80', description: 'Kale salad tossed in spicy dressing' },
  ],
  5: [ // Taco Bell
    { id: '5-1', name: 'Crunchy Taco', price: 149, type: 'nonveg', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=400&q=80', description: 'Classic crunchy shell taco' },
    { id: '5-11', name: 'Egg & Cheese Taco', price: 159, type: 'nonveg', image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80', description: 'Taco filled with scrambled egg and cheese' },
    { id: '5-12', name: 'Spicy Beef Taco', price: 169, type: 'nonveg', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QnVycml0b3xlbnwwfHwwfHx8MA%3D%3D', description: 'Taco with spicy seasoned beef' },
    { id: '5-13', name: 'Egg & Chili Taco', price: 179, type: 'nonveg', image: 'https://images.unsplash.com/photo-1628838233717-be047a0b54fb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8UXVlc2FkaWxsYXxlbnwwfHwwfHx8MA%3D%3D', description: 'Taco with scrambled egg and chili sauce' },
    { id: '5-2', name: 'Soft Taco', price: 139, type: 'nonveg', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80', description: 'Soft flour tortilla taco' },
    { id: '5-3', name: 'Burrito', price: 249, type: 'nonveg', image: 'https://media.istockphoto.com/id/1083438596/photo/nachos-supreme-mexican-food-nachos.webp?a=1&b=1&s=612x612&w=0&k=20&c=25kukrzH6BrUVhnwvdEhqXvXqWaz-CVzFPZCjZ4oEzA=', description: 'Filled with meat and beans' },
    { id: '5-4', name: 'Quesadilla', price: 199, type: 'nonveg', image: 'https://plus.unsplash.com/premium_photo-1713687792185-cbb6c1faa95b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Q2h1cnJvc3xlbnwwfHwwfHx8MA%3D%3D', description: 'Cheese and meat quesadilla' },
    { id: '5-5', name: 'Chicken Burrito', price: 229, type: 'nonveg', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=400&q=80', description: 'Grilled chicken with rice and beans' },
    { id: '5-6', name: 'Bean Burrito', price: 139, type: 'veg', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80', description: 'Vegetarian beans with cheese' },
    { id: '5-7', name: 'Nachos Supreme', price: 299, type: 'nonveg', image: 'https://images.unsplash.com/photo-1572680443530-225d4e0d9894?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8TkFDSE9TJTIwU1VQUkVNfGVufDB8fDB8fHww', description: 'Loaded nachos with toppings' },
    { id: '5-8', name: 'Churros', price: 119, type: 'veg', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80', description: 'Crispy fried churros with chocolate dipping sauce' },
    { id: '5-9', name: 'Salsa & Chips', price: 89, type: 'veg', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=400&q=80', description: 'Fresh salsa with tortilla chips' },
    { id: '5-10', name: 'Horchata', price: 99, type: 'veg', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80', description: 'Sweet rice milk drink' },
  ],
  6: [ // Sweet Delights
    { id: '6-1', name: 'Chocolate Cake', price: 199, type: 'veg', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80', description: 'Rich chocolate cake slice' },
    { id: '6-2', name: 'Cheesecake', price: 229, type: 'veg', image: 'https://images.unsplash.com/photo-1702925614886-50ad13c88d3f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Q2hlZXNlY2FrZXxlbnwwfHwwfHx8MA%3D%3D', description: 'Creamy New York cheesecake' },
    { id: '6-3', name: 'Donuts', price: 149, type: 'veg', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=400&q=80', description: 'Box of assorted donuts' },
    { id: '6-4', name: 'Ice Cream', price: 129, type: 'veg', image: 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8SWNlJTIwQ3JlYW18ZW58MHx8MHx8fDA%3D', description: 'Vanilla, chocolate, or strawberry' },
    { id: '6-5', name: 'Brownie', price: 149, type: 'veg', image: 'https://images.unsplash.com/photo-1762922425478-7049c54bfbec?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8QnJvd25pZSUyMHBob3Rvc3xlbnwwfHwwfHx8MA%3D%3D', description: 'Fudgy chocolate brownie' },
    { id: '6-6', name: 'Tiramisu', price: 249, type: 'veg', image: 'https://images.unsplash.com/photo-1570476922354-81227cdbb76c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8TWFjYXJvbnN8ZW58MHx8MHx8fDA%3D', description: 'Italian mascarpone dessert' },
    { id: '6-7', name: 'Strawberry Cheesecake', price: 259, type: 'veg', image: 'https://plus.unsplash.com/premium_photo-1713920190537-589e17d51146?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U3RyYXdiZXJyeSUyMENoZWVzZWNha2UlMjBwaG90b3N8ZW58MHx8MHx8fDA%3D', description: 'Fresh strawberries on creamy cheesecake' },
    { id: '6-8', name: 'Macarons', price: 99, type: 'veg', image: 'https://images.unsplash.com/photo-1570476922354-81227cdbb76c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8TWFjYXJvbnN8ZW58MHx8MHx8fDA%3D', description: 'Colorful French macarons' },
    { id: '6-9', name: 'Chocolate Mousse', price: 159, type: 'veg', image: 'https://media.istockphoto.com/id/1469142846/photo/a-bowl-of-chocolate-mousse-being-eaten-with-a-spoon-with-cocoa-powder-dusted-on-top-of-the.webp?a=1&b=1&s=612x612&w=0&k=20&c=ptqishtZuEe1wKzMkpbWiM4EV4GmxioOv_yoEqdGmm0=', description: 'Light and airy chocolate mousse' },
    { id: '6-10', name: 'Coffee', price: 79, type: 'veg', image: 'https://plus.unsplash.com/premium_photo-1674327105074-46dd8319164b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Q29mZmVlfGVufDB8fDB8fHww', description: 'Freshly brewed coffee' },
  ],
};

const RESTAURANTS: { [key: number]: { name: string; image: string; rating: number } } = {
  1: { name: 'Burger King', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80', rating: 4.5 },
  2: { name: 'Pizza Hut', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80', rating: 4.2 },
  3: { name: 'Sushi Biryani', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80', rating: 4.8 },
  4: { name: 'Green Garden', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80', rating: 4.6 },
  5: { name: 'Taco Bell', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80', rating: 4.3 },
  6: { name: 'Sweet Delights', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80', rating: 4.9 },
};

export default function RestaurantMenu() {
  const { isLoggedIn, goToCustomerAuthLogin } = useAuth();
  const navigate = useNavigate();
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { addItem, openCart, items: cartItems } = useCart();
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: number }>(
    {}
  );
  const [failedImages, setFailedImages] = useState<{ [key: string]: boolean }>({});
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'nonveg' | 'egg' | 'spicy' | 'popular'>('all');

  const id = parseInt(restaurantId || "1");

  const restaurant = RESTAURANTS[id];
  const menuItems = (MENU_ITEMS as any)[id] || [];

  // Filter items based on dietary preference or special tags
  const filteredItems = useMemo(() => {
    switch (dietaryFilter) {
      case 'all':
        return menuItems;
      case 'veg':
        return menuItems.filter((item: any) => item.type === 'veg');
      case 'nonveg':
        return menuItems.filter((item: any) => item.type === 'nonveg');
      case 'egg':
        return menuItems.filter((item: any) =>
          item.name.toLowerCase().includes('egg') ||
          item.description.toLowerCase().includes('egg')
        );
      case 'spicy':
        return menuItems.filter((item: any) =>
          item.description.toLowerCase().includes('spicy')
        );
      case 'popular':
        // placeholder: return first 5 items as "highly reordered"
        return menuItems.slice(0, 5);
      default:
        return menuItems;
    }
  }, [menuItems, dietaryFilter]);

  const handleAddToCart = (item: any) => {
    if (!isLoggedIn) {
    goToCustomerAuthLogin();
    return;
  }

    const quantity = selectedItems[item.id] || 1;

    addItem({
      id: item.id,
      restaurantId: id,
      restaurantName: restaurant.name,
      name: item.name,
      price: item.price,
      quantity,
      image: item.image,
      description: item.description,
    });

    openCart();
    setSelectedItems((prev) => ({ ...prev, [item.id]: 0 }));
  };

  const handleQuantityChange = (itemId: string, change: number) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change),
    }));
  };

  if (!restaurant) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-28">

      {/* Top Navigation */}
      <div className="sticky top-0 bg-white z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-700 hover:text-red-500 font-medium"
          >
            <ChevronLeft size={20} />
            Back
          </button>
        </div>
      </div>

      {/* Restaurant Hero */}
      <div className="relative h-85 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-b from-black/30 to-black/70" />

        <div className="absolute bottom-10 left-0 right-0 px-6">
          <div className="max-w-7xl mx-auto text-white">
            <h1 className="text-5xl font-extrabold mb-3">
              {restaurant.name}
            </h1>

            <div className="flex gap-4 text-sm">

              <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full backdrop-blur">
                <Star size={14} />
                {restaurant.rating}
              </div>

              <div className="bg-white/20 px-3 py-1 rounded-full backdrop-blur">
                30-40 min
              </div>

              <div className="bg-white/20 px-3 py-1 rounded-full backdrop-blur">
                Fast Food
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Menu</h2>
          <span className="text-gray-500 text-sm">
            {filteredItems.length} Items
          </span>
        </div>

        {/* Dietary Filter Buttons */}
        <div className="flex gap-3 mb-10 flex-wrap">
          <button
            onClick={() => setDietaryFilter('all')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              dietaryFilter === 'all'
                ? 'bg-[#B88A2E] text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            🍽️ All Items
          </button>
          <button
            onClick={() => setDietaryFilter('veg')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              dietaryFilter === 'veg'
                ? 'bg-[#B88A2E] text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            🥗 Vegetarian
          </button>
          <button
            onClick={() => setDietaryFilter('nonveg')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              dietaryFilter === 'nonveg'
                ? 'bg-[#B88A2E] text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            🍗 Non-Vegetarian
          </button>
          <button
            onClick={() => setDietaryFilter('egg')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              dietaryFilter === 'egg'
                ? 'bg-[#B88A2E] text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            🥚 Egg
          </button>
          <button
            onClick={() => setDietaryFilter('spicy')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              dietaryFilter === 'spicy'
                ? 'bg-[#B88A2E] text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            🌶️ Spicy
          </button>
          <button
            onClick={() => setDietaryFilter('popular')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              dietaryFilter === 'popular'
                ? 'bg-[#B88A2E] text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            ⭐ Highly Ordered
          </button>
        </div>

        <div className="grid gap-8 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">

          {filteredItems.map((item: any) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >

              {/* Food Image */}
              <div className="relative h-52 overflow-hidden bg-gray-100">
                {failedImages[item.id] ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    <ImageIcon size={40} className="text-gray-400 mb-2" />
                    <p className="text-gray-600 font-semibold text-center px-4">{item.name}</p>
                  </div>
                ) : (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    onError={() => setFailedImages(prev => ({ ...prev, [item.id]: true }))}
                  />
                )}
              </div>

              {/* Food Info */}
              <div className="p-2">

                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {item.name}
                </h3>

                <p className="text-gray-500 text-sm mb-4">
                  {item.description}
                </p>

                <div className="flex items-center justify-between mb-4">

                  <span className="text-2xl font-bold text-[#B88A2E]">
                    ₹{item.price}
                  </span>

                </div>

                {/* Controls */}
                <div className="flex items-center gap-3">

                  {/* Quantity */}
                  <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">

                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow hover:bg-gray-50"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="font-semibold w-6 text-center">
                      {selectedItems[item.id] || 0}
                    </span>

                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow hover:bg-gray-50"
                    >
                      <Plus size={16} />
                    </button>

                  </div>

                  {/* Add Button */}
                  <button
                    disabled={(selectedItems[item.id] || 0) === 0}
                    onClick={() => handleAddToCart(item)}
                    className="flex items-center gap-2 bg-[#B88A2E] hover:bg-[#A67C2A] text-white px-5 py-2 rounded-xl font-semibold shadow disabled:opacity-50"
                  >
                    <ShoppingBag size={18} />
                    Add
                  </button>

                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Cart Button */}
      {cartItems.length > 0 && (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-6 left-0 right-0 flex justify-center z-50"
        >
          <button
            onClick={() => {
              window.alert('Opening cart page...');
              navigate('/cart');
            }}
            className="flex items-center gap-3 bg-[#B88A2E] hover:bg-[#A67C2A] text-white px-12 py-4 rounded-full font-semibold shadow-2xl text-lg"
          >
            <ShoppingBag size={22} />
            View Cart
          </button>
        </motion.div>
      )}
    </div>
  );
}
