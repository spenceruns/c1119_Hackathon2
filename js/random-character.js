class RandomCharacter {
  constructor(dataFromAPI) {
    this.selectedStats = {};
    this.classes = dataFromAPI.classes;
    this.races = dataFromAPI.races;
    this.backgrounds = dataFromAPI.backgrounds;
    this.weapons = dataFromAPI.weapons;
    this.alignments = dataFromAPI.alignments;
    this.makeRandomCharacterScreen();
  }

  makeRandomCharacterScreen() {
    let $modalContent = $(".blacksmith");
    $modalContent.empty();
    let backButton = $("<div>").addClass("back-button");
    let inputContainer = $("<div>").addClass("input-container");
    let characterNameInput = $("<input>").addClass("random-character-name input").attr("placeholder", "Character Name");
    let playerNameInput = $("<input>").addClass("random-player-name input").attr("placeholder", "Player Name");
    let generateButton = $("<div>").addClass("generate-button button-style");
    let hammer = $("<div>").addClass("hammer");
    let generateText = $("<div>").addClass("generate-random-text").text("Generate");
    generateButton.append(hammer, generateText);

    inputContainer.append(characterNameInput, playerNameInput, generateButton);
    $modalContent.append(inputContainer, backButton);
    $(characterNameInput).focus();
  }

  generateRandomCharacter() {
    let randomRacePicker = Math.floor(Math.random() * 9);
    let randomClassPicker = Math.floor(Math.random() * 12);
    let randomBackgroundPicker = Math.floor(Math.random() * 3);
    let randomAlignmentPicker = Math.floor(Math.random() * 9);
    this.selectedStats.characterName = $(".random-character-name").val();
    this.selectedStats.playerName = $(".random-player-name").val();
    this.selectedStats.raceSelected = this.races[randomRacePicker];
    this.selectedStats.classSelected = this.classes[randomClassPicker];
    this.selectedStats.backgroundSelected = this.backgrounds[randomBackgroundPicker];
    this.selectedStats.alignmentSelected = this.alignments[randomAlignmentPicker];
    this.selectedStats.weapons = this.weapons;
    let newCharacter = new GeneratedCharacter(this.selectedStats);
  }
}
