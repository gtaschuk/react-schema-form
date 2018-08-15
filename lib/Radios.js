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
        _classCallCheck(this, Radios);

        return _possibleConstructorReturn(this, (Radios.__proto__ || Object.getPrototypeOf(Radios)).apply(this, arguments));
    }

    _createClass(Radios, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

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
                    this.props.form.titleMap.map(function (item, index) {
                        return _react2.default.createElement(_core.FormControlLabel, {
                            key: index,
                            label: item.name,
                            value: item.value,
                            disabled: _this2.props.form.readonly,
                            control: _react2.default.createElement(_core.Radio, { checked: _this2.props.value === item.value }) });
                    })
                )
            );
        }
    }]);

    return Radios;
}(_react.Component);

exports.default = (0, _ComposedComponent2.default)((0, _styles.withStyles)(styles)(Radios));