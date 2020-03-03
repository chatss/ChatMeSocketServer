var p1 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("하나"), 1000);
});
var p2 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("둘"), 2000);
});
var p3 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("셋"), 3000);
});
var p4 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("넷"), 4000);
});
var p5 = new Promise((resolve, reject) => {
    reject(new Error("거부"));
});

// .catch 사용:
Promise.all([p1, p2, p3, p4, p5])
    .then((values) => {
        console.log(values);
    })
    .catch((error) => {
        console.log(error.message);
    });
console.log(1);
console.log(2);
console.log(3);
