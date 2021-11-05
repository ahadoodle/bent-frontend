export const truncateMiddle = function (fullStr: string, strLen: number, separator: string) {
	if (!fullStr || fullStr.length <= strLen) return fullStr;

	separator = separator || '...';

	var sepLen = separator.length,
		charsToShow = strLen - sepLen,
		frontChars = Math.ceil(charsToShow / 2),
		backChars = Math.floor(charsToShow / 2);

	return fullStr.substr(0, frontChars) + separator + fullStr.substr(fullStr.length - backChars);
};

export const formatAddress = (address: string, length: number = 15) => {
	return truncateMiddle(address, length, '.....');
}
