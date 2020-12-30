sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/ui/model/json/JSONModel"
	], function (Controller, JSONModel) {
		"use strict";

		return Controller.extend("leverx.app.controller.FirstPage", {
			onInit: function () {
				// initialize model with some technical configuration
				this.getView().setModel(new JSONModel({
					// configuration for visibility of screen parts
					displayEx1: true,
					displayEx2: false,
					displayEx3: false,

					// configuration for flex box order property
					order0: 1,
					order1: 1,
					order2: 1,

					gf0: 1,
					gf1: 4,
					gf2: 1,

					// configuration for form grid layout
					labelSpanL: 1,
					labelSpanM: 1,
					labelSpanS: 12,
					emptySpanL: 0,
					emptySpanM: 0,
					emptySpanS: 0
				}));
			}
		});
	}
);
