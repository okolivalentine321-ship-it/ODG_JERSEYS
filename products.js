/*
  ODG_JERSEYS PRODUCT CONTROL
  ---------------------------
  This is the only file you need to edit when adding products.

  1. Put the image inside the /images folder.
  2. Add a new product object below.
  3. Change name, price, category, image and description.
  4. Save and upload the files to GitHub Pages.

  Categories available:
  jerseys, premier-league, la-liga, international, training

  IMPORTANT:
  Replace the sample products with your real inventory.
*/

const PRODUCTS = [
  {
    id: 1,
    name: "CHELSEA AWAY JERSEY",
    price: 15000,
    category: "current",
    label: "NEW",
    image: "chelse awaykit.jpeg",
    description: "Premium Chelsea Away jersey."
  },
  {
    id: 2,
    name: "MANCHESTER UNITED AWAY Jersey",
    price: 15000,
    category: "current",
    label: "NEW",
    image: "man u awaykit.jpeg",
    description: "Manchester United Away jersey."
  },
  {
    id: 3,
    name: "BARCELONA AWAY Jersey",
    price: 15000,
    category: "current",
    label: "NEW",
    image: "barca awaykit.jpeg",
    description: "Premium Barcelona Away jersey."
  },
  {
    id: 4,
    name: "MANCHESTER UNITED THIRD Jersey",
    price: 15000,
    category: "current",
    label: "NEW",
    image: "man u thirdkit.jpeg",
    description: "Premium Manchester United jersey."
  },
  {
    id: 5,
    name: "Barcelona Home Jersey",
    price: 15000,
    category: "current",
    label: "NEW",
    image: "barca home.jpeg",
    description: "Premium Barcelona Home Jersey."
  },
  {
    id: 6,
    name: "PARIS SAINT GERMAIN AWAY JERSEY",
    price: 15000,
    category: "current",
    label: "NEW",
    image: "psg away.jpeg",
    description: "Premium Paris Saint Germain Away Jersey."
  },
  {
   id: 7,
    name: "REAL MADRID HOME JERSEY",
    price: 15000,
    category: "current",
    label: "NEW",
    image: "Madrid white .jpeg",
    description: "Premium Real Madrid Home Jersey."
  },
  {
     id: 8,
    name: "ARSENAL AWAY JERSEY",
    price: 15000,
    category: "current",
    label: "NEW",
    image: "Arsenal third.jpeg",
    description: "Premium Arsenal Away Jersey."
  },
  {
     id: 9,
    name: "ARSENAL THIRD JERSEY",
    price: 15000,
    category: "current",
    label: "NEW",
    image: "arsenal gold.jpeg",
    description: "Premium Arsenal Third Jersey."
  },
  {
     id: 10,
    name: "MANCHESTER UNITED HOME JERSEY",
    price: 15000,
    category: "current",
    label: "NEW",
    image: "man u home.jpeg",
    description: "Premium Manchester United Home Jersey."
  },
  {
     id: 11,
    name: "REAL MADRID AWAY JERSEY",
    price: 15000,
    category: "current",
    label: "NEW",
    image: "madrid away.jpeg",
    description: "Premium Real Madrid Away Jersey."
  },
  {
     id: 12,
    name: "LIVERPOOL FC HOME JERSEY",
    price: 15000,
    category: "current",
    label: "NEW",
    image: "Liverpool home.jpeg",
    description: "Premium Liverpool Fc Home Jersey."
  },
  {
     id: 13,
    name: "ASTON VILLA HOME JERSEY",
    price: 15000,
    category: "current",
    label: "NEW",
    image: "Astonvilla.jpeg",
    description: "Premium Aston Villa Home Jersey."
  },
  {
     id: 14,
    name: "CHELSEA HOME JERSEY",
    price: 15000,
    category: "current",
    label: "NEW",
    image: "chelsea home.jpeg",
    description: "Premium Chelsea Home Jersey."
  },
  {
     id: 15,
    name: "NEWCASTLE UNITED HOME JERSEY",
    price: 15000,
    category: "retro",
    label: "RETRO",
    image: "newcastle retro.jpeg",
    description: "Premium Newcastle United Home Retro Jersey."
},
 {
     id: 16,
    name: "PORTUGAL AWAY JERSEY",
    price: 15000,
    category: "national",
    label: "NATIONAL",
    image: "portugal national.jpeg",
    description: "Premium Portugal Away Jersey."
},
  {
     id: 15,
    name: "INTER MILLAN HOME JERSEY",
    price: 15000,
    category: "current",
    label: "NEW",
    image: "inter.jpeg",
    description: "Premium Inter Millan Jersey" 
},
 {
     id: 15,
    name: "BARCELONA THIRD JERSEY",
    price: 15000,
    category: "current",
    label: "NEW",
    image: "barca thirdkit.jpeg",
    description: "Premium Barcelona Jersey." 
},
   {
     id: 15,
    name: "ARSENAL JERSEY",
    price: 15000,
    category: "retro",
    label: "RETRO",
    image: "arsenal retro.jpeg",
    description: "Premium Arsenal Retro Jersey." 
},  
  {
     id: 15,
    name: "ARGENTINA HOME JERSEY",
    price: 15000,
    category: "national",
    label: "NATIONAL",
    image: "argentina.jpeg",
    description: "Premium Argentina Jersey." 
},  
  {
     id: 15,
    name: "BAYERN MUNCHEN AWAY JERSEY",
    price: 15000,
    category: "current",
    label: "NEW",
    image: "",
    description: "Premium Bayern Muchen Away Jersey" 
},  
  {
     id: 15,
    name: "TOTTEHAM HOSPOR ",
    price: 15000,
    category: "retro",
    label: "RETRO",
    image: "",
    description: "Premium Totteham Retro Jersey" 
},  
  {
     id: 15,
    name: "LAZIO  FC",
    price: 15000,
    category: "retro",
    label: "RETRO",
    image: "",
    description: "Premium Lazio Retro Jersey" 
},  
  {
     id: 15,
    name: "BURRUSIA DORTMUND HOME JERSEY",
    price: 15000,
    category: "current",
    label: "NEW",
    image: "",
    description: "Premium Dortmund Jersey" 
},  {
     id: 15,
    name: "BAYERN MUNCHEN HOME JERSEY",
    price: 15000,
    category: "current",
    label: "NEW",
    image: "",
    description: "Premium Bayern Jersey" 
},  
  {
     id: 15,
    name: "PORTUGAL HOME JERSEY",
    price: 15000,
    category: "national",
    label: "NATIONAL",
    image: "",
    description: "Premium Portugal Home Jersey" 
},  
  {
     id: 15,
    name: "FRANCE HOME JERSEY",
    price: 15000,
    category: "national",
    label: "NATIONAL",
    image: "",
    description: "Premium France Home Jersey" 
},  
  {
     id: 15,
    name: "AC MILAN ",
    price: 15000,
    category: "retro",
    label: "RETRO",
    image: "",
    description: "Premium Ac Millan Jersey" 
},  
  {
     id: 15,
    name: "FRANCE 1998",
    price: 15000,
    category: "retro",
    label: "RETRO",
    image: "",
    description: "Premium France Jersey" 
},  
  {
     id: 15,
    name: "BRAZIL 1996",
    price: 15000,
    category: "retro",
    label: "RETRO",
    image: "",
    description: "Premium Brazil Jersey" 
},  
  {
     id: 15,
    name: "BRAZIL 1998",
    price: 15000,
    category: "retro",
    label: "RETRO",
    image: "",
    description: "Premium Brazil jersey" 
},  
  {
     id: 15,
    name: "BRAZIL 2022",
    price: 15000,
    category: "retro",
    label: "RETRO",
    image: "",
    description: "Premium Brazil Jersey" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
},
  {
     id: 15,
    name: "",
    price: ,
    category: "",
    label: "",
    image: "",
    description: "Premium" 
}:
];
