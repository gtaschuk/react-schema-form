'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SchemaForm = require('../SchemaForm');

var _SchemaForm2 = _interopRequireDefault(_SchemaForm);

var _shallow = require('react-test-renderer/shallow');

var _shallow2 = _interopRequireDefault(_shallow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('SchemaForm test', function () {

    it('shows SchemaForm', function () {
        var cfg = {
            form: {},
            schema: {
                'type': 'object'
            },
            model: {},
            mapper: {}
        };
        _shallow2.default.render(_react2.default.createElement(_SchemaForm2.default, {
            schema: cfg.schema,
            mapper: cfg.mapper
        }));
        var result = _shallow2.default.getRenderOutput();
        expect(result.type).toEqual('div');
        expect(result.props.children).toEqual([]);
    });
});