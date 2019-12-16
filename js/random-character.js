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
    var $modalContent = $(".blacksmith");
    $modalContent.empty();
    let inputContainer = $("<div>").addClass("input-container");
    var characterNameInput = $("<input>").addClass("random-character-name input").attr("placeholder", "Character Name");
    var playerNameInput = $("<input>").addClass("random-player-name input").attr("placeholder", "Player Name");
    var generateButton = $("<div>").addClass("generate-button button-style");
    let hammer = $("<div>").addClass("hammer");
    let generateText = $("<div>").addClass("generate-random-text").text("Generate");
    generateButton.append(hammer, generateText);

    inputContainer.append(characterNameInput, playerNameInput, generateButton);
    $modalContent.append(inputContainer);
  }

  generateRandomCharacter() {
    var randomRacePicker = Math.floor(Math.random() * 9);
    var randomClassPicker = Math.floor(Math.random() * 12);
    var randomBackgroundPicker = Math.floor(Math.random() * 3);
    var randomAlignmentPicker = Math.floor(Math.random() * 9);
    this.selectedStats.characterName = $(".random-character-name").val();
    this.selectedStats.playerName = $(".random-player-name").val();
    this.selectedStats.raceSelected = this.races[randomRacePicker];
    this.selectedStats.classSelected = this.classes[randomClassPicker];
    this.selectedStats.backgroundSelected = this.backgrounds[randomBackgroundPicker];
    this.selectedStats.alignmentSelected = this.alignments[randomAlignmentPicker];
    this.selectedStats.weapons = this.weapons;
    var newCharacter = new GeneratedCharacter(this.selectedStats);
  }
}
