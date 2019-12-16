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
    this.checkForEmtpyInputs = this.checkForEmtpyInputs.bind(this);

    // Add click handler to GroupFinder button
    $("#group-finder").click(this.render);
  }

  createQueryURL() {
    // Grab query params
    let queryCity = $("#meetup-city").val();
    let queryState = $("#meetup-state").val();
    let queryRadius = $("#meetup-radius").val();

    // Construct actual query
    let queryURLBase = "https://api.meetup.com/groups?key=" + this.meetupDotComAPIKey + "&sign=true&page=9&topic=dnd";
    let cityURLParameter = "&city=" + queryCity;
    let stateURLParameter = "&state=" + queryState;
    let countryURLParameter = "&country=US";
    let radiusURLParameter = "&radius=" + queryRadius;
    let queryURL = queryURLBase + cityURLParameter + stateURLParameter + countryURLParameter + radiusURLParameter;

    return queryURL;
  }

  queryMeetupAPI() {
    // Construct Query URL
    let queryURL = this.createQueryURL();

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

    let loadingModal = $("<div>").addClass("loading-modal").text("Loading...");
    $(".group-finder").append(loadingModal);
  }

  createMeetupGroupDivs(response) {
    let $modalBody = $(".group-finder");
    $modalBody.empty();
    let $modalExitButton = $("<div>", {
      class: "exit-button",
      click: this.closeGroupFinderModal
    })
    $modalBody.append($modalExitButton);

    let $meetupGroupContainer = $("<div>", {
      id: "meetup-group-container"
    })
    $modalBody.append($meetupGroupContainer);

    let $modalBackButton = $("<div>", {
      class: "back-button",
      click: this.render
    })
    $meetupGroupContainer.append($modalBackButton);

    // We want to create X number of shield divs on our bottom section
    this.meetupGroups = response.results;

    for (let groupIndex = 0; groupIndex < this.meetupGroups.length; groupIndex++) {
      let groupName = this.meetupGroups[groupIndex].name;
      let $meetupGroup = $("<div>", {
        text: groupName,
        class: "meetup-group",
        "data-group-index": groupIndex,
        click: this.showClickedGroupInfo
      }).css("background-image", `url("./assets/group-paper-${groupIndex}.png")`);
      $meetupGroupContainer.append($meetupGroup);
    }
  }

  showClickedGroupInfo(event) {
    // Figure out which group was clicked, then display a modal inside of the #meetup-group-container
    let $clickedGroupDiv = $(event.currentTarget);
    let clickedGroupDivIndex = $clickedGroupDiv.attr("data-group-index");
    let clickedGroupInfo = this.meetupGroups[clickedGroupDivIndex];
    let $clickedGroupName = $("<h3>", {
      id: "meetup-group-name",
      text: clickedGroupInfo.name
    });
    let $clickedGroupDescription = $("<div>", {
      id: "meetup-group-description",
      html: "<strong>Description: </strong>" + clickedGroupInfo.description
    });
    let $clickedGroupLinkContainer = $("<div>", {
      id: "meetup-group-link-container",
      html: "<strong>Link: </strong>",
      style: "display: inline"
    });
    let $clickedGroupLink = $("<a>", {
      id: "meetup-group-link",
      target: "blank",
      href: clickedGroupInfo.link,
      text: clickedGroupInfo.link
    });
    $clickedGroupLinkContainer.append($clickedGroupLink);
    let $clickedGroupLocation = $("<div>", {
      id: "meetup-group-location",
      html: "<strong>Location: </strong>" + clickedGroupInfo.city + ", " + clickedGroupInfo.state,
    })
    let $clickedGroupOrganizerName = $("<div>", {
      id: "meetup-group-organizer-name",
      html: "<strong>Organizer Name: </strong>" + clickedGroupInfo.organizer_name,
    })
    let $clickedGroupInfoContainerExitButton = $("<div>", {
      class: "exit-button",
      click: this.closeGroupInfoModal
    })
    let $clickedGroupInfoContainer = $("<div>", {
      id: "meetup-group-info-container"
    })
    $clickedGroupInfoContainer.append($clickedGroupName, $clickedGroupDescription, $clickedGroupLinkContainer, $clickedGroupLocation, $clickedGroupOrganizerName, $clickedGroupInfoContainerExitButton);
    $("#meetup-group-container").append($clickedGroupInfoContainer);
  }

  closeGroupFinderModal() {
    $(".group-finder").remove();
  }

  closeGroupInfoModal() {
    $("#meetup-group-info-container").remove();
  }

  render() {
    $(".group-finder").remove();
    let $modalContainer = $("<div>", {
      class: "group-finder modal"
    })
    let $modal = $("<div>", {
      id: "group-finder-modal"
    })
    $modalContainer.append($modal);
    this.$body.append($modalContainer);

    let title = $("<div>").addClass("title").text("Group Finder");

    // Create exit button
    let $modalExitButton = $("<div>", {
      class: "exit-button",
      click: this.closeGroupFinderModal
    })
    $modalContainer.append($modalExitButton, title);


    // Create inputs
    let $meetupCityInput = $("<input>", {
      id: "meetup-city",
      class: "input",
      placeholder: "City (e.g. Irvine)",
    });
    let $meetupStateInput = $("<input>", {
      id: "meetup-state",
      class: "input",
      placeholder: "State (e.g. CA)",
    });
    let $meetupRadiusInput = $("<input>", {
      id: "meetup-radius",
      class: "input",
      placeholder: "Radius (e.g. 25)",
    });
    let $meetupSearchButton = $("<div>", {
      class: "meetup-search button-style",
      text: "Search",
      click: this.checkForEmtpyInputs
    })
    let $modalBody = $("<div>", {
      class: "input-container"
    })
    $modalBody.append($meetupCityInput, $meetupStateInput, $meetupRadiusInput, $meetupSearchButton);
    $modal.append($modalBody);
    $meetupCityInput.focus();
  }

  checkForEmtpyInputs() {
    let emptyField = false;
    if ($("#meetup-city").val() === "") {
      $("#meetup-city").css("border", "5px solid red");
      emptyField = true;
    }
    if ($("#meetup-state").val() === "") {
      $("#meetup-state").css("border", "5px solid red");
      emptyField = true;
    }
    if ($("#meetup-radius").val() === "") {
      $("#meetup-radius").css("border", "5px solid red");
      emptyField = true;
    }
    if (emptyField) return false;
    this.queryMeetupAPI()
  }

}
