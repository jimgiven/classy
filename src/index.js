import React from "react"
import isPropValid from "@emotion/is-prop-valid"

import domElements from "./domElements"

const classyGenerator = (Component, baseComponent = false) => {
  return (classStrings, ...classExpressions) => {
    const classyComponent = (props, ref) => {
      let className = classStrings[0]
      classExpressions.forEach((expresion, index) => {
        className += expresion(props)
        className += classStrings[index]
      })

      let validProps = {}

      if (baseComponent) {
        validProps = Object.keys(props).reduce((acc, propName) => {
          if (isPropValid(propName)) {
            validProps[propName] = props[propName]
          }
          return validProps
        }, {})
      } else {
        validProps = props
      }

      return (
        <Component className={className} ref={ref} {...validProps}>
          {props.children}
        </Component>
      )
    }

    const baseName = Component.displayName || Component.name || Component
    classyComponent.displayName = `classy(${baseName})`

    return React.forwardRef(classyComponent)
  }
}

let classy = classyGenerator
domElements.forEach(
  element => (classy[element] = classyGenerator(element, true))
)

export default classy