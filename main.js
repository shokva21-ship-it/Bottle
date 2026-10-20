
const hajmlar = document.querySelectorAll(".hajm");
const son = document.querySelector("#son");
const miqdor = document.querySelector("#miqdor");
const hajm = document.querySelector("#hajm");
const bir = document.querySelector("#bir");
const jami = document.querySelector("#jami");
const jamiSon = document.querySelector("#jamiSon");
const chegirma = document.querySelector("#chegirma");
const tanlovlar = document.querySelectorAll(".tanlov");
const qosh = document.querySelector("#qosh");
const xabar = document.querySelector("#xabar");

const narxlar = {
    "0.5": 0.075,
    "1": 0.095,
    "1.5": 0.12,
    "5": 0.35,
    "0.75": 0.11
};

const nomlar = {
    "0.5": "0.5 Liter",
    "1": "1.0 Liter",
    "1.5": "1.5 Liter",
    "5": "5.0 Liter",
    "0.75": "Eco 0.75L"
};

let tanlangan = "0.5";

function formatSon(qiymat) {
    return new Intl.NumberFormat("en-US").format(qiymat).replace(/,/g, " ");
}

function formatPul(qiymat) {
    return "$" + qiymat.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function hisobla() {
    const dona = Number(son.value);
    const asosiy = narxlar[tanlangan];
    let xizmatNarxi = 0;

    tanlovlar.forEach(input => {
        if (input.checked) {
            xizmatNarxi += Number(input.dataset.price);
        }
    });

    let foiz = 0;

    if (dona >= 100000) {
        foiz = 15;
    } else if (dona >= 50000) {
        foiz = 12;
    } else if (dona >= 20000) {
        foiz = 10;
    } else if (dona >= 5000) {
        foiz = 5;
    }

    const donaNarxi = asosiy + xizmatNarxi;
    const umumiy = dona * donaNarxi * (1 - foiz / 100);

    miqdor.textContent = formatSon(dona) + " dona";
    hajm.textContent = nomlar[tanlangan];
    bir.textContent = formatPul(donaNarxi);
    jami.textContent = formatPul(umumiy);
    jamiSon.textContent = formatSon(dona) + " dona";
    chegirma.textContent = foiz + "% chegirma";

    son.style.background = `linear-gradient(to right, #0ea5e9 ${((dona - 1000) / 99000) * 100}%, #344258 ${((dona - 1000) / 99000) * 100}%)`;
}

hajmlar.forEach(btn => {
    btn.addEventListener("click", () => {
        hajmlar.forEach(item => item.classList.remove("faol"));
        btn.classList.add("faol");
        tanlangan = btn.dataset.size;
        xabar.textContent = "";
        hisobla();
    });
});

son.addEventListener("input", () => {
    xabar.textContent = "";
    hisobla();
});

tanlovlar.forEach(input => {
    input.addEventListener("change", () => {
        xabar.textContent = "";
        hisobla();
    });
});

qosh.addEventListener("click", () => {
    const dona = formatSon(Number(son.value));
    const narx = jami.textContent;

    xabar.textContent = `${dona} dona ${nomlar[tanlangan]} savatga qo‘shishga tayyor. Jami: ${narx}`;
});

hisobla();
