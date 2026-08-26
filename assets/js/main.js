/* =============================================================
   Unaffordable Nostalgia — one fixed stage, in-place crossfades
   -------------------------------------------------------------
   전체가 하나의 고정 sticky 무대. 스크롤하면 장면(scene)이 제자리에서
   블러 크로스페이드로 전환된다. 섹션이 아래에서 올라오는 느낌 없음.

   장면 순서:
     KV → INFO → STATEMENT(문단) → 작가(작업·작가)×3 → 큐레이터×2 → MAP
   배경(홀로그래픽)은 KV·INFO 에서만 보이고 이후 페이드아웃.
   ============================================================= */
(function () {
  "use strict";

  // 새로고침 시 브라우저가 이전 스크롤 위치를 복원하지 않도록(항상 KV에서 시작)
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  const LANGS = ["ko", "en", "zh"];
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  function el(tag, cls, html) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function pad2(n) { return (n < 10 ? "0" : "") + n; }
  function nl2br(s) { return String(s).replace(/\n/g, "<br>"); }

  function i18n(node, map) {
    node.dataset.i18n = JSON.stringify(map);
    node.setAttribute("lang", document.body.dataset.lang);
    node.textContent = map[document.body.dataset.lang] || map.en || "";
    return node;
  }
  function i18nHTML(node, map) {
    node.dataset.i18nhtml = JSON.stringify(map);
    node.setAttribute("lang", document.body.dataset.lang);
    node.innerHTML = nl2br(map[document.body.dataset.lang] || map.en || "");
    return node;
  }
  function langMapFromValue(v) { return { ko: v, en: v, zh: v }; }

  const IMG_WORD = { ko: "이미지", en: "Image", zh: "圖" };

  function mediaIndexFor(starts, i) {
    let m = 0;
    for (let k = 0; k < starts.length; k++) { if (i >= starts[k]) m = k; else break; }
    return m;
  }

  // 문단 스택(누적): 현재(sub)=선명, 이전 문단(0..sub-1)=전부 50% 블러 흔적으로
  // 계속 남아 그 위에 새 문단이 덮인다. 아직 안 온 문단(>sub)=숨김.
  function stackPsteps(psteps, sub) {
    psteps.forEach((p, i) => {
      p.classList.toggle("is-active", i === sub);
      p.classList.toggle("is-ghost", i < sub);
    });
  }

  // trilingual columns for one paragraph
  function buildParagraphCols(bodyByLang, index) {
    const cols = el("div", "cols");
    LANGS.forEach((lang) => {
      const col = el("div", "col");
      col.dataset.lang = lang;
      col.setAttribute("lang", lang);
      col.appendChild(el("p", null, (bodyByLang[lang] || [])[index] || ""));
      cols.appendChild(col);
    });
    return cols;
  }

  /* =============================================================
     SCENE BUILDERS — 각 장면을 sticky 안의 레이어로 만들고
     { layerEl, substeps, bg, startId, apply(sub) } 를 반환한다.
     ============================================================= */

  // INFO (index.html 의 빈 레이어를 채움)
  function fillInfoLayer() {
    const layer = $("#info-layer");
    const wrap = el("div", "opening__info");
    const head = el("div", "panel__head");
    head.appendChild(el("span", "panel__eyebrow", "Unaffordable Nostalgia"));
    wrap.appendChild(head);
    const grid = el("div", "info-grid");
    SITE.info.columns.forEach((colData) => {
      const col = el("div", "info-col");
      colData.rows.forEach((row) => {
        const r = el("div", "info-row");
        r.appendChild(i18n(el("dt", "info-row__label"), row.label));
        r.appendChild(i18nHTML(el("dd", "info-row__value"), langMapFromValue(row.value)));
        col.appendChild(r);
      });
      grid.appendChild(col);
    });
    wrap.appendChild(grid);
    layer.appendChild(wrap);
  }

  // STATEMENT (index.html 의 빈 레이어를 채움)
  // 상단: "Unaffordable Nostalgia" 제목 + 하단 구분선. 그 아래 서문 본문(상→중→하 누적).
  // byline(글쓴이)은 하단 좌측. 페이지 넘버·스크롤 표시 없음.
  function fillStatementLayer() {
    const layer = $("#statement-layer");
    const s = SITE.statement;
    const nParas = (s.body.ko || s.body.en || []).length;
    const panel = el("div", "panel--statement");
    const head = el("div", "panel__head");   // 하단 구분선(border-bottom) 포함
    head.appendChild(i18n(el("span", "statement__headline"), s.title));
    panel.appendChild(head);
    const body = el("div", "panel__body");
    const psteps = [];
    for (let i = 0; i < nParas; i++) {
      const pstep = el("div", "pstep" + (i === 0 ? " is-active" : ""));
      pstep.appendChild(buildParagraphCols(s.body, i));
      body.appendChild(pstep);
      psteps.push(pstep);
    }
    panel.appendChild(body);
    // byline: 본문 3칼럼 하단에 각 언어를 해당 칼럼(1 한글 / 2 영어 / 3 중문)에 배치
    const foot = el("div", "panel__foot panel__foot--by");
    const byCols = el("div", "cols");
    LANGS.forEach((lang) => {
      const c = el("div", "col");
      c.dataset.lang = lang;
      c.setAttribute("lang", lang);
      c.appendChild(el("span", "statement__by", s.by[lang] || s.by.en || ""));
      byCols.appendChild(c);
    });
    foot.appendChild(byCols);
    panel.appendChild(foot);
    layer.appendChild(panel);
    return {
      layerEl: layer, substeps: nParas, bg: "none", startId: "statement",
      apply: (sub) => { stackPsteps(psteps, sub); }
    };
  }

  // 이미지 + 하단 텍스트 장면 (작가 작업/작가, 큐레이터)
  function buildMediaScene(sticky, opts) {
    const nSteps = (opts.paragraphs.ko || opts.paragraphs.en || []).length;
    const starts = (opts.media && opts.media.starts) || [0];
    const mediaSlides = [];
    const layer = el("div", "opening__layer scene--media");

    const media = el("div", "story__media");
    if (opts.media.mode === "dummy") {
      starts.forEach((_, m) => {
        const slide = el("div", "media__slide" + (m === 0 ? " is-active" : ""));
        const tag = el("div", "media__tag");
        const big = el("b");
        i18n(big, { ko: IMG_WORD.ko + " " + (m + 1), en: IMG_WORD.en + " " + (m + 1), zh: IMG_WORD.zh + " " + (m + 1) });
        tag.appendChild(big);
        tag.appendChild(el("small", null, (opts.eyebrow || "") + " · placeholder " + (m + 1) + "/" + starts.length));
        slide.appendChild(tag);
        media.appendChild(slide);
        mediaSlides.push(slide);
      });
    } else {
      opts.media.images.forEach((src, m) => {
        const slide = el("div", "media__slide media__slide--image" + (m === 0 ? " is-active" : ""));
        const img = el("img");
        img.src = src; img.alt = opts.eyebrow || ""; img.loading = "lazy";
        slide.appendChild(img);
        media.appendChild(slide);
        mediaSlides.push(slide);
      });
    }
    layer.appendChild(media);

    const panel = el("div", "story__panel");
    const head = el("div", "panel__head");
    if (opts.eyebrow) head.appendChild(el("span", "panel__eyebrow", opts.eyebrow));
    if (opts.title)   head.appendChild(i18n(el("span", "panel__title"), opts.title));
    if (head.childNodes.length) panel.appendChild(head);

    const body = el("div", "panel__body");
    const psteps = [];
    for (let s = 0; s < nSteps; s++) {
      const pstep = el("div", "pstep" + (s === 0 ? " is-active" : ""));
      pstep.appendChild(buildParagraphCols(opts.paragraphs, s));
      if (opts.footNote && s === nSteps - 1) pstep.appendChild(i18n(el("p", "pstep__note"), opts.footNote));
      body.appendChild(pstep);
      psteps.push(pstep);
    }
    panel.appendChild(body);

    const foot = el("div", "panel__foot");
    const count = el("span", "panel__count");
    count.innerHTML = "<b>01</b> / " + pad2(nSteps);
    foot.appendChild(count);
    if (opts.link) {
      const a = el("a", "panel__link", opts.linkLabel || "↗");
      a.href = opts.link; a.target = "_blank"; a.rel = "noopener";
      foot.appendChild(a);
    } else {
      foot.appendChild(el("span", "panel__hint", "Scroll"));
    }
    panel.appendChild(foot);
    layer.appendChild(panel);
    sticky.appendChild(layer);

    return {
      layerEl: layer, substeps: nSteps, bg: "none", startId: opts.id,
      apply: (sub, ghostSub) => {
        stackPsteps(psteps, sub, ghostSub);
        if (mediaSlides.length) {
          const m = mediaIndexFor(starts, sub);
          mediaSlides.forEach((s, i) => s.classList.toggle("is-active", i === m));
        }
        count.innerHTML = "<b>" + pad2(sub + 1) + "</b> / " + pad2(nSteps);
      }
    };
  }

  // 작가 작업(Work) 장면 — 이미지 단독(3형태)과 본문(Statement식 누적)을 번갈아
  //  · 이미지 비트: 회색 더미 박스만 전체화면 (세로=1칼럼 / 정방형=2칼럼 / 가로=3칼럼)
  //  · 텍스트 비트: 본문이 상단→중단→하단으로 쌓임. 다음 이미지가 오면 다시 이미지만.
  function buildWorkScene(sticky, opts) {
    const paras = (opts.paragraphs.ko || opts.paragraphs.en || []);

    // 작업 이미지: 실제 이미지가 제공될 때만 이미지 페이지 생성.
    //   더미 이미지는 제거됨 — 실제(고해상도) 이미지를 받으면 opts.images 로 주입만 하면
    //   이미지 페이지 + 캡션(스튜디오 원문 + 작업 제목 3언어)이 자동 복원된다.
    //   opts.images      = [{ shape:'v'|'sq'|'full', src }, ...] 본문 앞 이미지
    //   opts.imagesAfter = [...] 본문 뒤(작가 소개 앞) 이미지  — 스크롤당 1장
    const workImages = opts.images || [];
    const workImagesAfter = opts.imagesAfter || [];
    const allImages = workImages.concat(workImagesAfter);

    const beats = [];
    const paraGroupStart = {};
    workImages.forEach((_, g) => beats.push({ type: "image", imgIndex: g }));
    paras.forEach((_, i) => { beats.push({ type: "text", para: i, gStart: 0 }); paraGroupStart[i] = 0; });
    workImagesAfter.forEach((_, g) => beats.push({ type: "image", imgIndex: workImages.length + g }));

    const layer = el("div", "opening__layer scene--work");

    // 이미지 레이어 (본문 앞 + 본문 뒤 이미지를 모두 슬라이드로) — 1~2칼럼 이미지 + 옆칼럼 캡션
    const media = el("div", "work__media");
    const slides = [];
    allImages.forEach((imgData) => {
      const shape = imgData.shape || "v";
      const slide = el("div", "work__slide work__slide--" + shape);
      const box = el("div", "work__box work__box--filled");
      const img = el("img", "work__img");
      img.src = imgData.src; img.alt = opts.eyebrow || ""; img.loading = "lazy";
      box.appendChild(img);
      slide.appendChild(box);
      // 이미지 바로 옆 칼럼: 스튜디오명(원문) + 작업 제목 3언어(데스크톱은 전부, 모바일은 활성 언어만)
      const cap = el("div", "work__cap");
      if (opts.eyebrow) cap.appendChild(el("span", "work__cap-name", opts.eyebrow));
      if (opts.title) {
        LANGS.forEach((lang) => {
          const t = opts.title[lang];
          if (!t) return;
          const span = el("span", "work__cap-title", null);
          span.dataset.lang = lang;
          span.setAttribute("lang", lang);
          span.textContent = t;
          cap.appendChild(span);
        });
      }
      slide.appendChild(cap);
      media.appendChild(slide);
      slides.push(slide);
    });
    if (allImages.length) layer.appendChild(media);

    // 텍스트 레이어 (Statement식 전체화면 3칼럼)
    const text = el("div", "work__text");
    const head = el("div", "panel__head");
    if (opts.eyebrow) head.appendChild(el("span", "panel__eyebrow", opts.eyebrow));
    if (opts.title)   head.appendChild(i18n(el("span", "panel__title"), opts.title));
    text.appendChild(head);
    const body = el("div", "panel__body");
    const psteps = [];
    paras.forEach((_, i) => {
      const pstep = el("div", "pstep");
      const pos = (i - (paraGroupStart[i] || 0)) % 3;
      pstep.classList.add(pos === 0 ? "pos-top" : pos === 1 ? "pos-mid" : "pos-bot");
      pstep.appendChild(buildParagraphCols(opts.paragraphs, i));
      body.appendChild(pstep);
      psteps.push(pstep);
    });
    text.appendChild(body);
    layer.appendChild(text);

    sticky.appendChild(layer);

    return {
      layerEl: layer, substeps: beats.length, bg: "none", startId: opts.id,
      apply: (sub) => {
        const beat = beats[sub];
        if (beat.type === "image") {
          layer.classList.add("is-image");
          slides.forEach((s, i) => s.classList.toggle("is-active", i === beat.imgIndex));
          psteps.forEach((ps) => { ps.classList.remove("is-active"); ps.classList.remove("is-ghost"); });
        } else {
          layer.classList.remove("is-image");
          slides.forEach((s) => s.classList.remove("is-active"));
          psteps.forEach((ps, i) => {
            const on = i >= beat.gStart && i <= beat.para;
            ps.classList.toggle("is-active", i === beat.para);
            ps.classList.toggle("is-ghost", on && i < beat.para);
          });
        }
      }
    };
  }

  // 작가 소개/큐레이터(Bio) 장면 — 한 화면에 함께:
  //  · 상단: 초상(1칼럼 고정) + 인스타그램 링크(2칼럼 상단)
  //  · 하단(~50%): 본문 3칼럼
  function buildBioScene(sticky, opts) {
    const paras = (opts.paragraphs.ko || opts.paragraphs.en || []);
    const nParas = paras.length;
    const layer = el("div", "opening__layer scene--biocombo" + (opts.variant === "curator" ? " scene--biocombo--curator" : ""));

    // 상단: 1칼럼=초상 / 2칼럼=이름 + (부제) + 인스타그램
    const top = el("div", "biocombo__top");
    const pcol = el("div", "biocombo__portrait");
    const img = el("img", "biocombo__img");
    img.src = opts.portrait; img.alt = opts.eyebrow || ""; img.loading = "lazy";
    pcol.appendChild(img);
    top.appendChild(pcol);
    const meta = el("div", "biocombo__meta");
    if (opts.eyebrow) meta.appendChild(el("span", "panel__eyebrow biocombo__name", opts.eyebrow));
    if (opts.title)   meta.appendChild(i18n(el("span", "biocombo__sub"), opts.title));
    if (opts.link) {
      const a = el("a", "panel__link biocombo__ig", opts.linkLabel || "↗");
      a.href = opts.link; a.target = "_blank"; a.rel = "noopener";
      meta.appendChild(a);
    }
    top.appendChild(meta);
    layer.appendChild(top);

    // 하단: 본문 3칼럼 (제목·구분선 없음)
    const bottom = el("div", "biocombo__body");
    const body = el("div", "panel__body");
    const psteps = [];
    paras.forEach((_, i) => {
      const pstep = el("div", "pstep" + (i === 0 ? " is-active" : ""));
      pstep.appendChild(buildParagraphCols(opts.paragraphs, i));
      body.appendChild(pstep);
      psteps.push(pstep);
    });
    bottom.appendChild(body);
    layer.appendChild(bottom);

    sticky.appendChild(layer);

    return {
      layerEl: layer, substeps: Math.max(1, nParas), bg: "none", startId: opts.id,
      apply: (sub) => { stackPsteps(psteps, sub); }  // 초상·인스타는 항상 표시, 본문만 누적
    };
  }

  // 라벨 "6층 · 메인 전시" → ["6층", "메인 전시"] 두 부분(언어별)으로 분리
  function splitDotLabel(labelMap) {
    const a = {}, b = {};
    LANGS.forEach((l) => {
      const parts = (labelMap[l] || labelMap.en || "").split(/\s*·\s*/);
      a[l] = parts[0] || "";
      b[l] = parts.slice(1).join(" · ");
    });
    return [a, b];
  }

  // MAP (층별 도면) — 이미지는 1-2칼럼, 3칼럼에 층 라벨(작업 캡션과 동일 폰트)
  function buildMapScene(sticky, map) {
    const layer = el("div", "opening__layer scene--map2");
    const slides = [];
    map.floors.forEach((f, i) => {
      const slide = el("div", "map2__slide" + (i === 0 ? " is-active" : ""));
      // 텍스트(1칼럼 상단) 먼저, 이미지(2-3칼럼 상단) 바로 이어서
      const cap = el("div", "work__cap");
      const [top, sub] = splitDotLabel(f.label);
      cap.appendChild(i18n(el("span", "work__cap-name"), top));
      if (sub.en || sub.ko || sub.zh) cap.appendChild(i18n(el("span", "work__cap-title"), sub));
      slide.appendChild(cap);
      const box = el("div", "map2__img");
      const img = el("img"); img.src = f.img; img.alt = f.label.en || ""; img.loading = "lazy";
      box.appendChild(img);
      slide.appendChild(box);
      layer.appendChild(slide);
      slides.push(slide);
    });
    sticky.appendChild(layer);

    return {
      layerEl: layer, substeps: map.floors.length, bg: "none", startId: "map",
      apply: (sub) => { slides.forEach((s, i) => s.classList.toggle("is-active", i === sub)); }
    };
  }

  // FOOTER 장면 — 홀로그래픽 배경 위 3칼럼 크레딧 + 하단 로고/저작권 (전부 영문 Director)
  function buildFooterScene(sticky) {
    const layer = el("div", "opening__layer scene--footer2");

    function col(label, items) {
      const c = el("div", "footer2__col");
      if (label) c.appendChild(el("span", "footer2__label", label));
      items.forEach((t) => c.appendChild(el("span", "footer2__item", t)));
      return c;
    }
    const m = (typeof SITE !== "undefined" && SITE.meta) || {};
    const cols = el("div", "footer2__cols");

    // 1칼럼: 작가 + 큐레이터
    const c1 = el("div", "footer2__col");
    c1.appendChild(el("span", "footer2__label", "Artists:"));
    ["Ubac Studio (KR)", "Jang Gayoun (KR)", "Foreseen Agency (HK)"].forEach((t) => c1.appendChild(el("span", "footer2__item", t)));
    c1.appendChild(el("span", "footer2__label footer2__label--gap", "Curators:"));
    ["Kang Min-hyung (KR)", "Wong Ka Ying KY (HK)"].forEach((t) => c1.appendChild(el("span", "footer2__item", t)));
    cols.appendChild(c1);

    // 2칼럼: 전시정보(날짜/장소/시간, 영문)
    cols.appendChild(col("", [
      (m.date && m.date.en) || "", (m.place && m.place.en) || "", (m.hours && m.hours.en) || ""
    ]));

    // 3칼럼: 크레딧(같은 폰트·사이즈)
    cols.appendChild(col("", ["Designed by Studio Hik", "Installed by Tiger Wong, Mars Lai, Yiu Cheng, and Ho Sik Yin"]));

    layer.appendChild(cols);

    const bottom = el("div", "footer2__bottom");
    // 공식 로고 로크업(logos.svg) 전체폭(1-3칼럼)
    const logos = el("img", "footer2__logos");
    logos.src = "assets/svg/logos.svg"; logos.alt = "Organisers and supporters"; logos.loading = "lazy";
    bottom.appendChild(logos);
    bottom.appendChild(el("p", "footer2__copy", "© 2026 Unaffordable Nostalgia. All rights reserved."));
    layer.appendChild(bottom);

    sticky.appendChild(layer);
    return { layerEl: layer, substeps: 1, bg: "holo", startId: "footer", apply: function () {} };
  }

  /* =============================================================
     STAGE — 모든 장면을 하나의 무대에 쌓고 전역 스텝을 만든다
     ============================================================= */
  const stepRegistry = []; // {stepEl, chapter, index}

  function buildStage() {
    if (typeof SITE === "undefined") return;
    const sticky = $("#top .story__sticky");
    const stepsWrap = $("#stage-steps");
    const bg = $("#stageBg");

    // lines.svg — 고정, 배경과 텍스트 사이. KV(1스크롤)부터 계속 노출
    const lines = el("img", "stage__lines");
    lines.src = "assets/svg/lines.svg";
    lines.alt = "";
    lines.setAttribute("aria-hidden", "true");
    sticky.insertBefore(lines, sticky.firstChild);

    const scenes = [];

    // KV (기존 레이어) — 흔적(ghost) 남기지 않음
    scenes.push({ layerEl: $(".opening__layer--kv"), substeps: 1, bg: "holo", startId: null, ghostable: false, apply: function () {} });
    // INFO
    fillInfoLayer();
    scenes.push({ layerEl: $(".opening__layer--info"), substeps: 1, bg: "holo", startId: "info", apply: function () {} });
    // STATEMENT
    scenes.push(fillStatementLayer());

    // ARTISTS — 작업 소개 → 작가 소개(초상은 작가별 칼럼: 1작가 1-2칼럼, 2·3작가 2·3칼럼)
    const artistBioCols = ["col1-2", "col2", "col3"];
    SITE.artists.forEach((a, ai) => {
      scenes.push(buildWorkScene(sticky, {
        id: a.id + "-work", eyebrow: a.name,
        kicker: { ko: "작업 소개", en: "The Work", zh: "作品介紹" },
        title: a.work.title, paragraphs: a.work.body,
        images: a.work.images,          // 본문 앞 이미지([{shape,src}])
        imagesAfter: a.work.imagesAfter // 본문 뒤(작가 소개 앞) 이미지
      }));
      scenes.push(buildBioScene(sticky, {
        id: a.id + "-bio", eyebrow: a.name,
        kicker: { ko: "작가 소개", en: "About the Artist", zh: "藝術家介紹" },
        paragraphs: a.bio.body,
        portrait: a.portrait, colClass: artistBioCols[ai] || ("col" + (ai + 1)),
        link: a.instagram, linkLabel: "Instagram ↗"
      }));
    });

    // CURATORS — 초상은 칼럼 배치(둘 다 1칼럼: 1큐레이터 1칼럼, 2큐레이터 2칼럼)
    const curatorCols = ["col1", "col2"];
    SITE.curators.forEach((c, ci) => {
      scenes.push(buildBioScene(sticky, {
        id: c.id, eyebrow: c.name,
        kicker: { ko: "큐레이터", en: "Curator", zh: "策展人" },
        title: { ko: c.nameSub, en: c.nameSub, zh: c.nameSub },
        paragraphs: c.body,
        portrait: c.portrait, colClass: curatorCols[ci] || "col1",
        link: c.instagram, linkLabel: "Instagram ↗",
        variant: "curator"   // 초상=3칼럼 / 이름·정보=1칼럼 (작가와 칼럼으로 구분)
      }));
    });

    // MAP
    scenes.push(buildMapScene(sticky, SITE.map));

    // FOOTER (마지막 페이지 — 홀로그래픽 배경 위 크레딧)
    scenes.push(buildFooterScene(sticky));

    // 전역 스텝 + 무대 컨트롤러
    const globalSteps = [];
    const stage = { _active: -1 };
    scenes.forEach((scene, si) => {
      for (let sub = 0; sub < scene.substeps; sub++) {
        const stepEl = el("div", "story__step");
        if (sub === 0 && scene.startId) stepEl.id = scene.startId;
        stepsWrap.appendChild(stepEl);
        globalSteps.push({ si, sub });
        stepRegistry.push({ stepEl, chapter: stage, index: globalSteps.length - 1 });
      }
    });
    stage.apply = function (gi) {
      const g = globalSteps[gi];
      if (!g) return;
      const pg = (stage._lastGi != null && stage._lastGi !== gi) ? globalSteps[stage._lastGi] : null;
      // 이전 스텝의 텍스트를 흔적으로 남긴다 (KV 제외)
      scenes.forEach((sc, si) => {
        const isCur = si === g.si;
        const isGhost = !isCur && pg && pg.si === si && sc.ghostable !== false;
        sc.layerEl.classList.toggle("is-active", isCur);
        sc.layerEl.classList.toggle("is-ghost", isGhost);
      });
      bg.classList.toggle("is-hidden", scenes[g.si].bg !== "holo");
      // 같은 장면 안에서의 직전 문단(흔적)
      const ghostSub = (pg && pg.si === g.si) ? pg.sub : -1;
      scenes[g.si].apply(g.sub, ghostSub);
      stage._lastGi = gi;
    };
  }

  /* ---------- activate a registered step ---------- */
  function activate(ch, index) {
    if (ch._active === index) return;
    ch._active = index;
    if (ch.apply) { ch.apply(index); return; }
  }
  function scanActiveStep() {
    const mid = window.innerHeight / 2;
    for (let i = 0; i < stepRegistry.length; i++) {
      const r = stepRegistry[i];
      const rect = r.stepEl.getBoundingClientRect();
      if (rect.top <= mid && rect.bottom > mid) { activate(r.chapter, r.index); return; }
    }
  }

  /* ---------- meta (KV + footer) ---------- */
  function renderMeta() {
    $$("[data-meta]").forEach((node) => {
      const val = SITE.meta[node.dataset.meta];
      if (val && typeof val === "object") i18n(node, val);
    });
  }

  // KV 하단 정보 — 영문 1칼럼만. 언어 전환 무관.
  function renderHeroMeta() {
    const box = $("#heroMeta");
    if (!box || typeof SITE === "undefined") return;
    const m = SITE.meta;
    const col = el("div", "hero__metacol");
    col.setAttribute("lang", "en");
    [m.date, m.place, m.hours].forEach((field) => {
      col.appendChild(el("p", null, (field.en || "")));
    });
    box.appendChild(col);
  }

  /* ---------- language switching ---------- */
  function setLang(lang) {
    if (!LANGS.includes(lang)) return;
    document.body.dataset.lang = lang;
    document.documentElement.lang = lang;
    $$("[data-i18n]").forEach((node) => {
      let map; try { map = JSON.parse(node.dataset.i18n); } catch (e) { return; }
      node.setAttribute("lang", lang);
      node.textContent = map[lang] || map.en || "";
    });
    $$("[data-i18nhtml]").forEach((node) => {
      let map; try { map = JSON.parse(node.dataset.i18nhtml); } catch (e) { return; }
      node.setAttribute("lang", lang);
      node.innerHTML = nl2br(map[lang] || map.en || "");
    });
    $$(".lang-switch button").forEach((b) => b.classList.toggle("is-active", b.dataset.setLang === lang));
    try { localStorage.setItem("un-lang", lang); } catch (e) {}
  }
  function initLangSwitch() {
    $$(".lang-switch button").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.setLang)));
    let saved = null; try { saved = localStorage.getItem("un-lang"); } catch (e) {}
    setLang(saved && LANGS.includes(saved) ? saved : document.body.dataset.lang);
  }

  /* ---------- scroll progress + step scan ---------- */
  function initScrollFx() {
    const fill = $(".progress-rail__fill");
    let ticking = false;
    function update() {
      const st = window.scrollY || document.documentElement.scrollTop;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? Math.min(1, st / h) : 0;
      if (fill) fill.style.height = (p * 100).toFixed(2) + "%";
      scanActiveStep();
      ticking = false;
    }
    window.addEventListener("scroll", () => { if (!ticking) { window.requestAnimationFrame(update); ticking = true; } }, { passive: true });
    update();
  }

  document.addEventListener("DOMContentLoaded", function () {
    buildStage();      // 스텝을 만들어 문서가 완전한 높이가 된 뒤에 스크롤을 리셋해야 함
    renderMeta();
    renderHeroMeta();
    initLangSwitch();
    initScrollFx();
    window.__scanActiveStep = scanActiveStep;

    // 새로고침(reload)이면 해시가 있어도 항상 최상단(KV)에서 시작.
    // 외부 딥링크(#statement 등으로 처음 방문)는 그대로 해당 섹션으로 이동.
    // buildStage 이후(문서 최종 높이)와 load/pageshow 시점에 재확인해야 브라우저의
    // 스크롤 복원/스냅이 최하단으로 튀는 것을 막을 수 있다.
    const navEntry = (performance.getEntriesByType && performance.getEntriesByType("navigation")[0]) || null;
    const isReload = navEntry ? navEntry.type === "reload"
                              : (performance.navigation && performance.navigation.type === 1);
    function resetTop() { if (isReload || !location.hash) window.scrollTo(0, 0); }
    resetTop();
    requestAnimationFrame(function () { resetTop(); scanActiveStep(); });
    window.addEventListener("load", function () { resetTop(); scanActiveStep(); });
    window.addEventListener("pageshow", resetTop);  // bfcache 복원 대응
  });
})();
