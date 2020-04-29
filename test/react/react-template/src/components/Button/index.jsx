import React, { Component } from 'react'
import styles from './styles.module.less'

const themes = ['dark', 'light']

/**
 * @property {Boolean} [block]
 * @property {String} [theme] enum: "dark" | "light"
 */
class Button extends Component {
  static defaultProps = {
    block: false,
    theme: 'light',
  }
  render() {
    const { children, className, block, theme, ...rest } = this.props
    let computedClassName = [className, styles.button]
    computedClassName.push(block ? styles.block : styles.inline)
    theme && themes.some(t => t === theme) && computedClassName.push(styles[theme])
    computedClassName = computedClassName.join(' ')

    return (
      <span className={computedClassName} {...rest}>
        {children}
      </span>
    )
  }
}

export default Button
