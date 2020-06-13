"use strict";

class NavBar {
	static init () {
		this._initInstallPrompt();
		// render the visible elements ASAP
		window.addEventListener(
			"DOMContentLoaded",
			function () {
				NavBar.initElements();
				NavBar.highlightCurrentPage();
			}
		);
		window.addEventListener("load", NavBar.initHandlers);
	}

	static _initInstallPrompt () {
		NavBar._cachedInstallEvent = null;
		window.addEventListener("beforeinstallprompt", e => NavBar._cachedInstallEvent = e);
	}

	static initElements () {
		const navBar = document.getElementById("navbar");

		// create mobile "Menu" button
		const btnShowHide = document.createElement("button");
		btnShowHide.className = "btn btn-default page__btn-toggle-nav";
		btnShowHide.innerHTML = "Menu";
		btnShowHide.onclick = () => {
			$(btnShowHide).toggleClass("active");
			$(`.page__nav-hidden-mobile`).toggleClass("block", $(btnShowHide).hasClass("active"));
		};
		document.getElementById("navigation").prepend(btnShowHide);

		addLi(navBar, "5etools.html", "Home", {isRoot: true});

		const ulRules = addDropdown(navBar, "Rules");
		addLi(ulRules, "quickreference.html", "Quick Reference");
		addLi(ulRules, "variantrules.html", "Variant & Optional Rules/Misc");
		addLi(ulRules, "tables.html", "Tables");
		addDivider(ulRules);
		const ulBooks = addDropdown(ulRules, "Books", true);
		addLi(ulBooks, "books.html", "View All/Homebrew");
		addDivider(ulBooks);
		addLi(ulBooks, "book.html", "Player's Handbook", {aHash: "PHB"});
		addLi(ulBooks, "book.html", "Monster Manual", {aHash: "MM"});
		addLi(ulBooks, "book.html", "Dungeon Master's Guide", {aHash: "DMG"});
		addDivider(ulBooks);
		addLi(ulBooks, "book.html", "Sword Coast Adventurer's Guide", {aHash: "SCAG"});
		addLi(ulBooks, "book.html", "Volo's Guide to Monsters", {aHash: "VGM"});
		addLi(ulBooks, "book.html", "Xanathar's Guide to Everything", {aHash: "XGE"});
		addLi(ulBooks, "book.html", "Mordenkainen's Tome of Foes", {aHash: "MTF"});
		addLi(ulBooks, "book.html", "Guildmasters' Guide to Ravnica", {aHash: "GGR"});
		addLi(ulBooks, "book.html", "Acquisitions Incorporated", {aHash: "AI"});
		addLi(ulBooks, "book.html", "Eberron: Rising from the Last War", {aHash: "ERLW"});
		addLi(ulBooks, "book.html", "Dungeons & Dragons vs. Rick and Morty: Basic Rules", {aHash: "RMR"});
		addLi(ulBooks, "book.html", "Explorer's Guide to Wildemount", {aHash: "EGW"});
		addLi(ulBooks, "book.html", "Mythic Odysseys of Theros", {aHash: "MOT"});
		addDivider(ulBooks);
		addLi(ulBooks, "book.html", "Adventurers League", {aHash: "AL"});
		addLi(ulBooks, "book.html", "Sage Advice Compendium", {aHash: "SAC"});

		const ulPlayers = addDropdown(navBar, "Player");
		addLi(ulPlayers, "classes.html", "Classes");
		addLi(ulPlayers, "backgrounds.html", "Backgrounds");
		addLi(ulPlayers, "feats.html", "Feats");
		addLi(ulPlayers, "races.html", "Races");
		addDivider(ulPlayers);
		addLi(ulPlayers, "statgen.html", "Statgen");
		addDivider(ulPlayers);
		addLi(ulPlayers, "lifegen.html", "This Is Your Life");
		addLi(ulPlayers, "names.html", "Names");

		const ulDms = addDropdown(navBar, "Dungeon Master");
		addLi(ulDms, "dmscreen.html", "DM Screen");
		addDivider(ulDms);
		const ulAdventures = addDropdown(ulDms, "Adventures", true);
		addLi(ulAdventures, "adventures.html", "View All/Homebrew");
		addDivider(ulAdventures);
		addLi(ulAdventures, "adventure.html", "Lost Mines of Phandelver", {isSide: true, aHash: "LMoP"});
		addLi(ulAdventures, "adventure.html", "Hoard of the Dragon Queen", {isSide: true, aHash: "HotDQ"});
		addLi(ulAdventures, "adventure.html", "Rise of Tiamat", {isSide: true, aHash: "RoT"});
		addLi(ulAdventures, "adventure.html", "Princes of the Apocalypse", {isSide: true, aHash: "PotA"});
		addLi(ulAdventures, "adventure.html", "Out of the Abyss", {isSide: true, aHash: "OotA"});
		addLi(ulAdventures, "adventure.html", "Curse of Strahd", {isSide: true, aHash: "CoS"});
		addLi(ulAdventures, "adventure.html", "Storm King's Thunder", {isSide: true, aHash: "SKT"});
		addLi(ulAdventures, "adventure.html", "Tales from the Yawning Portal: The Sunless Citadel", {isSide: true, aHash: "TftYP-TSC"});
		addLi(ulAdventures, "adventure.html", "Tales from the Yawning Portal: The Forge of Fury", {isSide: true, aHash: "TftYP-TFoF"});
		addLi(ulAdventures, "adventure.html", "Tales from the Yawning Portal: The Hidden Shrine of Tamoachan", {isSide: true, aHash: "TftYP-THSoT"});
		addLi(ulAdventures, "adventure.html", "Tales from the Yawning Portal: White Plume Mountain", {isSide: true, aHash: "TftYP-WPM"});
		addLi(ulAdventures, "adventure.html", "Tales from the Yawning Portal: Dead in Thay", {isSide: true, aHash: "TftYP-DiT"});
		addLi(ulAdventures, "adventure.html", "Tales from the Yawning Portal: Against the Giants", {isSide: true, aHash: "TftYP-AtG"});
		addLi(ulAdventures, "adventure.html", "Tales from the Yawning Portal: Tomb of Horrors", {isSide: true, aHash: "TftYP-ToH"});
		addLi(ulAdventures, "adventure.html", "Tomb of Annihilation", {isSide: true, aHash: "ToA"});
		addLi(ulAdventures, "adventure.html", "The Tortle Package", {isSide: true, aHash: "TTP"});
		addLi(ulAdventures, "adventure.html", "Waterdeep: Dragon Heist", {isSide: true, aHash: "WDH"});
		addLi(ulAdventures, "adventure.html", "Lost Laboratory of Kwalish", {isSide: true, aHash: "LLK"});
		addLi(ulAdventures, "adventure.html", "Waterdeep: Dungeon of the Mad Mage", {isSide: true, aHash: "WDMM"});
		addLi(ulAdventures, "adventure.html", "Krenko's Way", {isSide: true, aHash: "KKW"});
		addLi(ulAdventures, "adventure.html", "Ghosts of Saltmarsh", {isSide: true, aHash: "GoS"});
		addLi(ulAdventures, "adventure.html", "Hunt for the Thessalhydra", {isSide: true, aHash: "HftT"});
		addLi(ulAdventures, "adventure.html", "The Orrery of the Wanderer", {isSide: true, aHash: "OoW"});
		addLi(ulAdventures, "adventure.html", "Essentials Kit: Dragon of Icespire Peak", {isSide: true, aHash: "DIP"});
		addLi(ulAdventures, "adventure.html", "Essentials Kit: Storm Lord's Wrath", {isSide: true, aHash: "SLW"});
		addLi(ulAdventures, "adventure.html", "Essentials Kit: Sleeping Dragon's Wake", {isSide: true, aHash: "SDW"});
		addLi(ulAdventures, "adventure.html", "Essentials Kit: Divine Contention", {isSide: true, aHash: "DC"});
		addLi(ulAdventures, "adventure.html", "Baldur's Gate: Descent Into Avernus", {isSide: true, aHash: "BGDIA"});
		addLi(ulAdventures, "adventure.html", "Locathah Rising", {isSide: true, aHash: "LR"});
		addLi(ulAdventures, "adventure.html", "Eberron: Forgotten Relics", {isSide: true, aHash: "EFR"});
		addLi(ulAdventures, "adventure.html", "Rick and Morty: Big Rick Energy", {isSide: true, aHash: "RMBRE"});
		addLi(ulAdventures, "adventure.html", "Infernal Machine Rebuild", {isSide: true, aHash: "IMR"});
		addLi(ulAdventures, "adventure.html", "Wildemount: Tide of Retribution", {isSide: true, aHash: "ToR"});
		addLi(ulAdventures, "adventure.html", "Wildemount: Dangerous Designs", {isSide: true, aHash: "DD"});
		addLi(ulAdventures, "adventure.html", "Wildemount: Frozen Sick", {isSide: true, aHash: "FS"});
		addLi(ulAdventures, "adventure.html", "Wildemount: Unwelcome Spirits", {isSide: true, aHash: "US"});
		addLi(ulDms, "cultsboons.html", "Cults & Supernatural Boons");
		addLi(ulDms, "objects.html", "Objects");
		addLi(ulDms, "trapshazards.html", "Traps & Hazards");
		addDivider(ulDms);
		addLi(ulDms, "crcalculator.html", "CR Calculator");
		addLi(ulDms, "encountergen.html", "Encounter Generator");
		addLi(ulDms, "lootgen.html", "Loot Generator");

		const ulReferences = addDropdown(navBar, "References");
		addLi(ulReferences, "actions.html", "Actions");
		addLi(ulReferences, "bestiary.html", "Bestiary");
		addLi(ulReferences, "conditionsdiseases.html", "Conditions & Diseases");
		addLi(ulReferences, "deities.html", "Deities");
		addLi(ulReferences, "items.html", "Items");
		addLi(ulReferences, "languages.html", "Languages");
		addLi(ulReferences, "optionalfeatures.html", "Other Options and Features");
		addLi(ulReferences, "rewards.html", "Other Rewards");
		addLi(ulReferences, "psionics.html", "Psionics");
		addLi(ulReferences, "spells.html", "Spells");
		addLi(ulReferences, "vehicles.html", "Vehicles");

		const ulUtils = addDropdown(navBar, "Utilities");
		addLi(ulUtils, "blacklist.html", "Content Blacklist");
		addLi(ulUtils, "makebrew.html", "Homebrew Builder");
		addLi(ulUtils, "managebrew.html", "Homebrew Manager");
		addDivider(ulUtils);
		addLi(ulUtils, "inittrackerplayerview.html", "Initiative Tracker Player View");
		addDivider(ulUtils);
		addLi(ulUtils, "renderdemo.html", "Renderer Demo");
		addLi(ulUtils, "makecards.html", "RPG Cards JSON Builder");
		addLi(ulUtils, "converter.html", "Text Converter");
		addDivider(ulUtils);
		addLi(ulUtils, "plutonium.html", "Plutonium (Foundry Module) Features");
		addDivider(ulUtils);
		addLi(ulUtils, "roll20.html", "Roll20 Script Help");
		addLi(ulUtils, "makeshaped.html", "Roll20 Shaped Sheet JS Builder");
		addDivider(ulUtils);
		addLi(ulUtils, "changelog.html", "Changelog");
		addLi(ulUtils, `https://wiki.5e.tools/index.php/Page:_${NavBar.getCurrentPage().replace(/.html$/i, "")}`, "Help", {isExternal: true});
		addDivider(ulUtils);
		addLi(ulUtils, "privacy-policy.html", "Privacy Policy");

		addLi(navBar, "donate.html", "Donate", {isRoot: true});

		const ulSettings = addDropdown(navBar, "Settings");
		addButton(
			ulSettings,
			{
				html: styleSwitcher.getActiveDayNight() === StyleSwitcher.STYLE_NIGHT ? "Day Mode" : "Night Mode",
				click: (evt) => {
					evt.preventDefault();
					styleSwitcher.toggleDayNight();
				},
				className: "nightModeToggle"
			}
		);
		addButton(
			ulSettings,
			{
				html: styleSwitcher.getActiveWide() === true ? "Disable Wide Mode" : "Enable Wide Mode (Experimental)",
				click: (evt) => {
					evt.preventDefault();
					styleSwitcher.toggleWide();
				},
				className: "wideModeToggle",
				title: "This feature is unsupported. Expect bugs."
			}
		);
		addDivider(ulSettings);
		addButton(
			ulSettings,
			{
				html: "Save State to File",
				click: async (evt) => {
					evt.preventDefault();
					const sync = StorageUtil.syncGetDump();
					const async = await StorageUtil.pGetDump();
					const dump = {sync, async};
					DataUtil.userDownload("5etools", dump);
				},
				title: "Save any locally-stored data (loaded homebrew, active blacklists, DM Screen configuration,...) to a file."
			}
		);
		addButton(
			ulSettings,
			{
				html: "Load State from File",
				click: async (evt) => {
					evt.preventDefault();
					const dump = await DataUtil.pUserUpload();

					StorageUtil.syncSetFromDump(dump.sync);
					await StorageUtil.pSetFromDump(dump.async);
					location.reload();
				},
				title: "Load previously-saved data (loaded homebrew, active blacklists, DM Screen configuration,...) from a file."
			}
		);
		addDivider(ulSettings);
		addButton(
			ulSettings,
			{
				html: "Add as App",
				click: async (evt) => {
					evt.preventDefault();
					try {
						NavBar._cachedInstallEvent.prompt();
					} catch (e) {
						// Ignore errors
					}
				},
				title: "Add the site to your home screen. When used in conjunction with the Preload Offline Data option, this can create a functional offline copy of the site."
			}
		);
		addButton(
			ulSettings,
			{
				html: "Preload Offline Data",
				click: async (evt) => {
					evt.preventDefault();

					if (!navigator.serviceWorker || !navigator.serviceWorker.controller) {
						JqueryUtil.doToast(`The loader was not yet available! Reload the page and try again. If this problem persists, your browser may not support preloading.`);
						return;
					}

					// a pipe with has "port1" and "port2" props; we'll send "port2" to the service worker so it can
					//   send messages back down the pipe to us
					const messageChannel = new MessageChannel();
					let hasSentPort = false;
					const sendMessage = (data) => {
						try {
							// Only send the MessageChannel port once, as the first send will transfer ownership of the
							//   port over to the service worker (and we can no longer access it to even send it)
							if (!hasSentPort) {
								hasSentPort = true;
								navigator.serviceWorker.controller.postMessage(data, [messageChannel.port2]);
							} else {
								navigator.serviceWorker.controller.postMessage(data);
							}
						} catch (e) {
							// Ignore errors
							setTimeout(() => { throw e; })
						}
					};

					if (NavBar._downloadBarMeta) {
						if (NavBar._downloadBarMeta) {
							NavBar._downloadBarMeta.$wrpOuter.remove();
							NavBar._downloadBarMeta = null;
						}
						sendMessage({"type": "cache-cancel"});
					}

					const $dispProgress = $(`<div class="page__disp-download-progress-bar"/>`);
					const $dispPct = $(`<div class="page__disp-download-progress-text flex-vh-center bold">0%</div>`);

					const $btnCancel = $(`<button class="btn btn-default"><span class="glyphicon glyphicon-remove"></span></button>`)
						.click(() => {
							if (NavBar._downloadBarMeta) {
								NavBar._downloadBarMeta.$wrpOuter.remove();
								NavBar._downloadBarMeta = null;
							}
							sendMessage({"type": "cache-cancel"});
						});

					const $wrpBar = $$`<div class="page__wrp-download-bar w-100 relative mr-2">${$dispProgress}${$dispPct}</div>`;
					const $wrpOuter = $$`<div class="page__wrp-download">
						${$wrpBar}
						${$btnCancel}
					</div>`.appendTo($("body"));

					NavBar._downloadBarMeta = {$wrpOuter, $wrpBar, $dispProgress, $dispPct};

					// Trigger the service worker to cache everything
					messageChannel.port1.onmessage = e => {
						const msg = e.data;
						switch (msg.type) {
							case "download-progress": {
								if (NavBar._downloadBarMeta) {
									NavBar._downloadBarMeta.$dispProgress.css("width", msg.data.pct);
									NavBar._downloadBarMeta.$dispPct.text(msg.data.pct);
								}
								break;
							}
							case "download-cancelled": {
								if (NavBar._downloadBarMeta) {
									NavBar._downloadBarMeta.$wrpOuter.remove();
									NavBar._downloadBarMeta = null;
								}
								break;
							}
							case "download-error": {
								if (NavBar._downloadBarMeta) {
									NavBar._downloadBarMeta.$wrpBar.addClass("page__wrp-download-bar--error");
									NavBar._downloadBarMeta.$dispProgress.addClass("page__disp-download-progress-bar--error");
									NavBar._downloadBarMeta.$dispPct.text("Error!");

									JqueryUtil.doToast(`An error occurred. ${VeCt.STR_SEE_CONSOLE}`);
								}
								setTimeout(() => { throw new Error(msg.message); })
								break;
							}
						}
					};

					sendMessage({"type": "cache-start"});
				},
				title: "Preload the site data for offline use. Warning: slow. If it appears to freeze, cancel it and try again; progress will be saved."
			}
		);

		/**
		 * Adds a new item to the navigation bar. Can be used either in root, or in a different UL.
		 * @param appendTo - Element to append this link to.
		 * @param aHref - Where does this link to.
		 * @param aText - What text does this link have.
		 * @param [opts] - Options object.
		 * @param [opts.isSide] - True if this item is part of a side menu.
		 * @param [opts.aHash] - Optional hash to be appended to the base href
		 * @param [opts.isRoot] - If the item is a root navbar element.
		 * @param [opts.isExternal] - If the item is an external link.
		 */
		function addLi (appendTo, aHref, aText, opts) {
			opts = opts || {};
			const hashPart = opts.aHash ? `#${opts.aHash}`.toLowerCase() : "";

			const li = document.createElement("li");
			li.setAttribute("role", "presentation");
			li.setAttribute("id", aText.toLowerCase().replace(/\s+/g, ""));
			li.setAttribute("data-page", `${aHref}${hashPart}`);
			if (opts.isRoot) {
				li.classList.add("page__nav-hidden-mobile");
				li.classList.add("page__btn-nav-root");
			}
			if (opts.isSide) {
				li.onmouseenter = function () { NavBar.handleSideItemMouseEnter(this) }
			} else {
				li.onmouseenter = function () { NavBar.handleItemMouseEnter(this) };
				li.onclick = function () { NavBar._dropdowns.forEach(ele => ele.classList.remove("open")) }
			}

			const a = document.createElement("a");
			a.href = `${aHref}${hashPart}`;
			a.innerHTML = aText;
			a.classList.add("nav__link");

			if (opts.isExternal) {
				a.setAttribute("target", "_blank");
				a.classList.add("inline-split-v-center");
				a.classList.add("w-100");
				a.innerHTML = `<span>${aText}</span><span class="glyphicon glyphicon-new-window"/>`
			}

			li.appendChild(a);
			appendTo.appendChild(li);
		}

		function addDivider (appendTo) {
			const li = document.createElement("li");
			li.setAttribute("role", "presentation");
			li.className = "divider";

			appendTo.appendChild(li);
		}

		/**
		 * Adds a new dropdown starting list to the navigation bar
		 * @param {String} appendTo - Element to append this link to.
		 * @param {String} text - Dropdown text.
		 * @param {boolean} [isSide=false] - If this is a sideways dropdown.
		 */
		function addDropdown (appendTo, text, isSide = false) {
			const li = document.createElement("li");
			li.setAttribute("role", "presentation");
			li.className = `dropdown dropdown--navbar page__nav-hidden-mobile ${isSide ? "" : "page__btn-nav-root"}`;
			if (isSide) {
				li.onmouseenter = function () { NavBar.handleSideItemMouseEnter(this); };
			} else {
				li.onmouseenter = function () { NavBar.handleItemMouseEnter(this); };
			}

			const a = document.createElement("a");
			a.className = "dropdown-toggle";
			a.href = "#";
			a.setAttribute("role", "button");
			a.onclick = function (event) { NavBar.handleDropdownClick(this, event, isSide); };
			if (isSide) {
				a.onmouseenter = function () { NavBar.handleSideDropdownMouseEnter(this); };
				a.onmouseleave = function () { NavBar.handleSideDropdownMouseLeave(this); };
			}
			a.innerHTML = `${text} <span class="caret ${isSide ? "caret--right" : ""}"></span>`;

			const ul = document.createElement("li");
			ul.className = `dropdown-menu ${isSide ? "dropdown-menu--side" : "dropdown-menu--top"}`;
			ul.onclick = function (event) { event.stopPropagation(); };

			li.appendChild(a);
			li.appendChild(ul);
			appendTo.appendChild(li);
			return ul;
		}

		/**
		 * Special LI for buttong
		 * @param appendTo The element to append to.
		 * @param options Options.
		 * @param options.html Button text.
		 * @param options.click Button click handler.
		 * @param options.title Button title.
		 * @param options.className Additional button classes.
		 */
		function addButton (appendTo, options) {
			const li = document.createElement("li");
			li.setAttribute("role", "presentation");

			const a = document.createElement("a");
			a.href = "#";
			if (options.className) a.className = options.className;
			a.onclick = options.click;
			a.innerHTML = options.html;

			if (options.title) li.setAttribute("title", options.title);

			li.appendChild(a);
			appendTo.appendChild(li);
		}
	}

