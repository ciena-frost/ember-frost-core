import {expect} from 'chai'
import Ember from 'ember'
const {Logger} = Ember
import {setupComponentTest} from 'ember-mocha'
import wait from 'ember-test-helpers/wait'
import hbs from 'htmlbars-inline-precompile'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

import windowUtils from 'ember-frost-core/utils/window'

const RouterStub = Ember.Object.extend({
  generateURL (endpoint, segments) {
    let url = endpoint

    if (segments.length !== 0) {
      url = `${url}/${segments.join('/')}`
    }

    return url
  },

  hasRoute () {
    return true
  },

  transitionTo () {
    //
  }
})

describe('Integration: FrostLinkComponent', function () {
  setupComponentTest('frost-link', {
    integration: true
  })

  let sandbox

  beforeEach(function () {
    this.registry.register('service:-routing', RouterStub)
    sandbox = sinon.sandbox.create()
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('when instantiated using inline positional params format', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-link 'Test' 'link.min'
          hook='myLink'
        }}
      `)
    })

    it('has expected class name', function () {
      expect(this.$('> *').hasClass('frost-link')).to.equal(true)
    })

    it('has expected text content', function () {
      expect(this.$('.frost-link').text().trim()).to.equal('Test')
    })
  })

  describe('when instantiated using inline hash format', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-link
          hook='myLink'
          text='Test'
          routeName='link.min'
        }}
      `)
    })

    it('has expected class name', function () {
      expect(this.$('> *').hasClass('frost-link')).to.equal(true)
    })

    it('has expected text content', function () {
      expect(this.$('.frost-link').text().trim()).to.equal('Test')
    })
  })

  describe('when instantiated using block format', function () {
    beforeEach(function () {
      this.render(hbs`
        {{#frost-link 'link.min'
          hook='myLink'
        }}
          <em>Test</em>
        {{/frost-link}}
      `)
    })

    it('has expected class name', function () {
      expect(this.$('> *').hasClass('frost-link')).to.equal(true)
    })

    it('yields expected content', function () {
      expect(this.$('.frost-link').html().trim()).to.equal('<em>Test</em>')
      expect(this.$('.frost-link').text().trim()).to.equal('Test')
    })
  })

  describe('when instantiated with routeNames in inline format', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-link 'Test'
          hook='myLink'
          routeNames=(array
            'link.min'
            'link.max'
          )
        }}
      `)
    })

    it('has expected class name', function () {
      expect(this.$('> *').hasClass('frost-link')).to.equal(true)
    })

    it('has expected text content', function () {
      expect(this.$('.frost-link').text().trim()).to.equal('Test')
    })

    it('does not set target', function () {
      expect(this.$('.frost-link').prop('target')).to.equal('')
    })

    describe('when clicked', function () {
      describe('when pop-up blocker enabled', function () {
        beforeEach(function () {
          sandbox.stub(Logger, 'warn')
          sandbox.stub(windowUtils, 'open').returns(null)
          this.$('.frost-link').click()
        })

        it('tries to open correct number of links', function () {
          expect(windowUtils.open.callCount).to.equal(2)
        })

        it('tries to open first link as expected', function () {
          expect(windowUtils.open.firstCall.args).to.eql(['link.min'])
        })

        it('tries to open second link as expected', function () {
          expect(windowUtils.open.lastCall.args).to.eql(['link.max'])
        })

        it('logs warning', function () {
          expect(Logger.warn.callCount).to.equal(2)
          expect(Logger.warn.secondCall.args).to.eql([
            'Warning: Make sure that the pop-ups are not blocked'
          ])
          expect(Logger.warn.lastCall.args).to.eql([
            'Warning: Make sure that the pop-ups are not blocked'
          ])
        })
      })

      describe('when pop-up blocker disabled', function () {
        beforeEach(function () {
          sandbox.stub(Logger, 'warn')
          sandbox.stub(windowUtils, 'open').returns(1)
          this.$('.frost-link').click()
        })

        it('opens correct number of links', function () {
          expect(windowUtils.open.callCount).to.equal(2)
        })

        it('opens first link as expected', function () {
          expect(windowUtils.open.firstCall.args).to.eql(['link.min'])
        })

        it('opens second link as expected', function () {
          expect(windowUtils.open.lastCall.args).to.eql(['link.max'])
        })

        it('does not log warning', function () {
          expect(Logger.warn.callCount).to.equal(0)
        })
      })
    })
  })

  describe('when instantiated with routeNames in block format', function () {
    beforeEach(function () {
      this.render(hbs`
        {{#frost-link
          hook='myLink'
          priority='primary'
          routeNames=(array
            'link.min'
            'link.max'
          )
          size='small'
        }}
          Test
        {{/frost-link}}
      `)
    })

    it('has expected class name', function () {
      expect(this.$('> *').hasClass('frost-link')).to.equal(true)
    })

    it('yields expected content', function () {
      expect(this.$('.frost-link').text().trim()).to.equal('Test')
    })

    it('does not set target', function () {
      expect(this.$('.frost-link').prop('target')).to.equal('')
    })

    describe('when clicked', function () {
      describe('when pop-up blocker enabled', function () {
        beforeEach(function () {
          sandbox.stub(Logger, 'warn')
          sandbox.stub(windowUtils, 'open').returns(null)
          this.$('.frost-link').click()
        })

        it('tries to open correct number of links', function () {
          expect(windowUtils.open.callCount).to.equal(2)
        })

        it('tries to open first link as expected', function () {
          expect(windowUtils.open.firstCall.args).to.eql(['link.min'])
        })

        it('tries to open second link as expected', function () {
          expect(windowUtils.open.lastCall.args).to.eql(['link.max'])
        })

        it('logs warning', function () {
          expect(Logger.warn.callCount).to.equal(2)
          expect(Logger.warn.secondCall.args).to.eql([
            'Warning: Make sure that the pop-ups are not blocked'
          ])
          expect(Logger.warn.lastCall.args).to.eql([
            'Warning: Make sure that the pop-ups are not blocked'
          ])
        })
      })

      describe('when pop-up blocker disabled', function () {
        beforeEach(function () {
          sandbox.stub(Logger, 'warn')
          sandbox.stub(windowUtils, 'open').returns(1)
          this.$('.frost-link').click()
        })

        it('opens correct number of links', function () {
          expect(windowUtils.open.callCount).to.equal(2)
        })

        it('opens first link as expected', function () {
          expect(windowUtils.open.firstCall.args).to.eql(['link.min'])
        })

        it('opens second link as expected', function () {
          expect(windowUtils.open.lastCall.args).to.eql(['link.max'])
        })

        it('does not log warning', function () {
          expect(Logger.warn.callCount).to.equal(0)
        })
      })
    })
  })

  describe('when instantiated with routes in inline format', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-link 'Test'
          hook='myLink'
          routes=(array
            (hash
              name='link.first'
              models=(array '1')
            )
            (hash
              name='link.first.second'
              models=(array '2')
            )
          )
        }}
      `)
    })

    it('has expected class name', function () {
      expect(this.$('> *').hasClass('frost-link')).to.equal(true)
    })

    it('has expected text content', function () {
      expect(this.$('.frost-link').text().trim()).to.equal('Test')
    })

    it('does not set target', function () {
      expect(this.$('.frost-link').prop('target')).to.equal('')
    })

    describe('when clicked', function () {
      describe('when pop-up blocker enabled', function () {
        beforeEach(function () {
          sandbox.stub(Logger, 'warn')
          sandbox.stub(windowUtils, 'open').returns(null)
          this.$('.frost-link').click()
        })

        it('tries to open correct number of links', function () {
          expect(windowUtils.open.callCount).to.equal(2)
        })

        it('tries to open first link as expected', function () {
          expect(windowUtils.open.firstCall.args).to.eql(['link.first/1'])
        })

        it('tries to open second link as expected', function () {
          expect(windowUtils.open.lastCall.args).to.eql(['link.first.second/2'])
        })

        it('logs warning', function () {
          expect(Logger.warn.callCount).to.equal(2)
          expect(Logger.warn.secondCall.args).to.eql([
            'Warning: Make sure that the pop-ups are not blocked'
          ])
          expect(Logger.warn.lastCall.args).to.eql([
            'Warning: Make sure that the pop-ups are not blocked'
          ])
        })
      })

      describe('when pop-up blocker disabled', function () {
        beforeEach(function () {
          sandbox.stub(Logger, 'warn')
          sandbox.stub(windowUtils, 'open').returns(1)
          this.$('.frost-link').click()
        })

        it('opens correct number of links', function () {
          expect(windowUtils.open.callCount).to.equal(2)
        })

        it('opens first link as expected', function () {
          expect(windowUtils.open.firstCall.args).to.eql(['link.first/1'])
        })

        it('opens second link as expected', function () {
          expect(windowUtils.open.lastCall.args).to.eql(['link.first.second/2'])
        })

        it('does not log warning', function () {
          expect(Logger.warn.callCount).to.equal(0)
        })
      })
    })
  })

  describe('when instantiated with routes in block format', function () {
    beforeEach(function () {
      this.render(hbs`
        {{#frost-link
          hook='myLink'
          routes=(array
            (hash
              name='link.first'
              models=(array '1')
            )
            (hash
              name='link.first.second'
              models=(array '2')
            )
          )
        }}
          <em>Test</em>
        {{/frost-link}}
      `)
    })

    it('has expected class name', function () {
      expect(this.$('> *').hasClass('frost-link')).to.equal(true)
    })

    it('yields expected content', function () {
      expect(this.$('.frost-link').html().trim()).to.equal('<em>Test</em>')
      expect(this.$('.frost-link').text().trim()).to.equal('Test')
    })

    it('does not set target', function () {
      expect(this.$('.frost-link').prop('target')).to.equal('')
    })

    describe('when clicked', function () {
      describe('when pop-up blocker enabled', function () {
        beforeEach(function () {
          sandbox.stub(Logger, 'warn')
          sandbox.stub(windowUtils, 'open').returns(null)
          this.$('.frost-link').click()
        })

        it('tries to open correct number of links', function () {
          expect(windowUtils.open.callCount).to.equal(2)
        })

        it('tries to open first link as expected', function () {
          expect(windowUtils.open.firstCall.args).to.eql(['link.first/1'])
        })

        it('tries to open second link as expected', function () {
          expect(windowUtils.open.lastCall.args).to.eql(['link.first.second/2'])
        })

        it('logs warning', function () {
          expect(Logger.warn.callCount).to.equal(2)
          expect(Logger.warn.lastCall.args).to.eql([
            'Warning: Make sure that the pop-ups are not blocked'
          ])
        })
      })

      describe('when pop-up blocker disabled', function () {
        beforeEach(function () {
          sandbox.stub(Logger, 'warn')
          sandbox.stub(windowUtils, 'open').returns(1)
          this.$('.frost-link').click()
        })

        it('opens correct number of links', function () {
          expect(windowUtils.open.callCount).to.equal(2)
        })

        it('opens first link as expected', function () {
          expect(windowUtils.open.firstCall.args).to.eql(['link.first/1'])
        })

        it('opens second link as expected', function () {
          expect(windowUtils.open.lastCall.args).to.eql(['link.first.second/2'])
        })

        it('does not log warning', function () {
          expect(Logger.warn.callCount).to.equal(0)
        })
      })
    })
  })

  describe('when design used in conjunction with priority', function () {
    beforeEach(function () {
      sandbox.stub(Logger, 'warn')

      this.render(hbs`
        {{frost-link 'Test' 'link.min'
          design='inline'
          hook='myLink'
          priority='primary'
        }}
      `)
    })

    it('logs warning', function () {
      expect(Logger.warn.callCount).to.equal(1)
      expect(Logger.warn.lastCall.args).eql([
        'Warning: The `design` property takes precedence over `size` and `priority`.'
      ])
    })
  })

  describe('when design used in conjunction with size', function () {
    beforeEach(function () {
      sandbox.stub(Logger, 'warn')

      this.render(hbs`
        {{frost-link 'Test' 'link.min'
          design='inline'
          hook='myLink'
          size='small'
        }}
      `)
    })

    it('logs warning', function () {
      expect(Logger.warn.callCount).to.equal(1)
      expect(Logger.warn.lastCall.args).eql([
        'Warning: The `design` property takes precedence over `size` and `priority`.'
      ])
    })
  })

  describe('Priority property', function () {
    it('has primary class set', function () {
      this.render(hbs`
        {{frost-link 'title' 'testRoute'
          hook='myLink'
          priority='primary'
        }}
      `)

      expect(
        this.$('.frost-link').hasClass('primary'),
        'primary class is set'
      ).to.equal(true)
    })

    it('has secondary class set', function () {
      this.render(hbs`
        {{frost-link 'title' 'testRoute'
          hook='myLink'
          priority='secondary'
        }}
      `)

      expect(
        this.$('.frost-link').hasClass('secondary'),
        'secondary class is set'
      ).to.equal(true)
    })
  })

  describe('Size property', function () {
    it('has small class set', function () {
      this.render(hbs`
        {{frost-link 'title' 'testRoute'
          hook='myLink'
          size='small'
        }}
      `)

      expect(
        this.$('.frost-link').hasClass('small'),
        'small class is set'
      ).to.equal(true)
    })

    it('has medium class set', function () {
      this.render(hbs`
        {{frost-link 'title' 'testRoute'
          hook='myLink'
          size='medium'
        }}
      `)

      expect(
        this.$('.frost-link').hasClass('medium'),
        'medium class is set'
      ).to.equal(true)
    })

    it('has large class set', function () {
      this.render(hbs`
        {{frost-link 'title' 'testRoute'
          hook='myLink'
          size='large'
        }}
      `)

      expect(
        this.$('.frost-link').hasClass('large'),
        'large class is set'
      ).to.equal(true)
    })
  })

  describe('Design property', function () {
    it('has info-bar class set', function () {
      this.render(hbs`
        {{#frost-link 'testRoute'
          design='info-bar'
          hook='myLink'
        }}
          Yielded content
        {{/frost-link}}
      `)

      expect(
        this.$('.frost-link').hasClass('info-bar'),
        'info-bar class is set'
      ).to.equal(true)
    })

    it('has inline class set', function () {
      this.render(hbs`
        {{#frost-link 'testRoute'
          design='inline'
          hook='myLink'
        }}
          Yielded content
        {{/frost-link}}
      `)

      expect(
        this.$('.frost-link').hasClass('inline'),
        'inline class is set'
      ).to.equal(true)
    })
  })

  it('sets disabled property', function () {
    this.render(hbs`
      {{frost-link 'title' 'testRoute'
          disabled=true
          hook='myLink'
      }}
    `)

    expect(
      this.$('.frost-link').hasClass('disabled'),
      'disabled class is set'
    ).to.equal(true)
  })

  it('sets icon property', function () {
    const priority = 'primary'

    this.set('priority', priority)

    this.render(hbs`
      {{frost-link 'title' 'testRoute'
        hook='myLink'
        priority=priority
      }}
    `)

    expect(
      this.$('.frost-icon-frost-open-tabs'),
      'icon property is set'
    ).to.have.length(1)
  })

  it('calls onClick closure action', function () {
    const externalActionSpy = sinon.spy()

    this.on('externalAction', externalActionSpy)

    this.render(hbs`
      {{frost-link 'title'
        hook='myLink'
        onClick=(action 'externalAction')
      }}
    `)

    this.$('a').trigger('click')

    return wait()
      .then(() => {
        expect(
          externalActionSpy.called,
          'onClick closure action called'
        ).to.equal(true)
      })
  })

  it('renders using spread', function () {
    this.render(hbs`
      {{frost-link
        options=(hash
          hook='myLink'
          priority='secondary'
          route='testRoute'
          text='title'
        )
      }}
    `)

    expect(
      this.$('.frost-link').hasClass('secondary'),
      'secondary class is set'
    ).to.equal(true)

    expect(
      this.$('.frost-link').text().trim(),
      'text is set'
    ).to.equal('title')

    // The route href needs to be tested against a running application
  })
})
