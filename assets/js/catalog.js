import { isPremiumFullMember, getPurchasedComics, addToCart } from './membership.js'; 

// --- DATA KOMIK UTAMA (FINAL) ---
// Data ini berisi daftar lengkap semua komik yang tersedia
export const manhuaData = [
    // Komik gratis (bukan populer)
    { id: 1, title: "I’m an Evil God", genre: ["Fantasy", "Action"], isPremium: false, isPopular: false, cover: "assets/img/covers/cover1-im-an-evil-god.png", desc: "Di dunia ini ada dewa jahat dan paling tampan dalam sejarah! Pria tampan tak tertandingi Xie Yan menyeberang dan jatuh ke sarang vixen. Agar tidak kehabisan seluruh kekuatan hidupnya, ia melakukan perjalanan di berbagai kerajaan, membunuh anak dewa, dan mengusir persatuan Yang Yi … Ini adalah kisah bagaimana ia akhirnya menjadi dewa jahat." },

    { id: 2, title: "Xiu Tian Chuan", genre: ["Wuxia", "School"], isPremium: false, isPopular: false, cover: "assets/img/covers/cover2-xiu-tian-chuan.png", desc: "The Southern Chinese Scriptures, seorang pemuda yang langka dan tidak terluka, akan menjadi teman baik dunia, membuka jalan anti-agresi oleh pembanding yang menjalankan tekanan dan yang menolak untuk menerimanya. Untuk melindungi keluarga kita, untuk menyembah yang terkenal, untuk memanen yang muda, untuk membuat cantik, dan untuk membuat generasi Rahmat Tuhan!" },
    
    // Komik premium dan populer (tampil di halaman utama)
    { id: 3, title: "Magic Emperor", genre: ["Fantasy", "Action", "Adventure"], isPremium: true, isPopular: true, cover: "assets/img/covers/cover3-Magic-emperor.png", desc: "Zhuo Yifan adalah seorang kaisar sihir atau bisa di panggil kaisar iblis, karena dia mempunyai buku kaisar kuno yang di sebut buku sembilan rahasia dia menjadi sasaran semua ahli beradiri bahkan dia di khianati dan di bunuh oleh muridnya. Kemudian jiwanya masuk dan hidup kembali dalam seorang anak pelayan keluarga bernama Zhuo Fan.Karena suatu sihir iblis mengekangnya, dia harus menyatukan ingatan anak itu dan tidak bisa mengabaikan keluarga dan nona yang dia layaninya. Bagaimana kehidupan nya membangun kembali keluarganya dan kembali menjadi yang terkuat didaratan benua…", price: 10000 },
    
    { id: 4, title: "All Hail the Sect Leader", genre: ["Action", "Adventure", "Martial Arts", "Fantasy"], isPremium: true, isPopular: true, cover: "assets/img/covers/cover4-all-hail-the-sect-leader.png", desc: "Kepala sekte terakhir selalu tertawa, tetapi dia tidak pernah menyangka: Murid wanita dingin yang direkrut dengan santai menyembunyikan kengeriannya, dan murid pria yang menutup matanya di jalan untuk menyelamatkan sebenarnya adalah jenius pertama. Dia menendang bola ke kelahiran kembali Kaisar Wu menendang sekte itu untuk meragukan bahwa adik laki-laki yang melihat kesia-siaan dalam hidup adalah seorang jenius yang jatuh. Sekte ini semua mempesona … Tuhan ingin aku menentang langit, itu tidak bisa menghentikannya.", price: 10000 },
    
    { id: 5, title: "Martial Peak", genre: ["Action", "Adventure", "Martial Arts", "Fantasy"], isPremium: true, isPopular: true, cover: "assets/img/covers/cover5-Martial-Peak.png", desc: "Perjalanan ke puncak bela diri adalah yang sepi, soliter dan panjang. Dalam menghadapi kesulitan, Anda harus bertahan dan tetap pantang menyerah. Hanya dengan begitu Anda dapat menerobos dan dan melanjutkan perjalanan Anda untuk menjadi yang terkuat. Sky Tower menguji murid-muridnya dengan cara yang paling keras untuk mempersiapkan mereka untuk perjalanan ini. Suatu hari penyapu rendahan Yang Kai berhasil mendapatkan sebuah buku hitam, menempatkannya di jalan menuju puncak dunia persilatan", price: 10000 },
    
    // Komik gratis (bukan populer)
    { id: 6, title: "Tales of Demons and Gods", genre: ["Wuxia", "Action"], isPremium: false, isPopular: false, cover: "assets/img/covers/cover6-Tales-of-Demons-and-Gods.png", desc: "Di masa lalunya, meskipun terlalu lemah untuk melindungi rumahnya, berkat tekad yang kuat, Nie Li menjadi Spiritualis Iblis terkuat dan berdiri di puncak dunia persilatan. Namun, ia kehilangan nyawanya dalam pertempuran melawan Kaisar Sage dan enam binatang buas tingkat dewa. Jiwanya kemudian dibawa kembali ke saat ia masih berusia 13 tahun. Meskipun ia yang terlemah di kelasnya dengan bakat terendah, hanya memiliki alam jiwa merah dan alam jiwa yang lemah, dengan bantuan pengetahuan luas yang ia kumpulkan dari kehidupan sebelumnya, ia memutuskan untuk berlatih lebih cepat daripada yang bisa dialami siapa pun…" },
    
    // Premium dan populer
    { id: 7, title: "Apotheosis", genre: ["Fantasy", "Action"], isPremium: true, isPopular: true, cover: "assets/img/covers/cover7-Apotheosis.png", desc: "Luo Zheng yang dulunya merupakan tuan muda dari keluarganya terpaksa menjadi budak karena penghianatan yang di lakukan dari keluarga cabang, tapi dia cuma memikirkan adiknya (hm flag siscon ini), dia berusaha menyelamatkan imouto-nya yang berada di pengawasan sekte lain.", price: 10000 },
    
    // Komik gratis (bukan populer)
    { id: 8, title: "Battle Through the Heavens", genre: ["Action", "Adventure", "Fantasy"], isPremium: false, isPopular: false, cover: "assets/img/covers/cover8-btth.png", desc: "Di negeri di mana ada keajaiban hadir. Sebuah daratan di mana yang kuat membuat aturan dan yang lemah harus mematuhi. Sebuah daratan yang penuh dengan harta memikat dan kecantikan namun juga penuh dengan bahaya yang tak terduga. Xiao Yan, yang telah menunjukkan bakat tidak pernah terlihat dalam beberapa dekade, tiba-tiba tiga tahun lalu kehilangan segalanya, kekuatannya, reputasinya, dan janjinya untuk ibunya. Apa sihir telah menyebabkan dia kehilangan semua kekuatannya? Dan mengapa tunangannya tiba-tiba muncul?" },
];

