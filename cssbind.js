/*global jQuery*/

/**
 * Bind element CSS to inputs values
 */

(function ($) {
	'use strict';

	$.bindcss = function (t, elem, options) {
		var plugin = this,
			defaults = {
				event: "change",
				useData: true,
				trigger: true // trigger event on binding
			},
			$elem = $(elem),
			$t = $(t),
			addByData,
			apply;
		
		addByData = function () {
			$("input[data-bindcss=" + plugin.attr("id") + "]");
		};
		
		apply = function (prop, val) {
			$t.css($(this).data("bindcss-prop"), $(this).val());
		};
		
		plugin.init = function () {
			plugin.settings = $.extend({}, defaults, options);
			
			if (plugin.settings.useData) {
				$elem = $.extend({}, $elem, addByData);
			}
			
			$elem.on(plugin.settings.event, apply);
			if (plugin.settings.trigger) {
				$elem.each(apply);
			}
		};
		plugin.init();
	};

	$.fn.bindcss = function (elem, options) {
		return this.each(function () {
			if (undefined === $(this).data('bindcss')) {
				var plugin = new $.bindcss(this, elem, options);
				$(this).data('bindcss', plugin);
			}
		});
	};
}(jQuery));
