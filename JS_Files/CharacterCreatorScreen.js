class CharacterCreator {
  constructor() {
    this.$characterCreator = $("#character-creator");
    this.$body = $("body");
    this.races = null;
    this.classes = null;
    this.backgrounds = null;
    this.alignments = [
      {name: "Lawful Good", desc: "A lawful good character typically acts with compassion and always with honor and a sense of duty, though will often regret taking any action they fear would violate their code; even if they recognize such action as being good. Such characters include righteous knights, paladins, and most dwarves. Lawful good creatures include the noble golden dragons."},
      {name: "Lawful Neutral", desc: "A lawful neutral character typically believes strongly in lawful concepts such as honor, order, rules, and tradition, but often follows a personal code in addition to, or even in preference to, one set down by a benevolent authority. Examples of lawful neutral characters include a soldier who always follows orders, a judge or enforcer who adheres mercilessly to the letter of the law, and a disciplined monk."},
      {name: "Lawful Evil", desc: "A lawful evil character sees a well-ordered system as being easier to exploit and shows a combination of desirable and undesirable traits. Examples of this alignment include tyrants, devils, corrupt officials, and undiscriminating mercenary types who have a strict code of conduct."},
      {name: "Neutral Good", desc: "A neutral good character typically acts altruistically, without regard for or against lawful precepts such as rules or tradition. A neutral good character has no problems with cooperating with lawful officials, but does not feel beholden to them. In the event that doing the right thing requires the bending or breaking of rules, they do not suffer the same inner conflict that a lawful good character would."},
      {name: "True Neutral", desc: "A true neutral character is neutral on both axes and tends not to feel strongly towards any alignment, or actively seeks their balance. Druids frequently follow this dedication to balance."},
      {name: "Neutral Evil", desc: "A neutral evil character is typically selfish and has no qualms about turning on allies-of-the-moment, and usually makes allies primarily to further their own goals. A neutral evil character has no compunctions about harming others to get what they want, but neither will they go out of their way to cause carnage or mayhem when they see no direct benefit for themselves."},
      {name: "Chaotic Good", desc: "A chaotic good character does what is necessary to bring about change for the better, disdains bureaucratic organizations that get in the way of social improvement, and places a high value on personal freedom, not only for oneself, but for others as well. Chaotic good characters usually intend to do the right thing, but their methods are generally disorganized and often out of sync with the rest of society."},
      {name: "Chaotic Neutral", desc: "A chaotic neutral character is an individualist who follows their own heart and generally shirks rules and traditions. Although chaotic neutral characters promote the ideals of freedom, it is their own freedom that comes first; good and evil come second to their need to be free."},
      {name: "Chaotic Evil", desc: "A chaotic evil character tends to have no respect for rules, other people's lives, or anything but their own desires, which are typically selfish and cruel. They set a high value on personal freedom, but do not have much regard for the lives or freedom of other people. Chaotic evil characters do not work well in groups because they resent being given orders and do not usually behave themselves unless there is no alternative. Examples of this alignment include higher forms of undead, such as liches, and violent killers who strike for pleasure rather than profit."}
    ];
    this.weapons = null;
    this.dataFromAPI = {};
    this.randomCharacterScreen = null;
    this.createdCharacterScreen = null;
    this.render = this.render.bind(this);
    this.getCharacterData = this.getCharacterData.bind(this);
    this.addClickHandlers = this.addClickHandlers.bind(this);
    this.generateRandomCharacter = this.generateRandomCharacter.bind(this);
    this.generateCreatedCharacter = this.generateCreatedCharacter.bind(this);
    this.makeRandomCharacterScreen = this.makeRandomCharacterScreen.bind(this);
    this.makeCreateCharacterScreen = this.makeCreateCharacterScreen.bind(this);
    this.getCharacterData();
    this.addClickHandlers();
  }

  addClickHandlers() {
    this.$characterCreator.on("click", this.render);
    this.$body.on("click", ".cc-exit-button", this.exitModal);
    this.$body.on("click", ".random-character", this.makeRandomCharacterScreen);
    this.$body.on("click", ".create-character", this.makeCreateCharacterScreen);
    this.$body.on("click", ".generate-random-button", this.generateRandomCharacter);
    this.$body.on("click", ".generate-created-button", this.generateCreatedCharacter);
    this.$body.on("click", ".print-button", this.print);
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
    this.dataFromAPI = {
      classes: this.classes,
      races: this.races,
      backgrounds: this.backgrounds,
      weapons: this.weapons,
      alignments: this.alignments
    };
    var modalPage = $("<div>").addClass("character-modal");
    var modalContent = $("<div>").addClass("modal-content");
    var randomButton = $("<button>").addClass("random-character").text("Random Character");
    var createButton = $("<button>").addClass("create-character").text("Create Character");
    var exitButton = $("<div>").addClass("cc-exit-button").html("&times;");

    modalContent.append(randomButton, createButton, exitButton);
    modalPage.append(modalContent);
    this.$body.append(modalPage);
  }

  makeRandomCharacterScreen() {
    this.randomCharacterScreen = new RandomCharacter(this.dataFromAPI);
  }

  makeCreateCharacterScreen() {
    this.createdCharacterScreen = new CreatedCharacter(this.dataFromAPI);
  }

  exitModal() {
    $(".character-modal").remove();
  }

  generateRandomCharacter() {
    var emptyField = false;
    if ($(".random-character-name").val() === "") {
      $(".random-character-name").css("border", "5px solid red");
      emptyField = true;
    }
    if ($(".random-player-name").val() === "") {
      $(".random-player-name").css("border", "5px solid red");
      emptyField = true;
    }
    if(emptyField) return false;
    this.randomCharacterScreen.generateRandomCharacter()
  }

  generateCreatedCharacter() {
    var emptyField = false;
    if ($(".create-character-name").val() === "") {
      $(".create-character-name").css("border", "5px solid red");
      emptyField = true;
    }
    if ($(".create-player-name").val() === "") {
      $(".create-player-name").css("border", "5px solid red");
      emptyField = true;
    }
    if (emptyField) return false;
    this.createdCharacterScreen.generateCreatedCharacter()
  }

  print() {
    printJS({
      printable: 'created-character',
      type: 'html',
      css: 'style.css',
    })
  }
}
