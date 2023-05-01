# -*- coding: utf-8 -*-
# Copyright (c) 2020, SMB and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class ItemLastPriceChild(Document):
	pass

@frappe.whitelist(allow_guest=True)
def get_item_last_price(item, customer):

	item_last_price = frappe.db.sql("select sii.rate from `tabSales Invoice` as si join `tabSales Invoice Item` as sii on si.name = sii.parent where customer = %s and sii.item_code = %s order by si.creation desc limit 3", (customer, item))

	return item_last_price
