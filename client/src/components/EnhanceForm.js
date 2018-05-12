import React, { Component } from 'react';

const EnhanceForm = Component =>
    class HigherOrderComponent extends React.Component {

        constructor(props) {
            super(props)
            this.state = { form: props.initialState }
            this.handleSubmit = this.handleSubmit.bind(this)
            this.handleChange = this.handleChange.bind(this)
        }

        handleSubmit(e) {
            e.preventDefault()
            console.log('hihi')
            console.log(JSON.stringify(this.state, null, 4))
        }

        handleChange(e) {
            console.log('change')
            const target = e.target;
            const name = target.name;
            const value = target.type === 'checkbox'
                ? target.checked
                : target.value

            this.setState((state) => ({ form: { ...state.form, [name]: value } }))
        }

        render() {
            const { initialState, ...rest } = this.props
            const { form } = this.state
            console.log('...', form)
            return React.createElement(Component, {
                state: form,
                handleSubmit: this.handleSubmit,
                handleChange: this.handleChange,
            })
        }
    }

export default EnhanceForm;
