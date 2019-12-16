class GeneratedCharacter {
  constructor(selectedStats){
    this.characterName = selectedStats.characterName;
    this.playerName = selectedStats.playerName;
    this.race = selectedStats.raceSelected;
    this.class = selectedStats.classSelected;
    this.background = selectedStats.backgroundSelected;
    this.alignment = selectedStats.alignmentSelected;
    this.weapons = selectedStats.weapons;
    this.generateCharacterSheet = this.generateCharacterSheet.bind(this);
    this.generateCharacterSheet();
  }

  rollStat() {
    let total = 0;
    let diceRolls = [];

    for (let index = 0; index < 4; index++) {
      let diceRoll = Math.floor(Math.random() * 6) + 1;
      diceRolls.push(diceRoll);
    }
    let location = 0;
    let value = diceRolls[0];
    for (let index = 1; index < 4; index++) {
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
    $(".charsheet").removeClass("hidden");

    let printButton = $("<div>").addClass("print-button button-style").text("Print Character Sheet");
    $(".character-forge").append(printButton);


    $(".charname input").val(this.characterName);
    $("input[name=classlevel]").val(this.class.name + " 1");
    $("input[name=background]").val(this.background.name);
    $("input[name=playername").val(this.playerName);
    $("input[name=race]").val(this.race.name);
    $("input[name=alignment]").val(this.alignment.name);
    $("input[name=experiencepoints]").val("0");

    let str = this.rollStat();
    let dex = this.rollStat();
    let con = this.rollStat();
    let wis = this.rollStat();
    let int = this.rollStat();
    let cha = this.rollStat();

    for (let classAndRaceIndex = 0; classAndRaceIndex < this.race.asi.length; classAndRaceIndex++) {
      if (this.race.asi[classAndRaceIndex].attributes[0] === "Strength"){
        str += this.race.asi[classAndRaceIndex].value;
      } else if (this.race.asi[classAndRaceIndex].attributes[0] === "Dexterity") {
        dex += this.race.asi[classAndRaceIndex].value;
      } else if (this.race.asi[classAndRaceIndex].attributes[0] === "Constitution") {
        con += this.race.asi[classAndRaceIndex].value;
      } else if (this.race.asi[classAndRaceIndex].attributes[0] === "Wisdom") {
        wis += this.race.asi[classAndRaceIndex].value;
      } else if (this.race.asi[classAndRaceIndex].attributes[0] === "Intelligence") {
        int += this.race.asi[classAndRaceIndex].value;
      } else if (this.race.asi[classAndRaceIndex].attributes[0] === "Charisma") {
        cha += this.race.asi[classAndRaceIndex].value;
      }
    }

    let strMod = this.findModifier(str);
    let dexMod = this.findModifier(dex);
    let conMod = this.findModifier(con);
    let wisMod = this.findModifier(wis);
    let intMod = this.findModifier(int);
    let chaMod = this.findModifier(cha);

    $("input[name=Strengthscore]").val(str);
    $("input[name=Strengthmod]").val(strMod);
    $("input[name=Dexterityscore]").val(dex);
    $("input[name=Dexteritymod]").val(dexMod);
    $("input[name=Constitutionscore]").val(con);
    $("input[name=Constitutionmod]").val(conMod);
    $("input[name=Wisdomscore]").val(wis);
    $("input[name=Wisdommod]").val(wisMod);
    $("input[name=Intelligencescore]").val(int);
    $("input[name=Intelligencemod]").val(intMod);
    $("input[name=Charismascore]").val(cha);
    $("input[name=Charismamod]").val(chaMod);

    $("input[name=Acrobatics]").val(dexMod);
    $("input[name=AnimalHandling]").val(wisMod);
    $("input[name=Arcana]").val(intMod);
    $("input[name=Athletics]").val(strMod);
    $("input[name=Deception]").val(chaMod);
    $("input[name=History]").val(intMod);
    $("input[name=Insight]").val(wisMod);
    $("input[name=Intimidation]").val(chaMod);
    $("input[name=Investigation]").val(intMod);
    $("input[name=Medicine]").val(wisMod);
    $("input[name=Nature]").val(intMod);
    $("input[name=Perception]").val(wisMod);
    $("input[name=Performance]").val(chaMod);
    $("input[name=Persuasion]").val(chaMod);
    $("input[name=Religion]").val(intMod);
    $("input[name=Persuasion]").val(chaMod);
    $("input[name=SleightofHand]").val(dexMod);
    $("input[name=Stealth]").val(dexMod);
    $("input[name=Survival]").val(wisMod);

    let acValue = 10 + parseInt(dexMod);
    $("input[name=initiative]").val(dexMod);
    $("input[name=speed]").val(this.race.speed.walk);
    $("input[name=totalhd]").val(this.class.hit_dice);
    $("textarea[name=otherprofs").val(this.race.languages + "\n" + this.race.vision);

    let maxHP = 0;
    switch (this.class.name) {
      case "Barbarian":
        maxHP = 12 + parseInt(conMod);
        acValue = 10 + parseInt(dexMod) + parseInt(conMod);
        strMod = "+" +  (parseInt(strMod) + 2);
        $("input[name=Strength-save-prof]").prop("checked", true);
        conMod = "+" +  (parseInt(conMod) + 2);
        $("input[name=Constitution-save-prof]").prop("checked", true);
        $("input[name=Athletics]").val(strMod);
        $("input[name=Intimidation]").val(chaMod);
        $("input[name=Athletics-prof]").prop("checked", true);
        $("input[name=Intimidation-prof]").prop("checked", true);
        $("input[name=atkname1").val(this.weapons[17].name + "*");
        $("input[name=atkbonus1").val(this.weapons[17].damage_dice);
        $("input[name=atkdamage1").val(this.weapons[17].damage_type);
        $("input[name=atkname2").val(this.weapons[3].name + "^");
        $("input[name=atkbonus2").val(this.weapons[3].damage_dice);
        $("input[name=atkdamage2").val(this.weapons[3].damage_type);
        $("input[name=atkname3").val(this.weapons[0].name + "~");
        $("input[name=atkbonus3").val(this.weapons[0].damage_dice);
        $("input[name=atkdamage3").val(this.weapons[0].damage_type);
        $("textarea[name=weapon-desc]").val("*" + this.weapons[17].properties[0] + ", " + this.weapons[17].properties[1] + "\n" + "^" + this.weapons[3].properties[0] + ", " + this.weapons[3].properties[1] + "\n" + "~" + this.weapons[0].properties[0] + ", " + this.weapons[0].properties[1]);
        $("textarea[name=features]").val(this.class.desc);
        break;
      case "Bard":
        maxHP = 8 + parseInt(conMod);
        dexMod = "+" + (parseInt(dexMod) + 2);
        $("input[name=Dexterity-save-prof]").prop("checked", true);
        chaMod = "+" + (parseInt(chaMod) + 2);
        $("input[name=Charisma-save-prof]").prop("checked", true);
        $("input[name=Deception]").val(chaMod);
        $("input[name=Performance]").val(chaMod);
        $("input[name=SleightofHand]").val(dexMod);
        $("input[name=Deception-prof]").prop("checked", true);
        $("input[name=Performance-prof]").prop("checked", true);
        $("input[name=SleightofHand-prof]").prop("checked", true);
        $("input[name=atkname1").val(this.weapons[25].name + "*");
        $("input[name=atkbonus1").val(this.weapons[25].damage_dice);
        $("input[name=atkdamage1").val(this.weapons[25].damage_type);
        $("input[name=atkname2").val(this.weapons[1].name + "^");
        $("input[name=atkbonus2").val(this.weapons[1].damage_dice);
        $("input[name=atkdamage2").val(this.weapons[1].damage_type);
        $("textarea[name=weapon-desc]").val("*" + this.weapons[25].properties[0] + ", " + this.weapons[25].properties[1] + "\n" + "^" + this.weapons[1].properties[0] + ", " + this.weapons[1].properties[1]);
        $("textarea[name=features]").val(this.class.desc);
        break;
      case "Cleric":
        maxHP = 8 + parseInt(conMod);
        wisMod = "+" + (parseInt(wisMod) + 2);
        $("input[name=Wisdom-save-prof]").prop("checked", true);
        chaMod = "+" + (parseInt(chaMod) + 2);
        $("input[name=Charisma-save-prof]").prop("checked", true);
        $("input[name=Medicine]").val(wisMod);
        $("input[name=Religion]").val(intMod);
        $("input[name=Medicine-prof]").prop("checked", true);
        $("input[name=Religion-prof]").prop("checked", true);
        $("input[name=atkname1").val(this.weapons[30].name + "*");
        $("input[name=atkbonus1").val(this.weapons[30].damage_dice);
        $("input[name=atkdamage1").val(this.weapons[30].damage_type);
        $("input[name=atkname2").val(this.weapons[10].name + "^");
        $("input[name=atkbonus2").val(this.weapons[10].damage_dice);
        $("input[name=atkdamage2").val(this.weapons[10].damage_type);
        $("textarea[name=weapon-desc]").val("*" + this.weapons[30].properties[0] + ", " + this.weapons[30].properties[1] + "\n" + "^" + this.weapons[10].properties[0] + ", " + this.weapons[10].properties[1]);
        $("textarea[name=features]").val(this.class.desc);
        break;
      case "Druid":
        maxHP = 8 + parseInt(conMod);
        intMod = "+" + (parseInt(intMod) + 2);
        $("input[name=Intelligence-save-prof]").prop("checked", true);
        wisMod = "+" + (parseInt(wisMod) + 2);
        $("input[name=Wisdom-save-prof]").prop("checked", true);
        $("input[name=Nature]").val(intMod);
        $("input[name=Survival]").val(wisMod);
        $("input[name=Nature-prof]").prop("checked", true);
        $("input[name=Survival-prof]").prop("checked", true);
        $("input[name=atkname1").val(this.weapons[7].name + "*");
        $("input[name=atkbonus1").val(this.weapons[7].damage_dice);
        $("input[name=atkdamage1").val(this.weapons[7].damage_type);
        $("input[name=atkname2").val(this.weapons[26].name + "^");
        $("input[name=atkbonus2").val(this.weapons[26].damage_dice);
        $("input[name=atkdamage2").val(this.weapons[26].damage_type);
        $("textarea[name=weapon-desc]").val("*" + this.weapons[7].properties[0] + ", " + this.weapons[7].properties[1] + "\n" + "^" + this.weapons[26].properties[0] + ", " + this.weapons[26].properties[1]);
        $("textarea[name=features]").val(this.class.desc);
        break;
      case "Fighter":
        maxHP = 10 + parseInt(conMod);
        strMod = "+" + (parseInt(strMod) + 2);
        $("input[name=Strength-save-prof]").prop("checked", true);
        conMod = "+" + (parseInt(conMod) + 2);
        $("input[name=Constitution-save-prof]").prop("checked", true);
        $("input[name=Acrobatics]").val("+" + (parseInt(dexMod) + 2));
        $("input[name=Perception]").val("+" + (parseInt(wisMod) + 2));
        $("input[name=Acrobatics-prof]").prop("checked", true);
        $("input[name=Perception-prof]").prop("checked", true);
        $("input[name=atkname1").val(this.weapons[18].name + "*");
        $("input[name=atkbonus1").val(this.weapons[18].damage_dice);
        $("input[name=atkdamage1").val(this.weapons[18].damage_type);
        $("input[name=atkname2").val(this.weapons[19].name + "^");
        $("input[name=atkbonus2").val(this.weapons[19].damage_dice);
        $("input[name=atkdamage2").val(this.weapons[19].damage_type);
        $("input[name=atkname3").val(this.weapons[10].name + "~");
        $("input[name=atkbonus3").val(this.weapons[10].damage_dice);
        $("input[name=atkdamage3").val(this.weapons[10].damage_type);
        $("textarea[name=weapon-desc]").val("*" + this.weapons[18].properties[0] + ", " + this.weapons[18].properties[1] + "\n" + "^" + this.weapons[19].properties[0] + ", " + this.weapons[19].properties[1] + "\n" + "~" + this.weapons[10].properties[0] + ", " + this.weapons[10].properties[1]);
        $("textarea[name=features]").val(this.class.desc);
        break;
      case "Monk":
        maxHP = 8 + parseInt(conMod);
        acValue = 10 + parseInt(dexMod) + parseInt(wisMod);
        strMod = "+" + (parseInt(strMod) + 2);
        $("input[name=Strength-save-prof]").prop("checked", true);
        dexMod = "+" + (parseInt(dexMod) + 2);
        $("input[name=Dexterity-save-prof]").prop("checked", true);
        $("input[name=Acrobatics]").val(dexMod);
        $("input[name=Religion]").val("+" + (parseInt(intMod) + 2));
        $("input[name=Acrobatics-prof]").prop("checked", true);
        $("input[name=Religion-prof]").prop("checked", true);
        $("input[name=atkname1").val(this.weapons[27].name + "*");
        $("input[name=atkbonus1").val(this.weapons[27].damage_dice);
        $("input[name=atkdamage1").val(this.weapons[27].damage_type);
        $("input[name=atkname2").val(this.weapons[11].name + " x10" +"^");
        $("input[name=atkbonus2").val(this.weapons[11].damage_dice);
        $("input[name=atkdamage2").val(this.weapons[11].damage_type);
        $("textarea[name=weapon-desc]").val("*" + this.weapons[27].properties[0] + ", " + this.weapons[27].properties[1] + "\n" + "^" + this.weapons[11].properties[0] + ", " + this.weapons[11].properties[1]);
        $("textarea[name=features]").val(this.class.desc);
        break;
      case "Paladin":
        maxHP = 10 + parseInt(conMod);
        wisMod = "+" + (parseInt(wisMod) + 2);
        $("input[name=Wisdom-save-prof]").prop("checked", true);
        chaMod = "+" + (parseInt(chaMod) + 2);
        $("input[name=Charisma-save-prof]").prop("checked", true);
        $("input[name=Religion]").val("+" + (parseInt(intMod) + 2));
        $("input[name=Persuasion]").val(chaMod);
        $("input[name=Religion-prof]").prop("checked", true);
        $("input[name=Persuasion-prof]").prop("checked", true);
        $("input[name=atkname1").val(this.weapons[19].name + "*");
        $("input[name=atkbonus1").val(this.weapons[19].damage_dice);
        $("input[name=atkdamage1").val(this.weapons[19].damage_type);
        $("input[name=atkname2").val(this.weapons[27].name + "^");
        $("input[name=atkbonus2").val(this.weapons[27].damage_dice);
        $("input[name=atkdamage2").val(this.weapons[27].damage_type);
        $("input[name=atkname3").val(this.weapons[9].name + "~");
        $("input[name=atkbonus3").val(this.weapons[9].damage_dice);
        $("input[name=atkdamage3").val(this.weapons[9].damage_type);
        $("textarea[name=weapon-desc]").val("*" + this.weapons[19].properties[0] + ", " + this.weapons[19].properties[1] + "\n" + "^" + this.weapons[27].properties[0] + ", " + this.weapons[27].properties[1] + "\n" + "~" + this.weapons[9].properties[0] + ", " + this.weapons[9].properties[1]);
        $("textarea[name=features]").val(this.class.desc);
        break;
      case "Ranger":
        maxHP = 10 + parseInt(conMod);
        strMod = "+" + (parseInt(strMod) + 2);
        $("input[name=Strength-save-prof]").prop("checked", true);
        dexMod = "+" + (parseInt(dexMod) + 2);
        $("input[name=Dexterity-save-prof]").prop("checked", true);
        $("input[name=Investigation]").val("+" + (parseInt(intMod) + 2));
        $("input[name=Perception]").val("+" + (parseInt(wisMod) + 2));
        $("input[name=Survival]").val("+" + (parseInt(wisMod) + 2));
        $("input[name=Investigation-prof]").prop("checked", true);
        $("input[name=Perception-prof]").prop("checked", true);
        $("input[name=Survival-prof]").prop("checked", true);
        $("input[name=atkname1").val(this.weapons[27].name + "*");
        $("input[name=atkbonus1").val(this.weapons[27].damage_dice);
        $("input[name=atkdamage1").val(this.weapons[27].damage_type);
        $("input[name=atkname2").val(this.weapons[27].name + "^");
        $("input[name=atkbonus2").val(this.weapons[27].damage_dice);
        $("input[name=atkdamage2").val(this.weapons[27].damage_type);
        $("input[name=atkname3").val(this.weapons[35].name + "~");
        $("input[name=atkbonus3").val(this.weapons[35].damage_dice);
        $("input[name=atkdamage3").val(this.weapons[35].damage_type);
        $("textarea[name=weapon-desc]").val("*" + this.weapons[27].properties[0] + ", " + this.weapons[27].properties[1] + "\n" + "^" + this.weapons[27].properties[0] + ", " + this.weapons[27].properties[1] + "\n" + "~" + this.weapons[35].properties[0] + ", " + this.weapons[35].properties[1]);
        $("textarea[name=features]").val(this.class.desc);
        break;
      case "Rogue":
        maxHP = 8 + parseInt(conMod);
        dexMod = "+" + (parseInt(dexMod) + 2);
        $("input[name=Dexterity-save-prof]").prop("checked", true);
        intMod = "+" + (parseInt(intMod) + 2);
        $("input[name=Intelligence-save-prof]").prop("checked", true);
        $("input[name=Acrobatics]").val(dexMod);
        $("input[name=Deception]").val("+" + (parseInt(intMod) + 2));
        $("input[name=SleightofHand]").val(dexMod);
        $("input[name=Stealth]").val(dexMod);
        $("input[name=Acrobatics-prof]").prop("checked", true);
        $("input[name=Deception-prof]").prop("checked", true);
        $("input[name=SleightofHand-prof]").prop("checked", true);
        $("input[name=Stealth-prof]").prop("checked", true);
        $("input[name=atkname1").val(this.weapons[25].name + "*");
        $("input[name=atkbonus1").val(this.weapons[25].damage_dice);
        $("input[name=atkdamage1").val(this.weapons[25].damage_type);
        $("input[name=atkname2").val(this.weapons[10].name + "^");
        $("input[name=atkbonus2").val(this.weapons[10].damage_dice);
        $("input[name=atkdamage2").val(this.weapons[10].damage_type);
        $("input[name=atkname3").val(this.weapons[1].name + "~");
        $("input[name=atkbonus3").val(this.weapons[1].damage_dice);
        $("input[name=atkdamage3").val(this.weapons[1].damage_type);
        $("textarea[name=weapon-desc]").val("*" + this.weapons[25].properties[0] + ", " + this.weapons[25].properties[1] + "\n" + "^" + this.weapons[10].properties[0] + ", " + this.weapons[10].properties[1] + "\n" + "~" + this.weapons[1].properties[0] + ", " + this.weapons[1].properties[1]);
        $("textarea[name=features]").val(this.class.desc);
        break;
      case "Sorcerer":
        maxHP = 6 + parseInt(conMod);
        conMod = "+" + (parseInt(conMod) + 2);
        $("input[name=Constitution-save-prof]").prop("checked", true);
        chaMod = "+" + (parseInt(chaMod) + 2);
        $("input[name=Charisma-save-prof]").prop("checked", true);
        $("input[name=Arcana]").val("+" + (parseInt(intMod) + 2));
        $("input[name=Insight]").val("+" + (parseInt(wisMod) + 2));
        $("input[name=Arcana-prof]").prop("checked", true);
        $("input[name=Insight-prof]").prop("checked", true);
        $("input[name=atkname2").val(this.weapons[10].name + "*");
        $("input[name=atkbonus2").val(this.weapons[10].damage_dice);
        $("input[name=atkdamage2").val(this.weapons[10].damage_type);
        $("input[name=atkname3").val(this.weapons[1].name + "^");
        $("input[name=atkbonus3").val(this.weapons[1].damage_dice);
        $("input[name=atkdamage3").val(this.weapons[1].damage_type);
        $("textarea[name=weapon-desc]").val("*" + this.weapons[10].properties[0] + ", " + this.weapons[10].properties[1] + "\n" + "^" + this.weapons[1].properties[0] + ", " + this.weapons[1].properties[1]);
        $("textarea[name=features]").val(this.class.desc);
        break;
      case "Warlock":
        maxHP = 8 + parseInt(conMod);
        wisMod = "+" + (parseInt(wisMod) + 2);
        $("input[name=Wisdom-save-prof]").prop("checked", true);
        chaMod = "+" + (parseInt(chaMod) + 2);
        $("input[name=Charisma-save-prof]").prop("checked", true);
        $("input[name=Deception]").val("+" + (parseInt(intMod) + 2));
        $("input[name=Intimidation]").val(chaMod);
        $("input[name=Deception-prof]").prop("checked", true);
        $("input[name=Intimidation-prof]").prop("checked", true);
        $("input[name=atkname2").val(this.weapons[7].name + "*");
        $("input[name=atkbonus2").val(this.weapons[7].damage_dice);
        $("input[name=atkdamage2").val(this.weapons[7].damage_type);
        $("input[name=atkname3").val(this.weapons[1].name + "^");
        $("input[name=atkbonus3").val(this.weapons[1].damage_dice);
        $("input[name=atkdamage3").val(this.weapons[1].damage_type);
        $("textarea[name=weapon-desc]").val("*" + this.weapons[7].properties[0] + ", " + this.weapons[7].properties[1] + "\n" + "^" + this.weapons[1].properties[0] + ", " + this.weapons[1].properties[1]);
        $("textarea[name=features]").val(this.class.desc);
        break;
      case "Wizard":
        maxHP = 6 + parseInt(conMod);
        intMod = "+" + (parseInt(intMod) + 2);
        $("input[name=Intelligence-save-prof]").prop("checked", true);
        wisMod = "+" + (parseInt(wisMod) + 2);
        $("input[name=Wisdom-save-prof]").prop("checked", true);
        $("input[name=Arcana]").val(intMod);
        $("input[name=History]").val(intMod);
        $("input[name=Arcana-prof]").prop("checked", true);
        $("input[name=History-prof]").prop("checked", true);
        $("input[name=atkname2").val(this.weapons[7].name + "*");
        $("input[name=atkbonus2").val(this.weapons[7].damage_dice);
        $("input[name=atkdamage2").val(this.weapons[7].damage_type);
        $("input[name=atkname3").val(this.weapons[1].name + "^");
        $("input[name=atkbonus3").val(this.weapons[1].damage_dice);
        $("input[name=atkdamage3").val(this.weapons[1].damage_type);
        $("textarea[name=weapon-desc]").val("*" + this.weapons[7].properties[0] + ", " + this.weapons[7].properties[1] + "\n" + "^" + this.weapons[1].properties[0] + ", " + this.weapons[1].properties[1]);
        $("textarea[name=features]").val(this.class.desc);
        break;
    }

    $("input[name=ac]").val(acValue);

    $("input[name=Strength-save]").val(strMod);
    $("input[name=Dexterity-save]").val(dexMod);
    $("input[name=Constitution-save]").val(conMod);
    $("input[name=Wisdom-save]").val(wisMod);
    $("input[name=Intelligence-save]").val(intMod);
    $("input[name=Charisma-save]").val(chaMod);

    $("input[name=passiveperception]").val(10 + 2 + parseInt(wisMod));
    $("input[name=maxhp").val(maxHP);
  }
}
