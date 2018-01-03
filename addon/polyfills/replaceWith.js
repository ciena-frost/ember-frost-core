// from: https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/replaceWith()/replaceWith().md
(function (arr) {
  arr.forEach(function (item) {
    item.replaceWith = item.replaceWith || function () {
      const argArr = Array.prototype.slice.call(arguments)
      const docFrag = document.createDocumentFragment()

      argArr.forEach(function (argItem) {
        const isNode = argItem instanceof window.Node
        docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)))
      })

      this.parentNode.replaceChild(docFrag, this)
    }
  })
})([window.Element.prototype, window.CharacterData.prototype, window.DocumentType.prototype])
