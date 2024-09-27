def bisaTambahKoin(totalTerkumpul, koin, totalUang):
    return (totalTerkumpul + koin) <= totalUang

def tukarUang(daftarKoin, totalUang):
    koinTerpakai = []
    jumlahTiapKoin = {koin: 0 for koin in daftarKoin}
    totalTerkumpul = 0
    
    daftarKoin.sort(reverse=True)
    
    while totalTerkumpul != totalUang:
        for koin in daftarKoin:
            while bisaTambahKoin(totalTerkumpul, koin, totalUang): 
                totalTerkumpul += koin
                koinTerpakai.append(koin) 
                jumlahTiapKoin[koin] += 1
    
    return koinTerpakai, jumlahTiapKoin

if __name__ == "__main__":

    print("="*40)
    print(f"{'PROGRAM TUKAR UANG':^40}")
    print("="*40)
    
    totalUang = int(input("Masukkan jumlah uang yang ingin ditukar: "))
    daftarKoin = [10, 5, 2, 1] 

    daftarKoinTerpakai, jumlahTiapKoin = tukarUang(daftarKoin, totalUang)
    
    print(f"Uang Yang Ditukar : {totalUang}")
    print(f"Himpunan Koin     : {daftarKoin}")
    print(f"Solusi            : {daftarKoinTerpakai}")
    print("="*40)
    print("Jumlah setiap koin yang dipakai:")
    for koin, jumlah in jumlahTiapKoin.items():
        print(f"Koin {koin:<3}: {jumlah} buah")
    print("="*40)

