class GroupFinder {
  constructor() {
    // Selectors
    this.$body = $("body");

    // TODO: Remove this and replace with underscores when committing to GitHub
    this.meetupDotComAPIKey = "18b7135c3c7e616338b15512e1a26";
    this.groupsArray = [];

    // Bindings
    this.render = this.render.bind(this);
    this.queryMeetupAPI = this.queryMeetupAPI.bind(this);
  }

  createQueryURL() {
    // Grab query params
    var queryCity = $("#meetup-city-input").val();
    var queryState = $("#meetup-state-input").val();
    var queryCountry = $("#meetup-country-input").val();
    var queryRadius = $("#meetup-radius-input").val();

    // Construct actual query
    var queryURLBase = "https://api.meetup.com/groups?key=" + this.meetupDotComAPIKey + "&sign=true&page=10&topic=dnd";
    var cityURLParameter = "&city=" + queryCity;
    var stateURLParameter = "&state=" + queryState;
    var countryURLParameter = "&country=" + queryCountry;
    var radiusURLParameter = "&radius=" + queryRadius;
    var queryURL = queryURLBase + cityURLParameter + stateURLParameter + countryURLParameter + radiusURLParameter;

    return queryURL;
  }

  queryMeetupAPI() {
    // Construct Query URL
    var queryURL = this.createQueryURL();

    // Make AJAX request for local groups
    $.ajax({
      dataType: "jsonp",
      method: "GET",
      url: queryURL,
      success: this.createMeetupGroupDivs,
      error: function (error) {
        console.log("An error was returned from the server:", error);
      }
    });
  }

  createMeetupGroupDivs(response) {
    // We want to create X number of shield divs on our bottom section
    this.groupsArray = response.results;

    for (var groupIndex = 0; groupIndex < this.groupsArray.length; groupIndex++) {
      var groupName = this.groupsArray[groupIndex].name;
      var $meetupGroup = $("<div>", {
        text: groupName,
        class: "meetup-group",
        "data-group-index": groupIndex,
        click: function() {
          console.log("Hello");
        }
      })
      $("#group-name-sidebar").append($meetupGroup);
    }
  }

  closeGroupFinderModal() {
    $("#group-finder-modal-container").remove();
  }

  render() {
    // Create inputs
    var $meetupCityInput = $("<input>", {
      id: "meetup-city-input",
      placeholder: "City Name",
      value: "Irvine"
    });
    var $meetupStateInput = $("<input>", {
      id: "meetup-state-input",
      placeholder: "State Name",
      value: "CA"
    });
    var $meetupCountryInput = $("<input>", {
      id: "meetup-country-input",
      placeholder: "Country Name",
      value: "US"
    });
    var $meetupRadiusInput = $("<input>", {
      id: "meetup-radius-input",
      placeholder: "Radius",
      value: "25"
    });
    var $meetupSearchButton = $("<button>", {
      id: "meetup-search-submit-button",
      text: "Search",
      click: this.queryMeetupAPI
    })

    // Create modal header and append inputs / button
    var $groupFinderModalHeader = $("<div>", {
      id: "group-finder-modal-header"
    })
    $groupFinderModalHeader.append($meetupCityInput, $meetupStateInput, $meetupCountryInput, $meetupRadiusInput, $meetupSearchButton);

    // Create modal exit button
    var $groupFinderModalExitButton = $("<div>", {
      id: "group-finder-modal-exit-button",
      text: "X",
      click: this.closeGroupFinderModal,
    })

    // Create modal body
    var $groupFinderModalBody = $("<div>", {
      id: "group-finder-modal-body"
    })
    var $groupNameSidebar = $("<div>", {
      id: "group-name-sidebar"
    })
    var $groupInfoSection = $("<div>", {
      id: "group-info-section"
    })
    $groupFinderModalBody.append($groupNameSidebar, $groupInfoSection);

    // Create a modal and append modal header to modal
    var $groupFinderModal = $("<div>", {
      id: "group-finder-modal"
    });
    $groupFinderModal.append($groupFinderModalExitButton, $groupFinderModalHeader, $groupFinderModalBody);

    // Create modal container and append modal to modal container
    var $groupFinderModalContainer = $("<div>", {
      id: "group-finder-modal-container"
    });
    $groupFinderModalContainer.append($groupFinderModal);

    // Append all this to the body
    this.$body.append($groupFinderModalContainer);
  }
}
