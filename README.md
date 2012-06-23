chains
=====

JavaScript library for building chains of HTML.

This is a simple library for building HTML. The need is that building HTML in JavaScript is hard.

 - Whatever editor you use, syntax highlighting is useless (because you are editing JavaScript, not HTML).
 - You are typing parts of HTML with JS interspersed, it is easy to get things wrong.
 - HTML/XML is a _lot_ of typing!

chains let you build HTML like so:

{{{
var url = 'http://google.com';
var msg = 'This is a link!';
var html = chains.div().p().a({ href: url }).text(msg);
}}}

You can now render the html object using html.render() which will produce the following markup.

{{{
<div><p><a href="http://google.com/">This is a link!</a></p></div>
}}}

Another way to do this in JavaScript is:

{{{
var url = 'http://google.com/';
var msg = 'This is a link!';
var html = '<div><p><a href="' + url + '">' + msg + '</a></p></div>';
}}}

For my eyes, this is much harder to read, let alone type.
