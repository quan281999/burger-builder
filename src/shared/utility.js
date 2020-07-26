export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}

export const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.email) {
        const re = /^\w+([-]?\w+)+@\w+([:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/;
        return re.test(String(value).toLowerCase()) && isValid;
    }

    if (rules.numeric) {
        return !isNaN(value) && isValid;
    }

    return isValid;
}