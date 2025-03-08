const utils = {
    isValidString(value) {
        return typeof value !== "string" || value.trim().length === 0
    }

    
}

export default utils;