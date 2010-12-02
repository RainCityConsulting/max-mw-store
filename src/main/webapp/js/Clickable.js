$(function() {
  $(".clickable.product[product-id]").live("click", function(evt) {
    var id = $(this).attr("product-id")
    window.location.href = MAx.context + "/products/" + id;
  });

  $(".clickable.cat[cat-id]").live("click", function(evt) {
    var id = $(this).attr("cat-id")
    window.location.href = MAx.context + "/cats/" + id;
  });
});
