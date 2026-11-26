import heroLeopardRock from '../assets/images/hero_leopard_rock_1795648620213.jpg';
import pkgMorningLeopard from '../assets/images/pkg_morning_leopard_1795648621139.jpg';
import pkgFulldayJeep from '../assets/images/pkg_fullday_jeep_1795648621643.jpg';
import pkgSunsetDusk from '../assets/images/pkg_sunset_dusk_1795648621646.jpg';
import jeepCollageMain from '../assets/images/jeep_collage_main_1795648622355.jpg';
import jeepCollageGear from '../assets/images/jeep_collage_gear_1795648622612.jpg';
import wildlifeLeopardBento from '../assets/images/wildlife_leopard_bento_1795648624004.jpg';
import wildlifeElephantBento from '../assets/images/wildlife_elephant_bento_1795648624046.jpg';
import wildlifeSlothBear from '../assets/images/wildlife_sloth_bear_1795648624526.jpg';
import wildlifeExoticBirds from '../assets/images/wildlife_exotic_birds_1795648624883.jpg';

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

export const OWNER_WHATSAPP_NUMBER = '94740361590';
export const OWNER_WHATSAPP_DISPLAY = '074 036 1590';

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export interface HeroSlide {
  src: string;
  alt: string;
  objectPositionClass: string;
}

export const HERO_IMAGE = heroLeopardRock;

export const HERO_SLIDES: HeroSlide[] = [
  {
    src: heroLeopardRock,
    alt: 'Sri Lankan leopard resting on a granite boulder in golden hour light at Yala National Park',
    objectPositionClass: 'object-center',
  },
  {
    src: '/assets/aistudio/images_10ff21aa.jpeg',
    alt: 'Sri Lankan leopard resting across a mossy fallen branch in Yala National Park',
    objectPositionClass: 'object-center',
  },
  {
    src: '/assets/aistudio/images-3_396de6bf.jpeg',
    alt: 'Close-up portrait of a wild Sri Lankan leopard gazing through Yala bushland',
    objectPositionClass: 'object-[center_24%]',
  },
];

export const JEEP_COLLAGE_MAIN_IMAGE = jeepCollageMain;

export const JEEP_COLLAGE_GEAR_IMAGE = jeepCollageGear;

export const MODAL_BACKDROP_IMAGE = pkgFulldayJeep;

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
    cardImage: pkgMorningLeopard,
    cardImageAlt: 'Sri Lankan leopard walking along a sunlit jungle track at dawn in Yala',
    heroImage: pkgMorningLeopard,
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
    cardImage: pkgFulldayJeep,
    cardImageAlt: 'Custom open-top 4x4 safari jeep overlooking a tranquil Yala waterhole',
    heroImage: pkgFulldayJeep,
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
    cardImage: pkgSunsetDusk,
    cardImageAlt: 'Sri Lankan leopard silhouetted on a tree branch at dusk in Yala National Park',
    heroImage: pkgSunsetDusk,
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
    image: wildlifeLeopardBento,
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
    image: wildlifeElephantBento,
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
    image: wildlifeSlothBear,
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
    image: wildlifeExoticBirds,
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
