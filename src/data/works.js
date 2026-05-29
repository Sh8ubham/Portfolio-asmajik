const colors = ["#c084fc", "#4ade80", "#f59e0b", "#f43f5e", "#3b82f6", "#06b6d4"];

const imagesGlob = import.meta.glob('/src/assets/works/**/*.{png,jpg,jpeg,webp}', { eager: true });

const mappedWorks = Object.entries(imagesGlob).map(([filePath, module], index) => {
  const parts = filePath.split('/');
  const folderName = parts[parts.length - 2];
  
  let fileName = parts[parts.length - 1];
  fileName = fileName.substring(0, fileName.lastIndexOf('.'));
  const title = fileName.replace(/[-_]/g, ' ');

  let category = '';
  let description = '';
  let tags = [];

  if (folderName === 'Personal Favs') {
    category = 'Personal';
    description = 'Personal passion projects and experimental design explorations.';
    tags = ['Illustration', 'Poster Design', 'Typography'];
  } else if (folderName === 'Posters') {
    category = 'Posters';
    description = 'Eye-catching poster designs crafted for events, campaigns, and visual storytelling.';
    tags = ['Poster Design', 'Photoshop', 'Illustrator'];
  } else if (folderName === 'Professional Work') {
    category = 'Professional';
    description = 'Client work and professional projects spanning branding, social media, and commercial design.';
    tags = ['Branding', 'Social Media', 'Figma'];
  } else if (folderName === 'Startup Project') {
    category = 'Startup';
    description = 'Innovative designs and digital solutions built for emerging startups.';
    tags = ['UI/UX', 'Web Design', 'Startup'];
  } else if (folderName === 'Reference Works') {
    category = 'Reference';
    description = 'Reference works and design studies showcasing creative exploration and inspiration.';
    tags = ['Design', 'Reference', 'Creative'];
  } else {
    category = 'Uncategorized';
    description = '';
    tags = [];
  }

  return {
    id: index + 1,
    title,
    category,
    description,
    image: module.default,
    images: [module.default],
    tags,
    year: "2024",
    client: folderName,
    color: colors[index % colors.length],
    showInAll: folderName === 'Personal Favs' || folderName === 'Professional Work' || folderName === 'Startup Project' || folderName === 'Reference Works',
  };
});

export const works = mappedWorks.sort((a, b) => {
  if (a.client === 'Startup Project' && b.client !== 'Startup Project') return -1;
  if (b.client === 'Startup Project' && a.client !== 'Startup Project') return 1;
  return a.id - b.id;
});

export const categories = [
  { id: "all", label: "All" },
  { id: "Startup", label: "Startup" },
  { id: "Reference", label: "Reference" },
  { id: "Personal", label: "Personal" },
  { id: "Posters", label: "Posters" },
  { id: "Professional", label: "Professional" },
];
