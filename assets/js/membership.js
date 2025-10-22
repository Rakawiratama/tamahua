const MEMBER_FULL_KEY = 'tamahua_premium_full';
const PURCHASED_COMICS_KEY = 'tamahua_purchased_comics';
const CART_KEY = 'tamahua_cart';

// ---------------------------------------------------------------------
// --- GERBANG AKSES & KEANGGOTAAN ---
// ---------------------------------------------------------------------

/**
 * Memeriksa status keanggotaan premium penuh (Akses Tak Terbatas).
 */
export function isPremiumFullMember() {
    return localStorage.getItem(MEMBER_FULL_KEY) === 'true';
}

/**
 * Mengambil daftar ID komik yang telah dibeli (Akses Individual).
 */
export function getPurchasedComics() {
    const data = localStorage.getItem(PURCHASED_COMICS_KEY);
    // Mengembalikan array komik yang dibeli, atau array kosong jika belum ada
    return data ? JSON.parse(data) : [];
}

/**
 * Menambahkan komik ke daftar yang sudah dibeli (Akses Individual).
 */
export function purchaseComic(comicId) {
    const purchased = getPurchasedComics();
    if (!purchased.includes(comicId)) {
        purchased.push(comicId);
        localStorage.setItem(PURCHASED_COMICS_KEY, JSON.stringify(purchased));
    }
}

// ---------------------------------------------------------------------
// --- GERBANG PEMBELIAN KOMIK SATUAN (Keranjang) ---
// ---------------------------------------------------------------------

/**
 * Mengambil isi keranjang belanja.
 */
export function getCart() {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
}

/**
 * Menambahkan komik ke keranjang belanja.
 * Catatan: Implementasi saat ini hanya mengizinkan SATU komik dalam keranjang (menimpa yang lama).
 */
export function addToCart(comicId) {
    const cart = [comicId]; // Hanya menampung 1 komik
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    return true;
}

/**
 * Menghapus komik dari keranjang.
 */
