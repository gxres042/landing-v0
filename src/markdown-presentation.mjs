// Astro 7 uses Sätteri HAST visitors, not Unified rehype plugins.
export default function localizedMarkdown({ fileURL }) {
	const path = fileURL?.pathname || '';
	const english = /\/blog\/en\//.test(path);
	const simplified = /\/blog\/zh-cn\//.test(path);
	const notes = english ? 'References' : simplified ? '参考文献' : '參考文獻';
	const back = english ? 'Back to citation' : simplified ? '返回引用处' : '返回引用處';
	const tableLabel = english ? 'Table — scroll horizontally to see all columns' : simplified ? '表格：左右滚动查看所有列' : '表格：左右捲動查看所有欄位';
	return {
		name: 'localized-article-presentation',
		element: {
			filter: ['h2', 'a', 'table'],
			visit(node, ctx) {
				if (node.properties.id === 'footnote-label') {
					ctx.setProperty(node, 'className', ['footnotes-title']);
					ctx.setProperty(node, 'children', [{ type: 'text', value: notes }]);
				}
				if (node.properties.dataFootnoteBackref !== undefined || node.properties['data-footnote-backref'] !== undefined) {
					const reference = node.properties.href.replace('#user-content-fnref-', '').replaceAll('-', '.');
					ctx.setProperty(node, 'ariaLabel', `${back} ${reference}`);
				}
				if (node.tagName === 'table') {
					ctx.wrapNode(node, { type: 'element', tagName: 'div', properties: { className: ['article-table-scroll'], role: 'region', ariaLabel: tableLabel, tabIndex: 0 }, children: [] });
				}
			},
		},
	};
}
