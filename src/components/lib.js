import $ from 'jquery';

function getIndexGraduation(number) {
    const ost10 = number % 10;
    const ost100 = number % 100;
    let grad = 0;

    if (ost10 === 1 && (ost100 > 20 || number === 1)) {
        grad = 0;
    }

    if (ost10 >= 2 && ost10 <= 4) {
        grad = 1;
    }

    if (ost10 >= 5 && ost10 <= 9 || ost10 === 0 || (ost100 >= 11 && ost100 <= 20)) {
        grad = 2;
    }

    return grad;
}

export { getIndexGraduation }
