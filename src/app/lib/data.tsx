import product1 from '@assets/product-1.png';
import product2 from '@assets/product-2.png';
import product3 from '@assets/product-3.png';
import product4 from '@assets/product-4.png';
import product5 from '@assets/product-5.png';
import product6 from '@assets/product-6.png';
import product7 from '@assets/product-7.png';
import product8 from '@assets/product-8.png';
import product9 from '@assets/product-9.png';
import product10 from '@assets/product-10.png';
import product11 from '@assets/product-11.png';
import product12 from '@assets/product-12.png';
import product13 from '@assets/product-13.png';
import product14 from '@assets/product-14.png';
import {
  MessageCircle,
  Mail,
  Phone,
  CreditCard,
  Package,
  Shield,
  Heart,
  Zap,
  Users,
  Target,
} from 'lucide-react';
import { ShieldCheck, Truck, Headphones } from 'lucide-react';

export const categories = [
  {
    title: 'CPU',
    href: '/category/cpu',
    description: 'Explore high-performance processors from AMD and Intel.',
  },
  {
    title: 'GPU',
    href: '/category/gpu',
    description: 'Graphics cards for gaming, AI, and rendering.',
  },
  {
    title: 'Motherboards',
    href: '/category/motherboards',
    description: 'Find the perfect board for your build.',
  },
  {
    title: 'RAM',
    href: '/category/ram',
    description: 'Memory modules for speed and multitasking.',
  },
  {
    title: 'Storage',
    href: '/category/storage',
    description: 'Fast SSDs and high-capacity HDDs.',
  },
  {
    title: 'Power Supplies',
    href: '/category/psu',
    description: 'Reliable PSUs for stable power delivery.',
  },
];

export const bestSellingProducts = [
  {
    id: 1,
    title: 'NVIDIA GeForce RTX 4090',
    category: 'GPU',
    price: 2199.99,
    rating: 5,
    image: product1,
  },
  {
    id: 2,
    title: 'MSI RTX 4080 SUPRIM X',
    category: 'GPU',
    price: 1399.99,
    rating: 4.8,
    image: product2,
  },
  {
    id: 3,
    title: 'Intel Core i9-14900K',
    category: 'CPU',
    price: 629.99,
    rating: 4.9,
    image: product3,
  },
  {
    id: 4,
    title: 'AMD Ryzen 9 7950X3D',
    category: 'CPU',
    price: 699.99,
    rating: 4.7,
    image: product4,
  },
  {
    id: 5,
    title: 'ASUS ROG Maximus Z790 Hero',
    category: 'Motherboard',
    price: 599.99,
    rating: 4.9,
    image: product5,
  },
  {
    id: 6,
    title: 'MSI MEG X670E ACE',
    category: 'Motherboard',
    price: 549.99,
    rating: 4.8,
    image: product6,
  },
  {
    id: 7,
    title: 'G.SKILL Trident Z5 RGB 64GB DDR5-6000',
    category: 'RAM',
    price: 349.99,
    rating: 4.9,
    image: product7,
  },
  {
    id: 8,
    title: 'Corsair Dominator Platinum RGB 64GB',
    category: 'RAM',
    price: 329.99,
    rating: 4.8,
    image: product8,
  },
  {
    id: 9,
    title: 'Lian Li PC-O11 Dynamic EVO',
    category: 'Case',
    price: 189.99,
    rating: 4.7,
    image: product9,
  },
  {
    id: 10,
    title: 'NZXT H9 Elite Mid Tower',
    category: 'Case',
    price: 249.99,
    rating: 4.8,
    image: product10,
  },
];

