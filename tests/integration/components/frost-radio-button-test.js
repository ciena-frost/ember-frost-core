import {expect} from 'chai'
import {$hook} from 'ember-hook'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {describe, it} from 'mocha'
import sinon from 'sinon'

const test = integration('frost-radio-button')
describe(test.label, function () {
  test.setup()

  describe('Checked property', function () {
    it('should set checked property', function () {
      this.render(hbs`
        {{frost-radio-button
          checked=true
          hook='myRadioButton'
          value='testValue'
        }}
      `)

      expect(
        this.$('.frost-radio-button').hasClass('checked'),
        'checked class is set'
      ).to.equal(true)

      expect(
        this.$('.frost-radio-button-input').prop('checked'),
        'checked is set'
      ).to.equal(true)
    })

    it('should not set checked property', function () {
      this.render(hbs`
          {{frost-radio-button
            hook='myRadioButton'
            value='testValue'
          }}
      `)

      expect(
        this.$('.frost-radio-button').hasClass('checked'),
        'checked class is set'
      ).to.equal(false)

      expect(
        this.$('.frost-radio-button-input').prop('checked'),
        'checked is set'
      ).to.equal(false)
    })
  })

  describe('Disabled property', function () {
    it('should set disabled property', function () {
      this.render(hbs`
        {{frost-radio-button
          disabled=true
          hook='myRadioButton'
          value='testValue'
        }}
      `)

      expect(
        this.$('.frost-radio-button').hasClass('disabled'),
        'disabled class is set'
      ).to.equal(true)

      expect(
        this.$('.frost-radio-button-input').prop('disabled'),
        'disabled class is set'
      ).to.equal(true)
    })
  })

  describe('Hook property', function () {
    it('should set when passed into radio-button', function () {
      const value = 'testValue'

      this.set('value', value)

      this.render(hbs`
        {{frost-radio-button
          hook='my-radio-button'
          value=value
        }}
      `)

      expect(
        $hook('my-radio-button-input', {value: value}).hasClass('frost-radio-button-input'),
        'input hook is set'
      ).to.equal(true)
    })
  })

  describe('Size property', function () {
    it('should have small class set', function () {
      const size = 'small'

      this.set('size', size)

      this.render(hbs`
        {{frost-radio-button
          hook='myRadioButton'
          size=size
          value='testValue'
        }}
      `)

      expect(
        this.$('.frost-radio-button').hasClass(size),
        'small class is set'
      ).to.equal(true)
    })

    it('should have medium class set', function () {
      const size = 'medium'

      this.set('size', size)

      this.render(hbs`
        {{frost-radio-button
          hook='myRadioButton'
          size=size
          value='testValue'
        }}
      `)

      expect(
        this.$('.frost-radio-button').hasClass(size),
        'medium class is set'
      ).to.equal(true)
    })

    it('should have large class set', function () {
      const size = 'large'

      this.set('size', size)

      this.render(hbs`
        {{frost-radio-button
          hook='myRadioButton'
          size=size
          value='testValue'
        }}
      `)

      expect(
        this.$('.frost-radio-button').hasClass(size),
        'large class is set'
      ).to.equal(true)
    })
  })

  it('should set required property', function () {
    this.render(hbs`
      {{frost-radio-button
        hook='myRadioButton'
        required=true
        value='testValue'
      }}
    `)

    expect(
      this.$('.frost-radio-button').hasClass('required'),
      'required class is set'
    ).to.equal(true)

    expect(
      this.$('.frost-radio-button-input').prop('required'),
      'required class is set'
    ).to.equal(true)
  })

  it('should set type to "radio"', function () {
    this.render(hbs`
      {{frost-radio-button
        hook='myRadioButton'
        value='testValue'
      }}
    `)

    expect(
      this.$('.frost-radio-button-input').prop('type'),
      'type is set to radio'
    ).to.eql('radio')
  })

  it('should set value property', function () {
    const value = 'test value'

    this.set('value', value)

    this.render(hbs`
      {{frost-radio-button
        hook='myRadioButton'
        value=value
      }}
    `)

    expect(
      this.$('.frost-radio-button-input').prop('value'),
      'value is set'
    ).to.eql(value)
  })

  describe('Label property', function () {
    it('should set correctly with inline format', function () {
      const text = 'my-text'

      this.set('text', text)

      this.render(hbs`
        {{frost-radio-button
          hook='myRadioButton'
          value='test value'
          label=text
        }}
      `)

      expect(
        this.$('.frost-radio-button').text().trim(),
        'label is set'
      ).to.eql(text)
    })

    it('should set correctly with block format', function () {
      const text = 'my-text'

      this.set('text', text)

      this.render(hbs`
        {{#frost-radio-button
          hook='myRadioButton'
          value='test value'
        }}
          {{text}}
        {{/frost-radio-button}}
      `)

      expect(
        this.$('.frost-radio-button').text().trim(),
        'label is set'
      ).to.eql(text)
    })
  })

  describe('Radio button in group', function () {
    describe('Checked property', function () {
      it('should set checked property', function () {
        this.render(hbs`
          {{#frost-radio-group
            hook='myRadioGroup'
            selectedValue='testValue'
            as |controls|
          }}
            {{controls.button value='testValue'}}
          {{/frost-radio-group}}
        `)

        expect(
          this.$('.frost-radio-button').hasClass('checked'),
          'checked class is set'
        ).to.equal(true)

        expect(
          this.$('.frost-radio-button-input').prop('checked'),
          'checked is set'
        ).to.equal(true)
      })

      it('should not set checked property', function () {
        this.render(hbs`
          {{#frost-radio-group hook='myRadioGroup' as |controls|}}
            {{controls.button value='testValue'}}
          {{/frost-radio-group}}
        `)

        expect(
          this.$('.frost-radio-button').hasClass('checked'),
          'checked class is set'
        ).to.equal(false)

        expect(
          this.$('.frost-radio-button-input').prop('checked'),
          'checked is set'
        ).to.equal(false)
      })
    })

    describe('Disabled property', function () {
      it('should set disabled property', function () {
        this.render(hbs`
          {{#frost-radio-group hook='myRadioGroup' as |controls|}}
            {{controls.button
              disabled=true
              value='testValue'
            }}
          {{/frost-radio-group}}
        `)

        expect(
          this.$('.frost-radio-button').hasClass('disabled'),
          'disabled class is set'
        ).to.equal(true)

        expect(
          this.$('.frost-radio-button-input').prop('disabled'),
          'disabled class is set'
        ).to.equal(true)
      })
    })

    describe('Hook property', function () {
      it('should set when passed into radio-group', function () {
        const value = 'testValue'

        this.set('value', value)

        this.render(hbs`
          {{#frost-radio-group
            hook='my-radio-group'
            as |controls|
          }}
            {{controls.button
              value=value
            }}
          {{/frost-radio-group}}
        `)

        expect(
          $hook('my-radio-group-button', {value: value}).hasClass('frost-radio-button'),
          'radio button hook is set'
        ).to.equal(true)

        expect(
          $hook('my-radio-group-button-input', {value: value}).hasClass('frost-radio-button-input'),
          'input hook is set'
        ).to.equal(true)
      })
    })

    describe('Size property', function () {
      it('should have small class set', function () {
        const size = 'small'

        this.set('size', size)

        this.render(hbs`
          {{#frost-radio-group hook='myRadioGroup' as |controls|}}
            {{controls.button
              size=size
              value='testValue'
            }}
          {{/frost-radio-group}}
        `)

        expect(
          this.$('.frost-radio-button').hasClass(size),
          'small class is set'
        ).to.equal(true)
      })

      it('should have medium class set', function () {
        const size = 'medium'

        this.set('size', size)

        this.render(hbs`
          {{#frost-radio-group hook='myRadioGroup' as |controls|}}
            {{controls.button
              size=size
              value='testValue'
            }}
          {{/frost-radio-group}}
        `)

        expect(
          this.$('.frost-radio-button').hasClass(size),
          'medium class is set'
        ).to.equal(true)
      })

      it('should have large class set', function () {
        const size = 'large'

        this.set('size', size)

        this.render(hbs`
          {{#frost-radio-group hook='myRadioGroup' as |controls|}}
            {{controls.button
              size=size
              value='testValue'
            }}
          {{/frost-radio-group}}
        `)

        expect(
          this.$('.frost-radio-button').hasClass(size),
          'large class is set'
        ).to.equal(true)
      })
    })

    it('should set required property', function () {
      this.render(hbs`
        {{#frost-radio-group hook='myRadioGroup' as |controls|}}
          {{controls.button
            required=true
            value='testValue'
          }}
        {{/frost-radio-group}}
      `)

      expect(
        this.$('.frost-radio-button').hasClass('required'),
        'required class is set'
      ).to.equal(true)

      expect(
        this.$('.frost-radio-button-input').prop('required'),
        'required class is set'
      ).to.equal(true)
    })

    it('should set value property', function () {
      const value = 'test value'

      this.set('value', value)

      this.render(hbs`
        {{#frost-radio-group hook='myRadioGroup' as |controls|}}
          {{controls.button
            value=value
          }}
        {{/frost-radio-group}}
      `)

      expect(
        this.$('.frost-radio-button-input').prop('value'),
        'value is set'
      ).to.eql(value)
    })

    describe('Label property', function () {
      it('should set correctly with inline format', function () {
        const text = 'my-text'

        this.set('text', text)

        this.render(hbs`
          {{#frost-radio-group hook='myRadioGroup' as |controls|}}
            {{controls.button
              value='test value'
              label=text
            }}
          {{/frost-radio-group}}
        `)

        expect(
          this.$('.frost-radio-button').text().trim(),
          'label is set'
        ).to.eql(text)
      })

      it('should set correctly with block format', function () {
        const text = 'my-text'

        this.set('text', text)

        this.render(hbs`
          {{#frost-radio-group hook='myRadioGroup' as |controls|}}
            {{#controls.button
              value='test value'
            }}
              {{text}}
            {{/controls.button}}
          {{/frost-radio-group}}
        `)

        expect(
          this.$('.frost-radio-button').text().trim(),
          'label is set'
        ).to.eql(text)
      })
    })

    describe('onChange closure action', function () {
      it('should be called on click', function () {
        const externalActionSpy = sinon.spy()

        this.on('externalAction', externalActionSpy)

        this.render(hbs`
          {{frost-radio-button
            hook='myRadioButton'
            value='testValue'
            onChange=(action 'externalAction')
          }}
        `)

        this.$('input').trigger('click')

        expect(
          externalActionSpy.called,
          'onChange closure action called on click'
        ).to.equal(true)
      })
    })
  })

  describe('onChange closure action', function () {
    it('should be called on keypress of "enter"', function () {
      const externalActionSpy = sinon.spy()

      this.on('externalAction', externalActionSpy)

      this.render(hbs`
        {{#frost-radio-group
          hook='myRadioGroup'
          id='groupId'
          onChange=(action 'externalAction')
          as |controls|
        }}
          {{controls.button value='testValue'}}
        {{/frost-radio-group}}
      `)

      this.$('.frost-radio-button').trigger({type: 'keypress', keyCode: 13})

      expect(
        externalActionSpy.called,
        'onChange closure action called on keypress "enter"'
      ).to.equal(true)
    })

    it('should be called on keypress of "spacebar"', function () {
      const externalActionSpy = sinon.spy()

      this.on('externalAction', externalActionSpy)

      this.render(hbs`
        {{#frost-radio-group
          hook='myRadioGroup'
          id='groupId'
          onChange=(action 'externalAction')
          as |controls|
        }}
          {{controls.button value='testValue'}}
        {{/frost-radio-group}}
      `)

      this.$('.frost-radio-button').trigger({type: 'keypress', keyCode: 32})

      expect(
        externalActionSpy.called,
        'onChange closure action called on keypress "spacebar"'
      ).to.equal(true)
    })

    it('should be called on click', function () {
      const externalActionSpy = sinon.spy()

      this.on('externalAction', externalActionSpy)

      this.render(hbs`
        {{#frost-radio-group
          hook='myRadioGroup'
          id='groupId'
          onChange=(action 'externalAction')
          as |controls|
        }}
          {{controls.button value='testValue'}}
        {{/frost-radio-group}}
      `)

      this.$('input').trigger('click')

      expect(
        externalActionSpy.called,
        'onChange closure action called on click'
      ).to.equal(true)
    })
  })

  it('should call _createEvent() which sets the target id ', function () {
    const externalActionSpy = sinon.spy()
    const id = 'myTestGroupId'

    this.set('id', id)
    this.on('externalAction', externalActionSpy)

    this.render(hbs`
      {{#frost-radio-group
        hook='myRadioGroup'
        id=id
        onChange=(action 'externalAction')
        as |controls|
      }}
        {{controls.button value='testValue'}}
      {{/frost-radio-group}}
    `)

    this.$('input').trigger('click')

    expect(
      externalActionSpy.args[0][0].target.id,
      '_createEvent() added groupId'
    ).to.eql(id)
  })

  it('should render using spread', function () {
    this.render(hbs`
      {{frost-radio-button
        options=(hash
          disabled=true
          hook='myRadioButton'
          value='testValue'
        )
      }}
    `)

    expect(
      this.$('.frost-radio-button').hasClass('disabled'),
      'disabled class is set'
    ).to.equal(true)

    expect(
      this.$('.frost-radio-button-input').prop('disabled'),
      'disabled class is set'
    ).to.equal(true)
  })
})
