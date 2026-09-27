"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_THEME = exports.PRESET_THEMES = void 0;
exports.createCustomTheme = createCustomTheme;
exports.PRESET_THEMES = [
    {
        id: 'movies',
        name: 'Blockbuster Cinema',
        category: 'Entertainment',
        description: 'Iconic sci-fi & superhero cinematic masterpieces',
        items: [
            { id: 'interstellar', name: 'Interstellar', icon: '🌌' },
            { id: 'avengers', name: 'Avengers', icon: '🛡️' },
            { id: 'dune', name: 'Dune', icon: '🏜️' },
            { id: 'inception', name: 'Inception', icon: '🌀' }
        ]
    },
    {
        id: 'football',
        name: 'Football Legends',
        category: 'Sports',
        description: 'World-class modern footballing icons',
        items: [
            { id: 'messi', name: 'Lionel Messi', icon: '🐐' },
            { id: 'ronaldo', name: 'Cristiano Ronaldo', icon: '⚡' },
            { id: 'mbappe', name: 'Kylian Mbappé', icon: '🏃' },
            { id: 'haaland', name: 'Erling Haaland', icon: '🤖' }
        ]
    },
    {
        id: 'cricketers',
        name: 'Cricket Giants',
        category: 'Sports',
        description: 'Master batsmen and bowling titans',
        items: [
            { id: 'kohli', name: 'Virat Kohli', icon: '👑' },
            { id: 'dhoni', name: 'MS Dhoni', icon: '🚁' },
            { id: 'rohit', name: 'Rohit Sharma', icon: '💥' },
            { id: 'bumrah', name: 'Jasprit Bumrah', icon: '🎯' }
        ]
    },
    {
        id: 'cities',
        name: 'Global Metropolises',
        category: 'Travel',
        description: 'Major cultural and financial capitals',
        items: [
            { id: 'tokyo', name: 'Tokyo', icon: '🗼' },
            { id: 'paris', name: 'Paris', icon: '🥐' },
            { id: 'newyork', name: 'New York', icon: '🗽' },
            { id: 'london', name: 'London', icon: '💂' }
        ]
    },
    {
        id: 'countries',
        name: 'Nations of the World',
        category: 'Geography',
        description: 'Diverse nations across the globe',
        items: [
            { id: 'japan', name: 'Japan', icon: '🗾' },
            { id: 'brazil', name: 'Brazil', icon: '🌴' },
            { id: 'india', name: 'India', icon: '🐅' },
            { id: 'switzerland', name: 'Switzerland', icon: '🏔️' }
        ]
    },
    {
        id: 'monuments',
        name: 'World Wonders',
        category: 'History',
        description: 'Architectural wonders of human history',
        items: [
            { id: 'tajmahal', name: 'Taj Mahal', icon: '🕌' },
            { id: 'pyramids', name: 'Giza Pyramids', icon: '🏺' },
            { id: 'colosseum', name: 'Colosseum', icon: '🏛️' },
            { id: 'eiffeltower', name: 'Eiffel Tower', icon: '🗼' }
        ]
    },
    {
        id: 'scientists',
        name: 'Scientific Pioneers',
        category: 'Science',
        description: 'Thinkers who changed our universe',
        items: [
            { id: 'einstein', name: 'Albert Einstein', icon: '⚛️' },
            { id: 'newton', name: 'Isaac Newton', icon: '🍎' },
            { id: 'curie', name: 'Marie Curie', icon: '🧪' },
            { id: 'tesla', name: 'Nikola Tesla', icon: '⚡' }
        ]
    },
    {
        id: 'actors',
        name: 'Hollywood Icons',
        category: 'Celebrities',
        description: 'Legendary versatile leading actors',
        items: [
            { id: 'dicaprio', name: 'Leonardo DiCaprio', icon: '🎬' },
            { id: 'bale', name: 'Christian Bale', icon: '🎭' },
            { id: 'pitt', name: 'Brad Pitt', icon: '⭐' },
            { id: 'cruise', name: 'Tom Cruise', icon: '🕶️' }
        ]
    },
    {
        id: 'actresses',
        name: 'Leading Actresses',
        category: 'Celebrities',
        description: 'Critically acclaimed leading ladies',
        items: [
            { id: 'johansson', name: 'Scarlett Johansson', icon: '🕷️' },
            { id: 'stone', name: 'Emma Stone', icon: '💃' },
            { id: 'streep', name: 'Meryl Streep', icon: '🏆' },
            { id: 'lawrence', name: 'Jennifer Lawrence', icon: '🏹' }
        ]
    },
    {
        id: 'companies',
        name: 'Tech Giants',
        category: 'Business',
        description: 'The companies shaping digital society',
        items: [
            { id: 'apple', name: 'Apple', icon: '🍏' },
            { id: 'google', name: 'Google', icon: '🔍' },
            { id: 'microsoft', name: 'Microsoft', icon: '🪟' },
            { id: 'nvidia', name: 'NVIDIA', icon: '🟩' }
        ]
    },
    {
        id: 'animals',
        name: 'Wild Kingdom',
        category: 'Nature',
        description: 'Majestic beasts from land, sea and air',
        items: [
            { id: 'lion', name: 'Royal Lion', icon: '🦁' },
            { id: 'eagle', name: 'Golden Eagle', icon: '🦅' },
            { id: 'tiger', name: 'Bengal Tiger', icon: '🐅' },
            { id: 'whale', name: 'Blue Whale', icon: '🐋' }
        ]
    },
    {
        id: 'foods',
        name: 'Culinary Delights',
        category: 'Lifestyle',
        description: 'Beloved global comfort cuisines',
        items: [
            { id: 'pizza', name: 'Italian Pizza', icon: '🍕' },
            { id: 'sushi', name: 'Tokyo Sushi', icon: '🍣' },
            { id: 'biryani', name: 'Dum Biryani', icon: '🥘' },
            { id: 'burger', name: 'Gourmet Burger', icon: '🍔' }
        ]
    },
    {
        id: 'cars',
        name: 'Supercars',
        category: 'Automotive',
        description: 'High-octane performance engineering',
        items: [
            { id: 'ferrari', name: 'Ferrari', icon: '🏎️' },
            { id: 'lamborghini', name: 'Lamborghini', icon: '🐂' },
            { id: 'porsche', name: 'Porsche 911', icon: '🏁' },
            { id: 'bugatti', name: 'Bugatti', icon: '🚀' }
        ]
    },
    {
        id: 'superheroes',
        name: 'Comic Superheroes',
        category: 'Comics',
        description: 'Defenders of justice across comic universes',
        items: [
            { id: 'batman', name: 'Batman', icon: '🦇' },
            { id: 'spiderman', name: 'Spider-Man', icon: '🕷️' },
            { id: 'superman', name: 'Superman', icon: '🦸' },
            { id: 'ironman', name: 'Iron Man', icon: '🦾' }
        ]
    }
];
exports.DEFAULT_THEME = exports.PRESET_THEMES[0];
function createCustomTheme(name, itemNames) {
    const trimmed = itemNames.map((s) => s.trim()).filter(Boolean);
    if (trimmed.length !== 4) {
        throw new Error('Custom theme requires exactly 4 non-empty items');
    }
    const unique = new Set(trimmed.map((s) => s.toLowerCase()));
    if (unique.size !== 4) {
        throw new Error('All 4 items in a custom theme must be distinct');
    }
    const icons = ['🔷', '🔶', '🟢', '⭐'];
    return {
        id: `custom-${Date.now()}`,
        name: name.trim() || 'Custom Theme',
        category: 'Custom',
        description: 'Custom player-defined theme',
        isCustom: true,
        items: [
            { id: `c-0`, name: trimmed[0], icon: icons[0] },
            { id: `c-1`, name: trimmed[1], icon: icons[1] },
            { id: `c-2`, name: trimmed[2], icon: icons[2] },
            { id: `c-3`, name: trimmed[3], icon: icons[3] }
        ]
    };
}
//# sourceMappingURL=themes.js.map