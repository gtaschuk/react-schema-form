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

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Select = function (_Component) {
    _inherits(Select, _Component);

    function Select(props) {
        _classCallCheck(this, Select);

        var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

        _initialiseProps.call(_this);

        var _this$props = _this.props,
            model = _this$props.model,
            form = _this$props.form;
        var key = form.key;


        var storedValue = model && Select.getModelKey(model, key) || false;
        var defaultValue = form.schema.default || false;
        var value = !(0, _lodash.isEmpty)(storedValue) && storedValue || defaultValue;

        _this.props.setDefault(key, model, form, value);
        _this.state = {
            currentValue: value
        };
        return _this;
    }

    _createClass(Select, [{
        key: 'render',
        value: function render() {
            var form = this.props.form;

            var menuItems = form.titleMap.map(function (item, idx) {
                return _react2.default.createElement(
                    _core.MenuItem,
                    { key: idx, value: item.value },
                    item.name
                );
            });
            return _react2.default.createElement(
                _core.FormControl,
                { style: { width: '100%' } },
                _react2.default.createElement(
                    _core.InputLabel,
                    { htmlFor: 'age-simple' },
                    this.props.form.title
                ),
                _react2.default.createElement(
                    _core.MuiSelect,
                    {
                        disabled: this.props.form.readonly,
                        placeholder: form.title,
                        value: this.state.currentValue || '',
                        onChange: this.onSelected },
                    menuItems
                )
            );
        }
    }], [{
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(props) {
            if (props.model && props.form.key) {
                return {
                    currentValue: Select.getModelValue(props.model, props.form)
                };
            }
        }
    }]);

    return Select;
}(_react.Component);

Select.getModelKey = function (model, key) {
    if (Array.isArray(key)) {
        return key.reduce(function (cur, nxt) {
            return cur[nxt] || {};
        }, model);
    } else {
        return model[key];
    }
};

Select.getModelValue = function (model, _ref) {
    var key = _ref.key,
        titleMap = _ref.titleMap;
    return Select.getModelKey(model, key) || (titleMap != null ? titleMap[0].value : '');
};

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.onSelected = function (_ref2) {
        var currentValue = _ref2.target.value;

        _this2.setState({ currentValue: currentValue });
        _this2.props.onChangeValidate(event);
    };
};

exports.default = (0, _ComposedComponent2.default)(Select);