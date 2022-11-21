; Tag name
(tag_name) @result

; ID attributes, formatted to "#value"
((attribute
  (attribute_name) @_attrname
  [
    (attribute_value) @result
    (quoted_attribute_value ["\"" "'"] (_)? @result ["\"" "'"])
  ]?
 )
 (#match? @_attrname "(?i)^id$")
 (#prefix! @result "#")
)

; Class attributes, formatted to ".value"
((attribute
  (attribute_name) @_attrname
  [
    (attribute_value) @result
    (quoted_attribute_value ["\"" "'"] (_)? @result ["\"" "'"])
  ]?
 )
 (#match? @_attrname "(?i)^class$")
 (#replace! @result "\\s+" ".")
 (#prefix! @result ".")
)

; href, src, http-equiv, and name attributes, formatted to "- value"
((attribute
  (attribute_name) @_attrname
  [
    (attribute_value) @result
    (quoted_attribute_value ["\"" "'"] (_)? @result ["\"" "'"])
  ]?
 )
 (#match? @_attrname "(?i)^(src|href|http-equiv|name)$")
 (#prefix! @result " – ")
)
