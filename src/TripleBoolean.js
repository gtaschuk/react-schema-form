import React, {Component} from 'react'
import ComposedComponent from './ComposedComponent'
import {
    Card,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup
} from '@material-ui/core'

/**
 * There is no default number picker as part of Material-UI.
 * Instead, use a TextField and validate.
 */
class TripleBoolean extends Component {
    constructor(props) {
        super(props)
        const {model, form, value} = props
        const {key} = form
        this.props.setDefault(key, model, form, value)
        this.state = {
            yesChecked: false,
            noChecked: false,
        }
    }

    static getDerivedStateFromProps(props) {
        return {
            yesChecked: props.value === 'yes',
            noChecked: props.value === 'no',
        }
    }

    render() {
        return (
            <Card>
                <div style={{padding: '20px'}}>
                    {this.props.form.title}
                    <br/>
                    <FormGroup>
                        <FormControlLabel
                            label='Yes'
                            control={
                            <Checkbox onClick={(e) => this.props.onChangeValidate(e, 'yes')}
                                      checked={this.state.yesChecked}/>}/>
                        <FormControlLabel
                            label='No'
                            control={
                            <Checkbox onClick={(e) => this.props.onChangeValidate(e, 'no')}
                                      checked={this.state.noChecked}/>}/>
                    </FormGroup>
                    {(this.props.value === 'yes' || this.props.value === 'no') &&
                    <Button id='temp' variant='flat' color='primary'
                            onClick={(e) => this.props.onChangeValidate(e, 'unanswered')}>
                        clear response
                    </Button>}
                </div>
            </Card>
        )
    }
}

export default ComposedComponent(TripleBoolean)
