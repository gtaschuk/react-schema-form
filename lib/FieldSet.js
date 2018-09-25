'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FormControl = require('@material-ui/core/FormControl');

var _FormControl2 = _interopRequireDefault(_FormControl);

var _styles = require('@material-ui/core/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = function styles(theme) {
    return {
        root: {
            marginTop: theme.spacing.unit
        }
    };
};

var FieldSet = function (_Component) {
    _inherits(FieldSet, _Component);

    function FieldSet() {
        _classCallCheck(this, FieldSet);

        return _possibleConstructorReturn(this, (FieldSet.__proto__ || Object.getPrototypeOf(FieldSet)).apply(this, arguments));
    }

    _createClass(FieldSet, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                form = _props.form,
                mapper = _props.mapper,
                builder = _props.builder,
                model = _props.model,
                onChange = _props.onChange,
                classes = _props.classes;
            // now render all the items in the fieldset

            var forms = form.items.map(function (f, index) {
                return builder(f, model, index, onChange, mapper, builder);
            });

            return _react2.default.createElement(
                _FormControl2.default,
                { component: 'fieldset', className: classes.root },
                _react2.default.createElement(
                    'div',
                    null,
                    forms
                )
            );
        }
    }]);

    return FieldSet;
}(_react.Component);

exports.default = (0, _styles.withStyles)(styles)(FieldSet);