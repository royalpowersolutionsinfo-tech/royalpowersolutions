/**
 * Royal Power Solutions — SEO Page Generator
 * Generates 120 location × service landing pages
 * Run: node generate-pages.js (from the royal/ directory)
 */

const fs = require('fs');
const path = require('path');

// ── LOCATIONS ──────────────────────────────────────────────
const locations = [
  {
    slug: 'ashok-pillar',
    name: 'Ashok Pillar',
    area: 'Ashok Nagar',
    city: 'Chennai',
    nearBy: 'Ashok Nagar, Ekkattuthangal, KK Nagar, Virugambakkam',
    lat: 13.0333,
    lng: 80.2083,
    pincode: '600083'
  },
  {
    slug: 'jafferkhanpet',
    name: 'Jafferkhanpet',
    area: 'Jafferkhanpet',
    city: 'Chennai',
    nearBy: 'Ashok Nagar, Kodambakkam, Saidapet, Guindy',
    lat: 13.0516,
    lng: 80.2209,
    pincode: '600083'
  },
  {
    slug: 'west-mambalam',
    name: 'West Mambalam',
    area: 'West Mambalam',
    city: 'Chennai',
    nearBy: 'T. Nagar, Kodambakkam, Ashok Nagar, Vadapalani',
    lat: 13.0404,
    lng: 80.2193,
    pincode: '600033'
  },
  {
    slug: 'guindy',
    name: 'Guindy',
    area: 'Guindy',
    city: 'Chennai',
    nearBy: 'St. Thomas Mount, Alandur, Ekkattuthangal, Saidapet',
    lat: 13.0067,
    lng: 80.2206,
    pincode: '600032'
  },
  {
    slug: 'saidapet',
    name: 'Saidapet',
    area: 'Saidapet',
    city: 'Chennai',
    nearBy: 'Guindy, Adyar, Kotturpuram, Nandanam',
    lat: 13.0215,
    lng: 80.2231,
    pincode: '600015'
  },
  {
    slug: 'ambattur',
    name: 'Ambattur',
    area: 'Ambattur Industrial Estate',
    city: 'Chennai',
    nearBy: 'Ambattur Industrial Estate, Mogappair, Padi, Avadi, Anna Nagar West',
    lat: 13.1143,
    lng: 80.1548,
    pincode: '600058'
  },
  {
    slug: 'chennai',
    name: 'Chennai',
    area: 'Chennai',
    city: 'Chennai',
    nearBy: 'All areas across Chennai city',
    lat: 13.0827,
    lng: 80.2707,
    pincode: '600001'
  }
];

