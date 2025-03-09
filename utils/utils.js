export function isInValidString(value) {
    return typeof value !== "string" || value.trim().length === 0;
}

export function isInvalidFloat(value) {
    return typeof value !== "number" || value < 0 || isNaN(value);
}

export function isInvalidObject(value) {
    return typeof value !== "object" || value === null;
}

export function isInvalidInteger(value) {
    return typeof value !== "number" || value < 0 || !Number.isInteger(value)
}