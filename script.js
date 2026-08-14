// Laptop Data List
let laptops = [
  {
    id: 1,
    title: "Dell Latitude 5490/5480",
    brand: "Dell",
    specs: "Core i5 7th Gen / 8GB RAM / 256GB SSD",
    condition: "90% GoodSecond",
    price: "899,000",
    image: "images/dell5480.jpg.jpg",
    description: "Battery ကျန်းမာရေး 85%+ ရှိပါသည်။ စက်ရုပ်ထွက် အော်ဂျင်နယ် ပစ္စည်းများ အပြည့်ပါဝင်သည်။"
  },
  {
    id: 2,
    title: "Lenovo ThinkPad X13",
    brand: "Lenovo",
    specs: "AMD Ryzen 5Pro 4650U / 8GB RAM / 256GB SSD",
    condition: "90% GoodSecond",
    price: "1,350,000",
    image: "images/photo_2026-08-05_21-21-22.jpg",
    description: "လုပ်ငန်းသုံးအတွက် ပေါ့ပါးသွက်လက်ပြီး Body Quality အလွန်ကောင်းမွန်သော ThinkPad ဖြစ်ပါသည်။"
  },
  {
    id: 3,
    title: "Dell Latitude 7320",
    brand: "Dell",
    specs: "Evo Core vPRO i5 11th Gen/ 16GB RAM / 256GB SSD",
    condition: "90% GoodSecond",
    price: "1,550,000",
    image: "images/photo_2026-08-05_21-33-32.jpg",
    description: "Evo vPro ဖြစ်လို့ battery ရှယ်ခံသည်"
  }
];

const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const brandFilter = document.getElementById('brandFilter');

// 1. Laptop Cards များ ထုတ်ပြခြင်း
function displayLaptops(items) {
  if (!productGrid) return;
  productGrid.innerHTML = items.map(laptop => `
    <div class="card" onclick="openModal(${laptop.id})">
      <img src="${laptop.image}" alt="${laptop.title}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
      <div class="card-body">
        <span class="badge">${laptop.condition}</span>
        <h3>${laptop.title}</h3>
        <p>${laptop.specs}</p>
        <div class="price">${laptop.price} MMK</div>
        <button class="btn-buy" style="background-color: #7360f2;" onclick="event.stopPropagation(); orderViaViber('${laptop.title}', '${laptop.price}')">
          Viber ဖြင့် ဝယ်ယူရန်
        </button>
      </div>
    </div>
  `).join('');
}

// 2. Search & Filter စနစ်
function filterData() {
  const query = searchInput.value.toLowerCase();
  const selectedBrand = brandFilter.value;

  const filtered = laptops.filter(laptop => {
    const matchesSearch = laptop.title.toLowerCase().includes(query) || 
                          laptop.specs.toLowerCase().includes(query);
    const matchesBrand = selectedBrand === 'all' || laptop.brand === selectedBrand;
    return matchesSearch && matchesBrand;
  });

  displayLaptops(filtered);
}

// 3. Direct Order (Viber Link) - ၁၀၀% အလုပ်လုပ်သော Link စနစ်
function orderViaViber(title, price) {
  const viberNumber = "959980882669"; // 959... format ဖြင့် တိုက်ရိုက် ရေးသားထားသည်
  const message = `မင်္ဂလာပါ၊ Website မှတစ်ဆင့် "${title}" (${price} MMK) ကို ဝယ်ယူရန် မေးမြန်းချင်လို့ပါခင်ဗျာ။`;

  // ဖုန်းတွင် Viber အလွယ်တကူ ပွင့်စေသည့် Universal Link
  const viberUrl = `https://viber.click/${viberNumber}?text=${encodeURIComponent(message)}`;

  // Web Browser/Phone တွင် ပွင့်စေခြင်း
  window.open(viberUrl, '_blank');
}

// 4. Detail Modal Pop-up စနစ်
function openModal(id) {
  const laptop = laptops.find(item => item.id === id);
  if (!laptop) return;

  const modalBody = document.getElementById('modalBody');
  modalBody.innerHTML = `
    <img src="${laptop.image}" class="modal-detail-img" alt="${laptop.title}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
    <div class="modal-info">
      <span class="badge">${laptop.condition}</span>
      <h2>${laptop.title}</h2>
      <div class="price-tag">${laptop.price} MMK</div>
      <ul>
        <li><strong>Brand:</strong> ${laptop.brand}</li>
        <li><strong>Specification:</strong> ${laptop.specs}</li>
        <li><strong>အသေးစိတ် အချက်အလက်:</strong> ${laptop.description}</li>
        <li><strong>ဆိုင်လိပ်စာ:</strong> ရန်ကုန်မြို့။</li>
      </ul>
      <div style="margin-top: 1rem;">
        <button class="btn-buy" style="background-color: #7360f2;" onclick="orderViaViber('${laptop.title}', '${laptop.price}')">
          Viber ဖြင့် တိုက်ရိုက် ဆက်သွယ်ရန်
        </button>
      </div>
    </div>
  `;

  const modal = document.getElementById('laptopModal');
  if (modal) modal.style.display = 'flex';
}

function closeModal() {
  const modal = document.getElementById('laptopModal');
  if (modal) modal.style.display = 'none';
}

// Modal အပြင်ဘက်ကို နှိပ်လျှင် ပိတ်သွားရန်
window.onclick = function(event) {
  const modal = document.getElementById('laptopModal');
  if (event.target === modal) {
    closeModal();
  }
};

// Event Listeners
if (searchInput) searchInput.addEventListener('input', filterData);
if (brandFilter) brandFilter.addEventListener('change', filterData);

// စတင်ပွင့်ချိန်တွင် Render လုပ်မည်
displayLaptops(laptops);
