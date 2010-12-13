function loadBillingRegionInputs(countryId, selectedRegionId) {
  AddressQuery.findRegionsByCountry(countryId, function(regions) {
    if (regions.length == 0) {
      $("tr.billing-address-region-select").hide();
      $("tr.billing-address-region-input").show();
    } else {
      var opts = '';
      for (var i = 0; i < regions.length; i++) {
        var r = regions[i];
        opts += '<option value="'+r.id+'">'+r.name+'</option>'
      }

      $("tr.billing-address-region-select select").empty().append(opts);

      if (selectedRegionId > 0) {
        $("tr.billing-address-region-select select").val(selectedRegionId);
      }

      $("tr.billing-address-region-select").show();
      $("tr.billing-address-region-input").hide();
    }
  });
}

function loadShippingRegionInputs(countryId, selectedRegionId) {
  AddressQuery.findRegionsByCountry(countryId, function(regions) {
    if (regions.length == 0) {
      $("tr.shipping-address-region-select").hide();
      $("tr.shpiping-address-region-input").show();
    } else {
      var opts = '';
      for (var i = 0; i < regions.length; i++) {
        var r = regions[i];
        opts += '<option value="'+r.id+'">'+r.name+'</option>'
      }

      $("tr.shipping-address-region-select select").empty().append(opts);

      if (selectedRegionId > 0) {
        $("tr.shipping-address-region-select select").val(selectedRegionId);
      }

      $("tr.shipping-address-region-select").show();
      $("tr.shipping-address-region-input").hide();
    }
  });
}

$(function() {
  $("select.billing-address-country").change(function(evt) {
    loadBillingRegionInputs(this.value, 0);
  });

  $("select.shipping-address-country").change(function(evt) {
    loadshippingRegionInputs(this.value, 0);
  });

  $("#same_as_billing").change(function(evt) {
    if ($(this).attr("checked")) {
      $("#new_shipping_address").hide();
      $("#new_shipping_address_div").hide();
      $("#shipping_address_list").hide();
    } else {
      $("#new_shipping_address").show();

      #if ($addresses.isDefined())
      $("#new_shipping_address_div").show();
      #else
      $("#new_shipping_address").show();
      $("#new_shipping_address_checkbox").attr("checked", true);
      #end

      $("#shipping_address_list").show();
      $("#new_shipping_address_checkbox").trigger("change");
    }
  });

  $("#email").change(function(evt) {
    $("#register_email").attr("value", $(this).attr("value"));
  });

  $("#new_billing_address_checkbox").change(function(evt) {
    if ($(this).attr("checked")) {
      $("#new_billing_address").show();
      $("#billing_address_list").hide();
    } else {
      $("#new_billing_address").hide();
      $("#billing_address_list").show();
    }
  });

  $("#new_shipping_address_checkbox").change(function(evt) {
    if ($(this).attr("checked")) {
      $("#new_shipping_address").show();
      $("#shipping_address_list").hide();
    } else {
      $("#new_shipping_address").hide();
      $("#shipping_address_list").show();
    }
  });

  $("#new_account_checkbox").change(function(evt) {
    if ($(this).attr("checked")) {
      $("#new_account").show();
    } else {
      $("#new_account").hide();
    }
  });

  $("#billing_address_list div.address").each(function(i, e) {
    if ($(this).attr("address-id") == "$!checkout.billingAddressId") {
      $(this).addClass("selected");
    }
  });

  $("#shipping_address_list div.address").each(function(i, e) {
    if ($(this).attr("address-id") == "$!checkout.shippingAddressId") {
      $(this).addClass("selected");
    }
  });

  $("#billing_address_list div.address").click(function(evt) {
    var aid = $(this).attr("address-id");

    $("#billing_address_list div.address").each(function(i, e) {
      $(this).removeClass("selected");
    });

    $(this).addClass("selected");
    $("#billing_address_id").val(aid);
  });

  $("#shipping_address_list div.address").click(function(evt) {
    var aid = $(this).attr("address-id");

    $("#shipping_address_list div.address").each(function(i, e) {
      $(this).removeClass("selected");
    });

    $(this).addClass("selected");
    $("#shipping_address_id").val(aid);
  });

  #if ($addresses.isEmpty())
  $("#new_billing_address_div").hide();
  $("#new_shipping_address_div").hide();
  #end

  $("#new_billing_address_checkbox").trigger("change");
  $("#new_shipping_address_checkbox").trigger("change");
  $("#new_account_checkbox").trigger("change");

  #if ($checkout.billingAddress.region)
  loadBillingRegionInputs($("select.billing-address-country").val(),
      $checkout.billingAddress.region.id);
  $("tr.billing-address-region-select select").val($checkout.billingAddress.region.id);
  #else
  loadBillingRegionInputs($("select.billing-address-country").val(), 0);
  #end

  #if ($checkout.shippingAddress.region)
  loadShippingRegionInputs($("select.shipping-address-country").val(),
      $checkout.shippingAddress.region.id);
  $("tr.shipping-address-region-select select").val($checkout.shippingAddress.region.id);
  #else
  loadShippingRegionInputs($("select.shipping-address-country").val(), 0);
  #end

  $("#same_as_billing").trigger("change");
  $("#email").trigger("change");
});