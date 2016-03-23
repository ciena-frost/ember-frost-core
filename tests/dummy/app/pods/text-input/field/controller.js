import Ember from 'ember'

export default Ember.Controller.extend({
  error: true,

  actions: {
    text (attrs) {
      this.notifications.addNotification({
        message: "value: '" + attrs.value + "'",
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    },

    bind (attrs) {
      this.set('boundText', attrs.value)
      this.notifications.addNotification({
        message: "bound value: '" + attrs.value + "'",
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    },

    bind2 (attrs) {
      this.set('boundText', attrs.value)
      this.notifications.addNotification({
        message: "bound2 value: '" + attrs.value + "'",
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    },

    toggleError () {
      this.toggleProperty('error')
    }
  },

  // Readme examples
  autofocus: {
    alias: 'autofocus',
    template: `
    {{frost-text <a>autofocus</a>=<bd>true</bd>}}
    `
  },

  disabled: {
    alias: 'disabled',
    template: `
      {{frost-text <a>disabled</a>=<bd>true</bd>}}
    `
  },

  error1: {
    alias: 'error',
    controller: `
    <ba>isError</ba>: <bd>true</bd>
    `,
    template: `
      {{frost-text <e>classNameBindings</e>='<ba>isError</ba>:<c>error</c>'}}
    `
  },

  readonly: {
    alias: 'readonly',
    template: `
      {{frost-text <a>readonly</a>=<bd>true</bd> <a>value</a>=<bd>'read only text'</bd>}}
    `
  },

  oninput: {
    alias: 'onInput',
    template: `
      {{frost-text <a>onInput</a>=(<e>action</e> <ac>'updatePassword'</ac>)}}
    `,
    controller: `
      <e>actions</e>: {
        <ac>updatePassword</ac>(<ad>attrs</ad>) {
          console.log(<ad>attrs.value</ad>);
        }
      }
    `
  }
})
