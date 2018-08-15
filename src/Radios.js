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
                    {this.props.form.titleMap.map((item, index) =>
                        <FormControlLabel
                            key={index}
                            label={item.name}
                            value={item.value}
                            disabled={this.props.form.readonly}
                            control={<Radio checked={this.props.value === item.value} />}/>)}
                </RadioGroup>
            </FormControl>
        )
    }
}

export default ComposedComponent(withStyles(styles)(Radios))
