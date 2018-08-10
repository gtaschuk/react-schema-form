import React, {Component} from 'react'
import ComposedComponent from './ComposedComponent'
import {Button, Checkbox, FormControlLabel, FormGroup} from '@material-ui/core'

/**
 * There is no default number picker as part of Material-UI.
 * Instead, use a TextField and validate.
 */
class TripleBoolean extends Component {

    constructor(props) {
        super(props)
        const {model, form, value} = this.props
        const {key} = form
        this.props.setDefault(key, model, form, value)
        this.state = {
            yesChecked: false,
            noChecked: false,
        }
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            yesChecked: nextProps.value === "yes",
            noChecked: nextProps.value === "no",
        }
    }


    displaySwitch = () => (
        <div style={{padding: "20px"}}>
            {this.props.form.title}<br/>
            <FormGroup>
                <FormControlLabel
                    label='Yes'
                    control={<Checkbox onClick={(e) => this.props.onChangeValidate(e, 'yes')}
                                       checked={this.state.yesChecked}/>}/>
                <FormControlLabel
                    label='No'
                    control={<Checkbox onClick={(e) => this.props.onChangeValidate(e, 'no')}
                                       checked={this.state.noChecked}/>}/>
            </FormGroup>
            {(this.props.value === 'yes' || this.props.value === 'no') &&
            <Button variant='flat' color='primary'
                    onClick={(e) => this.props.onChangeValidate(e, 'unanswered')}>clear response</Button>}
        </div>
    )

    render() {
        return (
            <div className={this.props.form.htmlClass}>
                {this.props.form.title}:<br/>
                {this.displaySwitch()}
            </div>
        )
    }
}

export default ComposedComponent(TripleBoolean)
