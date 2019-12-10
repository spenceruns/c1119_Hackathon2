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
    var $modalContent = $(".modal-content");
    $modalContent.empty();
    var characterNameInput = $("<input>").addClass("random-character-name").attr("placeholder", "Character Name");
    var playerNameInput = $("<input>").addClass("random-player-name").attr("placeholder", "Player Name");
    var randomButton = $("<button>").addClass("generate-random-button").text("Generate");
    var exitButton = $("<div>").addClass("cc-exit-button").html("&times;");

    $modalContent.append(characterNameInput, playerNameInput, randomButton, exitButton);
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
    $(".character-modal").empty();
    var exitButton = $("<div>").addClass("cc-exit-button").html("&times;");
    $(".character-modal").append(exitButton);
  }
}
