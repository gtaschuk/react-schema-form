import React, {Component} from 'react'
import ComposedComponent from './ComposedComponent'
import {MuiSelect, InputLabel, MenuItem, FormControl} from '@material-ui/core'
import {isEmpty} from 'lodash'

const getModelValue = (model, {key, titleMap}) => {
    let result
    if (Array.isArray(key)) {
        result = key.reduce((cur, nxt) => cur && cur[nxt], model)
    } else {
        result = model[key]
    }
    return result || (titleMap != null ? titleMap[0].value : '')
}

class Select extends Component {
    constructor(props) {
        super(props)
        this.onSelected = this.onSelected.bind(this)

        const {model, form} = this.props
        const {key} = form

        const storedValue = model && this.getModelKey(model, key) || false
        const defaultValue = form.schema.default || false
        const value = !(isEmpty(storedValue)) && storedValue || defaultValue

        this.props.setDefault(key, model, form, value)
        this.state = {
            currentValue: value,
        }
    }

    static getDerivedStateFromProps(props) {
        if (props.model && props.form.key) {
            return {
                currentValue: getModelValue(props.model, props.form)
            }
        }
    }

    onSelected = ({target: {value: currentValue}}) => {
        this.setState({currentValue})
        this.props.onChangeValidate(event)
    }

    render() {
        const {form} = this.props
        const menuItems = form.titleMap.map((item, idx) => (
            <MenuItem key={idx} value={item.value}>{item.name}</MenuItem>
        ))
        return (
            <FormControl style={{width: '100%'}}>
                <InputLabel htmlFor="age-simple">{this.props.form.title}</InputLabel>
                <MuiSelect
                    disabled={this.props.form.readonly}
                    placeholder={form.title}
                    value={this.state.currentValue || ''}
                    onChange={this.onSelected}>
                    {menuItems}
                </MuiSelect>
            </FormControl>
        )
    }
}

export default ComposedComponent(Select)