export const whyChooseUs = [
  {
    id: 1,
    icon: (
      <ShieldCheck
        size={50}
        className="p-3 bg-white hover:bg-purple-500 hover:text-white transition-colors duration-300 text-black rounded-full"
      />
    ),
    title: '100% Secure Shopping',
    description: 'We use end-to-end encryption and trusted payment gateways.',
  },
  {
    id: 2,
    icon: (
      <Truck
        size={50}
        className="p-3 bg-white hover:bg-purple-500 hover:text-white transition-colors duration-300 text-black rounded-full"
      />
    ),
    title: 'Fast & Free Delivery',
    description:
      'Enjoy quick and free shipping on all orders above $200 across the country.',
  },
  {
    id: 3,
    icon: (
      <Headphones
        size={50}
        className="p-3 bg-white hover:bg-purple-500 hover:text-white transition-colors duration-300 text-black rounded-full"
      />
    ),
    title: '24/7 Customer Support',
    description:
      'Our expert support team is here for you day and night — whenever you need help.',
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'John Smith',
    role: 'CEO, Agency',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    testimonial:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet vero aliquid alias nisi totam, ullam consequatur ex quis fugiat dolorum officia mollitia amet ab ratione recusandae distinctio eum laborum animi facere porro adipisci cupiditate, deleniti inventore? Totam velit at reprehenderit cupiditate doloribus, harum laboriosam alias, explicabo aperiam aliquam aut quae.',
  },
  {
    id: 2,
    name: 'Emily Davis',
    role: 'Marketing Director, TechWave',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    testimonial:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet vero aliquid alias nisi totam, ullam consequatur ex quis fugiat dolorum officia mollitia amet ab ratione recusandae distinctio eum laborum animi facere porro adipisci cupiditate, deleniti inventore? Totam velit at reprehenderit cupiditate doloribus, harum laboriosam alias, explicabo aperiam aliquam aut quae.',
  },
  {
    id: 3,
    name: 'Michael Lee',
    role: 'CTO, Nova Solutions',
    image: 'https://randomuser.me/api/portraits/men/47.jpg',
    testimonial:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet vero aliquid alias nisi totam, ullam consequatur ex quis fugiat dolorum officia mollitia amet ab ratione recusandae distinctio eum laborum animi facere porro adipisci cupiditate, deleniti inventore? Totam velit at reprehenderit cupiditate doloribus, harum laboriosam alias, explicabo aperiam aliquam aut quae.',
  },
];

export const singleProduct = [
  {
    id: 2,
    title: 'MSI RTX 4080 SUPRIM X',
    category: 'GPU',
    price: 1399.99,
    rating: 4.8,
    image: product2,
    reviews: [
      {
        id: 1,
        author: 'Hazem M.',
        rating: 5,
        comment:
          'Absolutely amazing performance! Handles 4K gaming like a beast.',
        date: '2025-06-20',
      },
      {
        id: 2,
        author: 'Sarah A.',
        rating: 4,
        comment: 'Very powerful GPU, but the fan is a bit noisy under load.',
        date: '2025-06-18',
      },
      {
        id: 3,
        author: 'Omar S.',
        rating: 5,
        comment:
          'Upgraded from a 3080 — the difference is massive. Worth every Riyal.',
        date: '2025-06-15',
      },
    ],
  },
];

export const cartItems = [
  {
    id: 1,
    title: 'NVIDIA GeForce RTX 4090',
    category: 'GPU',
    price: 2199.99,
    rating: 5,
    image: product1,
  },
  {
    id: 2,
    title: 'MSI RTX 4080 SUPRIM X',
    category: 'GPU',
    price: 1399.99,
    rating: 4.8,
    image: product2,
  },
  {
    id: 3,
    title: 'Intel Core i9-14900K',
    category: 'CPU',
    price: 629.99,
    rating: 4.9,
    image: product3,
  },
];

export const products = [
  {
    id: 1,
    title: 'Intel Core i9-14900K',
    category: 'cpu',
    price: 629.99,
    image: product3,
  },
  {
    id: 2,
    title: 'NVIDIA GeForce RTX 4090',
    category: 'gpu',
    price: 2199.99,
    image: product1,
  },
  {
    id: 6,
    title: 'NVIDIA GeForce RTX 4090',
    category: 'gpu',
    price: 2199.99,
    image: product1,
  },
  {
    id: 5,
    title: 'NVIDIA GeForce RTX 4090',
    category: 'gpu',
    price: 2199.99,
    image: product1,
  },
  {
    id: 3,
    title: 'Corsair Dominator Platinum RGB 64GB',
    category: 'ram',
    price: 329.99,
    image: product8,
  },
  {
    id: 11,
    title: 'ASUS ROG Thor 1000W Platinum II Power Supply',
    category: 'PSU',
    price: 439.39,
    rating: 4.8,
    image: product11,
  },
  {
    id: 12,
    title: 'Cooler Master MWE ATX 80 Plus Bronze Power Supply (750W)',
    category: 'PSU',
    price: 106.65,
    rating: 4.8,
    image: product12,
  },
  {
    id: 13,
    title: 'Samsung 9100 PRO 1TB PCIe 5.0 NVMe M.2 SSD',
    category: 'Storage',
    price: 189.2,
    rating: 4.8,
    image: product13,
  },
  {
    id: 14,
    title: 'NVME NV2 Kingston 1TB M.2 PCIe 4.0 3500MB',
    category: 'Storage',
    price: 93.32,
    rating: 4.8,
    image: product14,
  },
];

