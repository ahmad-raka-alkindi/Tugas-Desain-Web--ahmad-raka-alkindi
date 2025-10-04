// Registrasi Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Daftarkan service-worker.js yang telah dibuat sebelumnya
        navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// Menangani event beforeinstallprompt (Untuk fitur Installable)
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    // Mencegah prompt default muncul
    e.preventDefault();
    // Simpan event sehingga dapat dipicu nanti
    deferredPrompt = e;
    // Di sini Anda bisa menambahkan kode untuk menampilkan tombol "Install"
    console.log('beforeinstallprompt fired, show your install button now.');
});