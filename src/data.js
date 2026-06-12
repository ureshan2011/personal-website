export const links = {
  email: 'yasassriofficial@gmail.com',
  scholar: 'https://scholar.google.com/citations?user=sIFk7asAAAAJ',
  linkedin: 'https://linkedin.com/in/yasassri',
  instagram: 'https://instagram.com/yasassri.me',
  github: 'https://github.com/ureshan2011',
  udemy: 'https://www.udemy.com/user/yasassri/',
  mooc: 'https://open.uom.lk',
  hitlab: 'https://www.hitlabnz.org',
}

export const marqueeKeywords = [
  'cybersickness',
  'presence',
  'location-based AR',
  'VIMS',
  'spatial user interaction',
  'remote multiplayer',
  'XR games',
  'human-computer interaction',
]

export const stats = [
  { value: 45000, suffix: '+', label: 'Udemy students taught' },
  { value: 150000, suffix: '+', label: 'Learners on open.uom.lk' },
  { value: 12, suffix: '', label: 'Peer-reviewed publications' },
  { value: 10, suffix: '+', label: 'Years building XR' },
]

export const researchThemes = [
  {
    id: 'vims',
    title: 'VIMS & Cybersickness',
    current: true,
    blurb:
      'Postdoctoral research at HIT Lab NZ on visually induced motion sickness — understanding, measuring, and mitigating cybersickness so immersive experiences are comfortable for everyone. Active collaboration with Sony Interactive Entertainment.',
    tags: ['VIMS', 'Cybersickness', 'VR Comfort', 'Sony Interactive Entertainment'],
    publications: [],
  },
  {
    id: 'lbar',
    title: 'Location-Based AR Games',
    current: false,
    blurb:
      'Designing, building, and evaluating multiplayer location-based AR games that connect remote players and places — custom Unity + Niantic systems, evaluated through controlled studies with 60+ participants.',
    tags: ['Remote Multiplayer', 'Spatial Decision-Making', 'Player Experience'],
    publications: [
      {
        title:
          'Augmented Hide-And-Seek: Evaluating Spatial Decision-Making and Player Experience in a Multiplayer Location-Based Game',
        authors: 'Wickramasinghe, Y.S., Lukosch, H., Everett, J., & Lukosch, S.',
        venue: 'IEEE VR',
        year: 2025,
        outlet: '2025 IEEE Conference on Virtual Reality and 3D User Interfaces',
        url: 'https://ieeexplore.ieee.org/document/10973019',
        bibtex: `@inproceedings{wickramasinghe2025hideandseek,
  author    = {Wickramasinghe, Yasas Sri and Lukosch, Heide and Everett, James and Lukosch, Stephan},
  title     = {Augmented Hide-And-Seek: Evaluating Spatial Decision-Making and Player Experience in a Multiplayer Location-Based Game},
  booktitle = {2025 IEEE Conference on Virtual Reality and 3D User Interfaces (VR)},
  year      = {2025},
  publisher = {IEEE}
}`,
      },
      {
        title:
          'Evaluating Spatial Decision-Making and Player Experience in a Remote Multiplayer Augmented Reality Hide-and-Seek Game',
        authors: 'Wickramasinghe, Y.S., Lukosch, H.K., Everett, J., & Lukosch, S.',
        venue: 'MDPI MTI',
        year: 2025,
        outlet: 'Multimodal Technologies and Interaction, 9(8), 79',
        url: 'https://doi.org/10.3390/mti9080079',
        bibtex: `@article{wickramasinghe2025remote,
  author  = {Wickramasinghe, Yasas Sri and Lukosch, Heide K. and Everett, James and Lukosch, Stephan},
  title   = {Evaluating Spatial Decision-Making and Player Experience in a Remote Multiplayer Augmented Reality Hide-and-Seek Game},
  journal = {Multimodal Technologies and Interaction},
  volume  = {9},
  number  = {8},
  pages   = {79},
  year    = {2025},
  doi     = {10.3390/mti9080079}
}`,
      },
      {
        title:
          'On the Impact of Augmented Reality Game Mechanics on the Player Experience in Remote Multiplayer Gameplay',
        authors: 'Wickramasinghe, Y.S., Lukosch, H.K., Everett, J., & Lukosch, S.',
        venue: 'Entertainment Computing',
        year: 2025,
        outlet: 'Entertainment Computing, 53, 100932. Elsevier',
        url: 'https://doi.org/10.1016/j.entcom.2025.100932',
        bibtex: `@article{wickramasinghe2025mechanics,
  author  = {Wickramasinghe, Yasas Sri and Lukosch, Heide K. and Everett, James and Lukosch, Stephan},
  title   = {On the Impact of Augmented Reality Game Mechanics on the Player Experience in Remote Multiplayer Gameplay},
  journal = {Entertainment Computing},
  volume  = {53},
  pages   = {100932},
  year    = {2025},
  doi     = {10.1016/j.entcom.2025.100932}
}`,
      },
      {
        title:
          'Representing Remote Locations with Location-Based Augmented Reality Game Design',
        authors: 'Wickramasinghe, Y.S., Lukosch, H., Everett, J., & Lukosch, S.',
        venue: 'OzCHI',
        year: 2025,
        outlet: '37th Australian Conference on Human-Computer Interaction. ACM',
        url: 'https://doi.org/10.1145/3764687.3764699',
        bibtex: `@inproceedings{wickramasinghe2025representing,
  author    = {Wickramasinghe, Yasas Sri and Lukosch, Heide and Everett, James and Lukosch, Stephan},
  title     = {Representing Remote Locations with Location-Based Augmented Reality Game Design},
  booktitle = {Proceedings of the 37th Australian Conference on Human-Computer Interaction (OzCHI '25)},
  year      = {2025},
  publisher = {ACM},
  doi       = {10.1145/3764687.3764699}
}`,
      },
      {
        title:
          'Designing Immersive Multiplayer Location-Based Augmented Reality Games with Remotely Shared Spaces',
        authors: 'Wickramasinghe, Y.S., Lukosch, S., & Lukosch, H.',
        venue: 'ISAGA',
        year: 2023,
        outlet:
          '54th Conference of the International Simulation and Gaming Association, pp. 204–214',
        url: '/ISAGA2023Proceedings.pdf',
        bibtex: `@inproceedings{wickramasinghe2023designing,
  author    = {Wickramasinghe, Yasas Sri and Lukosch, Stephan and Lukosch, Heide},
  title     = {Designing Immersive Multiplayer Location-Based Augmented Reality Games with Remotely Shared Spaces},
  booktitle = {54th Conference of the International Simulation and Gaming Association (ISAGA 2023)},
  pages     = {204--214},
  year      = {2023}
}`,
      },
      {
        title:
          'Designing Multiplayer Location-Based Augmented Reality Games that Connect Remote Players and Places',
        authors: 'Wickramasinghe, W.A.U.Y.S.',
        venue: 'PhD Thesis',
        year: 2025,
        outlet: 'University of Canterbury, Christchurch, New Zealand',
        url: '/Wickramasinghe.pdf',
        bibtex: `@phdthesis{wickramasinghe2025thesis,
  author = {Wickramasinghe, W. A. U. Yasas Sri},
  title  = {Designing Multiplayer Location-Based Augmented Reality Games that Connect Remote Players and Places},
  school = {University of Canterbury},
  year   = {2025}
}`,
      },
    ],
  },
  {
    id: 'presence',
    title: 'Presence & Trust in Shared AR',
    current: false,
    blurb:
      'How design choices shape presence, trust, and trustworthiness when people share an augmented space — including a 36-participant study on exchanging virtual items in shared AR.',
    tags: ['Presence', 'Trust', 'Shared AR'],
    publications: [
      {
        title: 'Trustful Trading in Shared Augmented Reality',
        authors: 'Ritter, M., Liew, K., Wickramasinghe, Y.S., & Lukosch, S.',
        venue: 'ACM SUI',
        year: 2024,
        outlet: 'Proceedings of the 2024 ACM Symposium on Spatial User Interaction',
        url: 'https://doi.org/10.1145/3677386.3682086',
        bibtex: `@inproceedings{ritter2024trustful,
  author    = {Ritter, Marcel and Liew, Kongmeng and Wickramasinghe, Yasas Sri and Lukosch, Stephan},
  title     = {Trustful Trading in Shared Augmented Reality},
  booktitle = {Proceedings of the 2024 ACM Symposium on Spatial User Interaction (SUI '24)},
  year      = {2024},
  publisher = {ACM},
  doi       = {10.1145/3677386.3682086}
}`,
      },
      {
        title:
          'Trust and Trustworthiness While Exchanging Virtual Items in Shared Augmented Reality',
        authors: 'Ritter, M., Lukosch, S., Liew, K., & Wickramasinghe, Y.',
        venue: 'HIT Lab NZ',
        year: 2024,
        outlet: 'HIT Lab NZ, University of Canterbury',
        url: 'https://scholar.google.com/citations?user=sIFk7asAAAAJ',
        bibtex: `@techreport{ritter2024trust,
  author      = {Ritter, Marcel and Lukosch, Stephan and Liew, Kongmeng and Wickramasinghe, Yasas},
  title       = {Trust and Trustworthiness While Exchanging Virtual Items in Shared Augmented Reality},
  institution = {HIT Lab NZ, University of Canterbury},
  year        = {2024}
}`,
      },
    ],
  },
]

