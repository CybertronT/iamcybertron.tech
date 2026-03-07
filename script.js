/* LOADER */
const lbar=document.getElementById('lbar'),lpct=document.getElementById('lpct'),loader=document.getElementById('loader');
let p=0;const li=setInterval(()=>{p+=Math.random()*16;if(p>=100){p=100;clearInterval(li);setTimeout(()=>loader.classList.add('done'),350)}lbar.style.width=p+'%';lpct.textContent=Math.floor(p)+'%'},130);

/* CURSOR */
const cur=document.getElementById('cur'),curO=document.getElementById('cur-o');
let mx=0,my=0,ox=0,oy=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px'});
(function ac(){ox+=(mx-ox)*.1;oy+=(my-oy)*.1;curO.style.left=ox+'px';curO.style.top=oy+'px';requestAnimationFrame(ac)})();
document.querySelectorAll('a,button,.pc,.rev-card,.cert,.exp-tab,.bc,.edu-card,.c-item,.fl-stat,.fl-top-cell,.rpill,.chip,.now-card,.blog-card,.gh-repo,.np-photo').forEach(el=>{
  el.addEventListener('mouseenter',()=>document.body.classList.add('hov'));
  el.addEventListener('mouseleave',()=>document.body.classList.remove('hov'));
});

/* SCROLL */
const sp=document.getElementById('scroll-prog'),btt=document.getElementById('btt');
const secs=['about','experience','skills','now','projects','github','blog','freelance','contact'];
window.addEventListener('scroll',()=>{
  sp.style.width=(scrollY/(document.body.scrollHeight-innerHeight)*100)+'%';
  document.getElementById('nav').classList.toggle('solid',scrollY>80);
  btt.classList.toggle('show',scrollY>600);
  let cs='';secs.forEach(id=>{const el=document.getElementById(id);if(el&&scrollY>=el.offsetTop-200)cs=id});
  document.querySelectorAll('.n-links a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cs));
});

/* REVEAL */
const ro=new IntersectionObserver(entries=>{entries.forEach((e,i)=>{if(e.isIntersecting)setTimeout(()=>e.target.classList.add('on'),i*60)})},{threshold:.07,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.rv,.rvl,.rvr').forEach(el=>ro.observe(el));

/* BARS */
const bo=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.querySelectorAll('.bar-fi').forEach(b=>b.style.width=b.dataset.w+'%')})},{threshold:.2});
document.querySelectorAll('#skills').forEach(s=>bo.observe(s));

/* EXP TABS */
document.querySelectorAll('.exp-tab').forEach(tab=>{
  tab.addEventListener('click',()=>{
    document.querySelectorAll('.exp-tab').forEach(t=>t.classList.remove('active'));
    document.querySelectorAll('.exp-panel').forEach(p=>p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.p).classList.add('active');
  });
});

/* HIDE PHOTO PLACEHOLDERS WHEN IMAGE LOADS */
document.querySelectorAll('.np-photo img').forEach(img=>{
  if(img.complete && img.naturalWidth>0){img.parentElement.querySelector('.np-ph').style.display='none'}
  img.addEventListener('load',()=>{img.parentElement.querySelector('.np-ph').style.display='none'});
  img.addEventListener('error',()=>{img.style.display='none'});
});

/* LIGHTBOX */
let lbGal='',lbIdx=0,lbItems=[];
document.querySelectorAll('.np-photo').forEach(photo=>{
  photo.addEventListener('click',()=>{
    const g=photo.dataset.gal;
    const i=parseInt(photo.dataset.i);
    lbItems=Array.from(document.querySelectorAll('.np-photo[data-gal="'+g+'"]'));
    lbGal=g;lbIdx=i;
    const img=photo.querySelector('img');
    if(!img||img.style.display==='none')return;
    showLb();
  });
});
function showLb(){
  const photo=lbItems[lbIdx];
  const img=photo.querySelector('img');
  if(!img)return;
  document.getElementById('lb-img').src=img.src;
  document.getElementById('lb-img').alt=photo.dataset.cap||'';
  document.getElementById('lb-cap').textContent=photo.dataset.cap||'';
  document.getElementById('lb-counter').textContent=(lbIdx+1)+' / '+lbItems.length;
  document.getElementById('lb').classList.add('open');
  document.body.style.overflow='hidden';
}
function lbNav(dir){lbIdx=(lbIdx+dir+lbItems.length)%lbItems.length;showLb()}
function closeLb(){document.getElementById('lb').classList.remove('open');document.body.style.overflow=''}
document.getElementById('lb').addEventListener('click',e=>{if(e.target===document.getElementById('lb'))closeLb()});

