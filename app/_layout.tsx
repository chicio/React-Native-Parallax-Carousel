import {ParallaxCarousel} from "@/parallax-carousel/parallax-carousel";
const items = [
  {
    id: '1',
    image: 'https://static.vecteezy.com/system/resources/previews/012/201/404/non_2x/beautiful-landscape-of-green-tea-plantation-in-the-morning-with-foreground-orange-flowers-2000-tea-plantation-doi-angkhang-mountain-chiangmai-thailand-free-photo.jpg',
    title: 'Morning Serenity',
    description: 'Golden sunlight dances over a lush tea plantation, framed by vibrant orange flowers in the foreground.'
  },
  {
    id: '2',
    image: 'https://d3n8a8pro7vhmx.cloudfront.net/backcountryhunters/pages/10800/attachments/original/1640022886/Arizona_Lake_Mead_National_Recreation_Area_00003.jpg',
    title: 'Desert Oasis',
    description: 'A serene desert lake reflecting the warm hues of the surrounding canyon, an invitation to escape.'
  },
  {
    id: '3',
    image: 'https://kenkoimagingusa.com/cdn/shop/articles/Simple_Landscape_Photography_Tips_With_Tons_of_Impact.jpg?v=1566068838&width=1920',
    title: 'Mountain Majesty',
    description: 'Towering peaks covered in a light mist, standing strong against the backdrop of an endless sky.'
  },
];

export default function RootLayout() {
  return <ParallaxCarousel items={items} />;
}
