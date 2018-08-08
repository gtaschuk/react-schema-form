import React, {Component} from 'react'
import ComposedComponent from './ComposedComponent'
import {MuiSelect, InputLabel, MenuItem, FormControl} from '@material-ui/core'
import {isEmpty} from 'lodash'


class Select extends Component {
    constructor(props) {
        super(props)

        const {model, form} = this.props
        const {key} = form

        const storedValue = model && Select.getModelKey(model, key) || false
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
                currentValue: Select.getModelValue(props.model, props.form)
            }
        }
    }

    static getModelKey = (model, key) => {
        if (Array.isArray(key)) {
            return key.reduce((cur, nxt) => (cur[nxt] || {}), model);
        } else {
            return model[key];
        }
    }

    static getModelValue = (model, {key, titleMap}) =>
        Select.getModelKey(model, key) || (titleMap != null ? titleMap[0].value : '')

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