/* PROJECT FILTER */
document.querySelectorAll('.pf-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.pf-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f=btn.dataset.filter;
    document.querySelectorAll('.pc').forEach(card=>{
      const show=f==='all'||card.dataset.cat===f;
      card.style.display=show?'flex':'none';
      if(show){card.style.opacity='0';card.style.transform='translateY(14px)';setTimeout(()=>{card.style.transition='opacity .4s,transform .4s';card.style.opacity='1';card.style.transform='none'},40)}
    });
  });
});

/* PROJECT CARD CLICK */
document.querySelectorAll('.pc[data-modal]').forEach(card=>{
  card.addEventListener('click',e=>{if(!e.target.closest('.p-actions'))openModal(card.dataset.modal)});
});

/* MOBILE MENU */
document.getElementById('burger').addEventListener('click',()=>document.getElementById('mob-menu').classList.add('open'));
document.getElementById('mob-close').addEventListener('click',()=>document.getElementById('mob-menu').classList.remove('open'));
document.querySelectorAll('.mob-lnk').forEach(a=>a.addEventListener('click',()=>document.getElementById('mob-menu').classList.remove('open')));

/* SMOOTH NAV */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}});
});

/* CONTACT FORM */
document.getElementById('f-submit').addEventListener('click',()=>{
  const n=document.getElementById('f-name').value.trim();
  const em=document.getElementById('f-email').value.trim();
  const msg=document.getElementById('f-msg').value.trim();
  if(!n||!em||!msg){alert('Please fill in Name, Email, and Message.');return}
  const sub=encodeURIComponent('Portfolio Inquiry from '+n);
  const body=encodeURIComponent('Name: '+n+'\nEmail: '+em+'\nCompany: '+document.getElementById('f-company').value+'\nService: '+document.getElementById('f-service').value+'\nBudget: '+document.getElementById('f-budget').value+'\n\nMessage:\n'+msg);
  window.location.href='mailto:fawazadewale120@gmail.com?subject='+sub+'&body='+body;
  document.getElementById('f-success').style.display='block';
});

/* KEYBOARD */
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){closeLb();closeModal()}
  if(document.getElementById('lb').classList.contains('open')){
    if(e.key==='ArrowLeft')lbNav(-1);
    if(e.key==='ArrowRight')lbNav(1);
  }
});

