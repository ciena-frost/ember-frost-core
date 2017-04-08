import {expect} from 'chai'
import {$hook} from 'ember-hook'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

import {integration} from 'dummy/tests/helpers/ember-test-utils/setup-component-test'

const test = integration('frost-button')
describe(test.label, function () {
  test.setup()

  describe('when setting text property', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-button
          hook='myButton'
          text='Text'
        }}
      `)
    })

    it('should have the "text" class', function () {
      expect(this.$('.text')).to.have.length(1)
    })

    it('should have the text set correctly', function () {
      expect(this.$('.frost-button').text().trim()).to.equal('Text')
    })
  })

  describe('when setting icon property', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-button
          hook='myButton'
          icon='icon'
        }}
      `)
    })

    it('should have the "icon" class', function () {
      expect(this.$('.icon')).to.have.length(1)
    })
  })

  describe('when setting text and icon together', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-button
          hook='myButton'
          icon='round-add'
          text='Test'
        }}
      `)
    })

    it('should include the expected icon', function () {
      expect(this.$('.frost-icon-frost-round-add')).to.have.length(1)
    })

    it('should have the "icon-text" class', function () {
      expect(this.$('.icon-text')).to.have.length(1)
    })

    it('should have the proper button text', function () {
      expect(this.$('.frost-button').text().trim()).to.equal('Test')
    })
  })

  describe('when hook property is set', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-button
          hook='my-button'
          icon='round-add'
          text='Test'
        }}
      `)
    })

    it('should set the hook properly', function () {
      expect($hook('my-button').text().trim()).to.equal('Test')
    })
  })

  describe('Priority property', function () {
    describe('when it is "primary"', function () {
      beforeEach(function () {
        this.render(hbs`
          {{frost-button
            hook='myButton'
            priority='primary'
            size='medium'
            text='Text'
          }}
        `)
      })

      it('should have "primary" class', function () {
        expect(this.$('.frost-button')).to.have.class('primary')
      })
    })

    describe('when it is "secondary"', function () {
      beforeEach(function () {
        this.render(hbs`
          {{frost-button
            hook='myButton'
            priority='secondary'
            size='medium'
            text='Text'
          }}
        `)
      })

      it('should have "secondary" class', function () {
        expect(this.$('.frost-button')).to.have.class('secondary')
      })
    })

    describe('when it is "tertiary"', function () {
      beforeEach(function () {
        this.render(hbs`
          {{frost-button
            hook='myButton'
            priority='tertiary'
            size='medium'
            text='Text'
          }}
        `)
      })

      it('should have "tertiary" class', function () {
        expect(this.$('.frost-button')).to.have.class('tertiary')
      })
    })
  })

  describe('Size property', function () {
    describe('when it is "small"', function () {
      beforeEach(function () {
        this.render(hbs`
          {{frost-button
            hook='myButton'
            priority='primary'
            size='small'
            text='Text'
          }}
        `)
      })

      it('should have "small" class', function () {
        expect(this.$('.frost-button')).to.have.class('small')
      })
    })

    describe('when it is "medium"', function () {
      beforeEach(function () {
        this.render(hbs`
          {{frost-button
            hook='myButton'
            priority='primary'
            size='medium'
            text='Text'
          }}
        `)
      })

      it('should have "medium" class', function () {
        expect(this.$('.frost-button')).to.have.class('medium')
      })
    })

    describe('when it is "large"', function () {
      beforeEach(function () {
        this.render(hbs`
          {{frost-button
            hook='myButton'
            priority='primary'
            size='large'
            text='Text'
          }}
        `)
      })

      it('should have "large" class', function () {
        expect(this.$('.frost-button')).to.have.class('large')
      })
    })
  })

  describe('Design property', function () {
    describe('when it is "info-bar"', function () {
      beforeEach(function () {
        this.render(hbs`
          {{frost-button
            design='info-bar'
            hook='myButton'
            icon='icon'
            text='Text'
          }}
        `)
      })

      it('should have "info-bar" class', function () {
        expect(this.$('.frost-button')).to.have.class('info-bar')
      })
    })

    describe('when it is "app-bar"', function () {
      beforeEach(function () {
        this.render(hbs`
          {{frost-button
            design='app-bar'
            hook='myButton'
            icon='icon'
            text='Text'
          }}
        `)
      })

      it('should have "app-bar" class', function () {
        expect(this.$('.frost-button')).to.have.class('app-bar')
      })
    })

    describe('when it is "tab"', function () {
      beforeEach(function () {
        this.render(hbs`
          {{frost-button
            design='tab'
            hook='myButton'
            icon='icon'
            text='Text'
          }}
        `)
      })

      it('should have "tab" class', function () {
        expect(this.$('.frost-button')).to.have.class('tab')
      })
    })
  })

  describe('when autofocus property is set', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-button
          hook='myButton'
          priority='secondary'
          size='small'
          text='Testing'
          autofocus=true
        }}
      `)
    })

    it('should set the "autofocus" property', function () {
      expect(this.$('.frost-button')).to.have.prop('autofocus')
    })
  })

  describe('when disabled property is set', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-button
          hook='myButton'
          priority='secondary'
          size='small'
          text='Testing'
          disabled=true
        }}
      `)
    })

    it('should set the "disabled" property', function () {
      expect(this.$('.frost-button')).to.have.prop('disabled')
    })
  })

  describe('when title property is set', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-button
          hook='myButton'
          priority='secondary'
          size='small'
          text='Testing'
          title="This is a button"
        }}
      `)
    })

    it('should set the "title" property', function () {
      expect(this.$('.frost-button')).to.have.prop('title', 'This is a button')
    })
  })

  describe('when veritcal property is set', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-button
          hook='myButton'
          icon='add'
          priority='primary'
          size='medium'
          text='Testing'
          vertical=true
        }}
      `)
    })

    it('should have the "vertical" class', function () {
      expect(this.$('.frost-button')).to.have.class('vertical')
    })
  })

  describe('when onClick is given and button is clicked', function () {
    let handler
    beforeEach(function () {
      handler = sinon.spy()
      this.setProperties({handler})
      this.render(hbs`
        {{frost-button
          hook='myButton'
          priority='primary'
          size='medium'
          text='Text'
          onClick=(action handler)
        }}
      `)

      this.$('button').click()
    })

    it('should call the handler', function () {
      expect(handler).to.have.callCount(1)
    })
  })

  describe('when onFocus is given and button is focused', function () {
    let handler
    beforeEach(function () {
      handler = sinon.spy()
      this.setProperties({handler})
      this.render(hbs`
        {{frost-button
          hook='myButton'
          priority='primary'
          size='medium'
          text='Text'
          onFocus=(action handler)
        }}
      `)

      this.$('button').trigger('focusin')
    })

    it('should call the handler', function () {
      expect(handler).to.have.callCount(1)
    })
  })

  describe('when using spread to render a text button', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-button
          options=(hash
            hook='myButton'
            text='Text'
          )
        }}
      `)
    })

    it('should have the "text" class', function () {
      expect(this.$('.text')).to.have.length(1)
    })

    it('should have the proper text value', function () {
      expect(this.$('.frost-button').text().trim()).to.equal('Text')
    })
  })
})
