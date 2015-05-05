---
layout: default
title: Relative Strength Indicator
component: indicators/relativeStrengthIndex.js
tags:
  - frontpage

example-code: |

  // the RSI is output on a percentage scale, so requires a domain from 0 - 100
  var yScale = d3.scale.linear()
        .domain([0, 100])
        .range([height, 0]);

  // Create the RSI component
  var rsi = fc.indicators.relativeStrengthIndicator()
      .xScale(xScale)
      .yScale(yScale);

  // Add it to the container
  container.append('g')
      .datum(data)
      .call(rsi);
---

A [Relative Strength Indicator](http://en.wikipedia.org/wiki/Relative_strength_index) is an indicator that plots the historical strength or weakness of a stock based on opening and closing prices. It is typically plotted on a 14-day timeframe and is displayed next to overbought (70%) and oversold lines (30%) lines.

The RSI indicator is rendered on a percent scale:

{% highlight javascript %}
{{ page.example-code }}
{% endhighlight %}

{% include exampleFixture.html %}

You can configure the number of datapoints that are included in the RSI via the `windowSize` property, you can also change how the open and close values are read via the `openValue` and `closeValue` properties.