/* MODALS */
const MD={
  mNids:{cat:'Cybersecurity · Personal Project',title:'Network Intrusion Detection System (NIDS)',img:'images/nids.jpg',
    ov:'A complete enterprise-grade NIDS designed, deployed, and documented as a personal research and portfolio project.',
    role:'Sole Engineer — Architecture, Deployment, Configuration, Documentation',
    bullets:['Deployed Suricata as the IDS engine with custom rules detecting port scans, brute-force attempts, and known exploit signatures.','Configured Pfsense as the perimeter firewall with traffic mirrored to Suricata for deep packet inspection.','Filebeat installed to forward structured logs in real time to the centralized Elasticsearch stack.','Kibana dashboards built to visualize alerts, categorize severity, map attack sources, and track trends over time.','Deployed a security honeypot on an isolated subnet to attract and study attacker behavior without risk to production.','Automated email and Slack notifications triggered on high-severity Suricata alerts.','Full documentation: network topology, rule sets, alert tuning, and incident response playbook.'],
    stack:['Suricata','Pfsense','Filebeat','Elasticsearch','Kibana','Linux','Python','Bash'],
    links:[{t:'View on LinkedIn',h:'https://www.linkedin.com/posts/adewale-fawaz-oladimeji-172b05215_security-network-data-activity-6979777538747174912-5gNJ',f:true}]},
  mCicd:{cat:'Infrastructure · DevSecOps · NextResearch LLC',title:'CI/CD Pipeline & Infrastructure Automation',img:'images/networking.jpg',
    ov:'End-to-end DevSecOps pipeline and infrastructure automation built and maintained for NextResearch LLC, enabling reliable, secure, zero-downtime deployments.',
    role:'DevSecOps Engineer — Design, Implementation, Maintenance',
    bullets:['Ansible AWX configured with custom playbooks for automated server provisioning, patch management, and application deployment.','Terraform IaC for all infrastructure — servers, networking, DNS, and security groups version-controlled in Git.','HashiCorp Vault deployed for centralized secrets management — automatic rotation of passwords, API keys, and SSL certs.','Cloudflare for DNS, CDN, WAF rules, rate limiting, and DDoS mitigation across all public-facing services.','Automated backup pipeline with scheduled snapshots, integrity verification, and real-time Slack and email alerts on failure.','Centralized logging stack with structured log collection, alerting, and health dashboards.','Achieved zero-downtime deployments through rolling updates and pre-deployment health checks.'],
    stack:['Ansible AWX','Terraform','HashiCorp Vault','Cloudflare','Linux','Docker','Git','Python','Bash'],
    links:[{t:'Discuss This Project',h:'#contact',f:true}]},
  mHr:{cat:'HR Automation · Segilola Resources',title:'HR Automation System',img:'',
    ov:'A full digital HR system that replaced all paper-based onboarding forms and workflows at Segilola Resources Operating Limited, an active gold mining company in Nigeria.',
    role:'Backend Engineer & System Designer · Segilola Resources',
    bullets:['Digitized all staff onboarding forms — employment contracts, tax declarations, next-of-kin forms, and health declarations.','Reduced paper-based processing by 80%, saving the HR department several hours per new hire.','Built multi-role approval workflows: HR officers initiate, department heads approve, payroll receives finalized data automatically.','Employee records management: secure database of all staff profiles, documents, leave history, and attendance records.','Leave management module: apply, approve, track, and report leave balances — replacing manual spreadsheets.','Automated email notifications sent to staff at every stage of onboarding or request workflow.','Reporting dashboard showing headcount, departmental breakdowns, leave utilization, and onboarding pipeline.'],
    stack:['PHP','MySQL','REST APIs','RBAC','Email Automation','HTML/CSS/JS','Linux'],
    links:[{t:'Discuss a Similar Project',h:'#contact',f:true}]},
  mCloud:{cat:'Cloud Migration · Freelance · $400 USD',title:'AWS to Azure Full Cloud Migration',img:'',
    ov:'Complete cloud infrastructure migration from AWS to Microsoft Azure for a US-based client. All workloads, databases, and configurations fully migrated with minimal downtime.',
    role:'Cloud Migration Engineer · Freelance · Freelancer.com',
    bullets:['Audited the existing AWS environment: EC2, RDS, S3, IAM roles, security groups, and networking configs.','Mapped equivalent Azure services: Azure VMs, Azure SQL, Azure Blob Storage, Azure AD, NSGs, and VNets.','Used Terraform to provision the entire Azure target environment as code — reproducible and version-controlled.','Migrated application data and databases with validated checksums — zero data loss during transfer.','Updated DNS records, SSL certificates, and environment variables to point to new Azure infrastructure.','Performed full post-migration testing: functionality, performance benchmarks, and security validation.'],
    stack:['AWS','Azure','Terraform','Azure VMs','Azure SQL','Azure Blob','Cloudflare DNS','Linux'],
    links:[{t:'Hire for a Similar Project',h:'#contact',f:true}]},
  mPentest:{cat:'Cybersecurity · Freelance',title:'Penetration Testing & SIEM with AI Integration',img:'',
    ov:'Full penetration testing engagement combined with SIEM deployment and AI-powered threat detection. Complete security audit from reconnaissance to remediation.',
    role:'Penetration Tester & Security Engineer · Freelance',
    bullets:['Reconnaissance: OSINT gathering, subdomain enumeration, port scanning, and service fingerprinting.','Vulnerability assessment: identified SQL injection, misconfigured headers, outdated software, and weak authentication.','Exploitation phase: demonstrated real impact of vulnerabilities in a controlled, authorized manner with full evidence.','SIEM deployment: centralized Security Information and Event Management with log collection from all sources.','AI integration: anomaly detection models flagging unusual traffic, login behavior, and privilege escalations.','Delivered a full written report with severity ratings, proof-of-concept evidence, and step-by-step remediation.'],
    stack:['Kali Linux','Nmap','Metasploit','Burp Suite','SIEM','Python','AI/ML','Elasticsearch'],
    links:[{t:'Request a Pentest',h:'#contact',f:true}]},
  mHoneypot:{cat:'Cybersecurity · Freelance · $690 USD',title:'Security Honeypot Environment',img:'',
    ov:'Production-grade security honeypot system built for a Saudi Arabia-based client for real threat intelligence and attacker behavior analysis.',
    role:'Security Engineer · Freelance · Freelancer.com',
    bullets:['Designed an isolated honeypot network segment mimicking real services (SSH, HTTP, FTP, databases) to attract attackers.','Deployed multiple honeypot nodes with realistic decoy data: fake credentials, believable file structures, plausible banners.','All attacker interactions logged: IP, geolocation, commands run, files accessed, credentials attempted.','Real-time Telegram and email alerts fired immediately when any honeypot node was touched.','Analyzed captured sessions to identify TTPs (Tactics, Techniques, Procedures) and common attack vectors.','Delivered full intelligence report with attacker patterns, IOCs, and firewall/IDS rule recommendations.'],
    stack:['Linux','Python','Cowrie','Dionaea','ELK Stack','Telegram API','Bash','Networking'],
    links:[{t:'Discuss a Similar Project',h:'#contact',f:true}]},
  mMonitor:{cat:'Infrastructure · Freelance · £30 GBP',title:'Ubuntu Server Monitoring Dashboard',img:'',
    ov:'Custom web-based UI for real-time Ubuntu Linux server monitoring built for a UK-based client. Full system visibility without SSH access.',
    role:'Full-Stack / Systems Engineer · Freelance',
    bullets:['Real-time display of CPU, RAM, disk I/O, and network throughput — auto-refreshed in browser every few seconds.','Live log streaming: syslog, auth.log, and app logs visible directly in browser.','Service status monitoring: which services are running, stopped, or failed — with restart capability.','Configurable alert thresholds: visual warnings on CPU over 80%, RAM over 90%, disk over 95%.','PHP backend reading live system data via shell commands, served to a clean real-time frontend.','Password-protected admin access with session management and CSRF protection.'],
    stack:['PHP','HTML','CSS','JavaScript','Linux','Shell Scripting','Web Security'],
    links:[{t:'Request a Similar Dashboard',h:'#contact',f:true}]},
  mComp:{cat:'Backend · Segilola Resources',title:'Community Compensation Distribution Platform',img:'',
    ov:'Secure internal platform for managing and distributing community compensation payments at Segilola Resources — handling hundreds of beneficiaries and large payment cycles.',
    role:'Backend Engineer · Segilola Resources',
    bullets:['Multi-role system: Admins manage payment cycles; community reps view their own status; finance confirms disbursements.','Payment tracking engine: each payment logged with timestamp, amount, authorizing officer, method, and confirmation.','Automated reporting: total disbursed, pending payments, beneficiary counts, history — exportable to PDF and Excel.','REST APIs for frontend separation and future mobile app integration.','MySQL schema optimized with proper indexing, foreign keys, and data integrity constraints.','Comprehensive audit logging: every change tracked with user ID, timestamp, and before/after values.'],
    stack:['PHP','MySQL','REST APIs','RBAC','HTML/CSS/JS','PDF Generation','Linux'],
    links:[{t:'Discuss a Similar Project',h:'#contact',f:true}]},
  mHostel:{cat:'Web Application · Academic Project',title:'HostelConnect — Student Housing Platform',img:'',
    ov:'Full-stack web platform connecting university students with landlords and potential roommates.',
    role:'Full-Stack Developer',
    bullets:['Three user roles: Students searching accommodation; Landlords listing rooms; Roommate-seekers finding co-tenants.','Secure auth: email verification, bcrypt hashing, session management, CSRF protection.','Landlords add listings with photos, pricing, location, amenities, and availability dates.','Students filter by location, price range, room type, and amenities — sorted by relevance and distance.','Roommate matching algorithm: matches by location, budget, gender, and lifestyle preferences.','Fully responsive frontend with optimized MySQL schema.'],
    stack:['PHP','MySQL','HTML','CSS','JavaScript','RBAC','Responsive Design'],
    links:[{t:'Discuss a Similar Platform',h:'#contact',f:true}]},
  mAura:{cat:'E-commerce Backend · Personal Project',title:'Aura Essence E-commerce Platform',img:'',
    ov:'Full-featured e-commerce backend for a fashion/beauty brand. Handles the complete shopping lifecycle from product browsing to order fulfillment.',
    role:'Backend Engineer',
    bullets:['Product catalog: categories, variants (size/color), inventory tracking, image management, and full-text search.','Cart and checkout: session-based cart, discount codes, tax calculation, and shipping estimation.','Payment gateway integration: secure tokenization and webhook handling for payment confirmation.','Order management: status updates from pending to delivered with customer email notifications at each stage.','Admin dashboard: product management, order overview, revenue reports, and customer management.','MySQL schema optimized for fast search and scalable order processing.'],
    stack:['PHP','NodeJS','MySQL','REST APIs','Payment Gateway','HTML/CSS/JS','RBAC'],
    links:[{t:'Discuss a Similar Project',h:'#contact',f:true}]},
  mIot:{cat:'IoT Engineering · Personal Projects',title:'IoT Prototypes Suite (10+ Devices)',img:'images/iot.jpg',
    ov:'10+ IoT prototype systems built with Arduino, Raspberry Pi, and AI/ML — solving real-world problems in safety, accessibility, and security.',
    role:'IoT Engineer · Sole Developer',
    bullets:['Fire Alarm System (Arduino Uno): smoke and heat sensor with buzzer and LED indicator for home fire detection.','Smart Walking Stick (Arduino Nano): ultrasonic obstacle detection vibrates to guide visually impaired users safely.','Smart Garage Door: ultrasonic sensor detects approaching vehicle, servo motor opens/closes automatically.','Smart Trash Bin: IR proximity sensor opens bin lid automatically — reduces contact, improves hygiene.','AI Weapon Detection System: YOLOv4 + Raspberry Pi processes camera feed in real time, detects weapons, and sends instant Telegram and email alerts with snapshot.'],
    stack:['Arduino Uno/Nano','Raspberry Pi','YOLOv4','Python','MQTT','Sensors','Servo Motors','Telegram API'],
    links:[{t:'Discuss an IoT Project',h:'#contact',f:true}]},
  mAnsible:{cat:'DevOps · Freelance · $135.50 USD',title:'Ansible Config & DevOps Consulting',img:'',
    ov:'Freelance DevOps consulting for a New York City client. Diagnosed and resolved a complex Ansible configuration issue blocking their deployment pipeline.',
    role:'DevOps / Ansible Engineer · Freelance · Freelancer.com',
    bullets:['Client had a broken Ansible playbook configuration causing deployment failures — previous freelancers unable to fix it.','Performed root cause analysis: reviewed inventory files, playbook structure, variable precedence, and host connectivity.','Resolved issues with SSH key authentication, sudo privilege escalation, and template rendering.','Refactored for idempotency and best practices: roles, handlers, and proper tagging for selective execution.','Added verbose error output and dry-run capabilities for safe future changes.','Delivered a 30-minute walkthrough explaining every change made and why.'],
    stack:['Ansible','Python','Bash','Linux','SSH','YAML','DevOps'],
    links:[{t:'Hire for DevOps Consulting',h:'#contact',f:true}]}
};

