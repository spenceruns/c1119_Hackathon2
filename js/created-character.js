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
    let $modalContent = $(".blacksmith");
    $modalContent.empty();
    let backButton = $("<div>").addClass("back-button");
    let inputContainer = $("<div>").addClass("input-container");
    let characterNameInput = $("<input>").addClass("create-character-name input").attr("placeholder", "Character Name");
    let playerNameInput = $("<input>").addClass("create-player-name input").attr("placeholder", "Player Name");
    let generateButton = $("<div>").addClass("generate-button button-style");
    let hammer = $("<div>").addClass("hammer");
    let generateText = $("<div>").addClass("generate-created-text").text("Generate");
    generateButton.append(hammer, generateText);
    let raceSelect = $("<select>").addClass("race-select").attr("name", "Race");
    let raceInput = $("<option>").text("Race...");
    raceSelect.append(raceInput);
    for (let index = 0; index < this.races.length; index++) {
      raceInput = $("<option>").attr("value", index).text(this.races[index].name);
      raceSelect.append(raceInput);
    }
    let classSelect = $("<select>").addClass("class-select");
    let classInput = $("<option>").text("Class...");
    classSelect.append(classInput);
    for (let index = 0; index < this.classes.length; index++) {
      classInput = $("<option>").attr("value", index).text(this.classes[index].name);
      classSelect.append(classInput);
    }
    let backgroundSelect = $("<select>").addClass("background-select");
    let backgroundInput = $("<option>").text("Background...");
    backgroundSelect.append(backgroundInput);
    for (let index = 0; index < this.backgrounds.length; index++) {
      let backgroundInput = $("<option>").attr("value", index).text(this.backgrounds[index].name);
      backgroundSelect.append(backgroundInput);
    }
    let alignmentSelect = $("<select>").addClass("alignment-select");
    let alignmentInput = $("<option>").text("Alignment...");
    alignmentSelect.append(alignmentInput);
    for (let index = 0; index < this.alignments.length; index++) {
      let alignmentInput = $("<option>").attr("value", index).text(this.alignments[index].name);
      alignmentSelect.append(alignmentInput);
    }

    inputContainer.append(characterNameInput, playerNameInput, raceSelect, classSelect, backgroundSelect, alignmentSelect, generateButton);
    $modalContent.append(inputContainer, backButton);
    $(characterNameInput).focus();
  }

  generateCreatedCharacter() {
    this.selectedStats.characterName = $(".create-character-name").val();
    this.selectedStats.playerName = $(".create-player-name").val();
    this.selectedStats.raceSelected = this.races[$(".race-select").val()];
    this.selectedStats.classSelected = this.classes[$(".class-select").val()];
    this.selectedStats.backgroundSelected = this.backgrounds[$(".background-select").val()];
    this.selectedStats.alignmentSelected = this.alignments[$(".alignment-select").val()];
    this.selectedStats.weapons = this.weapons;
    let newCharacter = new GeneratedCharacter(this.selectedStats);
  }
}
