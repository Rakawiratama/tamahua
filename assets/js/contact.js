// --- FORM KONTAK TAMAHUA ---
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const contactMessage = document.getElementById('contact-message');

    // Pastikan elemen form kontak ada
    if (contactForm) {
        contactMessage.style.display = 'none'; // Sembunyikan pesan sukses di awal

        // Ketika form dikirim
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Cegah reload halaman
            
            contactMessage.style.display = 'block'; // Tampilkan pesan sukses
            this.querySelector('.btn-full-width').style.display = 'none'; // Sembunyikan tombol kirim

            alert('Pesan Anda telah dikirim! Terima kasih.'); // Notifikasi sederhana
        });
    }
});
