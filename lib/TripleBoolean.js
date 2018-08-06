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
var TripleBoolean = function (_Component) {
    _inherits(TripleBoolean, _Component);

    function TripleBoolean(props) {
        _classCallCheck(this, TripleBoolean);

        var _this = _possibleConstructorReturn(this, (TripleBoolean.__proto__ || Object.getPrototypeOf(TripleBoolean)).call(this, props));

        _this.state = {
            yesChecked: false,
            noChecked: false
        };
        _this.divStyle = {
            padding: "20px"
        };
        _this.butStyle = {
            color: "#07f"
        };
        var _this$props = _this.props,
            model = _this$props.model,
            form = _this$props.form,
            value = _this$props.value;
        var key = form.key;


        _this.props.setDefault(key, model, form, value);
        return _this;
    }

    _createClass(TripleBoolean, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState({
                yesChecked: nextProps.value === "yes",
                noChecked: nextProps.value === "no"
            });
        }
    }, {
        key: 'displaySwitch',
        value: function displaySwitch() {
            var _this2 = this;

            var renderBlock = null;

            if (this.props.value === 'unanswered') {
                renderBlock = _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        _core.Button,
                        { onClick: function onClick(e) {
                                return _this2.props.onChangeValidate(e, 'yes');
                            } },
                        'yes'
                    ),
                    _react2.default.createElement(
                        _core.Button,
                        { onClick: function onClick(e) {
                                return _this2.props.onChangeValidate(e, 'no');
                            } },
                        'no'
                    )
                );
            } else {
                renderBlock = _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        _core.Button,
                        null,
                        this.props.value
                    ),
                    _react2.default.createElement(
                        _core.Button,
                        { onClick: function onClick(e) {
                                return _this2.props.onChangeValidate(e, 'unanswered');
                            } },
                        'X'
                    )
                );
            }

            return renderBlock;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: this.props.form.htmlClass },
                this.props.form.title,
                ':',
                _react2.default.createElement('br', null),
                this.displaySwitch()
            );
        }
    }]);

    return TripleBoolean;
}(_react.Component);

exports.default = (0, _ComposedComponent2.default)(TripleBoolean);