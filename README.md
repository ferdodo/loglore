# loglore

Minimalistic frontend event store.

## Installation

	npm install --save loglore

## Installation without a javascript bundler

Directly use the file loglore.browser.js in your webpage.

``` html
<head>
	<script src="loglore.browser.js"></script>
</head>

<scripts>
	console.log(window.loglore); // methods are bootstraped here
</scripts>
```

## Usage

You will find some examples in the documentation https://ferdodo.github.io/loglore

## Best practices

* Define your own event interface in typescript.
* Make a small abstraction of the lib to implement bindings with your own typings.
* Make an extensible event format.
* Never update your previous events or typings if there is some existing previous data.
* Dont use for production or serious projects.



