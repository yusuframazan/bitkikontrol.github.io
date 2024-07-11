
// Sayfa yüklendiğinde ana sayfayı göster
document.addEventListener("DOMContentLoaded", function () {
    loadHomePage(); // veya istediğiniz ana sayfa fonksiyonunu çağırın
});
// Firebase konfigürasyonu
const firebaseConfig = {
    apiKey: "AIzaSyABenFKvbnwgR4mcRGi-V5SQ4Y2alivx7w",
    authDomain: "bitki-izleme.firebaseapp.com",
    databaseURL: "https://bitki-izleme-default-rtdb.firebaseio.com",
    projectId: "bitki-izleme",
    storageBucket: "bitki-izleme.appspot.com",
    messagingSenderId: "561641375328",
    appId: "1:561641375328:web:f00fcc7054b32d36c86505",
    measurementId: "G-N0QXWTRZVF"
};

// Firebase'i başlatma
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database(app);

function updateControlStatus() {
    // Fan ve su motoru durumlarını Firebase'den al ve güncelle
    fetch('https://bitki-izleme-default-rtdb.firebaseio.com/control.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('fan-status').textContent = data.fan ? 'Açık' : 'Kapalı';
            document.getElementById('water-pump-status').textContent = data.waterPump ? 'Açık' : 'Kapalı';
        })
        .catch(error => console.error('Kontrol durumu alınamadı:', error));
}

