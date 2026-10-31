export function extractPriceAsNumber(priceText: string): number {
  const normalized = priceText.trim().replace(/[^\d,.-]/g, '');

  if (!normalized || !/^-?[\d.,]+$/.test(normalized)) {
    throw new Error(`Invalid price text: "${priceText}".`);
  }

  const lastComma = normalized.lastIndexOf(',');
  const lastPeriod = normalized.lastIndexOf('.');
  let numericText = normalized;

  if (lastComma !== -1 && lastPeriod !== -1) {
    const decimalSeparator = lastComma > lastPeriod ? ',' : '.';
    const groupingSeparator = decimalSeparator === ',' ? '.' : ',';
    numericText = normalized
      .split(groupingSeparator)
      .join('')
      .replace(decimalSeparator, '.');
  } else {
    const separator = lastComma !== -1 ? ',' : lastPeriod !== -1 ? '.' : null;

    if (separator) {
      const separatorCount = normalized.split(separator).length - 1;
      const decimalDigits = normalized.length - normalized.lastIndexOf(separator) - 1;
      const isGrouping = separatorCount > 1 || decimalDigits === 3;

      numericText = isGrouping
        ? normalized.split(separator).join('')
        : normalized.replace(separator, '.');
    }
  }

  const price = Number(numericText);
  if (!Number.isFinite(price)) {
    throw new Error(`Invalid price text: "${priceText}".`);
  }

  return price;
}
