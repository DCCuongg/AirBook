const directoryTree = {
  "css": "./css",
  "data": "./data",
  "images": "./images",
  "js": "./js",
  "sounds": "./sounds",
  "images/airports": "./images/airports",
  "images/airlines": "./images/airlines"
}
function formatTime(dateTimeString) {
  const d = new Date(dateTimeString);

  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  // const ss = String(d.getSeconds()).padStart(2, "0");

  return `${hh}:${mm}`;
}

async function LoadFlightCard(passengers = 1, departureDate = new Date(), from = "HAN", to = "SGN") {
  let flights = [];

  try {
    const res = await fetch('./data/flights.json');
    flights = await res.json();
  } catch (e) {
    console.error("Failed to load flight data, retry...", e);
    LoadFlightCard(passengers, new Date(), from, to);
    return;
  }
  console.log("All flights:", flights);
  // ---- 🎯 CHUYỂN departureDate thành yyyy-mm-dd để so sánh ----
  const selectedDate = new Date(departureDate).toISOString().split("T")[0];
  console.log("Selected date:", selectedDate);
  // ---- 🎯 LỌC chuyến bay theo điều kiện ----
  const filtered = flights.filter(f => {
    const flightDate = f.GioDi.split("T")[0];   // "2025-01-15" from "2025-01-15T08:45"
    // console.log("Flight date:", flightDate);
    // console.log(f.SanBay_Di.MaSB, from, f.SanBay_Di.MaSB === from);
    // console.log(f.SanBay_Den.MaSB, to, f.SanBay_Den.MaSB === to);
    return (
      f.SanBay_Di.MaSB === from &&
      f.SanBay_Den.MaSB === to &&
      flightDate === selectedDate
    );
  });
  console.log("Filtered flights:", filtered);
  // ---- 🎯 BẮT ĐẦU RENDER ----
  const list = document.querySelector(".selected-flight");
  list.innerHTML = "";

  if (filtered.length === 0) {
    list.innerHTML = `<p class="no-result">No flights found.</p>`;
    return;
  }

  filtered.forEach(flight => {
    const div = document.createElement("div");

    div.innerHTML = `
      <div class="flight">
        <div class="flight-main-info">
          <div class="flight-airline">
            <img src="${directoryTree["images/airlines"]}/${flight.HangHangKhong.MaHHK}.png" class="icon">
            ${flight.HangHangKhong.TenHHK}
          </div>

          <div class="flight-time">
            <div class="flight-departure">
              <p class="time">${formatTime(flight.GioDi)}</p>
              <p>${flight.SanBay_Di.MaSB}</p>
            </div>

            <div class="flight-duration">
              <p>${flight.ThoiGianBay}</p>
              <p class="arrow-through">Direct</p>
            </div>

            <div class="flight-departure">
              <p class="time">${formatTime(flight.GioDen)}</p>
              <p>${flight.SanBay_Den.MaSB}</p>
            </div>
          </div>

          <div class="flight-price">
            <p><span class="pax">${flight.LoaiVe.Economy.Gia * passengers}/pax</span></p>
          </div>
        </div>

        <div class="choose-flight"><button>Choose</button></div>
        <div class="flight-additional-info">
        <div class="filter-facilities">
          <details>
            <summary>
              <h3>Facilities</h3>
              <h3>
                <img src="./images/up.png" alt="icon" class="icon">
              </h3>
            </summary>
            <div class="list-selection">
              <label>
                <input type="checkbox" name="icon">
                <div class="checkbox-icon">✔</div>
                <div class="checkbox-label">
                  <p>Baggages</p>
                  <img src="./images/bag.png" alt="vietnam-airlines-logo" class="icon">
                </div>
              </label>
              <label>
                <input type="checkbox" name="icon">
                <div class="checkbox-icon">✔</div>
                <div class="checkbox-label">
                  <p>Meals</p>
                  <img src="./images/meal.png" alt="vietnam-airlines-logo" class="icon">
                </div>
              </label>
              <label>
                <input type="checkbox" name="icon">
                <div class="checkbox-icon">✔</div>
                <div class="checkbox-label">
                  <p>In-flight entertainment</p>
                  <img src="./images/entertain.png" alt="vietnam-airlines-logo" class="icon">
                </div>
              </label>
              <label>
                <input type="checkbox" name="icon">
                <div class="checkbox-icon">✔</div>
                <div class="checkbox-label">
                  <p>Wifi</p>
                  <img src="./images/wifi.png" alt="vietnam-airlines-logo" class="icon">
                </div>
              </label>
              <label>
                <input type="checkbox" name="icon">
                <div class="checkbox-icon">✔</div>
                <div class="checkbox-label">
                  <p>Power/USB port</p>
                  <img src="./images/power.png" alt="vietnam-airlines-logo" class="icon">
                </div>
              </label>
            </div>
          </details>
        </div>
        <div class="filter-refund">
          <details>
            <summary>
              <h3>Refund &amp; Reschedule</h3>
              <h3>
                <img src="./images/up.png" alt="icon" class="icon">
              </h3>
            </summary>
            <div class="list-selection">
              <label>
                <input type="checkbox" name="icon">
                <div class="checkbox-icon">✔</div>
                <div class="checkbox-label">
                  <p>Refundable</p>
                  <img src="./images/refund.png" alt="vietnam-airlines-logo" class="icon">
                </div>
              </label>
              <label>
                <input type="checkbox" name="icon">
                <div class="checkbox-icon">✔</div>
                <div class="checkbox-label">
                  <p>Reschedule available</p>
                  <img src="./images/reschedule.png" alt="vietnam-airlines-logo" class="icon">
                </div>
              </label>
            </div>
          </details>
        </div>
      </div>
      </div>
    `;

    list.appendChild(div);
  });
}
LoadFlightCard(passengers = 1, departureDate = new Date(), from = "SGN", to = "HAN");


