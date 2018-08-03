import React from 'react';
import ComposedComponent from './ComposedComponent';
import MenuItem from '@material-ui/core/MenuItem';
import MuiSelect from '@material-ui/core/Select';

class Select extends React.Component {

    constructor(props) {
        super(props);
        this.onSelected = this.onSelected.bind(this);

        const {model, form} = this.props;
        const {key} = form;

        const storedValue = model && this.getModelKey(model, key) || false;
        const defaultValue = form.schema.default || false;
        const value = !(_.isEmpty(storedValue)) && storedValue || defaultValue;

        this.props.setDefault(key, model, form, value)
        this.state = {
            currentValue: value,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.model && nextProps.form.key) {
            this.setState({
                currentValue: this.getModelKey(nextProps.model, nextProps.form.key)
                || (nextProps.form.titleMap != null ? nextProps.form.titleMap[0].value : '')
            });
        }
    }

    getModelKey(model, key) {
        if (Array.isArray(key)) {
            return key.reduce((cur, nxt) => (cur[nxt] || {}), model);
        } else {
            return model[key];
        }
    }

    onSelected(event, selectedIndex, menuItem) {

        this.setState({
            currentValue: menuItem
        });
        event.target.value = menuItem;
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

// Select.propTypes = {
//
// };

export default ComposedComponent(Select);
