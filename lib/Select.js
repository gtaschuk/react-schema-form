'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ComposedComponent = require('./ComposedComponent');

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

var _MenuItem = require('@material-ui/core/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _Select = require('@material-ui/core/Select');

var _Select2 = _interopRequireDefault(_Select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = require('react-hot-loader').enterModule;

    enterModule && enterModule(module);
})();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getModelValue = function getModelValue(model, _ref) {
    var key = _ref.key,
        titleMap = _ref.titleMap;

    var result = void 0;
    if (Array.isArray(key)) {
        result = key.reduce(function (cur, nxt) {
            return cur && cur[nxt];
        }, model);
    } else {
        result = model[key];
    }
    return result || (titleMap != null ? titleMap[0].value : '');
};

var Select = function (_Component) {
    _inherits(Select, _Component);

    function Select(props) {
        _classCallCheck(this, Select);

        var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

        _this.onSelected = function (event) {
            var currentValue = event.target.value;
            _this.setState({
                currentValue: currentValue
            });
            _this.props.onChangeValidate(event);
        };

        _this.state = {
            currentValue: getModelValue(_this.props.model, _this.props.form)
        };
        return _this;
    }

    _createClass(Select, [{
        key: 'render',
        value: function render() {
            var menuItems = this.props.form.titleMap.map(function (item, idx) {
                return _react2.default.createElement(
                    _MenuItem2.default,
                    { key: idx, value: item.value },
                    item.name
                );
            });
            return _react2.default.createElement(
                'div',
                { className: this.props.form.htmlClass },
                _react2.default.createElement(
                    _Select2.default,
                    {
                        value: this.state.currentValue,
                        placeholder: this.props.form.title,
                        disabled: this.props.form.readonly,
                        onChange: this.onSelected,
                        fullWidth: true },
                    menuItems
                )
            );
        }
    }, {
        key: '__reactstandin__regenerateByEval',
        // @ts-ignore
        value: function __reactstandin__regenerateByEval(key, code) {
            // @ts-ignore
            this[key] = eval(code);
        }
    }], [{
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(props) {
            if (props.model && props.form.key) {
                return {
                    currentValue: getModelValue(props.model, props.form)
                };
            }
        }
    }]);

    return Select;
}(_react.Component);

var _default = (0, _ComposedComponent2.default)(Select);

exports.default = _default;
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(getModelValue, 'getModelValue', 'src/Select.js');
    reactHotLoader.register(Select, 'Select', 'src/Select.js');
    reactHotLoader.register(_default, 'default', 'src/Select.js');
    leaveModule(module);
})();

;