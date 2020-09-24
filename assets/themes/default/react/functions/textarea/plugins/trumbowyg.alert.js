(function ($) {
    'use strict';

    $.extend(true, $.trumbowyg, {
        langs: {
            // jshint camelcase:false
            en: {
                alert: 'Alert',
                alerts: {
                    'danger': 'Danger',
                    'info': 'Info',
                    'success': 'Succès',
                    'warning': 'Avertissement'
                }
            }
        }
    });
    // jshint camelcase:true

    var defaultOptions = {
        alertList: [
            'danger',
            'info',
            'success',
            'warning'
        ]
    };

    // Add dropdown with font sizes
    $.extend(true, $.trumbowyg, {
        plugins: {
            alert: {
                init: function (trumbowyg) {
                    trumbowyg.o.plugins.alert = $.extend({},
                      defaultOptions,
                      trumbowyg.o.plugins.alert || {}
                    );

                    trumbowyg.addBtnDef('alert', {
                        dropdown: buildDropdown(trumbowyg),
                        ico: 'preformatted'
                    });
                }
            }
        }
    });

    function setAlert(trumbowyg, type) {
        trumbowyg.$ed.focus();
        trumbowyg.saveRange();
        var text = trumbowyg.range.startContainer.parentElement;
        var selectedText = trumbowyg.getRangeText();
        if ($(text).html() === selectedText) {
            $(text).addClass('alert alert-' + type);
        } else {
            trumbowyg.range.deleteContents();
            var html = '<span class="alert alert-' + type + '">' + selectedText + '</span>';
            var node = $(html)[0];
            trumbowyg.range.insertNode(node);
        }
        trumbowyg.restoreRange();
    }

    function buildDropdown(trumbowyg) {
        var dropdown = [];

        $.each(trumbowyg.o.plugins.alert.alertList, function (index, type) {
            trumbowyg.addBtnDef('alert_' + type, {
                text: '<span class="alert-color alert-' + type + '">' + (trumbowyg.lang.alerts[type] || type) + '</span>',
                hasIcon: false,
                fn: function () {
                    setAlert(trumbowyg, type);
                }
            });
            dropdown.push('alert_' + type);
        });

        return dropdown;
    }
})(jQuery);
