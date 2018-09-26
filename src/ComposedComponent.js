import React, {Component} from 'react'
import _ from 'lodash'
import utils from './utils'

export default (ComposedComponent, defaultProps = {}) => class Composed extends Component {

    constructor(props) {
        super(props)
        let value = Composed.defaultValue(this.props)
        let validationResult = utils.validate(this.props.form, value)
        this.state = {
            value,
            valid: (validationResult.valid || !value),
            error: !validationResult.valid && (value ? validationResult.error.message : null) || this.props.errorText
        }
    }

    static getDerivedStateFromProps(props) {
        let value = Composed.defaultValue(props)
        // console.log('getDerivedStateFromProps', value)
        let validationResult = utils.validate(props.form, value)
        return {
            value,
            valid: (validationResult.valid || !value),
            error: !validationResult.valid && value ? validationResult.error.message : null
        }
    }

    onChangeValidate = (e, v) => {
        let value = null
        switch (this.props.form.schema.type) {
            case 'integer':
            case 'number':
                value = e.target.value.indexOf('.') === -1
                    ? parseInt(e.target.value, 10)
                    : parseFloat(e.target.value)

                if (isNaN(value)) {
                    value = undefined
                }
                break
            case 'boolean':
                value = e.target.checked
                break
            case 'tBoolean':
                if (e.target.value !== 'yes' || e.target.value !== 'no') {
                    value = v
                }
                break
            case 'array':
                value = e
                break
            case 'object':
            default:
                value = e.target.value
        }

        //console.log('onChangeValidate this.props.form, value', this.props.form, value);
        let validationResult = utils.validate(this.props.form, value)

        this.setState({
            value,
            valid: validationResult.valid,
            error: validationResult.valid ? null : validationResult.error.message
        })

        this.props.onChange(this.props.form.key, value)
    }

    static defaultValue(props) {
        // check if there is a value in the model, if there is, display it. Otherwise, check if
        // there is a default value, display it.
        // console.log('Text.defaultValue key', props.form);
        // console.log('Text.defaultValue model', props.model);
        let value
        if (props.form && props.form.key) {
            value = utils.selectOrSet(props.form.key, props.model)
        }
        // console.log('Text defaultValue value = ', value);

        // check if there is a default value
        if (_.isNil(value) && props.form['default']) {
            value = props.form['default'] || ''
        }


        if (_.isNil(value) && props.form.schema && props.form.schema['default']) {
            value = props.form.schema['default']
        }


        // Support for Select
        // The first value in the option will be the default.
        if (_.isNil(value) && props.form.titleMap && props.form.titleMap[0].value) {
            value = props.form.titleMap[0].value
        }
        return value
    }

    render() {
        return <ComposedComponent {...defaultProps} {...this.props} {...this.state}
                                  onChangeValidate={this.onChangeValidate}/>
    }
};
