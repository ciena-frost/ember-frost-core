import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import {beforeEach} from 'mocha'
import hbs from 'htmlbars-inline-precompile'
import {$hook, initialize} from 'ember-hook'
import wait from 'ember-test-helpers/wait'

describeComponent(
	'frost-text',
	'Integration: FrostTextComponent',
	{
		integration: true
	},
	function () {
		beforeEach(function () {
			initialize()
		})

		it('renders', function () {
			this.render(hbs`
				{{frost-text}}
			`)

			expect(
				this.$('input').attr('tabindex'),
				'tabindex is set'
				).to.eql('0')

			expect(
				this.$('input').attr('type'),
				'type is set'
				).to.eql('text')

			expect(
				this.$('input').hasClass('frost-text-input'),
				'class "frost-text-input" is set'
				).to.be.true

			expect(
				this.$('input').hasClass('left'),
				'class "left" is set'
				).to.be.true

			expect(
				this.$('.frost-text-clear'),
				'class "frost-text-clear" is set'
				).to.have.length(1)
		})

		it('sets align property', function () {
			const align = 'right'

			this.set('align', align)

			this.render(hbs`
				{{frost-text
					align=align
				}}
			`)

			expect(
				this.$('input').hasClass('right'),
				'class "right" is set'
				).to.be.true
		})

		it('sets autofocus property', function () {
			this.render(hbs`
				{{frost-text
					autofocus=true
				}}
			`)

			expect(
				this.$('input').attr('autofocus'),
				'autofocus class is set'
				).to.eql('autofocus')
		})

		it('sets value property', function () {
			const value = 'Testing'

			this.set('value', value)

			this.render(hbs`
				{{frost-text
					value=value
				}}
			`)

			expect(
				this.$('input').val(),
				'value is set'
				).to.eql('Testing')
		})

    it('set disabled property', function() {
        this.render(hbs`
          {{frost-text
            disabled=true
          }}
        `)

        expect(
          this.$('input').attr('disabled'),
          'autofocus class is set'
        ).to.eql('disabled')
    })
    
		it('only renders the clear icon in insert', function () {
      this.render(hbs`
        {{frost-text
          hook='test'
        }}
      `)
      return wait().then(() => {
        this.$('input').val('hello')
        this.$('input').trigger('input')
      })

      expect(
        $hook('test').hasClass('is-clear-visible'),
        'class "is-clear-visible" is set'
      ).to.be.true
		})

    it('calls onFocus closure action', function () {
      const externalActionSpy = sinon.spy()

      this.on('externalAction', externalActionSpy)

      this.render(hbs`
        {{frost-checkbox
          focusIn=(action 'externalAction')
        }}
      `)

      this.$('input').trigger('focusin')

      expect(
        externalActionSpy.called,
        'focusIn closure action called'
      ).to.be.true
    })

		it('hook attr grabs frost-text as expected', function () {
			this.render(hbs`
				{{frost-text 
          hook='my-text'
        }}
			`)

			expect(
				$hook('my-text-input').hasClass('frost-text-input'),
				'input hook is set'
				).to.be.true

			expect(
				$hook('my-text-clear').hasClass('frost-text-clear'),
				'clear hook is set'
				).to.be.true
		})

		it('sets error class', function() {
      this.set('error', 'error')
			this.render(hbs`
				{{frost-text
					class=error
          hook='test'
        }}
			`)
      //debugger
			expect(
				$hook('test').hasClass('error'),
				'error class is set'
				).to.be.true
		})
	}
)