// ── SERVICES ──────────────────────────────────────────────
const services = [
  {
    slug: 'ups-sales-service',
    title: 'UPS Sales & Service',
    keyword: 'UPS Sales and Service',
    shortDesc: '1KVA to 1000KVA online UPS systems — sales, installation, AMC and 24/7 service.',
    icon: 'fa-car-battery',
    h1Pattern: '{keyword} in {location}, Chennai',
    metaTitle: '{keyword} in {location} Chennai | Royal Power Solutions',
    metaDesc: 'Looking for UPS sales and service in {location}, Chennai? Royal Power Solutions provides 1KVA–1000KVA UPS systems with installation, AMC & 24/7 emergency support. Call 9787451828.',
    content: {
      intro: `Royal Power Solutions is the most trusted name for UPS sales and service in {location}, Chennai. We supply, install, and maintain online UPS systems ranging from 1KVA for home and small office use all the way up to 1000KVA for industrial and data centre applications. Whether you need a new UPS setup, emergency repair, or an Annual Maintenance Contract (AMC), our certified technicians are available 24/7 to ensure your power supply never fails.`,
      sizes: ['1 KVA', '3 KVA', '5 KVA', '7.5 KVA', '10 KVA', '15 KVA', '20 KVA', '30 KVA', '50 KVA', '60 KVA', '80 KVA', '100 KVA', '120 KVA', '150 KVA', '180 KVA', '200 KVA', '250 KVA', '300 KVA', '350 KVA', '500 KVA', '600 KVA', '800 KVA', '1000 KVA'],
      features: ['Online UPS for zero transfer time', 'Pure sine wave output for sensitive equipment', 'IGBT-based technology for high efficiency', 'Remote monitoring & SNMP card support', 'Scalable battery backup duration', 'Genuine branded UPS units with warranty'],
      faq: [
        { q: `What UPS brands do you sell in {location}, Chennai?`, a: `We stock and supply all major brands including Emerson, APC, Numeric, Luminous, Sukam, and Microtek — all sourced from authorised distributors with manufacturer warranty.` },
        { q: `Do you provide UPS AMC in {location}?`, a: `Yes. We offer comprehensive Annual Maintenance Contracts covering quarterly preventive maintenance visits, emergency call-outs, and battery health checks for all UPS sizes in {location} and surrounding areas.` },
        { q: `How fast is your emergency UPS repair response in {location}?`, a: `Our average emergency response time in {location} is under 60 minutes. We maintain a team of technicians in the {location} area so you are never left without power support.` }
      ]
    }
  },
  {
    slug: 'ups-repair-amc',
    title: 'UPS Repair & AMC',
    keyword: 'UPS Repair and AMC',
    shortDesc: 'Fast UPS repair for all brands, plus Annual Maintenance Contracts with 24/7 breakdown support.',
    icon: 'fa-screwdriver-wrench',
    h1Pattern: '{keyword} in {location}, Chennai',
    metaTitle: '{keyword} in {location} Chennai | Royal Power Solutions',
    metaDesc: 'Fast UPS repair and AMC in {location}, Chennai. We repair APC, Numeric, Emerson, Luminous UPS systems with genuine spares and emergency 24/7 support. Call 9787451828.',
    content: {
      intro: `Facing a UPS breakdown or looking for a dependable Annual Maintenance Contract in {location}, Chennai? Royal Power Solutions provides expert on-site UPS repair and comprehensive AMC plans for residential, commercial, and industrial facilities in {location}. Our certified electrical engineers diagnose PCB issues, inverter boards, transformer coils, and battery strings with rapid turnaround and 90-day repair warranties.`,
      sizes: ['1 KVA', '3 KVA', '5 KVA', '7.5 KVA', '10 KVA', '15 KVA', '20 KVA', '30 KVA', '50 KVA', '80 KVA', '100 KVA', '150 KVA', '200 KVA', '300 KVA', '500 KVA'],
      features: ['24/7 breakdown call-out response', 'Quarterly scheduled preventive maintenance visits', 'On-site repair for APC, Emerson, Numeric, Luminous, Sukam', 'Genuine manufacturer spare parts with warranty', 'Comprehensive battery testing and conductance analysis', 'Detailed digital service and diagnostic reports'],
      faq: [
        { q: `Do you provide emergency UPS repair in {location}, Chennai?`, a: `Yes. Our mobile technician teams cover {location} with an emergency on-site response time under 60 minutes for critical facility breakdowns.` },
        { q: `What does a UPS AMC cover in {location}?`, a: `Our UPS AMC includes scheduled quarterly preventive maintenance visits, thorough internal cleaning, component testing, battery health analysis, and priority 24/7 emergency repair support.` },
        { q: `Can you repair third-party installed UPS systems in {location}?`, a: `Yes, we service and repair all major UPS makes and capacities regardless of who originally supplied or installed the system.` }
      ]
    }
  },
  {
    slug: 'ups-installation',
    title: 'UPS Installation',
    keyword: 'UPS Installation',
    shortDesc: 'Professional UPS installation services for homes, offices and industries.',
    icon: 'fa-plug-circle-bolt',
    h1Pattern: '{keyword} in {location}, Chennai',
    metaTitle: '{keyword} in {location} Chennai | Royal Power Solutions',
    metaDesc: 'Professional UPS installation in {location}, Chennai. Royal Power Solutions installs 1KVA–1000KVA UPS systems for homes, offices & industries. Expert team. Call 9787451828.',
    content: {
      intro: `Royal Power Solutions provides expert UPS installation services throughout {location}, Chennai. Our trained and certified technicians handle the complete installation process — from site survey and cable routing to bypass panel wiring and load testing. We install all capacities from 1KVA residential systems to 1000KVA industrial-grade UPS units. Every installation is done to Indian electrical standards, with clean cable management and full documentation.`,
      sizes: ['1 KVA', '3 KVA', '5 KVA', '7.5 KVA', '10 KVA', '15 KVA', '20 KVA', '30 KVA', '50 KVA', '100 KVA', '150 KVA', '200 KVA', '300 KVA', '500 KVA', '1000 KVA'],
      features: ['Site survey before installation', 'Earth pit installation if required', 'MCB and bypass switch installation', 'Load balancing and testing', 'Clean cable management and labelling', 'Full handover documentation'],
      faq: [
        { q: `How long does UPS installation take in {location}?`, a: `A standard 1–10KVA installation in {location} typically takes 2–4 hours. Larger industrial installations (50KVA and above) may take a full day. We'll give you an exact timeline after the site survey.` },
        { q: `Do you provide site survey before installation in {location}?`, a: `Yes, always. Before any installation in {location}, our technician visits your premises to assess load requirements, cable routing, earthing quality, and space availability — at no extra charge.` },
        { q: `Can you install UPS on existing electrical wiring in {location}?`, a: `Absolutely. We can integrate a UPS system into your existing electrical infrastructure in {location} with minimal disruption. We'll design the bypass and distribution to suit your current setup.` }
      ]
    }
  },
  {
    slug: 'server-stabilizer',
    title: 'Server Stabilizer',
    keyword: 'Server Stabilizer',
    shortDesc: 'Servo voltage stabilizers for servers — 1KVA to 50KVA, sales, service & installation.',
    icon: 'fa-server',
    h1Pattern: '{keyword} in {location}, Chennai',
    metaTitle: '{keyword} in {location} Chennai | Royal Power Solutions',
    metaDesc: 'Server stabilizer sales & service in {location}, Chennai. 1KVA, 3KVA, 5KVA, 7.5KVA, 10KVA to 50KVA servo stabilizers. Royal Power Solutions. Call 9787451828.',
    content: {
      intro: `Royal Power Solutions specialises in server stabilizers in {location}, Chennai. A server stabilizer (servo voltage stabilizer) is essential for protecting your IT infrastructure from voltage fluctuations that can damage servers, network equipment, and critical data systems. We supply, install, and service servo stabilizers in capacities of 1 KVA, 3 KVA, 5 KVA, 7.5 KVA, 10 KVA, 15 KVA, 20 KVA, 30 KVA, and 50 KVA for data centres, offices, hospitals, and industrial setups across {location} and surrounding areas.`,
      sizes: ['1 KVA', '3 KVA', '5 KVA', '7.5 KVA', '10 KVA', '15 KVA', '20 KVA', '30 KVA', '50 KVA'],
      features: ['±1% voltage regulation accuracy', 'Suitable for server rooms & IT racks', 'Oil-cooled and air-cooled variants', 'Over-voltage and under-voltage cut-off', 'Digital voltmeter display', 'Automatic bypass for maintenance'],
      faq: [
        { q: `Which KVA server stabilizer do I need for my server room in {location}?`, a: `The KVA rating depends on your total server load. For 2–3 servers, a 5 KVA unit is usually sufficient. For larger setups with multiple racks in {location}, we recommend 15–30 KVA. Our technician will calculate the exact requirement during a free site visit.` },
        { q: `Do you supply server stabilizers for hospitals and clinics in {location}?`, a: `Yes. We supply medical-grade servo stabilizers for hospitals, diagnostic centres, and clinics in {location}. These handle sensitive medical equipment like X-ray machines, CT scanners, and life support systems.` },
        { q: `Can you repair any brand of server stabilizer in {location}?`, a: `Yes, we repair all brands of servo stabilizers in {location} including Servomax, V-Guard, Microtek, Emmerich, and Prok — regardless of where they were purchased.` }
      ]
    }
  },
  {
    slug: 'server-stabilizer-sales-service',
    title: 'Server Stabilizer Sales & Service',
    keyword: 'Server Stabilizer Sales and Service',
    shortDesc: 'Complete server stabilizer sales and after-service support in Chennai.',
    icon: 'fa-bolt-lightning',
    h1Pattern: '{keyword} in {location}, Chennai',
    metaTitle: '{keyword} in {location} Chennai | Royal Power Solutions',
    metaDesc: 'Server stabilizer sales and service in {location}, Chennai. Buy, install & service all KVA servo stabilizers. Royal Power Solutions. Call 9787451828.',
    content: {
      intro: `Need a server stabilizer or servicing for your existing unit in {location}, Chennai? Royal Power Solutions is your one-stop solution. We sell premium servo voltage stabilizers from trusted manufacturers and provide comprehensive after-sales service including periodic maintenance, winding repairs, brush replacement, and emergency breakdown support. Our team in {location} ensures your stabilizer keeps your servers protected 24×7.`,
      sizes: ['1 KVA', '3 KVA', '5 KVA', '7.5 KVA', '10 KVA', '15 KVA', '20 KVA', '30 KVA', '50 KVA'],
      features: ['Wide range of in-stock units', 'Same-day delivery in {location}', 'On-site servicing and repair', 'Spare parts availability', 'Annual maintenance contracts', 'Service warranty on all repairs'],
      faq: [
        { q: `How often should a server stabilizer be serviced in {location}?`, a: `We recommend a full service every 6 months for stabilizers in {location}. This includes cleaning, brush and carbon inspection, winding check, and calibration to ensure accurate voltage regulation.` },
        { q: `Do you sell second-hand or refurbished server stabilizers in {location}?`, a: `We primarily sell brand-new units. However, we do have certified refurbished units available at lower cost. All refurbished units are fully tested and come with a 6-month service warranty.` },
        { q: `Can you service my stabilizer at my premises in {location}?`, a: `Yes. We offer on-site servicing in {location} — our technician brings all the necessary tools and spares, so there is minimal downtime for your servers.` }
      ]
    }
  },
  {
    slug: 'server-stabilizer-installation',
    title: 'Server Stabilizer Installation',
    keyword: 'Server Stabilizer Installation',
    shortDesc: 'Expert servo stabilizer installation for server rooms and IT setups.',
    icon: 'fa-wrench',
    h1Pattern: '{keyword} in {location}, Chennai',
    metaTitle: '{keyword} in {location} Chennai | Royal Power Solutions',
    metaDesc: 'Server stabilizer installation in {location}, Chennai. Professional installation of 1KVA–50KVA servo stabilizers for server rooms. Royal Power Solutions. Call 9787451828.',
    content: {
      intro: `Proper installation of a server stabilizer is as important as the unit itself. An incorrectly installed stabilizer can fail to protect your servers or even damage equipment. Royal Power Solutions provides professional server stabilizer installation services in {location}, Chennai. Our electricians are trained in servo stabilizer wiring, input/output connections, earthing, and load balancing — ensuring your IT equipment is properly protected from the moment the unit goes live.`,
      sizes: ['1 KVA', '3 KVA', '5 KVA', '7.5 KVA', '10 KVA', '15 KVA', '20 KVA', '30 KVA', '50 KVA'],
      features: ['Input and output cable sizing as per load', 'Proper earthing and neutral connections', 'MCB protection at input and output', 'Bypass arrangement installation', 'Load testing after installation', 'Handover checklist and documentation'],
      faq: [
        { q: `Where should a server stabilizer be installed in my office in {location}?`, a: `Ideally, the stabilizer should be installed between the main supply and your server rack — in a well-ventilated area. Our team in {location} will identify the best position to minimise cable runs and heat buildup.` },
        { q: `Do I need a separate earthing for the stabilizer in {location}?`, a: `Yes, good earthing is essential. A stabilizer without proper earth can cause noise on the output. We check and, if needed, create a dedicated earth pit during installation in {location}.` },
        { q: `Can you install a stabilizer in an already-running server room in {location}?`, a: `Yes. We can carry out the installation with minimal downtime — typically during off-peak hours. We plan the changeover carefully to avoid any disruption to your live systems in {location}.` }
      ]
    }
  },
  {
    slug: 'all-types-server-stabilizer',
    title: 'All Types Server Stabilizer Work',
    keyword: 'All Types Server Stabilizer Work',
    shortDesc: 'Sales, service, repair, installation of all types of server stabilizers.',
    icon: 'fa-gear',
    h1Pattern: '{keyword} in {location}, Chennai',
    metaTitle: '{keyword} in {location} Chennai | Royal Power Solutions',
    metaDesc: 'All types server stabilizer work in {location}, Chennai — sales, installation, repair & AMC for servo stabilizers. Royal Power Solutions. Call 9787451828.',
    content: {
      intro: `Royal Power Solutions handles all types of server stabilizer work in {location}, Chennai — from supply and installation of brand-new units to complete overhaul and repair of old or faulty ones. No job is too big or too small. Whether you need a single 1 KVA unit for a small office or a 50 KVA unit for an industrial server room, we have the technical expertise and stock to deliver promptly across {location} and nearby areas.`,
      sizes: ['1 KVA', '3 KVA', '5 KVA', '7.5 KVA', '10 KVA', '15 KVA', '20 KVA', '30 KVA', '50 KVA'],
      features: ['New unit supply and installation', 'Old unit repair and overhaul', 'Winding replacement', 'Carbon brush & motor servicing', 'Voltage calibration', 'Emergency breakdown call-outs'],
      faq: [
        { q: `Can you repair a servo stabilizer with a burnt winding in {location}?`, a: `Yes. Winding replacement and rewinding is one of our core services. We can either rewind on-site or take the unit to our workshop and return it quickly, minimising downtime in {location}.` },
        { q: `Do you work on oil-cooled stabilizers in {location}?`, a: `Yes. Our team handles both air-cooled and oil-cooled servo stabilizers in {location}. Oil-cooled units require specialised handling which our technicians are trained for.` },
        { q: `Can you upgrade my old stabilizer to a higher KVA in {location}?`, a: `In most cases, upgrading the same unit is not cost-effective. We will inspect your existing unit and advise whether a new unit is better value — always giving you an honest recommendation.` }
      ]
    }
  },
  {
    slug: 'battery-sales-service',
    title: 'Battery Sales & Service',
    keyword: 'Battery Sales and Service',
    shortDesc: 'Amron, Exide and all brands of UPS batteries — sales, testing and replacement.',
    icon: 'fa-battery-full',
    h1Pattern: '{keyword} in {location}, Chennai',
    metaTitle: '{keyword} in {location} Chennai | Royal Power Solutions',
    metaDesc: 'UPS battery sales and service in {location}, Chennai. Amron, Exide, Luminous batteries for UPS & inverters. Fast replacement. Royal Power Solutions. Call 9787451828.',
    content: {
      intro: `Looking for genuine UPS or inverter batteries in {location}, Chennai? Royal Power Solutions stocks and supplies original Amron, Exide, Luminous, Sukam, and Okaya batteries for all types of UPS and inverter systems. We also provide battery load testing, health checks, and fast replacement services. If your UPS is giving a low battery alarm or your inverter is not holding charge, call us — our technician will reach {location} within the hour.`,
      sizes: ['12V 7Ah', '12V 26Ah', '12V 42Ah', '12V 65Ah', '12V 100Ah', '12V 150Ah', '12V 200Ah', '2V VRLA cells'],
      features: ['Amron, Exide, Luminous, Okaya, Sukam in stock', 'Original sealed VRLA batteries', 'Tubular and flat plate batteries for inverters', '2V cells for industrial UPS strings', 'Old battery buyback and disposal', 'Manufacturer warranty with every battery'],
      faq: [
        { q: `How do I know if my UPS battery needs replacement in {location}?`, a: `Common signs include: backup time has reduced significantly, the UPS keeps beeping, battery swelling or leakage, or the charger LED stays on permanently. Our technician in {location} can do a load test to confirm.` },
        { q: `Do you provide Exide batteries in {location}, Chennai?`, a: `Yes. We are authorised suppliers of Exide UPS and inverter batteries in {location}. All batteries come with an Exide warranty card and installation is included.` },
        { q: `Can you take away my old battery when you install a new one in {location}?`, a: `Absolutely. We collect your old batteries when we deliver the new ones. Old batteries are sent for authorised recycling in compliance with battery disposal regulations.` }
      ]
    }
  },
  {
    slug: 'lithium-battery-sales',
    title: 'Lithium Ion Battery Sales',
    keyword: 'Lithium Ion Battery Sales',
    shortDesc: 'Lithium ion batteries for UPS, inverters and solar systems — sales in Chennai.',
    icon: 'fa-atom',
    h1Pattern: '{keyword} in {location}, Chennai',
    metaTitle: '{keyword} in {location} Chennai | Royal Power Solutions',
    metaDesc: 'Lithium ion battery sales in {location}, Chennai. LiFePO4 batteries for UPS, solar & inverters. Long life, lightweight. Royal Power Solutions. Call 9787451828.',
    content: {
      intro: `Royal Power Solutions now supplies premium lithium ion batteries in {location}, Chennai for UPS systems, solar setups, and high-performance inverter applications. Lithium ion (LiFePO4) batteries offer 3–4x longer life, faster charging, and 60% less weight compared to traditional VRLA lead-acid batteries. If you are upgrading your UPS or solar system to lithium technology, we can supply the right battery pack with BMS (Battery Management System) for safe and efficient operation.`,
      sizes: ['48V 50Ah', '48V 100Ah', '48V 200Ah', '96V 50Ah', '192V 50Ah', 'Custom packs'],
      features: ['LiFePO4 chemistry for safety and longevity', 'Built-in BMS for overcharge and over-discharge protection', '3000–5000 cycle life', '80% depth of discharge capability', 'Compatible with most UPS and solar inverters', '10-year design life'],
      faq: [
        { q: `Is lithium ion battery compatible with my existing UPS in {location}?`, a: `Most modern UPS systems can be configured to work with lithium batteries with a settings change. Our technician in {location} will check compatibility with your specific UPS model before recommending a lithium upgrade.` },
        { q: `What is the price difference between lithium and lead-acid batteries in {location}?`, a: `Lithium batteries cost 3–4x more upfront than VRLA batteries, but last 3–4x longer, making the lifecycle cost similar or lower. We'll provide a cost comparison for your specific setup in {location}.` },
        { q: `Do lithium batteries need maintenance in {location}?`, a: `No. Lithium ion batteries are virtually maintenance-free. Unlike lead-acid batteries, there is no need for topping up, equalisation charges, or regular load testing.` }
      ]
    }
  },
  {
    slug: 'ups-shifting-team',
    title: 'UPS Shifting Team',
    keyword: 'UPS Shifting Team',
    shortDesc: 'Professional UPS shifting and relocation service — safe handling of heavy equipment.',
    icon: 'fa-truck-fast',
    h1Pattern: '{keyword} in {location}, Chennai',
    metaTitle: '{keyword} in {location} Chennai | Royal Power Solutions',
    metaDesc: 'UPS shifting team in {location}, Chennai. Safe relocation of UPS, inverters & batteries. Trained handlers with proper equipment. Royal Power Solutions. Call 9787451828.',
    content: {
      intro: `Moving a UPS system is not like moving ordinary furniture — it requires trained professionals who understand the risks involved with heavy electrical equipment. Royal Power Solutions provides a dedicated UPS shifting team in {location}, Chennai. We safely disconnect, transport, and reinstall your UPS at the new location, including battery strings, bypass panels, and earthing. Whether you are moving offices within {location} or to a different part of Chennai, we handle the complete relocation.`,
      sizes: ['Small UPS (1–10 KVA)', 'Medium UPS (10–50 KVA)', 'Large UPS (50–200 KVA)', 'Industrial UPS (200KVA–1000KVA)'],
      features: ['Proper disconnection before moving', 'Battery pack removal and repacking', 'Heavy-duty equipment dollies and straps', 'Elevator and staircase navigation', 'Reinstallation and testing at new location', 'Insurance coverage available'],
      faq: [
        { q: `Can you shift a heavy 100KVA UPS from one building to another in {location}?`, a: `Yes. We have the equipment and trained manpower to safely shift large UPS units of any size within {location} or across Chennai. We use industrial trolleys, forklifts (where available), and rigging equipment.` },
        { q: `Do you disconnect and reconnect the UPS during shifting in {location}?`, a: `Yes, the complete process — safe shutdown, cable disconnection, moving, reinstallation, and commissioning — is handled by our team. You do not need a separate electrician.` },
        { q: `How much does UPS shifting cost in {location}, Chennai?`, a: `The cost depends on the UPS size, distance, floor level, and access conditions. Call us with these details and we will give you a quote for {location} within the hour.` }
      ]
    }
  },
  {
    slug: 'ups-commissioning',
    title: 'UPS Commissioning Work',
    keyword: 'UPS Commissioning',
    shortDesc: '1KVA to 1000KVA UPS commissioning by certified engineers in Chennai.',
    icon: 'fa-clipboard-check',
    h1Pattern: '{keyword} in {location}, Chennai',
    metaTitle: '{keyword} in {location} Chennai | Royal Power Solutions',
    metaDesc: 'UPS commissioning work in {location}, Chennai. Professional commissioning for 1KVA to 1000KVA UPS systems. Certified engineers. Royal Power Solutions. Call 9787451828.',
    content: {
      intro: `UPS commissioning is the formal process of bringing a newly installed UPS system into live operation safely and according to manufacturer specifications. Royal Power Solutions performs professional UPS commissioning in {location}, Chennai for all capacities from 1 KVA to 1000 KVA. Our certified engineers follow a structured commissioning procedure that includes pre-commissioning checks, power-on testing, battery test, load transfer testing, and full documentation — ensuring your UPS is warranty-valid from day one.`,
      sizes: ['1 KVA', '3 KVA', '5 KVA', '10 KVA', '20 KVA', '30 KVA', '50 KVA', '100 KVA', '200 KVA', '300 KVA', '500 KVA', '1000 KVA'],
      features: ['Pre-commissioning visual and wiring inspection', 'Input/output voltage and frequency checks', 'Battery string voltage verification', 'Load bank testing if required', 'Alarm and shutdown testing', 'Commissioning certificate and report'],
      faq: [
        { q: `Is UPS commissioning mandatory for warranty in {location}?`, a: `Yes. Most UPS manufacturers require a formal commissioning report for the warranty to be valid. Our commissioning in {location} includes the manufacturer's commissioning form and report for warranty purposes.` },
        { q: `Can you commission a UPS installed by another contractor in {location}?`, a: `Yes. If the installation has been done correctly, we can perform the commissioning independently. We will also do a safety check of the existing wiring before commissioning in {location}.` },
        { q: `Do you offer commissioning for parallel redundant UPS systems in {location}?`, a: `Yes. We are experienced in commissioning N+1 and 2N parallel redundant UPS configurations used in data centres and critical facilities in {location} and across Chennai.` }
      ]
    }
  },
  {
    slug: 'ups-loading-unloading',
    title: 'UPS Loading & Unloading',
    keyword: 'UPS Loading and Unloading',
    shortDesc: 'Safe loading and unloading of heavy UPS equipment and industrial batteries.',
    icon: 'fa-dolly',
    h1Pattern: '{keyword} in {location}, Chennai',
    metaTitle: '{keyword} in {location} Chennai | Royal Power Solutions',
    metaDesc: 'UPS loading and unloading in {location}, Chennai. Safe handling of heavy UPS units & batteries by trained team. Royal Power Solutions. Call 9787451828.',
    content: {
      intro: `Heavy UPS systems and industrial battery banks require skilled manual handling that goes beyond ordinary labour. Royal Power Solutions provides a trained UPS loading and unloading team in {location}, Chennai. We use proper rigging equipment, hydraulic trolleys, ratchet straps, and protective padding to safely load and unload UPS units from vehicles, navigate them through buildings, and position them at the installation site without damage.`,
      sizes: ['Small UPS (under 100kg)', 'Medium UPS (100–300kg)', 'Large UPS (300–800kg)', 'Industrial UPS (800kg+)'],
      features: ['Trained material handling crew', 'Hydraulic pallet trucks and hand trolleys', 'Ratchet straps and moving blankets', 'Staircase and elevator navigation', 'Safe battery pack separation before moving', 'No damage guarantee'],
      faq: [
        { q: `Can you unload a UPS from a truck without a forklift in {location}?`, a: `Yes. Our team is trained to safely unload heavy UPS units using hydraulic pallet jacks, wheel chocks, and ramps even when a forklift is not available. We handle this regularly in {location}.` },
        { q: `Do you handle UPS loading at the supplier\'s godown in {location}?`, a: `Yes. We can coordinate with your supplier\'s warehouse in {location} or elsewhere in Chennai to safely load the UPS onto your transport vehicle.` },
        { q: `How many people does it take to move a 200KVA UPS in {location}?`, a: `A 200KVA UPS typically weighs 600–800kg (with batteries). We deploy a team of 4–6 trained workers with proper equipment. Contact us and we\'ll plan the manpower based on your specific UPS model and site access in {location}.` }
      ]
    }
  },
  {
    slug: 'electrical-work',
    title: 'All Kinds of Electrical Work',
    keyword: 'Electrical Work',
    shortDesc: 'Complete electrical services for homes, offices, and industries in Chennai.',
    icon: 'fa-bolt',
    h1Pattern: 'All Kinds of {keyword} in {location}, Chennai',
    metaTitle: 'All Kinds of Electrical Work in {location} Chennai | Royal Power Solutions',
    metaDesc: 'All kinds of electrical work in {location}, Chennai. House wiring, office wiring, industrial wiring, MCB boards & more. GST-registered contractors. Call 9787451828.',
    content: {
      intro: `Royal Power Solutions handles all kinds of electrical work in {location}, Chennai — from new house wiring and office electrical fit-outs to industrial panel installation and power factor correction. Our licensed electricians are background-checked and trained to work to Indian electrical standards. We provide transparent itemised quotations and never start work without your approval. As a GST-registered electrical contractor (33CKUPB0081N2ZX), we issue proper tax invoices for all work done in {location}.`,
      sizes: ['Residential wiring', 'Commercial wiring', 'Industrial wiring', 'MCB board installation', 'Power factor correction', 'Cable tray and conduit work'],
      features: ['House and apartment wiring', 'Office and commercial wiring', 'Industrial and factory wiring', 'MCB, RCCB, ELCB installation', 'Distribution board upgrades', 'Emergency fault finding and repair'],
      faq: [
        { q: `Do you rewire old houses in {location}, Chennai?`, a: `Yes. Old aluminium wiring is a fire hazard. We specialise in complete rewiring of old houses and apartments in {location} using modern copper wiring with proper conduit and MCB protection.` },
        { q: `Can you install a 3-phase connection for my business in {location}?`, a: `Yes. We handle 3-phase wiring for offices, workshops, and small factories in {location}. This includes the main panel, sub-distribution boards, and machine point wiring.` },
        { q: `Are your electricians licensed to work in {location}, Chennai?`, a: `Yes. Our electricians hold valid electrical competency certificates and our company is GST-registered (33CKUPB0081N2ZX), making us a verified contractor for all electrical work in {location}.` }
      ]
    }
  },
  {
    slug: 'isolation-transformer-installation',
    title: 'Isolation Transformer Installation',
    keyword: 'Isolation Transformer Installation',
    shortDesc: 'Professional isolation transformer installation for hospitals, IT and industry.',
    icon: 'fa-tower-broadcast',
    h1Pattern: '{keyword} in {location}, Chennai',
    metaTitle: '{keyword} in {location} Chennai | Royal Power Solutions',
    metaDesc: 'Isolation transformer installation in {location}, Chennai. For hospitals, IT labs & industries. All KVA sizes. Royal Power Solutions. Call 9787451828.',
    content: {
      intro: `Isolation transformers are critical for protecting sensitive equipment in hospitals, IT rooms, laboratories, and industrial settings from electrical noise, surges, and ground loops. Royal Power Solutions provides professional isolation transformer installation services in {location}, Chennai. We handle the complete installation — from civil preparation and transformer placement to cable termination, earthing, and functional testing. Our installations comply with IS and IEC standards.`,
      sizes: ['1 KVA', '2 KVA', '3 KVA', '5 KVA', '7.5 KVA', '10 KVA', '15 KVA', '20 KVA', '30 KVA', '50 KVA', '100 KVA'],
      features: ['Faraday shield for noise rejection', 'Proper MV cable termination', 'Separate neutral and earth at secondary', 'Thermal and over-current protection', 'IP44 and IP55 enclosures available', 'Test certificates and documentation'],
      faq: [
        { q: `Why do hospitals need isolation transformers in {location}?`, a: `Hospitals use isolation transformers to create a safe electrical environment for patients by isolating the IT (Isolated Terra) medical network. This prevents earth leakage currents that can be dangerous for patients connected to life-support equipment.` },
        { q: `What size isolation transformer do I need for my server room in {location}?`, a: `This depends on your total server load. As a rule of thumb, the transformer KVA should be 1.25× your total load. Our engineer will calculate the exact size during a free site visit in {location}.` },
        { q: `Can you install an isolation transformer in an existing electrical system in {location}?`, a: `Yes. We can integrate an isolation transformer into your existing distribution system in {location} with minimal disruption, typically in a single working day for most sizes.` }
      ]
    }
  },
  {
    slug: 'isolation-transformer-sales-service',
    title: 'Isolation Transformer Sales & Service',
    keyword: 'Isolation Transformer Sales and Service',
    shortDesc: 'Isolation transformers — buy and service all KVA sizes across Chennai.',
    icon: 'fa-industry',
    h1Pattern: '{keyword} in {location}, Chennai',
    metaTitle: '{keyword} in {location} Chennai | Royal Power Solutions',
    metaDesc: 'Isolation transformer sales & service in {location}, Chennai. All KVA, custom-wound, Faraday shielded. Sales, AMC & repair. Royal Power Solutions. Call 9787451828.',
    content: {
      intro: `Royal Power Solutions is a trusted supplier and service provider for isolation transformers in {location}, Chennai. We supply standard and custom-wound isolation transformers for a wide range of applications including medical equipment, CNC machines, IT infrastructure, and laboratory instruments. Our service team provides scheduled maintenance, winding resistance testing, insulation testing, and emergency breakdown repairs for isolation transformers of any make and capacity across {location}.`,
      sizes: ['1 KVA', '2 KVA', '3 KVA', '5 KVA', '10 KVA', '15 KVA', '20 KVA', '30 KVA', '50 KVA', '100 KVA'],
      features: ['Custom winding to specification', 'Faraday shielded for noise rejection', 'Safety stock of common sizes', 'Repair and rewinding service', 'Insulation resistance testing', 'Oil filtration for oil-filled units'],
      faq: [
        { q: `Do you wind custom isolation transformers in {location}?`, a: `Yes. We can manufacture custom isolation transformers to your specific voltage ratio, KVA, frequency, and enclosure requirements. Delivery is typically 7–14 days from order confirmation.` },
        { q: `Can you repair my old isolation transformer in {location}?`, a: `Yes. If the transformer winding is burnt or damaged, we can rewind it at a fraction of the cost of a new unit. We will advise whether repair or replacement is more economical for your specific unit in {location}.` },
        { q: `Do you service all brands of isolation transformers in {location}?`, a: `Yes. We service isolation transformers of all makes and brands in {location}, including Servomax, Emmerich, Solcon, and locally wound units.` }
      ]
    }
  },
  {
    slug: 'manual-stabilizer-rental',
    title: 'Manual Stabilizer Rental',
    keyword: 'Manual Stabilizer Rental',
    shortDesc: 'Stabilizer rental for events, construction sites, temporary setups in Chennai.',
    icon: 'fa-handshake',
    h1Pattern: '{keyword} in {location}, Chennai',
    metaTitle: '{keyword} in {location} Chennai | Royal Power Solutions',
    metaDesc: 'Manual stabilizer rental in {location}, Chennai. Short-term and long-term hire for events, offices & construction. Royal Power Solutions. Call 9787451828.',
    content: {
      intro: `Royal Power Solutions offers manual voltage stabilizer rental services in {location}, Chennai for temporary or short-term power quality needs. Whether you need a stabilizer for a construction site, a temporary office, an event, or while your permanent unit is being serviced, we have units available for daily, weekly, or monthly rental. Delivery, installation, and pickup are all handled by our team in {location}.`,
      sizes: ['5 KVA', '10 KVA', '15 KVA', '20 KVA', '30 KVA', '50 KVA'],
      features: ['Daily, weekly, monthly rental plans', 'Delivery and installation included', 'Pick-up at end of rental', 'Maintained and tested units', 'No long-term commitment required', 'Security deposit applicable'],
      faq: [
        { q: `Can I rent a stabilizer for just 2 days in {location}?`, a: `Yes. We offer short-term rentals from as little as 1 day. Call us, tell us the KVA you need and the dates, and we\'ll arrange delivery to your site in {location}.` },
        { q: `Is installation included in the rental price in {location}?`, a: `Basic installation (connecting input and output cables) is included. If your site in {location} requires additional wiring or panel work, a small extra charge may apply.` },
        { q: `What stabilizer sizes are available for rent in {location}?`, a: `We have rental units from 5 KVA to 50 KVA in stock for {location}. For larger sizes, a few days advance notice is needed. Call us to check current availability.` }
      ]
    }
  },
  {
    slug: 'trolley-rental',
    title: 'Trolley Rental',
    keyword: 'Trolley Rental',
    shortDesc: 'Industrial trolley rental for UPS, generator and heavy equipment movement in Chennai.',
    icon: 'fa-cart-flatbed',
    h1Pattern: '{keyword} in {location}, Chennai',
    metaTitle: '{keyword} in {location} Chennai | Royal Power Solutions',
    metaDesc: 'Trolley rental in {location}, Chennai. Heavy-duty trolleys for UPS shifting, generator movement & industrial equipment. Royal Power Solutions. Call 9787451828.',
    content: {
      intro: `Royal Power Solutions provides heavy-duty industrial trolley rental in {location}, Chennai for moving UPS systems, generators, transformers, battery banks, and other heavy electrical equipment. Our trolleys are rated for loads from 500kg to 3000kg and are equipped with swivel castors for easy navigation in tight spaces. Whether you need a trolley for a day or a longer project, we deliver and collect from your site in {location}.`,
      sizes: ['500 kg capacity', '1000 kg capacity', '1500 kg capacity', '2000 kg capacity', '3000 kg capacity'],
      features: ['Heavy-duty welded steel construction', 'Swivel and fixed castor options', 'Non-marking rubber castors available', 'Low platform height for easy loading', 'Braking castors for safety', 'Available with guide rails or flat platform'],
      faq: [
        { q: `What is the maximum weight trolley you rent in {location}?`, a: `Our heaviest trolley is rated for 3000 kg, suitable for large industrial UPS units, transformers, and generator sets. Contact us with your equipment weight and we will confirm availability in {location}.` },
        { q: `Can I rent a trolley by the hour in {location}?`, a: `Our minimum rental is one day (8 hours). If you need a trolley for a quick job in {location}, the one-day rate applies regardless of usage hours.` },
        { q: `Do you deliver the trolley to my site in {location}?`, a: `Yes. We deliver and collect the trolley from your location in {location}. Delivery charge depends on the distance from our depot.` }
      ]
    }
  },
  {
    slug: 'ac-panel-work',
    title: 'AC Panel Sales, Service & Installation',
    keyword: 'AC Panel Work',
    shortDesc: 'AC electrical panel design, supply, installation and service in Chennai.',
    icon: 'fa-square-poll-vertical',
    h1Pattern: 'AC Panel Sales, Service & Installation in {location}, Chennai',
    metaTitle: 'AC Panel Work in {location} Chennai | Royal Power Solutions',
    metaDesc: 'AC panel sales, service & installation in {location}, Chennai. MCB boards, distribution boards, main panels. GST contractor. Royal Power Solutions. Call 9787451828.',
    content: {
      intro: `Royal Power Solutions provides complete AC panel solutions in {location}, Chennai — including design, supply, installation, testing, and ongoing service of all types of AC distribution panels. From residential MCB distribution boards to large industrial main LT panels, our team handles the complete scope. All our panels are manufactured to IS standards, with proper busbar sizing, cable entry provisions, and protection coordination.`,
      sizes: ['Single-phase DB', '3-phase DB', 'MCC panel', 'PCC panel', 'Capacitor panel', 'VFD panel'],
      features: ['MCB, MCCB, ACB selection and installation', 'Busbar sizing for full load current', 'Cable gland and lug termination', 'Phase indication lamps and meters', 'Earth fault relay and protection', 'Labelling and as-built drawings'],
      faq: [
        { q: `Can you install a new MCB board in my house in {location}?`, a: `Yes. We install single-phase and three-phase MCB distribution boards for homes and apartments in {location}. We include surge protection and ELCB for safety.` },
        { q: `Can you design a custom MCC panel for my factory in {location}?`, a: `Yes. Our team designs and manufactures custom Motor Control Centres (MCC) for factories and industries in {location}. We handle the engineering, manufacturing, and site installation.` },
        { q: `Do you service existing electrical panels in {location}?`, a: `Yes. Annual panel servicing in {location} includes thermal scanning, tightening all connections, cleaning, testing all breakers, and checking protection relays.` }
      ]
    }
  },
  {
    slug: 'ac-dc-mbs-sales',
    title: 'AC DC MBS Sales',
    keyword: 'AC DC MBS Sales',
    shortDesc: 'AC/DC power supplies, MBS (Motorised Bus Sectionaliser) sales in Chennai.',
    icon: 'fa-microchip',
    h1Pattern: '{keyword} in {location}, Chennai',
    metaTitle: '{keyword} in {location} Chennai | Royal Power Solutions',
    metaDesc: 'AC, DC, MBS sales in {location}, Chennai. AC/DC power supplies, bus sectionaliser panels. Royal Power Solutions. Call 9787451828.',
    content: {
      intro: `Royal Power Solutions supplies AC power systems, DC power systems, and Motorised Bus Sectionaliser (MBS) panels in {location}, Chennai. AC/DC systems are used in telecommunications, SCADA systems, process industries, and railway applications where reliable regulated power is critical. MBS panels are used in medium-voltage switchgear to allow bus splitting with motorised ACBs for enhanced reliability and flexibility in power distribution networks across {location}.`,
      sizes: ['12V DC systems', '24V DC systems', '48V DC systems', '110V DC systems', 'AC distribution panels', 'MBS panels for LT switchgear'],
      features: ['Telecom-grade DC power plants', 'Float and boost charging modes', 'Rectifier and battery backup', 'Remote monitoring via SNMP', 'MBS with motorised ACBs', 'Synchronisation and auto-changeover'],
      faq: [
        { q: `What is an MBS panel and where is it used in {location}?`, a: `An MBS (Motorised Bus Sectionaliser) panel is used in LT switchrooms where two bus sections are normally separated but can be automatically coupled if one incoming supply fails. It is common in hospitals, data centres, and process plants in {location}.` },
        { q: `Do you supply 48V DC telecom power plants in {location}?`, a: `Yes. We supply 48V DC power plants from leading brands for telecom towers and data communication equipment in {location}. These include rectifier modules, battery integration, and remote monitoring.` },
        { q: `Can you integrate an MBS with an existing generator changeover panel in {location}?`, a: `Yes. Our engineers can design the control logic and interlocking to safely integrate an MBS with your existing ATS and generator panels in {location}.` }
      ]
    }
  },
  {
    slug: 'lithium-ion-battery',
    title: 'Lithium Ion Battery Sales, Service & Installation',
    keyword: 'Lithium Ion Battery',
    shortDesc: 'Complete lithium ion battery solutions — sales, service and installation in Chennai.',
    icon: 'fa-battery-three-quarters',
    h1Pattern: 'Lithium Ion Battery Sales, Service & Installation in {location}, Chennai',
    metaTitle: 'Lithium Ion Battery in {location} Chennai | Royal Power Solutions',
    metaDesc: 'Lithium ion battery sales, service & installation in {location}, Chennai. LiFePO4 for UPS, solar & EV charging. Long life. Royal Power Solutions. Call 9787451828.',
    content: {
      intro: `Royal Power Solutions provides a complete lithium ion battery service in {location}, Chennai — covering sales, on-site installation, and ongoing maintenance. We specialise in LiFePO4 (Lithium Iron Phosphate) battery systems for UPS backup, solar energy storage, and off-grid applications. Unlike lead-acid batteries, LiFePO4 batteries are thermally stable, safe, and deliver over 3000 charge cycles with consistent performance throughout their life. We supply and install lithium battery systems for homes, offices, hospitals, and industrial facilities across {location}.`,
      sizes: ['12V 50Ah', '24V 100Ah', '48V 100Ah', '48V 200Ah', '48V 300Ah', '96V packs', 'Custom configurations'],
      features: ['LiFePO4 for thermal safety', 'Built-in battery management system (BMS)', '3000–5000 charge cycles', 'Compatible with grid-tie and off-grid inverters', 'Rack-mount and wall-mount options', '10-year design lifespan'],
      faq: [
        { q: `How long does a lithium ion battery last in {location}?`, a: `LiFePO4 batteries typically last 10–15 years or 3000–5000 cycles in normal operating conditions in {location}. This is 3–4× the life of conventional VRLA lead-acid batteries.` },
        { q: `Is lithium battery installation safe for home use in {location}?`, a: `Yes. LiFePO4 chemistry is one of the safest lithium variants — it does not overheat or catch fire under normal conditions. Our installations in {location} include proper ventilation, BMS protection, and disconnect switches.` },
        { q: `Can you service a lithium battery installed by another company in {location}?`, a: `Yes, as long as the BMS communication protocol is accessible. Our technicians can diagnose cell-level issues, replace faulty cell modules, and update BMS firmware for most lithium battery systems in {location}.` }
      ]
    }
  },
  {
    slug: 'solar-installation',
    title: 'Solar Panel Installation',
    keyword: 'Solar Installation',
    shortDesc: 'Residential and commercial solar panel installation in Chennai.',
    icon: 'fa-solar-panel',
    h1Pattern: 'Solar Panel Installation in {location}, Chennai',
    metaTitle: 'Solar Installation in {location} Chennai | Royal Power Solutions',
    metaDesc: 'Solar panel installation in {location}, Chennai. On-grid, off-grid & hybrid solar systems for homes and businesses. GST registered. Royal Power Solutions. Call 9787451828.',
    content: {
      intro: `Royal Power Solutions provides professional solar panel installation services in {location}, Chennai for residential homes, commercial buildings, factories, and institutions. We design and install on-grid, off-grid, and hybrid solar PV systems tailored to your energy needs and rooftop availability. With rising electricity tariffs in Tamil Nadu, solar power is one of the best investments you can make for your property in {location}. We handle everything from the site survey and system design to installation, TANGEDCO grid interconnection, and net metering paperwork.`,
      sizes: ['1 kWp (home)', '2 kWp', '3 kWp', '5 kWp', '10 kWp', '20 kWp', '50 kWp', '100 kWp', '500 kWp (commercial)'],
      features: ['Tier-1 solar panels with 25-year performance warranty', 'On-grid, off-grid and hybrid options', 'TANGEDCO net metering application assistance', 'MNRE-approved installers', 'Subsidy guidance for residential systems', 'Remote monitoring via mobile app'],
      faq: [
        { q: `How much does a 3kW solar installation cost in {location}, Chennai?`, a: `A 3kW on-grid solar system in {location} typically costs between ₹1.5 to ₹2.2 lakhs depending on panel brand and inverter type. After Tamil Nadu government subsidy, the net cost can come down significantly for residential installations.` },
        { q: `Can I get TANGEDCO net metering for my solar system in {location}?`, a: `Yes. We assist with the complete TANGEDCO net metering application for {location}. Once approved, excess solar energy exported to the grid is credited to your electricity bill.` },
        { q: `How long does solar panel installation take in {location}?`, a: `A residential 1–5kWp system in {location} is typically installed in 1–2 days. Larger commercial systems take 3–7 days. We will give you an exact timeline after the site survey.` }
      ]
    }
  }
];

