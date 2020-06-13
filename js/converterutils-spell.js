"use strict";

class DamageTagger {
	static _addDamageTypeToArray (arr, str, options) {
		str = str.toLowerCase().trim();
		if (str === "all" || str === "one" || str === "a") arr.push(...Parser.DMG_TYPES);
		else if (Parser.DMG_TYPES.includes(str)) arr.push(str);
		else options.cbWarning(`Unknown damage type "${str}"`)
	}
}

class DamageInflictTagger extends DamageTagger {
	static tryRun (sp, options) {
		sp.damageInflict = [];
		JSON.stringify([sp.entries, sp.entriesHigherLevel]).replace(/(?:{@damage [^}]+}|\d+) (\w+)((?:, \w+)*)(,? or \w+)? damage/ig, (...m) => {
			if (m[1]) this._addDamageTypeToArray(sp.damageInflict, m[1], options);
			if (m[2]) m[2].split(",").map(it => it.trim()).filter(Boolean).forEach(str => this._addDamageTypeToArray(sp.damageInflict, str, options));
			if (m[3]) this._addDamageTypeToArray(sp.damageInflict, m[3].split(" ").last(), options);
		});
		if (!sp.damageInflict.length) delete sp.damageInflict;
		else sp.damageInflict = [...new Set(sp.damageInflict)].sort(SortUtil.ascSort);
	}
}

class DamageResVulnImmuneTagger extends DamageTagger {
	static tryRun (sp, prop, options) {
		sp[prop] = [];
		JSON.stringify([sp.entries, sp.entriesHigherLevel]).replace(/resistance to (\w+)((?:, \w+)*)(,? or \w+)? damage/ig, (...m) => {
			if (m[1]) this._addDamageTypeToArray(sp[prop], m[1], options);
			if (m[2]) m[2].split(",").map(it => it.trim()).filter(Boolean).forEach(str => this._addDamageTypeToArray(sp[prop], str, options));
			if (m[3]) this._addDamageTypeToArray(sp[prop], m[3].split(" ").last(), options);
		});
		if (!sp[prop].length) delete sp[prop];
		else sp[prop] = [...new Set(sp[prop])].sort(SortUtil.ascSort);
	}
}

class ConditionInflictTagger {
	static tryRun (sp, options) {
		sp.conditionInflict = [];
		JSON.stringify([sp.entries, sp.entriesHigherLevel]).replace(/{@condition ([^}]+)}/ig, (...m) => sp.conditionInflict.push(m[1].toLowerCase()));
		if (!sp.conditionInflict.length) delete sp.conditionInflict;
		else sp.conditionInflict = [...new Set(sp.conditionInflict)].sort(SortUtil.ascSort);
	}
}

class SavingThrowTagger {
	static tryRun (sp, options) {
		sp.savingThrow = [];
		JSON.stringify([sp.entries, sp.entriesHigherLevel]).replace(/(Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) saving throw/ig, (...m) => sp.savingThrow.push(m[1].toLowerCase()));
		if (!sp.savingThrow.length) delete sp.savingThrow;
		else sp.savingThrow = [...new Set(sp.savingThrow)].sort(SortUtil.ascSort);
	}
}

class OpposedCheckTagger {
	static tryRun (sp, options) {
		sp.opposedCheck = [];
		JSON.stringify([sp.entries, sp.entriesHigherLevel]).replace(/a (Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) check/ig, (...m) => sp.opposedCheck.push(m[1].toLowerCase()));
		if (!sp.opposedCheck.length) delete sp.opposedCheck;
		else sp.opposedCheck = [...new Set(sp.opposedCheck)].sort(SortUtil.ascSort);
	}
}

class SpellAttackTagger {
	static tryRun (sp, options) {
		sp.spellAttack = [];
		JSON.stringify([sp.entries, sp.entriesHigherLevel]).replace(/make a (ranged|melee) spell attack/ig, (...m) => sp.spellAttack.push(m[1][0].toUpperCase()));
		if (!sp.spellAttack.length) delete sp.spellAttack;
		else sp.spellAttack = [...new Set(sp.spellAttack)].sort(SortUtil.ascSort);
	}
}

