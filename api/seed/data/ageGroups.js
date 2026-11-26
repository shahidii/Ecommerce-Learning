const pexels = require("./pexels");

module.exports = [
    { name: "Newborn", slug: "newborn", ageRange: "0–3 Months", minMonths: 0, maxMonths: 3, sortOrder: 1, description: "Soft, gentle essentials for the very first weeks.", image: pexels(36845894, 800) },
    { name: "Infant", slug: "infant", ageRange: "3–12 Months", minMonths: 3, maxMonths: 12, sortOrder: 2, description: "Feeding, play and comfort for a fast-growing baby.", image: pexels(8772505, 800) },
    { name: "Toddler", slug: "toddler", ageRange: "1–3 Years", minMonths: 12, maxMonths: 36, sortOrder: 3, description: "Sturdy clothes and busy toys for little explorers.", image: pexels(34325483, 800) },
    { name: "Preschool", slug: "preschool", ageRange: "3–5 Years", minMonths: 36, maxMonths: 60, sortOrder: 4, description: "Creative play and everyday wear for big kids.", image: pexels(7269700, 800) },
];
