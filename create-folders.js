import fs from 'fs';
import path from 'path';

const products = [
  'strawberry-bear-plush',
  'minty-wooden-train',
  'lemon-drop-blocks',
  'cotton-candy-bunny',
  'chocolate-puzzle',
  'vanilla-tea-set',
  'spongebob-plush',
  '轻松小熊',
  'mr-krabs-bank',
  'peppa-pig-playset',
  'squidward-tentacles-plush',
  'gary-the-snail-figure',
  'george-pig-dinosaur',
  'peppas-red-car',
  'mickey-mouse-plush',
  'donald-duck-figure',
  'pikachu-action-figure',
  'charmander-plush',
  'doraemon-gadget-set',
  'hello-kitty-doll'
];

products.forEach(p => {
  const dir = path.join(process.cwd(), 'public', 'products', p);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, '.keep'), 'Put your images here. Name the main image main.jpg');
});

console.log('Folders created successfully!');
