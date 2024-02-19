export function CheckFormEmptyValues(form, exclude = []) {
    for (const key in form) {
        if (form.hasOwnProperty(key) && !form[key] && !exclude.includes(key)) {
            return true
        }
    }

    return false
}