export const brands = [
  { id: 1, brand: 'Asus' },
  { id: 2, brand: 'MSI' },
  { id: 3, brand: 'Gigabyte' },
  { id: 4, brand: 'Corsair' },
  { id: 5, brand: 'Nvidia' },
];

export const productThumbnails = [
  product1,
  product2,
  product3,
  product4,
];

export const shopOwnerInfo = {
  name: 'TechMaster Electronics',
  ownerName: 'John Smith',
  location: '1234 Tech Avenue, Silicon Valley, CA 94025',
  email: 'contact@techmaster.com',
  phone: '+1 (555) 123-4567',
};



export const sponsoredStores = [
  {
    id: 1,
    title: 'Prebuilt Gaming PCs',
    description: 'We offers ready-to-ship gaming PCs with warranty and support. Get yours, start gaming, and enjoy instantly!',
    image: '/src/assets/image1.webp',
    bgColor: '#EA1D1F',
    textColor: 'white',
  },
  {
    id: 2,
    title: 'Custom Gaming PCs',
    description: 'customize your PC with top brands like Intel, AMD, and ASUS, with no compatibility worries. What\'s best is that we\'ll build it for you!',
    image: '/src/assets/image2.webp',
    bgColor: '#F3FBE8',
    textColor: 'black',
  },
  {
    id: 3,
    title: 'High-End Workstations',
    description: 'Professional workstations designed for content creators, 3D artists, and developers. Maximum performance guaranteed!',
    image: '/src/assets/image1.webp',
    bgColor: '#1E40AF',
    textColor: 'white',
  },
  {
    id: 4,
    title: 'Gaming Laptops',
    description: 'Powerful gaming laptops with the latest GPUs and CPUs. Play anywhere, anytime with uncompromised performance!',
    image: '/src/assets/image2.webp',
    bgColor: '#059669',
    textColor: 'white',
  },
  {
    id: 5,
    title: 'RGB Gaming Setup',
    description: 'Complete RGB gaming setup with peripherals, monitors, and accessories. Level up your gaming experience!',
    image: '/src/assets/image1.webp',
    bgColor: '#7C3AED',
    textColor: 'white',
  },
];

// Algerian Wilayas
export const wilayas = [
  'Adrar',
  'Chlef',
  'Laghouat',
  'Oum El Bouaghi',
  'Batna',
  'Béjaïa',
  'Biskra',
  'Béchar',
  'Blida',
  'Bouira',
  'Tamanrasset',
  'Tébessa',
  'Tlemcen',
  'Tiaret',
  'Tizi Ouzou',
  'Algiers',
  'Djelfa',
  'Jijel',
  'Sétif',
  'Saïda',
  'Skikda',
  'Sidi Bel Abbès',
  'Annaba',
  'Guelma',
  'Constantine',
  'Médéa',
  'Mostaganem',
  'MSila',
  'Mascara',
  'Ouargla',
  'Oran',
  'El Bayadh',
  'Illizi',
  'Bordj Bou Arréridj',
  'Boumerdès',
  'El Tarf',
  'Tindouf',
  'Tissemsilt',
  'El Oued',
  'Khenchela',
  'Souk Ahras',
  'Tipaza',
  'Mila',
  'Aïn Defla',
  'Naâma',
  'Aïn Témouchent',
  'Ghardaïa',
  'Relizane',
];