// Format angka menjadi format rupiah
const formatRupiah = (angka) => {
    return `Rp ${angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")},-`;
}

// ---------------------------------------------------------------------
// --- FUNGSI: PEMBUATAN KARTU KOMIK (Reusable) ---
// ---------------------------------------------------------------------

/**
 * Membuat elemen kartu HTML untuk sebuah komik, termasuk status kunci/akses.
 */
const renderCard = (manhua) => {
    const isFullMember = isPremiumFullMember(); 
    const isIndividuallyPurchased = getPurchasedComics().includes(manhua.id);
    
    // Tentukan apakah komik terkunci (Premium, tapi bukan member penuh/belum dibeli)
    const isLocked = manhua.isPremium && !isFullMember && !isIndividuallyPurchased; 
    
    const card = document.createElement('div');
    card.className = 'comic-card';
    
    card.innerHTML = `
        <a href="detail_komik.html?id=${manhua.id}">
            <img src="${manhua.cover}" alt="Cover ${manhua.title}" class="comic-cover">
        </a>
        <div class="card-content">
            <h3>${manhua.title}</h3>
            <p>${manhua.desc}</p>
            <p class="genre-tag">${manhua.genre.join(', ')}</p>
            <span class="${manhua.isPremium ? 'premium-badge' : 'standard-badge'}">
                ${manhua.isPremium ? 'PREMIUM' : 'GRATIS'}
            </span>
        </div>
        ${isLocked ? `
            <div class="member-overlay">
                <p class="member-overlay-text">Akses Premium</p>
            </div>
        ` : ''}
    `;
    
    // Jika komik terkunci, buat overlay bisa diklik untuk menuju halaman detail
    if (isLocked) {
        card.querySelector('.member-overlay').addEventListener('click', (e) => {
            e.preventDefault(); 
            window.location.href = `detail_komik.html?id=${manhua.id}`;
        });
    }

    return card;
};

