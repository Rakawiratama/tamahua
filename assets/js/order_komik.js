import { getCart, purchaseComic, removeFromCart, isPremiumFullMember } from './membership.js';
import { manhuaData } from './catalog.js';

// Fungsi bantuan untuk memformat angka menjadi format Rupiah (contoh: 100000 -> Rp 100.000,-)
const formatRupiah = (angka) => {
    return `Rp ${angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")},-`;
};

// ---------------------------------------------------------------------
// --- FUNGSI: PENANGANAN PEMBELIAN KOMIK SATUAN ---
// ---------------------------------------------------------------------

/**
 * Menampilkan formulir konfirmasi pembelian akses individual untuk satu komik.
 */
const handleIndividualPurchase = (comic) => {
    const optionsContainer = document.getElementById('options-container');
    const detailDisplay = document.getElementById('comic-detail-display');
    
    // Mengganti konten dengan formulir pembelian dan detail komik
    optionsContainer.innerHTML = `
        <h3 class="text-center summary-title" style="margin-top: 20px;">Konfirmasi Pembelian Akses Individual</h3>
        <form id="individual-purchase-form" class="order-form-container" style="max-width: 500px;">
            <label for="nama_lengkap">Nama Lengkap:</label>
            <input type="text" id="nama_lengkap" value="Contoh Nama" required>

            <label for="email_order">Email Akun:</label>
            <input type="email" id="email_order" value="contoh@mail.com" required>

            <div class="order-summary">
                <p>Judul: <strong>${comic.title}</strong></p>
                <p class="price-info">Harga: <span>${formatRupiah(comic.price)}</span></p>
            </div>

            <p class="order-disclaimer text-center">
                Kamu akan mendapatkan akses penuh dan permanen hanya untuk komik ini.
            </p>

            <button type="submit" id="complete-order-btn" class="btn btn-primary glow-on-hover btn-full-width">
                Konfirmasi Pembayaran ${formatRupiah(comic.price)}
            </button>
            
            <p id="purchase-message" class="message-container success-message" style="display: none;">
                <h3 class="success-title">🎉 Pembelian Komik Berhasil!</h3>
                <p>Akses ke komik <strong>${comic.title}</strong> kini aktif. 
                <a href="detail_komik.html?id=${comic.id}" class="btn btn-secondary">Mulai Baca Sekarang</a>.</p>
            </p>
        </form>
        <button id="back-to-options" class="btn btn-secondary" style="margin-top: 20px;">← Kembali ke Pilihan Opsi</button>
    `;
    detailDisplay.innerHTML = ''; // Sembunyikan ringkasan komik

    // --- LOGIKA SUBMIT FORM PEMBELIAN ---
    document.getElementById('individual-purchase-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        purchaseComic(comic.id); // Beri akses ke komik
        removeFromCart(comic.id); // Kosongkan keranjang
        
        // Sembunyikan form dan tampilkan pesan sukses
        optionsContainer.querySelector('#complete-order-btn').style.display = 'none';
        optionsContainer.querySelector('.order-summary').style.display = 'none';
        optionsContainer.querySelector('#individual-purchase-form').querySelectorAll('label, input').forEach(el => el.style.display = 'none');
        
        optionsContainer.querySelector('#purchase-message').style.display = 'block';
        optionsContainer.querySelector('#back-to-options').style.display = 'none';

        alert(`Pembelian ${comic.title} sukses! Kamu kini bisa membacanya.`);
    });
    
    // Menambahkan event untuk tombol 'Kembali ke Pilihan Opsi'
    document.getElementById('back-to-options').addEventListener('click', renderCheckoutOptions);
};

// ---------------------------------------------------------------------
// --- FUNGSI: MENAMPILKAN PILIHAN PEMBELIAN ---
// ---------------------------------------------------------------------

/**
 * Menampilkan ringkasan komik di keranjang dan opsi checkout: Individual atau Premium Penuh.
 */
