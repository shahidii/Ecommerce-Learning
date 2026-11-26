// Dummy products for building the UI (Phase 6).
// Same shape as the API response (GET /api/products), so in a later
// phase we only replace this import with a real API call.

export const products = [
  {
    id: "prod-01",
    title: "Organic Cotton Onesie – Pack of 3 (White)",
    slug: "organic-cotton-onesie-pack-of-3-white",
    description: "Everyday bodysuits made from GOTS-certified organic cotton. Envelope neck for easy dressing, nickel-free snap buttons and flat seams that are kind to delicate skin.",
    brand: "Little Nest",
    category: {
      id: "cat-1",
      name: "Organic Clothing",
      slug: "organic-clothing",
      image: "https://images.pexels.com/photos/3875082/pexels-photo-3875082.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-1",
        name: "Newborn",
        slug: "newborn",
        ageRange: "0–3 Months"
      },
      {
        id: "age-2",
        name: "Infant",
        slug: "infant",
        ageRange: "3–12 Months"
      }
    ],
    price: 899,
    mrp: 1299,
    discountPercentage: 31,
    currency: "INR",
    rating: 4.7,
    reviewsCount: 1284,
    stock: 120,
    inStock: true,
    thumbnail: "https://images.pexels.com/photos/5982301/pexels-photo-5982301.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/5982301/pexels-photo-5982301.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/3845156/pexels-photo-3845156.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/29015875/pexels-photo-29015875.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "onesie",
      "bodysuit",
      "organic cotton",
      "unisex"
    ],
    specifications: [
      {
        label: "Material",
        value: "100% organic cotton"
      },
      {
        label: "Pack",
        value: "3 bodysuits"
      },
      {
        label: "Closure",
        value: "Snap buttons"
      },
      {
        label: "Care",
        value: "Machine wash cold"
      }
    ],
    isFeatured: true
  },
  {
    id: "prod-02",
    title: "Checkered Zip Sleepsuit",
    slug: "checkered-zip-sleepsuit",
    description: "A full-length sleepsuit with a two-way zip for quick night-time changes. Fold-over mitten cuffs stop little scratches.",
    brand: "Cotton Cub",
    category: {
      id: "cat-1",
      name: "Organic Clothing",
      slug: "organic-clothing",
      image: "https://images.pexels.com/photos/3875082/pexels-photo-3875082.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-1",
        name: "Newborn",
        slug: "newborn",
        ageRange: "0–3 Months"
      },
      {
        id: "age-2",
        name: "Infant",
        slug: "infant",
        ageRange: "3–12 Months"
      }
    ],
    price: 749,
    mrp: 999,
    discountPercentage: 25,
    currency: "INR",
    rating: 4.5,
    reviewsCount: 642,
    stock: 80,
    inStock: true,
    thumbnail: "https://images.pexels.com/photos/6849436/pexels-photo-6849436.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/6849436/pexels-photo-6849436.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/3875233/pexels-photo-3875233.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "sleepsuit",
      "romper",
      "zip",
      "unisex"
    ],
    specifications: [
      {
        label: "Material",
        value: "Organic cotton jersey"
      },
      {
        label: "Closure",
        value: "Two-way zip"
      },
      {
        label: "Feet",
        value: "Footed"
      }
    ],
    isFeatured: false
  },
  {
    id: "prod-03",
    title: "Newborn Essentials Gift Set (Bodysuits & Bibs)",
    slug: "newborn-essentials-gift-set-bodysuits-bibs",
    description: "The perfect baby shower gift: two bodysuits, two bibs and a cap in soft organic cotton, packed in a reusable keepsake box.",
    brand: "Little Nest",
    category: {
      id: "cat-1",
      name: "Organic Clothing",
      slug: "organic-clothing",
      image: "https://images.pexels.com/photos/3875082/pexels-photo-3875082.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-1",
        name: "Newborn",
        slug: "newborn",
        ageRange: "0–3 Months"
      }
    ],
    price: 1599,
    mrp: 2199,
    discountPercentage: 27,
    currency: "INR",
    rating: 4.8,
    reviewsCount: 517,
    stock: 45,
    inStock: true,
    thumbnail: "https://images.pexels.com/photos/3875082/pexels-photo-3875082.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/3875082/pexels-photo-3875082.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/7484842/pexels-photo-7484842.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/7055886/pexels-photo-7055886.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "gift set",
      "newborn",
      "bib",
      "bodysuit"
    ],
    specifications: [
      {
        label: "Includes",
        value: "2 bodysuits, 2 bibs, 1 cap"
      },
      {
        label: "Material",
        value: "Organic cotton"
      },
      {
        label: "Size",
        value: "0–3 months"
      }
    ],
    isFeatured: true
  },
  {
    id: "prod-04",
    title: "Hand-Knit Wool Booties (Cream)",
    slug: "hand-knit-wool-booties-cream",
    description: "Hand-knitted merino booties with a ribbon tie that keeps them on wriggly feet. Warm, breathable and soft.",
    brand: "Woolly Wonders",
    category: {
      id: "cat-1",
      name: "Organic Clothing",
      slug: "organic-clothing",
      image: "https://images.pexels.com/photos/3875082/pexels-photo-3875082.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-1",
        name: "Newborn",
        slug: "newborn",
        ageRange: "0–3 Months"
      },
      {
        id: "age-2",
        name: "Infant",
        slug: "infant",
        ageRange: "3–12 Months"
      }
    ],
    price: 549,
    mrp: 799,
    discountPercentage: 31,
    currency: "INR",
    rating: 4.6,
    reviewsCount: 389,
    stock: 60,
    inStock: true,
    thumbnail: "https://images.pexels.com/photos/39462003/pexels-photo-39462003.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/39462003/pexels-photo-39462003.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/17773456/pexels-photo-17773456.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "booties",
      "knit",
      "wool",
      "winter"
    ],
    specifications: [
      {
        label: "Material",
        value: "Merino wool"
      },
      {
        label: "Sizes",
        value: "0–6 months, 6–12 months"
      },
      {
        label: "Care",
        value: "Hand wash"
      }
    ],
    isFeatured: false
  },
  {
    id: "prod-05",
    title: "Knitted Bear-Ear Romper",
    slug: "knitted-bear-ear-romper",
    description: "A cosy knitted romper with an adorable bear-ear hood. Snap opening at the legs for easy nappy changes.",
    brand: "Woolly Wonders",
    category: {
      id: "cat-1",
      name: "Organic Clothing",
      slug: "organic-clothing",
      image: "https://images.pexels.com/photos/3875082/pexels-photo-3875082.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-2",
        name: "Infant",
        slug: "infant",
        ageRange: "3–12 Months"
      }
    ],
    price: 1299,
    mrp: 1799,
    discountPercentage: 28,
    currency: "INR",
    rating: 4.7,
    reviewsCount: 274,
    stock: 35,
    inStock: true,
    thumbnail: "https://images.pexels.com/photos/32890761/pexels-photo-32890761.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/32890761/pexels-photo-32890761.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/36848834/pexels-photo-36848834.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "romper",
      "knit",
      "winter",
      "bear"
    ],
    specifications: [
      {
        label: "Material",
        value: "Cotton-wool blend knit"
      },
      {
        label: "Closure",
        value: "Leg snaps"
      },
      {
        label: "Season",
        value: "Autumn / Winter"
      }
    ],
    isFeatured: false
  },
  {
    id: "prod-06",
    title: "Cosy Knit Sweater",
    slug: "cosy-knit-sweater",
    description: "A classic chunky-knit sweater with shoulder buttons so it slips easily over little heads.",
    brand: "Cotton Cub",
    category: {
      id: "cat-1",
      name: "Organic Clothing",
      slug: "organic-clothing",
      image: "https://images.pexels.com/photos/3875082/pexels-photo-3875082.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-2",
        name: "Infant",
        slug: "infant",
        ageRange: "3–12 Months"
      },
      {
        id: "age-3",
        name: "Toddler",
        slug: "toddler",
        ageRange: "1–3 Years"
      }
    ],
    price: 999,
    mrp: 1399,
    discountPercentage: 29,
    currency: "INR",
    rating: 4.4,
    reviewsCount: 198,
    stock: 50,
    inStock: true,
    thumbnail: "https://images.pexels.com/photos/35335057/pexels-photo-35335057.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/35335057/pexels-photo-35335057.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/26219975/pexels-photo-26219975.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "sweater",
      "knit",
      "winter"
    ],
    specifications: [
      {
        label: "Material",
        value: "Organic cotton knit"
      },
      {
        label: "Neck",
        value: "Shoulder button opening"
      },
      {
        label: "Sizes",
        value: "6 months – 3 years"
      }
    ],
    isFeatured: false
  },
  {
    id: "prod-07",
    title: "Animal Print Jumpsuit",
    slug: "animal-print-jumpsuit",
    description: "A playful all-in-one with a friendly animal print, roomy fit for crawling and stretchy cuffs. Currently out of stock.",
    brand: "Tiny Toes",
    category: {
      id: "cat-1",
      name: "Organic Clothing",
      slug: "organic-clothing",
      image: "https://images.pexels.com/photos/3875082/pexels-photo-3875082.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-2",
        name: "Infant",
        slug: "infant",
        ageRange: "3–12 Months"
      },
      {
        id: "age-3",
        name: "Toddler",
        slug: "toddler",
        ageRange: "1–3 Years"
      }
    ],
    price: 849,
    mrp: 1199,
    discountPercentage: 29,
    currency: "INR",
    rating: 4.3,
    reviewsCount: 156,
    stock: 0,
    inStock: false,
    thumbnail: "https://images.pexels.com/photos/28259749/pexels-photo-28259749.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/28259749/pexels-photo-28259749.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/34121887/pexels-photo-34121887.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "jumpsuit",
      "animal print",
      "playwear"
    ],
    specifications: [
      {
        label: "Material",
        value: "Cotton jersey"
      },
      {
        label: "Fit",
        value: "Relaxed"
      },
      {
        label: "Sizes",
        value: "6 months – 2 years"
      }
    ],
    isFeatured: false
  },
  {
    id: "prod-08",
    title: "Toddler Denim Jacket & Skirt Set",
    slug: "toddler-denim-jacket-skirt-set",
    description: "A soft-washed denim jacket with a matching twirl skirt. Elastic waist for comfort and easy dressing.",
    brand: "Tiny Toes",
    category: {
      id: "cat-1",
      name: "Organic Clothing",
      slug: "organic-clothing",
      image: "https://images.pexels.com/photos/3875082/pexels-photo-3875082.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-3",
        name: "Toddler",
        slug: "toddler",
        ageRange: "1–3 Years"
      },
      {
        id: "age-4",
        name: "Preschool",
        slug: "preschool",
        ageRange: "3–5 Years"
      }
    ],
    price: 1499,
    mrp: 2199,
    discountPercentage: 32,
    currency: "INR",
    rating: 4.5,
    reviewsCount: 121,
    stock: 25,
    inStock: true,
    thumbnail: "https://images.pexels.com/photos/18862066/pexels-photo-18862066.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/18862066/pexels-photo-18862066.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/39877366/pexels-photo-39877366.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "denim",
      "jacket",
      "skirt",
      "girls"
    ],
    specifications: [
      {
        label: "Material",
        value: "Soft cotton denim"
      },
      {
        label: "Includes",
        value: "Jacket + skirt"
      },
      {
        label: "Sizes",
        value: "2 – 5 years"
      }
    ],
    isFeatured: false
  },
  {
    id: "prod-09",
    title: "Anti-Colic Feeding Bottle 260 ml",
    slug: "anti-colic-feeding-bottle-260-ml",
    description: "A vented anti-colic bottle that reduces air intake and tummy troubles. Wide neck for easy filling and cleaning.",
    brand: "Little Nest",
    category: {
      id: "cat-2",
      name: "Feeding Essentials",
      slug: "feeding-essentials",
      image: "https://images.pexels.com/photos/3716516/pexels-photo-3716516.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-1",
        name: "Newborn",
        slug: "newborn",
        ageRange: "0–3 Months"
      },
      {
        id: "age-2",
        name: "Infant",
        slug: "infant",
        ageRange: "3–12 Months"
      }
    ],
    price: 499,
    mrp: 699,
    discountPercentage: 29,
    currency: "INR",
    rating: 4.6,
    reviewsCount: 2310,
    stock: 150,
    inStock: true,
    thumbnail: "https://images.pexels.com/photos/374756/pexels-photo-374756.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/374756/pexels-photo-374756.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/8430572/pexels-photo-8430572.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/7282619/pexels-photo-7282619.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "bottle",
      "anti-colic",
      "bpa free",
      "milk"
    ],
    specifications: [
      {
        label: "Capacity",
        value: "260 ml"
      },
      {
        label: "Material",
        value: "BPA-free PP"
      },
      {
        label: "Teat",
        value: "Slow flow silicone"
      },
      {
        label: "Dishwasher",
        value: "Top rack safe"
      }
    ],
    isFeatured: true
  },
  {
    id: "prod-10",
    title: "Wide-Neck Glass Feeding Bottle 150 ml",
    slug: "wide-neck-glass-feeding-bottle-150-ml",
    description: "Borosilicate glass bottle with a protective silicone sleeve. Plastic-free, odour-free and safe to sterilise.",
    brand: "PureSip",
    category: {
      id: "cat-2",
      name: "Feeding Essentials",
      slug: "feeding-essentials",
      image: "https://images.pexels.com/photos/3716516/pexels-photo-3716516.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-1",
        name: "Newborn",
        slug: "newborn",
        ageRange: "0–3 Months"
      }
    ],
    price: 649,
    mrp: 899,
    discountPercentage: 28,
    currency: "INR",
    rating: 4.5,
    reviewsCount: 864,
    stock: 70,
    inStock: true,
    thumbnail: "https://images.pexels.com/photos/6849544/pexels-photo-6849544.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/6849544/pexels-photo-6849544.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/7282318/pexels-photo-7282318.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/33508363/pexels-photo-33508363.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "bottle",
      "glass",
      "newborn",
      "milk"
    ],
    specifications: [
      {
        label: "Capacity",
        value: "150 ml"
      },
      {
        label: "Material",
        value: "Borosilicate glass + silicone sleeve"
      },
      {
        label: "Teat",
        value: "Newborn flow"
      }
    ],
    isFeatured: false
  },
  {
    id: "prod-11",
    title: "Formula Dispenser & Measuring Scoop Set",
    slug: "formula-dispenser-measuring-scoop-set",
    description: "Three stackable compartments for pre-measured formula on the go, with a levelling scoop for accurate feeds.",
    brand: "PureSip",
    category: {
      id: "cat-2",
      name: "Feeding Essentials",
      slug: "feeding-essentials",
      image: "https://images.pexels.com/photos/3716516/pexels-photo-3716516.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-1",
        name: "Newborn",
        slug: "newborn",
        ageRange: "0–3 Months"
      },
      {
        id: "age-2",
        name: "Infant",
        slug: "infant",
        ageRange: "3–12 Months"
      }
    ],
    price: 349,
    mrp: 499,
    discountPercentage: 30,
    currency: "INR",
    rating: 4.2,
    reviewsCount: 412,
    stock: 90,
    inStock: true,
    thumbnail: "https://images.pexels.com/photos/11501481/pexels-photo-11501481.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/11501481/pexels-photo-11501481.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "formula",
      "dispenser",
      "travel"
    ],
    specifications: [
      {
        label: "Compartments",
        value: "3"
      },
      {
        label: "Material",
        value: "BPA-free PP"
      },
      {
        label: "Includes",
        value: "Levelling scoop"
      }
    ],
    isFeatured: false
  },
  {
    id: "prod-12",
    title: "Convertible Wooden High Chair",
    slug: "convertible-wooden-high-chair",
    description: "A beech-wood high chair that grows from baby to big kid. Removable tray, 5-point harness and adjustable footrest.",
    brand: "Nest & Grow",
    category: {
      id: "cat-2",
      name: "Feeding Essentials",
      slug: "feeding-essentials",
      image: "https://images.pexels.com/photos/3716516/pexels-photo-3716516.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-2",
        name: "Infant",
        slug: "infant",
        ageRange: "3–12 Months"
      },
      {
        id: "age-3",
        name: "Toddler",
        slug: "toddler",
        ageRange: "1–3 Years"
      }
    ],
    price: 7999,
    mrp: 10999,
    discountPercentage: 27,
    currency: "INR",
    rating: 4.8,
    reviewsCount: 286,
    stock: 12,
    inStock: true,
    thumbnail: "https://images.pexels.com/photos/3716516/pexels-photo-3716516.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/3716516/pexels-photo-3716516.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/7946746/pexels-photo-7946746.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/7491116/pexels-photo-7491116.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "high chair",
      "wooden",
      "convertible",
      "weaning"
    ],
    specifications: [
      {
        label: "Material",
        value: "Solid beech wood"
      },
      {
        label: "Harness",
        value: "5-point"
      },
      {
        label: "Age",
        value: "6 months – 5 years"
      },
      {
        label: "Max load",
        value: "25 kg"
      }
    ],
    isFeatured: true
  },
  {
    id: "prod-13",
    title: "Silicone Weaning Spoon Set (Pack of 4)",
    slug: "silicone-weaning-spoon-set-pack-of-4",
    description: "Soft-tip silicone spoons that are gentle on gums, with short handles that are easy for little hands to hold.",
    brand: "Little Nest",
    category: {
      id: "cat-2",
      name: "Feeding Essentials",
      slug: "feeding-essentials",
      image: "https://images.pexels.com/photos/3716516/pexels-photo-3716516.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-2",
        name: "Infant",
        slug: "infant",
        ageRange: "3–12 Months"
      },
      {
        id: "age-3",
        name: "Toddler",
        slug: "toddler",
        ageRange: "1–3 Years"
      }
    ],
    price: 399,
    mrp: 549,
    discountPercentage: 27,
    currency: "INR",
    rating: 4.6,
    reviewsCount: 978,
    stock: 140,
    inStock: true,
    thumbnail: "https://images.pexels.com/photos/4409245/pexels-photo-4409245.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/4409245/pexels-photo-4409245.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/4409276/pexels-photo-4409276.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/7946745/pexels-photo-7946745.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "spoon",
      "weaning",
      "silicone",
      "first foods"
    ],
    specifications: [
      {
        label: "Pack",
        value: "4 spoons"
      },
      {
        label: "Material",
        value: "Food-grade silicone"
      },
      {
        label: "Dishwasher",
        value: "Safe"
      }
    ],
    isFeatured: false
  },
  {
    id: "prod-14",
    title: "Suction Bowl & Plate Set",
    slug: "suction-bowl-plate-set",
    description: "Strong suction bases keep bowls and plates on the table, not the floor. Microwave and dishwasher safe.",
    brand: "Nest & Grow",
    category: {
      id: "cat-2",
      name: "Feeding Essentials",
      slug: "feeding-essentials",
      image: "https://images.pexels.com/photos/3716516/pexels-photo-3716516.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-2",
        name: "Infant",
        slug: "infant",
        ageRange: "3–12 Months"
      },
      {
        id: "age-3",
        name: "Toddler",
        slug: "toddler",
        ageRange: "1–3 Years"
      }
    ],
    price: 699,
    mrp: 999,
    discountPercentage: 30,
    currency: "INR",
    rating: 4.4,
    reviewsCount: 503,
    stock: 75,
    inStock: true,
    thumbnail: "https://images.pexels.com/photos/7491105/pexels-photo-7491105.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/7491105/pexels-photo-7491105.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/5083238/pexels-photo-5083238.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "bowl",
      "plate",
      "suction",
      "weaning"
    ],
    specifications: [
      {
        label: "Includes",
        value: "1 bowl, 1 divided plate"
      },
      {
        label: "Material",
        value: "Food-grade silicone"
      },
      {
        label: "Microwave",
        value: "Safe"
      }
    ],
    isFeatured: false
  },
  {
    id: "prod-15",
    title: "Waterproof Feeding Bibs (Pack of 3)",
    slug: "waterproof-feeding-bibs-pack-of-3",
    description: "Wipe-clean bibs with a deep crumb catcher pocket for messy weaning adventures. Currently out of stock.",
    brand: "Tiny Toes",
    category: {
      id: "cat-2",
      name: "Feeding Essentials",
      slug: "feeding-essentials",
      image: "https://images.pexels.com/photos/3716516/pexels-photo-3716516.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-2",
        name: "Infant",
        slug: "infant",
        ageRange: "3–12 Months"
      },
      {
        id: "age-3",
        name: "Toddler",
        slug: "toddler",
        ageRange: "1–3 Years"
      }
    ],
    price: 449,
    mrp: 649,
    discountPercentage: 31,
    currency: "INR",
    rating: 4.3,
    reviewsCount: 667,
    stock: 0,
    inStock: false,
    thumbnail: "https://images.pexels.com/photos/11787679/pexels-photo-11787679.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/11787679/pexels-photo-11787679.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/26337070/pexels-photo-26337070.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/33094010/pexels-photo-33094010.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "bib",
      "waterproof",
      "mess-free"
    ],
    specifications: [
      {
        label: "Pack",
        value: "3 bibs"
      },
      {
        label: "Material",
        value: "Waterproof PEVA"
      },
      {
        label: "Closure",
        value: "Adjustable snaps"
      }
    ],
    isFeatured: false
  },
  {
    id: "prod-16",
    title: "Toddler Snack Cup & Fruit Bowl",
    slug: "toddler-snack-cup-fruit-bowl",
    description: "A spill-resistant snack cup and a lightweight fruit bowl for independent snacking at home or on the go.",
    brand: "PureSip",
    category: {
      id: "cat-2",
      name: "Feeding Essentials",
      slug: "feeding-essentials",
      image: "https://images.pexels.com/photos/3716516/pexels-photo-3716516.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-3",
        name: "Toddler",
        slug: "toddler",
        ageRange: "1–3 Years"
      },
      {
        id: "age-4",
        name: "Preschool",
        slug: "preschool",
        ageRange: "3–5 Years"
      }
    ],
    price: 399,
    mrp: 599,
    discountPercentage: 33,
    currency: "INR",
    rating: 4.4,
    reviewsCount: 341,
    stock: 95,
    inStock: true,
    thumbnail: "https://images.pexels.com/photos/17781076/pexels-photo-17781076.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/17781076/pexels-photo-17781076.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/9305088/pexels-photo-9305088.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "snack cup",
      "bowl",
      "toddler",
      "spill-proof"
    ],
    specifications: [
      {
        label: "Includes",
        value: "Snack cup + bowl"
      },
      {
        label: "Material",
        value: "BPA-free PP"
      },
      {
        label: "Lid",
        value: "Soft flap lid"
      }
    ],
    isFeatured: false
  },
  {
    id: "prod-17",
    title: "Classic White Wooden Crib",
    slug: "classic-white-wooden-crib",
    description: "A timeless solid-wood crib with three mattress heights and smooth rounded edges. Converts to a toddler bed.",
    brand: "Nest & Grow",
    category: {
      id: "cat-3",
      name: "Sleep & Nursery",
      slug: "sleep-nursery",
      image: "https://images.pexels.com/photos/3875085/pexels-photo-3875085.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-1",
        name: "Newborn",
        slug: "newborn",
        ageRange: "0–3 Months"
      },
      {
        id: "age-2",
        name: "Infant",
        slug: "infant",
        ageRange: "3–12 Months"
      },
      {
        id: "age-3",
        name: "Toddler",
        slug: "toddler",
        ageRange: "1–3 Years"
      }
    ],
    price: 14999,
    mrp: 19999,
    discountPercentage: 25,
    currency: "INR",
    rating: 4.8,
    reviewsCount: 214,
    stock: 8,
    inStock: true,
    thumbnail: "https://images.pexels.com/photos/3875085/pexels-photo-3875085.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/3875085/pexels-photo-3875085.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/7937988/pexels-photo-7937988.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/37185810/pexels-photo-37185810.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "crib",
      "cot",
      "wooden",
      "nursery"
    ],
    specifications: [
      {
        label: "Material",
        value: "Solid pine, non-toxic paint"
      },
      {
        label: "Mattress size",
        value: "120 × 60 cm"
      },
      {
        label: "Mattress heights",
        value: "3"
      },
      {
        label: "Converts",
        value: "Toddler bed"
      }
    ],
    isFeatured: true
  },
  {
    id: "prod-18",
    title: "Natural Wood Crib with Soft Toy Set",
    slug: "natural-wood-crib-with-soft-toy-set",
    description: "A natural-finish wooden crib bundled with three soft nursery toys. Breathable slatted sides for airflow.",
    brand: "Nest & Grow",
    category: {
      id: "cat-3",
      name: "Sleep & Nursery",
      slug: "sleep-nursery",
      image: "https://images.pexels.com/photos/3875085/pexels-photo-3875085.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-1",
        name: "Newborn",
        slug: "newborn",
        ageRange: "0–3 Months"
      },
      {
        id: "age-2",
        name: "Infant",
        slug: "infant",
        ageRange: "3–12 Months"
      },
      {
        id: "age-3",
        name: "Toddler",
        slug: "toddler",
        ageRange: "1–3 Years"
      }
    ],
    price: 12999,
    mrp: 16999,
    discountPercentage: 24,
    currency: "INR",
    rating: 4.6,
    reviewsCount: 132,
    stock: 6,
    inStock: true,
    thumbnail: "https://images.pexels.com/photos/11116578/pexels-photo-11116578.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/11116578/pexels-photo-11116578.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/4964347/pexels-photo-4964347.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "crib",
      "cot",
      "natural wood",
      "soft toys"
    ],
    specifications: [
      {
        label: "Material",
        value: "Natural beech wood"
      },
      {
        label: "Mattress size",
        value: "120 × 60 cm"
      },
      {
        label: "Includes",
        value: "3 soft toys"
      }
    ],
    isFeatured: false
  },
  {
    id: "prod-19",
    title: "Pastel Crib Bedding Set (Pink)",
    slug: "pastel-crib-bedding-set-pink",
    description: "Fitted sheet, quilt and pillowcase in breathable organic cotton, in a soft blush pink.",
    brand: "Little Nest",
    category: {
      id: "cat-3",
      name: "Sleep & Nursery",
      slug: "sleep-nursery",
      image: "https://images.pexels.com/photos/3875085/pexels-photo-3875085.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-1",
        name: "Newborn",
        slug: "newborn",
        ageRange: "0–3 Months"
      },
      {
        id: "age-2",
        name: "Infant",
        slug: "infant",
        ageRange: "3–12 Months"
      }
    ],
    price: 2499,
    mrp: 3299,
    discountPercentage: 24,
    currency: "INR",
    rating: 4.5,
    reviewsCount: 188,
    stock: 30,
    inStock: true,
    thumbnail: "https://images.pexels.com/photos/4886923/pexels-photo-4886923.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/4886923/pexels-photo-4886923.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/12603180/pexels-photo-12603180.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "bedding",
      "crib sheet",
      "pink",
      "nursery"
    ],
    specifications: [
      {
        label: "Includes",
        value: "Fitted sheet, quilt, pillowcase"
      },
      {
        label: "Material",
        value: "Organic cotton percale"
      },
      {
        label: "Fits",
        value: "120 × 60 cm crib"
      }
    ],
    isFeatured: false
  },
  {
    id: "prod-20",
    title: "Muslin Swaddle Blankets (Pack of 3)",
    slug: "muslin-swaddle-blankets-pack-of-3",
    description: "Large, airy muslin swaddles that get softer with every wash. Also great as a nursing cover or play mat.",
    brand: "Little Nest",
    category: {
      id: "cat-3",
      name: "Sleep & Nursery",
      slug: "sleep-nursery",
      image: "https://images.pexels.com/photos/3875085/pexels-photo-3875085.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-1",
        name: "Newborn",
        slug: "newborn",
        ageRange: "0–3 Months"
      }
    ],
    price: 1199,
    mrp: 1599,
    discountPercentage: 25,
    currency: "INR",
    rating: 4.9,
    reviewsCount: 1532,
    stock: 85,
    inStock: true,
    thumbnail: "https://images.pexels.com/photos/4964233/pexels-photo-4964233.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/4964233/pexels-photo-4964233.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/14476030/pexels-photo-14476030.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/971435/pexels-photo-971435.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "swaddle",
      "muslin",
      "blanket",
      "newborn"
    ],
    specifications: [
      {
        label: "Pack",
        value: "3 swaddles"
      },
      {
        label: "Size",
        value: "120 × 120 cm"
      },
      {
        label: "Material",
        value: "Organic cotton muslin"
      }
    ],
    isFeatured: true
  },
  {
    id: "prod-21",
    title: "Soft Knit Throw Blanket",
    slug: "soft-knit-throw-blanket",
    description: "A chunky cable-knit blanket for the pram, the crib or snuggling on the sofa.",
    brand: "Woolly Wonders",
    category: {
      id: "cat-3",
      name: "Sleep & Nursery",
      slug: "sleep-nursery",
      image: "https://images.pexels.com/photos/3875085/pexels-photo-3875085.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-1",
        name: "Newborn",
        slug: "newborn",
        ageRange: "0–3 Months"
      },
      {
        id: "age-2",
        name: "Infant",
        slug: "infant",
        ageRange: "3–12 Months"
      },
      {
        id: "age-3",
        name: "Toddler",
        slug: "toddler",
        ageRange: "1–3 Years"
      },
      {
        id: "age-4",
        name: "Preschool",
        slug: "preschool",
        ageRange: "3–5 Years"
      }
    ],
    price: 1499,
    mrp: 1999,
    discountPercentage: 25,
    currency: "INR",
    rating: 4.6,
    reviewsCount: 402,
    stock: 40,
    inStock: true,
    thumbnail: "https://images.pexels.com/photos/4886918/pexels-photo-4886918.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/4886918/pexels-photo-4886918.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/4887115/pexels-photo-4887115.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/4886896/pexels-photo-4886896.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "blanket",
      "knit",
      "nursery",
      "throw"
    ],
    specifications: [
      {
        label: "Size",
        value: "100 × 80 cm"
      },
      {
        label: "Material",
        value: "Cotton knit"
      },
      {
        label: "Care",
        value: "Machine wash gentle"
      }
    ],
    isFeatured: false
  },
  {
    id: "prod-22",
    title: "Woodland Cot Mobile",
    slug: "woodland-cot-mobile",
    description: "Hand-made felt woodland animals that turn gently above the cot to calm and entertain.",
    brand: "Nest & Grow",
    category: {
      id: "cat-3",
      name: "Sleep & Nursery",
      slug: "sleep-nursery",
      image: "https://images.pexels.com/photos/3875085/pexels-photo-3875085.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-1",
        name: "Newborn",
        slug: "newborn",
        ageRange: "0–3 Months"
      },
      {
        id: "age-2",
        name: "Infant",
        slug: "infant",
        ageRange: "3–12 Months"
      }
    ],
    price: 1799,
    mrp: 2499,
    discountPercentage: 28,
    currency: "INR",
    rating: 4.4,
    reviewsCount: 96,
    stock: 20,
    inStock: true,
    thumbnail: "https://images.pexels.com/photos/36276505/pexels-photo-36276505.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/36276505/pexels-photo-36276505.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/4964347/pexels-photo-4964347.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "mobile",
      "cot",
      "nursery decor",
      "felt"
    ],
    specifications: [
      {
        label: "Material",
        value: "Wool felt + beech arm"
      },
      {
        label: "Mount",
        value: "Clamps to most cots"
      },
      {
        label: "Batteries",
        value: "Not required"
      }
    ],
    isFeatured: false
  },
  {
    id: "prod-23",
    title: "Baby Sleeping Bag 2.5 TOG",
    slug: "baby-sleeping-bag-2-5-tog",
    description: "A wearable blanket that keeps baby warm without loose bedding. Two-way zip and shoulder snaps.",
    brand: "Little Nest",
    category: {
      id: "cat-3",
      name: "Sleep & Nursery",
      slug: "sleep-nursery",
      image: "https://images.pexels.com/photos/3875085/pexels-photo-3875085.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-2",
        name: "Infant",
        slug: "infant",
        ageRange: "3–12 Months"
      },
      {
        id: "age-3",
        name: "Toddler",
        slug: "toddler",
        ageRange: "1–3 Years"
      }
    ],
    price: 1899,
    mrp: 2599,
    discountPercentage: 27,
    currency: "INR",
    rating: 4.7,
    reviewsCount: 611,
    stock: 55,
    inStock: true,
    thumbnail: "https://images.pexels.com/photos/4964228/pexels-photo-4964228.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/4964228/pexels-photo-4964228.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/36845894/pexels-photo-36845894.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/19399028/pexels-photo-19399028.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "sleeping bag",
      "sleep sack",
      "safe sleep"
    ],
    specifications: [
      {
        label: "TOG",
        value: "2.5 (room 16–20 °C)"
      },
      {
        label: "Material",
        value: "Organic cotton, recycled fill"
      },
      {
        label: "Sizes",
        value: "6–18 months, 18–36 months"
      }
    ],
    isFeatured: false
  },
  {
    id: "prod-24",
    title: "Elephant Comforter & Lovey",
    slug: "elephant-comforter-lovey",
    description: "A soft elephant comforter with a little blanket body, perfect for helping baby settle to sleep.",
    brand: "Tiny Toes",
    category: {
      id: "cat-3",
      name: "Sleep & Nursery",
      slug: "sleep-nursery",
      image: "https://images.pexels.com/photos/3875085/pexels-photo-3875085.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-1",
        name: "Newborn",
        slug: "newborn",
        ageRange: "0–3 Months"
      },
      {
        id: "age-2",
        name: "Infant",
        slug: "infant",
        ageRange: "3–12 Months"
      }
    ],
    price: 699,
    mrp: 999,
    discountPercentage: 30,
    currency: "INR",
    rating: 4.8,
    reviewsCount: 733,
    stock: 70,
    inStock: true,
    thumbnail: "https://images.pexels.com/photos/4964298/pexels-photo-4964298.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/4964298/pexels-photo-4964298.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/4964220/pexels-photo-4964220.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "lovey",
      "comforter",
      "elephant",
      "soft toy"
    ],
    specifications: [
      {
        label: "Size",
        value: "30 × 30 cm"
      },
      {
        label: "Material",
        value: "Organic cotton plush"
      },
      {
        label: "Safety",
        value: "Embroidered eyes"
      }
    ],
    isFeatured: false
  },
  {
    id: "prod-25",
    title: "Foldable Baby Bathtub",
    slug: "foldable-baby-bathtub",
    description: "A space-saving bathtub that folds flat. Non-slip feet, a drain plug and a supportive newborn sling.",
    brand: "SplashTime",
    category: {
      id: "cat-4",
      name: "Bath & Skincare",
      slug: "bath-skincare",
      image: "https://images.pexels.com/photos/914253/pexels-photo-914253.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-1",
        name: "Newborn",
        slug: "newborn",
        ageRange: "0–3 Months"
      },
      {
        id: "age-2",
        name: "Infant",
        slug: "infant",
        ageRange: "3–12 Months"
      }
    ],
    price: 2299,
    mrp: 2999,
    discountPercentage: 23,
    currency: "INR",
    rating: 4.6,
    reviewsCount: 455,
    stock: 25,
    inStock: true,
    thumbnail: "https://images.pexels.com/photos/914253/pexels-photo-914253.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/914253/pexels-photo-914253.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/6849435/pexels-photo-6849435.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/6849414/pexels-photo-6849414.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "bathtub",
      "foldable",
      "bath"
    ],
    specifications: [
      {
        label: "Material",
        value: "BPA-free PP + TPE"
      },
      {
        label: "Folded",
        value: "8 cm thin"
      },
      {
        label: "Includes",
        value: "Newborn sling"
      }
    ],
    isFeatured: true
  },
  {
    id: "prod-26",
    title: "Digital Bath Thermometer",
    slug: "digital-bath-thermometer",
    description: "Shows the water temperature in seconds and flashes when the bath is too hot or too cold.",
    brand: "SplashTime",
    category: {
      id: "cat-4",
      name: "Bath & Skincare",
      slug: "bath-skincare",
      image: "https://images.pexels.com/photos/914253/pexels-photo-914253.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-1",
        name: "Newborn",
        slug: "newborn",
        ageRange: "0–3 Months"
      },
      {
        id: "age-2",
        name: "Infant",
        slug: "infant",
        ageRange: "3–12 Months"
      }
    ],
    price: 499,
    mrp: 699,
    discountPercentage: 29,
    currency: "INR",
    rating: 4.3,
    reviewsCount: 287,
    stock: 60,
    inStock: true,
    thumbnail: "https://images.pexels.com/photos/6849411/pexels-photo-6849411.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/6849411/pexels-photo-6849411.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "thermometer",
      "bath",
      "safety"
    ],
    specifications: [
      {
        label: "Range",
        value: "0–50 °C"
      },
      {
        label: "Display",
        value: "Digital with warning light"
      },
      {
        label: "Battery",
        value: "Included"
      }
    ],
    isFeatured: false
  },
  {
    id: "prod-27",
    title: "Hooded Bath Towel & Bathrobe Set",
    slug: "hooded-bath-towel-bathrobe-set",
    description: "An ultra-absorbent bamboo-cotton hooded towel and a matching robe for snuggly after-bath cuddles.",
    brand: "Little Nest",
    category: {
      id: "cat-4",
      name: "Bath & Skincare",
      slug: "bath-skincare",
      image: "https://images.pexels.com/photos/914253/pexels-photo-914253.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-2",
        name: "Infant",
        slug: "infant",
        ageRange: "3–12 Months"
      },
      {
        id: "age-3",
        name: "Toddler",
        slug: "toddler",
        ageRange: "1–3 Years"
      },
      {
        id: "age-4",
        name: "Preschool",
        slug: "preschool",
        ageRange: "3–5 Years"
      }
    ],
    price: 1299,
    mrp: 1799,
    discountPercentage: 28,
    currency: "INR",
    rating: 4.7,
    reviewsCount: 342,
    stock: 40,
    inStock: true,
    thumbnail: "https://images.pexels.com/photos/20509000/pexels-photo-20509000.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/20509000/pexels-photo-20509000.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/20509001/pexels-photo-20509001.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "towel",
      "bathrobe",
      "hooded",
      "bamboo"
    ],
    specifications: [
      {
        label: "Material",
        value: "Bamboo-cotton terry"
      },
      {
        label: "Includes",
        value: "Hooded towel + bathrobe"
      },
      {
        label: "Sizes",
        value: "1 – 5 years"
      }
    ],
    isFeatured: false
  },
  {
    id: "prod-28",
    title: "Gentle Baby Lotion 200 ml",
    slug: "gentle-baby-lotion-200-ml",
    description: "A light, fast-absorbing lotion with shea butter and oat. Fragrance-free and dermatologist tested.",
    brand: "PureBub",
    category: {
      id: "cat-4",
      name: "Bath & Skincare",
      slug: "bath-skincare",
      image: "https://images.pexels.com/photos/914253/pexels-photo-914253.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-1",
        name: "Newborn",
        slug: "newborn",
        ageRange: "0–3 Months"
      },
      {
        id: "age-2",
        name: "Infant",
        slug: "infant",
        ageRange: "3–12 Months"
      },
      {
        id: "age-3",
        name: "Toddler",
        slug: "toddler",
        ageRange: "1–3 Years"
      },
      {
        id: "age-4",
        name: "Preschool",
        slug: "preschool",
        ageRange: "3–5 Years"
      }
    ],
    price: 349,
    mrp: 449,
    discountPercentage: 22,
    currency: "INR",
    rating: 4.5,
    reviewsCount: 1876,
    stock: 200,
    inStock: true,
    thumbnail: "https://images.pexels.com/photos/8533228/pexels-photo-8533228.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/8533228/pexels-photo-8533228.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/6847856/pexels-photo-6847856.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/38334623/pexels-photo-38334623.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "lotion",
      "moisturiser",
      "skincare",
      "fragrance free"
    ],
    specifications: [
      {
        label: "Volume",
        value: "200 ml"
      },
      {
        label: "Key ingredients",
        value: "Shea butter, colloidal oat"
      },
      {
        label: "Fragrance free",
        value: "Yes"
      }
    ],
    isFeatured: false
  },
  {
    id: "prod-29",
    title: "Natural Baby Care Gift Basket",
    slug: "natural-baby-care-gift-basket",
    description: "Wash, shampoo, lotion, nappy balm and a muslin cloth in a woven basket. A lovely new-baby gift.",
    brand: "PureBub",
    category: {
      id: "cat-4",
      name: "Bath & Skincare",
      slug: "bath-skincare",
      image: "https://images.pexels.com/photos/914253/pexels-photo-914253.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-1",
        name: "Newborn",
        slug: "newborn",
        ageRange: "0–3 Months"
      },
      {
        id: "age-2",
        name: "Infant",
        slug: "infant",
        ageRange: "3–12 Months"
      }
    ],
    price: 1999,
    mrp: 2799,
    discountPercentage: 29,
    currency: "INR",
    rating: 4.8,
    reviewsCount: 219,
    stock: 18,
    inStock: true,
    thumbnail: "https://images.pexels.com/photos/34718061/pexels-photo-34718061.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/34718061/pexels-photo-34718061.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/34233828/pexels-photo-34233828.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "gift set",
      "skincare",
      "natural",
      "basket"
    ],
    specifications: [
      {
        label: "Includes",
        value: "Wash, shampoo, lotion, balm, muslin cloth"
      },
      {
        label: "Basket",
        value: "Handwoven seagrass"
      }
    ],
    isFeatured: false
  },
  {
    id: "prod-30",
    title: "Tear-Free Baby Shampoo & Wash 300 ml",
    slug: "tear-free-baby-shampoo-wash-300-ml",
    description: "A 2-in-1 hair and body wash with a mild, tear-free formula and a gentle lavender scent.",
    brand: "PureBub",
    category: {
      id: "cat-4",
      name: "Bath & Skincare",
      slug: "bath-skincare",
      image: "https://images.pexels.com/photos/914253/pexels-photo-914253.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-1",
        name: "Newborn",
        slug: "newborn",
        ageRange: "0–3 Months"
      },
      {
        id: "age-2",
        name: "Infant",
        slug: "infant",
        ageRange: "3–12 Months"
      },
      {
        id: "age-3",
        name: "Toddler",
        slug: "toddler",
        ageRange: "1–3 Years"
      },
      {
        id: "age-4",
        name: "Preschool",
        slug: "preschool",
        ageRange: "3–5 Years"
      }
    ],
    price: 399,
    mrp: 499,
    discountPercentage: 20,
    currency: "INR",
    rating: 4.6,
    reviewsCount: 1420,
    stock: 180,
    inStock: true,
    thumbnail: "https://images.pexels.com/photos/24538694/pexels-photo-24538694.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/24538694/pexels-photo-24538694.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/22863908/pexels-photo-22863908.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/8909871/pexels-photo-8909871.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "shampoo",
      "body wash",
      "tear free",
      "bath"
    ],
    specifications: [
      {
        label: "Volume",
        value: "300 ml"
      },
      {
        label: "Formula",
        value: "Tear-free, sulphate-free"
      },
      {
        label: "pH",
        value: "5.5"
      }
    ],
    isFeatured: false
  },
  {
    id: "prod-31",
    title: "Classic Rubber Duck Bath Set (Pack of 3)",
    slug: "classic-rubber-duck-bath-set-pack-of-3",
    description: "Bath time's best friends. Sealed-bottom ducks so no water gets trapped inside.",
    brand: "SplashTime",
    category: {
      id: "cat-4",
      name: "Bath & Skincare",
      slug: "bath-skincare",
      image: "https://images.pexels.com/photos/914253/pexels-photo-914253.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-2",
        name: "Infant",
        slug: "infant",
        ageRange: "3–12 Months"
      },
      {
        id: "age-3",
        name: "Toddler",
        slug: "toddler",
        ageRange: "1–3 Years"
      },
      {
        id: "age-4",
        name: "Preschool",
        slug: "preschool",
        ageRange: "3–5 Years"
      }
    ],
    price: 299,
    mrp: 449,
    discountPercentage: 33,
    currency: "INR",
    rating: 4.7,
    reviewsCount: 958,
    stock: 160,
    inStock: true,
    thumbnail: "https://images.pexels.com/photos/7489743/pexels-photo-7489743.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/7489743/pexels-photo-7489743.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/132464/pexels-photo-132464.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/34691304/pexels-photo-34691304.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "bath toy",
      "rubber duck",
      "floating"
    ],
    specifications: [
      {
        label: "Pack",
        value: "3 ducks"
      },
      {
        label: "Material",
        value: "Natural rubber"
      },
      {
        label: "Mould",
        value: "Sealed, no holes"
      }
    ],
    isFeatured: false
  },
  {
    id: "prod-32",
    title: "Baby Bath Basin with Toys",
    slug: "baby-bath-basin-with-toys",
    description: "A roomy bath basin for sitting babies, with a set of floating bath toys. Currently out of stock.",
    brand: "SplashTime",
    category: {
      id: "cat-4",
      name: "Bath & Skincare",
      slug: "bath-skincare",
      image: "https://images.pexels.com/photos/914253/pexels-photo-914253.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-2",
        name: "Infant",
        slug: "infant",
        ageRange: "3–12 Months"
      },
      {
        id: "age-3",
        name: "Toddler",
        slug: "toddler",
        ageRange: "1–3 Years"
      }
    ],
    price: 1499,
    mrp: 1999,
    discountPercentage: 25,
    currency: "INR",
    rating: 4.2,
    reviewsCount: 133,
    stock: 0,
    inStock: false,
    thumbnail: "https://images.pexels.com/photos/37932052/pexels-photo-37932052.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/37932052/pexels-photo-37932052.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/6735428/pexels-photo-6735428.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/4678303/pexels-photo-4678303.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "bath basin",
      "bath toys",
      "bath"
    ],
    specifications: [
      {
        label: "Material",
        value: "BPA-free PP"
      },
      {
        label: "Includes",
        value: "Basin + 4 floating toys"
      },
      {
        label: "Age",
        value: "6 months +"
      }
    ],
    isFeatured: false
  },
  {
    id: "prod-33",
    title: "Classic Teddy Bear 30 cm",
    slug: "classic-teddy-bear-30-cm",
    description: "A huggable, super-soft teddy with stitched eyes, safe for babies and loved for years.",
    brand: "Tiny Toes",
    category: {
      id: "cat-5",
      name: "Toys & Development",
      slug: "toys-development",
      image: "https://images.pexels.com/photos/6692935/pexels-photo-6692935.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-2",
        name: "Infant",
        slug: "infant",
        ageRange: "3–12 Months"
      },
      {
        id: "age-3",
        name: "Toddler",
        slug: "toddler",
        ageRange: "1–3 Years"
      },
      {
        id: "age-4",
        name: "Preschool",
        slug: "preschool",
        ageRange: "3–5 Years"
      }
    ],
    price: 899,
    mrp: 1199,
    discountPercentage: 25,
    currency: "INR",
    rating: 4.9,
    reviewsCount: 2045,
    stock: 100,
    inStock: true,
    thumbnail: "https://images.pexels.com/photos/2815377/pexels-photo-2815377.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/2815377/pexels-photo-2815377.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/7436118/pexels-photo-7436118.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/33796133/pexels-photo-33796133.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "teddy bear",
      "soft toy",
      "plush"
    ],
    specifications: [
      {
        label: "Height",
        value: "30 cm"
      },
      {
        label: "Material",
        value: "Recycled polyester plush"
      },
      {
        label: "Safety",
        value: "Embroidered eyes, EN71 tested"
      }
    ],
    isFeatured: true
  },
  {
    id: "prod-34",
    title: "Pink Plush Bear Duo",
    slug: "pink-plush-bear-duo",
    description: "Two soft pink bears, one big and one small, for sharing or decorating the nursery.",
    brand: "Tiny Toes",
    category: {
      id: "cat-5",
      name: "Toys & Development",
      slug: "toys-development",
      image: "https://images.pexels.com/photos/6692935/pexels-photo-6692935.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-1",
        name: "Newborn",
        slug: "newborn",
        ageRange: "0–3 Months"
      },
      {
        id: "age-2",
        name: "Infant",
        slug: "infant",
        ageRange: "3–12 Months"
      },
      {
        id: "age-3",
        name: "Toddler",
        slug: "toddler",
        ageRange: "1–3 Years"
      },
      {
        id: "age-4",
        name: "Preschool",
        slug: "preschool",
        ageRange: "3–5 Years"
      }
    ],
    price: 1099,
    mrp: 1499,
    discountPercentage: 27,
    currency: "INR",
    rating: 4.6,
    reviewsCount: 318,
    stock: 45,
    inStock: true,
    thumbnail: "https://images.pexels.com/photos/4887162/pexels-photo-4887162.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/4887162/pexels-photo-4887162.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/4887173/pexels-photo-4887173.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "teddy bear",
      "soft toy",
      "pink",
      "gift"
    ],
    specifications: [
      {
        label: "Sizes",
        value: "25 cm + 15 cm"
      },
      {
        label: "Material",
        value: "Organic cotton plush"
      }
    ],
    isFeatured: false
  },
  {
    id: "prod-35",
    title: "Wooden Building Blocks (40 pcs)",
    slug: "wooden-building-blocks-40-pcs",
    description: "Forty colourful blocks in different shapes to stack, sort and build. Painted with water-based, child-safe paint.",
    brand: "Nest & Grow",
    category: {
      id: "cat-5",
      name: "Toys & Development",
      slug: "toys-development",
      image: "https://images.pexels.com/photos/6692935/pexels-photo-6692935.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-3",
        name: "Toddler",
        slug: "toddler",
        ageRange: "1–3 Years"
      },
      {
        id: "age-4",
        name: "Preschool",
        slug: "preschool",
        ageRange: "3–5 Years"
      }
    ],
    price: 1299,
    mrp: 1799,
    discountPercentage: 28,
    currency: "INR",
    rating: 4.8,
    reviewsCount: 864,
    stock: 65,
    inStock: true,
    thumbnail: "https://images.pexels.com/photos/7269700/pexels-photo-7269700.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/7269700/pexels-photo-7269700.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/3975598/pexels-photo-3975598.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/7269694/pexels-photo-7269694.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "blocks",
      "wooden",
      "building",
      "stem"
    ],
    specifications: [
      {
        label: "Pieces",
        value: "40"
      },
      {
        label: "Material",
        value: "Solid beech wood"
      },
      {
        label: "Paint",
        value: "Water-based, non-toxic"
      },
      {
        label: "Age",
        value: "1 year +"
      }
    ],
    isFeatured: true
  },
  {
    id: "prod-36",
    title: "Wooden Animal Figurines Set",
    slug: "wooden-animal-figurines-set",
    description: "Twelve chunky wooden animals for pretend play, storytelling and learning animal names and sounds.",
    brand: "Nest & Grow",
    category: {
      id: "cat-5",
      name: "Toys & Development",
      slug: "toys-development",
      image: "https://images.pexels.com/photos/6692935/pexels-photo-6692935.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-3",
        name: "Toddler",
        slug: "toddler",
        ageRange: "1–3 Years"
      },
      {
        id: "age-4",
        name: "Preschool",
        slug: "preschool",
        ageRange: "3–5 Years"
      }
    ],
    price: 999,
    mrp: 1399,
    discountPercentage: 29,
    currency: "INR",
    rating: 4.5,
    reviewsCount: 207,
    stock: 40,
    inStock: true,
    thumbnail: "https://images.pexels.com/photos/3663060/pexels-photo-3663060.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/3663060/pexels-photo-3663060.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/3933077/pexels-photo-3933077.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "animals",
      "wooden",
      "pretend play"
    ],
    specifications: [
      {
        label: "Pieces",
        value: "12 animals"
      },
      {
        label: "Material",
        value: "Solid wood"
      },
      {
        label: "Age",
        value: "18 months +"
      }
    ],
    isFeatured: false
  },
  {
    id: "prod-37",
    title: "Rainbow Stacking Rings Tower",
    slug: "rainbow-stacking-rings-tower",
    description: "A classic stacking toy that builds hand-eye coordination and teaches colours and sizes.",
    brand: "Little Nest",
    category: {
      id: "cat-5",
      name: "Toys & Development",
      slug: "toys-development",
      image: "https://images.pexels.com/photos/6692935/pexels-photo-6692935.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-2",
        name: "Infant",
        slug: "infant",
        ageRange: "3–12 Months"
      },
      {
        id: "age-3",
        name: "Toddler",
        slug: "toddler",
        ageRange: "1–3 Years"
      }
    ],
    price: 599,
    mrp: 799,
    discountPercentage: 25,
    currency: "INR",
    rating: 4.7,
    reviewsCount: 745,
    stock: 90,
    inStock: true,
    thumbnail: "https://images.pexels.com/photos/31152754/pexels-photo-31152754.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/31152754/pexels-photo-31152754.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/27661863/pexels-photo-27661863.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "stacking",
      "rings",
      "motor skills",
      "colours"
    ],
    specifications: [
      {
        label: "Rings",
        value: "6"
      },
      {
        label: "Material",
        value: "BPA-free plastic"
      },
      {
        label: "Age",
        value: "6 months +"
      }
    ],
    isFeatured: false
  },
  {
    id: "prod-38",
    title: "Musical Toy Piano",
    slug: "musical-toy-piano",
    description: "A sturdy mini piano with eight real tones and a volume switch so everyone stays happy.",
    brand: "Tiny Toes",
    category: {
      id: "cat-5",
      name: "Toys & Development",
      slug: "toys-development",
      image: "https://images.pexels.com/photos/6692935/pexels-photo-6692935.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-2",
        name: "Infant",
        slug: "infant",
        ageRange: "3–12 Months"
      },
      {
        id: "age-3",
        name: "Toddler",
        slug: "toddler",
        ageRange: "1–3 Years"
      }
    ],
    price: 1499,
    mrp: 1999,
    discountPercentage: 25,
    currency: "INR",
    rating: 4.4,
    reviewsCount: 296,
    stock: 30,
    inStock: true,
    thumbnail: "https://images.pexels.com/photos/16145651/pexels-photo-16145651.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/16145651/pexels-photo-16145651.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/12512698/pexels-photo-12512698.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "piano",
      "music",
      "sensory"
    ],
    specifications: [
      {
        label: "Keys",
        value: "8"
      },
      {
        label: "Volume",
        value: "2 levels"
      },
      {
        label: "Batteries",
        value: "2 × AA (included)"
      },
      {
        label: "Age",
        value: "9 months +"
      }
    ],
    isFeatured: false
  },
  {
    id: "prod-39",
    title: "Wooden Train Set (32 pcs)",
    slug: "wooden-train-set-32-pcs",
    description: "A figure-of-eight wooden railway with a bridge, a magnetic train and little cars.",
    brand: "Nest & Grow",
    category: {
      id: "cat-5",
      name: "Toys & Development",
      slug: "toys-development",
      image: "https://images.pexels.com/photos/6692935/pexels-photo-6692935.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-3",
        name: "Toddler",
        slug: "toddler",
        ageRange: "1–3 Years"
      },
      {
        id: "age-4",
        name: "Preschool",
        slug: "preschool",
        ageRange: "3–5 Years"
      }
    ],
    price: 2499,
    mrp: 3299,
    discountPercentage: 24,
    currency: "INR",
    rating: 4.8,
    reviewsCount: 402,
    stock: 22,
    inStock: true,
    thumbnail: "https://images.pexels.com/photos/15250000/pexels-photo-15250000.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/15250000/pexels-photo-15250000.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/10831693/pexels-photo-10831693.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "train",
      "wooden",
      "track",
      "vehicles"
    ],
    specifications: [
      {
        label: "Pieces",
        value: "32"
      },
      {
        label: "Material",
        value: "Beech wood"
      },
      {
        label: "Connection",
        value: "Magnetic carriages"
      },
      {
        label: "Age",
        value: "3 years +"
      }
    ],
    isFeatured: false
  },
  {
    id: "prod-40",
    title: "Push-Along Toy Cars Set",
    slug: "push-along-toy-cars-set",
    description: "Four chunky push-along cars with soft rubber wheels, sized for little hands.",
    brand: "Tiny Toes",
    category: {
      id: "cat-5",
      name: "Toys & Development",
      slug: "toys-development",
      image: "https://images.pexels.com/photos/6692935/pexels-photo-6692935.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-2",
        name: "Infant",
        slug: "infant",
        ageRange: "3–12 Months"
      },
      {
        id: "age-3",
        name: "Toddler",
        slug: "toddler",
        ageRange: "1–3 Years"
      }
    ],
    price: 799,
    mrp: 1099,
    discountPercentage: 27,
    currency: "INR",
    rating: 4.3,
    reviewsCount: 188,
    stock: 55,
    inStock: true,
    thumbnail: "https://images.pexels.com/photos/4488190/pexels-photo-4488190.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/4488190/pexels-photo-4488190.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/12442773/pexels-photo-12442773.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "cars",
      "vehicles",
      "push along"
    ],
    specifications: [
      {
        label: "Pieces",
        value: "4 cars"
      },
      {
        label: "Material",
        value: "BPA-free plastic"
      },
      {
        label: "Age",
        value: "10 months +"
      }
    ],
    isFeatured: false
  },
  {
    id: "prod-41",
    title: "Wooden Octopus Pull Toy",
    slug: "wooden-octopus-pull-toy",
    description: "A cheerful wooden octopus whose legs wiggle as it rolls. Great motivation for new walkers.",
    brand: "Nest & Grow",
    category: {
      id: "cat-5",
      name: "Toys & Development",
      slug: "toys-development",
      image: "https://images.pexels.com/photos/6692935/pexels-photo-6692935.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    ageGroups: [
      {
        id: "age-3",
        name: "Toddler",
        slug: "toddler",
        ageRange: "1–3 Years"
      },
      {
        id: "age-4",
        name: "Preschool",
        slug: "preschool",
        ageRange: "3–5 Years"
      }
    ],
    price: 699,
    mrp: 949,
    discountPercentage: 26,
    currency: "INR",
    rating: 4.6,
    reviewsCount: 112,
    stock: 35,
    inStock: true,
    thumbnail: "https://images.pexels.com/photos/3662942/pexels-photo-3662942.jpeg?auto=compress&cs=tinysrgb&w=600",
    images: [
      "https://images.pexels.com/photos/3662942/pexels-photo-3662942.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    tags: [
      "pull toy",
      "wooden",
      "octopus",
      "walking"
    ],
    specifications: [
      {
        label: "Material",
        value: "Painted wood + cotton cord"
      },
      {
        label: "Cord length",
        value: "50 cm"
      },
      {
        label: "Age",
        value: "12 months +"
      }
    ],
    isFeatured: false
  }
]

export const featuredProducts = products.filter((product) => product.isFeatured)

export const getProductBySlug = (slug) => products.find((product) => product.slug === slug)
