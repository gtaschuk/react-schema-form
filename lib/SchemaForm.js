'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _Number = require('./Number');

var _Number2 = _interopRequireDefault(_Number);

var _Text = require('./Text');

var _Text2 = _interopRequireDefault(_Text);

var _TextArea = require('./TextArea');

var _TextArea2 = _interopRequireDefault(_TextArea);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _Radios = require('./Radios');

var _Radios2 = _interopRequireDefault(_Radios);

var _Date = require('./Date');

var _Date2 = _interopRequireDefault(_Date);

var _Checkbox = require('./Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _Help = require('./Help');

var _Help2 = _interopRequireDefault(_Help);

var _Array = require('./Array');

var _Array2 = _interopRequireDefault(_Array);

var _FieldSet = require('./FieldSet');

var _FieldSet2 = _interopRequireDefault(_FieldSet);

var _TripleBoolean = require('./TripleBoolean');

var _TripleBoolean2 = _interopRequireDefault(_TripleBoolean);

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _isNil = require('lodash/isNil');

var _isNil2 = _interopRequireDefault(_isNil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SchemaForm = function (_Component) {
    _inherits(SchemaForm, _Component);

    function SchemaForm(props) {
        _classCallCheck(this, SchemaForm);

        var _this = _possibleConstructorReturn(this, (SchemaForm.__proto__ || Object.getPrototypeOf(SchemaForm)).call(this, props));

        _this.mapper = {
            'number': _Number2.default,
            'text': _Text2.default,
            'password': _Text2.default,
            'textarea': _TextArea2.default,
            'select': _Select2.default,
            'radios': _Radios2.default,
            'date': _Date2.default,
            'checkbox': _Checkbox2.default,
            'help': _Help2.default,
            'array': _Array2.default,
            'tBoolean': _TripleBoolean2.default,
            'fieldset': _FieldSet2.default
        };

        _this.setDefault = function (key, model, form, value) {
            var currentValue = _utils2.default.selectOrSet(key, model);

            // If current value is not setted and exist a default, apply the default over the model
            if ((0, _isNil2.default)(currentValue) && !(0, _isNil2.default)(value)) {
                _this.props.onModelChange(key, value, form.type, form);
            }
        };

        _this.onChange = function (key, val) {
            //console.log('SchemaForm.onChange', key, val);
            _this.props.onModelChange(key, val);
        };

        _this.builder = function (form, model, index, mapper, onChange, builder) {
            var Field = _this.mapper[form.type];
            if (!Field) {
                return null;
            }

            // Apply conditionals to review if this field must be rendered
            if (form.condition && _utils2.default.safeEval(form.condition, { model: model }) === false) {
                return null;
            }

            var key = form.key && form.key.join('.') || index;

            var errors = _this.props && _this.props.errors ? _this.props.errors : {};
            var error = key in errors ? errors[key] : null;

            return _react2.default.createElement(Field, {
                model: model,
                form: form,
                key: key,
                onChange: onChange,
                setDefault: _this.setDefault,
                mapper: mapper,
                builder: builder,
                errorText: error
            });
        };

        return _this;
    }

    // Assign default values and save it to the model


    _createClass(SchemaForm, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var merged = _utils2.default.merge(this.props.schema, this.props.form, this.props.ignore, this.props.option);
            var mapper = this.mapper;
            if (this.props.mapper) {
                mapper = (0, _merge2.default)(this.mapper, this.props.mapper);
            }
            var forms = merged.map(function (form, index) {
                return _this2.builder(form, _this2.props.model, index, mapper, _this2.onChange, _this2.builder);
            });

            return _react2.default.createElement(
                'div',
                { className: this.props.className },
                forms
            );
        }
    }]);

    return SchemaForm;
}(_react.Component);

exports.default = SchemaForm;