function toggleFan() {
    // Fan durumunu değiştir ve Firebase'e gönder
    const fanStatus = document.getElementById('fan-status').textContent === 'Kapalı';
    fetch('https://bitki-izleme-default-rtdb.firebaseio.com/control.json', {
        method: 'PATCH',
        body: JSON.stringify({ fan: fanStatus }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
        if (response.ok) {
            updateControlStatus();
        } else {
            console.error('Fan durumu güncellenemedi.');
        }
    })
    .catch(error => console.error('Fan durumu güncellenemedi:', error));
}

function toggleWaterPump() {
    // Su motoru durumunu değiştir ve Firebase'e gönder
    const waterPumpStatus = document.getElementById('water-pump-status').textContent === 'Kapalı';
    fetch('https://bitki-izleme-default-rtdb.firebaseio.com/control.json', {
        method: 'PATCH',
        body: JSON.stringify({ waterPump: waterPumpStatus }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
        if (response.ok) {
            updateControlStatus();
        } else {
            console.error('Su motoru durumu güncellenemedi.');
        }
    })
    .catch(error => console.error('Su motoru durumu güncellenemedi:', error));
}

function loadPage(page) {
    switch (page) {
        case 'home':
            loadHomePage();
            break;
        case 'plants':
            loadPlantsPage();
            break;
        case 'about':
            loadAboutPage();
            break;
        case 'contact':
            loadContactPage();
            break;
        case 'history':
            loadDataHistory();
            break;
        case 'control-panel':
            loadControlPanel();
            break;
        default:
            loadHomePage();
    }
}

function loadHomePage() {
    document.getElementById("main-content").innerHTML = `
        <section class="plant-info">
            <h2>Bitki Bilgileri</h2>
            <p>Bitki Adı: <span id="plant-name">Domates</span></p>
            <p>Toprak Nem: <span id="soil-moisture">---</span>%</p>
            <p>Hava Sıcaklığı: <span id="current-temperature">---</span>°C</p>
            <p>Nem Oranı: <span id="current-humidity">---</span>%</p>
            <p>Işık Şiddeti: <span id="ldr-sensor">---</span>%</p>
        </section>

        <div class="controls">
            <button onclick="updateSensorData()">Verileri Güncelle</button>
            <!-- Diğer kontroller burada yer alabilir -->
        </div>

        <div class="chart-container">
            <canvas id="sensor-chart"></canvas>
        </div>
    `;
    updateSensorData(); // Sayfa yüklendiğinde verileri güncelle
}

function loadPlantsPage() {
    document.getElementById("main-content").innerHTML = `
        <h2>Bitkiler ve Bakım Bilgileri</h2>
        <p><strong>Domates:</strong></p>
        <ul>
            <li><strong>Toprak Nem Oranı:</strong> Nemli toprak sever.</li>
            <li><strong>Işık Şiddeti:</strong> Direkt güneş ışığı alan ortamları sever.</li>
            <li><strong>Sıcaklık:</strong> 18-24°C arası idealdir.</li>
            <li><strong>Sulama:</strong> Düzenli sulama yapılmalıdır.</li>
        </ul>
        <p><strong>Biber:</strong></p>
        <ul>
            <li><strong>Toprak Nem Oranı:</strong> Orta nemli toprakları tercih eder.</li>
            <li><strong>Işık Şiddeti:</strong> Bol güneş ışığı alan yerleri sever.</li>
            <li><strong>Sıcaklık:</strong> 20-25°C arası idealdir.</li>
            <li><strong>Sulama:</strong> Düzenli sulama yapılmalıdır, ancak fazla suya ihtiyaç duymaz.</li>
        </ul>
        <p><strong>Brokoli:</strong></p>
        <ul>
            <li><strong>Toprak Nem Oranı:</strong> Nemli ve iyi drenajlı toprakları tercih eder.</li>
            <li><strong>Işık Şiddeti:</strong> Yarı gölge alanlarda yetiştirilebilir.</li>
            <li><strong>Sıcaklık:</strong> 18-23°C arası idealdir.</li>
            <li><strong>Sulama:</strong> Toprağı sürekli nemli tutulmalıdır.</li>
        </ul>
        <p><strong>Salatalık:</strong></p>
        <ul>
            <li><strong>Toprak Nem Oranı:</strong> Yüksek nemli topraklar tercih eder.</li>
            <li><strong>Işık Şiddeti:</strong> Bol güneş ışığına ihtiyaç duyar.</li>
            <li><strong>Sıcaklık:</strong> 22-28°C arası idealdir.</li>
            <li><strong>Sulama:</strong> Sık ve düzenli sulama yapılmalıdır.</li>
        </ul>
    `;
}

function loadAboutPage() {
    document.getElementById("main-content").innerHTML = `
        <h1>Hakkımızda</h1>
        <p>Bitki İzleme Web Sitesi, bitkilerin sağlık durumunu izlemek ve kontrol etmek için tasarlanmıştır.</p>
        <p>Amacımız, bitkilerin doğru bakımını sağlamak ve kullanıcılara bitki yetiştirme sürecinde yardımcı olmaktır.</p>
        <p>Bizimle iletişime geçmekten çekinmeyin!</p>
    `;
}

function loadContactPage() {
    document.getElementById("main-content").innerHTML = `
        <h1>İletişim</h1>
        <p>Bizimle iletişime geçmek için aşağıdaki bilgileri kullanabilirsiniz:</p>
        <ul>
            <li>Telefon: 123-456-7890</li>
            <li>E-posta: Yusuf@bitkiizleme.com</li>
            <li>Adres: İstiklal Cad. No: 123, Karabük, Türkiye</li>
        </ul>
        
        <div>
            <input type="radio" id="show-contact-form" name="form-type" onclick="toggleContactForm()">
            <label for="show-contact-form">İletişim Formunu Göster</label>
        </div>
        
        <section id="contact" class="contact-form">
            <h2>İletişim Formu</h2>
            <form id="contact-form" onsubmit="submitForm(event)">
                <label for="name">Adınız:</label><br>
                <input type="text" id="name" name="name" required><br>
                <label for="email">E-posta Adresiniz:</label><br>
                <input type="email" id="email" name="email" required><br>
                <label for="message">Mesajınız:</label><br>
                <textarea id="message" name="message" rows="4" required></textarea><br>
                <button type="submit">Gönder</button>
            </form>
        </section>
    `;
}

function toggleContactForm() {
    const contactForm = document.getElementById('contact');
    if (contactForm.style.display === 'none' || contactForm.style.display === '') {
        contactForm.style.display = 'block';
    } else {
        contactForm.style.display = 'none';
    }
}

function submitForm(event) {
    event.preventDefault();
    const formData = new FormData(document.getElementById('contact-form'));
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Formu işleme ve Firebase'e gönderme
    const messagesRef = firebase.database().ref('messages');
    messagesRef.push({
        name: name,
        email: email,
        message: message
    }).then(() => {
        alert('Mesajınız başarıyla gönderildi!');
        document.getElementById('contact-form').reset();
    }).catch(error => {
        console.error('Mesaj gönderilemedi:', error);
        alert('Mesajınız gönderilemedi. Lütfen tekrar deneyin.');
    });
}

function loadDataHistory() {
    document.getElementById("main-content").innerHTML = `
        <h2>Veri Geçmişi</h2>
        <p>Burada önceki veri kayıtlarını görüntüleyebilirsiniz.</p>
        <p>Veri tabanı bağlantısını buraya entegre edebiliriz.</p>
    `;
}

function loadControlPanel() {
    document.getElementById("main-content").innerHTML = `
        <h2>Kontrol Paneli</h2>
        <div class="control-panel">
            <p>Fan Durumu: <span id="fan-status">---</span></p>
            <button onclick="toggleFan()">Fanı Aç/Kapat</button>
            <p>Su Motoru Durumu: <span id="water-pump-status">---</span></p>
            <button onclick="toggleWaterPump()">Su Motorunu Aç/Kapat</button>
        </div>
    `;
    updateControlStatus(); // Kontrol paneli yüklendiğinde durumları güncelle
}

function updateSensorData() {
    // Sensör verilerini Firebase'den al ve güncelle
    fetch('https://bitki-izleme-default-rtdb.firebaseio.com/sensors.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('plant-name').textContent = data.plantName || '---';
            document.getElementById('soil-moisture').textContent = data.soilMoisture || '---';
            document.getElementById('current-temperature').textContent = data.temperature || '---';
            document.getElementById('current-humidity').textContent = data.humidity || '---';
            document.getElementById('ldr-sensor').textContent = data.lightIntensity || '---';

            // Grafik güncelleme işlemi buraya eklenebilir
        })
        .catch(error => console.error('Sensör verileri alınamadı:', error));
}

// Sayfa yüklendiğinde ana sayfayı göster
document.addEventListener("DOMContentLoaded", function () {
    loadHomePage();
});
