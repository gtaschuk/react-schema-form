'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('@material-ui/core/styles');

var _core = require('@material-ui/core');

var _icons = require('@material-ui/icons');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _ComposedComponent = require('./ComposedComponent');

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = function styles(theme) {
    return {
        arrayContainer: {
            display: 'flex',
            flexDirection: 'column'
        },
        arrayItem: {
            position: 'relative',
            paddingTop: '16px',
            margin: theme.spacing.unit * 2 + 'px 0'
        },
        deleteItemButton: {
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 2
        },
        addButton: {
            margin: theme.spacing.unit + 'px'
        }
    };
};

var Array = function (_Component) {
    _inherits(Array, _Component);

    _createClass(Array, null, [{
        key: 'assignItemId',
        value: function assignItemId(item) {
            if (item && !item[Array.ITEM_ID]) {
                // define hidden property with internal id
                Object.defineProperty(item, Array.ITEM_ID, {
                    enumerable: false,
                    writable: true
                });
                item[Array.ITEM_ID] = Array._SEQUENCE++;
            }
            return item;
        }
    }, {
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(props, state) {
            var propsKey = props.form.key;
            if (props.form && propsKey === state.formKey && props.model && props.model[propsKey] === state.model) {
                return state;
            }
            var model = _utils2.default.selectOrSet(propsKey, props.model) || [];
            return {
                formKey: propsKey,
                model: model.map(Array.assignItemId)
            };
        }
    }]);

    function Array(props) {
        _classCallCheck(this, Array);

        var _this = _possibleConstructorReturn(this, (Array.__proto__ || Object.getPrototypeOf(Array)).call(this, props));

        _this.onAppend = function () {
            var empty = void 0;
            if (_this.props.form && _this.props.form.schema && _this.props.form.schema.items) {
                var items = _this.props.form.schema.items;
                if (items.type && items.type.indexOf('object') !== -1) {
                    empty = {};

                    // Check for possible defaults
                    if (!_this.props.options || _this.props.options.setSchemaDefaults !== false) {
                        empty = typeof items['default'] !== 'undefined' ? items['default'] : empty;

                        // Check for defaults further down in the schema.
                        // If the default instance sets the new array item to something falsy, i.e. null
                        // then there is no need to go further down.
                        if (empty) {
                            _utils2.default.traverseSchema(items, function (prop, path) {
                                if (typeof prop['default'] !== 'undefined') {
                                    _utils2.default.selectOrSet(path, empty, prop['default']);
                                }
                            });
                        }
                    }
                } else if (items.type && items.type.indexOf('array') !== -1) {
                    empty = [];
                    if (!_this.props.options || _this.props.options.setSchemaDefaults !== false) {
                        empty = items['default'] || empty;
                    }
                } else {
                    // No type? could still have defaults.
                    if (!_this.props.options || _this.props.options.setSchemaDefaults !== false) {
                        empty = items['default'] || empty;
                    }
                }
            }
            var newModel = _this.state.model;
            Array.assignItemId(empty);
            newModel.push(empty);
            _this.setState({ model: newModel });
            _this.props.onChangeValidate(_this.state.model);
        };

        _this.onDelete = function (index) {
            return function () {
                // console.log('onDelete is called', index);
                var newModel = _this.state.model;
                newModel.splice(index, 1);
                _this.setState({ model: newModel });
                _this.props.onChangeValidate(_this.state.model);
            };
        };

        _this.setIndex = function (index) {
            return function (form) {
                if (form.key) {
                    form.key[form.key.indexOf('')] = index;
                }
            };
        };

        _this.copyWithIndex = function (form, index) {
            var copy = _lodash2.default.cloneDeep(form);
            copy.arrayIndex = index;
            _utils2.default.traverseForm(copy, _this.setIndex(index));
            return copy;
        };

        _this.state = {};
        return _this;
    }

    _createClass(Array, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            // Always start with one empty form unless configured otherwise.
            if (this.props.form.startEmpty !== true && this.state.model.length === 0) {
                this.onAppend();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                classes = _props.classes,
                form = _props.form;

            var arrays = [];
            var model = this.state.model;
            // console.log('Array.render', model);

            var _loop = function _loop(i) {
                var item = model[i];
                arrays.push(_react2.default.createElement(
                    _core.Card,
                    { className: classes.arrayItem, key: item && item[Array.ITEM_ID] || i },
                    _react2.default.createElement(
                        _core.IconButton,
                        { onClick: _this2.onDelete(i), className: classes.deleteItemButton },
                        _react2.default.createElement(_icons.Close, { fontSize: 'small' })
                    ),
                    form.items.map(function (form, index) {
                        return _this2.props.builder(_this2.copyWithIndex(form, i), _this2.props.model, index, _this2.props.mapper, _this2.props.onChange, _this2.props.builder);
                    })
                ));
            };

            for (var i = 0; i < model.length; i++) {
                _loop(i);
            }
            return _react2.default.createElement(
                _react.Fragment,
                null,
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'label',
                        null,
                        this.props.form.title
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: classes.arrayContainer },
                        arrays
                    )
                ),
                _react2.default.createElement(
                    _core.Button,
                    { classes: { root: classes.addButton }, variant: 'contained', color: 'primary', onClick: this.onAppend },
                    this.props.form.add || 'Add'
                )
            );
        }
    }]);

    return Array;
}(_react.Component);

Array.ITEM_ID = '_SCHEMAFORM_ITEM_ID';
Array._SEQUENCE = 1;
exports.default = (0, _ComposedComponent2.default)((0, _styles.withStyles)(styles)(Array));