	static getCurrentPage () {
		let currentPage = window.location.pathname;
		currentPage = currentPage.substr(currentPage.lastIndexOf("/") + 1);

		if (!currentPage) currentPage = "5etools.html";
		return currentPage.trim();
	}

	static highlightCurrentPage () {
		let currentPage = NavBar.getCurrentPage();

		let isSecondLevel = false;
		if (currentPage.toLowerCase() === "book.html" || currentPage.toLowerCase() === "adventure.html") {
			const hashPart = window.location.hash.split(",")[0];
			if (currentPage.toLowerCase() === "adventure.html") isSecondLevel = true;
			currentPage += hashPart.toLowerCase();
		}
		if (currentPage.toLowerCase() === "adventures.html") isSecondLevel = true;

		if (typeof _SEO_PAGE !== "undefined") currentPage = `${_SEO_PAGE}.html`;

		try {
			let current = document.querySelector(`li[data-page="${currentPage}"]`);
			if (current == null) {
				currentPage = currentPage.split("#")[0];
				if (NavBar.ALT_CHILD_PAGES[currentPage]) currentPage = NavBar.ALT_CHILD_PAGES[currentPage];
				current = document.querySelector(`li[data-page="${currentPage}"]`);
			}
			current.parentNode.childNodes.forEach(n => n.classList && n.classList.remove("active"));
			current.classList.add("active");

			let closestLi = current.parentNode;
			const setNearestParentActive = () => {
				while (closestLi !== null && (closestLi.nodeName !== "LI" || !closestLi.classList.contains("dropdown"))) closestLi = closestLi.parentNode;
				closestLi && closestLi.classList.add("active");
			};
			setNearestParentActive();
			if (isSecondLevel) {
				closestLi = closestLi.parentNode;
				setNearestParentActive();
			}
		} catch (ignored) { setTimeout(() => { throw ignored }); }
	}

