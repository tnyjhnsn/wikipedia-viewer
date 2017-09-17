$(document).ready(function() {
  $("#search-btn").on("click", function() {
    search();
  });
  $("#search-txt").on("keypress", function(e) {
    if (e.keyCode == 13) {
      search();
    }
  });
});

function search() {
  var html = "";

  // use jasonp to avoid "Cross-Origin Request Blocked" issues
  $.ajax({
    url: "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=" + $("#search-txt").val(),
    dataType: "jsonp",
    type: "POST",
    headers: {
      "Api-User-Agent": "WikiViewer/1.0"
    },
    success: function(data) {
      var wikis = data.query.search;
      if (wikis.length === 0) {
        html = "Nothing matches your request. Please enter a different search."
      } else {
        for (var wiki in wikis) {
          html += '<div class="wiki-box"><h3><a href="https://en.wikipedia.org/wiki/' +
            wikis[wiki].title + '"target="_blank">' + wikis[wiki].title + '</a></h3>' +
            wikis[wiki].snippet + '</div>';
        }
      }
      $("#wikis").html(html);
    }
  });
}
