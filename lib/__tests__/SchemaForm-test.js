'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('../index');

var _shallow = require('react-test-renderer/shallow');

var _shallow2 = _interopRequireDefault(_shallow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('SchemaForm test', function () {

  it('shows SchemaForm', function () {
    var shallowRenderer = new _shallow2.default();
    var cfg = {
      form: {},
      schema: {
        'type': 'object'
      },
      model: {},
      mapper: {}
    };
    shallowRenderer.render(_react2.default.createElement(_index.SchemaForm, {
      schema: cfg.schema,
      mapper: cfg.mapper
    }));
    var result = shallowRenderer.getRenderOutput();
    expect(result.type).toEqual('div');
    expect(result.props.children).toEqual([]);
  });
});