	static initHandlers () {
		NavBar._dropdowns = [...document.getElementById("navbar").querySelectorAll(`li.dropdown--navbar`)];
		document.addEventListener("click", () => NavBar._dropdowns.forEach(ele => ele.classList.remove("open")));

		NavBar._clearAllTimers();
	}

	static handleDropdownClick (ele, event, isSide) {
		event.preventDefault();
		event.stopPropagation();
		if (isSide) return;
		const isOpen = ele.parentNode.classList.contains("open");
		if (isOpen) NavBar._dropdowns.forEach(ele => ele.classList.remove("open"));
		else NavBar._openDropdown(ele);
	}

	static _openDropdown (fromLink) {
		const noRemove = new Set();
		let parent = fromLink.parentNode;
		parent.classList.add("open");
		noRemove.add(parent);

		while (parent.nodeName !== "NAV") {
			parent = parent.parentNode;
			if (parent.nodeName === "LI") {
				parent.classList.add("open");
				noRemove.add(parent);
			}
		}

		NavBar._dropdowns.filter(ele => !noRemove.has(ele)).forEach(ele => ele.classList.remove("open"));
	}

	static handleItemMouseEnter (ele) {
		const $ele = $(ele);
		const timerIds = $ele.siblings("[data-timer-id]").map((i, e) => ({$ele: $(e), timerId: $(e).data("timer-id")})).get();
		timerIds.forEach(({$ele, timerId}) => {
			if (NavBar._timersOpen[timerId]) {
				clearTimeout(NavBar._timersOpen[timerId]);
				delete NavBar._timersOpen[timerId];
			}

			if (!NavBar._timersClose[timerId] && $ele.hasClass("open")) {
				const getTimeoutFn = () => {
					if (NavBar._timerMousePos[timerId]) {
						const [xStart, yStart] = NavBar._timerMousePos[timerId];
						// for generalised use, this should be made check against the bounding box for the side menu
						// and possibly also check Y pos; e.g.
						// || EventUtil._mouseY > yStart + NavBar.MIN_MOVE_PX
						if (EventUtil._mouseX > xStart + NavBar.MIN_MOVE_PX) {
							NavBar._timerMousePos[timerId] = [EventUtil._mouseX, EventUtil._mouseY];
							NavBar._timersClose[timerId] = setTimeout(() => getTimeoutFn(), NavBar.DROP_TIME / 2);
						} else {
							$ele.removeClass("open");
							delete NavBar._timersClose[timerId];
						}
					} else {
						$ele.removeClass("open");
						delete NavBar._timersClose[timerId];
					}
				};

				NavBar._timersClose[timerId] = setTimeout(() => getTimeoutFn(), NavBar.DROP_TIME);
			}
		});
	}

