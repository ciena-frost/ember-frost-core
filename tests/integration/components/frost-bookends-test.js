/**
 * Integration test for the frost-bookends component
 */

import {expect} from 'chai'
import {$hook, hook} from 'ember-hook'
import wait from 'ember-test-helpers/wait'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

/**
 * Confirm that the correct DOM elements are rendered
 * @param {Object} q - the hookQualifiers to use for all hook, and $hook calls
 */
function itShouldRenderCorrectDom (q) {
  it('should be accessible via the hook', function () {
    expect($hook('ends', q)).to.have.length(1)
  })

  it('should render a header wrapper', function () {
    expect($hook('ends-headerWrapper', q)).to.have.class('frost-bookends-header')
  })

  it('should render the header within the header wrapper', function () {
    expect($hook('ends-headerWrapper', q)).to.have.descendants(hook('ends-header', q))
  })

  it('should render the user-provided header', function () {
    expect($hook('ends-header', q)).to.have.class('my-header')
  })

  it('should render a content wrapper', function () {
    expect($hook('ends-contentWrapper', q)).to.have.class('frost-bookends-content')
  })

  it('should render the content within the content wrapper', function () {
    expect($hook('ends-contentWrapper', q)).to.have.descendants(hook('ends-content', q))
  })

  it('should render the user-provided content', function () {
    expect($hook('ends-content', q)).to.have.class('my-content')
  })

  it('should render a frost-scroll', function () {
    expect($hook('ends-scroll', q)).to.have.class('frost-scroll')
  })

  it('should wrap the content in a frost-scroll', function () {
    expect($hook('ends-scroll', q)).to.have.descendants(hook('ends-contentWrapper', q))
  })

  it('should render a footer wrapper', function () {
    expect($hook('ends-footerWrapper', q)).to.have.class('frost-bookends-footer')
  })

  it('should render the footer within the footer wrapper', function () {
    expect($hook('ends-footerWrapper', q)).to.have.descendants(hook('ends-footer', q))
  })

  it('should render the user-provided footer', function () {
    expect($hook('ends-footer', q)).to.have.class('my-footer')
  })
}

/**
 * Confirm the correct scrolling behavior
 * @param {Object} q - the hookQualifiers to use for all hook, and $hook calls
 */
function itShouldHandleScrolling (q) {
  describe('after scrolling down', function () {
    beforeEach(function () {
      $hook('ends-scroll', q).trigger('ps-scroll-down')
    })

    it('should indicate that there is content below the header', function () {
      expect($hook('ends-contentBeneathHeaderEffect', q)).to.have.length(1)
    })

    describe('after reaching the start of the y scroll', function () {
      beforeEach(function () {
        $hook('ends-scroll', q).trigger('ps-y-reach-start')
      })

      it('should stop indicating that there is content below the header', function () {
        expect($hook('ends-contentBeneathHeaderEffect', q)).to.have.length(0)
      })
    })
  })

  describe('after reaching the end of the y scroll', function () {
    beforeEach(function () {
      $hook('ends-scroll', q).trigger('ps-y-reach-end')
    })

    it('should stop indicating that there is content below the footer', function () {
      expect($hook('ends-contentBeneathFooterEffect', q)).to.have.length(0)
    })

    describe('after scrolling up', function () {
      beforeEach(function () {
        $hook('ends-scroll', q).trigger('ps-scroll-up')
      })

      it('should start indicating that there is content below the footer again', function () {
        expect($hook('ends-contentBeneathFooterEffect', q)).to.have.length(1)
      })
    })
  })
}


const test = integration('frost-bookends')
describe(test.label, function () {
  test.setup()

  // shortcut for passing hookQualifiers to all $hook() and hook() calls. By passing it,
  // we ensure that all sub-components were given the parent hookQualifiers (@job13er 2017-05-09)
  const q = {foo: 'bar'}

  let sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('when content needs to scroll', function () {
    describe('when using content property', function () {
      beforeEach(function () {
        this.render(hbs`
          {{frost-bookends
            class='fixed-size-bookends'
            content=(component 'my-content'
              tall=true
            )
            header=(component 'my-header'
              title='Howdy'
            )
            hook='ends'
            hookQualifiers=(hash foo='bar')
            footer=(component 'my-footer')
          }}
        `)

        return wait()
      })

      itShouldRenderCorrectDom(q)

      it('should not start out indicating that there is content below the header', function () {
        expect($hook('ends-contentBeneathHeaderEffect', q)).to.have.length(0)
      })

      it('should start out indicating that there is content below the footer', function () {
        expect($hook('ends-contentBeneathFooterEffect', q)).to.have.length(1)
      })

      itShouldHandleScrolling(q)
    })

    describe('when using a block for content', function () {
      beforeEach(function () {
        // NOTE: in order to make the same hooks available as the component use-case, you need to
        // set the hook and hookQualifiers on the yielded content yourself (@job13er 2017-05-10)
        this.render(hbs`
          {{#frost-bookends
            class='fixed-size-bookends'
            header=(component 'my-header'
              title='Howdy'
            )
            hook='ends'
            hookQualifiers=(hash foo='bar')
            footer=(component 'my-footer')
          }}
            {{my-content
              hook='ends-content'
              hookQualifiers=(hash foo='bar')
              tall=true
            }}
          {{/frost-bookends}}
        `)

        return wait()
      })

      itShouldRenderCorrectDom(q)

      it('should not start out indicating that there is content below the header', function () {
        expect($hook('ends-contentBeneathHeaderEffect', q)).to.have.length(0)
      })

      it('should start out indicating that there is content below the footer', function () {
        expect($hook('ends-contentBeneathFooterEffect', q)).to.have.length(1)
      })

      itShouldHandleScrolling(q)
    })
  })

  describe('when content does not need to scroll', function () {
    describe('when using content property', function () {
      beforeEach(function () {
        this.render(hbs`
          {{frost-bookends
            class='fixed-size-bookends'
            content=(component 'my-content')
            header=(component 'my-header'
              title='Howdy'
            )
            hook='ends'
            hookQualifiers=(hash foo='bar')
            footer=(component 'my-footer')
          }}
        `)

        return wait()
      })

      itShouldRenderCorrectDom(q)

      it('should not start out indicating that there is content below the header', function () {
        expect($hook('ends-contentBeneathHeaderEffect', q)).to.have.length(0)
      })

      it('should not start out indicating that there is content below the footer', function () {
        expect($hook('ends-contentBeneathFooterEffect', q)).to.have.length(0)
      })
    })

    describe('when using a block for content', function () {
      beforeEach(function () {
        // NOTE: in order to make the same hooks available as the component use-case, you need to
        // set the hook and hookQualifiers on the yielded content yourself (@job13er 2017-05-10)
        this.render(hbs`
          {{#frost-bookends
            class='fixed-size-bookends'
            header=(component 'my-header'
              title='Howdy'
            )
            hook='ends'
            hookQualifiers=(hash foo='bar')
            footer=(component 'my-footer')
          }}
            {{my-content
              hook='ends-content'
              hookQualifiers=(hash foo='bar')
            }}
          {{/frost-bookends}}
        `)

        return wait()
      })

      itShouldRenderCorrectDom(q)

      it('should not start out indicating that there is content below the header', function () {
        expect($hook('ends-contentBeneathHeaderEffect', q)).to.have.length(0)
      })

      it('should not start out indicating that there is content below the footer', function () {
        expect($hook('ends-contentBeneathFooterEffect', q)).to.have.length(0)
      })
    })
  })
})
