
console.log("Hello");
1;

console.log($$);

$$.html("<div style='background-color:olive;width:50px;height:50px'></div>");

$$.svg("<svg><rect width=80 height=80 style='fill: orange;'/></svg>");



$$.png(require("fs").readFileSync("image.png").toString("base64"));


