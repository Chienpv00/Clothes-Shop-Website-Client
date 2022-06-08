function formatMoney(price) {
    // console.log(price.toString())
    const arr = [...price.toString()]

    let str = ''
    if (arr.length % 3 === 1) str += arr.shift() + ' '
    else if (arr.length % 3 === 2) str += arr.shift() + arr.shift() + ' '

    for (const index in arr) {
        if (index % 3 === 0) str += ' '
        str += arr[index]
    }
    return str
}

export default formatMoney
