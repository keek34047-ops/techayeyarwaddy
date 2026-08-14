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
const addLaptopForm = document.getElementById('addLaptopForm');

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
        
        <!-- Action Buttons (Viber & Telegram) -->
        <div style="display: flex; gap: 8px; margin-top: auto;">
          <button class="btn-buy" style="background-color: #7360f2; flex: 1; padding: 0.5rem;" 
                  onclick="event.stopPropagation(); orderViaViber('${laptop.title}', '${laptop.price}')">
            Viber
          </button>
          <button class="btn-buy" style="background-color: #0088cc; flex: 1; padding: 0.5rem;" 
                  onclick="event.stopPropagation(); orderViaTelegram('${laptop.title}', '${laptop.price}')">
            Telegram
          </button>
        </div>

        <!-- Delete Button -->
        <button class="btn-delete" onclick="event.stopPropagation(); deleteLaptop(${laptop.id})">
          🗑️ ဖျက်မည်
        </button>

      </div>
    </div>
  `).join('');
}

// 2. Admin မှ Laptop အသစ်ထည့်ခြင်း စနစ် (File ရော URL ပါ အဆင်ပြေစေရန်)
if (addLaptopForm) {
  addLaptopForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const fileInput = document.getElementById('laptopImageFile');
    const file = fileInput ? fileInput.files[0] : null;

    const createNewLaptop = (imageUrl) => {
      const newLaptop = {
        id: Date.now(),
        title: document.getElementById('laptopTitle').value,
        brand: document.getElementById('laptopBrand').value,
        specs: document.getElementById('laptopSpecs').value,
        condition: document.getElementById('laptopCondition').value,
        price: document.getElementById('laptopPrice').value,
        image: imageUrl || "https://via.placeholder.com/300x200?text=Laptop",
        description: document.getElementById('laptopDesc').value
      };

      laptops.unshift(newLaptop); // ထိပ်ဆုံးသို့ ထည့်မည်
      displayLaptops(laptops);   // Refresh ပြန်လုပ်မည်
      addLaptopForm.reset();     // Form ကို ရှင်းမည်
      alert('Laptop အသစ် အောင်မြင်စွာ ထည့်သွင်းပြီးပါပြီ!');
    };

    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        createNewLaptop(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      createNewLaptop("");
    }
  });
}

// 3. Laptop ဖျက်သည့် စနစ်
function deleteLaptop(id) {
  if (confirm("ဒီ Laptop ကို ဖျက်မှာ သေချာပါသလား?")) {
    laptops = laptops.filter(laptop => laptop.id !== id);
    displayLaptops(laptops);
  }
}

// 4. Search & Filter စနစ်
function filterData() {
  const query = searchInput ? searchInput.value.toLowerCase() : '';
  const selectedBrand = brandFilter ? brandFilter.value : 'all';

  const filtered = laptops.filter(laptop => {
    const matchesSearch = laptop.title.toLowerCase().includes(query) || 
                          laptop.specs.toLowerCase().includes(query);
    const matchesBrand = selectedBrand === 'all' || laptop.brand === selectedBrand;
    return matchesSearch && matchesBrand;
  });

  displayLaptops(filtered);
}

// 5. Direct Order - Viber
function orderViaViber(title, price) {
  const viberNumber = "09980882669"; 
  const message = `မင်္ဂလာပါ၊ Website မှတစ်ဆင့် "${title}" (${price} MMK) ကို ဝယ်ယူရန် မေးမြန်းချင်လို့ပါခင်ဗျာ။`;

  navigator.clipboard.writeText(message);
  alert("ဝယ်ယူမည့် စာသားကို Copy ကူးလိုက်ပါပြီ။ Viber ပွင့်လာပါက Paste (Ctrl + V) လုပ်၍ ပို့ပေးပါခင်ဗျာ။");

  const formattedNumber = "95" + viberNumber.substring(1);
  window.location.href = `viber://chat?number=%2B${formattedNumber}`;
}

// 6. Direct Order - Telegram
function orderViaTelegram(title, price) {
  const telegramUsername = "your_telegram_username"; // မိမိ Telegram Username ထည့်ပါ
  const message = `မင်္ဂလာပါ၊ Website မှတစ်ဆင့် "${title}" (${price} MMK) ကို ဝယ်ယူရန် မေးမြန်းချင်လို့ပါခင်ဗျာ။`;

  window.open(`https://t.me/${telegramUsername}?text=${encodeURIComponent(message)}`, '_blank');
}

// 7. Detail Modal Pop-up စနစ်
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
      
      <div style="display: flex; gap: 10px; margin-top: 1.2rem;">
        <button class="btn-buy" style="background-color: #7360f2; flex: 1;" 
                onclick="orderViaViber('${laptop.title}', '${laptop.price}')">
          Viber ဖြင့် ဆက်သွယ်ရန်
        </button>
        <button class="btn-buy" style="background-color: #0088cc; flex: 1;" 
                onclick="orderViaTelegram('${laptop.title}', '${laptop.price}')">
          Telegram ဖြင့် ဆက်သွယ်ရန်
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
