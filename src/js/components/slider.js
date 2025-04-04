const swiffyslider = {
    version: "1.6.0",
    init(e = document.body) {
        for (let t of e.querySelectorAll(".swiffy-slider")) this.initSlider(t);
    },
    initSlider(e) {
        for (let t of e.querySelectorAll(".slider-nav")) {
            let i = t.classList.contains("slider-nav-next");
            t.addEventListener("click", () => this.slide(e, i), { passive: !0 });
        }
        for (let t of e.querySelectorAll(".slider-indicators")) t.addEventListener("click", () => this.slideToByIndicator()), this.onSlideEnd(e, () => this.handleIndicators(e), 0);
        if (e.classList.contains("slider-nav-autoplay")) {
            const t = e.getAttribute("data-slider-nav-autoplay-interval") ? e.getAttribute("data-slider-nav-autoplay-interval") : 2500;
            this.autoPlay(e, t, e.classList.contains("slider-nav-autopause"));
        }
        if (["slider-nav-autohide", "slider-nav-animation"].some((t) => e.classList.contains(t))) {
            const t = e.getAttribute("data-slider-nav-animation-threshold") ? e.getAttribute("data-slider-nav-animation-threshold") : 0.3;
            this.setVisibleSlides(e, t);
        }
    },
    setVisibleSlides(e, t = 0.3) {
        let i = new IntersectionObserver(
            (t) => {
                t.forEach((e) => {
                    e.isIntersecting ? e.target.classList.add("slide-visible") : e.target.classList.remove("slide-visible");
                }),
                    e.querySelector(".slider-container>*:first-child").classList.contains("slide-visible") ? e.classList.add("slider-item-first-visible") : e.classList.remove("slider-item-first-visible"),
                    e.querySelector(".slider-container>*:last-child").classList.contains("slide-visible") ? e.classList.add("slider-item-last-visible") : e.classList.remove("slider-item-last-visible");
            },
            { root: e.querySelector(".slider-container"), threshold: t }
        );
        for (let t of e.querySelectorAll(".slider-container>*")) i.observe(t);
    },
    slide(e, t = !0) {
        const i = e.querySelector(".slider-container"),
            s = e.classList.contains("slider-nav-page"),
            l = e.classList.contains("slider-nav-noloop"),
            r = e.classList.contains("slider-nav-nodelay"),
            o = i.children,
            n = parseInt(window.getComputedStyle(i).columnGap),
            a = o[0].offsetWidth + n;
        let d = t ? i.scrollLeft + a : i.scrollLeft - a;
        s && (d = t ? i.scrollLeft + i.offsetWidth : i.scrollLeft - i.offsetWidth),
            i.scrollLeft < 1 && !t && !l && (d = i.scrollWidth - i.offsetWidth),
            i.scrollLeft >= i.scrollWidth - i.offsetWidth && t && !l && (d = 0),
            i.scroll({ left: d, behavior: r ? "auto" : "smooth" });
    },
    slideToByIndicator() {
        const e = window.event.target,
            t = Array.from(e.parentElement.children).indexOf(e),
            i = e.parentElement.children.length,
            s = e.closest(".swiffy-slider"),
            l = (s.querySelector(".slider-container").children.length / i) * t;
        this.slideTo(s, l);
    },
    slideTo(e, t) {
        const i = e.querySelector(".slider-container"),
            s = parseInt(window.getComputedStyle(i).columnGap),
            l = i.children[0].offsetWidth + s,
            r = e.classList.contains("slider-nav-nodelay");
        i.scroll({ left: l * t, behavior: r ? "auto" : "smooth" });
    },
    onSlideEnd(e, t, i = 125) {
        let s;
        e.querySelector(".slider-container").addEventListener(
            "scroll",
            function () {
                window.clearTimeout(s), (s = setTimeout(t, i));
            },
            { capture: !1, passive: !0 }
        );
    },
    autoPlay(e, t, i) {
        t = t < 750 ? 750 : t;
        let s = setInterval(() => this.slide(e), t);
        const l = () => this.autoPlay(e, t, i);
        return (
            i &&
            (["mouseover", "touchstart"].forEach(function (t) {
                e.addEventListener(
                    t,
                    function () {
                        window.clearTimeout(s);
                    },
                    { once: !0, passive: !0 }
                );
            }),
                ["mouseout", "touchend"].forEach(function (t) {
                    e.addEventListener(
                        t,
                        function () {
                            l();
                        },
                        { once: !0, passive: !0 }
                    );
                })),
            s
        );
    },
    handleIndicators(e) {
        if (!e) return;
        const t = e.querySelector(".slider-container"),
            i = t.scrollWidth - t.offsetWidth,
            s = t.scrollLeft / i;
        for (let t of e.querySelectorAll(".slider-indicators")) {
            let e = t.children,
                i = Math.abs(Math.round((e.length - 1) * s));
            for (let t of e) t.classList.remove("active");
            e[i].classList.add("active");
        }
    },
};
(window.swiffyslider = swiffyslider),
    document.currentScript.hasAttribute("data-noinit") ||
    (document.currentScript.hasAttribute("defer")
        ? swiffyslider.init()
        : (document.onreadystatechange = () => {
            "interactive" === document.readyState && swiffyslider.init();
        }));
//# sourceMappingURL=swiffy-slider.min.js.map
const swiffysliderextensions = { version: "1.6.0", draggingtimer: null, init(e = document.body) { for (const s of e.querySelectorAll(".swiffy-slider")) this.initSlider(s) }, initSlider(e) { e.classList.contains("slider-nav-mousedrag") && e.addEventListener("mousedown", s => this.handleMouseDrag(s, e), { passive: !0 }) }, handleMouseDrag(e, s) { if (e.srcElement.classList.contains("slider-nav") || e.srcElement.parentElement.classList.contains("slider-indicators")) return; const t = s.querySelector(".slider-container"); s.classList.contains("dragging") && clearTimeout(this.draggingtimer), t.style.cursor = "grabbing", s.classList.add("dragging"); const i = t.scrollLeft, n = e.clientX, r = t.children[0].offsetWidth + parseInt(window.getComputedStyle(t).columnGap), o = r * (t.children.length - 1), l = t.scrollLeft; let d = l; const a = e => { const s = e.clientX - n, a = i - 1.8 * s; a > 0 && a <= o && (t.scrollLeft = a, s < 0 ? d = o <= l ? l : t.scrollLeft + (r + 1.8 * s) : l > 0 && (d = t.scrollLeft - (r - 1.8 * s))) }; t.addEventListener("mousemove", a, { passive: !0 }), document.addEventListener("mouseup", () => { t.removeEventListener("mousemove", a), t.style.cursor = null, d < 0 && (d = 0), t.scroll({ left: d, behavior: "smooth" }), this.draggingtimer = setTimeout(() => { s.classList.remove("dragging") }, 550) }, { once: !0, passive: !0 }) } }; window.swiffyslider.extensions = swiffysliderextensions, document.currentScript.hasAttribute("data-noinit") || window.addEventListener("load", () => { swiffyslider.extensions.init() });
//# sourceMappingURL=swiffy-slider-extensions.min.js.map