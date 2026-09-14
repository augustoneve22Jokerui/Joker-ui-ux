document.addEventListener("DOMContentLoaded",()=>{
  const reveals=document.querySelectorAll(".reveal");
  const observer=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.12});
  reveals.forEach((el,i)=>{
    el.style.transitionDelay=(Math.min(i*55,350))+"ms";
    observer.observe(el);
  });

  document.querySelectorAll(".heart").forEach(button=>{
    button.addEventListener("click",()=>{
      button.classList.toggle("active");
      button.textContent=button.classList.contains("active")?"♥":"♡";
      button.setAttribute("aria-pressed",button.classList.contains("active"));
    });
  });

  if(matchMedia("(pointer:fine)").matches){
    document.querySelectorAll(".card").forEach(card=>{
      card.addEventListener("pointermove",e=>{
        const r=card.getBoundingClientRect();
        const x=(e.clientX-r.left)/r.width-.5;
        const y=(e.clientY-r.top)/r.height-.5;
        card.style.transform=`perspective(900px) rotateX(${(-y*2).toFixed(2)}deg) rotateY(${(x*2).toFixed(2)}deg) translateY(-7px)`;
      });
      card.addEventListener("pointerleave",()=>{
        card.style.transform="";
      });
    });
  }

  let ticking=false;
  addEventListener("pointermove",e=>{
    if(ticking)return;
    ticking=true;
    requestAnimationFrame(()=>{
      const x=(e.clientX/innerWidth-.5)*8;
      const y=(e.clientY/innerHeight-.5)*8;
      document.querySelector(".shell").style.transform=`translate3d(${x/5}px,${y/5}px,0)`;
      ticking=false;
    });
  });
});