// ── NAVBAR HTML ────────────────────────────────────────────
function navbarHTML(depth = '') {
  return `
  <header class="nav is-scrolled" id="nav">
    <div class="container nav__inner">
      <a href="${depth}index.html" class="nav__brand" aria-label="Royal Power Solutions home">
        <img src="${depth}assets/rps-logo.jpeg" alt="Royal Power Solutions logo" class="nav__logo" width="42" height="42">
        <span class="nav__brand-text">Royal Power <em>Solutions</em></span>
      </a>
      <nav class="nav__links" id="navLinks" aria-label="Primary navigation">
        <a href="${depth}index.html" class="nav-link">Home</a>
        <a href="${depth}about.html" class="nav-link">About Us</a>
        <a href="${depth}services.html" class="nav-link">Services</a>
        <a href="${depth}gallery.html" class="nav-link">Gallery</a>
        <a href="${depth}contact.html" class="nav-link">Contact</a>
      </nav>
      <div class="nav__actions">
        <a href="tel:+919787451828" class="btn btn--ghost-nav">
          <i class="fa-solid fa-phone" aria-hidden="true"></i> 97874 51828
        </a>
        <a href="${depth}contact.html" class="btn btn--gold">Get Quote</a>
      </div>
      <button class="nav__burger" id="navBurger" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="navLinks">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>`;
}

