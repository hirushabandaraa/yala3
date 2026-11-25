export interface ItineraryStop {
  time: string;
  title: string;
  description: string;
}

export interface SafariPackage {
  id: 'morning' | 'full-day' | 'sunset';
  title: string;
  shortTitle: string;
  ctaLabel: string;
  price: number;
  badgeText: string;
  featuredTag?: string;
  durationLabel: string;
  timeRange: string;
  defaultDeparture: '5:30 AM (Full Day / Morning)' | '2:30 PM (Sunset & Dusk)';
  defaultTimeOption: 'Morning' | 'Evening' | 'Full Day';
  vehicleLabel: string;
  diningLabel: string;
  guestsLabel: string;
  pickupLabel: string;
  sightingRate: string;
  heroDescription: string;
  highlights: string[];
  cardImage: string;
  cardImageAlt: string;
  heroImage: string;
  heroImageAlt: string;
  itinerary: ItineraryStop[];
  included: string[];
  permitsAndNotes: string[];
}

export interface WildlifeSpecies {
  id: string;
  scientificName: string;
  commonName: string;
  summary: string;
  gridSpanClass: string;
  titleClass: string;
  image: string;
  imageAlt: string;
  preferredZones: string;
  peakHours: string;
  fieldDispatch: string;
  recommendedPackageId: SafariPackage['id'];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  country: string;
  packageName: string;
}

export const HERO_IMAGE =
  'https://lh3.googleusercontent.com/aida/ALJJyrDt7Vg71DeWhRGs0cmbuzMv3-jokZpesJqKpraOto3e89TgIgHh8FEC216GrvNKn1p5K8Y18kHYgboIreBmFFCsw_pAHIkb5y8AU0-Fu4rEIUQBNUglhGjcIRgTVJadPxGOtMY2FZPhYVxa8d2Kz_4ZVjN4cbU5dsqoeMkgR4Xck8gUFaC6vBAq3uA2g38N0bc3IveuY2eIpuzFKBaV2VCIOcxdfkvW9RqqRf_FZ40UacvCgE4OKgXWbdB04g';

export const JEEP_COLLAGE_MAIN_IMAGE =
  'https://lh3.googleusercontent.com/aida/ALJJyrAOTmCNS-Hc80mT-A6PrHoEDAC6xx3hEb8A5ER_qixS4_8XaQRzbfUBopoU-RZzuqKImtFGdpulA4Kd7QdO0oGu_xKjlQOZR0mRmNe5m1ZL2xzmn_3DenZm5VbipXWpFvgsXMu8OpkgDT8ecjLCsT69KZPWLts3X5Xct-040Dg8R5cyolqn1D5wJWUbNXgWhZUA7GqTfKZ84pMVZ65uu1Jg1zkl3LYkgyxpmiDVhFSxAefQcX8badGYsZ9I';

export const JEEP_COLLAGE_GEAR_IMAGE =
  'https://lh3.googleusercontent.com/aida/ALJJyrBONLC-UvLD-xL2I6Ok9HxF48HVFEpHeA7kgeW4_qVNMgidD7VQxojcCV7zhxI2OaL3DSf0jc9uX5l4vFEOz3rWKlk3GCLPrYmbD5xjaCjRDUYSLqCQchI5Ez2PAnPl9CHcvX_yK8JRP0YhtsTbbDUqNF9YqncNRZiUJWMfnwydq0nBrUTqjXai31RLSz9V8QmiKpmsrGM3vkBYxjKnr_ESplamCipR35ot3ZiO9XXhIMq0d_90LZhxWwrCRg';

export const MODAL_BACKDROP_IMAGE =
  'https://lh3.googleusercontent.com/aida/ALJJyrA3GRl91GfOswvCOln9yMuDpJA0kBP3Y8g7QWpmjmBUHhfhYlkDvW1uy1Pxebm8JARs1IHnl7eXInuLuBjpY4BwdjhfzUljRR092uZ6PI7ygUxQoQy9VOLGzq6aIUoxRxKIra70vPAhWvq5KLNVcWS7fq4fiADvjLCGgaaVTkNj97KdCCokbgT4idvzlV_UV-y99RH4Ata1fHBO2XPio2lAPgmRiq5Gi7APWrP__cbcH1JkNijdLU-LuOCGIpID';

