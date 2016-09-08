import {expect} from 'chai'
import {
  describeComponent,
  it
} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import {
  afterEach,
  beforeEach,
  describe
} from 'mocha'
import sinon from 'sinon'

describeComponent(
  'frost-link',
  'Integration: FrostLinkComponent',
  {
    integration: true
  },
  function () {
    it('renders default values', function () {
      this.render(hbs`
        {{#frost-link 'test'}}
          Yielded content
        {{/frost-link}}
      `)

      expect(
        this.$('.frost-link'),
        'has the correct class'
      ).to.have.length(1)

      expect(
        this.$('.frost-link').text().trim(),
        'Yields content'
      ).to.eql('Yielded content')
    })

    describe('Priority property', function () {
      it('has primary class set', function () {
        this.render(hbs`
          {{#frost-link
            'test'
            priority='primary'
          }}
            Yielded content
          {{/frost-link}}
        `)

        expect(
          this.$('.frost-link').hasClass('primary'),
          'primary class is set'
        ).to.be.true
      })

      it('has secondary class set', function () {
        this.render(hbs`
          {{#frost-link
            'test'
            priority='secondary'
          }}
            Yielded content
          {{/frost-link}}
        `)

        expect(
          this.$('.frost-link').hasClass('secondary'),
          'secondary class is set'
        ).to.be.true
      })
    })

    describe('Size property', function () {
      it('has small class set', function () {
        this.render(hbs`
          {{#frost-link
            'test'
            size='small'
          }}
            Yielded content
          {{/frost-link}}
        `)

        expect(
          this.$('.frost-link').hasClass('small'),
          'small class is set'
        ).to.be.true
      })

      it('has medium class set', function () {
        this.render(hbs`
          {{#frost-link
            'test'
            size='medium'
          }}
            Yielded content
          {{/frost-link}}
        `)

        expect(
          this.$('.frost-link').hasClass('medium'),
          'medium class is set'
        ).to.be.true
      })

      it('has large class set', function () {
        this.render(hbs`
          {{#frost-link
            'test'
            size='large'
          }}
            Yielded content
          {{/frost-link}}
        `)

        expect(
          this.$('.frost-link').hasClass('large'),
          'large class is set'
        ).to.be.true
      })
    })

    describe('Design property', function () {
      it('has info-bar class set', function () {
        this.render(hbs`
          {{#frost-link
            'test'
            design='info-bar'
          }}
            Yielded content
          {{/frost-link}}
        `)

        expect(
          this.$('.frost-link').hasClass('info-bar'),
          'info-bar class is set'
        ).to.be.true
      })

      it('has inline class set', function () {
        this.render(hbs`
          {{#frost-link
            'test'
            design='inline'
          }}
            Yielded content
          {{/frost-link}}
        `)

        expect(
          this.$('.frost-link').hasClass('in-line'),
          'in-line class is set'
        ).to.be.true
      })
    })

    it('sets disabled property', function () {
      this.render(hbs`
        {{#frost-link
            'test'
            disabled=true
          }}
            Yielded content
          {{/frost-link}}
      `)

      expect(
        this.$('.frost-link').hasClass('disabled'),
        'disabled class is set'
      ).to.be.true
    })

    it('sets icon property', function () {
      const design = 'info-bar'
      const icon = 'infobar-find'

      this.set('design', design)
      this.set('icon', icon)

      this.render(hbs`
        {{#frost-link
            'test'
            icon=icon
            design=design
          }}
            Yielded content
          {{/frost-link}}
      `)

      expect(
        this.$('.frost-icon-frost-infobar-find'),
        'icon property is set'
      ).to.have.length(1)
    })

    it('calls onClick closure action', function () {
      const externalActionSpy = sinon.spy()

      this.on('externalAction', externalActionSpy)

      this.render(hbs`
        {{#frost-link
          onClick=(action 'externalAction')
        }}
          Yielded content
        {{/frost-link}}
      `)

      this.$('a').trigger('click')

      expect(
        externalActionSpy.called,
        'onClick closure action called'
      ).to.be.true
    })
  }
)
