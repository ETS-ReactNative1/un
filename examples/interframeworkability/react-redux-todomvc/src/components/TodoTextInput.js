import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import hh from 'react-hyperscript-helpers'
const { input } = hh



export default class TodoTextInput extends Component {
  static propTypes = {
    onSave: PropTypes.func.isRequired,
    text: PropTypes.string,
    placeholder: PropTypes.string,
    editing: PropTypes.bool,
    newTodo: PropTypes.bool
  }

  state = {
    text: this.props.text || ''
  }

  handleSubmit = e => {
    const text = e.target.value.trim()
    if (e.which === 13) {
      this.props.onSave(text)
      if (this.props.newTodo) {
        this.setState({ text: '' })
      }
    }
  }

  handleChange = e => {
    this.setState({ text: e.target.value })
  }

  handleBlur = e => {
    if (!this.props.newTodo) {
      this.props.onSave(e.target.value)
    }
  }

  render = () => view({
    edit: this.props.editing,
    newTodo: this.props.newTodo,
    placeholder: this.props.placeholder,
    value: this.state.text,
    onBlur: this.handleBlur,
    onChange: this.handleChange,
    onKeyDown: this.handleSubmit
  })
}

const view = ({ edit, newTodo, value, placeholder, onBlur, onChange, onKeyDown }) => 
  input({
    className: classnames({ edit, 'new-todo': newTodo }),
    type: 'text',
    autoFocus: true,
    placeholder,
    value,
    onBlur,
    onChange,
    onKeyDown
  })


