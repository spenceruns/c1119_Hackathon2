class GroupFinder {
  constructor() {
    // Selectors
    this.$body = $("body");

    // TODO: Remove this and replace with underscores when committing to GitHub
    this.meetupDotComAPIKey = "18b7135c3c7e616338b15512e1a26";
    this.meetupGroups = [];

    // Bindings
    this.render = this.render.bind(this);
    this.queryMeetupAPI = this.queryMeetupAPI.bind(this);
    this.createMeetupGroupDivs = this.createMeetupGroupDivs.bind(this);
    this.showClickedGroupInfo = this.showClickedGroupInfo.bind(this);
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
    var $groupNameSidebar = $("#group-name-sidebar");
    $groupNameSidebar.empty();

    // We want to create X number of shield divs on our bottom section
    this.meetupGroups = response.results;

    for (var groupIndex = 0; groupIndex < this.meetupGroups.length; groupIndex++) {
      var groupName = this.meetupGroups[groupIndex].name;
      var $meetupGroup = $("<div>", {
        text: groupName,
        class: "meetup-group",
        "data-group-index": groupIndex,
        click: this.showClickedGroupInfo,
      })
      $groupNameSidebar.append($meetupGroup);
    }
  }

  showClickedGroupInfo(event) {
    var $groupInfoSection = $("#group-info-section");
    $groupInfoSection.empty();
    var $clickedGroupDiv = $(event.currentTarget);
    var clickedGroupDivIndex = $clickedGroupDiv.attr("data-group-index");
    var clickedGroupInfo = this.meetupGroups[clickedGroupDivIndex];
    var $clickedGroupName = $("<h2>", {
      id: "group-name",
      text: clickedGroupInfo.name
    });
    var $clickedGroupDescription = $("<div>", {
      id: "group-description",
      html: "<strong>Description: </strong>" + clickedGroupInfo.description
    });
    var $clickedGroupLinkContainer = $("<div>", {
      id: "group-link-container",
      html: "<strong>Link: </strong>",
      style: "display: inline"
    });
    var $clickedGroupLink = $("<a>", {
      id: "group-link",
      target: "blank",
      href: clickedGroupInfo.link,
      text: clickedGroupInfo.link
    });
    $clickedGroupLinkContainer.append($clickedGroupLink);
    var $clickedGroupLocation = $("<div>", {
      id: "group-location",
      html: "<strong>Location: </strong>" + clickedGroupInfo.city + ", " + clickedGroupInfo.state,
    })
    var $clickedGroupOrganizerName = $("<div>", {
      id: "group-organizer-name",
      html: "<strong>Organizer Name: </strong>" + clickedGroupInfo.organizer_name,
    })
    $groupInfoSection.append($clickedGroupName, $clickedGroupDescription, $clickedGroupLinkContainer, $clickedGroupLocation, $clickedGroupOrganizerName);
    console.log(clickedGroupInfo);
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
