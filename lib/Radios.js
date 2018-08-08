'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _core = require('@material-ui/core');

var _styles = require('@material-ui/core/styles');

var _ComposedComponent = require('./ComposedComponent');

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = function styles(theme) {
    return {
        formControl: {
            marginTop: theme.spacing.unit
        },
        group: {
            margin: theme.spacing.unit + 'px 0'
        }
    };
};

var Radios = function (_Component) {
    _inherits(Radios, _Component);

    function Radios() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Radios);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Radios.__proto__ || Object.getPrototypeOf(Radios)).call.apply(_ref, [this].concat(args))), _this), _this.renderItems = function (form) {
            return form.titleMap.map(function (item, index) {
                return _react2.default.createElement(_core.FormControlLabel, {
                    key: index,
                    control: _react2.default.createElement(_core.Radio, { checked: _this.props.value === item.value }),
                    label: item.name,
                    value: item.value,
                    disabled: form.readonly
                });
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Radios, [{
        key: 'render',
        value: function render() {
            var classes = this.props.classes;

            return _react2.default.createElement(
                _core.FormControl,
                { component: 'fieldset', className: classes.formControl },
                _react2.default.createElement(
                    _core.FormLabel,
                    { component: 'legend' },
                    this.props.form.title
                ),
                _react2.default.createElement(
                    _core.RadioGroup,
                    {
                        value: this.props.value,
                        name: this.props.form.title,
                        onChange: this.props.onChangeValidate,
                        className: classes.group },
                    this.renderItems(this.props.form)
                )
            );
        }
    }]);

    return Radios;
}(_react.Component);

exports.default = (0, _ComposedComponent2.default)((0, _styles.withStyles)(styles)(Radios));