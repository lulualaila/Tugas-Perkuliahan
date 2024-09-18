function solver(angka, hasil) {
  // Jika hanya satu angka yang tersisa dan mendekati 20 (dengan toleransi 0.01), tambahkan ke hasil
  if (angka.length === 1 && Math.abs(angka[0].first - 20) < 0.01) {
    hasil.push(angka[0].second);
    return;
  }

  // Lakukan iterasi untuk mencari kombinasi pasangan angka
  for (let i = 0; i < angka.length - 1; i++) {
    for (let j = i + 1; j < angka.length; j++) {
      let angkaBaru = [];
      // Salin angka yang bukan pasangan i, j ke array angkaBaru
      for (let k = 0; k < angka.length; k++) {
        if (k !== i && k !== j) {
          angkaBaru.push(angka[k]);
        }
      }

      // Operasi penjumlahan
      angkaBaru.push({
        first: angka[i].first + angka[j].first,
        second: `(${angka[i].second}+${angka[j].second})`,
      });
      solver(angkaBaru, hasil);
      angkaBaru.pop(); // Kembalikan array ke kondisi semula

      // Operasi pengurangan
      angkaBaru.push({
        first: angka[i].first - angka[j].first,
        second: `(${angka[i].second}-${angka[j].second})`,
      });
      solver(angkaBaru, hasil);
      angkaBaru.pop();

      // Operasi perkalian
      angkaBaru.push({
        first: angka[i].first * angka[j].first,
        second: `(${angka[i].second}*${angka[j].second})`,
      });
      solver(angkaBaru, hasil);
      angkaBaru.pop();

      // Operasi pembagian (hindari pembagian dengan nol)
      if (angka[j].first !== 0) {
        angkaBaru.push({
          first: angka[i].first / angka[j].first,
          second: `(${angka[i].second}/${angka[j].second})`,
        });
        solver(angkaBaru, hasil);
        angkaBaru.pop();
      }

      // Operasi pengurangan dengan urutan terbalik (r - l)
      angkaBaru.push({
        first: angka[j].first - angka[i].first,
        second: `(${angka[j].second}-${angka[i].second})`,
      });
      solver(angkaBaru, hasil);
      angkaBaru.pop();

      // Operasi pembagian dengan urutan terbalik (r / l) (hindari pembagian dengan nol)
      if (angka[i].first !== 0) {
        angkaBaru.push({
          first: angka[j].first / angka[i].first,
          second: `(${angka[j].second}/${angka[i].second})`,
        });
        solver(angkaBaru, hasil);
        angkaBaru.pop();
      }
    }
  }
}

function main() {
  // Ambil nilai input dari pengguna
  const angka1 = document.getElementById("angka1").value;
  const angka2 = document.getElementById("angka2").value;
  const angka3 = document.getElementById("angka3").value;
  const angka4 = document.getElementById("angka4").value;

  // Konversi nilai input ke angka dan masukkan ke dalam array
  const masukan = [angka1, angka2, angka3, angka4].map(Number);
  const untukMenyelesaikan = masukan.map((angka) => ({
    first: angka,
    second: String(angka),
  }));

  const hasil = [];
  // Panggil fungsi solver untuk mencari semua kemungkinan solusi
  solver(untukMenyelesaikan, hasil);

  // Tampilkan hasil solusi pada elemen <pre>
  const hasilOutput = document.getElementById("hasilOutput");
  if (hasil.length === 0) {
    hasilOutput.textContent = "Tidak ada solusi";
  } else {
    hasilOutput.textContent =
      `Ada ${hasil.length} solusi:\n` + hasil.join("\n");
  }
}
