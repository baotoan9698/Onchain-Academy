export const imageFiles = {
  logo: "wzgFKoJ7yQFDDvFINJT6Pj5SV8o.png",
  skyline: "NSMeL75YpLA8WWg3k3VHfeSktI.png",
  timing: "6GTXtriY7npg8b5xutNYVkVZgHo.png",
  advantage: "oukLRba6ZI3joQmz1tlLQ23E.png",
  harmony: "hzvBVVSK8NJhiVwOfD66duhQKk.png",
  ministry: "MqvdGd6KLrDb7uJrQmss537uXzI.png",
  vnexpress: "DLUFrdBCyK0xuLJva1euV5knrw.png",
  tuoitre: "eSY7DKrf9RTFV7x8DGSNuSBsRjE.png",
  nhandan: "EX6jTGDYIQ7gGYkKaBZjm5Q.png",
  news5: "ZenynZi6mKqMa9aQY1UNEV3HgA.png",
  blog1: "gLJXLIl7sVIU4GKUrxZGsqbjs.jpg",
  blog2: "so3A54DdsLuTKnKmUFtmXS60QE.jpg",
  blog3: "nEq2gNtpMAq5JVH5b46TXS2cPpg.jpg",
  building: "ZIlR1tiLEXG9PPakFnXaH8ivRE.png",
  phapluat: "km7TPV4LZqX9M8P45KROpxKQ4zc.png",
  taichinh: "skKhvmAaucGmRyAQMIjVPED5zo.png",
  dautu: "cZjovZlRT0TW9n3hKOrf0Bv4lo.png",
  training: "QHj8wKdWPtC4mpnp3h8Eq6Uo8c.png",
  research: "xCjYq1nnozPWa41CJ8dXY8uxvo.png",
  hub: "JXO87ZwWU1AU8K31PvPWst8i2no.png",
  huong: "QoRptXITQiwAxU7UOBh2x9HGmbA.png",
  an: "yUNkHnO9VDAL2akEToDU4wa8Gz0.png",
  hai: "MZ1q9FoeekZFEteTHWRCV5rZgY.png",
  khoa: "V3hliXJ2hVzMp2tYdTB9okD2KI.png",
  tony: "etgeXG7FKjXc97CY3pIrtlBkts.png",
  min: "K0Jxv9mFcgL1zqmND4yVjxCD5uw.png",
  kevin: "8vySkqXx3pnAHUfGp5wH5tgKbo.png",
  catarina: "qYictd7rBrV69P4dODDjPkb6YL4.png",
  quynh: "2YPhjquDWBnjsArptG0TlqBpXZ0.png",
  laura: "aGh368xUtHDBGwYQssrsGjXo.jpg",
  globe: "mq3bHkTFBHIXwQKVSQWOwPhbwU.png",
} as const;
export type ImageKey = keyof typeof imageFiles;
export const asset = (key: ImageKey) =>
  `${process.env.NEXT_PUBLIC_LOCAL_ASSETS === "true" ? "/images/" : "https://framerusercontent.com/images/"}${imageFiles[key]}`;