// ── FOOTER HTML ────────────────────────────────────────────
function footerHTML(depth = '') {
  return `
  <footer class="footer" aria-label="Site footer">
    <div class="container footer__inner">
      <div class="footer__brand">
        <img src="${depth}assets/rps-logo.jpeg" alt="Royal Power Solutions logo" class="footer__logo" width="56" height="56">
        <p>Powering homes, offices and industries across Chennai with dependable UPS systems and electrical services since 2016.</p>
        <div class="footer__socials">
          <a href="https://wa.me/919787451828" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i></a>
          <a href="mailto:royalpowersolutionsinfo@gmail.com" aria-label="Email"><i class="fa-solid fa-envelope" aria-hidden="true"></i></a>
          <a href="tel:+919787451828" aria-label="Phone"><i class="fa-solid fa-phone" aria-hidden="true"></i></a>
        </div>
      </div>
      <div class="footer__col">
        <h4>Quick Links</h4>
        <a href="${depth}index.html">Home</a>
        <a href="${depth}about.html">About Us</a>
        <a href="${depth}services.html">Services</a>
        <a href="${depth}gallery.html">Gallery</a>
        <a href="${depth}contact.html">Contact</a>
      </div>
      <div class="footer__col">
        <h4>Service Areas</h4>
        <a href="${depth}locations/ashok-pillar.html">Ashok Pillar</a>
        <a href="${depth}locations/jafferkhanpet.html">Jafferkhanpet</a>
        <a href="${depth}locations/west-mambalam.html">West Mambalam</a>
        <a href="${depth}locations/guindy.html">Guindy</a>
        <a href="${depth}locations/saidapet.html">Saidapet</a>
        <a href="${depth}locations/ambattur.html">Ambattur</a>
        <a href="${depth}locations/chennai.html">Chennai</a>
      </div>
      <div class="footer__col">
        <h4>Contact Us</h4>
        <span><i class="fa-solid fa-location-dot" aria-hidden="true"></i> No: 55/15, 69th Street, RV Nagar, Jafferkhanpet, Chennai - 600 083</span>
        <span><i class="fa-solid fa-phone" aria-hidden="true"></i> <a href="tel:+919787451828">97874 51828</a></span>
        <span><i class="fa-solid fa-envelope" aria-hidden="true"></i> <a href="mailto:royalpowersolutionsinfo@gmail.com">royalpowersolutionsinfo@gmail.com</a></span>
        <span><i class="fa-solid fa-file-invoice" aria-hidden="true"></i> GST: 33CKUPB0081N2ZX</span>
      </div>
    </div>
    <div class="footer__bottom">
      <div class="container footer__bottom-inner">
        <p>&copy; <span id="year"></span> Royal Power Solutions. All rights reserved.</p>
        <p class="footer__tagline"><i class="fa-solid fa-bolt" aria-hidden="true"></i> Powered by expertise. Driven by trust.</p>
      </div>
    </div>
  </footer>`;
}

