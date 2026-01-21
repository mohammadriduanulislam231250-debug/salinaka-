import firebase from '@/services/firebase';
import React, { useState } from 'react';

const SeedProducts = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const seedData = [
    // --- FEATURED PRODUCTS (6 items) ---
    {
      name: 'Oversized Cat Eye',
      brand: 'Gucci',
      price: 420,
      description: 'Bold and dramatic cat-eye sunglasses for a statement look.',
      image:
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      keywords: ['sunglasses', 'cat eye', 'luxury', 'women'],
      sizes: [54, 56],
      isFeatured: true,
      isRecommended: false,
      availableColors: ['#000000', '#ff0000'],
      imageCollection: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        },
      ],
      reviews: [
        {
          id: 'r1',
          rating: 5,
          comment: 'So chic and expensive looking.',
          user: 'Fashionista',
          date: '2023-12-01',
        },
      ],
    },
    {
      name: 'Clubmaster Classic',
      brand: 'Ray-Ban',
      price: 180,
      description: 'Retro and timeless. Inspired by the 50s.',
      image:
        'https://images.unsplash.com/photo-1589782182703-2aaa69037b5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      keywords: ['sunglasses', 'retro', 'clubmaster', 'classic'],
      sizes: [49, 51],
      isFeatured: true,
      isRecommended: true,
      availableColors: ['#333333', '#5b3a29'],
      imageCollection: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1589782182703-2aaa69037b5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        },
      ],
      reviews: [
        { id: 'r1', rating: 5, comment: 'Timeless classic.', user: 'RetroFan', date: '2023-11-20' },
      ],
    },
    {
      name: 'Hexagonal Flat Lenses',
      brand: 'Ray-Ban',
      price: 154,
      description: 'Evolution of round with flat crystal lenses.',
      image:
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      keywords: ['sunglasses', 'hexagonal', 'trendy'],
      sizes: [51, 54],
      isFeatured: true,
      isRecommended: false,
      availableColors: ['#gold', '#silver'],
      imageCollection: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        },
      ],
      reviews: [
        {
          id: 'r1',
          rating: 4,
          comment: 'Unique shape, love it.',
          user: 'TrendSetter',
          date: '2023-10-05',
        },
      ],
    },
    {
      name: 'Justin Color Mix',
      brand: 'Oakley',
      price: 140,
      description: 'Cool and protective with a slightly larger rectangle frame.',
      image:
        'https://images.unsplash.com/photo-1509695507497-903c140c43b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      keywords: ['sunglasses', 'sport', 'oakley', 'protective'],
      sizes: [54],
      isFeatured: true,
      isRecommended: true,
      availableColors: ['#121212'],
      imageCollection: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        },
      ],
      reviews: [
        {
          id: 'r1',
          rating: 5,
          comment: 'Great for running.',
          user: 'Runner101',
          date: '2023-11-15',
        },
      ],
    },
    {
      name: 'Polarized Square',
      brand: 'Persol',
      price: 310,
      description: 'Sophisticated square frames with polarized lenses.',
      image:
        'https://images.unsplash.com/photo-1508296695146-257a814070b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      keywords: ['sunglasses', 'polarized', 'square', 'men'],
      sizes: [52, 55],
      isFeatured: true,
      isRecommended: false,
      availableColors: ['#000000'],
      imageCollection: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        },
      ],
      reviews: [
        {
          id: 'r1',
          rating: 5,
          comment: 'Crystal clear vision.',
          user: 'EagleEye',
          date: '2023-09-22',
        },
      ],
    },

    // --- RECOMMENDED PRODUCTS (6 items) ---
    {
      name: 'Wayfarer II',
      brand: 'Ray-Ban',
      price: 165,
      description: 'This sleek frame takes the iconic look to the round.',
      image:
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      keywords: ['sunglasses', 'wayfarer', 'round'],
      sizes: [52, 55],
      isFeatured: false,
      isRecommended: true,
      availableColors: ['#black', '#tortoise'],
      imageCollection: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        },
      ],
      reviews: [
        {
          id: 'r1',
          rating: 5,
          comment: 'Nice update to a classic.',
          user: 'Modernist',
          date: '2023-08-11',
        },
      ],
    },

    {
      name: 'The General',
      brand: 'Ray-Ban',
      price: 175,
      description: 'Created in 1987 as a tribute to General Douglas MacArthur.',
      image:
        'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      keywords: ['sunglasses', 'aviator', 'general', 'bold'],
      sizes: [57],
      isFeatured: false,
      isRecommended: true,
      availableColors: ['#gold'],
      imageCollection: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        },
      ],
      reviews: [
        { id: 'r1', rating: 4, comment: 'Very sturdy.', user: 'HistoryBuff', date: '2023-05-14' },
      ],
    },

    {
      name: 'Liteforce Aviator',
      brand: 'Ray-Ban',
      price: 195,
      description: 'Made from a unique thermoplastic biomaterial.',
      image:
        'https://images.unsplash.com/photo-1563903530908-afdd155d057a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      keywords: ['sunglasses', 'tech', 'liteforce'],
      sizes: [58],
      isFeatured: false,
      isRecommended: true,
      availableColors: ['#matric'],
      imageCollection: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1563903530908-afdd155d057a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        },
      ],
      reviews: [
        { id: 'r1', rating: 5, comment: 'Incredibly light.', user: 'TechHead', date: '2023-02-18' },
      ],
    },

    // --- OTHER PRODUCTS (to fill shop) ---
    {
      name: 'Meteor',
      brand: 'Ray-Ban',
      price: 155,
      description: 'Inspired by the 60s.',
      image:
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      keywords: ['sunglasses'],
      sizes: [50],
      isFeatured: false,
      isRecommended: false,
      availableColors: ['#black'],
      imageCollection: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        },
      ],
      reviews: [],
    },

    {
      name: 'Oval Flat Lenses',
      brand: 'Ray-Ban',
      price: 154,
      description: 'Oval shape with flat crystal lenses.',
      image:
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      keywords: ['sunglasses'],
      sizes: [51, 54],
      isFeatured: false,
      isRecommended: false,
      availableColors: ['#gold'],
      imageCollection: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        },
      ],
      reviews: [],
    },
    {
      name: 'Marshal',
      brand: 'Ray-Ban',
      price: 165,
      description: 'Hexagonal shape with a double bridge.',
      image:
        'https://images.unsplash.com/photo-1509695507497-903c140c43b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      keywords: ['sunglasses'],
      sizes: [51],
      isFeatured: false,
      isRecommended: false,
      availableColors: ['#gold'],
      imageCollection: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        },
      ],
      reviews: [
        { id: 'r1', rating: 5, comment: 'Very cool.', user: 'CoolCat', date: '2022-12-05' },
      ],
    },
    {
      name: 'Wings',
      brand: 'Ray-Ban',
      price: 175,
      description: 'For those who want to fly.',
      image:
        'https://images.unsplash.com/photo-1508296695146-257a814070b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      keywords: ['sunglasses'],
      sizes: [135],
      isFeatured: false,
      isRecommended: false,
      availableColors: ['#gold'],
      imageCollection: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        },
      ],
      reviews: [],
    },
    {
      name: 'Olympian',
      brand: 'Ray-Ban',
      price: 155,
      description: 'Sporty and sophisticated.',
      image:
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      keywords: ['sunglasses'],
      sizes: [62],
      isFeatured: false,
      isRecommended: false,
      availableColors: ['#gold'],
      imageCollection: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        },
      ],
      reviews: [],
    },
  ];

  const handleSeed = async () => {
    setLoading(true);
    setStatus('Seeding...');
    try {
      // 1. Delete existing products
      setStatus('Removing existing products...');
      const productsSnapshot = await firebase.db.collection('products').get();
      const deletePromises = productsSnapshot.docs.map((doc) => firebase.removeProduct(doc.id));
      await Promise.all(deletePromises);
      console.log('Cleared database.');

      // 2. Add new products
      setStatus('Adding new products...');
      const promises = seedData.map(async (product) => {
        const key = firebase.generateKey();
        const productWithDate = {
          ...product,
          dateAdded: new Date().getTime(),
          name_lower: product.name.toLowerCase(),
        };
        await firebase.addProduct(key, productWithDate);
      });
      await Promise.all(promises);
      setStatus('Success! Database reset and new products added.');
    } catch (e) {
      console.error(e);
      setStatus(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px dashed #ccc', margin: '20px 0' }}>
      <h4>Dev Tool: Seed Data</h4>
      <p>Click to add products with reviews to Firebase.</p>
      <button className="button" onClick={handleSeed} disabled={loading}>
        {loading ? 'Adding...' : 'Seed Products'}
      </button>
      {status && <p style={{ marginTop: '10px' }}>{status}</p>}
    </div>
  );
};

export default SeedProducts;
