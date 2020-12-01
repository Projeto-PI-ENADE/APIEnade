
function overwriteArray<T>(vec: Array<T>, another: Array<T>, start: number): Array<T> {
    for (let i = 0; i < another.length; i++) {
        vec[i] = another[i + start]
    }
    return vec
}
export default overwriteArray