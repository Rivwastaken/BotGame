# BotGame

A web-based idle game where you run a bot to gather resources, train skills, and manage an inventory — inspired by old-school botting in games like RuneScape.

## Features

- 📜 **Automated Botting System** – Select a skill and let your bot handle the grind  
- 🪓 **Skill Training** – Woodcutting, Mining, and more with XP and leveling systems  
- 🎒 **Inventory System** – Track items gathered per run  
- 🧠 **Status Panel** – Classic Glider-style interface showing bot phases and logs  
- 🛒 **Shop System** – Spend in-game currency (shards) on bot upgrades and materials  
- 🔧 **Modular Design** – Easily extendable skill system and UI components  

## Tech Stack

- ⚛️ React (https://react.dev/) (Frontend UI)  
- 🧠 Context API for global state management  
- 🪄 Tailwind CSS for styling  

## Getting Started

1. **Clone the repository**

   git clone https://github.com/Rivwastaken/BotGame.git  
   cd BotGame

2. **Install dependencies**

   npm install

3. **Start the development server**

   npm run dev

4. Open http://localhost:5173 in your browser

## Folder Structure

BotGame/
├── public/             # Static assets
├── src/
│   ├── components/     # UI components (BotPanel, Inventory, XP Bars, etc.)
│   ├── data/           # Static data (skills, shop items)
│   ├── context/        # Global state and context providers
│   ├── hooks/          # Custom React hooks
│   └── App.jsx         # Root component
└── index.html

## Current Skills

- Woodcutting
- Mining
- (More to come: Fishing, Combat, etc.)

## Bot Addons (via Shop)

- 🔁 Multi-Gather Mode
- 🔥 XP Boost (2 hrs)
- 🎯 Double Drop Rate
- 🧭 Resource Finder

## Roadmap

- ✅ Inventory and bot-run summaries  
- ✅ Skill XP bars with levels  
- ✅ Shards currency system  
- 🔜 Combat system with loot drops  
- 🔜 Skill-based modifiers (e.g., faster XP for familiar skills)  
- 🔜 Settings tab with bot customization  
- 🔜 Save/load support (localStorage or backend)  

## License

MIT License  
© 2025 Riv (https://github.com/Rivwastaken)