async function LoadAirport() {
  let airline = []
  try {
    const res = await fetch('./data/airports.json');
    airline = await res.json();
  } catch {
    console.error("Failed to load airline data");
    LoadFlightCard(passengers = 1, departureDate = departureDate, from = "101", to = "102")
    return;
  }
  return airline
}

function renderAirports(list, container, input, show) {
  container.innerHTML = ""; // clear danh sách cũ

  list.forEach(ap => {
    const item = document.createElement("div");
    item.classList.add("airport-item");

    item.innerHTML = `
      <img src="./images/plane.png" class="icon">
      <div>
        <h4>${ap.TenSB}</h4>
        <p>${ap.MaSB} - ${ap.ThanhPho}, ${ap.QuocGia}</p>
      </div>
    `;

    // click để chọn sân bay
    item.addEventListener("click", () => {
      input.value = `${ap.MaSB} - ${ap.ThanhPho}`;   // <--- dùng input được truyền vào
      show.style.display = "none";             // đóng dropdown
    });

    container.appendChild(item);
  });
}



// Thêm sự kiện
const numberInputs = document.querySelectorAll('.select-number input[type="number"]');

numberInputs.forEach(input => {
  input.addEventListener('wheel', (e) => {
    // ngăn không cho event lăn trang
    e.preventDefault();
    // tăng giảm số theo scroll
    const step = input.step ? parseFloat(input.step) : 1;
    const value = parseFloat(input.value) || 0;
    if (e.deltaY < 0) {
      input.value = value + step;
    } else {
      if (input.value > 1) {
        input.value = value - step;
      }
    }
  });
});
//đặt giá trị mặc định của <input type="date"> là ngày hôm nay
const dateInputs = document.querySelectorAll('.select-time input[type="date"]');

const today = new Date().toISOString().split('T')[0];
// kết quả dạng: 2025-12-12

dateInputs.forEach(input => {
  input.value = today;
});


(async () => {
  const airportInputs = document.querySelectorAll(".airport-input");
  const airportsData = await LoadAirport();
  if (!airportsData) return;
  console.log(airportsData);
  // Gắn sự kiện cho từng input sân bay
  airportInputs.forEach(block => {
    const input = block.querySelector("input");
    const container = block.querySelector(".airport-container");
    const list = block.querySelector(".airports-list");

    // Mở dropdown + load tất cả sân bay
    input.addEventListener("focus", () => {
      renderAirports(airportsData, list, input, container);
      container.style.display = "block";
    });

    // Khi gõ → lọc
    input.addEventListener("input", () => {
      const keyword = input.value.trim().toLowerCase();

      const filtered = airportsData.filter(ap =>
        ap.TenSB.toLowerCase().includes(keyword) ||
        ap.MaSB.toLowerCase().includes(keyword) ||
        ap.ThanhPho.toLowerCase().includes(keyword)
      );

      renderAirports(filtered, list, input, container);
      container.style.display = "block";
    });

    // Click ngoài → ẩn list
    document.addEventListener("click", e => {
      if (!block.contains(e.target)) {
        container.style.display = "none";
      }
    });
  });
})();

function extractAirportCode(str) {
  if (!str) return "";
  return str.split('-')[0].trim();
}

document.querySelector('.search-flight button').addEventListener('click', () => {

  const passengers = parseInt(
    document.querySelector('.select-number input[type="number"]').value
  );

  const departureDate = document.querySelector('.select-time input[type="date"]').value;

  let fromRaw = document.querySelector('.from-airport').value;
  let toRaw = document.querySelector('.to-airport').value;
  if (!fromRaw) {
    fromRaw = "SGN - Ho Chi Minh City, Vietnam"
  }
  if (!toRaw) {
    toRaw = "HAN - Hanoi, Vietnam"
  }
  console.log("From raw:", fromRaw);
  console.log("To raw:", toRaw);

  const from = extractAirportCode(fromRaw);
  const to = extractAirportCode(toRaw);

  LoadFlightCard(passengers, departureDate, from, to);
});

