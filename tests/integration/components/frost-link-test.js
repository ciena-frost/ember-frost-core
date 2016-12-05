import {expect} from 'chai'
import {
  describeComponent,
  it
} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import {
  describe
} from 'mocha'
import sinon from 'sinon'
import wait from 'ember-test-helpers/wait'

describeComponent(
  'frost-link',
  'Integration: FrostLinkComponent',
  {
    integration: true
  },
  function () {
    it('renders default values', function () {
      this.render(hbs`
        {{frost-link 'title' 'testRoute'}}
      `)

      expect(
        this.$('.frost-link'),
        'has the correct class'
      ).to.have.length(1)
    })

    it('yields content', function () {
      this.render(hbs`
        {{#frost-link 'testRoute'}}
          Yielded title
        {{/frost-link}}
      `)

      expect(
        this.$('.frost-link').text().trim(),
        'Yields content'
      ).to.eql('Yielded title')
    })

    it('sets the link title', function () {
      const title = 'Title'

      this.set('title', title)

      this.render(hbs`
        {{frost-link title 'testRoute'}}
      `)

      expect(
        this.$('.frost-link').text().trim(),
        'Link title is set'
      ).to.eql(title)
    })

    describe('RouteNames property', function () {
      it('target is not set', function () {
        this.render(hbs`
          {{frost-link 'title'
            routeNames=(array 'testRoute')
            priority='primary'
          }}
        `)

        expect(
          this.$('.frost-link').prop('target'),
          'target should not be set set'
        ).to.equal('')
      })

      it('target is not set in block format', function () {
        this.render(hbs`
          {{#frost-link
            routeNames=(array 'testRoute')
            priority='primary'
          }}
            title
          {{/frost-link}}
        `)

        expect(
          this.$('.frost-link').prop('target'),
          'target should not be set set'
        ).to.equal('')
      })
    })

    describe('Priority property', function () {
      it('has primary class set', function () {
        this.render(hbs`
          {{frost-link 'title' 'testRoute'
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
        {{frost-link 'title' 'testRoute'
          options=(hash
            priority='primary'
          )
        }}
      `)

      expect(
        this.$('.frost-link').hasClass('primary'),
        'primary class is set'
      ).to.equal(true)
    })
  }
)
