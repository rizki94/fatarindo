export const beforeTax = (tax, val) => {
    return ((100/(100 + parseFloat(tax))) * parseFloat(val));
}

export const afterTax = (tax, val) => {
    return parseFloat(val)+(parseFloat(val) * parseFloat(tax) / 100);
}