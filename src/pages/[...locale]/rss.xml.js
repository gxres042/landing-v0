import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { blogCopy, languageTags, locales, postLocale, postOrder, postPath, postSlug } from '../../i18n';
export function getStaticPaths() {
	return locales.map(locale => ({ params: { locale: locale === 'zh' ? undefined : locale } }));
}
export async function GET(context) {
	const lang = context.params.locale ?? 'zh';
	const posts = (await getCollection('blog', post => postLocale(post.id) === lang))
		.sort((a, b) => postOrder.indexOf(postSlug(a.id)) - postOrder.indexOf(postSlug(b.id)));
	return rss({
		title: `${blogCopy[lang].title} — engawa`,
		description: blogCopy[lang].description,
		site: context.site,
		customData: `<language>${languageTags[lang]}</language>`,
		items: posts.map(post => ({ ...post.data, link: postPath(post.id) })),
	});
}
