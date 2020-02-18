var p1 = new Promise((resolve, reject) => {
    console.log("1 start");
    setTimeout(() => {
        console.log("1 on");
        resolve("1oo");
    }, 1000);
});
var p2 = new Promise((resolve, reject) => {
    console.log("2 start");
    setTimeout(() => {
        console.log("2 on");
        resolve("2oo");
    }, 5000);
});
var p3 = new Promise((resolve, reject) => {
    console.log("3 start");
    setTimeout(() => {
        console.log("3 on");
        reject("3oo");
    }, 10000);
});
try {
    Promise.all([p1, p2, p3]).then((values) => {
        console.log(values); // [3, 1337, "foo"]
    });
} catch (error) {
    console.error(error);
}
