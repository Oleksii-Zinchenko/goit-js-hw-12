import{a as q,S as $,i as h}from"./assets/vendor-BK_rxH-O.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function a(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=a(t);fetch(t.href,o)}})();const B="51394947-9bb14754823a2b1072a733c4f",E="https://pixabay.com/api/";async function y(e,r=1){const{data:a}=await q(`${E}`,{params:{key:B,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15}});return a}const g=document.querySelector(".gallery"),L=document.querySelector(".loader"),b=document.querySelector(".load-more-wrapper"),P=new $(".gallery a",{captionsData:"alt",captionDelay:250});function v(e){const r=e.map(C).join("");g.insertAdjacentHTML("beforeend",r),P.refresh()}function C({webformatURL:e,largeImageURL:r,tags:a,likes:n,views:t,comments:o,downloads:s}){return`
    <li class="gallery-item">
      <a href="${r}">
        <img src="${e}" alt="${a}" loading="lazy" />
      </a>
      <div class="info">
        ${c("Likes",n)}
        ${c("Views",t)}
        ${c("Comments",o)}
        ${c("Downloads",s)}
      </div>
    </li>
  `}function c(e,r){return`
    <div class="info-item">
      <p class="label">${e}</p>
      <p class="value">${r}</p>
    </div>
  `}function O(){g.innerHTML=""}function w(){L.classList.remove("hidden")}function m(){L.classList.add("hidden")}function x(){b.classList.remove("hidden")}function l(){b.classList.add("hidden")}const M=document.querySelector(".form"),d=document.querySelector(".load-more");let i=1,u="",f=0;M.addEventListener("submit",H);d.addEventListener("click",I);async function H(e){e.preventDefault();const a=M.elements["search-text"].value.trim();if(!a){p("Please enter a search query!");return}u=a,i=1,O(),l(),w();try{const n=await y(u,i);if(m(),!n.hits.length){p("No images found. Try another query.");return}f=n.totalHits,v(n.hits),f>i*15?x():l()}catch(n){S(n)}}async function I(){i+=1,w(),d.disabled=!0;try{const e=await y(u,i);v(e.hits),m(),d.disabled=!1,N(),i*15<f||(l(),h.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch(e){S(e)}}function N(){const e=document.querySelector(".gallery-item");if(e){const r=e.getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}}function p(e){h.warning({message:e,position:"topRight"})}function S(e){m(),h.error({message:`Error: ${e.message}`,position:"topRight"})}
//# sourceMappingURL=index.js.map