const renderCheckoutOptions = () => {
    const optionsContainer = document.getElementById('options-container');
    const loadingMessage = document.getElementById('loading-message');
    const detailDisplay = document.getElementById('comic-detail-display');
    
    if (!optionsContainer || !loadingMessage || !detailDisplay) return;
    loadingMessage.style.display = 'none';

    // Jika pengguna sudah memiliki Premium Penuh, pembelian tidak diperlukan
    if (isPremiumFullMember()) {
        optionsContainer.innerHTML = `
            <h3 class="success-title text-center">✅ Kamu sudah memiliki Membership Premium Penuh!</h3>
            <p class="text-center">Pembelian individual tidak diperlukan karena kamu sudah memiliki akses ke semua komik premium.</p>
            <a href="katalog.html" class="btn btn-secondary btn-full-width">Kembali ke Katalog</a>
        `;
        detailDisplay.style.display = 'none';
        return;
    }

    // Jika keranjang kosong, tampilkan pesan error
    const cart = getCart();
    if (cart.length === 0) {
        optionsContainer.innerHTML = `
            <h3 class="success-title text-center is-standard">Keranjang Kosong</h3>
            <p class="text-center">Silakan pilih komik premium yang ingin dibeli di Katalog.</p>
            <a href="katalog.html" class="btn btn-secondary btn-full-width">Kembali ke Katalog</a>
        `;
        detailDisplay.style.display = 'none';
        return;
    }

    const comicId = cart[0];
    const comic = manhuaData.find(c => c.id === comicId);
    
    // Periksa validitas komik (harus ada dan bertipe premium)
    if (!comic || !comic.isPremium) {
        optionsContainer.innerHTML = `
            <h3 class="success-title text-center is-standard">Komik Tidak Valid atau Bukan Premium</h3>
            <a href="katalog.html" class="btn btn-secondary btn-full-width">Kembali ke Katalog</a>
        `;
        removeFromCart(comicId);
        detailDisplay.style.display = 'none';
        return;
    }

    // --- TAMPILKAN RINGKASAN KOMIK ---
    detailDisplay.innerHTML = `
        <h3 class="summary-title" style="color: var(--color-accent-primary);">Komik di Keranjang Anda:</h3>
        <div style="display: inline-block; background: var(--color-bg-secondary); padding: 15px; border-radius: 8px; border: 1px solid var(--color-border); margin-top: 10px;">
            <p style="color: var(--color-text-primary); font-weight: 600; font-size: 1.1em;">${comic.title}</p>
            <p style="color: var(--color-accent-primary); font-weight: 700;">${formatRupiah(comic.price)}</p>
        </div>
    `;

    // --- TAMPILKAN PILIHAN CHECKOUT ---
    optionsContainer.innerHTML = `
        <div style="display: flex; gap: 30px; justify-content: center; margin-top: 30px; flex-wrap: wrap;">
            
            <div class="order-card" style="background: var(--color-bg-secondary); padding: 30px; border-radius: 8px; max-width: 300px; text-align: center; border: 2px solid var(--color-border);">
                <h3 style="color: var(--color-accent-primary);">Opsi A: Akses Individual</h3>
                <p style="color: var(--color-text-secondary); margin-bottom: 20px;">Beli akses hanya untuk komik <strong>${comic.title}</strong> saja.</p>
                <p style="font-size: 1.5em; font-weight: 700; color: var(--color-accent-primary);">${formatRupiah(comic.price)}</p>
                <button id="select-individual" class="btn btn-primary btn-full-width" style="margin-top: 20px;">
                    Pilih & Lanjutkan Pembayaran
                </button>
            </div>

            <div class="order-card" style="background: var(--color-bg-secondary); padding: 30px; border-radius: 8px; max-width: 300px; text-align: center; border: 2px solid var(--color-accent-secondary);">
                <h3 style="color: var(--color-accent-secondary);">Opsi B: Membership Premium Penuh</h3>
                <p style="color: var(--color-text-secondary); margin-bottom: 20px;">
                    Akses semua komik premium di katalog tanpa batas!
                </p>
                <p style="font-size: 1.5em; font-weight: 700; color: var(--color-accent-secondary);">Rp 100.000,-</p>
                <a href="order_membership.html" class="btn btn-secondary btn-full-width" style="margin-top: 20px; border-color: var(--color-accent-secondary); color: var(--color-accent-secondary);">
                    Pilih & Aktivasi Premium
                </a>
            </div>

        </div>
    `;

    // Menghubungkan tombol "Akses Individual" ke fungsi penanganan pembelian
    document.getElementById('select-individual').addEventListener('click', () => {
        handleIndividualPurchase(comic);
    });
};

// --- INISIALISASI ---
// Jalankan fungsi utama saat halaman selesai dimuat.
document.addEventListener('DOMContentLoaded', renderCheckoutOptions);