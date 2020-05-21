import React from "react"

import { mount, render } from 'enzyme'
import { describe, expect, it} from "@jest/globals"


import classy from "../index"

const TestComponent = classy.div`test-class`

describe('<TestComponent/>', () => {
  it('has test-class class', () => {
    const wrapper = render(<TestComponent/>)
    expect(wrapper.hasClass('test-class')).toBeTruthy()
  })
  }
)

const BaseComponent = ({className}) => (
  <div className={className}>
    <span>Div in a Span</span>
  </div>
)

const ClassyBaseComponent = classy(BaseComponent)`test-class`

describe('<ClassBaseComponent/>', () => {
  it('renders a component with test-class on it\'s outer div', () => {
    const wrapper = render(<ClassyBaseComponent/>)
    expect(wrapper.hasClass('test-class')).toBeTruthy()
    expect(wrapper.is('div')).toBeTruthy()
  })
})

const ConditionalComponent = classy.div`
  ${props => props.secretClass}
`

describe('<ConditionalComponent/>', () => {
  it('renders the secretClass we pass in', () => {
    const wrapper = render(<ConditionalComponent secretClass={'the-answer'}/>)
    expect(wrapper.hasClass('the-answer')).toBeTruthy()
  })
})

const RefReceivingComponent = classy.input`ref-haver`

describe('<RefReceivingComponent/>', () => {
  it('receives the ref from it\'s parent', () => {
    const ref = React.createRef()
    const wrapper = mount(<RefReceivingComponent ref={ref}/>)
    expect(wrapper.getDOMNode()).toBe(ref.current)
  })
})

const SafePropComponent = classy.div`test-class`

describe('<SafePropComponent/>', () => {
  it('doesn\'t forward invalid props', () => {
    const wrapper = render(<SafePropComponent invalidProp/>)
    expect(wrapper.prop('invalidProp')).toBeUndefined()
  })
})
