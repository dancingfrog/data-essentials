const counter = document
    .getElementsByTagName('body')[0]
    .appendChild(document.createElement('div'));

export function countdown(initial, final = 0, interval = 1) {
    let i = 0;
    let current = initial;

    while (current > final) {
        const count = (function () {
            return current -= interval;
        }());
        setTimeout(function () {
            counter.innerHTML = `${count}`;
        }, 333 * i++);
    }
}
