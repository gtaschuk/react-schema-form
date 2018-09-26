'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ComposedComponent = require('./ComposedComponent');

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

var _Checkbox = require('@material-ui/core/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _FormGroup = require('@material-ui/core/FormGroup');

var _FormGroup2 = _interopRequireDefault(_FormGroup);

var _FormControlLabel = require('@material-ui/core/FormControlLabel');

var _FormControlLabel2 = _interopRequireDefault(_FormControlLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import utils from "./utils"

var FormCheckbox = function (_React$Component) {
    _inherits(FormCheckbox, _React$Component);

    function FormCheckbox() {
        _classCallCheck(this, FormCheckbox);

        return _possibleConstructorReturn(this, (FormCheckbox.__proto__ || Object.getPrototypeOf(FormCheckbox)).apply(this, arguments));
    }

    _createClass(FormCheckbox, [{
        key: 'render',
        value: function render() {
            // let value = utils.selectOrSet(this.props.form.key, this.props.model, undefined, this.props.form.type);
            return _react2.default.createElement(
                _FormGroup2.default,
                { row: true },
                _react2.default.createElement(_FormControlLabel2.default, {
                    className: this.props.form.className,
                    label: this.props.form.title,
                    control: _react2.default.createElement(_Checkbox2.default, {
                        name: this.props.form.key.slice(-1)[0],
                        value: this.props.form.title,
                        checked: this.props.value,
                        disabled: this.props.form.readonly,
                        onChange: this.props.onChangeValidate
                    })
                })
            );
        }
    }]);

    return FormCheckbox;
}(_react2.default.Component);

exports.default = (0, _ComposedComponent2.default)(FormCheckbox);