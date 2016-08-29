import {expect} from 'chai'
import {$hook, initialize} from 'ember-hook'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach, describe} from 'mocha'

describeComponent(
  'frost-button',
  'Integration: FrostButtonComponent',
  {
    integration: true
  },
  function () {
    beforeEach(function () {
      initialize()
    })

    it('renders a text button as expected', function () {
      this.render(hbs`
        {{frost-button text='Text'}}
      `)

      expect(
        this.$('.frost-button').find(':first-child').hasClass('text'),
        'Text button has the correct class'
      ).to.be.true

      expect(
        this.$('.frost-button').text().trim(),
        'Text is set correctly'
      ).to.eql('Text')
    })

    it('renders an icon button as expected', function () {
      this.render(hbs`
        {{frost-button icon='icon'}}
      `)

      expect(
        this.$('.frost-button').find(':first-child').hasClass('icon'),
        'Icon button has the correct class'
      ).to.be.true
    })

    it('renders a text and icon button as expected', function () {
      this.render(hbs`
        {{frost-button
          icon='round-add'
          text='Test'
        }}
      `)

      expect(
        this.$('.frost-icon-frost-round-add'),
        'includes expected icon'
      ).to.have.length(1)

      expect(
        this.$('.frost-button').find(':first-child').hasClass('icon-text'),
        'Icon and Text button has the correct class'
      ).to.be.true

      expect(
        this.$('.frost-button').text().trim(),
        'Button text is set'
      ).to.eql('Test')
    })

    it('sets the hook property', function () {
      this.render(hbs`
        {{frost-button
          hook='my-button'
          icon='round-add'
          text='Test'
        }}
      `)

      expect(
        $hook('my-button').text().trim(),
        'Hook is set correctly'
      ).to.equal('Test')
    })

    describe('Priority property', function () {
      it('has primary class set', function () {
        this.render(hbs`
          {{frost-button
            priority='primary'
            size='medium'
            text='Text'
          }}
        `)

        expect(
          this.$('.frost-button').hasClass('primary'),
          'primary class is set'
        ).to.be.true
      })

      it('has secondary class set', function () {
        this.render(hbs`
          {{frost-button
            priority='secondary'
            size='medium'
            text='Text'
          }}
        `)

        expect(
          this.$('.frost-button').hasClass('secondary'),
          'secondary class is set'
        ).to.be.true
      })

      it('has tertiary class set', function () {
        this.render(hbs`
          {{frost-button
            priority='tertiary'
            size='medium'
            text='Text'
          }}
        `)

        expect(
          this.$('.frost-button').hasClass('tertiary'),
          'tertiary class is set'
        ).to.be.true
      })
    })

    describe('Size property', function () {
      it('has small class set', function () {
        this.render(hbs`
          {{frost-button
            priority='primary'
            size='small'
            text='Text'
          }}
        `)

        expect(
          this.$('.frost-button').hasClass('small'),
          'small class is set'
        ).to.be.true
      })

      it('has medium class set', function () {
        this.render(hbs`
          {{frost-button
            priority='secondary'
            size='medium'
            text='Text'
          }}
        `)

        expect(
          this.$('.frost-button').hasClass('medium'),
          'medium class is set'
        ).to.be.true
      })

      it('has large class set', function () {
        this.render(hbs`
          {{frost-button
            priority='secondary'
            size='large'
            text='Text'
          }}
        `)

        expect(
          this.$('.frost-button').hasClass('large'),
          'large class is set'
        ).to.be.true
      })
    })

    describe('Design property', function () {
      it('has info-bar class set', function () {
        this.render(hbs`
          {{frost-button
            design='info-bar'
            icon='icon'
            text='Text'
          }}
        `)

        expect(
          this.$('.frost-button').hasClass('info-bar'),
          'info-bar class is set'
        ).to.be.true
      })

      it('has app-bar class set', function () {
        this.render(hbs`
          {{frost-button
            design='app-bar'
            icon='icon'
            text='Text'
          }}
        `)

        expect(
          this.$('.frost-button').hasClass('app-bar'),
          'app-bar class is set'
        ).to.be.true
      })

      it('has tab class set', function () {
        this.render(hbs`
          {{frost-button
            design='tab'
            icon='icon'
            text='Text'
          }}
        `)

        expect(
          this.$('.frost-button').hasClass('tab'),
          'tab class is set'
        ).to.be.true
      })
    })

    it('sets autofocus property', function () {
      this.render(hbs`
        {{frost-button
          priority='secondary'
          size='small'
          text='Testing'
          autofocus=true
        }}
      `)

      expect(
        this.$('.frost-button').attr('autofocus'),
        'autofocus class is set'
      ).to.eql('autofocus')
    })

    it('sets disabled property', function () {
      this.render(hbs`
        {{frost-button
          priority='secondary'
          size='small'
          text='Testing'
          disabled=true
        }}
      `)

      expect(
        this.$('.frost-button').attr('disabled'),
        'disabled class is set'
      ).to.eql('disabled')
    })

    it('sets title property', function () {
      this.render(hbs`
        {{frost-button
          priority='secondary'
          size='small'
          text='Testing'
          title="This is a button"
        }}
      `)

      expect(
        this.$('.frost-button').attr('title'),
        'title class is set'
      ).to.eql('This is a button')
    })

    it('sets vertical property', function () {
      this.render(hbs`
        {{frost-button
          icon='add'
          priority='primary'
          size='medium'
          text='Testing'
          vertical=true
        }}
      `)

      expect(
        this.$('.frost-button').hasClass('vertical'),
        'vertical class is set'
      ).to.be.true
    })

    it('fires onClick closure action', function (done) {
      this.on('externalAction', function () {
        expect(
          true,
          'onClick closure action called'
        ).to.be.ok
        done()
      })

      this.render(hbs`
        {{frost-button
          priority='primary'
          size='medium'
          text='Text'
          onClick=(action 'externalAction')
        }}
      `)

      this.$('button').click()
    })

    it('fires onFocus closure action', function (done) {
      this.on('externalAction', function () {
        expect(
          true,
          'onFocus closure action called'
        ).to.be.ok
        done()
      })

      this.render(hbs`
        {{frost-button
          priority='primary'
          size='medium'
          text='Text'
          onFocus=(action 'externalAction')
        }}
      `)

      this.$('button').focusin()
    })
  }
)
