chrome.extension.sendMessage({}, function(response) {
  const readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      // ----------------------------------------------------------
      // This part of the script triggers when page is done loading
      console.log("Hello. This message was sent from scripts/inject.js");
      // ----------------------------------------------------------
    }

	getTables();
	
  }, 10);
});

const getTables = () => {
  console.log($("table"));
};
