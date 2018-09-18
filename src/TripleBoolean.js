import React, {Component} from 'react';
import ComposedComponent from './ComposedComponent';
import {Card, Checkbox, Button} from '@material-ui/core';

/**
 * There is no default number picker as part of Material-UI.
 * Instead, use a TextField and validate.
 */
class TripleBoolean extends Component {
    constructor(props) {
        super(props);
        this.state = {
            yesChecked: false,
            noChecked: false,
        }
        const {model, form, value} = this.props;
        const {key} = form;

        this.props.setDefault(key, model, form, value);
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            yesChecked: nextProps.value === 'yes',
            noChecked: nextProps.value === 'no',
        }
    }


    divStyle = {
        padding: '20px',
    }

    butStyle = {
        color: '#07f',
    }

    render() {
        return  (
            <Card>
                <div style={this.divStyle}>
                    {this.props.form.title}<br/>
                    <Checkbox onCheck={(e) => {this.props.onChangeValidate(e,'yes')}}
                              checked={this.state.yesChecked}
                              label='Yes'
                    />
                    <Checkbox onCheck={(e) => {this.props.onChangeValidate(e,'no')}}
                              checked={this.state.noChecked}
                              label='No'
                    />
                    {this.props.value === 'yes' || this.props.value === 'no' ?
                        <Button style={this.butStyle}
                                onClick={(e) => this.props.onChangeValidate(e,'unanswered')}>clear responce</Button> : ''}
                </div>
            </Card>
        );
    }
}

export default ComposedComponent(TripleBoolean);
