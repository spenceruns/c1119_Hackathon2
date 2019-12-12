class GeneratedCharacter {
  constructor(selectedStats){
    this.characterName = selectedStats.characterName;
    this.playerName = selectedStats.playerName;
    this.race = selectedStats.raceSelected;
    this.class = selectedStats.classSelected;
    this.background = selectedStats.backgroundSelected;
    this.alignment = selectedStats.alignmentSelected;
    this.weapons = selectedStats.weapons;
    this.stats = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];
    this.generateCharacterSheet = this.generateCharacterSheet.bind(this);
    this.generateCharacterSheet();
  }

  rollStat() {
    var total = 0;
    var diceRolls = [];

    for (var index = 0; index < 4; index++) {
      var diceRoll = Math.floor(Math.random() * 6) + 1;
      diceRolls.push(diceRoll);
    }
    var location = 0;
    var value = diceRolls[0];
    for (var index = 1; index < 4; index++) {
      if (diceRolls[index] < value) {
        value = diceRolls[index];
        location = index;
      }
    }
    diceRolls.splice(location, 1);
    total = diceRolls[0] + diceRolls[1] + diceRolls[2];
    return total;
  }

  findModifier(stat) {
    switch (stat) {
      case 3:
        return "-4"
      case 4:
      case 5:
        return "-3"
      case 6:
      case 7:
        return "-2"
      case 8:
      case 9:
        return "-1"
      case 10:
      case 11:
        return "+0"
      case 12:
      case 13:
        return "+1"
      case 14:
      case 15:
        return "+2"
      case 16:
      case 17:
        return "+3"
      case 18:
        return "+4"

    }
  }

  generateCharacterSheet() {
    var createdCharacterSheet = $("<div>").attr("id", "created-character");

    var topBox = $("<div>").addClass("top-box");

    var characterNameInfo = $("<div>").addClass("character-name-info");
    var characterName = $("<div>").addClass("character-name").text(this.characterName);
    var characterNamePlaceholder = $("<div>").addClass("character-name-placeholder").html("<hr>Character Name");
    characterNameInfo.append(characterName, characterNamePlaceholder);

    var otherInfo = $("<div>").addClass("other-info");

    var classInfo = $("<div>").addClass("class info");
    var classArea = $("<div>").addClass("class area").text(this.class.name);
    var classPlaceholder = $("<div>").addClass("class placeholder").html("<hr>Class");
    classInfo.append(classArea, classPlaceholder);

    var backgroundInfo = $("<div>").addClass("background info");
    var backgroundArea = $("<div>").addClass("background area").text(this.background.name);
    var backgroundPlaceholder = $("<div>").addClass("background placeholder").html("<hr>Background");
    backgroundInfo.append(backgroundArea, backgroundPlaceholder);

    var raceInfo = $("<div>").addClass("race info");
    var raceArea = $("<div>").addClass("race area").text(this.race.name);
    var racePlaceholder = $("<div>").addClass("race placeholder").html("<hr>Race");
    raceInfo.append(raceArea, racePlaceholder);

    var alignmentInfo = $("<div>").addClass("alignment info");
    var alignmentArea = $("<div>").addClass("alignment area").text(this.alignment.name);
    var alignmentPlaceholder = $("<div>").addClass("alignment placeholder").html("<hr>Alignment");
    alignmentInfo.append(alignmentArea, alignmentPlaceholder);

    var experienceInfo = $("<div>").addClass("experience info");
    var experienceArea = $("<div>").addClass("experience area").text(0);
    var experiencePlaceholder = $("<div>").addClass("experience placeholder").html("<hr>Experience");
    experienceInfo.append(experienceArea, experiencePlaceholder);

    var playerNameInfo = $("<div>").addClass("playerName info");
    var playerNameArea = $("<div>").addClass("playerName area").text(this.playerName);
    var playerNamePlaceholder = $("<div>").addClass("playerName placeholder").html("<hr>Player Name");
    playerNameInfo.append(playerNameArea, playerNamePlaceholder);

    otherInfo.append(classInfo, backgroundInfo, raceInfo, alignmentInfo, experienceInfo, playerNameInfo);

    topBox.append(characterNameInfo, otherInfo);

    var bottomBox = $("<div>").addClass("bottom-box");

    var statContainer = $("<div>").addClass("stat-container");
    for (var index = 0; index < this.stats.length; index++) {
      var baseStat = $("<div>").addClass("base-stat").text(this.stats[index]);

      var currentStat = this.rollStat();
      var currentModifier = this.findModifier(currentStat);
      var modifier = $("<div>").addClass("modifier").text(currentModifier);
      var stat = $("<div>").addClass("stat").text(currentStat);

      baseStat.append(modifier, stat);

      statContainer.append(baseStat);
    }

    var otherStats = $("<div>").addClass("other-stats");

    var acInti = $("<div>").addClass("ac-inti");
    var currentStat = this.rollStat();
    var ac = $("<div>").addClass("ac").text(currentStat);
    var currentModifier = this.findModifier(currentStat);
    var inti = $("<div>").addClass("inti").text(currentModifier);
    var acName = $("<div>").text("Armor Class");
    var intiName = $("<div>").text("Initiative");

    acInti.append(ac, inti, acName, intiName);

    var speedHitdice = $("<div>").addClass("speed-hitdice");
    var speed = $("<div>").addClass("speed").text(this.race.speed.walk + "ft");
    var hitdice = $("<div>").addClass("hitdice").text(this.class.hit_dice);
    var speedName = $("<div>").text("Speed");
    var hitdiceName = $("<div>").text("Hit Dice");

    speedHitdice.append(speed, hitdice, speedName, hitdiceName);

    var currentHitpoints= $("<div>").addClass("current-hitpoints");
    var currentHP = $("<div>").addClass("current-HP").html("&ensp;");
    var totalHP = $("<div>").addClass("total-HP").text("10");
    var currentName = $("<div>").text("Current HP");
    var totalName = $("<div>").text("Total HP");

    currentHitpoints.append(currentHP, totalHP, currentName, totalName);

    otherStats.append(acInti, speedHitdice, currentHitpoints);

    var weaponsAndInfo = $("<div>").addClass("weapons-and-info");

    var characterInfo = $("<div>").addClass("character-info").text("Character Info");
    var traits = $("<div>").addClass("traits").text("Traits");
    var ideals = $("<div>").addClass("ideals").text("Ideals");
    var bonds = $("<div>").addClass("bonds").text("Bonds");
    var flaws = $("<div>").addClass("flaws").text("Flaws");
    characterInfo.append(traits, ideals, bonds, flaws);

    var weapons = $("<div>").addClass("weapons").text("Weapons");
    var numbers = ["one", "two", "three"];
    var randomWeaponLocation = []
    for (var index = 0; index < 3; index++) {
    randomWeaponLocation.push(Math.floor(Math.random() * 36));
    }
    for (var index = 0; index < numbers.length; index++) {
      var weapon = $("<div>").addClass("weapon" + " " + numbers[index]);
      var weaponName = $("<div>").addClass("weapon-name").html(this.weapons[randomWeaponLocation[index]].name + "<hr>");
      var weaponDice = $("<div>").addClass("weapon-dice").html(this.weapons[randomWeaponLocation[index]].damage_dice + "<hr>");
      var weaponType = $("<div>").addClass("weapon-type").html(this.weapons[randomWeaponLocation[index]].damage_type + "<hr>");
      var weaponNamePlaceholder = $("<div>").addClass("weapon-name placeholder move-up").text("Name");
      var weaponDicePlaceholder = $("<div>").addClass("weapon-dice placeholder move-up").text("Damage Dice");
      var weaponTypePlaceholder = $("<div>").addClass("weapon-type placeholder move-up").text("Damage Type");
      var weaponProp = $("<div>").addClass("weapon-prop").html(this.weapons[randomWeaponLocation[index]].properties + "<hr>");
      var weaponPropName = $("<div>").addClass("weapon-prop placeholder move-up").text("Weapon Properties");

      weapon.append(weaponName, weaponDice, weaponType, weaponNamePlaceholder, weaponDicePlaceholder, weaponTypePlaceholder, weaponProp, weaponPropName);
      weapons.append(weapon);

    }

    weaponsAndInfo.append(characterInfo, weapons);

    bottomBox.append(statContainer, otherStats, weaponsAndInfo);
    createdCharacterSheet.append(topBox, bottomBox);
    $(".character-modal").append(createdCharacterSheet);
  }
}
