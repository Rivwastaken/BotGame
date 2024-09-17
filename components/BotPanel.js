import React, { useState, useEffect, useRef } from 'react';
import Logs from './Logs';
import { gatherXpAndLevelUp } from './XpSystem';  // Import XP system logic

function BotPanel({ setInventory, inventory, shards, setShards }) {
  const [isAttached, setIsAttached] = useState(false);
  const [hp, setHp] = useState(100);
  const [targetHp, setTargetHp] = useState(50);
  const [mana, setMana] = useState(80);
  const [kills, setKills] = useState(0);
  const [xpPerHour, setXpPerHour] = useState(0);
  const [isGathering, setIsGathering] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [logs, setLogs] = useState([]);
  const [resourcesGathered, setResourcesGathered] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [canStopBot, setCanStopBot] = useState(false);
  const [activeTab, setActiveTab] = useState('control');

  const gatherResourceRef = useRef(null);

  // UseRef to persist values across renders
  const xpRef = useRef(0);
  const levelRef = useRef(1);
  const requiredXpRef = useRef(10); // Initial XP for level 1

  const skills = [
    'Woodcutting', 'Mining', 'Fishing', 'Hunter', 'Farming',
    'Smithing', 'Fletching', 'Crafting', 'Cooking', 'Herblore',
    'Attack', 'Strength', 'Defense', 'Ranged', 'Magic',
    'Prayer', 'Runecrafting', 'Agility', 'Thieving', 'Construction'
  ];

  const inventoryItems = {
    'Woodcutting': 'Wood',
    'Mining': 'Ore',
    'Fishing': 'Fish',
    'Hunter': 'Animal',
    'Farming': 'Crop',
    'Smithing': 'Weapon',
    'Fletching': 'Arrow',
    'Crafting': 'Jewelry',
    'Cooking': 'Food',
    'Herblore': 'Potion',
    'Attack': 'Sword',
    'Strength': 'Shield',
    'Defense': 'Armor',
    'Ranged': 'Bow',
    'Magic': 'Rune',
    'Prayer': 'PrayerScroll',
    'Runecrafting': 'Runestone',
    'Agility': 'AgilityToken',
    'Thieving': 'StolenGoods',
    'Construction': 'Plank'
  };

  useEffect(() => {
    if (isGathering) {
      bootUpBot();
    } else if (startTime !== null) {
      stopGatheringProcess();
    }
  }, [isGathering]);

  const bootUpBot = () => {
    const bootSequence = [
      'Injecting bot.exe into game process...',
      'Reading config.ini...',
      'Validating game memory access...',
      'Reading character attributes...',
      'Setting up bot environment variables...',
      'Applying anti-detection mechanisms...',
      'Finalizing bot injection...',
      'Attaching to game...'
    ];

    bootSequence.forEach((line, index) => {
      setTimeout(() => {
        setLogs((prevLogs) => [...prevLogs, line]);
        if (line === 'Attaching to game...') {
          setTimeout(() => {
            setLogs((prevLogs) => [...prevLogs, 'Bot attached successfully...']);
            setIsAttached(true);

            setTimeout(() => {
              setLogs((prevLogs) => [...prevLogs, `Bot is now gathering ${selectedSkill}...`]);
              setCanStopBot(true);
              startGatheringProcess();
            }, 1000);
          }, 1000);
        }
      }, (index + 1) * 1000);
    });
  };

  const startGatheringProcess = () => {
    setStartTime(Date.now());
    setResourcesGathered(0);
    gatherResourceRef.current = setInterval(() => {
      gatherResource();
    }, 3000);
  };

  const stopGatheringProcess = () => {
    if (gatherResourceRef.current) {
      clearInterval(gatherResourceRef.current);
    }

    const runTime = (Date.now() - startTime) / 1000;

    setLogs((prevLogs) => [
      ...prevLogs,
      'Unloading resources...',
      'Detaching from game...'
    ]);

    setTimeout(() => {
      setLogs((prevLogs) => [
        ...prevLogs,
        'Bot detached successfully...',
        `Session Summary: Gathered ${resourcesGathered} ${inventoryItems[selectedSkill]}(s) in ${runTime.toFixed(2)} seconds.`
      ]);
      setIsAttached(false);
      setCanStopBot(false);
      setStartTime(null);
      setSelectedSkill(null);
    }, 2000);
  };

  const gatherResource = () => {
    const item = inventoryItems[selectedSkill]; // Get the resource item based on the selected skill

    setInventory((prevInventory) => ({
      ...prevInventory,
      [item]: (prevInventory[item] || 0) + 1, // Increment the gathered resource for the selected skill
    }));
    setResourcesGathered((prev) => prev + 1);

    // Capture XP before adjustments
    const xpBeforeLevelUp = xpRef.current;
    
    // Call XP system to handle XP gain and leveling up
    const { newXp, newLevel, newRequiredXp, leveledUp } = gatherXpAndLevelUp(
      xpRef.current, 
      levelRef.current, 
      selectedSkill, 
      setLogs
    );

    // Calculate the total XP gained **before** adjusting for any level-up
    const xpGained = newXp - xpBeforeLevelUp;

    // Print XP gained before level-up adjustment
    if (xpGained > 0) {
      setLogs((prevLogs) => [
        ...prevLogs,
        `Gathered 1 ${item}. XP: +${xpGained.toFixed(2)}`
      ]);
    }

    // Update XP, level, and required XP after logging XP gained
    xpRef.current = newXp;
    levelRef.current = newLevel;
    requiredXpRef.current = newRequiredXp;

    // Log level-up action after adjustments, if applicable
    if (leveledUp) {
      setLogs((prevLogs) => [
        ...prevLogs,
        `Level Up! You are now level ${newLevel}. Required XP: ${newRequiredXp}`
      ]);
    }

    // Shard reward logic
    const randomShardAmount = Math.random() < 0.01 ? Math.floor(Math.random() * 12) + 4 : Math.floor(Math.random() * 2) + 1;
    setShards((prevShards) => prevShards + randomShardAmount);
  };

  const toggleGathering = () => {
    if (!isGathering && selectedSkill) {
      setIsGathering(true);
    } else {
      if (canStopBot) {
        setIsGathering(false);
      }
    }
  };

  const handleSkillSelect = (skill) => {
    if (selectedSkill === skill) {
      setSelectedSkill(null); // Deselect the skill
    } else {
      setSelectedSkill(skill); // Select a new skill
    }
  };

  const handlePurchase = (item) => {
    const itemPrices = {
      'Wood': 10, 'Ore': 10, 'Fish': 10, 'Animal': 10, 'Crop': 10, // Resources prices
      'Double Drop Rate': 50, 'Multi-Gather': 100 // Addon prices
    };

    if (shards >= itemPrices[item]) {
      setShards((prevShards) => prevShards - itemPrices[item]);
      setInventory((prevInventory) => ({
        ...prevInventory,
        [item]: (prevInventory[item] || 0) + 1
      }));
      setLogs((prevLogs) => [...prevLogs, `Purchased 1 ${item}.`]);
    }
  };

  return (
    <>
      <div className="title-bar">
        <h4>Bot Control Panel</h4>
        <div className="title-bar-buttons">
          <div className="circle-button red"></div>
          <div className="circle-button yellow"></div>
          <div className="circle-button green"></div>
        </div>
      </div>

      <div className="tabs">
        <div
          className={`tab ${activeTab === 'control' ? 'active' : ''}`}
          onClick={() => setActiveTab('control')}
        >
          Bot Control
        </div>
        <div
          className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </div>
        <div
          className={`tab ${activeTab === 'shop' ? 'active' : ''}`}
          onClick={() => setActiveTab('shop')}
        >
          Shop
        </div>
      </div>

      <div className="tab-content">
        {activeTab === 'control' && (
          <div className="status-panel">
            <div className="status-box">
              <div className="status-item">
                <p>
                  <strong>Attached:</strong>{' '}
                  <span style={{ color: isAttached ? 'green' : 'red' }}>
                    {isAttached ? 'Yes' : 'No'}
                  </span>
                </p>
                <p><strong>Level:</strong> {levelRef.current}</p>
                <p><strong>HP:</strong> {hp}</p>
                <p><strong>Mana:</strong> {mana}</p>
                <p><strong>XP:</strong> {Math.floor(xpRef.current)}/{requiredXpRef.current}</p> {/* Show XP rounded down */}
              </div>
              <div className="status-item right">
                <p><strong>Target HP:</strong> {targetHp}</p>
                <p><strong>Kills:</strong> {kills}</p>
                <p><strong>XP/h:</strong> {xpPerHour}</p>
              </div>
            </div>
            <button onClick={toggleGathering} disabled={isGathering && !canStopBot}>
              {isGathering ? 'Stop Bot' : 'Start Bot'}
            </button>
            <p style={{ color: isGathering ? 'green' : 'gray' }}>
              Status: {isGathering ? `Gathering ${selectedSkill}` : 'Idle'}
            </p>
            <Logs logs={logs} />
          </div>
        )}
        {activeTab === 'settings' && (
          <div className="settings-panel">
            <h4>Settings</h4>
            <div className="skills-container">
              {skills.map((skill) => (
                <label key={skill} style={{ display: 'block', marginBottom: '5px' }}>
                  <input
                    type="checkbox"
                    disabled={selectedSkill !== null && selectedSkill !== skill || isGathering}
                    checked={selectedSkill === skill}
                    onChange={() => handleSkillSelect(skill)}
                  />
                  {skill}
                </label>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'shop' && (
          <div className="shop-panel">
            <div className="shop-section">
              <h5>Resources</h5>
              <div className="shop-items">
                {Object.entries(inventoryItems).map(([skill, item]) => (
                  <div key={item} className="shop-item">
                    <h6>{item}</h6>
                    <div className="price">Cost: 10 Shards</div>
                    <div
                      className={`buy-icon ${shards >= 10 ? 'active' : 'disabled'}`}
                      onClick={() => handlePurchase(item)}
                    >
                      {shards >= 10 ? '+' : 'X'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="shop-section">
              <h5>Bot Addons</h5>
              <div className="shop-items">
                <div className="shop-item">
                  <h6>Double Drop Rate</h6>
                  <div className="price">Cost: 50 Shards</div>
                  <div
                    className={`buy-icon ${shards >= 50 ? 'active' : 'disabled'}`}
                    onClick={() => handlePurchase('Double Drop Rate')}
                  >
                    {shards >= 50 ? '+' : 'X'}
                  </div>
                </div>
                <div className="shop-item">
                  <h6>Multi-Gather Mode</h6>
                  <div className="price">Cost: 100 Shards</div>
                  <div
                    className={`buy-icon ${shards >= 100 ? 'active' : 'disabled'}`}
                    onClick={() => handlePurchase('Multi-Gather')}
                  >
                    {shards >= 100 ? '+' : 'X'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default BotPanel;