export const original = (path: string) => path === "/contact-us" ? path : `https://on-chain.academy${path}`;
export const opportunities = [
  {
    title: "Timing",
    image: "timing",
    text: "Vietnam’s legal framework to support the On-chain Economy is nearly complete, backed by strong government commitment.",
  },
  {
    title: "Advantage",
    image: "advantage",
    text: "The IFC will act as a strategic hub, linking global capital with innovative economic models and paving the way for Vietnam’s digital finance era.",
  },
  {
    title: "Harmony",
    image: "harmony",
    text: "Vietnam ranks among the global top 5 in crypto adoption with 17 million users and daily trading volumes of $2–3B across CEXs and DEXs.",
  },
] as const;
export const blogs = [
  {
    title: "On-chain Academy Joins the Global On-chain Economy Alliance",
    date: "Nov 25, 2025",
    image: "blog1",
    slug: "on-chain-academy-joins-the-global-on-chain-economy-alliance",
    text: "On November 25, 2025, at the CEO500 event during the Autumn Economic Forum 2025, the Global On-chain Economy Alliance was officially launched under the witness of Prime Minister Phạm Minh Chính.",
  },
  {
    title:
      "Recap — Roundatable On 24.10: Consultation On Developing The Fintech Ecosystem within IFC HCMC",
    date: "Oct 24, 2025",
    image: "blog2",
    slug: "recap-roundatable-on-24-10-consultation-on-developing-the-fintech-ecosystem-within-ifc-hcmc",
    text: "On October 24, On-chain Academy, in collaboration with HIDS and HFIC, organised a consultation roundtable on developing the digital asset ecosystem within the Vietnam International Financial Center.",
  },
  {
    title:
      "Reflections from the Tether Private Summit 2025: The Corporate Era of Crypto Has Begun",
    date: "Oct 14, 2025",
    image: "blog3",
    slug: "reflections-from-the-tether-private-summit-2025-the-corporate-era-of-crypto-has-begun",
    text: "Last week, I had the opportunity to attend the Tether Private Summit in Singapore, a closed-door gathering of global leaders shaping the future of blockchain finance.",
  },
] as const;
export const solutions = [
  {
    title: "Customized Training",
    image: "training",
    slug: "customized-training",
    text: "On-chain Academy delivers world-class education programs designed to help enterprises, public officials, and investors understand and harness the On-chain Economy.",
  },
  {
    title: "Research & Development",
    image: "research",
    slug: "research-development",
    text: "Our R&D arm explores the forefront of blockchain and on-chain innovations, translating cutting-edge research into practical applications for Vietnam and beyond.",
  },
  {
    title: "On-chain Hub",
    image: "hub",
    slug: "onchain-hub",
    text: "On-chain Hub is an initiative by On-chain Academy to position Vietnam as a rising leader in the global on-chain economy.",
  },
] as const;
export const reviews = [
  {
    name: "Mrs. Huong Nguyen",
    role: "Head of Human Resource at Midu Group",
    image: "huong",
    quote:
      "I’m not tech-savvy, but this course helped me see blockchain not just as a technology, but as the foundation of a new economic order. It gave me practical insights to understand the value of digital assets and how Onchain systems can be applied in my organization.",
  },
  {
    name: "Mr. Pham Dang An",
    role: "Deputy Director, Vuphong Energy Group",
    image: "an",
    quote:
      "On-chain Academy’s training was a timely boost for our green transition work with manufacturers—clear, practical, and immediately applicable. In two days, we gained key insights into tokenizing green cashflows, structuring carbon-credit deals, and navigating Vietnam’s upcoming sandbox.",
  },
  {
    name: "ThS. Le Thanh Hai",
    role: "Director of Center of Consultancy - Information - Training on Economic and Business Management (CIT)",
    image: "hai",
    quote:
      "The On-chain Academy session effectively bridged economic principles with blockchain technology, offering clear insights that support strategic decision-making and policy development for enterprises and policymakers engaging in the on-chain economy.",
  },
] as const;
export const benefits = [
  [
    "Policy & Sandbox Leadership",
    "Acts as a trusted bridge to government and runs policy-backed sandboxes that turn regulatory intent into real, testable pilots.",
  ],
  [
    "Capital Mobilisation & Product Incubation",
    "Attracts strategic investors and incubates investable on-chain products so pilots become funded, marketable businesses.",
  ],
  [
    "Pilot-to-Scale Delivery",
    "Moves projects from prototype to live operation by providing technical, operational and compliance delivery support inside the IFC sandbox.",
  ],
  [
    "Talent Development",
    "Leveraging years of training and consulting experience, we nurture on-chain professionals and prepare them to contribute effectively to real-world projects.",
  ],
  [
    "Standards, Research & Market Intelligence",
    "Produces local research, standards and playbooks that de-risk decisions for policymakers, enterprises and investors.",
  ],
  [
    "Global Partnerships & Market Access",
    "Opens pathways to global builders, exchanges, and capital, giving Vietnamese projects launchpads to international markets.",
  ],
];
export const contributors = [
  {
    name: "Tony Tran",
    image: "tony",
    linkedin: "tonytranvn",
    bio: "Co-founder of Onchain Academy, PhD in Technology, graduate of NTU and MIT, PhD Internship Program at Nethermind, and a Certified Bitcoin Professional, Tony leads FAM3’s Training and Academic division. He has been active in the crypto space since 2017 and has founded ventures in both Web2 and Web3, including a Web2-to-Web3 project in the Shop-to-Earn space.",
  },
  {
    name: "Min Nguyen",
    image: "min",
    linkedin: "minnguyen46",
    bio: "COO of Onchain Academy, Min Nguyễn has 5 years managing Web3 native and Web2 to Web3 projects. Min is skilled in process design, resource management, and team coordination. With deep knowledge of both Web2 and Web3, Min bridges operational language between traditional and decentralized systems.",
  },
  {
    name: "Kevin",
    image: "kevin",
    linkedin: "kevin-nguyen-1172b525b",
    bio: "Kevin is a crypto native who has thrived in the onchain economy — like a gold miner who didn’t just survive the Wild West, but learned to build in it. With 5+ years of real-world crypto experience, he now teaches onchain skills and strategies, blending deep technical insight with sharp business vision.",
  },
  {
    name: "Catarina Quynh",
    image: "catarina",
    linkedin: "catarina-quynh",
    bio: "Vietnam Lead at Republic, a New York–based fintech firm with $600M AUM and $2.6B raised for 2,000+ startups. Republic offers end-to-end services in tokenization, digital assets, blockchain advisory, and institutional fundraising.",
  },
  {
    name: "Quynh Le",
    image: "quynh",
    linkedin: "quynh218",
    bio: "Quynh Le is the APAC Regional Expansion Lead at Tether, where she drives growth by bridging traditional finance and blockchain. With 10+ years of global experience in banking, investment, and fintech, she leads strategic partnerships to advance financial inclusion and the digital economy across Asia-Pacific.",
  },
  {
    name: "Laura Nguyen",
    image: "laura",
    linkedin: "lauranguyent",
    bio: "Laura Nguyen is a tech entrepreneur specializing in AI, blockchain, and startup ecosystem building in Southeast Asia. She is a Partner at GenAI Fund and works with governments and major tech players like AWS, Google Cloud, and NVIDIA. Laura is also the Vietnam Regional Head at Ava Labs and a Founding Advisor of Arcanic AI.",
  },
  {
    name: "Khoa Nguyen",
    image: "khoa",
    linkedin: "khoa-web3",
    bio: "Cofounder of FAM3 team, an organization with 5 years of professional experience in the crypto space (including launchpads, project investment, incubation, community building) and the Web3 environment (project development, fundraising, ecosystem growth).",
  },
] as const;
