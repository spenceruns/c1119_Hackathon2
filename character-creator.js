class CharacterCreator {
  constructor() {
    this.$characterCreator = $("#character-creator");
    this.$body = $("body");
    this.races = null;
    this.classes = null;
    this.backgrounds = null;
    this.alignments = ["Lawful Good", "Lawful Neutral", "Lawful Evil", "Neutral Good", "True Neutral", "Neutral Evil", "Chaotic Good", "Chaotic Neutral", "Chaotic Evil"];
    this.weapons = null;
    this.characterName = null;
    this.playerName = null;
    this.getCharacterData = this.getCharacterData.bind(this);
    this.addClickHandlers = this.addClickHandlers.bind(this);
    this.generateRandomCharacter = this.generateRandomCharacter.bind(this);
    this.makeRandomCharacterScreen = this.makeRandomCharacterScreen.bind(this);
    this.makeCreateCharacterScreen = this.makeCreateCharacterScreen.bind(this);
    this.getCharacterData();
    this.addClickHandlers();
    this.testInput = null;
  }

  addClickHandlers() {
    this.$characterCreator.on("click", this.render);
    this.$body.on("click", ".cc-exit-button", this.exitModal);
    this.$body.on("click", ".random-character", this.makeRandomCharacterScreen);
    this.$body.on("click", ".create-character", this.makeCreateCharacterScreen);
    this.$body.on("click", ".generate-button", this.generateRandomCharacter);
  }

  getCharacterData() {
    var getClasses = {
      dataType: "json",
      url: "https://api.open5e.com/classes/",
      method: "GET",
      success: response => this.classes = response.results,
      error: error => console.log("error", error),
    };
    $.ajax(getClasses);

    var getRaces = {
      dataType: "json",
      url: "https://api.open5e.com/races/",
      method: "GET",
      success: response => this.races = response.results,
      error: error => console.log("error", error),
    };
    $.ajax(getRaces);

    var getBackgrounds = {
      dataType: "json",
      url: "https://api.open5e.com/backgrounds/",
      method: "GET",
      success: response => this.backgrounds = response.results,
      error: error => console.log("error", error),
    };
    $.ajax(getBackgrounds);

    var getWeapons = {
      dataType: "json",
      url: "https://api.open5e.com/weapons/",
      method: "GET",
      success: response => this.weapons = response.results,
      error: error => console.log("error", error),
    };
    $.ajax(getWeapons);
  }

  render() {
    var modalPage = $("<div>").addClass("character-modal");
    var modalContent = $("<div>").addClass("modal-content");
    var randomButton = $("<button>").addClass("random-character").text("Random Character");
    var createButton = $("<button>").addClass("create-character").text("Create Character");
    var exitButton = $("<div>").addClass("cc-exit-button").html("&times;");

    modalContent.append(randomButton, createButton, exitButton);
    modalPage.append(modalContent);
    $("body").append(modalPage);
  }

  makeRandomCharacterScreen() {
    var $modalContent = $(".modal-content");
    $modalContent.empty();
    var characterNameInput = $("<input>").addClass("random-character-name").attr("placeholder", "Character Name");
    var playerNameInput = $("<input>").addClass("random-player-name").attr("placeholder", "Player Name");;
    var randomButton = $("<button>").addClass("generate-button").text("Generate");
    var exitButton = $("<div>").addClass("cc-exit-button").html("&times;");
    console.log(this.races);

    $modalContent.append(characterNameInput, playerNameInput, randomButton, exitButton);
  }

  makeCreateCharacterScreen() {
    var $modalContent = $(".modal-content");
    $modalContent.empty();
    var inputs = $("<div>").addClass("inputContainer");
    var characterNameInput = $("<input>").addClass("create-character-name").attr("placeholder", "Character Name");
    var playerNameInput = $("<input>").addClass("create-player-name").attr("placeholder", "Player Name");
    var createButton = $("<button>").addClass("generate-button").text("Generate");
    var exitButton = $("<div>").addClass("cc-exit-button").html("&times;");
    var raceSelect = $("<select>").addClass("raceSelect").attr("name", "Race");
    var raceInput = $("<option>").text("Race...");
    raceSelect.append(raceInput);
    for (var index = 0; index < this.races.length; index++) {
      raceInput = $("<option>").text(this.races[index].name);
      raceSelect.append(raceInput);
    }
    var classSelect = $("<select>").addClass("classSelect");
    var classInput = $("<option>").text("Class...");
    classSelect.append(classInput);
    for (var index = 0; index < this.classes.length; index++) {
      classInput = $("<option>").text(this.classes[index].name);
      classSelect.append(classInput);
    }
    var backgroundSelect = $("<select>").addClass("backgroundSelect");
    var backgroundInput = $("<option>").text("Background...");
    backgroundSelect.append(backgroundInput);
    for (var index = 0; index < this.backgrounds.length; index++) {
      var backgroundInput = $("<option>").text(this.backgrounds[index].name);
      backgroundSelect.append(backgroundInput);
    }
    var alignmentSelect = $("<select>").addClass("alignmentSelect");
    var alignmentInput = $("<option>").text("Alignment...");
    alignmentSelect.append(alignmentInput);
    for (var index = 0; index < this.alignments.length; index++) {
      var alignmentInput = $("<option>").text(this.alignments[index]);
      alignmentSelect.append(alignmentInput);
    }

    inputs.append(characterNameInput, playerNameInput, raceSelect, classSelect, backgroundSelect, alignmentSelect);
    $modalContent.append(inputs, createButton, exitButton);
  }

  exitModal() {
    $(".character-modal").remove();
  }

  rollStat() {
    var result = 0;
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
    result = diceRolls[0] + diceRolls[1] + diceRolls[2];
    return result;
  }

  generateRandomCharacter() {
    this.characterName = $(".character-name").val();
    this.playerName = $(".player-name").val();
    this.testInput = $(".alignmentSelect").val();
    console.log(this.testInput);
    $(".modal-content").empty();

  }
}
