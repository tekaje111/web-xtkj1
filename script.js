const dataSiswa = [
    { name: "Willis Ambarwati, S.Pd", role: "Wali Kelas", img: "foto/walas.jpg" },
    { name: "Achmad Damar Astagina", role: "siswa", img: "foto/damar.jpg" },
    { name: "Anna Agustin Rahmadany", role: "siswa", img: "foto/anaag.jpg" },
    { name: "Annawiyah ", role: "Siswa", img: "foto/anaw.jpg" },
    { name: "Angelia Putri Widyaningrum", role: "Siswa", img: "foto/angel.jpg" },
    { name: "Anggun Latifa Elsi Irmandia", role: "Siswa", img: "foto/anggun.jpg" },
    { name: "Anik Matur Rofifah", role: "Siswa", img: "foto/anik.jpg" },
    { name: "Ardiansyah Immamul Wahid", role: "Siswa", img: "foto/ardi.jpg" },
    { name: "Arsya Reria Pramadhani", role: "Siswa", img: "foto/arsya.jpg" },
    { name: "Cantika Angelina Putri Lestari", role: "Siswa", img: "foto/cantika.jpg" },
    { name: "Clarifta Septi Wulan Ramadhani", role: "Siswa", img: "foto/clarifta.jpg" },
    { name: "Dila Ayu Agustin", role: "Sekretaris", img: "foto/dila.jpg" },
    { name: "Dimas Prastyo", role: "Siswa", img: "foto/dimas.jpg" },
    { name: "Dini Aprilia Nur Aini", role: "Siswa", img: "foto/dini.jpg" },
    { name: "Dwi Rossa Azzahra", role: "Siswa", img: "foto/rosa.jpg" },
    { name: "Emi Trisnanningsih", role: "Siswa", img: "foto/emi.jpg" },
    { name: "Erika Nurdiana", role: "Siswa", img: "foto/erika.jpg" },
    { name: "Eva Arin Dia", role: "Siswa", img: "foto/eva.jpg" },
    { name: "Elysa", role: "Siswa", img: "foto/elysa.jpg" },
    { name: "Farida Rahmawati", role: "Siswa", img: "foto/farida.jpg" },
    { name: "Ferennita Odelia Kusuma", role: "Siswa", img: "foto/feren.jpg" },
    { name: "Filda April Riah", role: "Bendahara", img: "foto/filda.jpg" },
    { name: "Hesa Mahmudi", role: "Siswa / Dev", img: "foto/hesa.jpg" },
    { name: "Ihza Naufa Jendra", role: "Wakil Ketua Kelas", img: "foto/ihza.jpg" },
    { name: "Ines Lintang Cahyani", role: "Siswa", img: "foto/ines.jpg" },
    { name: "Irfana Nur Sabrina", role: "Siswa", img: "foto/irfana.jpg" },
    { name: "Lailatul Fatmatus Saniyah", role: "Siswa", img: "foto/saniah.jpg" },
    { name: "Laura Puspita Sari", role: "Siswa", img: "foto/laura.jpg" },
    { name: "Lionel Zio Octavian", role: "Bendahara", img: "foto/lionel.jpg" },
    { name: "Lisa Para Nita", role: "Siswa", img: "foto/lisa.jpg" },
    { name: "Lisana Lathifah", role: "Ketua Kelas", img: "foto/ipe.jpg" },
    { name: "Najwa Zahrotul Aini", role: "Siswa", img: "foto/najwa.jpg" },
    { name: "Rara Hamidah fauziah", role: "Sekretaris", img: "foto/rara.jpg" },
    { name: "Siti Hesthy Mulyani", role: "Siswa", img: "foto/hesti.jpg" }
];

function tampilkanSiswa() {
    const gridContainer = document.getElementById('student-grid');
    if (!gridContainer) return;
    
    gridContainer.innerHTML = '';

    dataSiswa.forEach(siswa => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-img">
                <img src="${siswa.img}" alt="${siswa.name}">
            </div>
            <h3>${siswa.name}</h3>
            <p class="role">${siswa.role}</p>
        `;
        gridContainer.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    tampilkanSiswa();
});

const FOLDER_ID = '1LujiGHjVo2KELtiP5wYA3-E1AHe7yafs';

async function ambilFotoDrive() {
    const galleryGrid = document.getElementById('gallery-grid');
    const url = `https://drive.google.com/drive/folders/1LujiGHjVo2KELtiP5wYA3-E1AHe7yafs?usp=drive_link`;

    try {
        const response = await fetch(url);
        const text = await response.text();
        
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'text/xml');
        const entries = xml.getElementsByTagName('entry');

        if (entries.length > 0) {
            galleryGrid.innerHTML = '';
            for (let i = 0; i < entries.length; i++) {
                const linkElement = entries[i].getElementsByTagName('link')[0];
                if (linkElement) {
                    const href = linkElement.getAttribute('href');
                    const match = href.match(/[?&]id=([^&]+)/);
                    if (match && match[1]) {
                        const fileId = match[1];
                        const div = document.createElement('div');
                        div.className = 'gallery-item';
                        div.innerHTML = `<img src="https://docs.google.com/uc?export=view&id=${fileId}" alt="Foto">`;
                        galleryGrid.appendChild(div);
                    }
                }
            }
        } else {
            galleryGrid.innerHTML = '<p>Folder kosong atau belum di-Public.</p>';
        }
    } catch (error) {
        galleryGrid.innerHTML = '<p>Gagal memuat galeri.</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    tampilkanSiswa();
    ambilFotoDrive();
});

document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-links a");
    const indicator = document.querySelector(".nav-indicator");
    const sections = document.querySelectorAll("section, .hero-section");

    function moveIndicator(element) {
        if (!element) return;
        indicator.style.width = `${element.offsetWidth}px`;
        indicator.style.left = `${element.offsetLeft}px`;
    }

    navLinks.forEach((link) => {
        link.addEventListener("mouseenter", (e) => {
            moveIndicator(e.target);
        });
    });

    const observerOptions = {
        root: null,
        rootMargin: "-30% 0px -60% 0px",
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                let id = entry.target.getAttribute("id");
                
                if (entry.target.classList.contains("hero-section")) {
                    id = "home";
                }

                if (id) {
                    navLinks.forEach((link) => {
                        link.classList.remove("active");
                        const href = link.getAttribute("href");
                        if (href === `#${id}` || (id === "home" && (href === "#" || href === "#home"))) {
                            link.classList.add("active");
                            moveIndicator(link);
                        }
                    });
                }
            }
        });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    const activeLink = document.querySelector(".nav-links a.active") || navLinks[0];
    if (activeLink) {
        setTimeout(() => moveIndicator(activeLink), 100);
    }

    window.addEventListener("resize", () => {
        const currentActive = document.querySelector(".nav-links a.active") || navLinks[0];
        moveIndicator(currentActive);
    });
});