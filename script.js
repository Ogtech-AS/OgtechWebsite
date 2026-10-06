// CO2-kalkulatoren. Samme regnestykke som på den gamle nettsiden:
// ett vogntog frakter 15 000 kg oksygen, distansen ganges med 1,5 (tur/retur),
// og utslippet er satt til 940 g CO2 per km.
const KG_PER_TRUCK = 15000;
const DISTANCE_FACTOR = 1.5;
const CO2_KG_PER_KM = 940 / 1000;

const form = document.getElementById("calc");
const error = document.getElementById("calc-error");
const format = new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 3 });

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const distance = Number(document.getElementById("distance").value);
  const consumption = Number(document.getElementById("annualConsumption").value);

  const valid = distance > 0 && consumption > 0;
  error.hidden = valid;
  if (!valid) return;

  const trucks = Math.max(1, Math.ceil(consumption / KG_PER_TRUCK));
  const co2 = distance * DISTANCE_FACTOR * trucks * CO2_KG_PER_KM;

  document.getElementById("trucks").textContent = format.format(trucks);
  document.getElementById("co2").textContent = `${format.format(co2)} kg`;
});

// Mobilmenyen: knappen åpner/lukker menypanelet, og et valg i menyen eller Esc lukker det igjen.
const toggle = document.querySelector(".menu-toggle");
const menu = document.getElementById("meny");

function setMenu(open) {
  menu.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Lukk meny" : "Meny");
}

toggle.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
menu.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu.classList.contains("open")) {
    setMenu(false);
    toggle.focus();
  }
});

// Ved utskrift skal all teksten bak «Les mer» med.
window.addEventListener("beforeprint", () => {
  document.querySelectorAll("details.readmore").forEach((d) => (d.open = true));
});

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
