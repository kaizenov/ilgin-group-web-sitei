(function () {
  const telefon = "905433158999";
  const kisaMesaj = "Merhaba, ILGIN GROUP hizmetleri hakkında bilgi almak istiyorum.";

  function splashEkraniHazirla() {
    if (!document.body || document.querySelector(".splash-screen")) {
      return;
    }

    const splash = document.createElement("div");
    splash.className = "splash-screen";
    splash.setAttribute("aria-hidden", "true");
    splash.innerHTML = [
      '<div class="splash-content">',
      '<img class="splash-logo" src="yenilogo.png" alt="">',
      "</div>"
    ].join("");
    document.body.insertBefore(splash, document.body.firstChild);
  }

  function whatsappBaglantisi(mesaj) {
    return "https://wa.me/" + telefon + "?text=" + encodeURIComponent(mesaj);
  }

  splashEkraniHazirla();

  window.addEventListener("load", function () {
    window.setTimeout(function () {
      document.body.classList.add("site-loaded");
    }, 850);
  });

  document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.querySelector(".nav-toggle");
    const navDropdowns = document.querySelectorAll(".nav-dropdown");

    function kapatDropdownlar() {
      navDropdowns.forEach(function (dropdown) {
        const toggle = dropdown.querySelector(".nav-dropdown-toggle");
        dropdown.classList.remove("is-open");
        if (toggle) {
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }

    if (navToggle) {
      navToggle.addEventListener("click", function () {
        const acik = document.body.classList.toggle("menu-open");
        navToggle.setAttribute("aria-expanded", acik ? "true" : "false");
        if (!acik) {
          kapatDropdownlar();
        }
      });
    }

    navDropdowns.forEach(function (dropdown) {
      const toggle = dropdown.querySelector(".nav-dropdown-toggle");
      if (!toggle) {
        return;
      }

      toggle.addEventListener("click", function (event) {
        if (!window.matchMedia("(max-width: 900px)").matches && !document.body.classList.contains("menu-open")) {
          return;
        }

        event.preventDefault();
        event.stopImmediatePropagation();
        const acik = dropdown.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", acik ? "true" : "false");
      });
    });

    document.querySelectorAll(".site-nav a").forEach(function (link) {
      link.addEventListener("click", function () {
        document.body.classList.remove("menu-open");
        kapatDropdownlar();
        if (navToggle) {
          navToggle.setAttribute("aria-expanded", "false");
        }
      });
    });

    document.querySelectorAll("[data-whatsapp]").forEach(function (link) {
      const mesaj = link.getAttribute("data-whatsapp") || kisaMesaj;
      link.setAttribute("href", whatsappBaglantisi(mesaj));
    });

    document.querySelectorAll("[data-year]").forEach(function (node) {
      node.textContent = new Date().getFullYear();
    });

    const form = document.getElementById("appointmentForm");
    if (!form) {
      return;
    }

    const urunSecimi = form.querySelector("[name='urun']");
    const params = new URLSearchParams(window.location.search);
    const urun = params.get("urun");
    if (urunSecimi && urun) {
      Array.from(urunSecimi.options).forEach(function (option) {
        const secenek = option.value.toLowerCase();
        const gelen = urun.toLowerCase();
        if (secenek === gelen || secenek.indexOf(gelen) === 0) {
          urunSecimi.value = option.value;
        }
      });
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const veri = new FormData(form);
      const adSoyad = veri.get("adSoyad") || "";
      const musteriTelefon = veri.get("telefon") || "";
      const secilenUrun = veri.get("urun") || "";
      const adres = veri.get("adres") || "";
      const tarih = veri.get("tarih") || "";
      const saat = veri.get("saat") || "";
      const not = veri.get("not") || "";

      const mesaj = [
        "Merhaba ILGIN GROUP, yeni randevu talebim var.",
        "",
        "Ad Soyad: " + adSoyad,
        "Telefon: " + musteriTelefon,
        "İlgilendiğim Ürün: " + secilenUrun,
        "Adres: " + adres,
        "Tercih Edilen Tarih: " + (tarih || "Belirtilmedi"),
        "Tercih Edilen Saat: " + (saat || "Belirtilmedi"),
        "Not: " + (not || "Belirtilmedi")
      ].join("\n");

      const durum = form.querySelector(".form-status");
      if (durum) {
        durum.textContent = "WhatsApp mesajı hazırlandı. Açılan ekranda gönder tuşuna basabilirsiniz.";
      }

      window.open(whatsappBaglantisi(mesaj), "_blank", "noopener,noreferrer");
    });
  });
})();
