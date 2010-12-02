$("a.form.dialog").live("click", function(evt) {
  var elt = evt.target;
  var doAjax = true;

  var opts = {};
  opts.autoOpen = true;

  if ($(elt).attr("dialog-width")) { opts.width = parseInt($(elt).attr("dialog-width")); }
  if ($(elt).attr("dialog-height")) { opts.height = parseInt($(elt).attr("dialog-height")); }
  if ($(elt).attr("dialog-modal")) { opts.modal = $(elt).attr("dialog-modal") == "true"; }
  if ($(elt).attr("dialog-title")) { opts.title = $(elt).attr("dialog-title"); }
  if ($(elt).attr("dialog-noajax")) { doAjax = false; }

  var afterSuccess = $(elt).attr("dialog-after-success");
  var formUrl = $(elt).attr("dialog-content-url");

  $("body").append("<div></div>");
  var dialog = $("body > div:last")

  opts.open = function(evt, ui) {
    $(this).load(formUrl, null,
      function(responseText, textStatus, xhr) {
          if (doAjax) {
            $("form", this).live("submit", function() {
              jQuery.post(
                this.action,
                $(this).serialize(),
                function(data, textStatus, xhr) {
                  if (textStatus == "success") {
                    $(dialog).html(data);
                    if (afterSuccess) {
                      window[afterSuccess]();
                    } else if (xhr.getResponseHeader("X-MAx-Redirect")) {
                      window.location.href = xhr.getResponseHeader("X-MAx-Redirect");
                    } else if (xhr.getResponseHeader("X-MAx-Close-Dialog")) {
                      $(dialog).dialog("close");
                    } else if (xhr.getResponseHeader("X-MAx-Alert")) {
                      alert(xhr.getResponseHeader("X-MAx-Alert"));
                    }
                  } else {
                    alert(textStatus+ ": " + data);
                  }
                }
              );
              return false;
            });
          }

          var w = $(dialog).attr("scrollWidth");
          $(dialog).dialog("option", "width", w);
          $(dialog).dialog("option", "position", "center");
      });
  };

  $(dialog).dialog(opts);

/*
  $("#" + $(elt).attr("dialog-control-id")).click(function() {
    if ($(dialog).dialog("isOpen")) {
      $(dialog).dialog("close");
    } else {
      $(dialog).dialog("open");
    }
  });
*/
});
