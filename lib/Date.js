'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ComposedComponent = require('./ComposedComponent');

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by steve on 22/12/15.
 */
var Date = function (_React$Component) {
    _inherits(Date, _React$Component);

    function Date(props) {
        _classCallCheck(this, Date);

        var _this = _possibleConstructorReturn(this, (Date.__proto__ || Object.getPrototypeOf(Date)).call(this, props));

        _this.onDatePicked = _this.onDatePicked.bind(_this);
        return _this;
    }

    _createClass(Date, [{
        key: 'onDatePicked',
        value: function onDatePicked(empty, date) {
            this.props.onChangeValidate(date);
        }
    }, {
        key: 'render',
        value: function render() {
            var value = null;
            if (this.props && this.props.value) {
                value = this.props.value;
            }

            return _react2.default.createElement(
                'div',
                { style: { width: '100%', display: 'block' }, className: this.props.form.htmlClass },
                _react2.default.createElement(_TextField2.default, {
                    id: 'date',
                    label: this.props.form.title,
                    type: 'date',
                    onChange: this.onDatePicked,
                    onShow: null,
                    onDismiss: null,
                    value: value,
                    disabled: this.props.form.readonly,
                    style: this.props.form.style || { width: '100%' } })
            );
        }
    }]);

    return Date;
}(_react2.default.Component);

var _default = (0, _ComposedComponent2.default)(Date);

exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Date, 'Date', 'src/Date.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/Date.js');
}();

;
