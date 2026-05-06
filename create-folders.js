import fs from 'fs';
import path from 'path';

const products = [
  'strawberry-bear-plush',
  'minty-wooden-train',
  'lemon-drop-blocks',
  'cotton-candy-bunny',
  'chocolate-puzzle',
  'vanilla-tea-set',
  '麦兜和朋友们排排坐系列',
  '轻松小熊',
  '比奇堡里有什么系列',
  'peppa-pig-playset',
  '胆大党高速婆婆盲盒',
  '海底乐趣香薰挂饰系列',
  '比奇堡的居民们星光独白系列',
  'peppas-red-car',
  'mickey-mouse-plush',
  'donald-duck-figure',
  '别动我的齐刘海',
  'charmander-plush',
  '蜡笔小新大尾巴二代盲盒',
  'hello-kitty-doll'
];

products.forEach(p => {
  const dir = path.join(process.cwd(), 'public', 'products', p);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, '.keep'), 'Put your images here. Name the main image main.jpg');
});

console.log('Folders created successfully!');
