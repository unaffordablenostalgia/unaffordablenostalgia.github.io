/* =============================================================
   Unaffordable Nostalgia / 幾堪回首 — content data
   -------------------------------------------------------------
   원고 출처: "bio and statement (July 15).md"
   섹션 순서: KV(hero) → info → statement → 작가3(작업+작가) →
             큐레이터2 → map

   각 텍스트는 3개 언어(ko / en / zh). body 는 문단 배열이며
   한 문단 = 스크롤 스텝 1개.
   `mediaStarts`: 이미지가 바뀌는 문단 인덱스(0부터). 예) [0,4].
   ============================================================= */

const SITE = {
  langLabels: { ko: "한국어", en: "English", zh: "中文" },

  meta: {
    title: "Unaffordable Nostalgia",
    cnTitle: "幾堪回首",
    date:  { ko: "2026.08.20 – 11.07", en: "20 Aug – 7 Nov 2026", zh: "2026.08.20 – 11.07" },
    place: {
      ko: "주홍콩한국문화원 · PMQ, 홍콩",
      en: "Korean Cultural Center · PMQ, Hong Kong",
      zh: "駐香港韓國文化院 · PMQ, 香港"
    },
    hours: {
      ko: "화–토 10:00–18:00 (월·일·공휴일 휴관)",
      en: "Tue–Sat 10:00–18:00 (Closed Mon, Sun & PH)",
      zh: "週二至週六 10:00–18:00（週一、日及公眾假期休館）"
    }
  },

  /* ---------------- INFO ---------------- */
  info: {
    kicker: { ko: "인포메이션", en: "Information", zh: "資訊" },
    columns: [
      {
        head: { ko: "일정 · 장소", en: "Schedule & Venue", zh: "日程 · 地點" },
        rows: [
          { label: { ko: "기간", en: "Dates", zh: "日期" },
            value: "20 Aug – 7 Nov 2026\nTue–Sat, 10:00–18:00\nClosed Mon, Sun & public holidays" },
          { label: { ko: "장소", en: "Venue", zh: "場地" },
            value: "Korean Cultural Center in Hong Kong\n6–7/F Block B, PMQ,\n35 Aberdeen Street, Central, Hong Kong" }
        ]
      },
      {
        head: { ko: "참여", en: "People", zh: "參與" },
        rows: [
          { label: { ko: "작가", en: "Artists", zh: "藝術家" },
            value: "Ubac Studio (KR)\nJang Gayoun (KR)\nforeseen agency (HK)" },
          { label: { ko: "큐레이터", en: "Curators", zh: "策展人" },
            value: "Kang Min-hyung (KR)\nWong Ka Ying (HK)" }
        ]
      },
      {
        head: { ko: "프로그램", en: "Program", zh: "節目" },
        rows: [
          { label: { ko: "공공 프로그램", en: "Public Program", zh: "公共節目" },
            value: "Artists Talk · 20 Aug 17:00–18:00\nCurator’s Tour · 20 Aug 18:45–19:30" }
        ]
      }
    ]
  },

  /* ---------------- STATEMENT ---------------- */
  statement: {
    kicker: { ko: "전시 서문", en: "Statement", zh: "前言" },
    title:  { ko: "Unaffordable Nostalgia", en: "Unaffordable Nostalgia", zh: "幾堪回首" },
    by:     { ko: "글. 강민형 & 웡카잉", en: "by Kang Min-hyung & Wong Ka Ying", zh: "文：姜旻亨 及 黃嘉瀛" },
    body: {
      ko: [
        "더 이상 존재하지 않는 것을 기억하기 위해 우리는 어떤 대가를 치르는가?",
        "Unaffordable Nostalgia는 한국과 홍콩의 작가/컬렉티브 세 팀과 큐레이터 두 명의 작업을 보여주는 전시로, 각 도시의 도시개발, 기억, 그리고 후기 자본주의에 대해 이야기한다. 이들의 연구는 동시대 도시개발의 감춰진 지층을 드러내고, 기억이 어떻게 그 지층을 표면으로 끌어올리는 하나의 화폐로 작동하는지를 살핀다.",
        "우박 스튜디오(한국)는 사이버-지질학적 접근으로 이 지층을 탐구하며, 삭제된 스트리트뷰와 인공지능이 걸러내서 기록에서 지워진 데이터를 결합한 인터랙티브 게임 〈Escape Maps〉를 선보인다. 관람객은 게임의 능동적 사용자이자 동시에 플랫폼의 주체가 되어, 자신에게 제시된 시스템을 둘러본다. 소외된 도시개발의 모습을 드러내는 게임의 서사는 자본이 이끄는 미래상과 나란히 놓인다. 이 가상의 배경은 전시가 열리는 PMQ(할리우드 로드에 위치한 옛 기혼 경찰관 숙소) 바깥의 거리 풍경과 밀접하게 연결된다.",
        "Foreseen Agency(홍콩)는 거리에서 PMQ까지 이어지는 도보 경로를 계단 이음새 사이로 자라난 고사리와 이끼를 통해 재연한다. 〈Connected Mosses〉는 철제 계단에 설치된 열두 개의 스크린을 통해 시시포스적인 오르막과 마찰 없는 에스컬레이터 탑승을 하나의 가상 톱니바퀴 시스템으로 보여준다. 전자의 탈진은 그것이 보이는 것이든 보이지 않는 것이든 후자의 편안함의 동력이다. 영국령 홍콩 시절의 돌계단과 끊임없이 자라나며 표면을 잠식하는 식물에 대한 노스탤지어는 그때 그 계단을 오르던 이들과 지금 오르는 이들이 여전히 갚고 있는 빚을 은폐한다.",
        "장가연(한국)은 상업 트렌드가 어떻게 기억과 과거를 포장해 판매하는지를 연구한다. 그의 작업 〈Placeless in the Gyeongseong Era〉는 동시대 도시 환경이 식민지 유산을 외면한 채 과거를 소비하는 방식을 보여준다. 이른바 근대의 요소들을 동시대 상업 공간에 강제로 삽입함으로써, 건축은 소셜미디어 사진을 위한 배경을 제공하는 정도로만 과거를 재연한다.",
        "조해나 드러커(Johanna Drucker)의 디지털 인문학 이론에서 인용한 데이터(data)와 캡타(capta)의 이론은 세 작업 모두를 관통한다. 라틴어 datum에서 온 데이터는 단순히 “주어진 것”을 의미하며, 중립적이고 발견되기를 기다린다는 함의를 지닌다. 반면 capere(“취하다”)에서 온 캡타는 정보란 언제나 특정한 위치에서, 특정한 목적을 위해, 누군가에 의해 포획되고 선별되고 구성된 것임을 강조한다. 이 전시는 캡타를 큐레이토리얼 전제로 삼는다.",
        "이 전시 속의 아트 앤 테크놀로지는 이미 대부분 사라져 버린 과거로 우리를 돌려세운다. 그리고 이 전시는 기억하는 행위마저 우리 능력 밖이 되기 전에 잠시나마 멈출 수 있는 순간을 제공한다. 서울과 홍콩의 도시개발은 식민지 유산이 어떻게 트렌드로 재포장되어 소비되는지를 드러낸다.",
        "한 번도 가져본 적 없는 것을 그리워한다는 것은 무엇을 의미하는가? 식민주의자들이 남기고 간 것을 동경한다는 것은 무엇을 의미하는가? PMQ는 그 증거이자 인터페이스가 되며, 감시의 유산과 공공의 요구가 여기서 마주한다. 노스탤지어에 치뤄야 할 대가가 있다면, 우리에게 아직 남아 있는 마지막 능력은, 우리의 동의 없이 강요된 것과 오늘날 우리가 이 도시 속에서 마주해야 할 것을 돌아보는 것에 있을지도 모른다. 우리가 치러야 할, 감당할 수 없는 너무 비싼 그 대가 말이다."
      ],
      en: [
        "How does one afford to remember something that no longer exists?",
        "The exhibition Unaffordable Nostalgia brings together the work of three artists/collectives and two curators from South Korea and Hong Kong to explore urban development, memory, and post-capitalism in their respective cities. Their research uncovers a hidden stratum of contemporary urban development and examines how memory functions as a currency that brings that stratum to the surface.",
        "Ubac Studio (KR) investigates this stratum through a cyber-geological approach, creating an interactive game, Escape Maps, that combines deleted street views with de-recorded data filtered by artificial intelligence. Visitors participate as both active users of the game and subjects of the platform, investigating the system presented to them. The game’s narrative reveals marginalized urban development alongside a capital-driven vision of the future. Its virtual setting closely reflects the streets outside PMQ (the former Police Married Quarters on Hollywood Road), where the exhibition is held.",
        "Foreseen Agency (HK) reenacts the route taken on foot from street level to PMQ, through the ferns and moss growing in between joints of the steps. In Connected Mosses, twelve screens mounted on a steel staircase stage a Sisyphean climb and a frictionless escalator ride as parts of a single virtual gear system. The exhaustion of the former, both visible and invisible, powers the ease of the latter. Nostalgia for British Hong Kong’s stone steps and ever-growing, scraping plants conceals a debt still being paid by those who climbed then and those who climb now.",
        "Jang Gayoun (KR) examines how commercial trends package and sell memory and the past. In her work, Placeless in the Gyeongseong Era, she shows how the contemporary urban environment consumes the past while disregarding its colonial legacy. By forcibly inserting elements of the so-called modern era into contemporary commercial space, the architecture reenacts the past only to the extent needed to provide a backdrop for social-media photographs.",
        "Running through all three practices is a distinction drawn from Johanna Drucker’s theory in the digital humanities: the difference between data and capta. Data, from the Latin datum, implies something simply “given”: neutral, pre-existing, and waiting to be found. Capta, from capere, “to take,” instead emphasizes that information is always seized, selected, and constructed by someone, from a particular position and for a particular purpose. This exhibition therefore takes capta as its curatorial premise.",
        "What the show offers is a moment of pause, when the art and technology on display turn us back toward a past that has mostly disappeared — before even the act of remembering it slips beyond our reach. Urban development in Seoul and Hong Kong reveals how colonial legacies are repackaged and consumed as trends.",
        "What does it mean to miss something we never had? What does it mean to yearn for what colonialists left behind? PMQ becomes both evidence and interface, a site where the legacies of surveillance meet public inquiry. If nostalgia has a price, perhaps the last thing still within our means is the act of looking back while we still can, connecting what was imposed on us without our consent to what we are left to face in these cities: the unbearable, unaffordable cost we must pay."
      ],
      zh: [
        "我們如何承擔記住那些早已消逝之物的代價？",
        "本展覽匯聚三組來自韓國及香港的藝術家（團體）與兩位策展人，探討兩地城市中的都市發展、記憶與後資本主義，藉研究探析潛藏在當代城市發展表象之下、被忽略的記憶結構。記憶成為了流通的資本貨幣，持續推動其上方的城市景觀加速變動、空間生產與價值累積。",
        "Ubac Studio（韓國）以賽博地質學的方法探索城市的表層，創作出結合已被刪除的街景影像、以及經人工智能篩選後被撤除記錄的資料的互動遊戲《Escape Maps》。觀眾既是遊戲的活躍玩家，也是平台所觀察與處理的對象，在參與過程中審視呈現於眼前的系統。遊戲敘事擴展至城市發展中被邊緣化的現實，並將之與資本主導的未來想像並置。作品中的虛擬場景亦與展覽場地 PMQ 元創方（前荷李活道已婚警察宿舍）外的街道環境緊密呼應。",
        "Foreseen Agency（香港）沿着從街道步行登上 PMQ 的路徑，借於石級接縫之間生長的蕨類與苔蘚，重新演繹這段上行經驗。在《Connected Mosses》中，十二個安裝於鋼製樓梯上的屏幕，將西西弗斯式的攀登與毫不費力的扶手電梯行程，呈現為同一套虛擬齒輪系統的組成部分。前者可見與不可見的疲憊，為後者的輕鬆運行提供動力。對英治香港石階，以及在其間不斷蔓生、刮擦石面的植物之懷舊想像，掩蓋了一筆由昔日與今天攀登的人共同承擔、至今仍在償還的勞力債。",
        "張佳延（韓國）探討商業潮流如何包裝及販售記憶與過去。在《流離失所的京城時代》中，她展示了當代城市環境如何消費過去，同時漠視其殖民遺緒。建築把所謂「近代」的元素強行置入當代商業空間，只在足以成為社交媒體照片背景的程度上重演過去。",
        "貫穿三組創作實踐的，是數碼人文學者 Johanna Drucker 所提出的一項重要區分：data 與 capta 之別。Data 源自拉丁文 datum，意指單純「被給予之物」——中立、預先存在，並等待人們發現。Capta 則源自 capere，意指「擷取」；它強調資訊從來都是由某人從特定位置、基於特定目的加以擷取、選擇及建構。因此，本展覽以 capta 作為策展前提。",
        "趁連記憶本身都讓人無力負擔之前，展覽提供暫停的剎那，以藝術與科技重新回望大多已經消逝的過去。首爾與香港的都市發展，暴露了殖民遺緒如何被重新包裝，並作為潮流被消費。",
        "思念一件我們從未擁有過的事物，意味著甚麼？渴望殖民者遺留下來的一切，又意味著甚麼？PMQ 在此同時成為證據與介面，成為監控遺緒與公眾探問交會之地。假如懷舊有其代價，也許我們最後仍能負擔的，只有在回望尚未成為奢侈之前，重新審視那些未經同意便被強加於我們的歷史，並將之與今日城市所遺留的現實連結起來——一筆我們不得不承受、卻又無力付訖的成本。"
      ]
    }
  },

  /* ---------------- ARTISTS ---------------- */
  artists: [
    {
      id: "ubac",
      name: "Ubac Studio",
      origin: "KR",
      portrait: "assets/img/portrait-ubac.jpg",
      instagram: "https://www.instagram.com/ubac_studio",
      work: {
        title: { ko: "맵 탈출 투어", en: "Escape Maps", zh: "逃逸地圖" },
        medium: {
          ko: "데이터 시각화, 설치, 인터랙티브, 커스텀 앱, 가변 크기, 2022",
          en: "Data Visualization, Installation, Interactive, Custom App, Dimensions Variable, 2022",
          zh: "數據視覺化、裝置、互動、定制應用程式，尺寸可變，2022"
        },
        mediaStarts: [0],
        body: {
          ko: [
            "《맵 탈출 투어: Escape Maps》는 핸드 드로잉, 이미지와 공간 스캔 데이터 기반으로 디지털 지도를 재구성하고, 그 공간을 탐험하는 몰입형 인터랙티브 경험이다. 이 프로젝트는 ‘지도를 탈출하는’ 게임 플레이어들의 행동에서 영감을 받았다.",
            "게임 내 버그를 이용해 미지의 영역을 탐험하는 ‘지도 탈출 플레이어’처럼, 디지털 지도의 경계를 탐험한다. 데이터를 추출할 수 없어 제거된 스트리트 뷰, 인식될 수 없는 보행자, 데이터적으로 소외된 재개발지역 등 데이터 시스템의 선택과 배제 과정에서 얽혀 있는 요소를 허구, 인터뷰, 사변적 스토리텔링으로 구성된 하나의 서사로 엮어낸다. 관객은 마치 디지털 지도를 탐색하듯 작품을 탐험하며, 시스템이 지도 밖으로 밀어낸 사건과 감각적 잔여물을 마주한다."
          ],
          en: [
            "Escape Maps reconstructs a digital map using hand drawings, image captures, and spatial scan data. Drawing inspiration from game players who exploit glitches to escape beyond the boundaries of unfinished maps, the project investigates the invisible boundaries and hidden layers embedded within contemporary mapping systems.",
            "The work gathers elements entangled in the data system’s processes of selection and exclusion — street views removed due to unextractable data, unrecognizable pedestrians, redevelopment areas marginalized within data infrastructures, an online club of transparency advocates — and weaves them into a narrative composed of fiction, interviews, and speculative storytelling. As audiences explore the work as if navigating a digital map, they encounter events and sensory remnants that the system has pushed off the map."
          ],
          zh: [
            "《Escape Maps》是一幅結合手繪、影像截取及空間掃描數據再重構的數碼地圖，觀眾可以置身其中，展開沉浸式互動探索。作品靈感源自那些會利用遊戲程式漏洞（glitch）逃逸出未完成地圖邊界的玩家（「地圖脫逃者」），遊走於未知領域之中。項目藉此探問當代地圖繪測系統中隱形的邊界與被隱藏的層次。",
            "作品搜集了在數據系統「篩選」與「排除」過程中糾纏浮現的種種元素，例如因數據無法擷取而被移除的街景、無法被系統識別的行人、在數據基建中被邊緣化的重建地區、一個提倡透明化的網上組織等，並將之編織成一段由虛構、訪談與思辨敍事交織而成的故事。觀眾可像瀏覽數碼地圖般探索此作品，然後在旅途中遇上種種被系統推出地圖之外的事件與感官殘餘。"
          ]
        }
      },
      bio: {
        body: {
          ko: [
            "우박 스튜디오는 우현주, 박지윤으로 구성된 미디어 아티스트 듀오다. XR 기반의 인터랙티브 설치를 중심으로 다양한 형식을 넘나들며, 기술이 세계를 구성하는 방식과 개인의 감각이 충돌하는 순간을 서사적으로 탐구한다. 제79회 칸 영화제 이머시브 경쟁 부문, 제83회 베니스 국제영화제 베니스 이머시브, 아르스 일렉트로니카, 파워하우스 뮤지엄에서 작품을 선보였으며, 안시 2026에서 페스티벌 커넥션상, 네마프 2025에서 뉴미디어 아티스트상을 수상했다."
          ],
          en: [
            "Ubac Studio is a Seoul-based media artist duo composed of Hyeunjoo Woo and Jiyun Park. Centering on XR-based interactive installations, they explore moments when technology’s construction of the world collides with individual sensory experience. Their works have been presented at the Immersive Competition of the 79th Festival de Cannes, the Venice Immersive of the 83rd Venice International Film Festival, Ars Electronica, and the Powerhouse Museum. They received the Festivals Connexion Award at Annecy 2026 and the New Media Artist Award at NeMAF 2025."
          ],
          zh: [
            "Ubac Studio（우박 스튜디오）是由禹賢珠及朴智允組成、現居首爾的媒體藝術家組合。她們的創作以 XR 互動裝置為核心，同時遊走於多元媒介形式之間，敍事性地探索科技建構世界的方式與個人感官經驗互相碰撞的瞬間。作品曾於第79屆康城影展沉浸式競賽單元、第83屆威尼斯國際電影節 Venice Immersive、林茲電子藝術節，以及動力博物館展出，並先後獲頒安錫影展 2026 Festivals Connexion 大獎，以及 NeMAF 2025 新媒體藝術家獎。"
          ]
        }
      }
    },

    {
      id: "jang",
      name: "Jang Gayoun",
      origin: "KR",
      portrait: "assets/img/portrait-jang.jpg",
      instagram: "https://www.instagram.com/flammable_j",
      work: {
        title: { ko: "경성시대, 어디에도 없는", en: "Placeless in the Gyeongseong Era", zh: "流離失所的京城時代" },
        medium: {
          ko: "혼합재료, 가변 크기, 2026",
          en: "Mixed materials, Dimensions Variable, 2026",
          zh: "綜合媒材，尺寸可變，2026"
        },
        mediaStarts: [0],
        body: {
          ko: [
            "이 작업은 2020년을 전후해서 유행한 ‘경성시대’라는 표현에서 시작했다. 이 표현은 일제강점기를 낭만적으로 소비 가능한 대상으로 압축한다. 그리고 실제로 존재하는 도시공간이 근대를 소비하려는 욕망에 의해 변형된다. 이 작품은 그 변형을 드러낸다.",
            "우리는 사실 아릿한 근대의 추억을 조금씩은 가지고 있다. 그것은 실제 경험이라기보다는 끊임없이 노출된 매체의 체계에 가깝다. 모던 걸, 백화점, 전차, 장식적 건축이 있는 그곳은 경성 같기도 하고, 상해 같기도 하고, 파리 같기도 하다. 그러나 이러한 근대의 이미지를 가능하게 했던 건축의 생산 체계는 이미 소멸했다.",
            "이런 배경에서 익선동에 주목한다. 20세기 초반 조성된 한옥 주거지는 화려한 모더니티와는 거리가 먼 공간이었지만 소비 공간으로 재구성되었다. 한옥의 구조 위에 장식적 표면이 덧씌워졌고, 익선동에는 새로운 의미가 덧씌워진다."
          ],
          en: [
            "Originating from the popularization of the phrase “Gyeongseong era” around 2020, this project examines how the Japanese colonial period has been packaged into an object of romanticized consumption. Gyeongseong, the former name for Seoul, represents urban spaces reshaped by a yearning for modernity — a transformation this work seeks to expose.",
            "Our collective bittersweet memories of the modern era are rarely derived from lived experiences; rather, they are constructs generated by media saturation. This nostalgic landscape, populated by modern girls, streetcars, Western-style department stores, and decorative architecture, is interchangeable with any Asian metropolitan city like Shanghai or Paris. However, the manual craft systems that once generated these architectural symbols of modernity have vanished.",
            "Consequently, this study focuses on Ikseon-dong. Established in the early twentieth century as a traditional hanok residential neighborhood far removed from urban glamour, it has been reinvented as a commercialized hub where superficial ornament layers over historic structures, superimposing entirely new meanings onto the area."
          ],
          zh: [
            "作品源於 2020 年前後韓國開始流行的「京城時代」一詞，這名詞將日治時期壓縮並包裝成可供浪漫消費的對象。京城，即首爾之舊稱，其真實存在的城市空間，早已被人們對現代發展的渴望所扭曲、重塑，這作品正欲揭示這場扭曲的過程。",
            "每人心中其實都藏有淡淡的、關於「現代」的懷舊記憶；然而這份記憶與其說是真實經歷，不如說是由媒體系統不斷曝光、反覆灌輸而成的建構物。那個充滿摩登女郎、電車、百貨公司與裝飾性建築的想像空間，可以是京城，也可以是上海，亦可以是巴黎。然而，曾經使這些現代化意象得以成立的建築生產體系，早已消逝。",
            "在此背景下，藝術家將目光投向首爾益善洞——二十世紀初建成的韓屋住宅區，其本與絢爛的現代性相去甚遠，卻在今日被重新改造為消費和旅遊的空間，表層裝飾覆蓋於韓屋結構之上，而益善洞也因此被覆蓋上層層全新的意義。"
          ]
        }
      },
      bio: {
        body: {
          ko: [
            "장가연은 서울을 기반으로 활동하는 리서처이자 큐레이터로, 건축을 바탕으로 다학제적 실천을 이어가고 있다. 건축 설계를 하나의 노동 형태로 살펴보는 프로젝트 〈3년 차 이후: 지속 가능한 건축 실천을 위한 질문들〉을 기획했다. 또한 페미니스트 건축가 모임 소파(Society of Feminist Architects, SOFA)에서 발행하는 동명의 매거진 《소파》의 편집팀이다."
          ],
          en: [
            "Jang Gayoun is a researcher and curator based in Seoul. Her practice is interdisciplinary, grounded in architecture and extending across multiple fields. She initiated Third Year On: Questions for Sustainable Architectural Practice, a project that examines architectural design as a form of labor. She is a member of the editorial team for SOFA, the eponymous magazine published by the Society of Feminist Architects (SOFA)."
          ],
          zh: [
            "張佳延（장가연）是現居首爾的研究者及策展人，其實踐以建築為根基，並延伸至跨學科領域。她發起項目《3 年之後：探問可持續建築實踐的種種問題》，將建築設計視為一種勞動形態加以檢視。她同時亦是女性主義建築師組織 SOFA（Society of Feminist Architects）旗下同名雜誌《SOFA》的編輯團隊成員。"
          ]
        }
      }
    },

    {
      id: "foreseen",
      name: "foreseen agency",
      origin: "HK",
      portrait: "assets/img/portrait-foreseen.jpg",
      instagram: "https://www.instagram.com/foreseen_agency",
      work: {
        title: { ko: "이끼의 연결", en: "Connected Mosses", zh: "相連的苔蘚" },
        medium: {
          ko: "철제 계단, 내장 스크린, 커스텀 소프트웨어, 가변 크기, 2026",
          en: "Steel Staircase, Embedded Screens, Custom Software, Dimensions Variable, 2026",
          zh: "鋼製階梯、嵌入式螢幕、定制軟件，尺寸可變，2026"
        },
        mediaStarts: [0, 1, 2],
        body: {
          ko: [
            "이 작품은 열두 개의 매립형 스크린과 철제 계단으로 구성된 설치 작품이다. 작품의 핵심에는 피크 스텝스의 역사적·정치적 유산을 참조하는 디지털 컨베이어 벨트가 자리한다. 오르는 이의 신체적 노력은 이 시스템을 움직이는 보이지 않는 동력으로 전환된다.",
            "홍콩섬의 돌계단은 화강암을 다듬어 만든 것으로, 이 화강암은 객가인 석공들이 채석해 급속히 팽창하던 도시에 공급한 것이다. 그러나 화강암은 산성이기 때문에 양치식물과 이끼는 돌 표면 자체에서는 자라지 못한다. 대신 석공들이 남긴 석회 모르타르의 틈새 속에서 살아간다. 이 기념비 위에 살아 있는 것은 오직 노동의 흔적, 끝없이 반복된 발걸음뿐이다.",
            "열두 개 스크린의 작동 논리는 신경망 기반 셀룰러 오토마타(NCA)에서 빌려온 것이다. 각 세포는 오직 인접한 이웃 세포만을 근거로 끊임없이 갱신되며, 이로써 자기조직화와 성장, 재생이 발생한다. 양치식물과 이끼가 그러하듯, 이는 진정한 성장이 아니라 균형 상태다. 짓밟히고 마르고 긁혀 나간 뒤에도 그것은 다시 어제의 높이까지만 자라난다. 이는 소진되고 회복되고 초기화되고 다시 반복되는, 같은 규칙 아래 작동하는 노동자들의 무릎에 대한 은유이다."
          ],
          en: [
            "Connected Mosses is an installation composed of twelve embedded screens and a steel staircase. At the core of the artwork is a digital conveyor belt referencing the historical and political legacy of the Peak steps. The physical exertion of the climber is converted into an invisible force driving the system.",
            "The stone steps of Hong Kong Island are hewn from granite, quarried by Hakka stonemasons to supply a rapidly expanding city. However, because granite is acidic, the ferns and moss on the steps cannot grow on the stone itself. They live in the joints — in the lime mortar, in the crevices left behind when the stonemasons pointed the masonry. The only living things on this monument are the traces of labour, the endless repetition of stepping.",
            "The operational logic of the twelve screens is borrowed from Neural Cellular Automata (NCA). Each cell continuously updates based solely on its immediate neighbours, thereby generating self-organisation, growth, and regeneration. Much like the ferns and moss, this is not true growth, but equilibrium: after being crushed, dried out, and scraped away, it grows back only to yesterday’s height. This becomes a metaphor — the knees of labourers all operate under the same rule: deplete, recover, reset, repeat."
          ],
          zh: [
            "《Connected Mosses》是一件由十二面嵌入式螢幕與鋼製階梯構成的裝置作品。作品的核心是一條數位輸送帶，呼應了山頂石階的歷史與政治遺緒。攀爬者耗費的體力，被轉化為一股驅動整個系統的隱形力量。",
            "香港島的石階由花崗岩鑿成，由客家石匠開山取石，以供應迅速擴張的城市。然而，由於花崗岩呈酸性，階梯上的蕨類與苔蘚無法直接生長在石頭表面。牠們生長在接縫處——在石灰砂漿中，在石匠勾縫時所留下的空隙裡。這座紀念碑上唯一活著的東西，是日復一日的踩踏，勞動留下的痕跡。",
            "這十二面螢幕的運作邏輯借鑒了神經細胞自動機（NCA）。每個細胞僅依據其緊鄰的細胞持續進行更新，進而產生自我組織、生長與再生。就如同蕨類與苔蘚一樣，這並非真正的生長，而是一種平衡：在被踩碎、乾涸、刮除之後，牠們只會長回昨日的高度。這成為了一則隱喻——勞動者的膝蓋，運行的都是同一條規則：耗盡，復原，歸零，再來。"
          ]
        }
      },
      bio: {
        body: {
          ko: [
            "Foreseen Agency는 Shan Wong과 Kachi Chan으로 구성된 아티스트 듀오다. 참여형 리서치와 사변적 디자인을 통해 자본주의, 기술, 사회 시스템이 교차하는 지점을 탐구하며, 통제의 보이지 않는 논리, 가치 생성의 메커니즘, 그리고 테크노-사회적 인프라를 드러낸다. 국립아시아문화전당(광주), UAAD(뉴욕), 싱가포르 아트 위크(2026), 디리야 아트 퓨처스(리야드) 등에서 전시되었으며, Leonardo(MIT Press), SIGGRAPH, ISEA 등에 공동 저술한 논문을 발표했다."
          ],
          en: [
            "Foreseen Agency is an artist duo by Shan Wong and Kachi Chan. Their practice examines the intersecting capitalist, technological, and social systems through participatory research and speculative design, revealing the invisible logics of control, value generation, and techno-social infrastructures. Their works have been shown at Asia Culture Centre (Gwangju), UAAD (NYC), Singapore Art Week (2026) and Diriyah Art Futures (Riyadh). They have co-authored papers in Leonardo (MIT Press), SIGGRAPH, ISEA."
          ],
          zh: [
            "Foreseen Agency 是由黃詠珊與陳家智組成的藝術家組合。他們的創作實踐透過參與式研究與思辨設計，審視資本主義、科技與社會系統的交織，揭示控制、價值生成與技術社會基礎設施背後的隱形邏輯。作品曾於光州亞洲文化殿堂、紐約 UAAD、新加坡藝術週（2026）及利雅得 Diriyah Art Futures 展出。二人曾於《Leonardo》（麻省理工學院出版社）、SIGGRAPH、ISEA 等學術平台合著發表論文。"
          ]
        }
      }
    }
  ],

  /* ---------------- CURATORS ---------------- */
  curators: [
    {
      id: "kang",
      name: "Kang Min-hyung",
      nameSub: "姜旻亨 · 강민형",
      portrait: "assets/img/portrait-kang.jpg",
      instagram: "https://www.instagram.com/degitalarts",
      body: {
        ko: [
          "큐레이터이자 예술 통역가/번역가(한, 영, 일)이다. 탈중심적 예술 실천에 관심을 가지고 있으며, 특히 바림(2014–2024)을 설립하여 지역성에 얽매이지 않는 예술 활동을 실천할 수 있는가에 대해 연구했다. 이 초지역성과 자율성을 디지털 기술의 맥락에서 읽고, 디지털 기술을 다루는 예술의 다른 형태를 고민하는 DEGITAL 플랫폼을 만들고 운영한다. 현재는 예술, 기술, 사회를 비평적으로 다루는 플랫폼인 포킹룸의 공동 기획자로 활동하고 있다."
        ],
        en: [
          "Min-hyung Kang is a curator and interpreter/translator working across English, Japanese, and Korean. She is interested in trans-locality and decentralization in art practice, and founded/directed Barim (2014–2024), a nonprofit art organization/space. She also created and runs the DEGITAL platform, which reads this trans-locality and decentralization in the context of digital technologies and seeks alternative forms of art that deal with digital technology. Currently, she serves as a co-organizer of Forking Room, a platform for critically engaging with art, technology, and society."
        ],
        zh: [
          "姜旻亨（강민형）是一位策展人，同時亦是一位橫跨韓、英、日三語的藝術傳譯／翻譯者。她關注去中心化的藝術實踐，並特別透過創立藝術團體 Barim（바림，2014–2024），研究藝術活動能否擺脫地域局限。其後她將跨地方性與自主性置於數碼科技的脈絡下重新解讀，並創立及主理 DEGITAL 平台，藉此思考處理數碼科技議題的藝術可以有著怎樣不同的形態。她現為 Forking Room（포킹룸）的共同策劃人，此平台致力於以批判視角探討藝術、科技與社會三者之間的關係。"
        ]
      }
    },
    {
      id: "wong",
      name: "Wong Ka Ying",
      nameSub: "黃嘉瀛 · 웡카잉",
      portrait: "assets/img/portrait-wong.jpg",
      instagram: "https://www.instagram.com/hedoesntgiveashit",
      body: {
        ko: [
          "홍콩의 아티스트이자 큐레이터, 작가이며, 홍콩중문대학 문화연구학 박사과정생이다. 2026 MMCA 국제 연구자 레지던시 프로그램, 2026–27 드 아펠 큐레토리얼 프로그램, 더 언스쿨 오브 큐레이팅 #8에 선정되었다. 예술이 어떻게 권력 재분배의 대안적 방식을 생성하고, 문화적 동질화에 저항하며, 다원적 형태의 집단적 상상과 행동을 실천할 수 있는지, 그리고 초국가적·디아스포라적 맥락에서 아시아 이주민과 이주노동자의 정체성을 탐구한다."
        ],
        en: [
          "Wong Ka Ying is a Hong Kong artist, curator, writer, and PhD candidate in Cultural Studies at the Chinese University of Hong Kong. She was recently selected for the MMCA International Researcher Residency Program 2026, the de Appel Curatorial Programme 2026–2027, and The Unschool of Curating #8: Repair as Method. Her curatorial practice explores how art can generate alternative modes of power redistribution, resist cultural homogenisation, cultivate plural forms of collective imagination and action, and the identities of Asian migrants and migrant workers across transnational and diasporic contexts."
        ],
        zh: [
          "黃嘉瀛（KY）是香港的藝術家、策展人、作者，現為香港中文大學文化研究學系博士候選人。她近期獲選參與韓國國立現代美術館（MMCA）國際研究員駐留計劃 2026、荷蘭 de Appel 策展課程 2026–2027，以及 Unschool of Curating 第八期：以修復為方法。她的策展實踐探索藝術如何開創另類的權力再分配模式、抵抗文化同質化、培養多元的集體想像與行動形式，以及亞洲移民及移工在跨國與離散脈絡下的身份議題。"
        ]
      }
    }
  ],

  /* ---------------- MAP ---------------- */
  map: {
    kicker: { ko: "전시 지도", en: "Exhibition Map", zh: "展覽地圖" },
    floors: [
      { label: { ko: "6층 · 메인 전시", en: "6F · Main Exhibition", zh: "6樓 · 主展場" }, img: "assets/img/map1.png" },
      { label: { ko: "7층 · 참고 및 아카이브 자료", en: "7F · Reference & Archival Materials", zh: "7樓 · 參考及檔案資料" }, img: "assets/img/map2.png" }
    ]
  }
};
