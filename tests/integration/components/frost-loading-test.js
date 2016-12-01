import {expect} from 'chai'
import {
  describeComponent,
  it
} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describeComponent(
  'frost-loading',
  'Integration: FrostLoadingComponent',
  {
    integration: true
  },
  function () {
    it('renders default values', function () {
      this.render(hbs`
        {{frost-loading}}
      `)

      expect(
        this.$('.uil-ripple'),
        'Has class "uil-ripple"'
      ).to.have.length(1)
    })

    it('type property sets class', function () {
      this.render(hbs`
        {{frost-loading
          type='ring'
        }}
      `)

      expect(
        this.$('.uil-ring'),
        'Has class "uil-ring"'
      ).to.have.length(1)
    })

    it('renders using spread', function () {
      this.render(hbs`
        {{frost-loading
          options=(hash
            type='ring'
          )
        }}
      `)

      expect(
        this.$('.uil-ring'),
        'Has class "uil-ring"'
      ).to.have.length(1)
    })
  }
)
