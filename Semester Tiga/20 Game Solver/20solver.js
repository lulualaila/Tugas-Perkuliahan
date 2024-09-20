const readline = require("readline");

// Menggunakan readline untuk input dari terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Masukkan angka pertama: ", (angka1) => {
  rl.question("Masukkan angka kedua: ", (angka2) => {
    rl.question("Masukkan angka ketiga: ", (angka3) => {
      rl.question("Masukkan angka keempat: ", (angka4) => {
        main(angka1, angka2, angka3, angka4);
        rl.close();
      });
    });
  });
});

function main(angka1, angka2, angka3, angka4) {
  const masukan = [angka1, angka2, angka3, angka4].map(Number);
  const untukMenyelesaikan = masukan.map((angka) => ({
    first: angka,
    second: String(angka),
  }));

  const hasil = new Set();
  const seen = new Set();

  solver(untukMenyelesaikan, hasil, seen);

  if (hasil.size === 0) {
    console.log("Tidak ada solusi");
  } else {
    console.log(`Ada ${hasil.size} solusi:`);
    Array.from(hasil).forEach((solusi) => {
      console.log(solusi);
    });
  }
}

function solver(angka, hasil, seen) {
  if (angka.length === 1 && Math.abs(angka[0].first - 20) < 0.01) {
    hasil.add(angka[0].second); // Tambahkan solusi yang valid ke dalam set hasil
    return;
  }

  for (let i = 0; i < angka.length - 1; i++) {
    for (let j = i + 1; j < angka.length; j++) {
      let angkaBaru = [];
      for (let k = 0; k < angka.length; k++) {
        if (k !== i && k !== j) {
          angkaBaru.push(angka[k]);
        }
      }

      const operations = [
        {
          val: angka[i].first + angka[j].first,
          expr: `(${angka[i].second}+${angka[j].second})`,
        },
        {
          val: angka[i].first - angka[j].first,
          expr: `(${angka[i].second}-${angka[j].second})`,
        },
        {
          val: angka[i].first * angka[j].first,
          expr: `(${angka[i].second}*${angka[j].second})`,
        },
      ];

      if (angka[j].first !== 0) {
        operations.push({
          val: angka[i].first / angka[j].first,
          expr: `(${angka[i].second}/${angka[j].second})`,
        });
      }

      operations.push({
        val: angka[j].first - angka[i].first,
        expr: `(${angka[j].second}-${angka[i].second})`,
      });

      if (angka[i].first !== 0) {
        operations.push({
          val: angka[j].first / angka[i].first,
          expr: `(${angka[j].second}/${angka[i].second})`,
        });
      }

      for (const op of operations) {
        if (!seen.has(op.expr)) {
          seen.add(op.expr);
          angkaBaru.push({ first: op.val, second: op.expr });
          solver(angkaBaru, hasil, seen);
          angkaBaru.pop();
        }

         if (hasil.size === 0) {
        console.log("Tidak ada solusi");
              }
                 else {
                console.log(`Ada ${hasil.size} solusi:`);
                Array.from(hasil).forEach((solusi) => {
                  console.log(solusi);
            });
          }
        } 
      }
    }
  }
}
