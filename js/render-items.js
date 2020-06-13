class RenderItems {
	static $getRenderedItem (item) {
		const [damage, damageType, propertiesTxt] = Renderer.item.getDamageAndPropertiesText(item);

		const renderedText = Renderer.item.getRenderedEntries(item);

		return $$`
			${Renderer.utils.getBorderTr()}
			${Renderer.utils.getExcludedTr(item, "item")}
			${Renderer.utils.getNameTr(item, {page: UrlUtil.PG_ITEMS})}
			<tr><td class="rd-item__type-rarity-attunement" colspan="6">${Renderer.item.getTypeRarityAndAttunementText(item).uppercaseFirst()}</td></tr>
			<tr>
				<td colspan="2">${[Parser.itemValueToFullMultiCurrency(item), Parser.itemWeightToFull(item)].filter(Boolean).join(", ").uppercaseFirst()}</td>
				<td class="text-right" colspan="4">${[damage, damageType, propertiesTxt].filter(Boolean).join(" ")}</td>
			</tr>
			${renderedText ? `<tr><td class="divider" colspan="6"><div/></td></tr>
			<tr class="text"><td colspan="6">${renderedText}</td></tr>` : ""}
			${Renderer.utils.getPageTr(item)}
			${Renderer.utils.getBorderTr()}
		`;
	}
}
