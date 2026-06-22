const teamMembers = [
    {
        name: 'Idham Khald Munawar',
        role: 'Head Barista',
        description: 'Raja kopi yang bisa buat espresso sambil mata tertutup. Bahkan mesin espresso takut sama dia.',
        photo: '../gambar/Idhamkhaldmunawar.jpeg'
    },
    {
        name: 'Azis',
        role: 'Coffee Designer',
        description: 'Seniman latte art yang bisa gambar wajahmu di kopi, tapi lebih bagus dari aslinya.',
        photo: '../gambar/Azis.jpeg'
    },
    {
        name: 'Baga Tukang Gas',
        role: 'Service Lead',
        description: 'Master layanan yang bisa ingat pesanan mu dari mata aja. Punya otak komputer di kepala.',
        photo: '../gambar/bagastukanggas.jpeg'
    },
    {
        name: 'Farel',
        role: 'Menu Curator',
        description: 'Pencinta menu yang punya taste buds seperti food critic. Bisa baca hati dari menu pilihan.',
        photo: '../gambar/farel.jpeg'
    },
    {
        name: 'Otniel',
        role: 'Customer Support',
        description: 'Si ceria yang bisa bikin orang bad mood jadi senyum. Pelayanan dimulai dari hati dia.',
        photo: '../gambar/otniel.jpeg'
    }
];

function renderTeamMembers() {
    const container = document.getElementById('team-grid');
    if (!container) return;
    container.innerHTML = teamMembers.map((member) => `
        <article class="team-card">
            <img src="${member.photo}" alt="Foto ${member.name}" loading="lazy">
            <div class="space-y-3">
                <div>
                    <p class="text-sm uppercase tracking-[0.3em] text-amber-300">${member.role}</p>
                    <h3 class="mt-3 text-xl font-semibold text-amber-100">${member.name}</h3>
                </div>
                <p class="text-amber-200 leading-7">${member.description}</p>
            </div>
        </article>
    `).join('');
}

window.addEventListener('DOMContentLoaded', renderTeamMembers);
