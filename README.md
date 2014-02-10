# rework-bem

BEM transformation for [rework][rework], allows you to define blocks, elements and modifiers on top of filesystem tree:

```css
// block.css
:root {
  key: value;
}

/*
.b-block {
  key: value;
}
*/


// block/modifier.css
:root {
  key: value;
}

/*
.b-block--modifier {
  key: value;
}
*/


// block/elements/element.css
:root {
  key: value;
}

/*
.b-block__element {
  key: value;
}
*/

// block/elements/element/modifier.css
:root {
  key: value;
}

/*
.b-block__element--modifier {
  key: value;
}
*/
```

## Example


For example, you have the comments block with markup like a:

```html
<div class="b-comments b-comments--dashboard">
  <div class="b-comment b-comment--by_owner">
    <div class="b-comment__user"></div>
    <div class="b-comment__meta"></div>
    <div class="b-comment__text"></div>
    <div class="b-comment__replies">
      <div class="b-comment b-comment--is_reply">
        <div class="b-comment__user b-comment__user--in_reply"></div>
        <div class="b-comment__meta"></div>
        <div class="b-comment__text"></div>
      </div>
    </div>
  </div>
</div>
```

So, tree should be looks like:

    - comments.css
    - comments/
      - dashboard.css
    - comment.css
    - comment/
      - is_reply.css
      - by_owner.css
      - elements/
        - user/
          - in_reply.css
        - replies.css
        - user.css
        - meta.css
        - text.css

## Installation

    % npm install rework-bem

## Usage

    var rework = require('rework');
    var bem    = require('rework-bem');

    var css = rework(src).use(bem(filepath, {
      root: 'stylesheets',
      namespace: 'foo'
    })).toString();

[rework]: https://github.com/visionmedia/rework
