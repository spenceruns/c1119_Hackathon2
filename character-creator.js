class CharacterCreator {
  constructor() {
    this.$characterCreator = $("#character-creator");
    this.$body = $("body");
    this.races = null;
    this.classes = null;
    this.backgrounds = null;
    this.weapons = null;
    this.characterName = null;
    this.playerName = null;
    this.addClickHandlers = this.addClickHandlers.bind(this);
    this.makeRandomCharacterScreen = this.makeRandomCharacterScreen.bind(this);
    this.getCharacterData = this.getCharacterData.bind(this);
    this.getCharacterData();
    this.addClickHandlers();
  }

  addClickHandlers() {
    this.$characterCreator.on("click", this.render);
    this.$body.on("click", ".cc-exit-button", this.exitModal);
    this.$body.on("click", ".random-character", this.makeRandomCharacterScreen);
    this.$body.on("click", ".create-character", this.makeCreateCharacterScreen);
  }

  getCharacterData() {
    // var getClasses = {
    //   dataType: "json",
    //   url: "https://api.open5e.com/classes/",
    //   method: "GET",
    //   success: (function (response) {
    //     this.classes = response;
    //   }).bind(this),
    //   error: function (error) {
    //     console.log("error", error)
    //   }
    // };
    // $.ajax(getClasses);

    var self = this;
    var getRaces = {
      dataType: "json",
      url: "https://api.open5e.com/races/",
      method: "GET",
      success: function(response) {
        self.races = response.results;
        console.log("inside", self.races)
      },
      error: function (error) {
        console.log("error", error)
      }
    };
    $.ajax(getRaces);
    console.log('this races', this.races)

    // var getBackgrounds = {
    //   dataType: "json",
    //   url: "https://api.open5e.com/backgrounds/",
    //   method: "GET",
    //   success: (function (response) {
    //     this.backgrounds = response;
    //   }).bind(this),
    //   error: function (error) {
    //     console.log("error", error)
    //   }
    // };
    // $.ajax(getBackgrounds);

    // var getWeapons = {
    //   dataType: "json",
    //   url: "https://api.open5e.com/weapons/",
    //   method: "GET",
    //   success: (function (response) {
    //     this.weapons = response;
    //   }).bind(this),
    //   error: function (error) {
    //     console.log("error", error)
    //   }
    // };
    // $.ajax(getWeapons);
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
    var characterNameInput = $("<input>").addClass("character-name").attr("placeholder", "Character Name");
    var playerNameInput = $("<input>").addClass("player-name").attr("placeholder", "Player Name");;
    var randomButton = $("<button>").addClass("generate-random").text("Generate");
    var exitButton = $("<div>").addClass("cc-exit-button").html("&times;");
    console.log(this.races);

    $modalContent.append(characterNameInput, playerNameInput, randomButton, exitButton);
  }

  makeCreateCharacterScreen() {
    var $modalContent = $(".modal-content");
    $modalContent.empty();
    var characterNameInput = $("<input>").addClass("character-name").attr("placeholder", "Character Name");
    var playerNameInput = $("<input>").addClass("player-name").attr("placeholder", "Player Name");
    console.log(this.races);
    var createButton = $("<button>").addClass("generate-character").text("Generate");
    var exitButton = $("<div>").addClass("cc-exit-button").html("&times;");

    $modalContent.append(characterNameInput, playerNameInput, createButton, exitButton);
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
    $(".modal-content").empty();

  }
}
