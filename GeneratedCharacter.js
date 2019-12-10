class GeneratedCharacter {
  constructor(selectedStats){
    this.characterName = selectedStats.characterName;
    this.playerName = selectedStats.playerName;
    this.race = selectedStats.raceSelected;
    this.class = selectedStats.classSelected;
    this.background = selectedStats.backgroundSelected;
    this.alignment = selectedStats.alignmentSelected;
    this.weapons = selectedStats.weapons;
    this.test = this.test.bind(this);
    this.test();
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
  test() {
    console.log(this.characterName);
    console.log(this.playerName);
    console.log(this.race);
    console.log(this.class);
    console.log(this.background);
    console.log(this.alignment);
    console.log(this.weapons);
  }
}
