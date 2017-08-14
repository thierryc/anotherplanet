/* eslint-env jest */

import { shallow } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'
import App from '../pages/index.js'

describe('With Enzyme', () => {
  it('App shows "Another Planet.io"', () => {
    const app = shallow(<App />)
    expect(app.find('h1').text()).toEqual('Another Planet.io')
  })
})

describe('With Snapshot Testing', () => {
  it('App shows "Another Planet.io"', () => {
    const component = renderer.create(<App />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
