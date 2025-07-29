import{a as q,S as $,i as f}from"./assets/vendor-BK_rxH-O.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function a(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=a(t);fetch(t.href,r)}})();const B="51394947-9bb14754823a2b1072a733c4f",E="https://pixabay.com/api/";async function p(e,o=1){const{data:a}=await q(`${E}`,{params:{key:B,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:15}});return a}const y=document.querySelector(".gallery"),g=document.querySelector(".loader"),L=document.querySelector(".load-more-wrapper"),b=document.querySelector(".load-more"),P=new $(".gallery a",{captionsData:"alt",captionDelay:250});function M(e){const o=e.map(C).join("");y.insertAdjacentHTML("beforeend",o),P.refresh()}function C({webformatURL:e,largeImageURL:o,tags:a,likes:n,views:t,comments:r,downloads:s}){return`
    <li class="gallery-item">
      <a href="${o}">
        <img src="${e}" alt="${a}" loading="lazy" />
      </a>
      <div class="info">
        ${c("Likes",n)}
        ${c("Views",t)}
        ${c("Comments",r)}
        ${c("Downloads",s)}
      </div>
    </li>
  `}function c(e,o){return`
    <div class="info-item">
      <p class="label">${e}</p>
      <p class="value">${o}</p>
    </div>
  `}function O(){y.innerHTML=""}function v(){g.classList.remove("hidden")}function h(){g.classList.add("hidden")}function x(){L.classList.remove("hidden")}function l(){L.classList.add("hidden")}function H(){b.disabled=!0}function I(){b.disabled=!1}const w=document.querySelector(".form"),N=document.querySelector(".load-more");let i=1,d="",u=0;w.addEventListener("submit",R);N.addEventListener("click",T);async function R(e){e.preventDefault();const a=w.elements["search-text"].value.trim();if(!a){m("Please enter a search query!");return}d=a,i=1,O(),l(),v();try{const n=await p(d,i);if(!n.hits.length){m("No images found. Try another query.");return}u=n.totalHits,M(n.hits),u>i*15?x():l()}catch(n){S(n)}finally{h()}}async function T(){i+=1,v(),H();try{const e=await p(d,i);M(e.hits),A(),i*15<u||(l(),f.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch(e){S(e)}finally{h(),I()}}function A(){const e=document.querySelector(".gallery-item");if(e){const o=e.getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"})}}function m(e){f.warning({message:e,position:"topRight"})}function S(e){h(),f.error({message:`Error: ${e.message}`,position:"topRight"})}
//# sourceMappingURL=index.js.map
