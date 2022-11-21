; Script tags
(
  (script_element
    (start_tag
      (tag_name) @_name
      (attribute
        (attribute_name) @_attrname
      )
    )
    (raw_text) @injection.content
  )
  (#eq? @_name "script")
  (#not-eq? @_attrname "lang")
  (#set! injection.language "javascript")
)

(
  (script_element
    (start_tag
      (tag_name) @_name
      (attribute
        (attribute_name) @_attrname
        (quoted_attribute_value
          ["\"" "'"]
          (attribute_value) @_attrvalue
          ["\"" "'"]
        )
      )
    )
    (raw_text) @injection.content
  )
  (#eq? @_name "script")
  (#eq? @_attrname "lang")
  (#set-by-case-eq! @_attrvalue injection.language
    "js" "javascript"
    "ts" "typescript"
    "coffee" "coffeescript"
    "javascript"
  )
)

; Style tags
(
  (style_element
    (start_tag
      (tag_name) @_name
      (attribute
        (attribute_name) @_attrname
      )
    )
    (raw_text) @injection.content
  )
  (#eq? @_name "style")
  (#not-eq? @_attrname "lang")
  (#set! injection.language "css")
)

(
  (style_element
    (start_tag
      (tag_name) @_name
      (attribute
        (attribute_name) @_attrname
        (quoted_attribute_value
          ["\"" "'"]
          (attribute_value) @_attrvalue
          ["\"" "'"]
        )
      )
    )
    (raw_text) @injection.content
  )
  (#eq? @_name "style")
  (#eq? @_attrname "lang")
  (#set-by-case-eq! @_attrvalue injection.language
    "css" "css"
    "scss" "scss"
    "sass" "sass"
    "less" "less"
    "css"
  )
)

; Style attributes
(attribute
  (attribute_name) @_attrname
  (quoted_attribute_value
    (attribute_value) @injection.content
  )
  (#set! injection.language "css")
  (#set! injection.reset)
  (#match? @_attrname "(?i)^style$")
)

; Event handler attributes
(
  (start_tag
    (attribute
      (attribute_name) @name
      (quoted_attribute_value
        ["\"" "'"]
        (_) @injection.content
        ["\"" "'"]
      )
    )
  )
  (#match? @name "(?i)^on(abort|auxclick|beforematch|blur|cancel|canplay|canplaythrough|change|click|close|contextlost|contextmenu|contextrestored|copy|cuechange|cut|dblclick|drag|dragend|dragenter|dragleave|dragover|dragstart|drop|durationchange|emptied|ended|error|focus|formdata|input|invalid|keydown|keypress|keyup|load|loadeddata|loadedmetadata|loadstart|mousedown|mouseenter|mouseleave|mousemove|mouseout|mouseover|mouseup|paste|pause|play|playing|progress|ratechange|reset|resize|scroll|securitypolicyviolation|seeked|seeking|select|slotchange|stalled|submit|suspend|timeupdate|toggle|volumechange|waiting|webkitanimationend|webkitanimationiteration|webkitanimationstart|webkittransitionend|wheel)$")
  (#set! injection.language "javascript")
  (#set! injection.reset)
)

; Vue interpolation
(
  (interpolation
    (raw_text) @injection.content
  )
  (#set! injection.language "javascript")
)

; Vue directives
(directive_attribute
  [
    (attribute_value) @injection.content
    (quoted_attribute_value
      ["\"" "'"] @tag.attribute.value.delimiter.left
      (_)? @injection.content
      ["\"" "'"] @tag.attribute.value.delimiter.right
    )
  ]?
  (#set! injection.language "javascript")
)

; Vue loaders tags
(
  (element
    (start_tag (tag_name) @_name)
    (text)? @injection.content
  )
  (#set-by-case-eq! @_name injection.language
    "i18n" "json"
    "graphql" "graphql"
  )
)
