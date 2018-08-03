import React, {Component} from 'react';
import ComposedComponent from './ComposedComponent';
import MenuItem from '@material-ui/core/MenuItem';
import MuiSelect from '@material-ui/core/Select';


const getModelValue = (model, {key, titleMap}) => {
    let result
    if (Array.isArray(key)) {
        result = key.reduce((cur, nxt) => cur && cur[nxt], model);
    } else {
        result = model[key];
    }
    return result || (titleMap != null ? titleMap[0].value : '')
}

class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentValue: getModelValue(this.props.model, this.props.form)
        }
    }

    static getDerivedStateFromProps(props) {
        if (props.model && props.form.key) {
            return {
                currentValue: getModelValue(props.model, props.form)
            };
        }
    }

    onSelected = (event) => {
        let currentValue = event.target.value
        this.setState({
            currentValue
        });
        this.props.onChangeValidate(event);
    }

    render() {
        const menuItems = this.props.form.titleMap.map((item, idx) => (
            <MenuItem key={idx} value={item.value}>{item.name}</MenuItem>
        ));
        return (
            <div className={this.props.form.htmlClass}>
                <MuiSelect
                    value={this.state.currentValue}
                    placeholder={this.props.form.title}
                    disabled={this.props.form.readonly}
                    onChange={this.onSelected}
                    fullWidth >
                    {menuItems}
                </MuiSelect>
            </div>
        );
    }
}

export default ComposedComponent(Select);
