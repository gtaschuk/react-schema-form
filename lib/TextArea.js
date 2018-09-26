'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _ComposedComponent = require('./ComposedComponent');

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextArea = function (_React$Component) {
    _inherits(TextArea, _React$Component);

    function TextArea(props) {
        _classCallCheck(this, TextArea);

        var _this = _possibleConstructorReturn(this, (TextArea.__proto__ || Object.getPrototypeOf(TextArea)).call(this, props));

        var model = props.model,
            form = props.form,
            value = props.value;
        var key = form.key;

        _this.props.setDefault(key, model, form, value);
        return _this;
    }

    _createClass(TextArea, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                form = _props.form,
                error = _props.error,
                value = _props.value,
                onChangeValidate = _props.onChangeValidate;

            return _react2.default.createElement(_TextField2.default, {
                type: form.type,
                label: form.title,
                placeholder: form.placeholder,
                helperText: error || form.description,
                onChange: onChangeValidate,
                error: !!error,
                value: value || '',
                multiline: true,
                rows: form.rows,
                rowsMax: form.rowsMax,
                disabled: form.readonly,
                fullWidth: true
            });
        }
    }]);

    return TextArea;
}(_react2.default.Component);

exports.default = (0, _ComposedComponent2.default)(TextArea);