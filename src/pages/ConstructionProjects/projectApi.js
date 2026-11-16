import legacyProjects from './legacyProjects';

const legacyImages = new Map();
export const legacyCatalog = Object.fromEntries(Object.entries(legacyProjects).map(([category, item]) => [
    category,
    {
        ...item,
        projects: item.projects.map((project, index) => {
            const id = `legacy-${category}-${index + 1}`;
            project.images.forEach((image, photoIndex) => {
                legacyImages.set(`${id}-${photoIndex + 1}`, image.src);
            });
            return { ...project, id };
        }),
    },
]));

const apiOrigin = process.env.REACT_APP_PROJECTS_API_URL?.trim();
export const useRemoteProjects = Boolean(apiOrigin);

export async function fetchProjects(signal) {
    const base = new URL(apiOrigin);
    if (base.protocol !== 'https:' && !(base.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(base.hostname))) {
        throw new Error('Invalid portfolio API URL');
    }
    const response = await fetch(new URL('/api/projects', base), { signal, credentials: 'omit' });
    if (!response.ok) throw new Error('Portfolio API unavailable');
    const result = await response.json();
    if (result.schemaVersion !== 1 || !Array.isArray(result.projects)) throw new Error('Invalid portfolio API format');

    const catalog = Object.fromEntries(Object.entries(legacyCatalog).map(([key, item]) => [key, { title: item.title, projects: [] }]));
    for (const project of result.projects) {
        if (!Object.hasOwn(catalog, project.category) || typeof project.title !== 'string' || !Array.isArray(project.images)) {
            throw new Error('Invalid project format');
        }
        const images = project.images.flatMap((image) => {
            const src = image.source === 'legacy'
                ? legacyImages.get(image.id)
                : (image.source === 'r2' && /^[a-f\d-]{36}$/.test(image.id) ? new URL(`/media/${image.id}`, base).href : null);
            return src ? [{ src, alt: image.alt || project.title }] : [];
        });
        catalog[project.category].projects.push({ ...project, title1: project.subtitle, images });
    }
    return catalog;
}
