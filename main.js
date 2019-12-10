$(document).ready(initializeApp);

function initializeApp() {
  var groupFinderPage = new GroupFinder();
  $("#group-finder").click(groupFinderPage.render);
}