function openModal(id){
  const d=MD[id];if(!d)return;
  document.getElementById('m-cat').textContent=d.cat;
  document.getElementById('m-title').textContent=d.title;
  const mi=document.getElementById('m-img');
  mi.innerHTML=d.img
    ? '<img src="'+d.img+'" style="width:100%;height:100%;object-fit:cover;display:block" onerror="this.style.display=\'none\'">'
    : '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:var(--ink3)"><svg viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'rgba(199,0,57,.15)\' stroke-width=\'1\' width=\'56\' height=\'56\'><rect x=\'3\' y=\'3\' width=\'18\' height=\'18\' rx=\'2\'/><path d=\'M9 9h6M9 13h6M9 17h4\'/></svg></div>';
  let h='<div class="modal-sh">Overview</div><p class="modal-desc">'+d.ov+'</p>';
  h+='<div class="modal-sh">My Role</div><p class="modal-desc">'+d.role+'</p>';
  h+='<div class="modal-sh">What Was Built</div><ul class="modal-bullets">'+d.bullets.map(b=>'<li>'+b+'</li>').join('')+'</ul>';
  h+='<div class="modal-sh">Tech Stack</div><div class="modal-stack">'+d.stack.map(s=>'<span class="modal-tag">'+s+'</span>').join('')+'</div>';
  document.getElementById('m-content').innerHTML=h;
  document.getElementById('m-links').innerHTML=d.links.map(l=>'<a href="'+l.h+'" class="modal-link-btn'+(l.f?'':' ghost')+'"'+(l.h.startsWith('http')?' target="_blank"':'')+'>'+l.t+'</a>').join('');
  document.getElementById('modal-wrap').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeModal(){
  document.getElementById('modal-wrap').classList.remove('open');
  document.body.style.overflow='';
}