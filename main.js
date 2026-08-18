document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("url-form");
  const originalUrlInput = document.getElementById("original-url");
  const customAliasInput = document.getElementById("custom-alias");
  const resultBox = document.getElementById("result-box");
  const maskedUrlInput = document.getElementById("masked-url");
  const btnCopy = document.getElementById("btn-copy");
  const copyStatus = document.getElementById("copy-status");

  // 1. PENANGANAN REDIRECT SAAT APLIKASI DIBUKA DENGAN LINK HASIL SAMARAN
  const hash = window.location.hash.substring(1);
  if (hash) {
    const savedUrl = localStorage.getItem(`url_${hash}`);
    if (savedUrl) {
      // Redirect otomatis ke URL asli jika hash ditemukan
      window.location.href = savedUrl;
      return;
    }
  }

  // 2. LOGIKA PEMBUATAN LINK SAMARAN
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const originalUrl = originalUrlInput.value.trim();
    let alias = customAliasInput.value.trim().toLowerCase().replace(/\s+/g, "-");

    if (!alias) {
      // Jika alias kosong, buat ID acak 6 karakter
      alias = Math.random().toString(36).substring(2, 8);
    }

    // Simpan ke LocalStorage browser
    localStorage.setItem(`url_${alias}`, originalUrl);

    // Format URL hasil penyamaran
    const baseUrl = window.location.href.split("#")[0];
    const generatedUrl = `${baseUrl}#${alias}`;

    // Tampilkan hasil
    maskedUrlInput.value = generatedUrl;
    resultBox.classList.remove("hidden");
    copyStatus.textContent = "";
  });

  // 3. FITUR SALIN LINK
  btnCopy.addEventListener("click", () => {
    maskedUrlInput.select();
    navigator.clipboard.writeText(maskedUrlInput.value).then(() => {
      copyStatus.textContent = "Link berhasil disalin ke clipboard!";
      setTimeout(() => {
        copyStatus.textContent = "";
      }, 3000);
    });
  });
});