import React, {Component} from 'react'
import utils from './utils'
import Number from './Number'
import Text from './Text'
import TextArea from './TextArea'
import Select from './Select'
import Radios from './Radios'
import Date from './Date'
import Checkbox from './Checkbox'
import Help from './Help'
import Array from './Array'
import FieldSet from './FieldSet'
import TripleBoolean from './TripleBoolean'
import merge from 'lodash/merge'
import isNil from 'lodash/isNil'

export default class SchemaForm extends Component {

    mapper = {
        'number': Number,
        'text': Text,
        'password': Text,
        'textarea': TextArea,
        'select': Select,
        'radios': Radios,
        'date': Date,
        'checkbox': Checkbox,
        'help': Help,
        'array': Array,
        'tBoolean': TripleBoolean,
        'fieldset': FieldSet
    }

    constructor(props) {
        super(props)
    }

    // Assign default values and save it to the model
    setDefault = (key, model, form, value) => {
        const currentValue = utils.selectOrSet(key, model)

        // If current value is not setted and exist a default, apply the default over the model
        if (isNil(currentValue) && !isNil(value)) {
            this.props.onModelChange(key, value, form.type, form)
        }
    }

    onChange = (key, val) => {
        //console.log('SchemaForm.onChange', key, val);
        this.props.onModelChange(key, val)
    }

    builder = (form, model, index, mapper, onChange, builder) => {
        const Field = this.mapper[form.type]
        if (!Field) {
            return null
        }

        // Apply conditionals to review if this field must be rendered
        if (form.condition && utils.safeEval(form.condition, {model}) === false) {
            return null
        }

        const key = form.key && form.key.join('.') || index

        const errors = this.props && this.props.errors ? this.props.errors : {}
        let error = (key in errors) ? errors[key] : null

        return (<Field
            model={model}
            form={form}
            key={key}
            onChange={onChange}
            setDefault={this.setDefault}
            mapper={mapper}
            builder={builder}
            errorText={error}
        />)
    }

    render() {
        let merged = utils.merge(this.props.schema, this.props.form, this.props.ignore, this.props.option)
        let mapper = this.mapper
        if (this.props.mapper) {
            mapper = merge(this.mapper, this.props.mapper)
        }
        let forms = merged.map(
            (form, index) => this.builder(form, this.props.model, index, mapper, this.onChange, this.builder)
        )
        return (
            <div className={this.props.className}>
                {forms}
            </div>
        )
    }
}
