import { showCoordinates } from "./atlas.js";
import { loadHomeCards } from "./home.js";
import { loadMenu, toggleMenu } from "./menu.js";
import { slideLeft, slideRight, finishImageLoading } from "./navigations.js";
import { navigate, createRoutes, handler } from "./router.js";
import { setSearchContent, search, toggleSearchMenu, loadSearchContents } from './search.js'
import { hideContent } from "./pins.js";
import i18next from "./i18n.js";
import { applyTranslations } from './dom-i18n.js';

  await i18next.loadNamespaces('translation');
  applyTranslations();
  document.getElementById('lang-toggle').textContent = i18next.language.startsWith('pt') ? 'EN' : 'PT';

  //window.location = "#home";

  document.getElementById("content").addEventListener("mousedown", (e) => {
    showCoordinates(e);
  });
  document.querySelector("#sidebar-icon").addEventListener("click", () => toggleMenu());
  document.querySelector(".slide-left").addEventListener("click", () => slideLeft());
  document.querySelector(".slide-right").addEventListener("click", () => slideRight());
  document.querySelector(".logoPrincipal").addEventListener("click", () => navigate("#home"));
  document.querySelector("#search").addEventListener("click", () => toggleSearchMenu())
  document.querySelector("#search-button").addEventListener("click", () => search())
  document.querySelector("#search-input").addEventListener("input", (e) => setSearchContent(e.target.value))
  document.querySelector("#content").addEventListener("load", () => finishImageLoading());
  document.querySelector(".tooltip-card").addEventListener("click", () => hideContent());
  document.querySelector("#tooltip-close-button").addEventListener("click", () => hideContent());

  document.querySelector('#lang-toggle').addEventListener('click', async () => {
    const next = i18next.language.startsWith('pt') ? 'en' : 'pt';
    await i18next.changeLanguage(next);
    document.getElementById('lang-toggle').textContent = next === 'pt' ? 'EN' : 'PT';
    document.querySelector('#menu-sidebar-container').innerHTML = '';
    
    await createRoutes();
    loadMenu();
    await handler();
  });

  if (!window.location.hash) window.location.hash = "#home";

  await createRoutes();
  handler();
  loadHomeCards();
  loadMenu();
  loadSearchContents(); 

  window.addEventListener('hashchange', () => handler());

