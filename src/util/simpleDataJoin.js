(function(d3, fc) {
    'use strict';

    fc.util.simpleDataJoin = function(parent, className, data, dataKey) {
        // "Caution: avoid interpolating to or from the number zero when the interpolator is used to generate
        // a string (such as with attr).
        // Very small values, when stringified, may be converted to scientific notation and
        // cause a temporarily invalid attribute or style property value.
        // For example, the number 0.0000001 is converted to the string "1e-7".
        // This is particularly noticeable when interpolating opacity values.
        // To avoid scientific notation, start or end the transition at 1e-6,
        // which is the smallest value that is not stringified in exponential notation."
        // - https://github.com/mbostock/d3/wiki/Transitions#d3_interpolateNumber
        var effectivelyZero = 1e-6;

        // update
        var updateSelection = parent.selectAll('g.' + className)
            .data(data, dataKey || fc.util.fn.index);

        // enter
        // when 'parent' is a transition, entering elements fade in (from transparent to opaque)
        var enterSelection = updateSelection.enter()
            .append('g')
            .classed(className, true)
            .style('opacity', effectivelyZero);

        // exit
        // when 'parent' is a transition, exiting elements fade out (from opaque to transparent)
        var exitSelection = d3.transition(updateSelection.exit())
            .style('opacity', effectivelyZero)
            .remove();

        // when 'parent' is a transition, all properties of the transition (which can be interpolated) will transition
        updateSelection = d3.transition(updateSelection)
            .style('opacity', 1);

        updateSelection.enter = d3.functor(enterSelection);
        updateSelection.exit = d3.functor(exitSelection);
        return updateSelection;
    };
}(d3, fc));
