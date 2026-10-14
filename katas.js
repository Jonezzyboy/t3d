// Kata pool and daily schedule for T3D. Each kata's ref must pass its own tests.

const LEGACY_KATAS = [
  {
    id: "fizzbuzz", title: "FizzBuzz", fn: "fizzBuzz", params: "n", file: "fizz-buzz.js",
    brief: 'Return <code>n</code> as a string, except return <code>"Fizz"</code> for multiples of 3, <code>"Buzz"</code> for multiples of 5, and <code>"FizzBuzz"</code> for multiples of both.',
    tests: [[[1], "1"], [[2], "2"], [[3], "Fizz"], [[5], "Buzz"], [[6], "Fizz"], [[10], "Buzz"], [[15], "FizzBuzz"], [[45], "FizzBuzz"]],
    ref: `function fizzBuzz(n) {
  let out = "";
  if (n % 3 === 0) out += "Fizz";
  if (n % 5 === 0) out += "Buzz";
  return out || String(n);
}`
  },
  {
    id: "leap-year", title: "Leap Year", fn: "isLeapYear", params: "year", file: "leap-year.js",
    brief: "Return <code>true</code> if <code>year</code> is a leap year in the Gregorian calendar: divisible by 4, except centuries, which must also be divisible by 400.",
    tests: [[[2023], false], [[2024], true], [[1996], true], [[1900], false], [[2000], true], [[2100], false], [[2400], true]],
    ref: `function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}`
  },
  {
    id: "prime-factors", title: "Prime Factors", fn: "primeFactors", params: "n", file: "prime-factors.js",
    brief: "Return the prime factors of <code>n</code> in ascending order, repeating a factor as often as it divides. <code>1</code> has no prime factors.",
    tests: [[[1], []], [[2], [2]], [[3], [3]], [[4], [2, 2]], [[6], [2, 3]], [[8], [2, 2, 2]], [[9], [3, 3]], [[360], [2, 2, 2, 3, 3, 5]], [[9973], [9973]]],
    ref: `function primeFactors(n) {
  const factors = [];
  for (let d = 2; n > 1; d++) {
    for (; n % d === 0; n /= d) factors.push(d);
  }
  return factors;
}`
  },
  {
    id: "string-calculator", title: "String Calculator", fn: "add", params: "numbers", file: "string-calculator.js",
    brief: 'Sum the numbers in a string. They are separated by commas or newlines. An empty string is <code>0</code>. Numbers over 1000 are ignored. A first line of <code>//;</code> sets a custom single-character delimiter.',
    tests: [[[""], 0], [["4"], 4], [["1,2"], 3], [["1,2,3,4"], 10], [["1\n2,3"], 6], [["//;\n1;2"], 3], [["2,1001"], 2], [["1000,1"], 1001]],
    ref: `function add(numbers) {
  let delims = [",", "\\n"];
  if (numbers.startsWith("//")) {
    delims.push(numbers[2]);
    numbers = numbers.slice(4);
  }
  for (const d of delims) numbers = numbers.split(d).join(",");
  return numbers
    .split(",")
    .map(Number)
    .filter((n) => n <= 1000)
    .reduce((sum, n) => sum + n, 0);
}`
  },
  {
    id: "roman-numerals", title: "Roman Numerals", fn: "toRoman", params: "n", file: "roman-numerals.js",
    brief: "Convert a positive integer up to 3999 into Roman numerals, using subtractive forms like <code>IV</code> and <code>XC</code>.",
    tests: [[[1], "I"], [[2], "II"], [[4], "IV"], [[5], "V"], [[9], "IX"], [[14], "XIV"], [[40], "XL"], [[90], "XC"], [[400], "CD"], [[1994], "MCMXCIV"], [[2026], "MMXXVI"]],
    ref: `function toRoman(n) {
  const table = [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"],
    [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
  let out = "";
  for (const [value, glyph] of table) {
    while (n >= value) { out += glyph; n -= value; }
  }
  return out;
}`
  },
  {
    id: "balanced-brackets", title: "Balanced Brackets", fn: "isBalanced", params: "s", file: "balanced-brackets.js",
    brief: "Return <code>true</code> if every <code>()</code>, <code>[]</code> and <code>{}</code> in the string opens and closes in the right order. Ignore every other character.",
    tests: [[[""], true], [["()"], true], [["("], false], [["()[]{}"], true], [["([])"], true], [["([)]"], false], [[")("], false], [["{[()()]}"], true], [["a(b)c"], true]],
    ref: `function isBalanced(s) {
  const pairs = { ")": "(", "]": "[", "}": "{" };
  const stack = [];
  for (const ch of s) {
    if ("([{".includes(ch)) stack.push(ch);
    else if (ch in pairs && stack.pop() !== pairs[ch]) return false;
  }
  return stack.length === 0;
}`
  },
  {
    id: "caesar-cipher", title: "Caesar Cipher", fn: "caesar", params: "text, shift", file: "caesar.js",
    brief: "Shift every letter by <code>shift</code> places, wrapping around the alphabet and keeping its case. Leave everything else alone. Shifts can be negative or larger than 26.",
    tests: [[["abc", 1], "bcd"], [["xyz", 3], "abc"], [["ABC", 1], "BCD"], [["Hello, World!", 13], "Uryyb, Jbeyq!"], [["abc", -1], "zab"], [["abc", 27], "bcd"]],
    ref: `function caesar(text, shift) {
  const k = ((shift % 26) + 26) % 26;
  return text.replace(/[a-z]/gi, (ch) => {
    const base = ch <= "Z" ? 65 : 97;
    return String.fromCharCode(((ch.charCodeAt(0) - base + k) % 26) + base);
  });
}`
  },
  {
    id: "run-length-encoding", title: "Run-Length Encoding", fn: "encode", params: "s", file: "run-length.js",
    brief: "Compress runs of the same character into a count followed by the character. A run of one keeps no count, so <code>\"aaab\"</code> becomes <code>\"3ab\"</code>.",
    tests: [[[""], ""], [["a"], "a"], [["aa"], "2a"], [["aaab"], "3ab"], [["aabbbaa"], "2a3b2a"], [["WWWWWWWWWWWWB"], "12WB"], [["  hi"], "2 hi"]],
    ref: `function encode(s) {
  return s.replace(/(.)\\1*/g, (run, ch) => (run.length > 1 ? run.length : "") + ch);
}`
  },
  {
    id: "luhn-check", title: "Luhn Check", fn: "isValidLuhn", params: "number", file: "luhn.js",
    brief: "Return <code>true</code> if the number passes the Luhn checksum used on card numbers. Spaces are allowed and ignored. Anything with one digit or fewer, or any character other than a digit or space, is invalid.",
    tests: [[["0"], false], [["059"], true], [["59"], true], [["79927398713"], true], [["79927398710"], false], [["4539 3195 0343 6467"], true], [["8273 1232 7352 0569"], false], [["055a 444 285"], false], [[" 0"], false]],
    ref: `function isValidLuhn(number) {
  const digits = number.replace(/ /g, "");
  if (digits.length <= 1 || /\\D/.test(digits)) return false;
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let d = Number(digits[digits.length - 1 - i]);
    if (i % 2 === 1) { d *= 2; if (d > 9) d -= 9; }
    sum += d;
  }
  return sum % 10 === 0;
}`
  },
  {
    id: "bowling-score", title: "Bowling Score", fn: "score", params: "rolls", file: "bowling.js",
    brief: "Score a complete ten-pin game from its rolls. A spare adds the next roll as a bonus, a strike adds the next two, and the tenth frame gets its bonus rolls in the same array.",
    tests: [
      [[Array(20).fill(0)], 0, "[0 × 20]"],
      [[Array(20).fill(1)], 20, "[1 × 20]"],
      [[[5, 5, 3, ...Array(17).fill(0)]], 16, "[5, 5, 3, 0 × 17]"],
      [[[10, 3, 4, ...Array(16).fill(0)]], 24, "[10, 3, 4, 0 × 16]"],
      [[Array(10).fill([9, 0]).flat()], 90, "[9, 0 × 10]"],
      [[[...Array(18).fill(0), 5, 5, 5]], 15, "[0 × 18, 5, 5, 5]"],
      [[Array(12).fill(10)], 300, "[10 × 12]"]
    ],
    ref: `function score(rolls) {
  let total = 0, i = 0;
  for (let frame = 0; frame < 10; frame++) {
    if (rolls[i] === 10) { total += 10 + rolls[i + 1] + rolls[i + 2]; i += 1; }
    else if (rolls[i] + rolls[i + 1] === 10) { total += 10 + rolls[i + 2]; i += 2; }
    else { total += rolls[i] + rolls[i + 1]; i += 2; }
  }
  return total;
}`
  },
  {
    id: "word-wrap", title: "Word Wrap", fn: "wrap", params: "text, width", file: "word-wrap.js",
    brief: "Break <code>text</code> into lines no longer than <code>width</code>, joined with <code>\"\\n\"</code>. Break at spaces where you can, and split a word only when it is longer than a whole line.",
    tests: [[["", 5], ""], [["hello", 10], "hello"], [["hello world", 5], "hello\nworld"], [["hello world", 11], "hello world"], [["the quick brown fox", 10], "the quick\nbrown fox"], [["abcdefghij", 4], "abcd\nefgh\nij"], [["a b c d", 3], "a b\nc d"]],
    ref: `function wrap(text, width) {
  const lines = [];
  let line = "";
  for (let word of text.split(" ").filter(Boolean)) {
    while (word.length > width) {
      if (line) { lines.push(line); line = ""; }
      lines.push(word.slice(0, width));
      word = word.slice(width);
    }
    if (!line) line = word;
    else if (line.length + 1 + word.length <= width) line += " " + word;
    else { lines.push(line); line = word; }
  }
  if (line) lines.push(line);
  return lines.join("\\n");
}`
  },
  {
    id: "anagrams", title: "Anagrams", fn: "isAnagram", params: "a, b", file: "anagram.js",
    brief: "Return <code>true</code> if the two phrases use exactly the same letters. Ignore case and spaces.",
    tests: [[["listen", "silent"], true], [["abc", "abd"], false], [["a", "aa"], false], [["Listen", "Silent"], true], [["Dormitory", "dirty room"], true], [["aab", "abb"], false]],
    ref: `function isAnagram(a, b) {
  const key = (s) => s.toLowerCase().replace(/ /g, "").split("").sort().join("");
  return key(a) === key(b);
}`
  },
  {
    id: "diamond", title: "Diamond", fn: "diamond", params: "letter", file: "diamond.js",
    brief: "Draw a diamond that widens from <code>A</code> to the given letter and back. Rows are joined with <code>\"\\n\"</code> and padded with spaces so every row is the same width.",
    tests: [[["A"], "A"], [["B"], " A \nB B\n A "], [["C"], "  A  \n B B \nC   C\n B B \n  A  "], [["D"], "   A   \n  B B  \n C   C \nD     D\n C   C \n  B B  \n   A   "]],
    ref: `function diamond(letter) {
  const n = letter.charCodeAt(0) - 65;
  const rows = [];
  for (let i = 0; i <= n; i++) {
    const ch = String.fromCharCode(65 + i);
    const pad = " ".repeat(n - i);
    rows.push(i === 0 ? pad + ch + pad : pad + ch + " ".repeat(2 * i - 1) + ch + pad);
  }
  return rows.concat(rows.slice(0, -1).reverse()).join("\\n");
}`
  }
];

