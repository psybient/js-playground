/**
 * @module utils
 * All the helper functions needed in this project
 */

/**
 * @param {String} id Either '#some' or 'some'.
 * @returns {HTMLElement}
 */
export function qi(id) {
    id = (id[0] === '#') ? id.substr(1, id.length) : id;
    return document.getElementById(id);
}
/**
* querySelector wrapper
*
* @param {string} selector Selector to query
* @param {Element} [scope] Optional scope element for the selector
*/
export function qs(selector, scope) {
    return (scope || document).querySelector(selector);
}
/**
* addEventListener wrapper
*
* @param {Element|Window} target Target Element
* @param {string} type Event name to bind to
* @param {Function} callback Event callback
* @param {boolean} [capture] Capture the event
*/
export function $on(target, type, callback, capture) {
    target.addEventListener(type, callback, !!capture);
}
/**
 * Attach a handler to an event for all elements matching a selector.
 *
 * @param {Element} target Element which the event must bubble to
 * @param {string} selector Selector to match
 * @param {string} type Event name
 * @param {Function} handler Function called when the event bubbles to target
 *                           from an element matching selector
 * @param {boolean} [capture] Capture the event
 */
export function $delegate(target, selector, type, handler, capture) {
    const dispatchEvent = event => {
        const targetElement = event.target;
        const potentialElements = target.querySelectorAll(selector);
        let i = potentialElements.length;

        while (i--) {
            if (potentialElements[i] === targetElement) {
                handler.call(targetElement, event);
                break;
            }
        }
    };

    $on(target, type, dispatchEvent, !!capture);
}
/**
 * @param {String|Element} element
 * @returns A DOM object, such as HTMLElement, Window, and Document.
 */
export function evaluate(element) {
    let el;
    switch (this.toType(element)) {
        case 'window':
        case 'htmldocument':
        case 'element':
            el = element;
            break;
        case 'string':
            el = this.$(element);
            break;
        default:
            console.warn('Unknown type!');
    }
    this.assert(el, 'Can\'t evaluate: @param ' + element);
    return el;
}
/**
 * @param {Object|Element|String} obj
 * @returns {String}
 */
function toType(obj) {
    if (obj === window && obj.document && obj.location) {
        return 'window';
    } else if (obj === document) {
        return 'htmldocument';
    } else if (typeof obj === 'string') {
        return 'string';
    } else if (this.isElement(obj)) {
        return 'element';
    }
}
/**
 * @param {Element} el
 * @returns {Boolean}
 */
export function isElement(el) {
    // DOM, Level2
    if ('HTMLElement' in window) {
        return (!!el && el instanceof HTMLElement);
    }
    // Older browsers
    return (!!el && typeof el === 'object' && el.nodeType === 1 &&
        !!el.nodeName);
}
/**
 * @param {String} html
 * @returns {Element}
 */
export function createFragment(html) {
    const frag = document.createDocumentFragment();
    const temp = document.createElement('div');

    temp.innerHTML = html;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}
/**
 * Checks if the condition evaluates to true.
 * @param {T} condition The condition to check.
 * @param {string=} message Error message in case of failure.
 * @throws {Error} When the condition evaluates to false.
 */
export function assert(condition, message = 'Assertion failed') {
    if (!condition) {
        if (typeof Error !== 'undefined') {
            throw new Error(message);
        }
        throw message; // Fallback
    }
}
// // /**
// //  * Encode less-than and ampersand characters with entity codes to make user-
// //  * provided text safe to parse as HTML.
// //  *
// //  * @param {string} s String to escape
// //  *
// //  * @returns {string} String with unsafe characters escaped with entity codes
// //  */
export const escapeForHTML = s => s.replace(/[&<]/g, c => c === '&' ? '&amp;' : '&lt;');