	static handleSideItemMouseEnter (ele) {
		const timerId = $(ele).closest(`li.dropdown`).data("timer-id");
		if (NavBar._timersClose[timerId]) {
			clearTimeout(NavBar._timersClose[timerId]);
			delete NavBar._timersClose[timerId];
			delete NavBar._timerMousePos[timerId];
		}
	}

	static handleSideDropdownMouseEnter (ele) {
		const $ele = $(ele);
		const timerId = $ele.parent().data("timer-id") || NavBar._timerId++;
		$ele.parent().attr("data-timer-id", timerId);

		if (NavBar._timersClose[timerId]) {
			clearTimeout(NavBar._timersClose[timerId]);
			delete NavBar._timersClose[timerId];
		}

		if (!NavBar._timersOpen[timerId]) {
			NavBar._timersOpen[timerId] = setTimeout(() => {
				NavBar._openDropdown(ele);
				delete NavBar._timersOpen[timerId];
				NavBar._timerMousePos[timerId] = [EventUtil._mouseX, EventUtil._mouseY];
			}, NavBar.DROP_TIME);
		}
	}

	static handleSideDropdownMouseLeave (ele) {
		const $ele = $(ele);
		if (!$ele.parent().data("timer-id")) return;
		const timerId = $ele.parent().data("timer-id");
		clearTimeout(NavBar._timersOpen[timerId]);
		delete NavBar._timersOpen[timerId];
	}

	static _clearAllTimers () {
		Object.entries(NavBar._timersOpen).forEach(([k, v]) => {
			clearTimeout(v);
			delete NavBar._timersOpen[k];
		});
	}
}
NavBar.DROP_TIME = 250;
NavBar.MIN_MOVE_PX = 7;
NavBar.ALT_CHILD_PAGES = {
	"book.html": "books.html",
	"adventure.html": "adventures.html"
};
NavBar._timerId = 1;
NavBar._timersOpen = {};
NavBar._timersClose = {};
NavBar._timerMousePos = {};
NavBar._cachedInstallEvent = null;
NavBar._downloadBarMeta = null;
NavBar.init();