// ── PAGE GENERATOR ─────────────────────────────────────────
function generatePage(service, location) {
  const depth = '../';
  const isCityWide = location.slug === 'chennai';
  const locDisplay = isCityWide ? 'Chennai' : `${location.name}, Chennai`;
  const locMeta = isCityWide ? 'Chennai' : `${location.name} Chennai`;

  let h1 = (service.h1Pattern || '{keyword} in {location}, Chennai')
    .replace('{keyword}', service.title)
    .replace('{location}, Chennai', locDisplay)
    .replace('{location}', location.name);
  if (isCityWide) {
    h1 = h1.replace(/Chennai,\s*Chennai/gi, 'Chennai').replace(/Chennai\s+Chennai/gi, 'Chennai');
  }

  let metaTitle = service.metaTitle
    .replace(/{keyword}/g, service.title)
    .replace('{location} Chennai', locMeta)
    .replace(/{location}/g, location.name);
  if (isCityWide) {
    metaTitle = metaTitle.replace(/Chennai,\s*Chennai/gi, 'Chennai').replace(/Chennai\s+Chennai/gi, 'Chennai');
  }

  let metaDesc = service.metaDesc
    .replace('{location}, Chennai', locDisplay)
    .replace(/{location}/g, location.name);
  if (isCityWide) {
    metaDesc = metaDesc.replace(/Chennai,\s*Chennai/gi, 'Chennai').replace(/Chennai\s+Chennai/gi, 'Chennai');
  }

  const canonicalUrl = `https://royalpowersolutions.in/${location.slug}/${service.slug}.html`;
  
  let intro = service.content.intro
    .replace('{location}, Chennai', locDisplay)
    .replace(/{location}/g, location.name);
  if (isCityWide) {
    intro = intro.replace(/Chennai,\s*Chennai/gi, 'Chennai').replace(/Chennai\s+Chennai/gi, 'Chennai');
  }

  const sizesHTML = service.content.sizes.map(s => `<span class="amc-badge amc-badge--light"><i class="fa-solid fa-check"></i> ${s}</span>`).join('\n            ');
  const featuresHTML = service.content.features.map(f => `<li><i class="fa-solid fa-check" aria-hidden="true"></i> ${f.replace('{location}, Chennai', locDisplay).replace(/{location}/g, location.name).replace(/Chennai,\s*Chennai/gi, 'Chennai')}</li>`).join('\n              ');

  const faqSchemaItems = service.content.faq.map((f, i) => `{
      "@type": "Question",
      "name": "${f.q.replace('{location}, Chennai', locDisplay).replace(/{location}/g, location.name).replace(/Chennai,\s*Chennai/gi, 'Chennai').replace(/"/g, '\\"')}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "${f.a.replace('{location}, Chennai', locDisplay).replace(/{location}/g, location.name).replace(/Chennai,\s*Chennai/gi, 'Chennai').replace(/"/g, '\\"')}"
      }
    }`).join(',\n    ');

  const faqHTML = service.content.faq.map(f => `
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false">
              ${f.q.replace('{location}, Chennai', locDisplay).replace(/{location}/g, location.name).replace(/Chennai,\s*Chennai/gi, 'Chennai')}
              <span class="faq-question__icon"><i class="fa-solid fa-plus"></i></span>
            </button>
            <div class="faq-answer">
              <p>${f.a.replace('{location}, Chennai', locDisplay).replace(/{location}/g, location.name).replace(/Chennai,\s*Chennai/gi, 'Chennai')}</p>
            </div>
          </div>`).join('\n');

  // Related services (up to 4 different services)
  const relatedServices = services
    .filter(s => s.slug !== service.slug)
    .slice(0, 4);
  const relatedHTML = relatedServices.map(s => `
            <a href="${s.slug}.html" class="s-card" style="text-decoration:none;">
              <div class="s-card__icon"><i class="fa-solid ${s.icon}"></i></div>
              <h3>${s.title}</h3>
              <p>${s.shortDesc}</p>
            </a>`).join('');

  // Other location links for same service
  const otherLocations = locations
    .filter(l => l.slug !== location.slug)
    .map(l => `<a href="../${l.slug}/${service.slug}.html" class="keyword-pill"><i class="fa-solid fa-location-dot"></i> ${service.title} in ${l.name}</a>`)
    .join('');

  // All services in this location (Keywords Boost)
  const allKeywordsPills = services
    .map(s => `<a href="../${location.slug}/${s.slug}.html" class="keyword-pill"><i class="fa-solid fa-bolt"></i> ${s.keyword || s.title} ${isCityWide ? 'Chennai' : location.name}</a>`)
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${metaTitle}</title>
  <meta name="description" content="${metaDesc}">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
  <link rel="canonical" href="${canonicalUrl}">
  <meta property="og:title" content="${metaTitle}">
  <meta property="og:description" content="${metaDesc}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="https://royalpowersolutions.in/assets/rps-logo.jpeg">
  <meta property="og:site_name" content="Royal Power Solutions">
  <meta property="og:locale" content="en_IN">

  <!-- Favicon -->
  <link rel="icon" type="image/jpeg" href="${depth}assets/rps-logo.jpeg">
  <link rel="apple-touch-icon" href="${depth}assets/rps-logo.jpeg">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

  <!-- Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" crossorigin="anonymous">

  <!-- Stylesheet -->
  <link rel="stylesheet" href="${depth}css/style.css">

  <!-- JSON-LD Structured Data -->
  <script type="application/ld+json">
  [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Royal Power Solutions",
      "url": "${canonicalUrl}",
      "telephone": "+919787451828",
      "email": "royalpowersolutionsinfo@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "No: 55/15, 69th Street, RV Nagar, Jafferkhanpet",
        "addressLocality": "${location.name}",
        "addressRegion": "Tamil Nadu",
        "postalCode": "${location.pincode}",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": ${location.lat},
        "longitude": ${location.lng}
      },
      "areaServed": {
        "@type": "City",
        "name": "${isCityWide ? 'Chennai, Tamil Nadu' : `${location.name}, Chennai`}"
      },
      "priceRange": "₹₹",
      "openingHoursSpecification": [{
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
        "opens": "09:00",
        "closes": "20:00"
      }],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "${service.title} in ${isCityWide ? 'Chennai' : location.name}",
        "itemListElement": [{
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "${service.title}",
            "description": "${service.shortDesc}",
            "areaServed": "${isCityWide ? 'Chennai, Tamil Nadu' : `${location.name}, Chennai`}"
          }
        }]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {"@type":"ListItem","position":1,"name":"Home","item":"https://royalpowersolutions.in/"},
        {"@type":"ListItem","position":2,"name":"${isCityWide ? 'Greater Chennai' : location.name}","item":"https://royalpowersolutions.in/locations/${location.slug}.html"},
        {"@type":"ListItem","position":3,"name":"${service.title}","item":"${canonicalUrl}"}
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [${faqSchemaItems}]
    }
  ]
  </script>

  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-5CMBCKNPXL"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-5CMBCKNPXL');
  </script>
