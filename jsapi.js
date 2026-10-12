// Built-in signatures for editor completion. Each line: name(params) → Return | doc. A line with no parens is a property.

const JS_API = {
  instance: {
    Array: `
at(index) → any | Item at index; negative counts back from the end
concat(...items) → Array | New array with the items (or the items of arrays) appended
entries() → Iterator | Iterator of [index, value] pairs
every(callback(value, index, array)) → Boolean | True if callback is truthy for every item
fill(value, start?, end?) → Array | Overwrites items in place with value
filter(callback(value, index, array)) → Array | New array of the items where callback is truthy
find(callback(value, index, array)) → any | First item where callback is truthy, else undefined
findIndex(callback(value, index, array)) → Number | Index of the first match, else -1
findLast(callback(value, index, array)) → any | Last item where callback is truthy, else undefined
findLastIndex(callback(value, index, array)) → Number | Index of the last match, else -1
flat(depth?) → Array | New array with nested arrays flattened; depth defaults to 1
flatMap(callback(value, index, array)) → Array | map, then flatten one level
forEach(callback(value, index, array)) → undefined | Calls callback for each item
includes(value, fromIndex?) → Boolean | True if value is present; finds NaN too
indexOf(value, fromIndex?) → Number | First index of value, else -1
join(separator?) → String | Items joined into a string; separator defaults to ","
keys() → Iterator | Iterator of indexes
lastIndexOf(value, fromIndex?) → Number | Last index of value, else -1
map(callback(value, index, array)) → Array | New array of callback's results
pop() → any | Removes and returns the last item
push(...items) → Number | Appends in place; returns the new length
reduce(callback(acc, value, index, array), initial?) → any | Folds the items into one value, left to right
reduceRight(callback(acc, value, index, array), initial?) → any | Folds the items into one value, right to left
reverse() → Array | Reverses in place and returns the same array
shift() → any | Removes and returns the first item
slice(start?, end?) → Array | Copy of the items from start up to, not including, end
some(callback(value, index, array)) → Boolean | True if callback is truthy for any item
sort(compare(a, b)?) → Array | Sorts in place. Without compare it sorts as strings, so [10, 9] stays put; use (a, b) => a - b
splice(start, deleteCount?, ...items) → Array | Removes and inserts in place; returns the removed items
toReversed() → Array | Reversed copy
toSorted(compare(a, b)?) → Array | Sorted copy; same compare rules as sort
toSpliced(start, deleteCount?, ...items) → Array | Copy with items removed and inserted
unshift(...items) → Number | Prepends in place; returns the new length
values() → Iterator | Iterator of the items
with(index, value) → Array | Copy with one item replaced
length → Number | Number of items`,
    String: `
at(index) → String | Character at index; negative counts back from the end
charAt(index) → String | Character at index, or "" when out of range
charCodeAt(index) → Number | UTF-16 code unit at index, e.g. "A" → 65
codePointAt(index) → Number | Unicode code point at index
concat(...strings) → String | The strings appended
endsWith(search, endPosition?) → Boolean | True if the string ends with search
includes(search, position?) → Boolean | True if search appears anywhere
indexOf(search, position?) → Number | First index of search, else -1
lastIndexOf(search, position?) → Number | Last index of search, else -1
localeCompare(other) → Number | Negative, 0 or positive; handy as a sort compare
match(regexp) → Array | Match details, or null; with a /g regexp, every match
matchAll(regexp) → Iterator | Iterator of match details; regexp needs the g flag
normalize(form?) → String | Unicode normal form; form defaults to "NFC"
padEnd(targetLength, padString?) → String | Pads on the right to targetLength
padStart(targetLength, padString?) → String | Pads on the left, e.g. "7".padStart(3, "0") → "007"
repeat(count) → String | The string repeated count times
replace(pattern, replacement) → String | Replaces the first match (every match with a /g regexp); replacement can be a function
replaceAll(pattern, replacement) → String | Replaces every match; a regexp pattern needs the g flag
search(regexp) → Number | Index of the first regexp match, else -1
slice(start, end?) → String | Characters from start up to, not including, end; negatives count from the end
split(separator, limit?) → Array | e.g. "a,b".split(",") → ["a", "b"]; "" splits into characters
startsWith(search, position?) → Boolean | True if the string starts with search
substring(start, end?) → String | Like slice, but negatives become 0 and the arguments swap if start > end
toLowerCase() → String | Lower-cased copy
toUpperCase() → String | Upper-cased copy
trim() → String | Copy without leading and trailing whitespace
trimEnd() → String | Copy without trailing whitespace
trimStart() → String | Copy without leading whitespace
length → Number | Number of UTF-16 code units`,
    Number: `
toFixed(digits?) → String | Fixed-point string, e.g. (3.14159).toFixed(2) → "3.14"
toPrecision(precision?) → String | String with that many significant digits
toString(radix?) → String | e.g. (255).toString(16) → "ff", (5).toString(2) → "101"`,
    Map: `
clear() → undefined | Removes every entry
delete(key) → Boolean | Removes key; true if it was there
entries() → Iterator | Iterator of [key, value] pairs in insertion order
forEach(callback(value, key, map)) → undefined | Calls callback for each entry
get(key) → any | Value for key, else undefined
has(key) → Boolean | True if key is present
keys() → Iterator | Iterator of keys in insertion order
set(key, value) → Map | Adds or updates key; returns the map, so calls chain
values() → Iterator | Iterator of values in insertion order
size → Number | Number of entries`,
    Set: `
add(value) → Set | Adds value; returns the set, so calls chain
clear() → undefined | Removes every value
delete(value) → Boolean | Removes value; true if it was there
entries() → Iterator | Iterator of [value, value] pairs
forEach(callback(value, value, set)) → undefined | Calls callback for each value
has(value) → Boolean | True if value is present
keys() → Iterator | Same as values()
values() → Iterator | Iterator of values in insertion order
size → Number | Number of values`
  },
  static: {
    Math: `
abs(x) → Number | Absolute value
cbrt(x) → Number | Cube root
ceil(x) → Number | Rounds up to an integer
exp(x) → Number | e to the power x
floor(x) → Number | Rounds down to an integer
hypot(...values) → Number | Square root of the sum of squares
log(x) → Number | Natural logarithm
log10(x) → Number | Base-10 logarithm
log2(x) → Number | Base-2 logarithm
max(...values) → Number | Largest value; spread an array: Math.max(...nums)
min(...values) → Number | Smallest value; spread an array: Math.min(...nums)
pow(base, exponent) → Number | base ** exponent
random() → Number | Random number from 0 up to, not including, 1
round(x) → Number | Nearest integer; halves round up, so -2.5 → -2
sign(x) → Number | -1, 0 or 1
sqrt(x) → Number | Square root
trunc(x) → Number | Drops the fraction, toward zero
E → Number | Euler's number, about 2.718
PI → Number | About 3.14159`,
    Object: `
assign(target, ...sources) → Object | Copies own properties onto target and returns it
entries(obj) → Array | Array of [key, value] pairs
freeze(obj) → Object | Makes obj immutable and returns it
fromEntries(entries) → Object | Object built from [key, value] pairs
groupBy(items, callback(value, index)) → Object | Object of arrays keyed by callback's result
hasOwn(obj, key) → Boolean | True if obj has its own key
keys(obj) → Array | Array of own enumerable keys
values(obj) → Array | Array of own enumerable values`,
    Array: `
from(iterable, mapFn(value, index)?) → Array | Array from an iterable or array-like, e.g. Array.from({ length: 3 }, (_, i) => i) → [0, 1, 2]
isArray(value) → Boolean | True if value is an array
of(...items) → Array | Array of the arguments`,
    Number: `
isFinite(value) → Boolean | True for a finite number; no type coercion
isInteger(value) → Boolean | True for an integer number
isNaN(value) → Boolean | True only for NaN itself; no type coercion
isSafeInteger(value) → Boolean | True for integers within ±(2^53 - 1)
parseFloat(string) → Number | Leading decimal number in string, else NaN
parseInt(string, radix?) → Number | Leading integer in string; pass radix 10 to be safe
EPSILON → Number | Smallest gap between 1 and the next number
MAX_SAFE_INTEGER → Number | 2^53 - 1
MIN_SAFE_INTEGER → Number | -(2^53 - 1)`,
    String: `
fromCharCode(...codes) → String | String from UTF-16 code units, e.g. String.fromCharCode(65) → "A"
fromCodePoint(...codePoints) → String | String from Unicode code points`,
    JSON: `
parse(text, reviver?) → any | Value from a JSON string
stringify(value, replacer?, space?) → String | JSON string; pass space to pretty-print`,
    console: `
assert(condition, ...values) → undefined | Logs an error when condition is falsy
count(label?) → undefined | Logs how many times this label has been counted
countReset(label?) → undefined | Resets a count
dir(value) → undefined | Logs value
error(...values) → undefined | Logs as an error
group(...label) → undefined | Indents the logs that follow
groupEnd() → undefined | Ends the current group
log(...values) → undefined | Logs the values
table(data) → undefined | Logs an array or object as a table
time(label?) → undefined | Starts a timer
timeEnd(label?) → undefined | Logs the elapsed time and stops the timer
timeLog(label?) → undefined | Logs the elapsed time
trace(...values) → undefined | Logs the values with a trace marker
warn(...values) → undefined | Logs as a warning`
  },
  globals: `
Array(length) → Array | new Array(n) makes n empty slots; fill them with .fill(value)
BigInt(value) → BigInt | Arbitrary-precision integer
Boolean(value) → Boolean | true for truthy values
Error(message) → Error | Use with throw new Error("...")
Map(entries?) → Map | new Map() or new Map([[key, value], ...])
Number(value) → Number | Converts value; Number("") → 0, Number("12px") → NaN
Object(value) → Object | Wraps value in an object
RegExp(pattern, flags?) → RegExp | Regexp from a string, e.g. new RegExp("\\\\d+", "g")
Set(iterable?) → Set | new Set() or new Set(array) to drop duplicates
String(value) → String | Converts value to a string
isFinite(value) → Boolean | Coerces first; prefer Number.isFinite
isNaN(value) → Boolean | Coerces first, so isNaN("a") is true; prefer Number.isNaN
parseFloat(string) → Number | Leading decimal number in string, else NaN
parseInt(string, radix?) → Number | Leading integer in string; pass radix 10 to be safe
structuredClone(value) → any | Deep copy`
};
