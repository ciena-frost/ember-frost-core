import {expect} from 'chai'
import Ember from 'ember'
const {Logger} = Ember
import wait from 'ember-test-helpers/wait'
import hbs from 'htmlbars-inline-precompile'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

import {integration} from 'dummy/tests/helpers/ember-test-utils/setup-component-test'

const test = integration('frost-external-link')
describe(test.label, function () {
  test.setup()

  let sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('when instantiated using inline hash format', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-external-link
          hook='myLink'
          href='http://www.test.com/'
          text='Test'
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
        {{#frost-external-link
          hook='myLink'
          href='http://www.test.com/'
        }}
          <em>Test</em>
        {{/frost-external-link}}
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

  describe('when design used in conjunction with priority', function () {
    beforeEach(function () {
      sandbox.stub(Logger, 'warn')

      this.render(hbs`
        {{frost-external-link
          design='inline'
          hook='myLink'
          href='http://www.test.com/'
          priority='primary'
          text='Test'
        }}
      `)
    })

    it('logs warning', function () {
      expect(Logger.warn.calledWith(
        'Warning: The `design` property takes precedence over `size` and `priority`.'
      )).to.equal(true)
    })
  })

  describe('when design used in conjunction with size', function () {
    beforeEach(function () {
      sandbox.stub(Logger, 'warn')

      this.render(hbs`
        {{frost-external-link
          design='inline'
          hook='myLink'
          href='http://www.test.com/'
          size='small'
          text='Test'
        }}
      `)
    })

    it('logs warning', function () {
      expect(Logger.warn.calledWith(
        'Warning: The `design` property takes precedence over `size` and `priority`.'
      )).to.equal(true)
    })
  })

  describe('Priority property', function () {
    it('has primary class set', function () {
      this.render(hbs`
        {{frost-external-link
          hook='myLink'
          href='http://www.test.com/'
          priority='primary'
          text='Test'
        }}
      `)

      expect(
        this.$('.frost-link').hasClass('primary'),
        'primary class is set'
      ).to.equal(true)
    })

    it('has secondary class set', function () {
      this.render(hbs`
        {{frost-external-link
          hook='myLink'
          href='http://www.test.com/'
          priority='secondary'
          text='Test'
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
        {{frost-external-link
          hook='myLink'
          href='http://www.test.com/'
          size='small'
          text='Test'
        }}
      `)

      expect(
        this.$('.frost-link').hasClass('small'),
        'small class is set'
      ).to.equal(true)
    })

    it('has medium class set', function () {
      this.render(hbs`
        {{frost-external-link
          hook='myLink'
          href='http://www.test.com/'
          size='medium'
          text='Test'
        }}
      `)

      expect(
        this.$('.frost-link').hasClass('medium'),
        'medium class is set'
      ).to.equal(true)
    })

    it('has large class set', function () {
      this.render(hbs`
        {{frost-external-link
          hook='myLink'
          href='http://www.test.com/'
          size='large'
          text='Test'
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
        {{#frost-external-link
          design='info-bar'
          hook='myLink'
          href='http://www.test.com/'
          text='Test'
        }}
          Yielded content
        {{/frost-external-link}}
      `)

      expect(
        this.$('.frost-link').hasClass('info-bar'),
        'info-bar class is set'
      ).to.equal(true)
    })

    it('has inline class set', function () {
      this.render(hbs`
        {{#frost-external-link
          design='inline'
          hook='myLink'
          href='http://www.test.com/'
          text='Test'
        }}
          Yielded content
        {{/frost-external-link}}
      `)

      expect(
        this.$('.frost-link').hasClass('inline'),
        'inline class is set'
      ).to.equal(true)
    })
  })

  describe('Disabled property', function () {
    const externalActionSpy = sinon.spy()

    beforeEach(function () {
      this.on('externalAction', externalActionSpy)
      this.render(hbs`
        {{frost-external-link
          disabled=true
          hook='myLink'
          href='http://www.test.com/'
          onClick=(action 'externalAction')
          priority='primary'
          text='Test'
        }}
      `)
    })

    it('sets disabled property', function () {
      expect(
        this.$('.frost-link').hasClass('disabled'),
        'disabled class is set'
      ).to.equal(true)
    })

    it('onClick not called', function () {
      this.$('a').trigger('click')

      return wait()
        .then(() => {
          expect(
            externalActionSpy.called,
            'onClick closure action called'
          ).to.equal(false)
        })
    })
  })

  it('sets target property', function () {
    this.render(hbs`
      {{frost-external-link
        hook='myLink'
        href='http://www.test.com/'
        priority='primary'
        text='Test'
        target='test'
      }}
    `)

    expect(
      this.$('.frost-link').prop('target'),
      'target property is set'
    ).to.equal('test')
  })

  it('sets href property', function () {
    this.render(hbs`
      {{frost-external-link
        hook='myLink'
        href='http://www.test.com/'
        priority='primary'
        text='Test'
      }}
    `)

    expect(
      this.$('.frost-link').prop('href'),
      'href property is set'
    ).to.equal('http://www.test.com/')
  })

  it('sets tabindex property', function () {
    this.render(hbs`
      {{frost-external-link
        hook='myLink'
        href='http://www.test.com/'
        priority='primary'
        text='Test'
        tabindex='-1'
      }}
    `)

    expect(
      this.$('.frost-link').prop('tabindex'),
      'tabindex property is set'
    ).to.equal(-1)
  })

  it('sets icon property', function () {
    const priority = 'primary'

    this.set('priority', priority)

    this.render(hbs`
      {{frost-external-link
        hook='myLink'
        href='http://www.test.com/'
        priority=priority
        text='Test'
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
      {{frost-external-link
        hook='myLink'
        href='http://www.test.com/'
        onClick=(action 'externalAction')
        text='Test'
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
      {{frost-external-link
        options=(hash
          hook='myLink'
          href='http://www.test.com/'
          priority='secondary'
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
  })
})
