function penyelesai(angka, hasil) {
  if (angka.length === 1 && angka[0].first === 24) {
    hasil.push(angka[0].second);
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

      // +
      angkaBaru.push({
        first: angka[i].first + angka[j].first,
        second: `${angka[i].second}+${angka[j].second}`,
      });
      penyelesai(angkaBaru, hasil);
      angkaBaru.pop();

      // -
      angkaBaru.push({
        first: angka[i].first - angka[j].first,
        second: `${angka[i].second}-${angka[j].second}`,
      });
      penyelesai(angkaBaru, hasil);
      angkaBaru.pop();

      // *
      angkaBaru.push({
        first: angka[i].first * angka[j].first,
        second: `${angka[i].second}*${angka[j].second}`,
      });
      penyelesai(angkaBaru, hasil);
      angkaBaru.pop();

      // / (hindari pembagian dengan nol)
      if (angka[j].first !== 0) {
        angkaBaru.push({
          first: angka[i].first / angka[j].first,
          second: `${angka[i].second}/${angka[j].second}`,
        });
        penyelesai(angkaBaru, hasil);
        angkaBaru.pop();
      }

      // - (r - l)
      angkaBaru.push({
        first: angka[j].first - angka[i].first,
        second: `${angka[j].second}-${angka[i].second}`,
      });
      penyelesai(angkaBaru, hasil);
      angkaBaru.pop();

      // / (r / l) (hindari pembagian dengan nol)
      if (angka[i].first !== 0) {
        angkaBaru.push({
          first: angka[j].first / angka[i].first,
          second: `${angka[j].second}/${angka[i].second}`,
        });
        penyelesai(angkaBaru, hasil);
        angkaBaru.pop();
      }
    }
  }
}

function main() {
  const masukan = prompt("Silakan masukkan angka Anda (pisahkan dengan koma):")
    .split(",")
    .map(Number);
  const untukMenyelesaikan = masukan.map((angka) => ({
    first: angka,
    second: String(Math.floor(angka)),
  }));

  const hasil = [];
  penyelesai(untukMenyelesaikan, hasil);

  if (hasil.length === 0) {
    console.log("Tidak ada solusi");
  } else {
    console.log(`Ada ${hasil.length} solusi:`);
    hasil.forEach((solusi) => console.log(solusi));
  }
}
