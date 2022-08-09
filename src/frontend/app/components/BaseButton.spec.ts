import { mount } from '@vue/test-utils'
import { expect, describe, it } from 'vitest'
import BaseButton from './BaseButton.vue'

describe('BaseButton', () => {
  it('component exists', () => {
    const wrapper = mount(BaseButton)

    expect(wrapper.exists()).toBeDefined()
  })
})
