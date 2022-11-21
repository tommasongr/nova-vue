; Script
(
  (script_element
    (start_tag (tag_name) @name) @start.before @displayname.target
    (end_tag)? @end.after
  )
  (#set! role tag-script)
  (#set! displayname.query "tagDisplayName.scm")
)

; Template
(
  (template_element
    (start_tag (tag_name) @name) @start.before @displayname.target
    (end_tag)? @end.after
  )
  (#set! role tag-framework)
  (#set-by-case-match! @name role
    "(?i)^(template)$" tag-framework ; TODO: Match only top level tag
    tag
  )
  (#set! displayname.query "tagDisplayName.scm")
  (#set! autoclose.expression "</")
  (#set! autoclose.completion "${name}>")
  (#set! scope.extend)
)

; Style
(
  (style_element
    (start_tag (tag_name) @name) @start.before @displayname.target
    (end_tag)? @end.after
  )
  (#set! role tag-style)
  (#set! displayname.query "tagDisplayName.scm")
)

; Tags with closing tags
(
  (element
    (start_tag (tag_name) @name) @start.before @displayname.target
    (end_tag)? @end.after
  )
  (#not-match? @name "(?i)^(embed|keygen|param|source|wbr|area|hr|col|command|br|img|input|base|track|link|meta)$")
  (#set-by-case-match! @name role
    "(?i)^(h1|h2|h3|h4|h5|h6|header|hgroup)$" tag-heading
    "(?i)^(article|aside|main|nav|section)$" tag-section
    "(?i)^(ul)$" tag-ul
    "(?i)^(ol)$" tag-ol
    "(?i)^(li)$" tag-li
    "(?i)^(form)$" tag-form
    "(?i)^(a)$" tag-anchor
    "(?i)^(i18n)$" tag-framework
    tag
  )
  (#set-by-case-eq! @name scope.level
    "h1" 1
    "h2" 2
    "h3" 3
    "h4" 4
    "h5" 5
    "h6" 6
  )
  (#set! displayname.query "tagDisplayName.scm")
  (#set! autoclose.expression "</")
  (#set! autoclose.completion "${name}>")
  (#set! scope.extend)
)

; Tags with an invalid end tag
(
  (ERROR
    (start_tag (tag_name) @name) @start.before @displayname.target
  )
  (#not-match? @name "(?i)^(embed|keygen|param|source|wbr|area|hr|col|command|br|img|input|base|track|link|meta)$")
  (#set-by-case-match! @name role
    "(?i)^(h1|h2|h3|h4|h5|h6|header|hgroup)$" tag-heading
    "(?i)^(article|aside|main|nav|section)$" tag-section
    "(?i)^(ul)$" tag-ul
    "(?i)^(ol)$" tag-ol
    "(?i)^(li)$" tag-li
    "(?i)^(form)$" tag-form
    "(?i)^(a)$" tag-anchor
    tag
  )
  (#set-by-case-eq! @name scope.level
    "h1" 1
    "h2" 2
    "h3" 3
    "h4" 4
    "h5" 5
    "h6" 6
  )
  (#set! displayname.query "tagDisplayName.scm")
  (#set! autoclose.expression "</")
  (#set! autoclose.completion "${name}>")
  (#set! scope.extend)
)

; Tags without closing tags (void tags)
(
  (element
    (start_tag (tag_name) @name) @subtree @displayname.target
  )
  (#match? @name "(?i)^(embed|keygen|param|source|wbr|area|hr|col|command|br|img|input|base|track|link|meta)$")
  (#set-by-case-match! @name role
    "(?i)^(input)$" tag-form-field
    "(?i)^(link)$" tag-link
    "(?i)^(img)$" tag-image
    "(?i)^(meta)$" tag-meta
    tag
  )
  (#set! displayname.query "tagDisplayName.scm")
)

; Self-closing tags
(
  (element
    (self_closing_tag (tag_name) @name) @subtree @displayname.target
  )
  (#set-by-case-match! @name role
    "(?i)^(input)$" tag-form-field
    "(?i)^(link)$" tag-link
    "(?i)^(img)$" tag-image
    "(?i)^(meta)$" tag-meta
    tag
  )
  (#set! displayname.query "tagDisplayName.scm")
)