export const earlierWork = [
  {
    title: 'Virtual Reality Markup Framework for Generating Interactive Indoor Environment',
    outlet: 'IEEE ICETSS 2017',
    url: 'https://ieeexplore.ieee.org/document/8324175',
  },
  {
    title: 'Generating Dynamic Indoor Environments with Virtual Reality Markups',
    outlet: 'Journal of Software Engineering & Software Testing, 6(3)',
    url: 'https://scholar.google.com/citations?user=sIFk7asAAAAJ',
  },
  {
    title:
      'A Review on Reimagining Medical Education with Virtual Reality in Emerging Medical Disciplines',
    outlet: '15th International Research Conference',
    url: 'https://scholar.google.com/citations?user=sIFk7asAAAAJ',
  },
  {
    title:
      'A Mobile Application with Augmented Reality to Enhance Sinhala Learning Experience for Children',
    outlet: 'ITRU 2015, University of Moratuwa',
    url: 'https://scholar.google.com/citations?user=sIFk7asAAAAJ',
  },
]

export const teaching = {
  roles: [
    {
      title: 'Senior Lecturer — Master of Business Informatics',
      org: 'Yoobee Colleges, New Zealand',
      blurb:
        'Postgraduate teaching built on experiential, constructivist learning — students learn by building, failing, iterating, and reflecting. Custom-built classroom platform with live SQL races, gamified quizzes, and real-time analytics.',
    },
    {
      title: 'Udemy Instructor',
      org: '45,000+ students across 3 courses',
      blurb:
        'Practical, project-driven online courses in software engineering and immersive technology, taught to a global audience of forty-five thousand and counting.',
    },
  ],
  mooc: {
    title: "Sri Lanka's first large-scale MOOC platform",
    blurb:
      'Led the development of open.uom.lk for the University of Moratuwa — a fully automated MOOC platform that grew to over 150,000 registered learners and changed who gets access to IT education in Sri Lanka.',
  },
}

