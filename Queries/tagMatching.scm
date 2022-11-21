; Tags with closing tags
(
  (element
    (start_tag (tag_name) @tag.start.name) @tag.start
    (end_tag (tag_name) @tag.end.name)? @tag.end
  )
  (#not-match? @tag.start.name "(?i)^(embed|keygen|param|source|wbr|area|hr|col|command|br|img|input|base|track|link|meta)$")
)

; Template
(
  (template_element
    (start_tag (tag_name) @tag.start.name) @tag.start
    (end_tag (tag_name) @tag.end.name)? @tag.end
  )
)

; Script
(
  (script_element
    (start_tag (tag_name) @tag.start.name) @tag.start
    (end_tag (tag_name) @tag.end.name)? @tag.end
  )
)

; Style
(
  (style_element
    (start_tag (tag_name) @tag.start.name) @tag.start
    (end_tag (tag_name) @tag.end.name)? @tag.end
  )
)
