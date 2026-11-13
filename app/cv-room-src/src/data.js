// The twelve hidden parts of the CV. Every fact here comes from assets/files/cv_yasas.pdf;
// when the PDF changes, update this file and the plain CV in cv/index.html together.
//
// `spot` is where the object hides on a first play (metres; x east, y up, z south).
// `ignore` lists furniture ids whose bounding boxes must not block the line of sight to it.
// `note` is the one-line tie to the research shown when the object is found. It describes the
// hiding place, so on a replay it travels with the spot, not with the CV item.

export const SECTIONS = [
  { n: '01', key: 'work', label: 'Work' },
  { n: '02', key: 'education', label: 'Education' },
  { n: '03', key: 'publications', label: 'Publications' },
  { n: '04–05', key: 'teaching', label: 'Teaching, supervision & talks' },
  { n: '06', key: 'grants', label: 'Grants & recognition' },
  { n: '07–08', key: 'bring', label: 'What I bring, service & certifications' },
];

export const ITEMS = [
  {
    id: 'postdoc', section: 'work', trio: 'Researcher',
    title: 'Postdoctoral Researcher',
    org: 'HIT Lab NZ, University of Canterbury', years: '2025 – present',
    detail: 'Leads applied XR research in partnership with Sony Interactive Entertainment, Japan: design, implementation and evaluation of VR applications.',
    where: 'in mid-air, near the ceiling',
    note: 'One of three clones. In our third study only one clone was ever live.',
    spot: [1.15, 2.2, -1.25],
  },
  {
    id: 'senior-lecturer', section: 'work', trio: 'Lecturer',
    title: 'Senior Lecturer',
    org: 'Yoobee College of Creative Innovation', years: '2023 – present',
    detail: "Teaches master's courses in Strategic Information Systems Planning, Database Management and IT Project Management. Built an AI-first interactive LMS for blended delivery.",
    where: 'in mid-air, by the door',
    note: 'One of three clones. Follow the particle trail when it jumps.',
    spot: [-1.9, 1.55, 1.75],
  },
  {
    id: 'platform-lead', section: 'work',
    title: 'Platform Lead, Software Engineering',
    org: 'Open Learning Platform, University of Moratuwa', years: '2020 – 2022',
    detail: "Co-designed and deployed Sri Lanka's first large-scale MOOC platform, which grew to 150,000+ registered learners.",
    where: 'under the coffee table',
    note: 'A real-world hiding place: low, and behind furniture.',
    spot: [0.9, 0.13, 0.95], ignore: ['coffee-table', 'sofa'],
  },
  {
    id: 'lecturer', section: 'work',
    title: 'Lecturer',
    org: 'Faculty of Information Technology, University of Moratuwa', years: '2019 – 2022',
    detail: 'Taught Database Systems, HCI, Software Engineering and Enterprise Application Development. Designed an AR/VR learning framework later adopted for postgraduate teaching.',
    where: 'on the side table',
    note: 'Hidden at waist height, where seekers in the real-world game looked first.',
    spot: [-0.42, 0.66, 1.95], ignore: ['side-table'],
  },
  {
    id: 'tech-lead', section: 'work', trio: 'Engineer',
    title: 'Technical Lead & Senior Software Engineer',
    org: '99X, Sri Lanka', years: '2017 – 2021',
    detail: 'Led engineering teams building large-scale enterprise applications. Introduced AR-based features and Agile practice. Excellence Award, Best Initiative Team Lead, three years running.',
    where: 'in mid-air, above the armchair',
    note: 'One of three clones. Catch the live one.',
    spot: [2.2, 1.8, 1.2],
  },
  {
    id: 'phd', section: 'education',
    title: 'PhD, Human Interface Technology',
    org: 'University of Canterbury', years: '2022 – 2025',
    detail: 'Thesis: Designing multiplayer location-based augmented reality games that connect remote players and places. Three mixed-methods user studies. Fully funded by the Applied Immersive Gaming Initiative.',
    where: 'on the ceiling',
    note: 'In our second study, AR players hid things on the ceiling. Seekers kept looking at waist height.',
    spot: [-1.35, 2.56, -0.55],
  },
  {
    id: 'vr-spec', section: 'education',
    title: 'Specialisation in Virtual Reality',
    org: 'Goldsmiths, University of London', years: '2019 – 2020',
    detail: '',
    where: 'on the desk, by the lamp',
    note: 'Hidden next to a real object, so it reads as part of the room.',
    spot: [2.36, 0.9, 0.22], ignore: ['desk'],
  },
  {
    id: 'bsc', section: 'education',
    title: 'BSc (Hons) in Information Technology',
    org: 'University of Moratuwa, Sri Lanka', years: '2013 – 2017',
    detail: '',
    where: 'floating under the ceiling lamp',
    note: 'Mid-air: a place only AR lets you hide something.',
    spot: [0.0, 1.62, -0.2],
  },
  {
    id: 'publications', section: 'publications',
    title: 'Nine selected publications',
    org: 'IEEE VR · OzCHI (ACM) · ACM SUI · ISAGA', years: '2015 – 2025',
    detail: 'Journal articles in Entertainment Computing and Multimodal Technologies and Interaction; conference papers at OzCHI, ACM SUI and ISAGA; an IEEE VR abstract.',
    where: 'on top of the bookshelf',
    note: 'Above head height again, on top of the furniture.',
    spot: [-2.42, 2.42, -1.0], ignore: ['shelves'],
  },
  {
    id: 'teaching', section: 'teaching',
    title: 'Teaching, supervision and talks',
    org: 'Yoobee · HIT Lab NZ · University of Moratuwa', years: '2019 – present',
    detail: "Has supervised master's and final-year theses. Invited talk and panel at the NZ Game Developers Conference (2023); Falling Walls Lab (2024).",
    where: 'on the window sill',
    note: 'Tucked behind the curtain line, half in moonlight.',
    spot: [2.66, 1.0, -0.95],
  },
  {
    id: 'grants', section: 'grants',
    title: 'Grants and recognition',
    org: 'Niantic · AIGI · University of Canterbury · Microsoft Imagine Cup', years: '2015 – 2024',
    detail: "Niantic Studio Developer Accelerator Grant (2024). AIGI Full Scholarship (2022–25). Winner, Technology Track, Napkin Challenge (2024). People's Choice, Visualize Your Thesis (2022). Microsoft Imagine Cup national runner-up (2015).",
    where: 'on the cabinet, under the photo wall',
    note: 'Hidden in front of the travel photos, where the eye goes to the pictures instead.',
    spot: [1.15, 0.78, -2.02], ignore: ['cabinet'],
  },
  {
    id: 'bring', section: 'bring', camo: true,
    title: 'What I bring, service and certifications',
    org: 'Unity 3D · Lightship ARDK · OpenXR · Python · R · SQL', years: '',
    detail: 'Builds with Unity 3D, Niantic Lightship ARDK, ARFoundation, OpenXR and the XR Interaction Toolkit; analyses with Python, R and SQL. Reviewer for ACM VRST. Seven certifications, including Tobii eye-tracking and AI Fluency for Educators.',
    where: 'camouflaged on the bookshelf',
    note: 'Resized and camouflaged: the first of the mechanics from our third study.',
    spot: [-2.4, 1.3, -0.62], ignore: ['shelves'],
  },
];

// Extra places the non-special objects can move to when the visitor plays again.
export const SPARE_SPOTS = [
  { spot: [0.2, 2.5, 1.2], where: 'on the ceiling, above the sofa', note: 'The ceiling again: the first place AR hiders went.' },
  { spot: [-2.62, 0.2, 2.08], where: 'beside the suitcases, in the corner', ignore: ['suitcases'], note: 'Low and in a corner, like a real-world hiding place.' },
  { spot: [2.55, 0.14, -2.05], where: 'on the floor behind the plant', ignore: ['plant'], note: 'Behind something real, so the room does the hiding.' },
  { spot: [-0.55, 0.78, -2.0], where: 'on the cabinet, beside the vase', ignore: ['cabinet'], note: 'In plain sight, among real objects.' },
  { spot: [1.55, 0.84, 2.12], where: 'on the back of the sofa', ignore: ['sofa'], note: 'At sitting height, where nobody points a torch.' },
  { spot: [-1.2, 2.45, -2.0], where: 'high in the corner, above the photos', note: 'High in a corner: AR hiders floated objects there.' },
];
