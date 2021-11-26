const charAmountRange = document.getElementById("charAmRange");
const charAmountNumber = document.getElementById("charAmNumber");
const form = document.getElementById("formPassGen");
const includeUppercaseEl = document.getElementById("incUpper");
const includeNumbersEl = document.getElementById("incNumber");
const includeSymbolsEl = document.getElementById("incSymbols");
const displayPass = document.getElementById("passwordDisplay");

const stringAt = (low, high) => {
	const array = [];
	for (let i = low; i <= high; i++) {
		array.push(i);
	}
	return array;
};

const UPPERCASE_CHAR_CODES = stringAt(65, 90);
const LOWERCASE_CHAR_CODES = stringAt(97, 122);
const NUMBER_CHAR_CODES = stringAt(48, 57);
const SYMBOL_CHAR_CODES = stringAt(33, 47)
	.concat(stringAt(58, 64))
	.concat(stringAt(91, 96))
	.concat(stringAt(123, 126));

const syncCharAmount = (e) => {
	const { value } = e.target;
	charAmountNumber.value = value;
	charAmountRange.value = value;
};

const generatePassword = (
	charAmount,
	includeUppercase,
	includeNumbers,
	includeSymbols
) => {
	let charCodes = LOWERCASE_CHAR_CODES;
	if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
	if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES);
	if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES);
	const passwordChar = [];
	for (let i = 0; i < charAmount; i++) {
		const charCode = charCodes[Math.floor(Math.random() * charCodes.length)];
		passwordChar.push(String.fromCharCode(charCode));
	}
	return passwordChar.join("");
};

charAmountNumber.addEventListener("input", syncCharAmount);
charAmountRange.addEventListener("input", syncCharAmount);
form.addEventListener("submit", (e) => {
	e.preventDefault();
	const charAmount = charAmountNumber.value;
	const includeUppercase = includeUppercaseEl.checked;
	const includeNumbers = includeNumbersEl.checked;
	const includeSymbols = includeSymbolsEl.checked;
	const password = generatePassword(
		charAmount,
		includeUppercase,
		includeNumbers,
		includeSymbols
	);
	displayPass.innerText = password;
});