// ---------------------------------------------------------------------
// --- FUNGSI: HALAMAN UTAMA (INDEX.HTML) ---
// ---------------------------------------------------------------------

/**
 * Menampilkan daftar 4 komik premium populer di beranda.
 */
const renderPopular = () => {
    const popularContainer = document.getElementById('popular-list');
    if (!popularContainer) return;

    popularContainer.innerHTML = '';
    
    // Ambil hanya komik yang premium dan populer
    const popularComics = manhuaData.filter(c => c.isPremium && c.isPopular);
    
    // Tampilkan 4 komik pertama
    popularComics.slice(0, 4).forEach(comic => { 
        popularContainer.appendChild(renderCard(comic)); 
    });
};

// ---------------------------------------------------------------------
// --- FUNGSI: HALAMAN KATALOG (KATALOG.HTML) ---
// ---------------------------------------------------------------------

/**
 * Membuat dan menampilkan tombol-tombol filter genre.
 */
const renderGenreFilter = () => {
    const filterContainer = document.getElementById('genre-filter');
    if (!filterContainer) return;

    // Kumpulkan semua genre unik
    const allGenres = [...new Set(manhuaData.flatMap(c => c.genre))];

    allGenres.forEach(genre => {
        const button = document.createElement('button');
        button.className = 'btn btn-genre';
        button.dataset.genre = genre;
        button.textContent = genre;
        filterContainer.appendChild(button);
    });

    // Atur logika saat tombol genre diklik
    filterContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-genre')) {
            filterContainer.querySelectorAll('.btn-genre').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            
            const selectedGenre = e.target.dataset.genre;
            renderKatalogGrid(selectedGenre); // Panggil fungsi render dengan filter baru
        }
    });
};

/**
 * Menampilkan semua komik di katalog, dapat disaring berdasarkan genre.
 */
const renderKatalogGrid = (filterGenre = 'all') => {
    const katalogContainer = document.getElementById('manhua-list');
    if (!katalogContainer) return;
    
    katalogContainer.innerHTML = '';
    
    // Filter komik berdasarkan genre yang dipilih
    const filteredComics = manhuaData.filter(comic => {
        if (filterGenre === 'all') return true;
        return comic.genre.includes(filterGenre);
    });

    filteredComics.forEach(comic => {
        katalogContainer.appendChild(renderCard(comic));
    });
};

// ---------------------------------------------------------------------
// --- FUNGSI: HALAMAN DETAIL KOMIK (DETAIL_KOMIK.HTML) ---
// ---------------------------------------------------------------------

/**
 * Menampilkan detail lengkap satu komik dan menyesuaikan tombol baca berdasarkan status akses pengguna.
 */
