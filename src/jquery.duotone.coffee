(($) ->

  class Duotone

    settings:
      gradientMap: 'black, white'

    constructor: (el, options) ->
      self = @

      @$el = $(el)
      @options = $.extend({}, @settings, @$el.data(), options)

      original = new Image()
      original.crossOrigin = 'Anonymous'
      original.src = @$el.attr('src')

      original.onload = ->
        self.$el.data('original', @)
        color_stops = getColorStops(self.options.gradientMap)
        duotoned = process.call(self, @, color_stops)
        self.$el.attr('src', duotoned).addClass('processed')

      original.onerror = ->
        throw new Error "Can not load the image: `#{@.src}`"

    # Process the image to a duotone
    process = (image, color_stops) ->
      gradient_colors = getGradientColors(color_stops)

      canvas = document.createElement('canvas')
      ctx = canvas.getContext('2d')

      canvas.width = @$el.width()
      canvas.height = @$el.height()
      ctx.drawImage(image, 0, 0, @$el.width(), @$el.height())

      imageData = ctx.getImageData(0, 0, @$el.width(), @$el.height())
      pixels = imageData.data

      for i in [0..pixels.length] by 4
        r = pixels[i]
        g = pixels[i+1]
        b = pixels[i+2]
        avg = 0.2126 * r + 0.7152 * g + 0.0722 * b | 0 # Grayscale average
        pixels[i] = gradient_colors[avg][0]
        pixels[i+1] = gradient_colors[avg][1]
        pixels[i+2] = gradient_colors[avg][2]

      ctx.putImageData(imageData, 0, 0)

      canvas.toDataURL()

    # Each stop consists of a color and an optional percentage or length
    # stops: <color-stop> [, <color-stop>]
    # <color-stop>: color [ <percentage> | <length> ]?

    # If the first color-stop does not have a length or percentage, it defaults to 0%
    # If the last color-stop does not have a length or percentage, it defaults to 100%
    # If a color-stop, other than the first or last, does not have a length or percentage, it is assigned the position half way between the previous and the next stop.
    # If a color-stop, other than the first or last, has a specified position less than the previous stop, its position is changed to be equal to the largest specified position of any prior color-stop.
    getColorStops = (gradient_map) ->
      matches = gradient_map.match(/(((rgb|hsl)a?\(\d{1,3}%?,\s*\d{1,3}%?,\s*\d{1,3}%?(?:,\s*0?\.?\d+)?\)|\w+|#[0-9a-fA-F]{1,6})(\s+(0?\.\d+|\d{1,3}%))?)/g)

      stops = []
      for color_stop in matches
        color_stop_matches = color_stop.match(/(?:((rgb|hsl)a?\(\d{1,3}%?,\s*\d{1,3}%?,\s*\d{1,3}%?(?:,\s*0?\.?\d+)?\)|\w+|#[0-9a-fA-F]{1,6})(\s+(?:0?\.\d+|\d{1,3}%))?)/)
        if color_stop_matches && color_stop_matches.length >= 4
          pos_match = color_stop_matches[3]
          stops.push({
              color: parseCSSColor(color_stop_matches[1]),
              pos: if pos_match then parse_css_float(pos_match) * 100 else null
          })

      if stops.length <= 1
        throw new Error "You must define at least 2 color stops"

      # Need to calculate the positions where they aren't specified.
      # In the case of the first and last stop, we may even have to add a new stop.
      #
      # Go through the array of stops, finding ones where the position is not specified.
      # Then, find the next specified position or terminate on the last stop.
      # Finally, evenly distribute the unspecified positions, with the first stop at 0
      # and the last stop at 100.
      # If the first stop's position is not specified, set it to 0.
      stop = stops[0]
      unless stop.pos
        stop.pos = 0
      else
        stop.pos = Math.min(100, Math.max(0, stop.pos))

      current_pos = stop.pos

      # If the last stop's position is not specified, set it to 100.
      stop = stops[stops.length-1]
      unless stop.pos
        stop.pos = 100
      else
        stop.pos = Math.min(100, Math.max(0, stop.pos))

      # Make sure that all positions are in ascending order
      for i in [1..stops.length-1]
        stop = stops[i]
        if stop.pos and stop.pos < current_pos
          stop.pos = current_pos
        if stop.pos > 100
          stop.pos = 100
        current_pos = stop.pos

      # Find any runs of unpositioned stops and calculate them
      i = 1
      while i < (stops.length - 1)
        unless stops[i].pos
          # Find the next positioned stop.  You'll always have at least the
          # last stop at 100.
          for j in [i+1..stops.length]
            break if stops[j].pos

          start_pos = stops[i-1].pos
          end_pos = stops[j].pos
          n_stops = j - 1 + 1

          delta = Math.round((end_pos - start_pos) / n_stops)
          while i < j
            stops[i].pos = stops[i-1].pos + delta
            i++

        i++

      unless stops[0].pos is 0
        stops.unshift {
          color: stops[0].color
          pos: 0
        }

      unless stops[stops.length-1].pos is 100
        stops.push {
          color: stops[stops.length-1].color
          pos: 100
        }

      stops

    # Map each pixels of the gradient to an Array of 255 colors
    getGradientColors = (color_stops) ->
      canvas = document.createElement('canvas')
      ctx = canvas.getContext('2d')

      # Create the gradient
      grd = ctx.createLinearGradient(0, 0, 256, 0)
      for stop in color_stops
        r = stop.color[0]
        g = stop.color[1]
        b = stop.color[2]
        p = stop.pos / 100
        grd.addColorStop(p, "rgb(#{r}, #{g}, #{b})")

      ctx.fillStyle = grd
      ctx.fillRect(0, 0, 256, 1)

      # Map the gradient to an Array
      imageData = ctx.getImageData(0, 0, 256, 1)
      pixels = imageData.data

      gradient_colors = []
      for i in [0..pixels.length] by 4
        r = pixels[i]
        g = pixels[i+1]
        b = pixels[i+2]
        gradient_colors.push [r, g, b]

      gradient_colors

    # Additional plugin methods
    defaults: (opts) ->
      @options = $.extend(@options, opts)
      @$el

    reset: ->
      @$el.attr('src', @$el.data('original').src)
        .removeClass('processed')

    process: ->
      color_stops = getColorStops(@options.gradientMap)
      duotoned = process.call(@, @$el.data('original'), color_stops)

      @$el.attr('src', duotoned)
        .addClass('processed')

  # Define the plugin
  $.fn.extend duotone: (options, args...) ->
    return unless !!document.createElement('canvas').getContext
    @.each ->
      if $(@).is('img')
        duotone = $.data(@, 'duotone')
        unless duotone
          $.data(@, 'duotone', (duotone = new Duotone(this, options)))
        if typeof options == 'string'
          duotone[options].apply(duotone, args)
      else
        # search for img tags in element
        $(@).find('img').duotone(options, args...)

) window.jQuery