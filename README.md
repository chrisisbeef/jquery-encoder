# jQuery Encoder Plugin

A Contextual Encoding Plugin for jQuery

## Download jquery-encoder
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/cschmidt/jquery-encoder/master/dist/jquery-encoder.min.js
[max]: https://raw.github.com/cschmidt/jquery-encoder/master/dist/jquery-encoder.js

## Install Dependencies

Run `npm install` to install the plugin dependencies

  * John Resig's Class.create.js 1.1.4+
  
Or download the [Class Library][classes_lib] manually.

[classes_lib]: https://raw.github.com/chrisisbeef/jquery-encoder/master/list/class.min.js

## Usage

Using the plugin is very simple, there are both static and instance methods to provide the right type of output encoding for your current situation. The plugin also provides a canonicalization method, which is imperative for detecting attacks that use double or multi encoding when handling data from an untrusted source. If you are dealing with data that may contain encoding, you can first canonicalize that data, then re-encode it for the appropriate context.

```html
<script type="text/javascript" src="/path/to/jquery.min.js"></script>
<script type="text/javascript" src="/path/to/class.min.js"></script>
<script type="text/javascript">
    $.post( 'http://untrusted.com/webservice', { parameter1: 'value' }, function(data) {
        // Data returned may contain encoded data, so canonicalize the data to it's simplest
        // form prior to encoding it for use on the page.
        var cdata = $.canonicalize(data);
        $('#element').encode('html', cdata);
    });
</script>
<div id="element"></div>
```

### Static Methods

`canonicalize( String data, bool strict=true )`

Canonicalization (also called normalization) is the act of reducing a string to it's simplest form. For example, if the string `%3CB%3E` is passed into the canonicalize method, the value returned will be decoded into `<b>`. The most important part of this method is that it will detect if a string is passed in that contains either multiple encoding types, or double encoding, or both. The default behavior of the method is to raise an exception if it detects one of these scenarios. As a general rule, normal application operation should never pass data that is either double encoded or encoded using multiple escaping rules. Most definately, data that is provided by a user (such as a form field) will never contain data that fits that description.

```
    try {
        $.encoder.canonicalize(untrusted_data);
    } catch (e) {
        log.error(e);
        alert('An error has occured');
    }
```

`@encodeForCSS( String input, char[] immune )`

This method allows developers to encode data specifically to be inserted into the @style@ attribute of an element or as the value of a style attribute passed in through the jQuery `.style()` method.

```
    $.post('/service/userprefs', { user: userID }, function(data) {
        $('#container').html('<div style="background-color: ' + $.encoder.encodeForCSS(data['background-color']) + '">');
    });
```

`@encodeForHTML( String input )`

This method allows developers to encode data specifically to be inserted between two tags in a document, either through the use of the `html()` method or by accessing @innerHTML@ directly.

```
    $.post('http://untrusted.com/news/', function(data) {
        $('#element').html( $.encoder.encodeForHTML(data) );
    });
```

`encodeForHTMLAttribute( String input, char[] immune )`

This method allows developers to encode data specifically to be inserted between quotes in an HTML Attribute value.

```
    $.post('http://untrusted.com/profile', function(data) {
        $('#element').html( '<div width="' + $.encoder.encodeForHTMLAttribute(data.width) + '">' );
    }
```

`encodeForJavascript( String input, char[] immune )`

This method allows developers to encode data specifically to be inserted into a javascript event on an DOM element. This method will escape for a javascript context instead of a html attribute context.

```
    $.post('http://untrusted.com/profile', function(data) {
        $('#element').html( '<div onmouseover="someFunction(\'' + $.encoder.encodeForJavascript(data.event) + '\)">');
    }
```

`encodeForURL( String input, char[] immune )`

This method allows developers to encode data specifically to be inserted into a URL context. This is useful for encoding links with untrusted data in them.

```
    $('#dyn_link').html('<a href="/profile/' + $.encoder.encodeForURL(userID) + '">Link</a>');
```

### Instance Methods

New in version 0.1.1 is the ability to call encoding directly on an element for the `.attr()`, `.html()`, and `.style()` methods. 

`encode( Enum(html|css|attr) context, String input )`

Sets a property of the element with the correct contextual, property-aware encoding applied. 

```
 // Sets the 'value' attribute of the element with id #my-element
 $('#my-element').encode('attr', 'value', untrustedData)

 // Add a 'background-image' to the element with id #my-element
 $('#my-element').encode('css', 'background-image', untrustedUrl);
```

## Release History

### v0.1.1 - 2015.08.19

 * Updated for jQuery 1.9+ compatibility
 * New instance method .encode
 * Added full support for "Property-Aware Contextual OE" 
 * Migrated to be a grunt build instead of a hacky maven build
 * Fixed Issue #8 - Support Astral Symbols in encodeForHTMLAttribute (Thanks @stuartf and @mathiasbynens)

### v0.1.0 - Initial Release
