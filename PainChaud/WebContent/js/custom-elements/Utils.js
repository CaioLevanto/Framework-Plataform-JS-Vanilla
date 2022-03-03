export default function doAjax({async, pathname, url, type, field, params}) {
    $.ajax({
        url: '/Painchaud/rest/' + pathname + url,
        async: async,
        dataType: type,
        type: type,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        data: JSON.stringify({
            field: field,
            params: params
        }),
        success: function (d) { return d },
        error: function (e) { return e }
    });
};

export function getPageSelected() {
    const opt = $('.custom-option.selected')[0];
    return (opt.getAttribute('url') + '-' + opt.getAttribute('custom-type'));
}