(() => {
  "use strict";
  const config = window.HANGER18;
  const el = (tag, className, content) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (content !== undefined) node.textContent = content;
    return node;
  };
  const link = (label, href, cls, external = false) => {
    const node = el("a", cls, label);
    node.href = href;
    if (external) { node.target = "_blank"; node.rel = "noopener noreferrer"; }
    return node;
  };
  const contact = config.contactEmail;
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("contact-email").textContent = contact;
  document.getElementById("contact-email").href = `mailto:${contact}`;
  document.getElementById("booking-email").href = `mailto:${contact}?subject=${encodeURIComponent("Tattoo booking inquiry")}`;

  const menu = document.querySelector(".menu-toggle");
  const nav = document.getElementById("main-nav");
  function closeMenu() { menu.setAttribute("aria-expanded", "false"); menu.setAttribute("aria-label", "Open menu"); nav.classList.remove("is-open"); }
  menu.addEventListener("click", () => {
    const open = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", String(open)); menu.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("is-open", open);
  });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", ev => { if (ev.key === "Escape") closeMenu(); });

  const index = document.getElementById("artist-index");
  const profiles = document.getElementById("artist-profiles");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");
  document.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("click", ev => { if (ev.target === lightbox) lightbox.close(); });

  function setPhoto(container, path, alt, className) {
    if (!path) return false;
    const img = el("img", className || "");
    img.src = path; img.alt = alt; img.loading = "lazy";
    img.addEventListener("error", () => { img.remove(); container.classList.remove("has-photo"); });
    container.append(img);
    container.classList.add("has-photo");
    return true;
  }

  config.artists.forEach((artist, idx) => {
    // Five compact index cards serve as the visual artist directory.
    const card = link("", `#${artist.id}`, "artist-index-card");
    card.setAttribute("aria-label", `Meet ${artist.name}`);
    const cardPhoto = el("div", "index-portrait");
    const artInitial = el("span", "initial", artist.name.split(" ").map(s => s[0]).slice(0, 2).join(""));
    cardPhoto.append(artInitial);
    setPhoto(cardPhoto, artist.portrait, `${artist.name}, tattoo artist`, "index-image");
    card.append(cardPhoto);
    const cardFoot = el("div", "index-foot");
    const id = el("span", "index-num", artist.number);
    const name = el("strong", "index-name", artist.name);
    const arrow = el("span", "index-arrow", "↗"); arrow.setAttribute("aria-hidden", "true");
    cardFoot.append(id, name, arrow); card.append(cardFoot); index.append(card);

    const section = el("section", "artist-profile section-pad");
    section.id = artist.id; section.setAttribute("aria-labelledby", `${artist.id}-heading`);
    if (idx % 2 === 1) section.classList.add("profile-alt");
    const wrap = el("div", "container");
    const topline = el("div", "profile-rule");
    topline.append(el("span", "section-kicker", `ARTIST PROFILE / ${artist.number}`), el("span", "profile-identifier", "H18 TATTOO COLLECTIVE"));
    wrap.append(topline);
    const layout = el("div", "profile-grid");
    const visual = el("div", "profile-photo");
    visual.append(el("span", "profile-photo-initial", artist.name.split(" ").map(s => s[0]).slice(0,2).join("")));
    visual.append(el("span", "profile-photo-label", "ARTIST PORTRAIT / COMING SOON"));
    setPhoto(visual, artist.portrait, `Portrait of ${artist.name}`, "portrait-img");
    layout.append(visual);
    const body = el("div", "profile-body");
    body.append(el("p", "profile-role", artist.role));
    const heading = el("h3", "profile-name", artist.name);
    heading.id = `${artist.id}-heading`;
    body.append(heading);
    body.append(el("p", "profile-bio", artist.bio));
    if (artist.specialties && artist.specialties.length) {
      const tags = el("div", "tags");
      artist.specialties.forEach(tag => tags.append(el("span", "tag", tag)));
      body.append(tags);
    }
    const btns = el("div", "profile-buttons");
    const bookingHref = artist.bookingUrl || `mailto:${contact}?subject=${encodeURIComponent(`Booking inquiry — ${artist.name}`)}`;
    btns.append(link("BOOK WITH " + artist.name.split(" ")[0].toUpperCase() + " ↗", bookingHref, "btn btn-small btn-filled", bookingHref.startsWith("https://")));
    if (artist.instagram) btns.append(link("INSTAGRAM ↗", artist.instagram, "btn btn-small btn-quiet", true));
    body.append(btns);
    const galleryHeader = el("div", "gallery-header");
    galleryHeader.append(el("strong", "", "SELECTED WORK"), el("small", "PORTFOLIO / 03"));
    body.append(galleryHeader);
    const gallery = el("div", "work-grid");
    for (let i = 0; i < 3; i++) {
      const item = artist.work && artist.work[i];
      if (item) {
        const work = typeof item === "string" ? {src: item, alt: `Tattoo by ${artist.name}`} : item;
        const button = el("button", "work-item work-photo");
        button.type = "button"; button.setAttribute("aria-label", `View tattoo ${i+1} by ${artist.name}`);
        const img = el("img", ""); img.src = work.src; img.alt = work.alt || `Tattoo by ${artist.name}`; img.loading = "lazy";
        img.addEventListener("error", () => { button.replaceWith(makePlaceholder(i)); });
        button.append(img);
        button.addEventListener("click", () => {
          lightboxImg.src = work.src;
          lightboxImg.alt = work.alt || `Tattoo by ${artist.name}`;
          lightboxCaption.textContent = artist.name + " / SELECTED WORK";
          lightbox.showModal();
        });
        gallery.append(button);
      } else gallery.append(makePlaceholder(i));
    }
    body.append(gallery);
    layout.append(body); wrap.append(layout); section.append(wrap); profiles.append(section);
  });

  function makePlaceholder(i) {
    const tile = el("div", "work-item work-placeholder");
    tile.append(el("span", "work-placeholder-symbol", "✳"), el("small", "WORK / 0" + (i + 1)));
    return tile;
  }

  // Let anchor links and CSS handle scrolling. No JS frameworks or build steps required.
})();
