export const locales = ['zh', 'en', 'zh-cn'] as const;
export type Locale = (typeof locales)[number];
export const languageTags = { zh: 'zh-Hant-TW', en: 'en-US', 'zh-cn': 'zh-Hans-CN' } as const;
export const openGraphLocales = { zh: 'zh_TW', en: 'en_US', 'zh-cn': 'zh_CN' } as const;
export const languageNames = { zh: '繁體中文', en: 'English', 'zh-cn': '简体中文' } as const;

export function localizePath(path: string, lang: Locale): string {
	const unprefixed = path.replace(/^\/(en|zh-cn)(?=\/|$)/, '') || '/';
	return `${lang === 'zh' ? '' : `/${lang}`}${unprefixed}`;
}
export function postLocale(id: string): Locale {
	return id.startsWith('en/') ? 'en' : id.startsWith('zh-cn/') ? 'zh-cn' : 'zh';
}
export function postSlug(id: string): string {
	return id.replace(/^(en|zh-cn)\//, '');
}
export const postOrder = ['say-hi-to-engawa', 'make-a-zero-trust-paas'];
export function postPath(id: string): string {
	return localizePath(`/blog/${postSlug(id)}/`, postLocale(id));
}
export const blogCopy = {
	zh: { title: '部落格', description: '來自 engawa 的筆記、指南與想法。', journal: 'engawa 手記', all: '所有文章', entries: '篇文章', subscribe: '訂閱', rss: '透過 RSS 訂閱', back: '返回部落格', published: '發布於', updated: '更新於', navigation: '文章導覽' },
	en: { title: 'Blog', description: 'Notes, guides, and ideas from engawa.', journal: 'The engawa journal', all: 'All articles', entries: 'entries', subscribe: 'Subscribe', rss: 'Subscribe via RSS', back: 'Back to blog', published: 'Published', updated: 'Updated', navigation: 'Article navigation' },
	'zh-cn': { title: '博客', description: '来自 engawa 的笔记、指南与想法。', journal: 'engawa 手记', all: '所有文章', entries: '篇文章', subscribe: '订阅', rss: '通过 RSS 订阅', back: '返回博客', published: '发布于', updated: '更新于', navigation: '文章导航' },
} as const;
