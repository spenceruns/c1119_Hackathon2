class CreatedCharacter {
  constructor(dataFromAPI) {
    this.selectedStats = {};
    this.classes = dataFromAPI.classes;
    this.races = dataFromAPI.races;
    this.backgrounds = dataFromAPI.backgrounds;
    this.weapons = dataFromAPI.weapons;
    this.alignments = dataFromAPI.alignments;
    this.makeCreateCharacterScreen = this.makeCreateCharacterScreen.bind(this);
    this.generateCreatedCharacter = this.generateCreatedCharacter.bind(this);
    this.makeCreateCharacterScreen();
  }

  makeCreateCharacterScreen() {
    var $modalContent = $(".modal-content");
    $modalContent.empty();
    var inputs = $("<div>").addClass("input-container");
    var characterNameInput = $("<input>").addClass("create-character-name").attr("placeholder", "Character Name");
    var playerNameInput = $("<input>").addClass("create-player-name").attr("placeholder", "Player Name");
    var createButton = $("<button>").addClass("generate-created-button").text("Generate");
    var exitButton = $("<div>").addClass("cc-exit-button").html("&times;");
    var raceSelect = $("<select>").addClass("race-select").attr("name", "Race");
    var raceInput = $("<option>").text("Race...");
    raceSelect.append(raceInput);
    for (var index = 0; index < this.races.length; index++) {
      raceInput = $("<option>").attr("value", index).text(this.races[index].name);
      raceSelect.append(raceInput);
    }
    var classSelect = $("<select>").addClass("class-select");
    var classInput = $("<option>").text("Class...");
    classSelect.append(classInput);
    for (var index = 0; index < this.classes.length; index++) {
      classInput = $("<option>").attr("value", index).text(this.classes[index].name);
      classSelect.append(classInput);
    }
    var backgroundSelect = $("<select>").addClass("background-select");
    var backgroundInput = $("<option>").text("Background...");
    backgroundSelect.append(backgroundInput);
    for (var index = 0; index < this.backgrounds.length; index++) {
      var backgroundInput = $("<option>").attr("value", index).text(this.backgrounds[index].name);
      backgroundSelect.append(backgroundInput);
    }
    var alignmentSelect = $("<select>").addClass("alignment-select");
    var alignmentInput = $("<option>").text("Alignment...");
    alignmentSelect.append(alignmentInput);
    for (var index = 0; index < this.alignments.length; index++) {
      var alignmentInput = $("<option>").attr("value", index).text(this.alignments[index].name);
      alignmentSelect.append(alignmentInput);
    }

    inputs.append(characterNameInput, playerNameInput, raceSelect, classSelect, backgroundSelect, alignmentSelect);
    $modalContent.append(inputs, createButton, exitButton);
  }

  generateCreatedCharacter() {
    this.selectedStats.characterName = $(".create-character-name").val();
    this.selectedStats.playerName = $(".create-player-name").val();
    this.selectedStats.raceSelected = this.races[$(".race-select").val()];
    this.selectedStats.classSelected = this.classes[$(".class-select").val()];
    this.selectedStats.backgroundSelected = this.backgrounds[$(".background-select").val()];
    this.selectedStats.alignmentSelected = this.alignments[$(".alignment-select").val()];
    this.selectedStats.weapons = this.weapons;
    $(".character-modal").empty();
    var newCharacter = new GeneratedCharacter(this.selectedStats);
    var exitButton = $("<div>").addClass("cc-exit-button").html("&times;");
    var printButton = $("<button>").addClass("print-button").text("Print Character Sheet");
    $(".character-modal").append(exitButton, printButton);
  }
}