const KATAS = LEGACY_KATAS.concat([
  {
    id: "reverse-words", title: "Reverse Words", fn: "reverseWords", params: "s",
    brief: "Return the words of <code>s</code> in reverse order, separated by single spaces. Extra spaces anywhere in the input disappear.",
    tests: [[[""], ""], [["a"], "a"], [["hello world"], "world hello"], [["one two three"], "three two one"], [["  the sky  is blue "], "blue is sky the"]],
    ref: `function reverseWords(s) {
  return s.split(" ").filter(Boolean).reverse().join(" ");
}`
  },
  {
    id: "palindrome", title: "Palindromes", fn: "isPalindrome", params: "s",
    brief: "Return <code>true</code> if <code>s</code> reads the same forwards and backwards, ignoring case and anything that isn't a letter or digit.",
    tests: [[[""], true], [["a"], true], [["racecar"], true], [["hello"], false], [["Racecar"], true], [["ab"], false], [["A man, a plan, a canal: Panama"], true], [["No 'x' in Nixon"], true], [["12321"], true]],
    ref: `function isPalindrome(s) {
  const t = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  return t === [...t].reverse().join("");
}`
  },
  {
    id: "title-case", title: "Title Case", fn: "titleCase", params: "s",
    brief: "Capitalise the first letter of each word and lowercase the rest. The minor words <code>a an the of and in on at to for</code> stay lowercase unless they come first.",
    tests: [[[""], ""], [["hello"], "Hello"], [["hELLO wORLD"], "Hello World"], [["the wind in the willows"], "The Wind in the Willows"], [["A TALE OF TWO CITIES"], "A Tale of Two Cities"], [["of mice and men"], "Of Mice and Men"]],
    ref: `function titleCase(s) {
  const minor = new Set(["a", "an", "the", "of", "and", "in", "on", "at", "to", "for"]);
  return s.toLowerCase().split(" ").map((w, i) =>
    i > 0 && minor.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)
  ).join(" ");
}`
  },
  {
    id: "format-duration", title: "Human Durations", fn: "formatDuration", params: "seconds",
    brief: 'Describe a number of seconds in years (365 days), days, hours, minutes and seconds. Skip zero units, list the rest with commas and a final "and", and return <code>"now"</code> for zero.',
    tests: [[[0], "now"], [[1], "1 second"], [[2], "2 seconds"], [[62], "1 minute and 2 seconds"], [[120], "2 minutes"], [[3600], "1 hour"], [[3662], "1 hour, 1 minute and 2 seconds"], [[172801], "2 days and 1 second"], [[31536000], "1 year"], [[132030240], "4 years, 68 days, 3 hours and 4 minutes"]],
    ref: `function formatDuration(seconds) {
  if (seconds === 0) return "now";
  const units = [["year", 31536000], ["day", 86400], ["hour", 3600], ["minute", 60], ["second", 1]];
  const parts = [];
  for (const [name, size] of units) {
    const n = Math.floor(seconds / size);
    seconds %= size;
    if (n) parts.push(n + " " + name + (n > 1 ? "s" : ""));
  }
  return parts.length > 1 ? parts.slice(0, -1).join(", ") + " and " + parts.at(-1) : parts[0];
}`
  },
  {
    id: "from-roman", title: "Reading Roman", fn: "fromRoman", params: "numeral",
    brief: "Convert a Roman numeral back into a number. A smaller symbol before a larger one is subtracted, so <code>IV</code> is 4.",
    tests: [[["I"], 1], [["III"], 3], [["V"], 5], [["IV"], 4], [["IX"], 9], [["XL"], 40], [["LVIII"], 58], [["MCMXCIV"], 1994], [["MMXXVI"], 2026]],
    ref: `function fromRoman(numeral) {
  const value = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0;
  for (let i = 0; i < numeral.length; i++) {
    const cur = value[numeral[i]], next = value[numeral[i + 1]] || 0;
    total += cur < next ? -cur : cur;
  }
  return total;
}`
  },
  {
    id: "pascal-row", title: "Pascal's Triangle", fn: "pascalRow", params: "n",
    brief: "Return row <code>n</code> of Pascal's triangle, counting the single <code>[1]</code> at the top as row 0.",
    tests: [[[0], [1]], [[1], [1, 1]], [[2], [1, 2, 1]], [[3], [1, 3, 3, 1]], [[4], [1, 4, 6, 4, 1]], [[10], [1, 10, 45, 120, 210, 252, 210, 120, 45, 10, 1]]],
    ref: `function pascalRow(n) {
  const row = [1];
  for (let k = 1; k <= n; k++) row.push((row[k - 1] * (n - k + 1)) / k);
  return row;
}`
  },
  {
    id: "flatten", title: "Flatten", fn: "flatten", params: "arr",
    brief: "Flatten arrays nested to any depth into one flat array, keeping the order.",
    tests: [[[[]], []], [[[1, 2]], [1, 2]], [[[1, [2]]], [1, 2]], [[[[1, [2, [3]]], 4]], [1, 2, 3, 4]], [[[[], [[]]]], []], [[[[[[["deep"]]]], "end"]], ["deep", "end"]]],
    ref: `function flatten(arr) {
  return arr.reduce((out, x) => out.concat(Array.isArray(x) ? flatten(x) : x), []);
}`
  },
  {
    id: "chunk", title: "Chunk", fn: "chunk", params: "arr, size",
    brief: "Split <code>arr</code> into groups of <code>size</code>. The last group holds whatever is left over.",
    tests: [[[[], 2], []], [[[1, 2, 3], 1], [[1], [2], [3]]], [[[1, 2, 3, 4], 2], [[1, 2], [3, 4]]], [[[1, 2, 3, 4, 5], 2], [[1, 2], [3, 4], [5]]], [[[1, 2], 5], [[1, 2]]]],
    ref: `function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}`
  },
  {
    id: "unique-in-order", title: "Unique in Order", fn: "uniqueInOrder", params: "seq",
    brief: "Take a string or an array and return an array with consecutive duplicates collapsed to one, keeping the original order.",
    tests: [[[""], []], [["A"], ["A"]], [["AAAABBBCCDAABBB"], ["A", "B", "C", "D", "A", "B"]], [["ABBCcAD"], ["A", "B", "C", "c", "A", "D"]], [[[1, 2, 2, 3, 3]], [1, 2, 3]]],
    ref: `function uniqueInOrder(seq) {
  return [...seq].filter((x, i, all) => i === 0 || x !== all[i - 1]);
}`
  },
  {
    id: "max-subarray", title: "Best Run", fn: "maxSubarray", params: "nums",
    brief: "Return the largest sum of any run of consecutive numbers. An empty run counts, so the answer is never below 0.",
    tests: [[[[]], 0], [[[5]], 5], [[[-1]], 0], [[[1, 2, 3]], 6], [[[2, -1, 2]], 3], [[[-2, 1, -3, 4, -1, 2, 1, -5, 4]], 6]],
    ref: `function maxSubarray(nums) {
  let best = 0, run = 0;
  for (const n of nums) {
    run = Math.max(0, run + n);
    best = Math.max(best, run);
  }
  return best;
}`
  },
  {
    id: "binary-search", title: "Binary Search", fn: "binarySearch", params: "sorted, target",
    brief: "Find <code>target</code> in an ascending array and return its index, or <code>-1</code> if it isn't there. Halve the search each step: the tests count how many items of <code>sorted</code> you read.",
    tests: [[[[], 1], -1], [[[1], 1], 0], [[[1, 3, 5, 7], 5], 2], [[[1, 3, 5, 7], 4], -1], [[[1, 3, 5, 7, 9, 11], 11], 5], [[[1, 3, 5, 7, 9, 11], 1], 0], [[[1, 3, 5, 7, 9, 11], 12], -1],
      [[Array.from({ length: 1000 }, (_, i) => 2 * i + 1), 1501], 750, "[1, 3, 5, … 1999], 1501"],
      [[Array.from({ length: 1000 }, (_, i) => 2 * i + 1), 1998], -1, "[1, 3, 5, … 1999], 1998"]],
    // Room for a few reads per halving; a linear scan of the big tests reads hundreds.
    readLimit: { arg: 0, max: (n) => 4 * Math.ceil(Math.log2(n + 1)) },
    ref: `function binarySearch(sorted, target) {
  let lo = 0, hi = sorted.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (sorted[mid] === target) return mid;
    if (sorted[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`
  },
  {
    id: "isogram", title: "Isograms", fn: "isIsogram", params: "s",
    brief: "Return <code>true</code> if no letter appears more than once, ignoring case. Spaces and hyphens may repeat.",
    tests: [[[""], true], [["isogram"], true], [["eleven"], false], [["Alphabet"], false], [["six-year-old"], true], [["Emily Jung Schwartzkopf"], true], [["accentor"], false]],
    ref: `function isIsogram(s) {
  const letters = s.toLowerCase().replace(/[^a-z]/g, "");
  return new Set(letters).size === letters.length;
}`
  },
  {
    id: "pangram", title: "Pangrams", fn: "isPangram", params: "s",
    brief: "Return <code>true</code> if the sentence uses every letter of the alphabet at least once, in any case.",
    tests: [[[""], false], [["abcdefghijklmnopqrstuvwxyz"], true], [["The quick brown fox jumps over the lazy dog"], true], [["a quick movement of the enemy will jeopardize five gunboats"], false], [["the_quick_brown_fox_jumps_over_the_lazy_dog"], true], [["Five quacking Zephyrs jolt my wax bed."], true]],
    ref: `function isPangram(s) {
  return new Set(s.toLowerCase().replace(/[^a-z]/g, "")).size === 26;
}`
  },
  {
    id: "acronym", title: "Acronyms", fn: "acronym", params: "phrase",
    brief: "Build an acronym from the first letter of each word. Words are separated by spaces or hyphens, and punctuation doesn't count as a letter.",
    tests: [[["Portable Network Graphics"], "PNG"], [["Ruby on Rails"], "ROR"], [["Complementary metal-oxide semiconductor"], "CMOS"], [["Halley's Comet"], "HC"], [["The Road _Not_ Taken"], "TRNT"]],
    ref: `function acronym(phrase) {
  return phrase
    .split(/[\\s-]+/)
    .map((w) => (w.match(/[a-z]/i) || [""])[0])
    .join("")
    .toUpperCase();
}`
  },
  {
    id: "scrabble", title: "Scrabble Score", fn: "scrabbleScore", params: "word",
    brief: "Score a word with English Scrabble tile values: <code>AEIOULNRST</code> 1, <code>DG</code> 2, <code>BCMP</code> 3, <code>FHVWY</code> 4, <code>K</code> 5, <code>JX</code> 8, <code>QZ</code> 10. Ignore case.",
    tests: [[[""], 0], [["a"], 1], [["f"], 4], [["at"], 2], [["street"], 6], [["quirky"], 22], [["OxyphenButazone"], 41]],
    ref: `function scrabbleScore(word) {
  const values = { aeioulnrst: 1, dg: 2, bcmp: 3, fhvwy: 4, k: 5, jx: 8, qz: 10 };
  let score = 0;
  for (const ch of word.toLowerCase()) {
    for (const [letters, v] of Object.entries(values)) if (letters.includes(ch)) score += v;
  }
  return score;
}`
  },
  {
    id: "hamming", title: "Hamming Distance", fn: "hamming", params: "a, b",
    brief: "Count the positions where two DNA strands differ. Strands of different lengths can't be compared, so return <code>-1</code>.",
    tests: [[["", ""], 0], [["A", "A"], 0], [["G", "T"], 1], [["GGACTGAAATCTG", "GGACTGAAATCTG"], 0], [["GGACGGATTCTG", "AGGACGGATTCT"], 9], [["AB", "A"], -1]],
    ref: `function hamming(a, b) {
  if (a.length !== b.length) return -1;
  let d = 0;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) d++;
  return d;
}`
  },
  {
    id: "rna", title: "RNA Transcription", fn: "toRna", params: "dna",
    brief: "Transcribe a DNA strand into RNA: <code>G</code> becomes <code>C</code>, <code>C</code> becomes <code>G</code>, <code>T</code> becomes <code>A</code>, and <code>A</code> becomes <code>U</code>.",
    tests: [[[""], ""], [["C"], "G"], [["G"], "C"], [["T"], "A"], [["A"], "U"], [["ACGTGGTCTTAA"], "UGCACCAGAAUU"]],
    ref: `function toRna(dna) {
  const pair = { G: "C", C: "G", T: "A", A: "U" };
  return [...dna].map((n) => pair[n]).join("");
}`
  },
  {
    id: "collatz", title: "Collatz Steps", fn: "collatzSteps", params: "n",
    brief: "Count the steps to reach 1: halve <code>n</code> when it's even, otherwise make it <code>3n + 1</code>.",
    tests: [[[1], 0], [[2], 1], [[4], 2], [[16], 4], [[3], 7], [[12], 9], [[1000000], 152]],
    ref: `function collatzSteps(n) {
  let steps = 0;
  for (; n !== 1; steps++) n = n % 2 ? 3 * n + 1 : n / 2;
  return steps;
}`
  },
  {
    id: "armstrong", title: "Armstrong Numbers", fn: "isArmstrong", params: "n",
    brief: "Return <code>true</code> if <code>n</code> equals the sum of its digits, each raised to the power of how many digits it has.",
    tests: [[[0], true], [[5], true], [[10], false], [[153], true], [[100], false], [[9474], true], [[9475], false], [[9926315], true]],
    ref: `function isArmstrong(n) {
  const digits = String(n);
  return [...digits].reduce((sum, d) => sum + Number(d) ** digits.length, 0) === n;
}`
  },
  {
    id: "nth-prime", title: "Nth Prime", fn: "nthPrime", params: "n",
    brief: "Return the <code>n</code>th prime number, where the first prime is 2.",
    tests: [[[1], 2], [[2], 3], [[3], 5], [[6], 13], [[100], 541], [[1000], 7919]],
    ref: `function nthPrime(n) {
  const primes = [];
  for (let k = 2; primes.length < n; k++) {
    if (primes.every((p) => p * p > k || k % p !== 0)) primes.push(k);
  }
  return primes[n - 1];
}`
  },
  {
    id: "primes-up-to", title: "Sieve", fn: "primesUpTo", params: "limit",
    brief: "Return every prime up to and including <code>limit</code>, in ascending order.",
    tests: [[[1], []], [[2], [2]], [[3], [2, 3]], [[10], [2, 3, 5, 7]], [[13], [2, 3, 5, 7, 11, 13]], [[30], [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]]],
    ref: `function primesUpTo(limit) {
  const composite = new Array(limit + 1).fill(false);
  const primes = [];
  for (let i = 2; i <= limit; i++) {
    if (composite[i]) continue;
    primes.push(i);
    for (let j = i * i; j <= limit; j += i) composite[j] = true;
  }
  return primes;
}`
  },
  {
    id: "gcd", title: "Greatest Common Divisor", fn: "gcd", params: "a, b",
    brief: "Return the largest whole number that divides both <code>a</code> and <code>b</code>. Inputs are non-negative and not both zero.",
    tests: [[[1, 1], 1], [[12, 8], 4], [[8, 12], 4], [[17, 5], 1], [[0, 9], 9], [[270, 192], 6], [[1071, 462], 21]],
    ref: `function gcd(a, b) {
  while (b) [a, b] = [b, a % b];
  return a;
}`
  },
  {
    id: "digital-root", title: "Digital Root", fn: "digitalRoot", params: "n",
    brief: "Add up the digits of <code>n</code>, and keep adding up the digits of the result until a single digit is left.",
    tests: [[[0], 0], [[7], 7], [[16], 7], [[942], 6], [[132189], 6], [[493193], 2]],
    ref: `function digitalRoot(n) {
  while (n > 9) n = [...String(n)].reduce((sum, d) => sum + Number(d), 0);
  return n;
}`
  },
  {
    id: "pig-latin", title: "Pig Latin", fn: "pigLatin", params: "text",
    brief: 'Translate each word. Words starting with a vowel get <code>"ay"</code> added. Otherwise move the leading consonants to the end first, treating <code>qu</code> as one consonant and <code>y</code> after a consonant as a vowel.',
    tests: [[["apple"], "appleay"], [["pig"], "igpay"], [["chair"], "airchay"], [["quick"], "ickquay"], [["square"], "aresquay"], [["yellow"], "ellowyay"], [["rhythm"], "ythmrhay"], [["my"], "ymay"], [["quick fast run"], "ickquay astfay unray"]],
    ref: `function pigLatin(text) {
  return text.split(" ").map((w) => {
    if (/^[aeiou]/.test(w)) return w + "ay";
    const [, head, tail] = w.match(/^([^aeiou]?qu|[^aeiouy]+|y)(.*)$/);
    return tail + head + "ay";
  }).join(" ");
}`
  },
  {
    id: "isbn", title: "ISBN-10", fn: "isValidIsbn", params: "isbn",
    brief: "Check an ISBN-10. Ignore hyphens. It needs nine digits then a digit or <code>X</code> (worth 10), and the digits weighted 10 down to 1 must sum to a multiple of 11.",
    tests: [[[""], false], [["3-598-21508-8"], true], [["3-598-21508-9"], false], [["3-598-21507-X"], true], [["359821507X"], true], [["3-598-2K507-0"], false], [["3-598-21507"], false], [["3-598-2X507-9"], false]],
    ref: `function isValidIsbn(isbn) {
  const chars = isbn.replace(/-/g, "");
  if (!/^\\d{9}[\\dX]$/.test(chars)) return false;
  const sum = [...chars].reduce((acc, ch, i) => acc + (ch === "X" ? 10 : Number(ch)) * (10 - i), 0);
  return sum % 11 === 0;
}`
  },
  {
    id: "transpose", title: "Transpose", fn: "transpose", params: "matrix",
    brief: "Swap the rows and columns of a rectangular matrix.",
    tests: [[[[]], []], [[[[1]]], [[1]]], [[[[1, 2, 3]]], [[1], [2], [3]]], [[[[1], [2]]], [[1, 2]]], [[[[1, 2], [3, 4], [5, 6]]], [[1, 3, 5], [2, 4, 6]]]],
    ref: `function transpose(matrix) {
  if (!matrix.length) return [];
  return matrix[0].map((_, c) => matrix.map((row) => row[c]));
}`
  },
  {
    id: "spiral", title: "Spiral", fn: "spiral", params: "matrix",
    brief: "Read a matrix in a clockwise spiral, starting at the top left, and return the values in that order.",
    tests: [[[[]], []], [[[[1]]], [1]], [[[[1, 2], [3, 4]]], [1, 2, 4, 3]], [[[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], [1, 2, 3, 6, 9, 8, 7, 4, 5]], [[[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]], [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]], [[[[1], [2], [3]]], [1, 2, 3]]],
    ref: `function spiral(matrix) {
  const out = [];
  let rows = matrix.map((r) => r.slice());
  while (rows.length) {
    out.push(...rows.shift());
    rows = rows[0] ? rows[0].map((_, c) => rows.map((r) => r[r.length - 1 - c])) : [];
  }
  return out;
}`
  },
  {
    id: "two-sum", title: "Two Sum", fn: "twoSum", params: "nums, target",
    brief: "Find the two positions whose numbers add up to <code>target</code> and return them as <code>[i, j]</code> with <code>i &lt; j</code>. Return <code>[]</code> if no pair works.",
    tests: [[[[2, 7, 11, 15], 9], [0, 1]], [[[3, 2, 4], 6], [1, 2]], [[[3, 3], 6], [0, 1]], [[[1, 2, 3], 7], []], [[[-3, 4, 3, 90], 0], [0, 2]], [[[5, 75, 25], 100], [1, 2]]],
    ref: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (seen.has(target - nums[i])) return [seen.get(target - nums[i]), i];
    seen.set(nums[i], i);
  }
  return [];
}`
  },
  {
    id: "camel-case", title: "camelCase", fn: "camelCase", params: "s",
    brief: "Turn words separated by spaces, hyphens or underscores into camelCase: the first word all lowercase, the rest capitalised.",
    tests: [[[""], ""], [["hello"], "hello"], [["hello world"], "helloWorld"], [["Hello"], "hello"], [["the-stealth-warrior"], "theStealthWarrior"], [["The_Stealth_Warrior"], "theStealthWarrior"], [["HTTP request"], "httpRequest"]],
    ref: `function camelCase(s) {
  return s.split(/[\\s_-]+/).filter(Boolean).map((w, i) => {
    w = w.toLowerCase();
    return i ? w[0].toUpperCase() + w.slice(1) : w;
  }).join("");
}`
  },
  {
    id: "kebab-case", title: "kebab-case", fn: "kebabCase", params: "s",
    brief: "Turn camelCase or PascalCase into kebab-case. A run of capitals is one word, so <code>XMLHttp</code> becomes <code>xml-http</code>.",
    tests: [[[""], ""], [["hello"], "hello"], [["helloWorld"], "hello-world"], [["HelloWorld"], "hello-world"], [["already-kebab"], "already-kebab"], [["version2Update"], "version2-update"], [["XMLHttpRequest"], "xml-http-request"]],
    ref: `function kebabCase(s) {
  return s
    .replace(/([a-z\\d])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}`
  },
  {
    id: "count-bits", title: "Counting Bits", fn: "countBits", params: "n",
    brief: "Return how many 1s appear when the non-negative integer <code>n</code> is written in binary.",
    tests: [[[0], 0], [[1], 1], [[2], 1], [[7], 3], [[8], 1], [[1234], 5], [[2147483647], 31], [[4294967296], 1]],
    ref: `function countBits(n) {
  let count = 0;
  for (; n > 0; n = Math.floor(n / 2)) count += n % 2;
  return count;
}`
  },
  {
    id: "days-in-month", title: "Days in Month", fn: "daysInMonth", params: "year, month",
    brief: "Return how many days are in <code>month</code> (1 to 12) of <code>year</code> in the Gregorian calendar.",
    tests: [[[2023, 1], 31], [[2023, 4], 30], [[2023, 2], 28], [[2024, 2], 29], [[1900, 2], 28], [[2000, 2], 29], [[2023, 12], 31], [[2023, 9], 30]],
    ref: `function daysInMonth(year, month) {
  if (month === 2) return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28;
  return [4, 6, 9, 11].includes(month) ? 30 : 31;
}`
  },
  {
    id: "find-anagrams", title: "Anagram Finder", fn: "findAnagrams", params: "word, candidates",
    brief: "Return the candidates that are anagrams of <code>word</code>, ignoring case and keeping their order. A word isn't an anagram of itself.",
    tests: [[["good", ["dog", "goody"]], []], [["listen", ["enlists", "google", "inlets", "banana"]], ["inlets"]], [["master", ["stream", "pigeon", "maters"]], ["stream", "maters"]], [["Orchestra", ["cashregister", "Carthorse", "radishes"]], ["Carthorse"]], [["BANANA", ["banana", "Banana"]], []]],
    ref: `function findAnagrams(word, candidates) {
  const key = (w) => [...w.toLowerCase()].sort().join("");
  return candidates.filter((c) => c.toLowerCase() !== word.toLowerCase() && key(c) === key(word));
}`
  },
  {
    id: "top-three", title: "High Scores", fn: "topThree", params: "scores",
    brief: "Return the three highest scores, highest first. Return fewer if there aren't three. Don't change the array you were given.",
    tests: [[[[]], []], [[[40]], [40]], [[[20, 70]], [70, 20]], [[[10, 30, 90, 30, 100, 20, 10, 0, 30, 40, 40, 70, 70]], [100, 90, 70]], [[[40, 20, 40, 30]], [40, 40, 30]]],
    ref: `function topThree(scores) {
  return [...scores].sort((a, b) => b - a).slice(0, 3);
}`
  },
  {
    id: "clean-phone", title: "Phone Numbers", fn: "cleanPhone", params: "input",
    brief: 'Clean a North American phone number down to its ten digits. An optional leading country code 1 is dropped. If the area code or exchange (digits 1 and 4) starts with 0 or 1, or the length is wrong, return <code>""</code>.',
    tests: [[["(223) 456-7890"], "2234567890"], [["223.456.7890"], "2234567890"], [["123456789"], ""], [["1 223 456 7890"], "2234567890"], [["22234567890"], ""], [["+1 (223) 456-7890"], "2234567890"], [["(023) 456-7890"], ""], [["(223) 056-7890"], ""]],
    ref: `function cleanPhone(input) {
  let digits = input.replace(/\\D/g, "");
  if (digits.length === 11 && digits[0] === "1") digits = digits.slice(1);
  if (digits.length !== 10 || "01".includes(digits[0]) || "01".includes(digits[3])) return "";
  return digits;
}`
  },
  {
    id: "triangle", title: "Triangles", fn: "triangleKind", params: "a, b, c",
    brief: 'Classify a triangle by its side lengths as <code>"equilateral"</code>, <code>"isosceles"</code> or <code>"scalene"</code>. Return <code>"invalid"</code> if any side is 0 or less, or two sides don\'t add up to more than the third.',
    tests: [[[2, 2, 2], "equilateral"], [[3, 4, 4], "isosceles"], [[3, 4, 5], "scalene"], [[4, 3, 4], "isosceles"], [[1, 1, 3], "invalid"], [[0, 0, 0], "invalid"], [[1, 1, 2], "invalid"], [[5, 4, 6], "scalene"]],
    ref: `function triangleKind(a, b, c) {
  const [x, y, z] = [a, b, c].sort((p, q) => p - q);
  if (x <= 0 || x + y <= z) return "invalid";
  if (x === z) return "equilateral";
  return x === y || y === z ? "isosceles" : "scalene";
}`
  },
  {
    id: "resistor", title: "Resistor Colours", fn: "resistorValue", params: "colors",
    brief: "Each colour is a digit: black 0, brown 1, red 2, orange 3, yellow 4, green 5, blue 6, violet 7, grey 8, white 9. Read the first two bands as a two-digit number and ignore any others.",
    tests: [[[["brown", "black"]], 10], [[["blue", "grey"]], 68], [[["yellow", "violet"]], 47], [[["white", "red"]], 92], [[["black", "brown"]], 1], [[["green", "brown", "orange"]], 51]],
    ref: `function resistorValue(colors) {
  const bands = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];
  return bands.indexOf(colors[0]) * 10 + bands.indexOf(colors[1]);
}`
  },
  {
    id: "rotate", title: "Rotate", fn: "rotate", params: "arr, k",
    brief: "Rotate the array right by <code>k</code> places, wrapping around. A negative <code>k</code> rotates left.",
    tests: [[[[], 3], []], [[[1, 2, 3, 4, 5], 0], [1, 2, 3, 4, 5]], [[[1, 2, 3, 4, 5], 1], [5, 1, 2, 3, 4]], [[[1, 2, 3, 4, 5], 2], [4, 5, 1, 2, 3]], [[[1, 2, 3, 4, 5], 7], [4, 5, 1, 2, 3]], [[[1, 2, 3], -1], [2, 3, 1]]],
    ref: `function rotate(arr, k) {
  if (!arr.length) return [];
  const n = ((k % arr.length) + arr.length) % arr.length;
  return arr.slice(arr.length - n).concat(arr.slice(0, arr.length - n));
}`
  },
  {
    id: "ranges", title: "Range Summary", fn: "summariseRanges", params: "nums",
    brief: 'Summarise an ascending list of integers. Runs of consecutive numbers become <code>"a-b"</code>, single numbers stay as they are, and the parts are joined with commas.',
    tests: [[[[]], ""], [[[1]], "1"], [[[1, 2, 3]], "1-3"], [[[4, 5]], "4-5"], [[[1, 2, 3, 5, 7, 8, 9]], "1-3,5,7-9"], [[[0, 2, 3, 4, 6, 8, 9]], "0,2-4,6,8-9"]],
    ref: `function summariseRanges(nums) {
  const out = [];
  for (let i = 0; i < nums.length; i++) {
    let j = i;
    while (nums[j + 1] === nums[j] + 1) j++;
    out.push(i === j ? String(nums[i]) : nums[i] + "-" + nums[j]);
    i = j;
  }
  return out.join(",");
}`
  },
  {
    id: "tribonacci", title: "Tribonacci", fn: "tribonacci", params: "n",
    brief: "The sequence starts <code>0, 0, 1</code> and each later term is the sum of the three before it. Return the term at index <code>n</code>.",
    tests: [[[0], 0], [[1], 0], [[2], 1], [[3], 1], [[4], 2], [[5], 4], [[10], 81], [[37], 1132436852]],
    ref: `function tribonacci(n) {
  const t = [0, 0, 1];
  while (t.length <= n) t.push(t.at(-1) + t.at(-2) + t.at(-3));
  return t[n];
}`
  },
  {
    id: "minesweeper", title: "Minesweeper", fn: "annotate", params: "board",
    brief: 'The board is an array of strings where <code>"*"</code> is a mine and a space is empty. Replace each empty square with how many mines touch it, including diagonally, or leave it as a space if none do.',
    tests: [[[[]], []], [[[""]], [""]], [[["*"]], ["*"]], [[["   "]], ["   "]], [[["   ", " * ", "   "]], ["111", "1*1", "111"]], [[[" * * "]], ["1*2*1"]], [[["*  ", "   ", "  *"]], ["*1 ", "121", " 1*"]]],
    ref: `function annotate(board) {
  return board.map((row, r) => [...row].map((cell, c) => {
    if (cell === "*") return "*";
    let n = 0;
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) if (board[r + dr]?.[c + dc] === "*") n++;
    }
    return n ? String(n) : " ";
  }).join(""));
}`
  },
  {
    id: "life", title: "Game of Life", fn: "nextGeneration", params: "board",
    brief: "Advance Conway's Game of Life one step on a grid of 0s and 1s. A live cell survives with 2 or 3 live neighbours, a dead cell comes alive with exactly 3, and everything outside the grid is dead.",
    tests: [[[[]], []], [[[[1]]], [[0]]], [[[[0, 0], [0, 0]]], [[0, 0], [0, 0]]], [[[[1, 1], [1, 1]]], [[1, 1], [1, 1]]], [[[[1, 1, 0], [1, 0, 0], [0, 0, 0]]], [[1, 1, 0], [1, 1, 0], [0, 0, 0]]], [[[[0, 1, 0], [0, 1, 0], [0, 1, 0]]], [[0, 0, 0], [1, 1, 1], [0, 0, 0]]]],
    ref: `function nextGeneration(board) {
  return board.map((row, r) => row.map((alive, c) => {
    let n = 0;
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) if ((dr || dc) && board[r + dr]?.[c + dc]) n++;
    }
    return n === 3 || (alive && n === 2) ? 1 : 0;
  }));
}`
  },
  {
    id: "queen-attack", title: "Queen Attack", fn: "canAttack", params: "white, black",
    brief: "Two queens sit on a chessboard at <code>[row, column]</code>. Return <code>true</code> if they share a row, a column or a diagonal.",
    tests: [[[[2, 3], [4, 7]], false], [[[2, 4], [2, 6]], true], [[[4, 5], [2, 5]], true], [[[2, 2], [0, 4]], true], [[[1, 1], [6, 6]], true], [[[1, 7], [0, 6]], true], [[[2, 2], [3, 4]], false]],
    ref: `function canAttack([r1, c1], [r2, c2]) {
  return r1 === r2 || c1 === c2 || Math.abs(r1 - r2) === Math.abs(c1 - c2);
}`
  },
  {
    id: "say-number", title: "Say the Number", fn: "sayNumber", params: "n",
    brief: 'Spell out a whole number from 0 to 999,999 in English, with hyphens in compounds like <code>"forty-two"</code> and no "and".',
    tests: [[[0], "zero"], [[1], "one"], [[14], "fourteen"], [[20], "twenty"], [[22], "twenty-two"], [[100], "one hundred"], [[123], "one hundred twenty-three"], [[1000], "one thousand"], [[1234], "one thousand two hundred thirty-four"], [[21000], "twenty-one thousand"], [[999999], "nine hundred ninety-nine thousand nine hundred ninety-nine"]],
    ref: `function sayNumber(n) {
  const ones = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
    "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  const small = (k) => (k < 20 ? ones[k] : tens[Math.floor(k / 10)] + (k % 10 ? "-" + ones[k % 10] : ""));
  const upTo999 = (k) => (k >= 100 ? ones[Math.floor(k / 100)] + " hundred" + (k % 100 ? " " + small(k % 100) : "") : small(k));
  if (n < 1000) return upTo999(n);
  return upTo999(Math.floor(n / 1000)) + " thousand" + (n % 1000 ? " " + upTo999(n % 1000) : "");
}`
  }
]);

/* ---------- Generated katas ---------- */

// Each family builds a fresh variant from a seeded RNG, so the daily pool never runs dry.
const pick = (rng, list) => list[Math.floor(rng() * list.length)];
const between = (rng, lo, hi) => lo + Math.floor(rng() * (hi - lo + 1));

const GENERATORS = [
  {
    id: "fizz-remix",
    make(rng) {
      const [a, b] = pick(rng, [[2, 3], [2, 5], [2, 7], [3, 4], [3, 5], [3, 7], [4, 5], [4, 7], [5, 6], [5, 7], [6, 7], [3, 8], [5, 8], [7, 8], [4, 9], [5, 9], [7, 9], [2, 9]]);
      const [wa, wb] = pick(rng, [["Tick", "Tock"], ["Zig", "Zag"], ["Ping", "Pong"], ["Bish", "Bosh"], ["Flip", "Flop"], ["Crackle", "Pop"], ["Hip", "Hop"], ["Clink", "Clank"]]);
      const fn = wa.toLowerCase() + wb;
      return {
        title: `${wa}${wb}`, fn, params: "n",
        brief: `FizzBuzz with new rules. Return <code>n</code> as a string, except return <code>"${wa}"</code> for multiples of ${a}, <code>"${wb}"</code> for multiples of ${b}, and <code>"${wa}${wb}"</code> for multiples of both.`,
        solve: (n) => (n % a === 0 ? wa : "") + (n % b === 0 ? wb : "") || String(n),
        inputs: [[1], [a], [b], [a * 2], [b * 2], [a * b], [a * b + 1], [a * b * 3]],
        ref: `function ${fn}(n) {
  let out = "";
  if (n % ${a} === 0) out += "${wa}";
  if (n % ${b} === 0) out += "${wb}";
  return out || String(n);
}`
      };
    }
  },
  {
    id: "base-n",
    make(rng) {
      const base = pick(rng, [2, 3, 4, 5, 6, 7, 8, 9, 12, 16, 20, 36]);
      const fn = `toBase${base}`;
      return {
        title: `Base ${base}`, fn, params: "n",
        brief: `Write a non-negative integer in base ${base} and return it as a string.${base > 10 ? ' Digits above 9 are lowercase letters, so ten is <code>"a"</code>.' : ""}`,
        solve: (n) => n.toString(base),
        inputs: [[0], [1], [base - 1], [base], [base + 1], [base * base], [255], [1000], [between(rng, 5000, 99999)]],
        ref: `function ${fn}(n) {
  const digits = "0123456789abcdefghijklmnopqrstuvwxyz";
  if (n === 0) return "0";
  let out = "";
  for (; n > 0; n = Math.floor(n / ${base})) out = digits[n % ${base}] + out;
  return out;
}`
      };
    }
  },
  {
    id: "sum-multiples",
    make(rng) {
      const a = between(rng, 2, 6);
      const b = between(rng, a + 1, 9);
      return {
        title: `Multiples of ${a} or ${b}`, fn: "sumOfMultiples", params: "limit",
        brief: `Add up every natural number below <code>limit</code> that is a multiple of ${a} or ${b}. A number that is a multiple of both counts once.`,
        solve: (limit) => { let sum = 0; for (let i = 1; i < limit; i++) if (i % a === 0 || i % b === 0) sum += i; return sum; },
        inputs: [[1], [a], [a + 1], [b + 1], [20], [100], [1000], [between(rng, 2000, 9999)]],
        ref: `function sumOfMultiples(limit) {
  let sum = 0;
  for (let i = 1; i < limit; i++) {
    if (i % ${a} === 0 || i % ${b} === 0) sum += i;
  }
  return sum;
}`
      };
    }
  },
  {
    id: "min-coins",
    make(rng) {
      const x = between(rng, 3, 7);
      let y = between(rng, x + 2, x + 9);
      if (y % x === 0) y++;
      const coins = [1, x, y];
      const solve = (amount) => {
        const best = [0];
        for (let v = 1; v <= amount; v++) best[v] = Math.min(...coins.filter((c) => c <= v).map((c) => best[v - c] + 1));
        return best[amount];
      };
      const greedy = (amount) => { let n = 0; for (const c of [y, x, 1]) { n += Math.floor(amount / c); amount %= c; } return n; };
      const trap = Array.from({ length: 100 }, (_, i) => i + 1).find((v) => greedy(v) !== solve(v));
      return {
        title: `Coins of 1, ${x} and ${y}`, fn: "minCoins", params: "amount",
        brief: `Coins come in values of 1, ${x} and ${y}. Return the fewest coins that add up to exactly <code>amount</code>.${trap ? " Grabbing the biggest coin first doesn't always work." : ""}`,
        solve,
        inputs: [[0], [1], [x], [y], [x + 1], [x + y], ...(trap ? [[trap]] : []), [99], [between(rng, 100, 250)]],
        ref: `function minCoins(amount) {
  const coins = [1, ${x}, ${y}];
  const best = [0];
  for (let v = 1; v <= amount; v++) {
    best[v] = Math.min(...coins.filter((c) => c <= v).map((c) => best[v - c] + 1));
  }
  return best[amount];
}`
      };
    }
  },
  {
    id: "leet",
    make(rng) {
      const pool = [["a", "4"], ["e", "3"], ["i", "1"], ["o", "0"], ["s", "5"], ["t", "7"], ["b", "8"], ["g", "9"]];
      for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
      const swaps = pool.slice(0, between(rng, 3, 5)).sort();
      const map = Object.fromEntries(swaps);
      const letters = swaps.map(([l]) => l).join("");
      const words = ["boats", "tigers", "bagels", "goat", "beast", "otters", "gist", "biscuit"];
      const hit = words.find((w) => w.includes(swaps[0][0])) || swaps[0][0];
      return {
        title: `Leet: ${swaps.map(([l, d]) => l + d).join(" ")}`, fn: "leet", params: "text",
        brief: `Swap these letters for digits, whether upper or lower case: ${swaps.map(([l, d]) => `<code>${l}</code> → <code>${d}</code>`).join(", ")}. Leave every other character alone.`,
        solve: (text) => text.replace(new RegExp(`[${letters}]`, "gi"), (ch) => map[ch.toLowerCase()]),
        inputs: [[""], ["xyz"], [hit], [hit.toUpperCase()], ["Hello World"], ["Totally Sensible Text"], ["Big Bold Statements, 2 go!"]],
        ref: `function leet(text) {
  const swap = ${JSON.stringify(map).replace(/,/g, ", ").replace(/:/g, ": ")};
  return text.replace(/[${letters}]/gi, (ch) => swap[ch.toLowerCase()]);
}`
      };
    }
  },
  {
    id: "word-score",
    make(rng) {
      const v = between(rng, 1, 3);
      let c = between(rng, 1, 5);
      if (c === v) c++;
      const bonus = pick(rng, [..."bcdfghkmnprstw"]);
      const solve = (word) => [...word.toLowerCase()].reduce((sum, ch) => {
        if (!/[a-z]/.test(ch)) return sum;
        const base = "aeiou".includes(ch) ? v : c;
        return sum + (ch === bonus ? base * 3 : base);
      }, 0);
      return {
        title: `Word Score: ${bonus.toUpperCase()} Triples`, fn: "wordScore", params: "word",
        brief: `Score a word. Vowels (a, e, i, o, u) are worth ${v}, every other letter is worth ${c}, and each <code>${bonus}</code> scores triple. Ignore case, and anything that isn't a letter scores nothing.`,
        solve,
        inputs: [[""], ["a"], ["z"], [bonus], ["hello"], [bonus.toUpperCase() + "a" + bonus], ["Queue"], ["Don't panic!"], ["Strengths"]],
        ref: `function wordScore(word) {
  let sum = 0;
  for (const ch of word.toLowerCase()) {
    if (!/[a-z]/.test(ch)) continue;
    const base = "aeiou".includes(ch) ? ${v} : ${c};
    sum += ch === "${bonus}" ? base * 3 : base;
  }
  return sum;
}`
      };
    }
  }
];

