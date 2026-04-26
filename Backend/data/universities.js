// data/universities.js
const universities = [
    {
        name: "Imperial College London",
        country: "United Kingdom",
        tags: ["STEM", "Russell Group", "Urban Campus"],
        imageUrl: "https://example.com/imperial.jpg",
        requirements: {
            minIelts: 7.0,
            minGre: 314
        }
    },
    {
        name: "Stanford University",
        country: "United States",
        tags: ["STEM", "Ivy Plus", "Research"],
        imageUrl: "https://example.com/stanford.jpg",
        requirements: {
            minIelts: 7.5,
            minGre: 328
        }
    },
    {
        name: "University of Toronto",
        country: "Canada",
        tags: ["Research", "Public", "High ROI"],
        imageUrl: "https://example.com/toronto.jpg",
        requirements: {
            minIelts: 6.5,
            minGre: 305
        }
    }
];

module.exports = universities;