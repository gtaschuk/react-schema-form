'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (ComposedComponent) {
    var _class, _temp, _initialiseProps;

    var defaultProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return _temp = _class = function (_Component) {
        _inherits(Composed, _Component);

        function Composed(props) {
            _classCallCheck(this, Composed);

            var _this = _possibleConstructorReturn(this, (Composed.__proto__ || Object.getPrototypeOf(Composed)).call(this, props));

            _initialiseProps.call(_this);

            var value = Composed.defaultValue(_this.props);
            var validationResult = _utils2.default.validate(_this.props.form, value);
            _this.state = {
                value: value,
                valid: validationResult.valid || !value,
                error: !validationResult.valid && (value ? validationResult.error.message : null) || _this.props.errorText
            };
            return _this;
        }

        _createClass(Composed, [{
            key: 'render',
            value: function render() {
                return _react2.default.createElement(ComposedComponent, _extends({}, defaultProps, this.props, this.state, {
                    onChangeValidate: this.onChangeValidate }));
            }
        }], [{
            key: 'getDerivedStateFromProps',
            value: function getDerivedStateFromProps(props) {
                var value = Composed.defaultValue(props);
                // console.log('getDerivedStateFromProps', value)
                var validationResult = _utils2.default.validate(props.form, value);
                return {
                    value: value,
                    valid: validationResult.valid || !value,
                    error: !validationResult.valid && value ? validationResult.error.message : null
                };
            }
        }, {
            key: 'defaultValue',
            value: function defaultValue(props) {
                // check if there is a value in the model, if there is, display it. Otherwise, check if
                // there is a default value, display it.
                // console.log('Text.defaultValue key', props.form);
                // console.log('Text.defaultValue model', props.model);
                var value = void 0;
                if (props.form && props.form.key) {
                    value = _utils2.default.selectOrSet(props.form.key, props.model);
                }
                // console.log('Text defaultValue value = ', value);

                // check if there is a default value
                if (_lodash2.default.isNil(value) && props.form['default']) {
                    value = props.form['default'] || '';
                }

                if (_lodash2.default.isNil(value) && props.form.schema && props.form.schema['default']) {
                    value = props.form.schema['default'];
                }

                // Support for Select
                // The first value in the option will be the default.
                if (_lodash2.default.isNil(value) && props.form.titleMap && props.form.titleMap[0].value) {
                    value = props.form.titleMap[0].value;
                }
                return value;
            }
        }]);

        return Composed;
    }(_react.Component), _initialiseProps = function _initialiseProps() {
        var _this2 = this;

        this.onChangeValidate = function (e, v) {
            var value = null;
            switch (_this2.props.form.schema.type) {
                case 'integer':
                case 'number':
                    value = e.target.value.indexOf('.') === -1 ? parseInt(e.target.value, 10) : parseFloat(e.target.value);

                    if (isNaN(value)) {
                        value = undefined;
                    }
                    break;
                case 'boolean':
                    value = e.target.checked;
                    break;
                case 'tBoolean':
                    if (e.target.value !== 'yes' || e.target.value !== 'no') {
                        value = v;
                    }
                    break;
                case 'array':
                    value = e;
                    break;
                case 'object':
                default:
                    value = e.target.value;
            }

            //console.log('onChangeValidate this.props.form, value', this.props.form, value);
            var validationResult = _utils2.default.validate(_this2.props.form, value);

            _this2.setState({
                value: value,
                valid: validationResult.valid,
                error: validationResult.valid ? null : validationResult.error.message
            });

            _this2.props.onChange(_this2.props.form.key, value);
        };
    }, _temp;
};