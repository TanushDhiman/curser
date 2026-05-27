export function headingCheck(str) {
    return /^(\*)(\*)(.*)\*$/.test(str)
}




export function replaceHeading(str) {
    return str.replace(/^(\*)(\*)|(\*)$/g,'')
}