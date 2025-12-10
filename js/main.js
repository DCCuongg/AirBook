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

async function LoadFlightCard(passengers = 1, departureDate = new Date(), from = "101", to = "102") {
  let flights = []
  try {
    const res = await fetch('./data/flights.json');
    flights = await res.json();
  } catch {
    console.error("Failed to load flight data");
    LoadFlightCard(passengers = 1, departureDate = new Date(), from = "101", to = "102")
    return;
  }
  const list = document.querySelector(".selected-flight");
  list.innerHTML = "";
  flights.forEach(flight => {

    dom = `
      <div class="flight">
        <div class="flight-main-info">
          <div class="flight-airline">
            <img src="${directoryTree["images/airlines"]}/${flight.HangHangKhong.MaHHK}.png" alt="" class="icon">
            ${flight.HangHangKhong.TenHHK}
          </div>
          <div class="flight-time">
            <div class="flight-departure">
              <p class="time">${formatTime(flight["GioDi"])}</p>
              <p>${flight.SanBay_Di.MaSB}</p>
            </div>
            <div class="flight-duration">
              <p>${flight.ThoiGianBay}</p>
              <p class="arrow-through">Direct</p>
            </div>
            <div class="flight-departure">
              <p class="time">${formatTime(flight["GioDen"])}</p>
              <p>${flight.SanBay_Den.MaSB}</p>
            </div>
          </div>
          <div class="flight-price">
            <p><span class="pax">${flight.LoaiVe["Economy"].Gia * passengers}/pax<span></p>
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
            <details >
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
    `
    const div = document.createElement("div");
    div.innerHTML = dom;
    list.appendChild(div);

  });
}
LoadFlightCard(passengers = 1, departureDate = new Date(), from = "101", to = "102")
async function LoadAirport(name = "HaNoi") {
  const airline = []
  try {
    const res = await fetch('./data/airline.json');
    airline = await res.json();
  } catch {
    console.error("Failed to load airline data");
    LoadFlightCard(passengers = 1, departureDate = departureDate, from = "101", to = "102")
    return;
  }
}
