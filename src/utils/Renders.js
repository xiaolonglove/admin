"use strict";
var React = require("react");
var _ = require("lodash");


var antd_1 = require("antd");


var default_1 = /** @class */ (function () {
    function default_1() {
    }
    
    /**
     * 状态 Render 构造器
     * @param statusMap 一个StatusMap 默认为  { success: { name: '正常', value: 0 }, error: { name: '异常', value: 1 } }
     * @param def 数据没有找到时的显示名称 默认为 '未知'
    */
    default_1.statusRender = function (statusMap, def, onlyText) {
        if (statusMap === void 0) { statusMap = { success: { name: '正常', value: 0 }, error: { name: '异常', value: 1 } }; }
        if (def === void 0) { def = '未知'; }
        if (onlyText === void 0) { onlyText = false; }
        var STYLES = {};
        var VALUES = {};
        _.keys(statusMap).map(function (style) {
            var key = statusMap[style].value + '';
            STYLES[key] = style;
            VALUES[key] = statusMap[style].name;
        });
        var fn = function (val) {
            var key = val + '';
            var style = 'default';
            var text = def === false ? val : def;
            if (_.has(VALUES, key)) {
                text = VALUES[key];
            }
            if (_.has(STYLES, key)) {
                style = STYLES[key];
            }
            return onlyText ? text : React.createElement(antd_1.Badge, { status: style, text: text });
        };
        fn.update = function (statusMap) {
            _.keys(statusMap).map(function (style) {
                var key = statusMap[style].value + '';
                STYLES[key] = style;
                VALUES[key] = statusMap[style].name;
            });
        };
        return fn;
    };
    
    return default_1;
}());
export default default_1;