export const SAFARI_PACKAGES: SafariPackage[] = [
  {
    id: 'morning',
    title: 'Golden Hour Morning Safari',
    shortTitle: 'Morning Safari',
    ctaLabel: 'Reserve Morning Safari',
    price: 145,
    badgeText: '4 Hours | Private 4x4 Jeep',
    durationLabel: '4 Hours (Morning)',
    timeRange: '5:30 AM – 9:30 AM',
    defaultDeparture: '5:30 AM (Full Day / Morning)',
    defaultTimeOption: 'Morning',
    vehicleLabel: 'Custom Open-Top 4x4',
    diningLabel: 'Artisan Ceylon Tea & Fruit',
    guestsLabel: 'Up to 6 Guests',
    pickupLabel: 'Tissamaharama & Yala Pickup',
    sightingRate: '82% Sightings',
    heroDescription:
      'Enter Palatupana Gate at first light to intercept nocturnal leopards patrolling sandy coastal tracks before the midday heat arrives.',
    highlights: [
      'First-light entry at Palatupana Gate (5:30 AM)',
      'Fresh pugmark tracking along coastal rock outcrops',
      'Artisan Ceylon tea & tropical fruit cooler',
    ],
    cardImage:
      'https://lh3.googleusercontent.com/aida/ALJJyrCynKWGP1zP2PPPcQeXk3iknTNAWJjFIkW_tIU6afJISz-SAug85vOuKXuXVUv1-JZzhxq3oqFm6xBvhv311zG0uq634EDkvBKJMHCZ8aGs_9BaShjoxYLLuSxYa8eNvUMvSY8sVStGxovYtrsrmgE1fKKuQ6Y4O0bHjvjpitVY97KzYuhPMwcTw0WaZ0a0nbxWShgiXa-HFIiQwc0stYREw1EB6w8B9F_Kbbqsy-YdOjyy6V0tfk6zA5VC',
    cardImageAlt: 'Sri Lankan leopard walking along a sunlit jungle track at dawn in Yala',
    heroImage:
      'https://lh3.googleusercontent.com/aida/ALJJyrCynKWGP1zP2PPPcQeXk3iknTNAWJjFIkW_tIU6afJISz-SAug85vOuKXuXVUv1-JZzhxq3oqFm6xBvhv311zG0uq634EDkvBKJMHCZ8aGs_9BaShjoxYLLuSxYa8eNvUMvSY8sVStGxovYtrsrmgE1fKKuQ6Y4O0bHjvjpitVY97KzYuhPMwcTw0WaZ0a0nbxWShgiXa-HFIiQwc0stYREw1EB6w8B9F_Kbbqsy-YdOjyy6V0tfk6zA5VC',
    heroImageAlt: 'Sri Lankan leopard walking along a sunlit jungle track at dawn in Yala',
    itinerary: [
      {
        time: '05:00 AM',
        title: 'Complimentary Lodge Pickup',
        description:
          'Quiet door-to-door pickup from your Tissamaharama or Yala buffer-zone hotel in our photography-fitted 4x4.',
      },
      {
        time: '05:30 AM',
        title: 'First-Light Gate Entry',
        description:
          'Lead convoy entry at Palatupana Gate to read overnight leopard pugmarks on damp sandy roads.',
      },
      {
        time: '07:15 AM',
        title: 'Coastal Rock Outcrop & Alarm Call Circuit',
        description:
          'Patient tracking around Patanangala and Suduweligala rock formations during peak predator movement.',
      },
      {
        time: '08:30 AM',
        title: 'Bush Tea & Tropical Fruit Break',
        description:
          'Freshly brewed single-estate Ceylon tea, chilled king coconut, and seasonal fruit served beside a quiet lagoon.',
      },
    ],
    included: [
      'Private custom 4x4 safari jeep & driver',
      'Certified senior wildlife tracker',
      'Artisan Ceylon tea & tropical fruit cooler',
      'Gimbal mounts, beanbags & binoculars',
    ],
    permitsAndNotes: [
      'National Park entry tickets paid at gate (~$42/guest)',
      'Free cancellation up to 48 hours prior',
      'Custom dietary menus available on request',
    ],
  },
  {
    id: 'full-day',
    title: 'Full-Day Leopard Tracker',
    shortTitle: 'Full-Day Tracker',
    ctaLabel: 'Reserve Full-Day Drive',
    price: 290,
    badgeText: '12 Hours | Breakfast & Lunch',
    featuredTag: 'Signature Expedition',
    durationLabel: '12 Hours (Full Day)',
    timeRange: '5:30 AM – 6:00 PM',
    defaultDeparture: '5:30 AM (Full Day / Morning)',
    defaultTimeOption: 'Full Day',
    vehicleLabel: 'Custom Open-Top 4x4',
    diningLabel: 'Breakfast & Lunch',
    guestsLabel: 'Up to 6 Guests',
    pickupLabel: 'Tissamaharama & Yala Pickup',
    sightingRate: '94% Sightings',
    heroDescription:
      'Twelve unhurried hours across Yala Block 1 and Block 5 with a senior leopard tracker, gourmet bush dining, and midday waterhole stakeouts.',
    highlights: [
      'Picnic breakfast & riverside gourmet lunch included',
      'Deep-park access across Yala Block 1 & Block 5',
      'Unrushed midday waterhole stakeouts for photographers',
    ],
    cardImage:
      'https://lh3.googleusercontent.com/aida/ALJJyrA420wDX9wpV4S5Ak_F-4Km3GaDKdLYfTUzW2iMVXe-axubePrDegSqsawCOLQSnQhc-5VavdXhO9rhXr4KROocTnyawae4HfZiFsldXstT4AZBz4aWZWYN68RMYku9dIjsfvTkVdiiNwEFOCKT72MgRyp-_gQZ6QW7NZq-pMzXGVN5Pe4XgULM7T0tH6rI2js2CUp4L4_QxcOvPBuoySUYkDs3KcgSjoYQngri6w7MUKWMba5m6ISB9tOW',
    cardImageAlt: 'Custom open-top 4x4 safari jeep overlooking a tranquil Yala waterhole',
    heroImage: MODAL_BACKDROP_IMAGE,
    heroImageAlt: 'Custom open-top 4x4 safari jeep overlooking a tranquil Yala waterhole',
    itinerary: [
      {
        time: '05:00 AM',
        title: 'Complimentary Lodge Pickup',
        description:
          'Door-to-door transfer from your Tissamaharama or Yala buffer-zone hotel in our custom open-top 4x4.',
      },
      {
        time: '05:30 AM',
        title: 'Dawn Entry at Palatupana Gate',
        description:
          'First-light tracking along sandy coastal tracks and rocky outcrops while leopards patrol territories.',
      },
      {
        time: '08:30 AM',
        title: 'Gourmet Bush Breakfast',
        description:
          'Freshly brewed Ceylon tea, tropical fruit, and hot Sri Lankan hoppers served at a shaded forest clearing.',
      },
      {
        time: '12:30 PM',
        title: 'Riverside Lunch & Waterhole Stakeout',
        description:
          'Chilled refreshments and a curated picnic lunch beside the Menik Ganga as elephants and sloth bears gather.',
      },
      {
        time: '03:30 PM',
        title: 'Golden Hour Predator Drive',
        description:
          'Afternoon circuit through Block 1 lagoons for late-day leopard movement and wetland birdlife before dusk exit.',
      },
    ],
    included: [
      'Private custom 4x4 safari jeep & driver',
      'Certified senior wildlife tracker',
      'Picnic breakfast, riverside lunch & cooler',
      'Gimbal mounts, beanbags & binoculars',
    ],
    permitsAndNotes: [
      'National Park entry tickets paid at gate (~$42/guest)',
      'Free cancellation up to 48 hours prior',
      'Custom dietary menus available on request',
    ],
  },
  {
    id: 'sunset',
    title: 'Sunset & Dusk Wilderness Drive',
    shortTitle: 'Sunset Drive',
    ctaLabel: 'Reserve Sunset Drive',
    price: 140,
    badgeText: '4 Hours | Birding & Leopards',
    durationLabel: '4 Hours (Afternoon)',
    timeRange: '2:30 PM – 6:30 PM',
    defaultDeparture: '2:30 PM (Sunset & Dusk)',
    defaultTimeOption: 'Evening',
    vehicleLabel: 'Custom Open-Top 4x4',
    diningLabel: 'Chilled Sundowners & Cooler',
    guestsLabel: 'Up to 6 Guests',
    pickupLabel: 'Tissamaharama & Yala Pickup',
    sightingRate: '86% Sightings',
    heroDescription:
      'Golden-hour lagoon circuits targeting sloth bears emerging at dusk, painted storks, and leopards descending from palu branches.',
    highlights: [
      'Birdwatching & leopard sightings in golden dusk light',
      'Lagoon routes for sloth bears & painted storks',
      'Chilled sundowner refreshments by the coast',
    ],
    cardImage:
      'https://lh3.googleusercontent.com/aida/ALJJyrCCjCHdnT6D__c-slHVAXXAJdaca2QXv3yTZ_Ms7CWrfd2zEToSm1yf7fw7NN0tJlOkFjaNY1dovIK2eYhx2st6frqhi7wLMrvNwbgROXvRqBOrxumisSa7VB8YUlq1o64l4WMFBlPqze-MBWsDtvt1VmHXUc0I4A7YtqW6gIIThnOP5kDS0jMM1dzCLaSbazeiHt_f5P_y5_a7fiYx16eFwGEiCgr4yo66QgvZfLhQ1z8Gvvp0MUZ2tQw',
    cardImageAlt: 'Sri Lankan leopard silhouetted on a tree branch at dusk in Yala National Park',
    heroImage:
      'https://lh3.googleusercontent.com/aida/ALJJyrCCjCHdnT6D__c-slHVAXXAJdaca2QXv3yTZ_Ms7CWrfd2zEToSm1yf7fw7NN0tJlOkFjaNY1dovIK2eYhx2st6frqhi7wLMrvNwbgROXvRqBOrxumisSa7VB8YUlq1o64l4WMFBlPqze-MBWsDtvt1VmHXUc0I4A7YtqW6gIIThnOP5kDS0jMM1dzCLaSbazeiHt_f5P_y5_a7fiYx16eFwGEiCgr4yo66QgvZfLhQ1z8Gvvp0MUZ2tQw',
    heroImageAlt: 'Sri Lankan leopard silhouetted on a tree branch at dusk in Yala National Park',
    itinerary: [
      {
        time: '02:00 PM',
        title: 'Lodge Pickup & Gear Check',
        description:
          'Complimentary transfer from your Tissamaharama or Yala lodge with lens beanbags mounted before gate entry.',
      },
      {
        time: '02:30 PM',
        title: 'Lagoon & Wetland Birding Circuit',
        description:
          'Navigate Buttuwa and Banduwewa lagoons as painted storks, sea eagles, and mugger crocodiles gather.',
      },
      {
        time: '04:15 PM',
        title: 'Sloth Bear & Palu Canopy Search',
        description:
          'Explore fruiting palu glades and termite mounds as afternoon heat breaks and sloth bears begin foraging.',
      },
      {
        time: '05:30 PM',
        title: 'Coastal Sundowners & Dusk Predator Run',
        description:
          'Chilled refreshments overlooking Indian Ocean dunes followed by final dusk leopard tracking until gate close.',
      },
    ],
    included: [
      'Private custom 4x4 safari jeep & driver',
      'Certified senior wildlife tracker',
      'Chilled sundowner refreshments & towels',
      'Gimbal mounts, beanbags & binoculars',
    ],
    permitsAndNotes: [
      'National Park entry tickets paid at gate (~$42/guest)',
      'Free cancellation up to 48 hours prior',
      'Custom dietary menus available on request',
    ],
  },
];

