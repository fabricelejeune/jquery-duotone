# jquery-duotone
A jQuery plugin which turn all your images to duotone.

## Installation
Include the following resources on your page before initializing:

```html
<script src="jquery.duotone.js"></script>
```

## Exemples

Pass your gradient map as an option of the plugin:
```html
<script>
  // To attach Duotone to an image element
  $("img").duotone({
    gradientMap: "#0000FF, white"
  });
</script>
```

Or use the ```data-gradient-map``` attribute:
```html
<img src="your-image.jpg" data-gradient-map="lightslategrey, mistyrose">
<script>
  // To attach Duotone to an image element
  $("img").duotone();
</script>
```

## Options

Options are set by passing a valid options object at initialization or to the public "defaults" method. You can also set the gradient map option for a specific instance by attaching a data-gradient-map attribute containing a properly formatted CSS linear gradients.

| Name | Description | Type | Default |
|------|-------------|------|---------|
| `gradientMap` | Same format as CSS linear gradients without the initial angle, sides or corners. Instead you provide simply a list of comma-separated color-stops. | string | 'black, white'


## Methods

Methods are publicly available to all active instances, unless otherwise stated.

### defaults

Sets default plugin options

```html
$("img").duotone("defaults", opts);
```

| Name | Description | Type | Default |
|------|-------------|------|---------|
| `opts` | Options object | object | {}

### reset

Resets instance back to original image

```html
$("img").duotone("reset");
```

### process

Process the image to a duotone

```html
$("img").duotone("process");
```

## TODO

* Support srcset attribute
* Support picture element (source)
* Write exemples