(function() {
    var Chains = function(factory) {
        // We will store the HTML in these two arrays.
        this.head = [], this.tail = [];
        // The global instance is a factory. It will create a new
        // chain for each tag method call on it. That chain will
        // then return ITSELF so that all subsequent tag methods
        // are nested within that chain.
        this.factory = factory;
    }

    Chains.prototype.tag = function() {
        // As the comment above explains, the root object is
        // a factory, as such we will return a new Chains() instance
        // this instance will NOT be a factory.
        var chain = (this.factory)?new Chains(false):this;
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
        // Open the tag in the head array.
        chain.head.push(
            '<', name
        );
        // Add the attributes (including the id).
        for (var key in attrs) {
            chain.head.push(' ', key, '="', attrs[key], '"')
        }
        // Finish the opening tag.
        chain.head.push('>');
        // Close the tag in the tail array.
        chain.tail.splice(0, 0,
            '</', name, '>'
        );
        // Return the chain, either a new Chains instance, or this
        // as determined by this.factory.
        return chain;
    }

    Chains.prototype.render = function() {
        // This function will return the HTML built so far.
        return this.head.concat(this.tail).join('');
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
        Chains.prototype[name] = (function(name) {
            return function() {
                var args = [name];
                for (var i = 0; i < arguments.length; i++)
                    args.push(arguments[i]);
                return this.tag.apply(this, args);
            }
        })(name);
    }

    // Now define a global, this is how users will reach us.
    chains = new Chains(true);
})();
