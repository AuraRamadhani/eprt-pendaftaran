# Pendaftaran EPRT (GitHub Pages + QRIS)

Situs statis: isi data → bayar QRIS → unggah bukti → data masuk Google Sheets.

## Isi repo
```
index.html   ← halaman pendaftaran
qris.png     ← gambar QRIS Anda (tambahkan sendiri)
Code.gs      ← kode untuk Google Apps Script (tidak wajib di-upload ke repo)
```

## 1. Atur konfigurasi
Buka `index.html`, cari blok `CONFIG` di bagian bawah, lalu ganti:
- `penyelenggara`, `namaPenerimaQRIS`, `harga`, `nomorWAPanitia`
- `minHariKedepan` → tanggal paling cepat yang boleh dipilih di kalender (1 = mulai besok, 0 = hari ini)
- `gambarQRIS` → nama file QRIS Anda (default `qris.png`)

Tip: pakai gambar QRIS asli hasil unduhan dari aplikasi merchant (bukan foto layar miring) supaya mudah di-scan. Kalau QRIS Anda statis, peserta perlu mengetik nominal sendiri — nominal sudah ditampilkan jelas di halaman.

## 2. Hosting di GitHub Pages
1. Buat repo baru di GitHub (Public), mis. `eprt-daftar`.
2. **Add file → Upload files** → unggah `index.html` dan `qris.png` → Commit.
3. **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main` / `(root)` → Save.
4. Tunggu 1–2 menit. Situs aktif di `https://USERNAME.github.io/eprt-daftar/`.

## 3. Menyambungkan ke Google Sheets (agar data & bukti tersimpan)
GitHub Pages tidak punya server, jadi data dikirim ke Google Apps Script.
1. Buat Google Sheet baru → **Ekstensi → Apps Script**.
2. Hapus isi editor, tempel isi `Code.gs`.
3. Buat folder di Google Drive untuk bukti bayar, buka foldernya, salin ID dari URL
   (`drive.google.com/drive/folders/`**`INI_ID_NYA`**) → tempel ke `FOLDER_ID`.
4. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Izinkan akses, salin **Web app URL** → tempel ke `urlAppsScript` di `index.html` → commit ulang.

Kalau `urlAppsScript` dikosongkan, situs tetap jalan: peserta diarahkan ke WhatsApp panitia dan melampirkan bukti di chat.

## Verifikasi
Cek tab **Pendaftar** di Sheet. Kolom *Bukti Bayar* berisi link gambar; ubah kolom *Status* menjadi "Lunas" setelah dicek dengan mutasi QRIS Anda.

## Catatan
- Halaman mencantumkan bahwa ini dikelola penyelenggara, bukan situs resmi Telkom University, dan menampilkan nama penerima QRIS — jangan dihapus, supaya peserta tahu ke siapa mereka membayar.
- Repo publik berarti `qris.png` bisa dilihat siapa saja; itu wajar untuk QRIS penerimaan, tetapi jangan simpan data peserta di repo.