</head>
<body>

  <!-- Charge Bar -->
  <div class="charge-bar" id="chargeBar" aria-hidden="true">
    <svg viewBox="0 0 40 400" preserveAspectRatio="none">
      <path class="charge-track" d="M20 0 L14 140 L26 150 L10 260 L20 400" />
      <path class="charge-bolt" id="chargeBolt" d="M20 0 L14 140 L26 150 L10 260 L20 400" />
    </svg>
  </div>

  ${navbarHTML(depth)}

  <!-- ============================================================
       PAGE HEADER
  ============================================================ -->
  <section class="page-header" aria-label="Page header">
    <div class="container">
      <!-- Breadcrumb -->
      <nav aria-label="Breadcrumb" style="margin-bottom:16px;">
        <ol style="display:flex;gap:8px;list-style:none;color:rgba(255,255,255,0.6);font-size:0.82rem;flex-wrap:wrap;">
          <li><a href="${depth}index.html" style="color:rgba(255,255,255,0.7);">Home</a></li>
          <li style="opacity:0.5;">/</li>
          <li><a href="${depth}locations/${location.slug}.html" style="color:rgba(255,255,255,0.7);">${isCityWide ? 'Greater Chennai' : location.name}</a></li>
          <li style="opacity:0.5;">/</li>
          <li style="color:var(--rps-gold);">${service.title}</li>
        </ol>
      </nav>
      <h1 data-reveal>${h1}</h1>
      <p data-reveal>${service.shortDesc}</p>
      <div style="display:flex;gap:14px;margin-top:24px;flex-wrap:wrap;" data-reveal>
        <a href="tel:+919787451828" class="btn btn--gold"><i class="fa-solid fa-phone"></i> Call Now</a>
        <a href="https://wa.me/919787451828?text=Hi%2C+I+need+${encodeURIComponent(service.title)}+in+${encodeURIComponent(isCityWide ? 'Chennai' : location.name)}" target="_blank" rel="noopener" class="btn btn--outline"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
      </div>
    </div>
  </section>

  <!-- ============================================================
       INTRO SECTION
  ============================================================ -->
  <section style="padding:80px 0;">
    <div class="container">
      <div class="about__split">
        <div class="about__text" data-reveal>
          <p class="eyebrow eyebrow--dark"><i class="fa-solid fa-location-dot"></i> ${isCityWide ? 'City-Wide Chennai Support' : `${location.name}, Chennai`}</p>
          <h2>${service.title} — Trusted Experts in ${isCityWide ? 'Chennai' : location.name}</h2>
          <p>${intro}</p>
          <div class="why__list" style="margin-top:28px;" aria-label="Service features">
            <ul>
              ${featuresHTML}
            </ul>
          </div>
          <div style="display:flex;gap:14px;margin-top:32px;flex-wrap:wrap;">
            <a href="${depth}contact.html" class="btn btn--gold btn--lg"><i class="fa-solid fa-file-invoice"></i> Get Free Quote</a>
            <a href="tel:+919787451828" class="btn btn--outline btn--lg" style="border-color:var(--rps-blue);color:var(--rps-blue);">
              <i class="fa-solid fa-phone"></i> 97874 51828
            </a>
          </div>
        </div>
        <div data-reveal style="background:var(--bg-soft);border-radius:var(--radius-lg);padding:36px;box-shadow:var(--shadow-soft);">
          <p class="eyebrow eyebrow--dark">Available Capacities &amp; Options</p>
          <h3 style="font-size:1.3rem;margin-bottom:20px;color:var(--rps-navy);">We Supply &amp; Service</h3>
          <div style="display:flex;flex-wrap:wrap;gap:10px;">
            ${sizesHTML}
          </div>
          <div style="margin-top:28px;padding:20px;background:#fff;border-radius:12px;border-left:4px solid var(--rps-gold);">
            <p style="font-weight:600;color:var(--rps-navy);margin-bottom:4px;"><i class="fa-solid fa-clock" style="color:var(--rps-gold);"></i> 24/7 Emergency Service</p>
            <p style="color:var(--text-muted);font-size:0.9rem;">Available in ${isCityWide ? 'all areas across Chennai' : `${location.name} and surrounding areas of Chennai`}.</p>
          </div>
          <a href="https://wa.me/919787451828?text=Hi%2C+I+need+${encodeURIComponent(service.title)}+in+${encodeURIComponent(isCityWide ? 'Chennai' : location.name)}" target="_blank" rel="noopener" class="btn btn--gold" style="width:100%;justify-content:center;margin-top:20px;">
            <i class="fa-brands fa-whatsapp"></i> WhatsApp for Quick Quote
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- ============================================================
       WHY CHOOSE US
  ============================================================ -->
  <section style="padding:80px 0;background:var(--rps-navy);color:#fff;" aria-label="Why choose Royal Power Solutions">
    <div class="container">
      <div style="text-align:center;margin-bottom:50px;" data-reveal>
        <p class="eyebrow" style="color:var(--rps-gold);">Why Choose Us</p>
        <h2 style="color:#fff;">Chennai's Most Trusted ${service.title} Specialists</h2>
        <p style="color:rgba(255,255,255,0.7);max-width:560px;margin:12px auto 0;">Serving ${location.name} and all nearby areas with prompt, professional service since 2016.</p>
      </div>
      <div class="services__grid" data-reveal>
        <div class="s-card s-card--cta" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);">
          <div class="s-card__icon"><i class="fa-solid fa-shield-halved"></i></div>
          <h3>GST Registered Business</h3>
          <p>GST No. 33CKUPB0081N2ZX — fully verified, tax-invoice issued for all work.</p>
        </div>
        <div class="s-card s-card--cta" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);">
          <div class="s-card__icon"><i class="fa-solid fa-clock"></i></div>
          <h3>24/7 Emergency Response</h3>
          <p>Average &lt;60 min response in ${location.name}. We never leave you without power support.</p>
        </div>
        <div class="s-card s-card--cta" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);">
          <div class="s-card__icon"><i class="fa-solid fa-certificate"></i></div>
          <h3>Genuine Parts &amp; Products</h3>
          <p>We source only from authorised distributors. Every product comes with manufacturer warranty.</p>
        </div>
        <div class="s-card s-card--cta" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);">
          <div class="s-card__icon"><i class="fa-solid fa-file-invoice"></i></div>
          <h3>Transparent Pricing</h3>
          <p>Written itemised quotation before any work starts. No hidden charges. No surprises.</p>
        </div>
        <div class="s-card s-card--cta" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);">
          <div class="s-card__icon"><i class="fa-solid fa-users"></i></div>
          <h3>Trained Technicians</h3>
          <p>All our electricians are background-checked, trained and experienced in ${service.title}.</p>
        </div>
        <div class="s-card s-card--cta" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);">
          <div class="s-card__icon"><i class="fa-solid fa-location-dot"></i></div>
          <h3>Local to ${isCityWide ? 'Chennai' : location.name}</h3>
          <p>We are based in ${isCityWide ? 'Chennai' : location.name} — fast arrival, prompt on-site support across the city.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ============================================================
       SERVICE COVERAGE
  ============================================================ -->
  <section style="padding:80px 0;background:var(--bg-soft);">
    <div class="container" data-reveal>
      <p class="eyebrow eyebrow--dark"><i class="fa-solid fa-map"></i> Service Coverage</p>
      <h2>We Cover ${isCityWide ? 'All of Chennai' : location.name} &amp; Nearby Areas</h2>
      <p style="color:var(--text-muted);max-width:640px;margin-bottom:30px;">${isCityWide ? 'Our rapid-response mobile service units quickly reach all 15 zones of Chennai including: <strong>Guindy, Ambattur, OMR, Velachery, T. Nagar, Anna Nagar, Vadapalani, Porur, Sriperumbudur</strong>, and surrounding industrial hubs.' : `Our team based in ${location.name} quickly reaches: <strong>${location.nearBy}</strong> and the wider Chennai metropolitan area.`}</p>
      <div style="border-radius:16px;overflow:hidden;box-shadow:0 15px 40px rgba(0,0,0,0.12);border:3px solid var(--rps-gold);line-height:0;">
        <iframe
          src="https://www.google.com/maps?q=${encodeURIComponent(isCityWide ? 'Chennai, Tamil Nadu' : location.name + ', Chennai, Tamil Nadu')}&output=embed"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="${service.title} service area — ${isCityWide ? 'Greater Chennai' : `${location.name}, Chennai`}"
          style="width:100%;height:400px;border:none;"
          allowfullscreen>
        </iframe>
      </div>
    </div>
  </section>

  <!-- ============================================================
       FAQ
  ============================================================ -->
  <section class="faq" aria-label="Frequently asked questions">
    <div class="container">
      <div style="text-align:center;margin-bottom:40px;" data-reveal>
        <p class="eyebrow eyebrow--dark">FAQ</p>
        <h2>Common Questions About ${service.title} in ${location.name}</h2>
      </div>
      <div class="faq__grid" data-reveal>
        ${faqHTML}
      </div>
    </div>
  </section>

  <!-- ============================================================
       RELATED SERVICES
  ============================================================ -->
  <section style="padding:80px 0;background:var(--bg-soft);">
    <div class="container">
      <div style="text-align:center;margin-bottom:40px;" data-reveal>
        <p class="eyebrow eyebrow--dark">Also Available in ${location.name}</p>
        <h2>Related Services</h2>
      </div>
      <div class="services__grid" data-reveal>
        ${relatedHTML}
      </div>
    </div>
  </section>

  <!-- ============================================================
       ALL KEYWORDS DIRECTORY (BOOST ALL TARGET KEYWORDS)
  ============================================================ -->
  <section style="padding:60px 0;background:#ffffff;" aria-label="All services in this area">
    <div class="container">
      <div style="text-align:center;margin-bottom:24px;" data-reveal>
        <p class="eyebrow eyebrow--dark"><i class="fa-solid fa-list-check"></i> Power &amp; Electrical Services Directory</p>
        <h2>All Services &amp; Solutions in ${location.name}</h2>
        <p style="color:var(--text-muted);max-width:620px;margin:8px auto 0;">Explore our complete range of certified UPS, battery, stabilizer, transformer, and electrical engineering services available in ${location.name}.</p>
      </div>
      <div class="keyword-cloud" style="justify-content:center;" data-reveal>
        ${allKeywordsPills}
      </div>
    </div>
  </section>

  <!-- ============================================================
       CTA BANNER
  ============================================================ -->
  <section style="background:var(--rps-blue);padding:80px 0;color:#fff;text-align:center;position:relative;overflow:hidden;" data-reveal>
    <div class="container" style="position:relative;z-index:2;">
      <h2 style="color:#fff;font-size:clamp(1.8rem,3.5vw,2.6rem);margin-bottom:16px;">Need ${service.title} in ${location.name}?</h2>
      <p style="font-size:1.05rem;max-width:560px;margin:0 auto 28px;opacity:0.88;">Contact Royal Power Solutions now for a free, no-obligation quote. We respond within the hour.</p>
      <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
        <a href="${depth}contact.html" class="btn btn--gold btn--lg"><i class="fa-solid fa-bolt"></i> Get Free Quote</a>
        <a href="tel:+919787451828" class="btn btn--outline btn--lg" style="border-color:rgba(255,255,255,0.3);color:#fff;"><i class="fa-solid fa-phone"></i> Call 9787451828</a>
        <a href="https://wa.me/919787451828" target="_blank" rel="noopener" class="btn btn--outline btn--lg" style="border-color:rgba(62,155,62,0.6);color:#fff;background:rgba(62,155,62,0.15);"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
      </div>
    </div>
    <i class="fa-solid fa-bolt" style="position:absolute;right:-5%;bottom:-20%;font-size:300px;opacity:0.05;transform:rotate(15deg);"></i>
  </section>

  <!-- Other Locations -->
  <section style="padding:40px 0;background:var(--bg-soft);">
    <div class="container" style="text-align:center;">
      <p style="color:var(--text-muted);font-size:0.88rem;margin-bottom:14px;"><strong>${service.title}</strong> is also available in these areas:</p>
      <div class="keyword-cloud" style="justify-content:center;">
        ${otherLocations}
      </div>
    </div>
  </section>

  ${footerHTML(depth)}

  <a href="https://wa.me/919787451828" target="_blank" rel="noopener noreferrer" class="fab-wa" aria-label="Chat on WhatsApp">
    <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
  </a>
  <button class="scroll-top" id="scrollTopBtn" aria-label="Back to top">
    <i class="fa-solid fa-arrow-up"></i>
  </button>
  <script src="${depth}js/script.js"></script>