// TODO areaTags

class MiscTagsTagger {
	static tryRun (sp, options) {
		sp.miscTags = [];

		const strEntries = JSON.stringify([sp.entries, sp.entriesHigherLevel]);

		if (/becomes permanent/ig.test(strEntries)) sp.miscTags.push("PRM");
		if (/when you reach/ig.test(strEntries)) sp.miscTags.push("SCL");
		if ((/regain|restore/ig.test(strEntries) && /hit point/ig.test(strEntries)) || /heal/ig.test(strEntries)) sp.miscTags.push("HL");
		if (/you summon/ig.test(strEntries)) sp.miscTags.push("SMN");
		if (/you can see/ig.test(strEntries)) sp.miscTags.push("SGT");

		if (!sp.miscTags.length) delete sp.miscTags;
	}
}

class ScalingLevelDiceTagger {
	static tryRun (sp, options) {
		if (sp.level !== 0) return;

		const strEntries = JSON.stringify(sp.entries);
		const rolls = [];
		strEntries.replace(/{@(?:damage|dice) ([^}]+)}/g, (...m) => {
			rolls.push(m[1].split("|")[0]);
		});

		const getLabel = () => {
			let label;

			const mDamageType = DamageTypeTag.TYPE_REGEX.exec(strEntries);
			if (mDamageType) {
				label = `${mDamageType[1]} damage`
			}

			DamageTypeTag.TYPE_REGEX.lastIndex = 0;

			if (!label) options.cbWarning(`${sp.name ? `(${sp.name}) ` : ""}Could not create scalingLevelDice label!`);
			return label || "NO_LABEL";
		};

		if ((rolls.length === 4 && strEntries.includes("one die")) || rolls.length === 5) {
			if (rolls.length === 5 && rolls[0] !== rolls[1]) options.cbWarning(`${sp.name ? `(${sp.name}) ` : ""}scalingLevelDice rolls may require manual checking--mismatched roll number of rolls!`);

			sp.scalingLevelDice = {
				label: getLabel(),
				scaling: rolls.length === 4
					? {
						1: rolls[0],
						5: rolls[1],
						11: rolls[2],
						17: rolls[3]
					} : {
						1: rolls[0],
						5: rolls[2],
						11: rolls[3],
						17: rolls[4]
					}
			}
		} else if (sp.entries.length === 2 && sp.entries.filter(it => typeof it === "string").length === 2) {
			const rollsFirstLine = [];
			const rollsSecondLine = [];

			sp.entries[0].replace(/{@(?:damage|dice) ([^}]+)}/g, (...m) => {
				rollsFirstLine.push(m[1].split("|")[0]);
			});

			sp.entries[1].replace(/\({@(?:damage|dice) ([^}]+)}\)/g, (...m) => {
				rollsSecondLine.push(m[1].split("|")[0]);
			});

			if (rollsFirstLine.length >= 1 && rollsSecondLine.length >= 3) {
				if (rollsFirstLine.length > 1 || rollsSecondLine.length > 3) {
					options.cbWarning(`${sp.name ? `(${sp.name}) ` : ""}scalingLevelDice rolls may require manual checking--too many dice parts!`);
				}

				const label = getLabel();
				sp.scalingLevelDice = {
					label: label,
					scaling: {
						1: rollsFirstLine[0],
						5: rollsSecondLine[0],
						11: rollsSecondLine[1],
						17: rollsSecondLine[2]
					}
				};
			}
		}
	}
}

if (typeof module !== "undefined") {
	module.exports = {
		DamageInflictTagger,
		DamageResVulnImmuneTagger,
		ConditionInflictTagger,
		SavingThrowTagger,
		OpposedCheckTagger,
		SpellAttackTagger,
		MiscTagsTagger,
		ScalingLevelDiceTagger
	};
}
