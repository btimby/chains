chains
=====

JavaScript library for building chains of HTML.

This is a simple library for building HTML. The need is that building HTML in JavaScript
is hard.

 - Whatever editor you use, syntax highlighting is useless (because you are editing
JavaScript, not HTML).
 - You are typing parts of HTML with JS interspersed, it is easy to get things wrong.
 - HTML/XML is a _lot_ of typing!

chains let you build HTML like so:

```javascript
var url = 'http://google.com';
var msg = 'This is a link!';
var html = chains.div().p().a({ href: url }).text(msg);
```

You can now render the html object using `html.render()` which will produce the
following markup:

```html
<div><p><a href="http://google.com/">This is a link!</a></p></div>
```

Another way to do this in JavaScript is:

```javascript
var url = 'http://google.com/';
var msg = 'This is a link!';
var html = '<div><p><a href="' + url + '">' + msg + '</a></p></div>';
```

For my eyes, this is much harder to read, let alone type.

ID Shortcut
====

There is also a shortcut for defining the id of an element. If the first argument to the
method is a string, then it is assumed to be the id. This way, you don't need to use
`{ id: 'my-element-id' }`

```javascript
var html = chains.div('my-element-id').p()
```

Chains Within Chains
====

Elements strung together become nested, each method invocation wraps the desired tag in
the previous tag. However, sometimes you want to include multiple tags within a parent.
For example an unordered list like the following:

```html
<ul>
  <li></li>
  <li></li>
</ul>
```

Is easy to create just pass additional chains to the method call. Any chains will be
appended in order inside the tag.

```javascript
var html = chains.ul(chains.li(), chains.li());
```

Siblings
====

If you want to build an HTML chain that has no outer container, such as a series of
`<p>` tags, you can do that by using `null()`. To get the following HTML:

```html
<p>paragraph 1</p>
<p>paragraph 2</p>
```

Use this chain:

```javascript
chains.null(
    chains.p().text('paragraph 1'),
    chains.p().text('paragraph 2')
);
```

That's it, quickly build well-formed HTML using JavaScript.

Future
====

You can also pass options to the chains object, such as indent=true. To do this, simply
instantiate your own chains global object.

```javascript
chains = Chains({ indent: true });
chains.div().p().a({ href:'http://google.com/' });
```

