// import { bgYellow, bold, red, } from "https://deno.land/std@0.152.0/fmt/colors.ts";
// import { bgYellow, bold, red, } from "./deps.ts"
// import * as mod from "https://deno.land/std@0.152.0/fmt/colors.ts";
// console.log(red(bgYellow(bold("holissss"))));

import { bgBlue, red, bold, bgYellow } from "https://deno.land/std@0.152.0/fmt/colors.ts";

console.log(bgBlue(red(bold("Hello world!"))));
console.log(bgYellow(red(bold("Hello universe!"))));