/* ---------- Daily schedule ---------- */

function mulberry32(seed) {
  return function () {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Days 1-13 shipped with the first 13 katas in this order; changing that would orphan saved games.
const LEGACY_DAYS = 13;
const GENERATOR_SLOTS = 2;
const cycleCache = [];

// One shuffled pass over every kata plus generator slots. Cycle 0 skips the legacy katas that were just played.
function cycleOrder(c) {
  if (cycleCache[c]) return cycleCache[c];
  const ids = KATAS.slice(c === 0 ? LEGACY_DAYS : 0).map((k) => k.id)
    .concat(GENERATORS.flatMap((g) => Array(GENERATOR_SLOTS).fill("gen:" + g.id)));
  const rng = mulberry32(0x7e3d + c * 1013);
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  const prevLast = c > 0 ? cycleOrder(c - 1).at(-1) : null;
  for (let i = 0; i < ids.length; i++) {
    const before = i === 0 ? prevLast : ids[i - 1];
    if (ids[i] !== before) continue;
    const k = ids.findIndex((id, j) => j > i && id !== before && ids[j - 1] !== ids[i] && ids[j + 1] !== ids[i]);
    if (k > 0) [ids[i], ids[k]] = [ids[k], ids[i]];
  }
  return (cycleCache[c] = ids);
}

function buildGenerated(genId, day) {
  const g = GENERATORS.find((x) => x.id === genId);
  const spec = g.make(mulberry32(day * 7919 + GENERATORS.indexOf(g) * 104729));
  const seen = new Set();
  const tests = [];
  for (const args of spec.inputs) {
    const key = JSON.stringify(args);
    if (seen.has(key)) continue;
    seen.add(key);
    tests.push([args, spec.solve(...args)]);
  }
  return { id: `${g.id}-${day}`, title: spec.title, fn: spec.fn, params: spec.params, brief: spec.brief, tests, ref: spec.ref };
}

function kataFor(day) {
  if (day <= LEGACY_DAYS) return KATAS[day - 1];
  let k = day - LEGACY_DAYS - 1, c = 0;
  while (k >= cycleOrder(c).length) { k -= cycleOrder(c).length; c++; }
  const id = cycleOrder(c)[k];
  return id.startsWith("gen:") ? buildGenerated(id.slice(4), day) : KATAS.find((x) => x.id === id);
}