const renderComicDetail = () => {
    const detailContainer = document.getElementById('comic-detail-container');
    const readBtn = document.getElementById('read-chapter-btn');
    const accessMessage = document.getElementById('access-message');
    if (!detailContainer || !readBtn) return;

    // Ambil ID komik dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const comicId = parseInt(urlParams.get('id')); 
    const comic = manhuaData.find(c => c.id === comicId);

    if (!comic) { 
        detailContainer.innerHTML = '<h1>Komik Tidak Ditemukan</h1>'; 
        return; 
    }

    const isFullMember = isPremiumFullMember();
    const isIndividuallyPurchased = getPurchasedComics().includes(comic.id);

    // Tentukan status kunci: terkunci jika Premium DAN pengguna tidak memiliki akses
    const isLocked = comic.isPremium && !isFullMember && !isIndividuallyPurchased;

    // Perbarui konten utama halaman detail
    detailContainer.querySelector('h1').textContent = comic.title;
    detailContainer.querySelector('.detail-cover').src = comic.cover;
    detailContainer.querySelector('.synopsis').textContent = comic.desc;
    detailContainer.querySelector('p').innerHTML = `<strong>Genre:</strong> ${comic.genre.join(', ')} | <strong>Status:</strong> Ongoing`;

    const detailStatusSpan = document.getElementById('detail-member-status').querySelector('span');
    readBtn.onclick = null;

    // Tentukan status akses yang ditampilkan
    if (isFullMember) {
        detailStatusSpan.textContent = 'PREMIUM PENUH';
        detailStatusSpan.className = 'is-premium';
    } else if (isIndividuallyPurchased) {
        detailStatusSpan.textContent = 'KOMIK DIBELI';
        detailStatusSpan.className = 'is-success';
    } else if (!comic.isPremium) {
        detailStatusSpan.textContent = 'GRATIS';
        detailStatusSpan.className = 'is-success';
    } else {
        detailStatusSpan.textContent = 'TERKUNCI';
        detailStatusSpan.className = 'is-standard';
    }

    // --- LOGIKA TOMBOL 'BACA' JIKA TERKUNCI ---
    if (isLocked) {
        readBtn.textContent = `Lihat Opsi Pembelian Akses Komik Ini`;
        readBtn.classList.remove('btn-primary');
        readBtn.classList.add('btn-secondary');
        
        // Klik tombol: Tambahkan ke keranjang dan arahkan ke halaman checkout
        readBtn.onclick = () => {
            const added = addToCart(comic.id);
            if (added) {
                window.location.href = 'checkout_options.html'; 
            }
        };
        
        accessMessage.innerHTML = `Komik ini adalah konten Premium dan terkunci. Silakan pilih opsi akses yang sesuai.`;

    } else {
        // --- LOGIKA TOMBOL 'BACA' JIKA BISA DIAKSES ---
        readBtn.textContent = `Mulai Baca Bab 1`;
        readBtn.classList.add('btn-primary');
        readBtn.classList.remove('btn-secondary');
        
        // Simulasi pembacaan
        readBtn.onclick = () => {
            alert(`📖 Membaca ${comic.title} Bab 1... `);
        };
        
        if (isFullMember) {
            accessMessage.textContent = 'Akses penuh diberikan sebagai anggota Premium Penuh.';
        } else if (isIndividuallyPurchased) {
            accessMessage.textContent = 'Akses komik ini sudah Anda beli dan tersedia secara permanen.';
        } else {
            accessMessage.textContent = 'Komik ini gratis untuk semua pembaca.';
        }
    }
};

// ---------------------------------------------------------------------
// --- INISIALISASI BERDASARKAN HALAMAN ---
// ---------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // Jalankan fungsi yang sesuai dengan elemen yang ada di halaman (halaman utama)
    if (document.getElementById('popular-list')) { renderPopular(); }

    // Jalankan fungsi yang sesuai dengan elemen yang ada di halaman (halaman katalog)
    if (document.getElementById('manhua-list')) { renderGenreFilter(); renderKatalogGrid(); }
    
    // Jalankan fungsi yang sesuai dengan elemen yang ada di halaman (halaman detail)
    if (document.getElementById('comic-detail-container')) { renderComicDetail(); }
});