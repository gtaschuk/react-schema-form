import React, {Component, Fragment} from 'react'
import {withStyles} from '@material-ui/core/styles'
import {Button, Card, IconButton} from '@material-ui/core'
import {Close} from '@material-ui/icons'
import _ from 'lodash'
import utils from './utils'
import ComposedComponent from './ComposedComponent'


const styles = theme => ({
    arrayItem: {
        position: 'relative',
        paddingTop: `16px`,
        margin: `${theme.spacing.unit * 2}px 0`
    },
    deleteItemButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 2,
    },
    addButton: {
        margin: `${theme.spacing.unit}px`
    }
})

class Array extends Component {
    static ITEM_ID = '_SCHEMAFORM_ITEM_ID'
    static _SEQUENCE = 1

    static assignItemId(item) {
        if (item && !item[Array.ITEM_ID]) {
            // define hidden property with internal id
            Object.defineProperty(item, Array.ITEM_ID, {
                enumerable: false,
                writable: true
            })
            item[Array.ITEM_ID] = Array._SEQUENCE++
        }
        return item
    }

    static getDerivedStateFromProps(props, state) {
        let propsKey = props.form.key
        if (props.form && propsKey === state.formKey && props.model &&
            props.model[propsKey] === state.model) {
            return state
        }
        let model = utils.selectOrSet(propsKey, props.model) || []
        return {
            formKey: propsKey,
            model: model.map(Array.assignItemId)
        }
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        // Always start with one empty form unless configured otherwise.
        if (this.props.form.startEmpty !== true && this.state.model.length === 0) {
            this.onAppend()
        }
    }

    onAppend = () => {
        let empty
        if (this.props.form && this.props.form.schema && this.props.form.schema.items) {
            let items = this.props.form.schema.items
            if (items.type && items.type.indexOf('object') !== -1) {
                empty = {}

                // Check for possible defaults
                if (!this.props.options || this.props.options.setSchemaDefaults !== false) {
                    empty = typeof items['default'] !== 'undefined' ? items['default'] : empty

                    // Check for defaults further down in the schema.
                    // If the default instance sets the new array item to something falsy, i.e. null
                    // then there is no need to go further down.
                    if (empty) {
                        utils.traverseSchema(items, (prop, path) => {
                            if (typeof prop['default'] !== 'undefined') {
                                utils.selectOrSet(path, empty, prop['default'])
                            }
                        })
                    }
                }

            } else if (items.type && items.type.indexOf('array') !== -1) {
                empty = []
                if (!this.props.options || this.props.options.setSchemaDefaults !== false) {
                    empty = items['default'] || empty
                }
            } else {
                // No type? could still have defaults.
                if (!this.props.options || this.props.options.setSchemaDefaults !== false) {
                    empty = items['default'] || empty
                }
            }
        }
        let newModel = this.state.model
        Array.assignItemId(empty)
        newModel.push(empty)
        this.setState({model: newModel})
        this.props.onChangeValidate(this.state.model)
    }

    onDelete = index => () => {
        // console.log('onDelete is called', index);
        let newModel = this.state.model
        newModel.splice(index, 1)
        this.setState({model: newModel})
        this.props.onChangeValidate(this.state.model)
    }

    setIndex = index => form => {
        if (form.key) {
            form.key[form.key.indexOf('')] = index
        }
    }

    copyWithIndex = (form, index) => {
        let copy = _.cloneDeep(form)
        copy.arrayIndex = index
        utils.traverseForm(copy, this.setIndex(index))
        return copy
    }

    render() {
        let {classes, form} = this.props
        let arrays = []
        let model = this.state.model
        // console.log('Array.render', model);
        for (let i = 0; i < model.length; i++) {
            let item = model[i]
            arrays.push(
                <Card className={classes.arrayItem} key={item && item[Array.ITEM_ID] || i}>
                    <IconButton onClick={this.onDelete(i)} className={classes.deleteItemButton}>
                        <Close fontSize='small'/>
                    </IconButton>
                    {form.items.map((form, index) =>
                        this.props.builder(this.copyWithIndex(form, i), this.props.model, index, this.props.mapper, this.props.onChange, this.props.builder)
                    )}
                </Card>
            )
        }
        return (
            <Fragment>
                <div>
                    <label>{this.props.form.title}</label>
                    <div>{arrays}</div>
                </div>
                <Button classes={{root: classes.addButton}} variant="contained" color="primary" onClick={this.onAppend}>
                    {this.props.form.add || 'Add'}
                </Button>
            </Fragment>
        )
    }
}

export default ComposedComponent(withStyles(styles)(Array))
