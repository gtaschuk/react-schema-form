'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ComposedComponent = require('./ComposedComponent');

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * There is no default number picker as part of Material-UI.
 * Instead, use a TextField and validate.
 */
var Number = function (_Component) {
    _inherits(Number, _Component);

    function Number(props) {
        _classCallCheck(this, Number);

        var _this = _possibleConstructorReturn(this, (Number.__proto__ || Object.getPrototypeOf(Number)).call(this, props));

        var _this$props = _this.props,
            model = _this$props.model,
            form = _this$props.form,
            value = _this$props.value;
        var key = form.key;

        _this.props.setDefault(key, model, form, value);
        return _this;
    }

    _createClass(Number, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                error = _props.error,
                form = _props.form,
                value = _props.value,
                onChangeValidate = _props.onChangeValidate;

            console.log('number: ' + form.title, value);
            return _react2.default.createElement(_TextField2.default, {
                type: form.type,
                label: form.title,
                placeholder: form.placeholder,
                helperText: error || form.description,
                error: !!error,
                onChange: onChangeValidate,
                value: value || '',
                ref: this.numberField,
                disabled: form.readonly,
                fullWidth: true
            });
        }
    }]);

    return Number;
}(_react.Component);

exports.default = (0, _ComposedComponent2.default)(Number);