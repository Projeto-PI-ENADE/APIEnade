
function overwriteArray<T>(vec: Array<T>, another: Array<T>, start: number): Array<T> {



    for (let i = 0; i < another.length; i++) {
        vec[i + start] = another[i]
    }

    for (let i = 0; i < vec.length; i++) {
        if (vec[i] === undefined) vec[i] = ' '
    }

    return vec
}
export default overwriteArray