</body>
</html>`;
}

// ── LOCATION HUB PAGE GENERATOR ────────────────────────────
function generateLocationHub(location) {
  const depth = '../';
  const isCityWide = location.slug === 'chennai';
  const title = isCityWide
    ? `UPS & Electrical Services in Chennai | Royal Power Solutions`
    : `UPS & Electrical Services in ${location.name}, Chennai | Royal Power Solutions`;
  const desc = isCityWide
    ? `Royal Power Solutions is Chennai's trusted power backup & electrical contractor. 1KVA-1000KVA UPS sales, repair, AMC, batteries, solar, stabilizers & 24/7 service. Call 9787451828.`
    : `Royal Power Solutions offers UPS sales, service, electrical work, solar, stabilizers and more in ${location.name}, Chennai. GST registered. 24/7 support. Call 9787451828.`;
  const canonicalUrl = `https://royalpowersolutions.in/locations/${location.slug}.html`;

  const servicesGridHTML = services.map((s, i) => `
        <a href="../${location.slug}/${s.slug}.html" class="s-card" style="text-decoration:none;" data-reveal style="--i:${i}">
          <div class="s-card__icon"><i class="fa-solid ${s.icon}"></i></div>
          <h3>${s.title}</h3>
          <p>${s.shortDesc}</p>
          <span class="s-card__link">Learn more <i class="fa-solid fa-arrow-right"></i></span>
        </a>`).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
  <link rel="canonical" href="${canonicalUrl}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="https://royalpowersolutions.in/assets/rps-logo.jpeg">
  <meta property="og:site_name" content="Royal Power Solutions">
  <meta property="og:locale" content="en_IN">

  <link rel="icon" type="image/jpeg" href="${depth}assets/rps-logo.jpeg">
  <link rel="apple-touch-icon" href="${depth}assets/rps-logo.jpeg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" crossorigin="anonymous">
  <link rel="stylesheet" href="${depth}css/style.css">

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Royal Power Solutions — ${isCityWide ? 'Greater Chennai' : location.name}",
    "url": "${canonicalUrl}",
    "telephone": "+919787451828",
    "email": "royalpowersolutionsinfo@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "No: 55/15, 69th Street, RV Nagar, Jafferkhanpet",
      "addressLocality": "Chennai",
      "addressRegion": "Tamil Nadu",
      "postalCode": "600083",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": ${location.lat},
      "longitude": ${location.lng}
    },
    "areaServed": "${isCityWide ? 'Greater Chennai, Tamil Nadu' : `${location.name}, Chennai`}"
  }
  </script>

  <script async src="https://www.googletagmanager.com/gtag/js?id=G-5CMBCKNPXL"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-5CMBCKNPXL');</script>
