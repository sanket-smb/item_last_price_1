frappe.ui.form.on("Sales Invoice Item", {
  item_code: async function(frm,cdt,cdn) {
    // console.log('item selected', locals[cdt][cdn], locals[cdt]);
    var child = locals[cdt][cdn];
    var item_index = child.idx;

    if (child.item_code && cur_frm.doc.customer) {
      frappe.call({
          "method": "item_last_price.item_last_price.doctype.item_last_price_child.item_last_price_child.get_item_last_price",
          args: {
              "item": child.item_code,
              "customer": cur_frm.doc.customer
          },
          freeze: true,
          freeze_message: __("Processing"),
          callback: async function(r) {
              var len = r.message.length;
              // console.log(r.message[0], item_index);
              var last_sold_price = r.message[0] ? r.message[0][0] : null
              if (!cur_frm.doc.hasOwnProperty("item_prices")){
                cur_frm.doc.item_prices = []
              }

              if (cur_frm.doc.item_prices.hasOwnProperty(parseInt(item_index)-1)) {
                cur_frm.doc.item_prices[parseInt(item_index)-1].item = child.item_code
                cur_frm.doc.item_prices[parseInt(item_index)-1].last_sold_price=last_sold_price
              } else {
                var childTable = cur_frm.add_child("item_prices");
                childTable.item=child.item_code
                childTable.last_sold_price=last_sold_price
              }

              cur_frm.refresh_fields("item_prices");

          }
      });
    }
    else {
      if (cur_frm.doc.item_prices.hasOwnProperty(parseInt(item_index)-1)) {
        cur_frm.doc.item_prices[parseInt(item_index)-1].item = null
        cur_frm.doc.item_prices[parseInt(item_index)-1].last_sold_price = null
      }
    }
	}
})
