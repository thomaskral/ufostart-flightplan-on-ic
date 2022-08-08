import { mount } from '@vue/test-utils'
import { expect, describe, it } from 'vitest'
import AButton from './AButton.vue'

describe('AButton', () => {
  it('component exists', () => {
    const wrapper = mount(AButton)

    expect(wrapper.exists()).toBeDefined()
  })
})
