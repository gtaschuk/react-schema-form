import React, {Component} from 'react'
import {Radio, RadioGroup, FormControl, FormControlLabel, FormLabel} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import ComposedComponent from './ComposedComponent'

const styles = theme => ({
    formControl: {
        marginTop: theme.spacing.unit
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
})

class Radios extends Component {

    renderItems = (form) =>
        form.titleMap.map((item, index) =>
            <FormControlLabel
                key={index}
                control={<Radio checked={this.props.value === item.value}/>}
                label={item.name}
                value={item.value}
                disabled={form.readonly}
            />)

    render() {
        let {classes} = this.props
        return (
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">{this.props.form.title}</FormLabel>
                <RadioGroup
                    value={this.props.value}
                    name={this.props.form.title}
                    onChange={this.props.onChangeValidate}
                    className={classes.group}>
                    {this.renderItems(this.props.form)}
                </RadioGroup>
            </FormControl>
        )
    }
}

export default ComposedComponent(withStyles(styles)(Radios))
