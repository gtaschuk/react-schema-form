/**
 * Created by steve on 11/09/15.
 */
import React from 'react';
import utils from './utils';
import Number from './Number';
import Text from './Text';
import TextArea from './TextArea';
import Select from './Select';
import Radios from './Radios';
import Date from './Date';
import Checkbox from './Checkbox';
import Help from './Help';
import ComposedComponent from './ComposedComponent';
import RaisedButton from 'material-ui/RaisedButton';
import _ from 'lodash';
import SchemaForm from './SchemaForm';
import IconButton from 'material-ui/IconButton';

class Array extends React.Component {

    constructor(props) {
        super(props);
        this.onAppend = this.onAppend.bind(this);
        this.onDelete = this.onDelete.bind(this);
        // we have the model here for the entire form, get the model for this array only
        // and add to the state. if is empty, add an entry by calling onAppend directly.
        this.state = {
            model:  utils.selectOrSet(this.props.form.key, this.props.model) || []
        };
        //console.log('constructor', this.props.form.key, this.props.model, this.state.model);
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        model: utils.selectOrSet(this.props.form.key, nextProps.model)
      });
      console.log("CWRP", nextProps.model[this.props.form.key]);
    }

    componentDidMount() {
        // Always start with one empty form unless configured otherwise.
        if(this.props.form.startEmpty !== true && this.state.model.length === 0) {
            this.onAppend();
        }
    }

    onAppend() {
        //console.log('onAppend is called this.state.model', this.state.model);
        var empty;
        if(this.props.form && this.props.form.schema && this.props.form.schema.items) {
            var items = this.props.form.schema.items;
            if (items.type && items.type.indexOf('object') !== -1) {
                empty = {};

                // Check for possible defaults
                if (!this.props.options || this.props.options.setSchemaDefaults !== false) {
                    empty = typeof items['default'] !== 'undefined' ? items['default'] : empty;

                    // Check for defaults further down in the schema.
                    // If the default instance sets the new array item to something falsy, i.e. null
                    // then there is no need to go further down.
                    if (empty) {
                        utils.traverseSchema(items, function(prop, path) {
                            if (typeof prop['default'] !== 'undefined') {
                                utils.selectOrSet(path, empty, prop['default']);
                            }
                        });
                    }
                }

            } else if (items.type && items.type.indexOf('array') !== -1) {
                empty = [];
                if (!this.props.options || this.props.options.setSchemaDefaults !== false) {
                    empty = items['default'] || empty;
                }
            } else {
                // No type? could still have defaults.
                if (!this.props.options || this.props.options.setSchemaDefaults !== false) {
                    empty = items['default'] || empty;
                }
            }
        }
        var newModel = this.state.model;
        newModel.push(empty);
        this.setState({
                model: newModel
            }
        );
        this.props.onChangeValidate(this.state.model);
        //console.log('After append this.state.model', newModel);
    }

    onDelete(index) {
        //console.log('onDelete is called', index);
        var newModel = this.state.model;
        newModel.splice(index, 1);
        this.setState(
            {
                model: newModel
            }
        );
        this.props.onChangeValidate(this.state.model);
    }

    setIndex(index) {
        return function(form) {
          console.log("setting index", form.key, index);
            if (form.key) {
                form.key[form.key.indexOf('')] = index;
            }
        };
    };

    copyWithIndex(form, index) {
      //console.log("form", form);
        var copy = _.cloneDeep(form);
        copy.arrayIndex = index;
        utils.traverseForm(copy, this.setIndex(index));
        return copy;
    };

    itemField(i){
      return function(item, index) {
        var copy = this.copyWithIndex(item, i);
        return this.props.builder(copy, this.state.model, index, this.props.onChange, this.props.mapper, this.props.builder);
      }
    };

    itemFields (item, i) {
        //for(var i = 0; i < model.length; i++ ) {
        let boundOnDelete = this.onDelete.bind(this, i);
        let fields = this.props.form.items.map(this.itemField(i).bind(this));
        //console.log('forms', i, forms);
        return (
          <li key={i} className="list-group-item">
              <IconButton iconClassName="material-icons" tooltip="Remove" onTouchTap={boundOnDelete}>clear</IconButton>
              {fields}
          </li>
        );
    };

    render() {
        //console.log('Array.render', this.props.form.items, this.props.model, this.state.model);
        //var model = this.state.model;
        //console.log('fields', fields);
        var arrays = this.state.model.map(this.itemFields.bind(this));

        return (
            <div>
                <div>
                    <label className="control-lable">{this.props.form.title}</label>
                    <ol className="list-group">
                        {arrays}
                    </ol>
                </div>
                <RaisedButton label={this.props.form.add || 'Add'} secondary={true} onTouchTap={this.onAppend}/>
            </div>
        );
    }
}

export default ComposedComponent(Array);
