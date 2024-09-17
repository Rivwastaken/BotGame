export const calculateXpGain = (level, selectedSkill) => {
  const baseXp = 4; // Base XP for early levels
  const xpScalingFactor = Math.max(0.5, 4 / Math.sqrt(level)); // XP gain decreases as level increases
  let familiarityModifier = selectedSkill ? (0.5 + (level / 200)) : 0.5; // Familiarity modifier
  return baseXp * xpScalingFactor * familiarityModifier; // Scaled XP based on level
};

export const getRequiredXpForLevel = (level) => {
  return 10 * Math.pow(level, 2); // XP required increases exponentially with level
};

export const gatherXpAndLevelUp = (currentXp, currentLevel, selectedSkill, setLogs) => {
  const xpGained = calculateXpGain(currentLevel, selectedSkill);
  let newXp = currentXp + xpGained;
  let newLevel = currentLevel;
  let newRequiredXp = getRequiredXpForLevel(currentLevel);
  let leveledUp = false;

  // If the XP exceeds the required XP for the level, level up
  while (newXp >= newRequiredXp) {
    newXp -= newRequiredXp; // Subtract required XP for current level-up
    newLevel += 1; // Increase level
    newRequiredXp = getRequiredXpForLevel(newLevel); // Get new required XP for the next level
    leveledUp = true; // Set level-up flag to true

    // Only log the level-up event, not the XP gained during the level-up
    setLogs((prevLogs) => [...prevLogs, `Level Up! You are now level ${newLevel}. Required XP: ${newRequiredXp}`]);
  }

  // Return the new XP, level, required XP, and level-up status
  return {
    newXp,
    newLevel,
    newRequiredXp,
    leveledUp, // Return level-up flag
  };
};