export function removeFromCart(comicId) {
    let cart = getCart();
    cart = cart.filter(id => id !== comicId);
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// ---------------------------------------------------------------------
// --- FUNGSI INTERNAL ---
// ---------------------------------------------------------------------

/**
 * Menonaktifkan status Membership Penuh (Menghapus key dari Local Storage).
 */
function disableFullMembership() {
    localStorage.removeItem(MEMBER_FULL_KEY);
}

// ---------------------------------------------------------------------
// --- LOGIKA UTAMA: Berjalan Saat Halaman Selesai Dimuat ---
// ---------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // Ambil elemen-elemen DOM yang dibutuhkan
    const statusText = document.getElementById('member-status');
    const controlArea = document.getElementById('membership-control-area');
    const orderForm = document.getElementById('order-form');
    const kelolaContainer = document.getElementById('kelola-container');

    /**
     * Memperbarui tampilan antarmuka di halaman utama dan katalog.
     */
    const updateUI = () => {
        const isFullMember = isPremiumFullMember();

        // --- TAMPILAN DI HALAMAN UTAMA (INDEX.HTML) ---
        if (statusText) {
            statusText.textContent = isFullMember
                ? '🌕 Membership Premium Aktif — Semua Komik Kini Dapat Diakses!'
                : '⚙️ Status: Standar / Akses Komik Tertentu. Tingkatkan untuk Membuka Semua Konten!';
            statusText.classList.toggle('is-premium', isFullMember);
            statusText.classList.toggle('is-standard', !isFullMember);
        }

        if (controlArea) {
            // Mengganti tombol berdasarkan status keanggotaan
            if (isFullMember) {
                // Tampilan untuk pengguna Premium
                controlArea.innerHTML = `
                    <a id="manage-membership" href="kelola_membership.html" class="btn btn-secondary">
                        ⚙️ Kelola Membership Premium
                    </a>
                `;
            } else {
                // Tampilan untuk pengguna Standar
                controlArea.innerHTML = `
                    <a id="activate-membership" href="order_membership.html" class="btn btn-secondary glow-on-hover btn-full-access">
                        💎 Aktivasi Premium Penuh (Rp 100.000)
                    </a>
                    <a id="buy-individual-link" href="katalog.html" class="btn btn-secondary btn-individual">
                        📖 Pembelian Akses Individual Komik
                    </a>
                `;
            }
        }

        // --- STATUS DI HALAMAN KATALOG ---
        const katalogStatus = document.getElementById('katalog-member-status');
        if (katalogStatus) {
            const purchasedCount = getPurchasedComics().length;
            let status = 'Standar';
            
            // Menentukan status yang ditampilkan di Katalog
            if (isFullMember) { status = 'Premium Penuh'; }
            else if (purchasedCount > 0) { status = `Akses Individual (${purchasedCount} Komik)`; }

            katalogStatus.textContent = status;
            katalogStatus.classList.toggle('is-premium', isFullMember || purchasedCount > 0);
            katalogStatus.classList.toggle('is-standard', !isFullMember && purchasedCount === 0);
        }
    };

    // ---------------------------------------------------------------------
    // --- LOGIKA HALAMAN PEMBELIAN PREMIUM PENUH (ORDER_MEMBERSHIP.HTML) ---
    // ---------------------------------------------------------------------
    if (orderForm && orderForm.classList.contains('full-order')) {
        const orderMessage = document.getElementById('order-message');
        if (orderMessage) orderMessage.style.display = 'none';

        // Jika sudah premium, tampilkan pesan sudah aktif
        if (isPremiumFullMember()) {
            orderForm.innerHTML = `
                <h3 class="success-title text-center">✅ Membership Premium Sudah Aktif!</h3>
                <a href="kelola_membership.html" class="btn btn-secondary btn-full-width">
                    Kelola Membership
                </a>
            `;
            return;
        }

        // Penanganan pengiriman form untuk aktivasi premium
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            localStorage.setItem(MEMBER_FULL_KEY, 'true'); // Aktifkan premium

            // Sembunyikan form dan tampilkan pesan sukses
            const completeBtn = orderForm.querySelector('#complete-order-btn');
            if (completeBtn) completeBtn.style.display = 'none';
            const summary = orderForm.querySelector('.order-summary');
            if (summary) summary.style.display = 'none';
            if (orderMessage) orderMessage.style.display = 'block';

            alert('✅ Membership Premium Aktif! Sekarang kamu bisa membaca semua komik tanpa batas.');
            updateUI();
        });
    }

    // ---------------------------------------------------------------------
    // --- LOGIKA HALAMAN KELOLA MEMBERSHIP (KELOLA_MEMBERSHIP.HTML) ---
    // ---------------------------------------------------------------------
    if (kelolaContainer) {
        // Jika belum premium, arahkan untuk aktivasi
        if (!isPremiumFullMember()) {
            kelolaContainer.innerHTML = `
                <h3 class="success-title text-center is-standard">
                    ⚙️ Kamu belum memiliki Membership Premium.
                </h3>
                <a href="order_membership.html" class="btn btn-primary btn-full-width">
                    Aktivasi Sekarang
                </a>
            `;
            return;
        }

        // Tampilan untuk pengguna premium
        kelolaContainer.innerHTML = `
            <h3 class="summary-title text-center">
                Status: <span class="is-premium">PREMIUM AKTIF</span>
            </h3>
            <p class="order-disclaimer text-center">
                Kamu memiliki akses penuh ke semua komik tanpa batas.
            </p>
            <button id="disable-btn" class="btn btn-primary glow-on-hover btn-full-width">
                ❌ Batalkan Membership Penuh (Nonaktifkan)
            </button>
            <div id="disable-message" class="message-container disable-message-style" style="display: none;">
                <h3 class="success-title is-standard">❌ Membership Penuh Berhasil Dinonaktifkan.</h3>
                <p>Kamu dapat mengaktifkannya kembali kapan pun.</p>
                <a href="index.html" class="btn btn-secondary">🏠 Kembali ke Beranda</a>
            </div>
        `;

        const disableBtn = document.getElementById('disable-btn');
        const disableMessage = document.getElementById('disable-message');

        if (disableBtn) {
            // Penanganan tombol nonaktifkan membership
            disableBtn.addEventListener('click', () => {
                const confirmation = confirm("Apakah kamu yakin ingin menonaktifkan Membership Premium?");
                if (confirmation) {
                    disableFullMembership(); // Panggil fungsi nonaktif
                    disableBtn.style.display = 'none';
                    disableMessage.style.display = 'block';
                    alert('❌ Membership Premium telah dinonaktifkan.');
                    updateUI();
                }
            });
        }
    }

    // Panggil updateUI untuk inisialisasi tampilan awal
    updateUI();
});