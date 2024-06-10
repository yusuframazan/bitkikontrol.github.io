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
            <li>Adres: istiklal Cad. No: 123, Karabük, Türkiye</li>
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
                <label for="subject">Konu:</label><br>
                <input type="text" id="subject" name="subject" required><br>
                <label for="message">Mesajınız:</label><br>
                <textarea id="message" name="message" required></textarea><br>
                <button type="submit">Gönder</button>
            </form>
        </section>
    `;
}

function loadDataHistory() {
    fetch('https://bitki-izleme-default-rtdb.firebaseio.com/sensors.json')
        .then(response => response.json())
        .then(data => {
            let tableHTML = `
                <h2>Veri Geçmişi</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Zaman</th>
                            <th>Sıcaklık (°C)</th>
                            <th>Nem (%)</th>
                            <th>Toprak Nem Sensörü (%)</th>
                            <th>Işık Şiddeti</th>
                        </tr>
                    </thead>
                    <tbody>`;
            Object.keys(data).forEach(key => {
                const sensor = data[key];
                const time = new Date(sensor.time).toLocaleString();
                const temperature = sensor.temperature;
                const humidity = sensor.humidity;
                const soilMoisture = sensor.soilMoisture || '---'; // Toprak nem sensörü değeri
                const ldrSensor = sensor.ldrSensor || '---'; // Işık sensörü değeri
                tableHTML += `
                    <tr>
                        <td>${time}</td>
                        <td>${temperature}</td>
                        <td>${humidity}</td>
                        <td>${soilMoisture}</td>
                        <td>${ldrSensor}</td>
                    </tr>
                `;
            });
            tableHTML += `</tbody></table>`;
            document.getElementById("main-content").innerHTML = tableHTML;
        })
        .catch(error => console.error('Veri alınamadı:', error));
}

function updateSensorData() {
    fetch('https://bitki-izleme-default-rtdb.firebaseio.com/sensors.json')
        .then(response => response.json())
        .then(data => {
            const latestReading = data[Object.keys(data).pop()];
            document.getElementById('current-temperature').textContent = latestReading.temperature;
            document.getElementById('current-humidity').textContent = latestReading.humidity;
            document.getElementById('soil-moisture').textContent = latestReading.soilMoisture || '---'; // Toprak nem sensörü değeri
            document.getElementById('ldr-sensor').textContent = latestReading.ldrSensor || '---'; // Işık sensörü değeri

            // Grafik verilerini güncelle
            updateChart(latestReading.temperature, latestReading.soilMoisture, latestReading.ldrSensor);
        })
        .catch(error => console.error('Veri alınamadı:', error));
}

function updateChart(temperature, soilMoisture, ldrSensor) {
    var ctx = document.getElementById('sensor-chart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Sıcaklık', 'Toprak Nem', 'Işık Şiddeti'],
            datasets: [{
                label: 'Değerler',
                data: [temperature, soilMoisture, ldrSensor],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function submitForm(event) {
    event.preventDefault();
    const form = document.getElementById('contact-form');
    const formData = new FormData(form);
    const formDataObject = {};
    formData.forEach((value, key) => {
        formDataObject[key] = value;
    });

    // Firebase veritabanına veriyi gönder
    fetch('https://iletisim-902bb-default-rtdb.europe-west1.firebasedatabase.app/contact.json', {
        method: 'POST',
        body: JSON.stringify(formDataObject),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            console.log('Form başarıyla Firebase veritabanına gönderildi.');
        } else {
            console.error('Form gönderilirken bir hata oluştu.');
        }
    })
    .catch(error => {
        console.error('Form gönderilirken bir hata oluştu:', error);
    });

    // Form alanlarını temizle
    form.reset();
}

function toggleContactForm() {
    const contactForm = document.getElementById('contact');
    contactForm.classList.toggle('active');
}

// Sayfa yüklendiğinde Ana Sayfa'yı göster
loadPage('home');
