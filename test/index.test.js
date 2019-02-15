// @flow

import React from 'react'
import ReactDOM from 'react-dom'

import { mount } from 'enzyme'
import sinon from 'sinon'

import App from './components/App'
import Paper from './components/Paper'

it('can create app', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('can mount paper', () => {
  sinon.spy(Paper.prototype, 'componentDidMount')
  
  const wrapper = mount(<Paper width={600} height={400} />)
  expect(Paper.prototype.componentDidMount).toHaveProperty('callCount', 1)
  
  const instance = wrapper.instance()
  expect(instance).toBeDefined()
  expect(instance).toHaveProperty('view')
  expect(instance.view).toHaveProperty('current')
  
  const view = instance.view.current
  expect(view).toHaveProperty('canvas')
  expect(view.canvas).toHaveProperty('current')
  expect(view).toHaveProperty('scope')

  const canvas = view.canvas.current
  expect(canvas).toBeInstanceOf(HTMLCanvasElement)

  const scope = view.scope
  expect(scope).toHaveProperty('project')

  const project = scope.project
  expect(project).toHaveProperty('layers')
  
  const layers = project.layers
  expect(layers).toHaveLength(3)

  const rectangle = layers[2].children[0]
  expect(rectangle.fillColor.equals('green')).toBeTruthy()
})
