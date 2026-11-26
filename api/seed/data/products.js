// Little Nest baby store catalogue.
// p(categorySlug, ageGroupSlugs, pexelsPhotoIds, fields) builds one product.
//   - category / ageGroups are slugs here → seed.js turns them into ObjectIds
//   - the first photo id is the thumbnail; all ids become the gallery
const pexels = require("./pexels");

const p = (category, ageGroups, photoIds, fields) => ({
    category,
    ageGroups,
    thumbnail: pexels(photoIds[0], 600),
    images: photoIds.map((id) => pexels(id, 1200)),
    ...fields,
});

const specs = (obj) => Object.entries(obj).map(([label, value]) => ({ label, value }));

const ALL_AGES = ["newborn", "infant", "toddler", "preschool"];

module.exports = [
    // ─── Organic Clothing ────────────────────────────────
    p("organic-clothing", ["newborn", "infant"], [5982301, 3845156, 29015875], {
        title: "Organic Cotton Onesie – Pack of 3 (White)", brand: "Little Nest",
        price: 899, mrp: 1299, rating: 4.7, reviewsCount: 1284, stock: 120, isFeatured: true,
        tags: ["onesie", "bodysuit", "organic cotton", "unisex"],
        description: "Everyday bodysuits made from GOTS-certified organic cotton. Envelope neck for easy dressing, nickel-free snap buttons and flat seams that are kind to delicate skin.",
        specifications: specs({ Material: "100% organic cotton", Pack: "3 bodysuits", Closure: "Snap buttons", Care: "Machine wash cold" }),
    }),
    p("organic-clothing", ["newborn", "infant"], [6849436, 3875233], {
        title: "Checkered Zip Sleepsuit", brand: "Cotton Cub",
        price: 749, mrp: 999, rating: 4.5, reviewsCount: 642, stock: 80,
        tags: ["sleepsuit", "romper", "zip", "unisex"],
        description: "A full-length sleepsuit with a two-way zip for quick night-time changes. Fold-over mitten cuffs stop little scratches.",
        specifications: specs({ Material: "Organic cotton jersey", Closure: "Two-way zip", Feet: "Footed" }),
    }),
    p("organic-clothing", ["newborn"], [3875082, 7484842, 7055886], {
        title: "Newborn Essentials Gift Set (Bodysuits & Bibs)", brand: "Little Nest",
        price: 1599, mrp: 2199, rating: 4.8, reviewsCount: 517, stock: 45, isFeatured: true,
        tags: ["gift set", "newborn", "bib", "bodysuit"],
        description: "The perfect baby shower gift: two bodysuits, two bibs and a cap in soft organic cotton, packed in a reusable keepsake box.",
        specifications: specs({ Includes: "2 bodysuits, 2 bibs, 1 cap", Material: "Organic cotton", Size: "0–3 months" }),
    }),
    p("organic-clothing", ["newborn", "infant"], [39462003, 17773456], {
        title: "Hand-Knit Wool Booties (Cream)", brand: "Woolly Wonders",
        price: 549, mrp: 799, rating: 4.6, reviewsCount: 389, stock: 60,
        tags: ["booties", "knit", "wool", "winter"],
        description: "Hand-knitted merino booties with a ribbon tie that keeps them on wriggly feet. Warm, breathable and soft.",
        specifications: specs({ Material: "Merino wool", Sizes: "0–6 months, 6–12 months", Care: "Hand wash" }),
    }),
    p("organic-clothing", ["infant"], [32890761, 36848834], {
        title: "Knitted Bear-Ear Romper", brand: "Woolly Wonders",
        price: 1299, mrp: 1799, rating: 4.7, reviewsCount: 274, stock: 35,
        tags: ["romper", "knit", "winter", "bear"],
        description: "A cosy knitted romper with an adorable bear-ear hood. Snap opening at the legs for easy nappy changes.",
        specifications: specs({ Material: "Cotton-wool blend knit", Closure: "Leg snaps", Season: "Autumn / Winter" }),
    }),
    p("organic-clothing", ["infant", "toddler"], [35335057, 26219975], {
        title: "Cosy Knit Sweater", brand: "Cotton Cub",
        price: 999, mrp: 1399, rating: 4.4, reviewsCount: 198, stock: 50,
        tags: ["sweater", "knit", "winter"],
        description: "A classic chunky-knit sweater with shoulder buttons so it slips easily over little heads.",
        specifications: specs({ Material: "Organic cotton knit", Neck: "Shoulder button opening", Sizes: "6 months – 3 years" }),
    }),
    p("organic-clothing", ["infant", "toddler"], [28259749, 34121887], {
        title: "Animal Print Jumpsuit", brand: "Tiny Toes",
        price: 849, mrp: 1199, rating: 4.3, reviewsCount: 156, stock: 0,
        tags: ["jumpsuit", "animal print", "playwear"],
        description: "A playful all-in-one with a friendly animal print, roomy fit for crawling and stretchy cuffs. Currently out of stock.",
        specifications: specs({ Material: "Cotton jersey", Fit: "Relaxed", Sizes: "6 months – 2 years" }),
    }),
    p("organic-clothing", ["toddler", "preschool"], [18862066, 39877366], {
        title: "Toddler Denim Jacket & Skirt Set", brand: "Tiny Toes",
        price: 1499, mrp: 2199, rating: 4.5, reviewsCount: 121, stock: 25,
        tags: ["denim", "jacket", "skirt", "girls"],
        description: "A soft-washed denim jacket with a matching twirl skirt. Elastic waist for comfort and easy dressing.",
        specifications: specs({ Material: "Soft cotton denim", Includes: "Jacket + skirt", Sizes: "2 – 5 years" }),
    }),

    // ─── Feeding Essentials ──────────────────────────────
    p("feeding-essentials", ["newborn", "infant"], [374756, 8430572, 7282619], {
        title: "Anti-Colic Feeding Bottle 260 ml", brand: "Little Nest",
        price: 499, mrp: 699, rating: 4.6, reviewsCount: 2310, stock: 150, isFeatured: true,
        tags: ["bottle", "anti-colic", "bpa free", "milk"],
        description: "A vented anti-colic bottle that reduces air intake and tummy troubles. Wide neck for easy filling and cleaning.",
        specifications: specs({ Capacity: "260 ml", Material: "BPA-free PP", Teat: "Slow flow silicone", Dishwasher: "Top rack safe" }),
    }),
    p("feeding-essentials", ["newborn"], [6849544, 7282318, 33508363], {
        title: "Wide-Neck Glass Feeding Bottle 150 ml", brand: "PureSip",
        price: 649, mrp: 899, rating: 4.5, reviewsCount: 864, stock: 70,
        tags: ["bottle", "glass", "newborn", "milk"],
        description: "Borosilicate glass bottle with a protective silicone sleeve. Plastic-free, odour-free and safe to sterilise.",
        specifications: specs({ Capacity: "150 ml", Material: "Borosilicate glass + silicone sleeve", Teat: "Newborn flow" }),
    }),
    p("feeding-essentials", ["newborn", "infant"], [11501481], {
        title: "Formula Dispenser & Measuring Scoop Set", brand: "PureSip",
        price: 349, mrp: 499, rating: 4.2, reviewsCount: 412, stock: 90,
        tags: ["formula", "dispenser", "travel"],
        description: "Three stackable compartments for pre-measured formula on the go, with a levelling scoop for accurate feeds.",
        specifications: specs({ Compartments: "3", Material: "BPA-free PP", Includes: "Levelling scoop" }),
    }),
    p("feeding-essentials", ["infant", "toddler"], [3716516, 7946746, 7491116], {
        title: "Convertible Wooden High Chair", brand: "Nest & Grow",
        price: 7999, mrp: 10999, rating: 4.8, reviewsCount: 286, stock: 12, isFeatured: true,
        tags: ["high chair", "wooden", "convertible", "weaning"],
        description: "A beech-wood high chair that grows from baby to big kid. Removable tray, 5-point harness and adjustable footrest.",
        specifications: specs({ Material: "Solid beech wood", Harness: "5-point", Age: "6 months – 5 years", "Max load": "25 kg" }),
    }),
    p("feeding-essentials", ["infant", "toddler"], [4409245, 4409276, 7946745], {
        title: "Silicone Weaning Spoon Set (Pack of 4)", brand: "Little Nest",
        price: 399, mrp: 549, rating: 4.6, reviewsCount: 978, stock: 140,
        tags: ["spoon", "weaning", "silicone", "first foods"],
        description: "Soft-tip silicone spoons that are gentle on gums, with short handles that are easy for little hands to hold.",
        specifications: specs({ Pack: "4 spoons", Material: "Food-grade silicone", Dishwasher: "Safe" }),
    }),
    p("feeding-essentials", ["infant", "toddler"], [7491105, 5083238], {
        title: "Suction Bowl & Plate Set", brand: "Nest & Grow",
        price: 699, mrp: 999, rating: 4.4, reviewsCount: 503, stock: 75,
        tags: ["bowl", "plate", "suction", "weaning"],
        description: "Strong suction bases keep bowls and plates on the table, not the floor. Microwave and dishwasher safe.",
        specifications: specs({ Includes: "1 bowl, 1 divided plate", Material: "Food-grade silicone", Microwave: "Safe" }),
    }),
    p("feeding-essentials", ["infant", "toddler"], [11787679, 26337070, 33094010], {
        title: "Waterproof Feeding Bibs (Pack of 3)", brand: "Tiny Toes",
        price: 449, mrp: 649, rating: 4.3, reviewsCount: 667, stock: 0,
        tags: ["bib", "waterproof", "mess-free"],
        description: "Wipe-clean bibs with a deep crumb catcher pocket for messy weaning adventures. Currently out of stock.",
        specifications: specs({ Pack: "3 bibs", Material: "Waterproof PEVA", Closure: "Adjustable snaps" }),
    }),
    p("feeding-essentials", ["toddler", "preschool"], [17781076, 9305088], {
        title: "Toddler Snack Cup & Fruit Bowl", brand: "PureSip",
        price: 399, mrp: 599, rating: 4.4, reviewsCount: 341, stock: 95,
        tags: ["snack cup", "bowl", "toddler", "spill-proof"],
        description: "A spill-resistant snack cup and a lightweight fruit bowl for independent snacking at home or on the go.",
        specifications: specs({ Includes: "Snack cup + bowl", Material: "BPA-free PP", Lid: "Soft flap lid" }),
    }),

    // ─── Sleep & Nursery ─────────────────────────────────
    p("sleep-nursery", ["newborn", "infant", "toddler"], [3875085, 7937988, 37185810], {
        title: "Classic White Wooden Crib", brand: "Nest & Grow",
        price: 14999, mrp: 19999, rating: 4.8, reviewsCount: 214, stock: 8, isFeatured: true,
        tags: ["crib", "cot", "wooden", "nursery"],
        description: "A timeless solid-wood crib with three mattress heights and smooth rounded edges. Converts to a toddler bed.",
        specifications: specs({ Material: "Solid pine, non-toxic paint", "Mattress size": "120 × 60 cm", "Mattress heights": "3", Converts: "Toddler bed" }),
    }),
    p("sleep-nursery", ["newborn", "infant", "toddler"], [11116578, 4964347], {
        title: "Natural Wood Crib with Soft Toy Set", brand: "Nest & Grow",
        price: 12999, mrp: 16999, rating: 4.6, reviewsCount: 132, stock: 6,
        tags: ["crib", "cot", "natural wood", "soft toys"],
        description: "A natural-finish wooden crib bundled with three soft nursery toys. Breathable slatted sides for airflow.",
        specifications: specs({ Material: "Natural beech wood", "Mattress size": "120 × 60 cm", Includes: "3 soft toys" }),
    }),
    p("sleep-nursery", ["newborn", "infant"], [4886923, 12603180], {
        title: "Pastel Crib Bedding Set (Pink)", brand: "Little Nest",
        price: 2499, mrp: 3299, rating: 4.5, reviewsCount: 188, stock: 30,
        tags: ["bedding", "crib sheet", "pink", "nursery"],
        description: "Fitted sheet, quilt and pillowcase in breathable organic cotton, in a soft blush pink.",
        specifications: specs({ Includes: "Fitted sheet, quilt, pillowcase", Material: "Organic cotton percale", Fits: "120 × 60 cm crib" }),
    }),
    p("sleep-nursery", ["newborn"], [4964233, 14476030, 971435], {
        title: "Muslin Swaddle Blankets (Pack of 3)", brand: "Little Nest",
        price: 1199, mrp: 1599, rating: 4.9, reviewsCount: 1532, stock: 85, isFeatured: true,
        tags: ["swaddle", "muslin", "blanket", "newborn"],
        description: "Large, airy muslin swaddles that get softer with every wash. Also great as a nursing cover or play mat.",
        specifications: specs({ Pack: "3 swaddles", Size: "120 × 120 cm", Material: "Organic cotton muslin" }),
    }),
    p("sleep-nursery", ALL_AGES, [4886918, 4887115, 4886896], {
        title: "Soft Knit Throw Blanket", brand: "Woolly Wonders",
        price: 1499, mrp: 1999, rating: 4.6, reviewsCount: 402, stock: 40,
        tags: ["blanket", "knit", "nursery", "throw"],
        description: "A chunky cable-knit blanket for the pram, the crib or snuggling on the sofa.",
        specifications: specs({ Size: "100 × 80 cm", Material: "Cotton knit", Care: "Machine wash gentle" }),
    }),
    p("sleep-nursery", ["newborn", "infant"], [36276505, 4964347], {
        title: "Woodland Cot Mobile", brand: "Nest & Grow",
        price: 1799, mrp: 2499, rating: 4.4, reviewsCount: 96, stock: 20,
        tags: ["mobile", "cot", "nursery decor", "felt"],
        description: "Hand-made felt woodland animals that turn gently above the cot to calm and entertain.",
        specifications: specs({ Material: "Wool felt + beech arm", Mount: "Clamps to most cots", Batteries: "Not required" }),
    }),
    p("sleep-nursery", ["infant", "toddler"], [4964228, 36845894, 19399028], {
        title: "Baby Sleeping Bag 2.5 TOG", brand: "Little Nest",
        price: 1899, mrp: 2599, rating: 4.7, reviewsCount: 611, stock: 55,
        tags: ["sleeping bag", "sleep sack", "safe sleep"],
        description: "A wearable blanket that keeps baby warm without loose bedding. Two-way zip and shoulder snaps.",
        specifications: specs({ TOG: "2.5 (room 16–20 °C)", Material: "Organic cotton, recycled fill", Sizes: "6–18 months, 18–36 months" }),
    }),
    p("sleep-nursery", ["newborn", "infant"], [4964298, 4964220], {
        title: "Elephant Comforter & Lovey", brand: "Tiny Toes",
        price: 699, mrp: 999, rating: 4.8, reviewsCount: 733, stock: 70,
        tags: ["lovey", "comforter", "elephant", "soft toy"],
        description: "A soft elephant comforter with a little blanket body, perfect for helping baby settle to sleep.",
        specifications: specs({ Size: "30 × 30 cm", Material: "Organic cotton plush", Safety: "Embroidered eyes" }),
    }),

    // ─── Bath & Skincare ─────────────────────────────────
    p("bath-skincare", ["newborn", "infant"], [914253, 6849435, 6849414], {
        title: "Foldable Baby Bathtub", brand: "SplashTime",
        price: 2299, mrp: 2999, rating: 4.6, reviewsCount: 455, stock: 25, isFeatured: true,
        tags: ["bathtub", "foldable", "bath"],
        description: "A space-saving bathtub that folds flat. Non-slip feet, a drain plug and a supportive newborn sling.",
        specifications: specs({ Material: "BPA-free PP + TPE", Folded: "8 cm thin", Includes: "Newborn sling" }),
    }),
    p("bath-skincare", ["newborn", "infant"], [6849411], {
        title: "Digital Bath Thermometer", brand: "SplashTime",
        price: 499, mrp: 699, rating: 4.3, reviewsCount: 287, stock: 60,
        tags: ["thermometer", "bath", "safety"],
        description: "Shows the water temperature in seconds and flashes when the bath is too hot or too cold.",
        specifications: specs({ Range: "0–50 °C", Display: "Digital with warning light", Battery: "Included" }),
    }),
    p("bath-skincare", ["infant", "toddler", "preschool"], [20509000, 20509001], {
        title: "Hooded Bath Towel & Bathrobe Set", brand: "Little Nest",
        price: 1299, mrp: 1799, rating: 4.7, reviewsCount: 342, stock: 40,
        tags: ["towel", "bathrobe", "hooded", "bamboo"],
        description: "An ultra-absorbent bamboo-cotton hooded towel and a matching robe for snuggly after-bath cuddles.",
        specifications: specs({ Material: "Bamboo-cotton terry", Includes: "Hooded towel + bathrobe", Sizes: "1 – 5 years" }),
    }),
    p("bath-skincare", ALL_AGES, [8533228, 6847856, 38334623], {
        title: "Gentle Baby Lotion 200 ml", brand: "PureBub",
        price: 349, mrp: 449, rating: 4.5, reviewsCount: 1876, stock: 200,
        tags: ["lotion", "moisturiser", "skincare", "fragrance free"],
        description: "A light, fast-absorbing lotion with shea butter and oat. Fragrance-free and dermatologist tested.",
        specifications: specs({ Volume: "200 ml", "Key ingredients": "Shea butter, colloidal oat", "Fragrance free": "Yes" }),
    }),
    p("bath-skincare", ["newborn", "infant"], [34718061, 34233828], {
        title: "Natural Baby Care Gift Basket", brand: "PureBub",
        price: 1999, mrp: 2799, rating: 4.8, reviewsCount: 219, stock: 18,
        tags: ["gift set", "skincare", "natural", "basket"],
        description: "Wash, shampoo, lotion, nappy balm and a muslin cloth in a woven basket. A lovely new-baby gift.",
        specifications: specs({ Includes: "Wash, shampoo, lotion, balm, muslin cloth", Basket: "Handwoven seagrass" }),
    }),
    p("bath-skincare", ALL_AGES, [24538694, 22863908, 8909871], {
        title: "Tear-Free Baby Shampoo & Wash 300 ml", brand: "PureBub",
        price: 399, mrp: 499, rating: 4.6, reviewsCount: 1420, stock: 180,
        tags: ["shampoo", "body wash", "tear free", "bath"],
        description: "A 2-in-1 hair and body wash with a mild, tear-free formula and a gentle lavender scent.",
        specifications: specs({ Volume: "300 ml", Formula: "Tear-free, sulphate-free", pH: "5.5" }),
    }),
    p("bath-skincare", ["infant", "toddler", "preschool"], [7489743, 132464, 34691304], {
        title: "Classic Rubber Duck Bath Set (Pack of 3)", brand: "SplashTime",
        price: 299, mrp: 449, rating: 4.7, reviewsCount: 958, stock: 160,
        tags: ["bath toy", "rubber duck", "floating"],
        description: "Bath time's best friends. Sealed-bottom ducks so no water gets trapped inside.",
        specifications: specs({ Pack: "3 ducks", Material: "Natural rubber", Mould: "Sealed, no holes" }),
    }),
    p("bath-skincare", ["infant", "toddler"], [37932052, 6735428, 4678303], {
        title: "Baby Bath Basin with Toys", brand: "SplashTime",
        price: 1499, mrp: 1999, rating: 4.2, reviewsCount: 133, stock: 0,
        tags: ["bath basin", "bath toys", "bath"],
        description: "A roomy bath basin for sitting babies, with a set of floating bath toys. Currently out of stock.",
        specifications: specs({ Material: "BPA-free PP", Includes: "Basin + 4 floating toys", Age: "6 months +" }),
    }),

    // ─── Toys & Development ──────────────────────────────
    p("toys-development", ["infant", "toddler", "preschool"], [2815377, 7436118, 33796133], {
        title: "Classic Teddy Bear 30 cm", brand: "Tiny Toes",
        price: 899, mrp: 1199, rating: 4.9, reviewsCount: 2045, stock: 100, isFeatured: true,
        tags: ["teddy bear", "soft toy", "plush"],
        description: "A huggable, super-soft teddy with stitched eyes, safe for babies and loved for years.",
        specifications: specs({ Height: "30 cm", Material: "Recycled polyester plush", Safety: "Embroidered eyes, EN71 tested" }),
    }),
    p("toys-development", ALL_AGES, [4887162, 4887173], {
        title: "Pink Plush Bear Duo", brand: "Tiny Toes",
        price: 1099, mrp: 1499, rating: 4.6, reviewsCount: 318, stock: 45,
        tags: ["teddy bear", "soft toy", "pink", "gift"],
        description: "Two soft pink bears, one big and one small, for sharing or decorating the nursery.",
        specifications: specs({ Sizes: "25 cm + 15 cm", Material: "Organic cotton plush" }),
    }),
    p("toys-development", ["toddler", "preschool"], [7269700, 3975598, 7269694], {
        title: "Wooden Building Blocks (40 pcs)", brand: "Nest & Grow",
        price: 1299, mrp: 1799, rating: 4.8, reviewsCount: 864, stock: 65, isFeatured: true,
        tags: ["blocks", "wooden", "building", "stem"],
        description: "Forty colourful blocks in different shapes to stack, sort and build. Painted with water-based, child-safe paint.",
        specifications: specs({ Pieces: "40", Material: "Solid beech wood", Paint: "Water-based, non-toxic", Age: "1 year +" }),
    }),
    p("toys-development", ["toddler", "preschool"], [3663060, 3933077], {
        title: "Wooden Animal Figurines Set", brand: "Nest & Grow",
        price: 999, mrp: 1399, rating: 4.5, reviewsCount: 207, stock: 40,
        tags: ["animals", "wooden", "pretend play"],
        description: "Twelve chunky wooden animals for pretend play, storytelling and learning animal names and sounds.",
        specifications: specs({ Pieces: "12 animals", Material: "Solid wood", Age: "18 months +" }),
    }),
    p("toys-development", ["infant", "toddler"], [31152754, 27661863], {
        title: "Rainbow Stacking Rings Tower", brand: "Little Nest",
        price: 599, mrp: 799, rating: 4.7, reviewsCount: 745, stock: 90,
        tags: ["stacking", "rings", "motor skills", "colours"],
        description: "A classic stacking toy that builds hand-eye coordination and teaches colours and sizes.",
        specifications: specs({ Rings: "6", Material: "BPA-free plastic", Age: "6 months +" }),
    }),
    p("toys-development", ["infant", "toddler"], [16145651, 12512698], {
        title: "Musical Toy Piano", brand: "Tiny Toes",
        price: 1499, mrp: 1999, rating: 4.4, reviewsCount: 296, stock: 30,
        tags: ["piano", "music", "sensory"],
        description: "A sturdy mini piano with eight real tones and a volume switch so everyone stays happy.",
        specifications: specs({ Keys: "8", Volume: "2 levels", Batteries: "2 × AA (included)", Age: "9 months +" }),
    }),
    p("toys-development", ["toddler", "preschool"], [15250000, 10831693], {
        title: "Wooden Train Set (32 pcs)", brand: "Nest & Grow",
        price: 2499, mrp: 3299, rating: 4.8, reviewsCount: 402, stock: 22,
        tags: ["train", "wooden", "track", "vehicles"],
        description: "A figure-of-eight wooden railway with a bridge, a magnetic train and little cars.",
        specifications: specs({ Pieces: "32", Material: "Beech wood", Connection: "Magnetic carriages", Age: "3 years +" }),
    }),
    p("toys-development", ["infant", "toddler"], [4488190, 12442773], {
        title: "Push-Along Toy Cars Set", brand: "Tiny Toes",
        price: 799, mrp: 1099, rating: 4.3, reviewsCount: 188, stock: 55,
        tags: ["cars", "vehicles", "push along"],
        description: "Four chunky push-along cars with soft rubber wheels, sized for little hands.",
        specifications: specs({ Pieces: "4 cars", Material: "BPA-free plastic", Age: "10 months +" }),
    }),
    p("toys-development", ["toddler", "preschool"], [3662942], {
        title: "Wooden Octopus Pull Toy", brand: "Nest & Grow",
        price: 699, mrp: 949, rating: 4.6, reviewsCount: 112, stock: 35,
        tags: ["pull toy", "wooden", "octopus", "walking"],
        description: "A cheerful wooden octopus whose legs wiggle as it rolls. Great motivation for new walkers.",
        specifications: specs({ Material: "Painted wood + cotton cord", "Cord length": "50 cm", Age: "12 months +" }),
    }),
];
