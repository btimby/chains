(function() {
    var Affix = function(factory) {
        // We will store the HTML in these two arrays.
        this.pre = [], this.post = [];
        // The global instance is a factory. It will create a new
        // chain for each tag method call on it. That chain will
        // then return ITSELF so that all subsequent tag methods
        // are nested within that chain.
        this.factory = factory;
    }

    Affix.prototype.tag = function() {
        // As the comment above explains, the root object is
        // a factory, as such we will return a new Affix() instance
        // this instance will NOT be a factory.
        var chain = (this.factory)?new Affix(false):this;
        var attrs = {};
        // Work our our arguments.
        if (arguments.length == 0) {
            throw 'tag name must be the first argument';
        } else if (arguments.length == 2) {
            if (typeof arguments[1] == 'string')
                attrs['id'] = arguments[1];
            else
                attrs = arguments[1];
        } else if (arguments.length == 3) {
            attrs = arguments[2];
            attrs['id'] = arguments[1];
        }
        // Tag name is always the first argument.
        var name = arguments[0];
        // Open the tag in the pre array.
        chain.pre.push(
            '<', name
        );
        // Add the attributes (including the id).
        for (var key in attrs) {
            chain.pre.push(' ', key, '="', attrs[key], '"')
        }
        // Finish the opening tag.
        chain.pre.push('>');
        // Close the tag in the post array.
        chain.post.splice(0, 0,
            '</', name, '>'
        );
        // Return the chain, either a new Affix instance, or this
        // as determined by this.factory.
        return chain;
    }

    Affix.prototype.render = function() {
        // This function will return the HTML built so far.
        return this.pre.concat(this.post).join('');
    }

    // These are all the tags we will add methods for.
    var tags = [
        // GENERIC TAGS
        'a', 'p', 'div', 'span', 'h1', 'h2', 'h3', 'h4', 'h5',
        'h6', 'h7', 'pre', 'script', 'link',
        // FORM TAGS
        'form', 'input', 'label', 'button', 'textarea'
    ];

    // Dynamically add a method for each tag.
    for ( var i = 0; i < tags.length; i++) {
        var name = tags[i];
        Affix.prototype[name] = (function(name) {
            return function() {
                var args = [name];
                for (var i = 0; i < arguments.length; i++)
                    args.push(arguments[i]);
                return this.tag.apply(this, args);
            }
        })(name);
    }

    // Now define a global, this is how users will reach us.
    affix = new Affix(true);
})();
