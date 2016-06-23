(function() {
  function loadScript(path) {
    // This is the only time I'll ever use document.write, I promise!
    document.write('<script src="' + path + '"></script>');
  }
  function loadClassLib() {
    loadScript('../node_modules/resig-class/index.js');
  }
  function loadJQueryLib() {
    // Get any jquery=___ param from the query string.
    var jqversion = location.search.match(/[?&]jquery=(.*?)(?=&|$)/);
    // If a version was specified, use that version from code.jquery.com.
    if (jqversion) {
      loadScript('http://code.jquery.com/jquery-' + jqversion[1] + '.js');
    } else {
      // Default to local jquery
      loadScript('../node_modules/jquery/dist/jquery.js');
    }
  }
  loadClassLib();
  loadJQueryLib();
}());
