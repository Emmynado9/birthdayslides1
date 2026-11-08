export interface PhotoItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  date?: string;
  constellationGroup: 'Golden Dawn' | 'Radiant Joy' | 'Adventures' | 'Starlight Era';
  doodleType: 'star-trail' | 'heart-loop' | 'crown-sparkle' | 'spiral-wave';
}

export interface WishItem {
  id: string;
  title: string;
  message: string;
  planetColor: string;
  orbitRadius: number;
  icon: 'sparkles' | 'heart' | 'compass' | 'sun' | 'crown';
}

export interface BirthdayContent {
  friendName: string;
  birthdayDate: string;
  birthdayIsoDate: string;
  senderName: string;
  titleHeadline: string;
  titleSubtext: string;
  finalMessage: string;
  musicSrc: string;
  publicUrl: string;
  localMobileUrl: string;
  starBubbleMessages: string[];
  photos: PhotoItem[];
  wishes: WishItem[];
}

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const birthdayData: BirthdayContent = {
  friendName: 'Dawa',
  birthdayDate: '9th of November',
  birthdayIsoDate: '2026-11-09',
  senderName: 'Your Friends & Inner Circle',
  titleHeadline: 'Happy Birthday, Dawa!',
  titleSubtext:
    'Celebrating you on the 9th of November — welcome to your mobile-first Birthday Storybook & Photo Universe with flying star bubbles, hand-drawn doodles, and 28 unforgettable memories.',
  finalMessage:
    "Happy 9th of November, Dawa! Here's to another year of unforgettable adventures, late-night laughs, and dreams coming true. Every star in this universe shines a little brighter because of your warmth, kindness, and unmistakable energy. Wishing you the happiest birthday on the 9th of November and beyond!",
  musicSrc: `${BASE_PATH}/audio/music.mp3`,
  publicUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    'https://emmynado9.github.io/birthdayslides1',
  localMobileUrl: 'https://emmynado9.github.io/birthdayslides1/',
  starBubbleMessages: [
    '✨ Pure main-character energy, Dawa!',
    '🌟 Another wish floating your way!',
    '💖 Keep shining brighter than the constellations!',
    '🎉 Unstoppable joy unlocked!',
    '🫧 Cosmic birthday magic for Dawa!',
    '👑 Queen of unforgettable moments!',
    '🌈 Here is to laughter that never fades!',
    '💫 Every star bubble holds a celebration for you!'
  ],
  photos: [
    {
      id: 'photo-01',
      src: `${BASE_PATH}/photos/01.webp`,
      alt: 'Dawa radiant portrait memory 1',
      caption: 'Where our cosmic storybook begins — that effortless glow that lights up every room!',
      date: 'Chapter I · Starlight',
      constellationGroup: 'Golden Dawn',
      doodleType: 'crown-sparkle',
    },
    {
      id: 'photo-02',
      src: `${BASE_PATH}/photos/02.webp`,
      alt: 'Dawa smiling brightly in portrait 2',
      caption: 'A smile that turns an ordinary day into a celebration worth remembering.',
      date: 'Chapter I · Golden Hour',
      constellationGroup: 'Golden Dawn',
      doodleType: 'star-trail',
    },
    {
      id: 'photo-03',
      src: `${BASE_PATH}/photos/03.webp`,
      alt: 'Dawa November 2021 cherished snapshot',
      caption: 'November vibes & warm energy — always bringing the best spirit everywhere you go.',
      date: 'Nov 2021',
      constellationGroup: 'Golden Dawn',
      doodleType: 'heart-loop',
    },
    {
      id: 'photo-04',
      src: `${BASE_PATH}/photos/04.webp`,
      alt: 'Dawa April 2022 joyful moment',
      caption: 'Springtime radiance and that signature poise nobody else can match.',
      date: 'Apr 2022',
      constellationGroup: 'Golden Dawn',
      doodleType: 'spiral-wave',
    },
    {
      id: 'photo-05',
      src: `${BASE_PATH}/photos/05.webp`,
      alt: 'Dawa August 2022 sunny memory',
      caption: 'August sunshine couldn’t even compete with the brightness you bring.',
      date: 'Aug 2022',
      constellationGroup: 'Golden Dawn',
      doodleType: 'crown-sparkle',
    },
    {
      id: 'photo-06',
      src: `${BASE_PATH}/photos/06.webp`,
      alt: 'Dawa January 2023 stylish moment',
      caption: 'Stepping into a fresh chapter with confidence, grace, and pure joy.',
      date: 'Jan 2023',
      constellationGroup: 'Golden Dawn',
      doodleType: 'star-trail',
    },
    {
      id: 'photo-07',
      src: `${BASE_PATH}/photos/07.webp`,
      alt: 'Dawa January 2023 candid smile',
      caption: 'Candid moments with you always become the most treasured keepsakes.',
      date: 'Jan 2023',
      constellationGroup: 'Golden Dawn',
      doodleType: 'heart-loop',
    },
    {
      id: 'photo-08',
      src: `${BASE_PATH}/photos/08.webp`,
      alt: 'Dawa late January 2023 glowing snapshot',
      caption: 'Every angle, every laugh — a whole constellation of good vibes.',
      date: 'Jan 2023',
      constellationGroup: 'Radiant Joy',
      doodleType: 'spiral-wave',
    },
    {
      id: 'photo-09',
      src: `${BASE_PATH}/photos/09.webp`,
      alt: 'Dawa vibrant look in January 2023',
      caption: 'Vibrant, fearless, and wonderfully authentic in every single season.',
      date: 'Jan 2023',
      constellationGroup: 'Radiant Joy',
      doodleType: 'crown-sparkle',
    },
    {
      id: 'photo-10',
      src: `${BASE_PATH}/photos/10.webp`,
      alt: 'Dawa radiant afternoon memory',
      caption: 'Proof that happiness looks best when shared with a heart like yours.',
      date: 'Jan 2023',
      constellationGroup: 'Radiant Joy',
      doodleType: 'star-trail',
    },
    {
      id: 'photo-11',
      src: `${BASE_PATH}/photos/11.webp`,
      alt: 'Dawa May 2023 adventure snapshot',
      caption: 'May days filled with daydreaming, laughter, and unforgettable stories.',
      date: 'May 2023',
      constellationGroup: 'Radiant Joy',
      doodleType: 'heart-loop',
    },
    {
      id: 'photo-12',
      src: `${BASE_PATH}/photos/12.webp`,
      alt: 'Dawa November 2019 evening throwback',
      caption: 'Throwback to November 2019 — timeless memories that only grow sweeter with time!',
      date: 'Nov 2019',
      constellationGroup: 'Radiant Joy',
      doodleType: 'spiral-wave',
    },
    {
      id: 'photo-13',
      src: `${BASE_PATH}/photos/13.webp`,
      alt: 'Dawa November 2019 second snapshot',
      caption: 'Another gem from that unforgettable evening — pure warmth and genuine smiles.',
      date: 'Nov 2019',
      constellationGroup: 'Radiant Joy',
      doodleType: 'crown-sparkle',
    },
    {
      id: 'photo-14',
      src: `${BASE_PATH}/photos/14.webp`,
      alt: 'Dawa November 2019 classic portrait',
      caption: 'From then until now, your kindness has remained a constant north star.',
      date: 'Nov 2019',
      constellationGroup: 'Radiant Joy',
      doodleType: 'star-trail',
    },
    {
      id: 'photo-15',
      src: `${BASE_PATH}/photos/15.webp`,
      alt: 'Dawa October 2021 golden evening',
      caption: 'October twilight magic — calm, radiant, and full of grace.',
      date: 'Oct 2021',
      constellationGroup: 'Adventures',
      doodleType: 'heart-loop',
    },
    {
      id: 'photo-16',
      src: `${BASE_PATH}/photos/16.webp`,
      alt: 'Dawa April 2022 night out memory',
      caption: 'Late-night smiles and stories that we still talk about with a grin.',
      date: 'Apr 2022',
      constellationGroup: 'Adventures',
      doodleType: 'spiral-wave',
    },
    {
      id: 'photo-17',
      src: `${BASE_PATH}/photos/17.webp`,
      alt: 'Dawa December 2022 holiday glow',
      caption: 'Holiday season magic wrapped up in one unforgettable snapshot.',
      date: 'Dec 2022',
      constellationGroup: 'Adventures',
      doodleType: 'crown-sparkle',
    },
    {
      id: 'photo-18',
      src: `${BASE_PATH}/photos/18.webp`,
      alt: 'Dawa end of year 2022 celebration',
      caption: 'Closing out the year with sparkle, gratitude, and the brightest spirit.',
      date: 'Dec 2022',
      constellationGroup: 'Adventures',
      doodleType: 'star-trail',
    },
    {
      id: 'photo-19',
      src: `${BASE_PATH}/photos/19.webp`,
      alt: 'Dawa January 2023 evening portrait',
      caption: 'Shining through the night like the brightest star in the galaxy.',
      date: 'Jan 2023',
      constellationGroup: 'Adventures',
      doodleType: 'heart-loop',
    },
    {
      id: 'photo-20',
      src: `${BASE_PATH}/photos/20.webp`,
      alt: 'Dawa high-resolution portrait in January 2023',
      caption: 'Iconic, poised, and completely unforgettable — a true masterpiece memory.',
      date: 'Jan 2023',
      constellationGroup: 'Adventures',
      doodleType: 'crown-sparkle',
    },
    {
      id: 'photo-21',
      src: `${BASE_PATH}/photos/21.webp`,
      alt: 'Dawa February 2023 sunlit portrait',
      caption: 'Midday sunshine meeting a heart of pure gold.',
      date: 'Feb 2023',
      constellationGroup: 'Adventures',
      doodleType: 'spiral-wave',
    },
    {
      id: 'photo-22',
      src: `${BASE_PATH}/photos/22.webp`,
      alt: 'Dawa December 2022 captured moment',
      caption: 'The kind of screenshot you keep forever because the vibe is simply unmatched.',
      date: 'Dec 2022',
      constellationGroup: 'Starlight Era',
      doodleType: 'star-trail',
    },
    {
      id: 'photo-23',
      src: `${BASE_PATH}/photos/23.webp`,
      alt: 'Dawa artistic portrait memory 23',
      caption: 'Grace in every detail and joy in every step of the journey.',
      date: 'Starlight Era',
      constellationGroup: 'Starlight Era',
      doodleType: 'heart-loop',
    },
    {
      id: 'photo-24',
      src: `${BASE_PATH}/photos/24.webp`,
      alt: 'Dawa joyful portrait memory 24',
      caption: 'Never stop dreaming big — the whole universe is cheering you on!',
      date: 'Starlight Era',
      constellationGroup: 'Starlight Era',
      doodleType: 'crown-sparkle',
    },
    {
      id: 'photo-25',
      src: `${BASE_PATH}/photos/25.webp`,
      alt: 'Dawa September 2023 radiant moment',
      caption: 'Captured in full bloom — radiating confidence, warmth, and happiness.',
      date: 'Sep 2023',
      constellationGroup: 'Starlight Era',
      doodleType: 'spiral-wave',
    },
    {
      id: 'photo-26',
      src: `${BASE_PATH}/photos/26.webp`,
      alt: 'Dawa treasured memory 26',
      caption: 'For all the times you lifted everyone around you just by being yourself.',
      date: 'Starlight Era',
      constellationGroup: 'Starlight Era',
      doodleType: 'star-trail',
    },
    {
      id: 'photo-27',
      src: `${BASE_PATH}/photos/27.webp`,
      alt: 'Dawa cherished portrait 27',
      caption: 'So many chapters written in laughter, and the best ones are still ahead.',
      date: 'Starlight Era',
      constellationGroup: 'Starlight Era',
      doodleType: 'heart-loop',
    },
    {
      id: 'photo-28',
      src: `${BASE_PATH}/photos/28.webp`,
      alt: 'Dawa grand finale portrait 28',
      caption: 'Here’s to you, Dawa — may your new year be as extraordinary as you are!',
      date: 'Birthday Finale',
      constellationGroup: 'Starlight Era',
      doodleType: 'crown-sparkle',
    },
  ],
  wishes: [
    {
      id: 'wish-1',
      title: 'Endless Joy & Laughter',
      message: 'May your days be filled with spontaneous laughter, warm sunshine, and the kind of happiness that makes your cheeks hurt from smiling.',
      planetColor: 'from-rose-400 via-pink-500 to-amber-300',
      orbitRadius: 1,
      icon: 'sparkles',
    },
    {
      id: 'wish-2',
      title: 'Bold New Adventures',
      message: 'Wishing you new places to explore, exciting horizons to chase, and magical memories waiting around every corner this year.',
      planetColor: 'from-amber-300 via-orange-400 to-rose-400',
      orbitRadius: 2,
      icon: 'compass',
    },
    {
      id: 'wish-3',
      title: 'Peace, Health & Radiance',
      message: 'May you always find calm in the chaos, strength in every challenge, and deep peace in knowing how deeply loved and appreciated you are.',
      planetColor: 'from-violet-400 via-fuchsia-400 to-pink-400',
      orbitRadius: 3,
      icon: 'heart',
    },
    {
      id: 'wish-4',
      title: 'Dreams Taking Flight',
      message: 'Whatever big goals and quiet wishes you hold in your heart right now — may every single one of them blossom into reality.',
      planetColor: 'from-cyan-300 via-sky-400 to-indigo-400',
      orbitRadius: 4,
      icon: 'sun',
    },
    {
      id: 'wish-5',
      title: 'Unforgettable Magic',
      message: 'Never lose your spark, your warmth, or your wonderful way of making everyone feel special. Have the most magical birthday, Dawa!',
      planetColor: 'from-yellow-300 via-amber-400 to-pink-500',
      orbitRadius: 5,
      icon: 'crown',
    },
  ],
};