</head>
<body>

  <div class="charge-bar" id="chargeBar" aria-hidden="true">
    <svg viewBox="0 0 40 400" preserveAspectRatio="none">
      <path class="charge-track" d="M20 0 L14 140 L26 150 L10 260 L20 400" />
      <path class="charge-bolt" id="chargeBolt" d="M20 0 L14 140 L26 150 L10 260 L20 400" />
    </svg>
  </div>

  ${navbarHTML(depth)}

  <section class="page-header">
    <div class="container">
      <nav aria-label="Breadcrumb" style="margin-bottom:16px;">
        <ol style="display:flex;gap:8px;list-style:none;color:rgba(255,255,255,0.6);font-size:0.82rem;">
          <li><a href="${depth}index.html" style="color:rgba(255,255,255,0.7);">Home</a></li>
          <li style="opacity:0.5;">/</li>
          <li style="color:var(--rps-gold);">${isCityWide ? 'Greater Chennai' : location.name}</li>
        </ol>
      </nav>
      <h1 data-reveal>UPS &amp; Electrical Services in ${isCityWide ? 'Greater Chennai' : `${location.name}, Chennai`}</h1>
      <p data-reveal>${isCityWide ? 'Complete power continuity solutions for homes, commercial offices, healthcare facilities, and manufacturing industries across all 15 zones of Chennai.' : `All electrical and power backup services available in ${location.name} — UPS, inverters, batteries, solar, stabilizers, and more. 24/7 support.`}</p>
    </div>
  </section>

  <section style="padding:80px 0;background:var(--bg-soft);">
    <div class="container">
      <div style="text-align:center;margin-bottom:50px;" data-reveal>
        <p class="eyebrow eyebrow--dark"><i class="fa-solid fa-location-dot"></i> Local Services Hub</p>
        <h2>Available Power Solutions in ${isCityWide ? 'Chennai' : location.name}</h2>
        <p style="color:var(--text-muted);max-width:600px;margin:10px auto 0;">Explore full capacity specifications, brand warranties, and emergency repair options.</p>
      </div>

      <div class="services__grid">
        ${servicesGridHTML}
      </div>
    </div>
  </section>

  <section style="padding:60px 0;">
    <div class="container" data-reveal>
      <p class="eyebrow eyebrow--dark"><i class="fa-solid fa-map"></i> Service Area</p>
      <h2>We Serve ${location.name} &amp; Surroundings</h2>
      <p style="color:var(--text-muted);margin-bottom:24px;">Our technicians based near ${location.name} rapidly reach: <strong>${location.nearBy}</strong>.</p>
      <div style="border-radius:16px;overflow:hidden;box-shadow:0 15px 40px rgba(0,0,0,0.12);border:3px solid var(--rps-gold);line-height:0;">
        <iframe src="https://www.google.com/maps?q=${encodeURIComponent(location.name + ', Chennai, Tamil Nadu')}&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="${location.name} service area" style="width:100%;height:400px;border:none;" allowfullscreen></iframe>
      </div>
    </div>
  </section>

  <!-- Other Locations Hubs & Coverage -->
  <section style="padding:50px 0;background:#ffffff;">
    <div class="container" style="text-align:center;">
      <p class="eyebrow eyebrow--dark"><i class="fa-solid fa-map-location-dot"></i> Greater Chennai Service Network</p>
      <h2>Explore Other Service Locations</h2>
      <p style="color:var(--text-muted);font-size:0.9rem;margin:8px auto 20px;max-width:540px;">Select an area for localized emergency repair teams and same-day site visits:</p>
      <div class="keyword-cloud" style="justify-content:center;">
        ${locations.filter(l => l.slug !== location.slug).map(l => `<a href="${l.slug}.html" class="keyword-pill"><i class="fa-solid fa-location-dot"></i> Services in ${l.name}</a>`).join('')}
      </div>
    </div>
  </section>

  <!-- CTA Banner -->
  <section style="background:var(--rps-blue);padding:80px 0;color:#fff;text-align:center;position:relative;overflow:hidden;" data-reveal>
    <div class="container" style="position:relative;z-index:2;">
      <h2 style="color:#fff;font-size:clamp(1.8rem,3.5vw,2.6rem);margin-bottom:16px;">Need Electrical or UPS Service in ${isCityWide ? 'Chennai' : location.name}?</h2>
      <p style="font-size:1.05rem;max-width:560px;margin:0 auto 28px;opacity:0.88;">Contact Royal Power Solutions now for a free, transparent quotation. Rapid response guaranteed.</p>
      <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
        <a href="${depth}contact.html" class="btn btn--gold btn--lg"><i class="fa-solid fa-bolt"></i> Get Free Quote</a>
        <a href="tel:+919787451828" class="btn btn--outline btn--lg" style="border-color:rgba(255,255,255,0.3);color:#fff;"><i class="fa-solid fa-phone"></i> Call 9787451828</a>
        <a href="https://wa.me/919787451828?text=Hi%2C+I+need+service+in+${encodeURIComponent(isCityWide ? 'Chennai' : location.name)}" target="_blank" rel="noopener" class="btn btn--outline btn--lg" style="border-color:rgba(62,155,62,0.6);color:#fff;background:rgba(62,155,62,0.15);"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
      </div>
    </div>
    <i class="fa-solid fa-bolt" style="position:absolute;right:-5%;bottom:-20%;font-size:300px;opacity:0.05;transform:rotate(15deg);"></i>
  </section>

  ${footerHTML(depth)}

  <a href="https://wa.me/919787451828" target="_blank" rel="noopener noreferrer" class="fab-wa" aria-label="Chat on WhatsApp">
    <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
  </a>
  <button class="scroll-top" id="scrollTopBtn" aria-label="Back to top">
    <i class="fa-solid fa-arrow-up"></i>
  </button>
  <script src="${depth}js/script.js"></script>
</body>
</html>`;
}

// ── SITEMAP GENERATOR ──────────────────────────────────────
function generateSitemap() {
  const baseUrl = 'https://royalpowersolutions.in';
  const today = new Date().toISOString().split('T')[0];
  
  const mainPages = [
    { loc: '', changefreq: 'weekly', priority: '1.0' },
    { loc: 'services.html', changefreq: 'weekly', priority: '0.95' },
    { loc: 'about.html', changefreq: 'monthly', priority: '0.85' },
    { loc: 'projects.html', changefreq: 'monthly', priority: '0.85' },
    { loc: 'gallery.html', changefreq: 'monthly', priority: '0.75' },
    { loc: 'blog.html', changefreq: 'weekly', priority: '0.85' },
    { loc: 'contact.html', changefreq: 'monthly', priority: '0.85' }
  ].map(p => `  <url>
    <loc>${baseUrl}/${p.loc}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
    <lastmod>${today}</lastmod>
  </url>`).join('\n');

  // Core dedicated service pages
  const coreServices = [
    'ups-sales-service.html',
    'ups-repair-amc.html',
    'ups-installation.html',
    'battery-sales-service.html',
    'server-stabilizer.html',
    'isolation-transformer.html',
    'solar-installation.html',
    'electrical-work.html',
    'ups-shifting.html'
  ].map(s => `  <url>
    <loc>${baseUrl}/services/${s}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
    <lastmod>${today}</lastmod>
  </url>`).join('\n');

  const locationHubs = locations.map(l => `  <url>
    <loc>${baseUrl}/locations/${l.slug}.html</loc>
    <changefreq>${l.slug === 'chennai' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${l.slug === 'chennai' ? '0.95' : '0.90'}</priority>
    <lastmod>${today}</lastmod>
  </url>`).join('\n');

  const landingPages = [];
  for (const location of locations) {
    const isCh = location.slug === 'chennai';
    for (const service of services) {
      landingPages.push(`  <url>
    <loc>${baseUrl}/${location.slug}/${service.slug}.html</loc>
    <changefreq>${isCh ? 'weekly' : 'monthly'}</changefreq>
    <priority>${isCh ? '0.90' : '0.75'}</priority>
    <lastmod>${today}</lastmod>
  </url>`);
    }
  }

  // Blog pages if present
  let blogPages = '';
  const blogDir = path.join(__dirname, 'blog');
  if (fs.existsSync(blogDir)) {
    blogPages = fs.readdirSync(blogDir)
      .filter(f => f.endsWith('.html'))
      .map(f => `  <url>
    <loc>${baseUrl}/blog/${f}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
    <lastmod>${today}</lastmod>
  </url>`).join('\n');
  }

  // Project case studies if present
  let projectPages = '';
  const projDir = path.join(__dirname, 'projects');
  if (fs.existsSync(projDir)) {
    projectPages = fs.readdirSync(projDir)
      .filter(f => f.endsWith('.html'))
      .map(f => `  <url>
    <loc>${baseUrl}/projects/${f}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
    <lastmod>${today}</lastmod>
  </url>`).join('\n');
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${mainPages}
${coreServices}
${locationHubs}
${landingPages.join('\n')}
${blogPages}
${projectPages}
</urlset>`;
}

// ── ROBOTS.TXT ─────────────────────────────────────────────
function generateRobots() {
  return `User-agent: *
Allow: /
Disallow: /404.html

Sitemap: https://royalpowersolutions.in/sitemap.xml`;
}

// ── MAIN EXECUTION ─────────────────────────────────────────
console.log('🚀 Royal Power Solutions — SEO Page Generator');
console.log('==============================================');

let totalPages = 0;
let errors = [];

// Create locations directory
const locationsDir = path.join(__dirname, 'locations');
if (!fs.existsSync(locationsDir)) {
  fs.mkdirSync(locationsDir);
  console.log('✅ Created /locations/ directory');
}

// Generate location hub pages
for (const location of locations) {
  try {
    const html = generateLocationHub(location);
    const filePath = path.join(locationsDir, `${location.slug}.html`);
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✅ Location hub: /locations/${location.slug}.html`);
    totalPages++;
  } catch(e) {
    errors.push(`Location hub ${location.slug}: ${e.message}`);
  }
}

// Generate 120 landing pages
for (const location of locations) {
  const locationDir = path.join(__dirname, location.slug);
  if (!fs.existsSync(locationDir)) {
    fs.mkdirSync(locationDir);
  }

  for (const service of services) {
    try {
      const html = generatePage(service, location);
      const filePath = path.join(locationDir, `${service.slug}.html`);
      fs.writeFileSync(filePath, html, 'utf8');
      totalPages++;
    } catch(e) {
      errors.push(`${location.slug}/${service.slug}: ${e.message}`);
    }
  }
  console.log(`✅ Generated 20 pages for ${location.name}`);
}

// Generate sitemap.xml
try {
  fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), generateSitemap(), 'utf8');
  console.log('✅ sitemap.xml generated');
} catch(e) {
  errors.push(`sitemap.xml: ${e.message}`);
}

// Generate robots.txt
try {
  fs.writeFileSync(path.join(__dirname, 'robots.txt'), generateRobots(), 'utf8');
  console.log('✅ robots.txt generated');
} catch(e) {
  errors.push(`robots.txt: ${e.message}`);
}

console.log('');
console.log(`📊 SUMMARY`);
console.log(`Total pages generated: ${totalPages}`);
console.log(`Errors: ${errors.length}`);
if (errors.length > 0) {
  console.log('Errors:');
  errors.forEach(e => console.log('  ❌ ' + e));
}
console.log('');
console.log('✨ Done! Submit sitemap.xml to Google Search Console.');