export const projects = [
  {
    name: 'Navitaz VR Labs',
    role: 'Co-founder',
    period: '2015 — present',
    blurb:
      'AR/VR studio co-founded under the MIT Global Startup Labs programme — Microsoft Imagine Cup Runner-Up 2015, and now a Niantic Developer Fund 2025 recipient building location-based AR experiences.',
    tags: ['Niantic Developer Fund 2025', 'MIT GSL', 'Imagine Cup'],
    url: links.linkedin,
  },
  {
    name: 'open.uom.lk',
    role: 'Platform Lead',
    period: '150,000+ learners',
    blurb:
      "Sri Lanka's first large-scale MOOC platform, built for the University of Moratuwa with fully automated course delivery, assessment, and certification at national scale.",
    tags: ['MOOC', 'EdTech', 'National scale'],
    url: 'https://open.uom.lk',
  },
  {
    name: 'fuelpass.lk',
    role: 'Engineering',
    period: '2022',
    blurb:
      "QR-based national fuel quota platform stood up during Sri Lanka's 2022 fuel crisis — shipped under extreme time pressure and used countrywide.",
    tags: ['Civic tech', 'National scale', 'Crisis response'],
    url: 'https://fuelpass.lk',
  },
]

/*
 * The SVGs in public/photos/ are placeholder artwork — replace each with a
 * real photograph (same filename, .jpg is fine if you update `src`).
 * Tall slots (1st & 3rd) read best as portrait crops, the others landscape.
 */
export const photos = [
  {
    src: '/photos/photo-1.svg',
    location: 'Aoraki / Mount Cook National Park',
    note: 'Te Waipounamu, Aotearoa New Zealand',
  },
  {
    src: '/photos/photo-2.svg',
    location: 'Roys Peak, Wānaka',
    note: 'Above Lake Wānaka at golden hour',
  },
  {
    src: '/photos/photo-3.svg',
    location: 'Southern Alps',
    note: 'On the trail, South Island',
  },
  {
    src: '/photos/photo-4.svg',
    location: 'Canterbury High Country',
    note: 'Weekend hikes from Ōtautahi Christchurch',
  },
]
