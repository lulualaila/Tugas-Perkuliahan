const readline = require("readline");

function permutasi(arr) {
  if (arr.length <= 1) return [arr];
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    let currentNum = arr[i];
    let remainingNums = arr.slice(0, i).concat(arr.slice(i + 1));
    let remainingNumsPermuted = permutasi(remainingNums);
    for (let p of remainingNumsPermuted) {
      result.push([currentNum].concat(p));
    }
  }
  return result;
}

function kombinasiOperator(ops, k) {
  if (k === 1) return ops.map((op) => [op]);
  let result = [];
  for (let i = 0; i < ops.length; i++) {
    let currentOp = ops[i];
    let remainingCombos = kombinasiOperator(ops, k - 1);
    for (let combo of remainingCombos) {
      result.push([currentOp].concat(combo));
    }
  }
  return result;
}

function evaluasiEkspresi(a, b, c, d, ops) {
  let hasil = [];

  // ((a op1 b) op2 c) op3 d
  hasil.push(`((${a}${ops[0]}${b})${ops[1]}${c})${ops[2]}${d}`);
  // (a op1 (b op2 c)) op3 d
  hasil.push(`(${a}${ops[0]}(${b}${ops[1]}${c}))${ops[2]}${d}`);
  // (a op1 b) op2 (c op3 d)
  hasil.push(`(${a}${ops[0]}${b})${ops[1]}(${c}${ops[2]}${d})`);
  // a op1 ((b op2 c) op3 d)
  hasil.push(`${a}${ops[0]}((${b}${ops[1]}${c})${ops[2]}${d})`);
  // a op1 (b op2 (c op3 d))
  hasil.push(`${a}${ops[0]}(${b}${ops[1]}(${c}${ops[2]}${d}))`);

  return hasil;
}

function solver(angka, hasil) {
  const operators = ["+", "-", "*", "/"];
  const permutations = permutasi(angka);
  const operatorCombinations = kombinasiOperator(operators, 3);

  for (let perm of permutations) {
    for (let ops of operatorCombinations) {
      let [a, b, c, d] = perm;
      let expressions = evaluasiEkspresi(a, b, c, d, ops);

      for (let expr of expressions) {
        try {
          if (Math.abs(eval(expr) - 20) < 0.01) {
            hasil.add(expr);
          }
        } catch (e) {
        }
      }
    }
  }
}

function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    "Masukkan 4 angka dipisah dengan spasi (misal: 1 3 4 6): ",
    (input) => {
      const masukan = input.split(" ").map(Number);

      if (masukan.length !== 4 || masukan.some(isNaN)) {
        console.log("Input tidak valid. Harap masukkan 4 angka.");
      } else {
        const hasil = new Set();
        solver(masukan, hasil);

        if (hasil.size === 0) {
          console.log("Tidak ada solusi");
        } else {
          console.log(
            `Ada ${hasil.size} solusi:\n` + Array.from(hasil).join("\n")
          );
        }
      }

      rl.close();
    }
  );
}

main(); 
