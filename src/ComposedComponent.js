import React, {Component} from 'react';
import utils from './utils';

export default (ComposedComponent, defaultProps = {}) => class Composer extends Component {

    constructor(props) {
        super(props);
        let value = Composer.defaultValue(this.props);
        let validationResult = utils.validate(this.props.form, value);
        this.state = {
            value: value,
            valid: !!(validationResult.valid || !value),
            error: !validationResult.valid && (value ? validationResult.error.message : null) || this.props.errorText
        };
    }

    static getDerivedStateFromProps(nextProps) {
      let value = Composer.defaultValue(nextProps);
      let validationResult = utils.validate(nextProps.form, value);
      return {
        value,
        valid: !!(validationResult.valid || !value),
        error: !validationResult.valid && value ? validationResult.error.message : null
      }
    }

    /**
     * Called when <input> value changes.
     * @param e The input event.
     * @param v e.target.value equivalent when it otherwise wouldn't be there.
     */
    onChangeValidate = (e,v) => {
        let value = null;
        switch(this.props.form.schema.type) {
          case 'integer':
          case 'number':
            if (e.target.value.indexOf('.') === -1) {
                value = parseInt(e.target.value);
            } else {
                value = parseFloat(e.target.value);
            }

            if (isNaN(value)) {
              value = undefined;
            }
            break;
          case 'boolean':
            value = e.target.checked;
            break;
          case 'tBoolean':
            if(e.target.value !== 'yes' || e.target.value !== 'no') {
                value = v;
            }
            break
          case 'object':
          case 'array':
            value = e;
            break
          default:
            value = e.target.value;
        }

        //console.log('onChangeValidate this.props.form, value', this.props.form, value);
        let validationResult = utils.validate(this.props.form, value);
        this.setState({
            value: value,
            valid: validationResult.valid,
            error: validationResult.valid ? null : validationResult.error.message
        });
        this.props.onChange(this.props.form.key, value);
    }

    static defaultValue = (props) => {
        let value;
        if (props.form && props.form.key) {
            value = utils.selectOrSet(props.form.key, props.model);
        }
        //console.log('Text defaultValue value = ', value);

        // check if there is a default value
        if(!value && props.form['default']) {
            value = props.form['default'];
        }

        if(!value && props.form.schema && props.form.schema['default']) {
            value = props.form.schema['default'];
        }

        // Support for Select
        // The first value in the option will be the default.
        if(!value && props.form.titleMap && props.form.titleMap[0].value) {
            value = props.form.titleMap[0].value;
        }
        return value;
    }

    render() {
        return <ComposedComponent {...defaultProps} {...this.props} {...this.state} onChangeValidate={this.onChangeValidate}/>;
    }
};
