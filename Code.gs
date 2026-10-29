/**
 * Google Apps Script — penerima data pendaftaran EPRT
 * Menyimpan data ke Google Sheet dan bukti bayar ke folder Google Drive.
 *
 * Cara pakai: lihat README.md bagian "Menyambungkan ke Google Sheets".
 */

const FOLDER_ID = "TEMPEL_ID_FOLDER_DRIVE_DI_SINI"; // folder untuk menyimpan bukti bayar
const SHEET_NAME = "Pendaftar";

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);

    // Simpan bukti bayar ke Drive
    const match = String(d.bukti || "").match(/^data:(image\/[\w+.-]+);base64,(.+)$/);
    if (!match) throw new Error("Bukti bayar tidak valid");
    const blob = Utilities.newBlob(
      Utilities.base64Decode(match[2]),
      match[1],
      d.kode + "_" + String(d.nim).replace(/\D/g, "") + "_" + (d.buktiNama || "bukti.jpg")
    );
    const file = DriveApp.getFolderById(FOLDER_ID).createFile(blob);

    // Simpan baris ke Sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sh = ss.getSheetByName(SHEET_NAME);
    if (!sh) {
      sh = ss.insertSheet(SHEET_NAME);
      sh.appendRow(["Waktu", "Kode", "Nama", "NIM", "Prodi", "Email", "WhatsApp", "Tanggal Tes", "Nominal", "Bukti Bayar", "Status"]);
      sh.setFrozenRows(1);
    }
    sh.appendRow([
      new Date(), d.kode, d.nama, "'" + d.nim, d.prodi, d.email, "'" + d.wa,
      d.sesi, d.nominal, file.getUrl(), "Menunggu verifikasi"
    ]);

    return json({ ok: true, kode: d.kode });
  } catch (err) {
    return json({ ok: false, error: err.message });
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
