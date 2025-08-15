// Helper: year
document.getElementById('year').textContent = new Date().getFullYear();

// CTA WA hero
const waNumber = '6281293279819';
const heroCta = document.getElementById('cta-hero');
if (heroCta){
  const text = encodeURIComponent('Halo BTS Academy! Saya tertarik mendaftar. Mohon info program & biaya. 🙏');
  heroCta.href = `https://wa.me/${waNumber}?text=${text}`;
}

// Reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('on'); io.unobserve(e.target); }
  });
},{root:null, threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Testimonial slider (autoplay 4s + dots)
document.querySelectorAll('.slider').forEach((slider)=>{
  const slides = slider.querySelectorAll('.slide');
  const dotsWrap = slider.querySelector('.dots');
  let current = 0;
  slides.forEach((_,i)=>{
    const b = document.createElement('button');
    b.setAttribute('aria-label', `Slide ${i+1}`);
    b.addEventListener('click', ()=>go(i,true));
    dotsWrap.appendChild(b);
  });
  function go(i,stopAuto=false){
    current = (i+slides.length)%slides.length;
    slides.forEach(s=>s.classList.remove('is-active'));
    dotsWrap.querySelectorAll('button').forEach(d=>d.classList.remove('is-active'));
    slides[current].classList.add('is-active');
    dotsWrap.children[current].classList.add('is-active');
    if(stopAuto){ clearInterval(timer); }
  }
  go(0);
  const interval = Number(slider.dataset.autoplay||4000);
  let timer = setInterval(()=>go(current+1), interval);
});

// WhatsApp form submit
const form = document.getElementById('form-daftar');
if(form){
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const msg = `Halo BTS Academy,%0A%0ASaya ingin mendaftar.%0A- Nama: ${encodeURIComponent(data.nama)}%0A- Jenjang: ${encodeURIComponent(data.jenjang)}%0A- Nomor HP: ${encodeURIComponent(data.hp)}%0A%0ATerima kasih.`;
    const url = `https://wa.me/${waNumber}?text=${msg}`;
    window.open(url, '_blank', 'noopener');
  });
}
