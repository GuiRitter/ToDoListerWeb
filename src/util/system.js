export const buildConstantEntity = (code, description) => ({ code, description });

export const buildArray = size => Array.from(Array(size), (x,i) => i);

export const filledOrZero = value => (!!value) || (value === 0);
