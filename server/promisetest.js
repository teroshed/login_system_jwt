



console.log("START");

let promise = new Promise((resolve) => {
    setTimeout(() => {
        console.log("END");
        resolve();
    }, 2000);
});

module.exports = promise;