export const WILDLIFE_SPECIES: WildlifeSpecies[] = [
  {
    id: 'leopard',
    scientificName: 'Panthera pardus kotiya',
    commonName: 'Sri Lankan Leopards',
    summary: 'Apex predators spotted across Block 1 rocky outcrops and sandy tracks.',
    gridSpanClass: 'md:col-span-5 md:row-span-2 min-h-[360px] md:min-h-0',
    titleClass: 'font-headline text-[28px] leading-[36px] font-semibold text-on-jungle-charcoal',
    image:
      'https://lh3.googleusercontent.com/aida/ALJJyrA_vF6ndtfFCrJ8vDWQfTmk5tOF90E-MknYSWfAcyL0vzCAcjAruVDj2OGEiaDg5BbPmns_6-L5NYzWHfu6TrKsdUuUo9MD3Rks1OhgqhLsx8NHUy0t_YF5cySBotUgiMkQVNEzE8CvChPuwIfGT3_cr9fhEDMcukq8_P63NWXdhXr_RdI8Y_pnPp3q_ZysMSudWKhAH3Br-mnt8YaWBtJt01jzOy5ChdpkpHO9EIWNEBJRYGWboCvNLMt-v5d7q9S1',
    imageAlt: 'Sri Lankan leopard peering through tall golden savanna grass in Yala',
    preferredZones: 'Patanangala, Suduweligala & Block 5 Riverine Forest',
    peakHours: '5:45 AM – 8:30 AM & 4:30 PM – 6:15 PM',
    fieldDispatch:
      'Yala Block 1 supports one of the highest leopard densities on Earth. Without larger predators like tigers or lions, Sri Lankan leopards roam boldly along open sandy tracks and granite boulders.',
    recommendedPackageId: 'full-day',
  },
  {
    id: 'elephant',
    scientificName: 'Elephas maximus maximus',
    commonName: 'Asian Elephants',
    summary: 'Matriarchal herds and solitary tuskers crossing coastal lagoons.',
    gridSpanClass: 'md:col-span-7 md:row-span-1 min-h-[260px] md:min-h-0',
    titleClass: 'font-title text-[20px] leading-[28px] font-semibold text-on-jungle-charcoal',
    image:
      'https://lh3.googleusercontent.com/aida/ALJJyrBVIh3H_IP_tcErapWWyO4nhheczaU1ROKpMvvl7LdJBkMe9BRKRuEZVvK_jhEXbu-EYPBiRzX-EvCy5KrTI4RoIqwV0HfwTRePUfXTh_I51JSdafvnapTnaGlDE18cXQ4tjB6UcBKSMQ-T7rCScWBeeJzgWe_ues1EoA2uZZu9sqbi7nJlzZrp80AbfB_VVcUFkITYTY9AVApt6IdkK7onB5_eMUE13Tkcn44npnsRzXs4zjABWxOX9UsGWZw_kz4R9w',
    imageAlt: 'Sri Lankan Asian elephant herd crossing a golden lagoon in Yala National Park',
    preferredZones: 'Buttuwa Tank, Menik Ganga & Block 5 Grasslands',
    peakHours: '11:30 AM – 4:00 PM at permanent waterholes',
    fieldDispatch:
      'Our trackers maintain strict quiet-idle distances while herds bathe and dust-bathe along Yala’s coastal tanks, giving photographers eye-level reflections across still lagoon water.',
    recommendedPackageId: 'full-day',
  },
  {
    id: 'sloth-bear',
    scientificName: 'Melursus ursinus inornatus',
    commonName: 'Sloth Bears',
    summary: 'Endemic Sri Lankan sloth bears foraging in dry-zone scrubland.',
    gridSpanClass: 'md:col-span-4 md:row-span-1 min-h-[260px] md:min-h-0',
    titleClass: 'font-title text-[20px] leading-[28px] font-semibold text-on-jungle-charcoal',
    image:
      'https://lh3.googleusercontent.com/aida/ALJJyrAMgAUDbtE0MnILE2SmqUcRHqxE_JJBG5Wr_XPkMAXjFTRJNrw8-P75Gboh-w7h7e8xIVVpW5tMUVAEwKU17a_2jpjMjrdx07upHwRN38D7DkXO81JBgZqTAQnQ_w7h8LFc85NqGoUkCckpacCj_OZSx4D-XRe7zwNXrplsEh4CcsCeSkeXGQG9Q6dvDlvPiutr6RM8kYdYUVagLaG1EIXuOt7Cu6GK69ZnLZA9YKWiXcq6O94lkfL9HCSPKRRD',
    imageAlt: 'Sri Lankan sloth bear foraging near a rocky forest outcrop in Yala',
    preferredZones: 'Palu Tree Glades & Interior Scrub Trails',
    peakHours: '6:00 AM – 8:00 AM & 4:45 PM – 6:15 PM (Peak May–July)',
    fieldDispatch:
      'Highly elusive outside the palu fruiting season, sloth bears are tracked quietly by scent trails around termite mounds and shaded dry-forest clearings.',
    recommendedPackageId: 'sunset',
  },
  {
    id: 'birds',
    scientificName: '215+ Avian Species',
    commonName: 'Exotic Birds',
    summary: 'Painted storks, black-necked storks, bee-eaters, and Sri Lanka junglefowl.',
    gridSpanClass: 'md:col-span-3 md:row-span-1 min-h-[260px] md:min-h-0',
    titleClass: 'font-title text-[20px] leading-[28px] font-semibold text-on-jungle-charcoal',
    image:
      'https://lh3.googleusercontent.com/aida/ALJJyrA0wQEoqNy1AjL0l_0h76wSk_5RB7wwFXWqlV3E5XUMjkgQhfHOgJTM5nWGLInPAr2V-0VY6b0-bSL-qHrvkOurm61iM2jgGvRDYGZyzgKuhDUF24BL58oX7qPDJZ6UR6kjKuZi5jpq4svF9csRxFWNpbBXM42oNcosJQfzDHeqdY-Tb_d_Urlu2GWF7GKdHY_V26iNq8xvc_cCuQJ-hycNxxg-dRBHyNZ3-ElLamLC555O-15wVlZdPTL2hnc6xQ',
    imageAlt: 'Painted stork and Sri Lankan peacock perched near a wetland in Yala',
    preferredZones: 'Palatupana Salt Pans & Kumana Border Wetlands',
    peakHours: '5:30 AM – 9:00 AM & 3:30 PM – 6:00 PM',
    fieldDispatch:
      'Over 215 resident and migratory species thrive across Yala’s brackish lagoons and thorn scrub, from Crested Serpent Eagles to the rare Black-necked Stork.',
    recommendedPackageId: 'morning',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'vance',
    quote:
      '"Our tracker read fresh pugmarks near Patanangala within twenty minutes of sunrise. Watching a male leopard descend from a palu tree in total silence was unforgettable."',
    author: 'Clara & Oliver Vance',
    country: 'United Kingdom',
    packageName: 'Full-Day Tracker',
  },
  {
    id: 'meier',
    quote:
      '"As a wildlife photographer, the custom gimbal mount and beanbag rail on the jeep made all the difference. We captured two leopards and a sloth bear without crowds."',
    author: 'Lukas Meier',
    country: 'Switzerland',
    packageName: 'Morning Safari',
  },
  {
    id: 'reid',
    quote:
      '"Seamless pickup from our Tissamaharama lodge at 5 AM, chilled towels, and genuine respect for the animals. Easily the highlight of our three weeks in Sri Lanka."',
    author: 'Hannah & Liam Reid',
    country: 'Australia',
    packageName: 'Sunset Drive',
  },
];