// Shipping Options
export const shippingOptions = [
  {
    id: 'standard',
    name: 'Standard Delivery',
    time: '5-7 business days',
    price: 0,
  },
  {
    id: 'express',
    name: 'Express Delivery',
    time: '2-3 business days',
    price: 500,
  },
  {
    id: 'nextDay',
    name: 'Next Day Delivery',
    time: '24 hours',
    price: 1000,
  },
];



 // FAQ data
  export const faqData = {
    general: [
      {
        question: 'How do I create an account?',
        answer:
          'Click the "Sign Up" button in the top right corner, fill in your details, and verify your email address. Your account will be ready to use immediately after verification.',
      },
      {
        question: 'How do I track my order?',
        answer:
          'Once your order ships, you\'ll receive a tracking number via email. You can also view all your orders and their status in your account dashboard under "My Orders".',
      },
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers for larger orders.',
      },
      {
        question: 'Can I cancel or modify my order?',
        answer:
          'You can cancel or modify your order within 2 hours of placing it. Go to "My Orders," select the order, and click "Cancel" or "Modify." After this window, please contact support.',
      },
    ],
    shipping: [
      {
        question: 'What are your shipping options?',
        answer:
          'We offer Standard Shipping (5-7 business days), Express Shipping (2-3 business days), and Next-Day Delivery (order before 2 PM). Shipping costs vary by location and weight.',
      },
      {
        question: 'Do you ship internationally?',
        answer:
          'Yes, we ship to over 50 countries worldwide. International shipping typically takes 7-14 business days. Customs fees may apply depending on your country.',
      },
      {
        question: 'My package is delayed. What should I do?',
        answer:
          'Check your tracking number first. If it shows no movement for 3+ days, contact our support team with your order number, and we\'ll investigate with the carrier immediately.',
      },
    ],
    returns: [
      {
        question: 'What is your return policy?',
        answer:
          'We offer a 30-day return policy for unused items in original packaging. Return shipping is free for defective items. For returns due to change of mind, a small restocking fee may apply.',
      },
      {
        question: 'How do I initiate a return?',
        answer:
          'Log into your account, go to "My Orders," select the item, and click "Request Return." Follow the instructions to print your return label and ship the item back.',
      },
      {
        question: 'When will I receive my refund?',
        answer:
          'Refunds are processed within 5-7 business days after we receive your return. The amount will be credited to your original payment method.',
      },
    ],
    account: [
      {
        question: 'How do I reset my password?',
        answer:
          'Click "Forgot Password" on the login page, enter your email, and follow the reset link sent to your inbox. The link expires in 1 hour for security.',
      },
      {
        question: 'How do I update my account information?',
        answer:
          'Go to your account settings, click "Edit Profile," and update your name, email, phone, or shipping address. Save changes to apply them.',
      },
      {
        question: 'Can I delete my account?',
        answer:
          'Yes, go to Account Settings > Privacy > Delete Account. Note that this action is permanent and will remove all your data, orders, and saved items.',
      },
    ],
  };

  // Popular topics
 export const popularTopics = [
    { icon: Package, title: 'Order Status', link: '/orders', color: 'text-blue-600' },
    { icon: CreditCard, title: 'Payment Issues', link: '#', color: 'text-green-600' },
    { icon: Truck, title: 'Shipping Info', link: '#', color: 'text-orange-600' },
    { icon: Shield, title: 'Security & Privacy', link: '#', color: 'text-purple-600' },
  ];

  // Contact options
 export const contactOptions = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team',
      availability: 'Available 24/7',
      action: 'Start Chat',
      color: 'bg-blue-50 dark:bg-blue-950 text-blue-600',
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'support@yourstore.com',
      availability: 'Response within 24h',
      action: 'Send Email',
      color: 'bg-green-50 dark:bg-green-950 text-green-600',
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: '+1 (555) 123-4567',
      availability: 'Mon-Fri, 9AM-6PM EST',
      action: 'Call Now',
      color: 'bg-orange-50 dark:bg-orange-950 text-orange-600',
    },
  ];

// About Page Data
// Company values
export const aboutValues = [
  {
    icon: Heart,
    title: 'Customer First',
    description:
      'Every decision we make starts with our customers. We listen, adapt, and deliver solutions that truly matter.',
    color: 'text-red-600 bg-red-50 dark:bg-red-950',
  },
  {
    icon: Zap,
    title: 'Innovation',
    description:
      'We embrace change and continuously push boundaries to create better shopping experiences.',
    color: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950',
  },
  {
    icon: Shield,
    title: 'Trust & Integrity',
    description:
      'Transparency and honesty guide our operations. We build lasting relationships through reliability.',
    color: 'text-blue-600 bg-blue-50 dark:bg-blue-950',
  },
  {
    icon: Users,
    title: 'Community',
    description:
      'We believe in giving back and supporting the communities that support us.',
    color: 'text-green-600 bg-green-50 dark:bg-green-950',
  },
];

