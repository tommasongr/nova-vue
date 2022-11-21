(tag_name) @tag.name
(erroneous_end_tag_name) @tag.name.error

; Attribute names and values
(
  (attribute
    (attribute_name) @tag.attribute.name
    ["="]? @tag.attribute.operator
    [
      (attribute_value) @tag.attribute.value
      (quoted_attribute_value
        ["\"" "'"] @tag.attribute.value.delimiter.left
        (_)? @tag.attribute.value
        ["\"" "'"] @tag.attribute.value.delimiter.right
      )
    ]?
  )
  (#not-match? @tag.attribute.name "(?i)^(src|href)$")
)

; Directive names and values
(
  (directive_attribute
    (directive_name) @tag.attribute.name
    (directive_argument)? @tag.attribute.argument
    ["="]? @tag.attribute.operator
    (quoted_attribute_value
      ["\"" "'"] @tag.attribute.value.delimiter.left
      ["\"" "'"] @tag.attribute.value.delimiter.right
    )?
  )
)

; Link attribute names and values
(
  (attribute
    (attribute_name) @tag.attribute.name
    ["="]? @tag.attribute.operator
    [
      (attribute_value) @tag.attribute.value.link
      (quoted_attribute_value
        ["\"" "'"] @tag.attribute.value.delimiter.left
        (_)? @tag.attribute.value.link
        ["\"" "'"] @tag.attribute.value.delimiter.right
      )
    ]?
  )
  (#match? @tag.attribute.name "(?i)^(src|href)$")
)

(start_tag ["<" ">"] @tag.bracket)
(end_tag ["</" ">"] @tag.bracket)
(self_closing_tag ["<" "/>"] @tag.bracket)

(comment) @comment
