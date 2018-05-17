"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ComposedComponent = require('./ComposedComponent');

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

var _TextField = require("material-ui/TextField");

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by steve on 22/12/15.
 */
var DateField = function (_React$Component) {
    _inherits(DateField, _React$Component);

    function DateField(props) {
        _classCallCheck(this, DateField);

        var _this = _possibleConstructorReturn(this, (DateField.__proto__ || Object.getPrototypeOf(DateField)).call(this, props));

        _this.onDatePicked = _this.onDatePicked.bind(_this);
        return _this;
    }

    _createClass(DateField, [{
        key: "onDatePicked",
        value: function onDatePicked(e) {
            console.log(Date);
            var d = new Date(e.target.value);
            console.log(d.toJSON());
            this.props.onChangeValidate(d);
        }
    }, {
        key: "render",
        value: function render() {
            var value = null;
            if (this.props && this.props.value) {
                value = this.props.value;
            }

            return _react2.default.createElement(
                "div",
                {
                    style: { width: "100%", display: "block" },
                    className: this.props.form.htmlClass
                },
                _react2.default.createElement(_TextField2.default, {
                    id: "date",
                    label: this.props.form.title,
                    type: "date",
                    onChange: this.onDatePicked,
                    disabled: this.props.form.readonly
                })
            );
        }
    }]);

    return DateField;
}(_react2.default.Component);

var _default = (0, _ComposedComponent2.default)(DateField);

exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(DateField, "DateField", "src/Date.js");

    __REACT_HOT_LOADER__.register(_default, "default", "src/Date.js");
}();

;
