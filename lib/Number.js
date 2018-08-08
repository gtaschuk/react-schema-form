'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ComposedComponent = require('./ComposedComponent');

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

var _core = require('@material-ui/core');

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

        _this.isNumeric = function (n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        };

        _this.isEmpty = function (n) {
            return !n || 0 === n.length;
        };

        _this.preValidationCheck = function (e) {
            if (_this.isNumeric(e.target.value)) {
                _this.setState({
                    lastSuccessfulValue: e.target.value
                });
                _this.props.onChangeValidate(e);
            } else if (_this.isEmpty(e.target.value)) {
                _this.setState({
                    lastSuccessfulValue: e.target.value
                });
                _this.props.onChangeValidate(e);
            } else {
                _this.numberField.current.value = _this.state.lastSuccessfulValue;
            }
        };

        _this.state = {
            lastSuccessfulValue: _this.props.value
        };
        _this.numberField = _react2.default.createRef();
        return _this;
    }

    _createClass(Number, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                form = _props.form,
                error = _props.error;

            return _react2.default.createElement(_core.TextField, {
                type: form.type,
                label: form.title,
                placeholder: form.placeholder,
                helperText: error || form.description,
                error: !!error,
                onChange: this.preValidationCheck,
                value: this.state.lastSuccessfulValue,
                ref: this.numberField,
                disabled: form.readonly,
                fullWidth: true
            });
        }
    }], [{
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(nextProps) {
            return {
                lastSuccessfulValue: nextProps.value
            };
        }

        /**
         * Prevent the field from accepting non-numeric characters.
         * @param e
         */

    }]);

    return Number;
}(_react.Component);

exports.default = (0, _ComposedComponent2.default)(Number);