// Timeline/Milestones
export const aboutTimeline = [
  {
    year: '2020',
    title: 'The Beginning',
    description:
      'Founded with a vision to revolutionize online shopping in Algeria. Started with 50 products.',
  },
  {
    year: '2021',
    title: 'Rapid Growth',
    description:
      'Reached 10,000+ customers and expanded our catalog to 5,000 products across multiple categories.',
  },
  {
    year: '2023',
    title: 'Going Mobile',
    description:
      'Launched our mobile app, making shopping even more accessible. Hit 50,000 active users.',
  },
  {
    year: '2024',
    title: 'National Expansion',
    description:
      'Opened 3 fulfillment centers across Algeria. Reduced delivery times by 40%.',
  },
  {
    year: '2026',
    title: 'Leading the Market',
    description:
      'Now serving 200,000+ customers with over 50,000 products and same-day delivery in major cities.',
  },
];

// Team members
export const aboutTeam = [
  {
    name: 'Ahmed Benali',
    role: 'Founder & CEO',
    image: 'https://i.pravatar.cc/150?img=12',
    bio: '15+ years in e-commerce',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Fatima Meziane',
    role: 'Chief Technology Officer',
    image: 'https://i.pravatar.cc/150?img=45',
    bio: 'Tech innovator & AI expert',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Karim Abdallah',
    role: 'Head of Operations',
    image: 'https://i.pravatar.cc/150?img=33',
    bio: 'Logistics & supply chain guru',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Samira Khelif',
    role: 'Marketing Director',
    image: 'https://i.pravatar.cc/150?img=47',
    bio: 'Brand storyteller & strategist',
    linkedin: '#',
    twitter: '#',
  },
];

// Stats
export const aboutStats = [
  { number: '200K+', label: 'Happy Customers' },
  { number: '50K+', label: 'Products' },
  { number: '48', label: 'Wilayas Covered' },
  { number: '4.8/5', label: 'Customer Rating' },
];


export const jobsOfTheDay = [
  {
    id: 1,
    company: 'TechFlow Inc.',
    title: 'Senior Frontend Developer',
    location: 'Algiers, DZ',
    salary: 'DZD 150K - 250K',
    views: 1.2,
    type: 'Full-time',
    experience: '3+ years',
    companyLogo: 'https://i.pravatar.cc/80?img=1',
  },
  {
    id: 2,
    company: 'DataSphere',
    title: 'Data Scientist',
    location: 'Oran, DZ',
    salary: 'DZD 200K - 300K',
    views: 856,
    type: 'Remote',
    experience: '5+ years',
    companyLogo: 'https://i.pravatar.cc/80?img=2',
  },
  {
    id: 3,
    company: 'CloudNest',
    title: 'DevOps Engineer',
    location: 'Constantine, DZ',
    salary: 'DZD 180K - 280K',
    views: 2.1,
    type: 'Hybrid',
    experience: '4+ years',
    companyLogo: 'https://i.pravatar.cc/80?img=3',
  },
  {
    id: 4,
    company: 'AI Vision',
    title: 'Machine Learning Engineer',
    location: 'Remote',
    salary: 'DZD 220K - 350K',
    views: 1.8,
    type: 'Full-time',
    experience: '4+ years',
    companyLogo: 'https://i.pravatar.cc/80?img=4',
  },
  {
    id: 5,
    company: 'CyberSecure',
    title: 'Cybersecurity Analyst',
    location: 'Blida, DZ',
    salary: 'DZD 140K - 220K',
    views: 743,
    type: 'Full-time',
    experience: '2+ years',
    companyLogo: 'https://i.pravatar.cc/80?img=5',
  },
  {
    id: 6,
    company: 'WebCraft Studio',
    title: 'Full Stack Developer',
    location: 'Tizi Ouzou, DZ',
    salary: 'DZD 130K - 200K',
    views: 1.5,
    type: 'Contract',
    experience: '3+ years',
    companyLogo: 'https://i.pravatar.cc/80?img=6',
  },
];


export const mockOrders = [
  {
    id: 1001,
    user: {
      id: 1,
      name: "John Doe",
      phone : "0796528894",
      email: "john.doe@example.com"
    },
    totalPrice: 299.99,
    status: "pending",
    createdAt: "2026-01-28T10:30:00Z",
    orderItems: [
      {
        id: 1,
        quantity: 2,
        product: {
          id: 101,
          name: "Nike Air Max 2024",
          price: 149.99,
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
        }
      } ,
       {
        id: 2,
        quantity: 1,
        product: {
          id: 102,
          name: "Adidas Ultra Boost",
          price: 189.50,
          image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400"
        }
      },
       {
        id: 3,
        quantity: 1,
        product: {
          id: 103,
          name: "Puma RS-X Sneakers",
          price: 120.00,
          image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400"
        }
      },
     
    ]
  },

];
