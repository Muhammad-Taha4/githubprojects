<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\Banner;
use App\Models\MenuItem;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create Admin User
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@ishine.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // 2. Create Brands
        $brands = [
            'Apple', 'Samsung', 'Motorola', 'Google', 'TCL', 'OnePlus', 'Nokia', 'Revvl', 'NCC', 'WEGA CELL', 'Generic'
        ];
        
        $brandMap = [];
        foreach ($brands as $brandName) {
            $brandMap[$brandName] = Brand::create([
                'name' => $brandName,
                'slug' => \Str::slug($brandName)
            ])->id;
        }

        // 3. Create Categories
        $categories = [
            'LCD Screens', 'OLED Displays', 'Batteries', 'Back Covers', 'Charging Ports', 
            'Cameras', 'Speakers', 'Flex Cables', 'Tools', 'Phone Cases', 'Tempered Glass', 
            'Privacy Glass', 'Power Banks', 'Camera Glass', 'Wireless Earbuds', 'Car Chargers', 'Data Cables'
        ];
        
        $catMap = [];
        foreach ($categories as $catName) {
            $catMap[$catName] = Category::create([
                'name' => $catName,
                'slug' => \Str::slug($catName)
            ])->id;
        }

        // 4. Create Products
        $products = [
            [
                'name' => "Galaxy S24 Ultra LCD with Frame Soft OLED",
                'sku' => "SAM-S24U-OLED",
                'retail_price' => 88.50,
                'wholesale_price' => 72.00,
                'brand_id' => $brandMap['Samsung'],
                'category_id' => $catMap['OLED Displays'],
                'compatibility' => "Samsung Galaxy S24 Ultra 5G",
                'is_featured' => true,
                'stock' => 150,
                'images' => ["https://via.placeholder.com/400x400?text=Samsung+S24+Ultra"],
            ],
            [
                'name' => "Samsung A35 LCD with Frame Incell",
                'sku' => "SAM-A35-LCD",
                'retail_price' => 25.50,
                'wholesale_price' => 19.00,
                'brand_id' => $brandMap['Samsung'],
                'category_id' => $catMap['LCD Screens'],
                'compatibility' => "Samsung Galaxy A35 (A356B)",
                'is_featured' => true,
                'stock' => 100,
                'images' => ["https://via.placeholder.com/400x400?text=Samsung+A35+LCD"],
            ],
            [
                'name' => "Moto G Play 2026 LCD Display Assembly with Frame",
                'sku' => "MOT-GP26-LCD",
                'retail_price' => 24.50,
                'wholesale_price' => 18.00,
                'brand_id' => $brandMap['Motorola'],
                'category_id' => $catMap['LCD Screens'],
                'compatibility' => "Motorola Moto G Play 2026",
                'is_featured' => true,
                'stock' => 50,
                'images' => ["https://via.placeholder.com/400x400?text=Moto+G+Play+2026"],
            ],
            [
                'name' => "Moto G Play 2023 OEM LCD Display with Frame",
                'sku' => "MOT-GP23-LCD",
                'retail_price' => 17.95,
                'wholesale_price' => 12.00,
                'brand_id' => $brandMap['Motorola'],
                'category_id' => $catMap['LCD Screens'],
                'compatibility' => "Motorola Moto G Play 2023 (XT2271-5)",
                'is_featured' => false,
                'stock' => 200,
                'images' => ["https://via.placeholder.com/400x400?text=Moto+G+Play+2023"],
            ],
            [
                'name' => "Moto G Stylus 5G 2022 LCD Display with Frame",
                'sku' => "MOT-GS22-LCD",
                'retail_price' => 27.95,
                'wholesale_price' => 21.00,
                'brand_id' => $brandMap['Motorola'],
                'category_id' => $catMap['LCD Screens'],
                'compatibility' => "Moto G Stylus 5G 2022 (XT2215)",
                'is_featured' => false,
                'stock' => 120,
                'images' => ["https://via.placeholder.com/400x400?text=Moto+G+Stylus+2022"],
            ],
            [
                'name' => "Moto G Play 2021 LCD Display Assembly with Frame",
                'sku' => "MOT-GP21-LCD",
                'retail_price' => 18.00,
                'wholesale_price' => 13.00,
                'brand_id' => $brandMap['Motorola'],
                'category_id' => $catMap['LCD Screens'],
                'compatibility' => "Motorola Moto G Play 2021",
                'is_featured' => false,
                'stock' => 80,
                'images' => ["https://via.placeholder.com/400x400?text=Moto+G+Play+2021"],
            ],
            [
                'name' => "Moto G Power 2021 LCD Display with Frame OEM",
                'sku' => "MOT-GPW21-LCD",
                'retail_price' => 18.00,
                'wholesale_price' => 13.00,
                'brand_id' => $brandMap['Motorola'],
                'category_id' => $catMap['LCD Screens'],
                'compatibility' => "Motorola Moto G Power 2021",
                'is_featured' => false,
                'stock' => 90,
                'images' => ["https://via.placeholder.com/400x400?text=Moto+G+Power+2021"],
            ],
            [
                'name' => "iPhone 16 Pro Max Soft OLED LCD Display Assembly",
                'sku' => "APP-IP16PM-OLED",
                'retail_price' => 119.99,
                'wholesale_price' => 95.00,
                'brand_id' => $brandMap['Apple'],
                'category_id' => $catMap['OLED Displays'],
                'compatibility' => "iPhone 16 Pro Max",
                'is_featured' => true,
                'stock' => 45,
                'images' => ["https://via.placeholder.com/400x400?text=iPhone+16+Pro+Max"],
            ],
            [
                'name' => "iPhone 15 Pro Max OLED Display Assembly with Frame",
                'sku' => "APP-IP15PM-OLED",
                'retail_price' => 109.99,
                'wholesale_price' => 88.00,
                'brand_id' => $brandMap['Apple'],
                'category_id' => $catMap['OLED Displays'],
                'compatibility' => "iPhone 15 Pro Max",
                'is_featured' => true,
                'stock' => 60,
                'images' => ["https://via.placeholder.com/400x400?text=iPhone+15+Pro+Max"],
            ],
            [
                'name' => "iPhone 14 Pro LCD Display Assembly",
                'sku' => "APP-IP14P-LCD",
                'retail_price' => 89.99,
                'wholesale_price' => 72.00,
                'brand_id' => $brandMap['Apple'],
                'category_id' => $catMap['OLED Displays'],
                'compatibility' => "iPhone 14 Pro",
                'is_featured' => true,
                'stock' => 200,
                'images' => ["https://via.placeholder.com/400x400?text=iPhone+14+Pro"],
            ],
            [
                'name' => "iPhone 13 LCD Display Assembly with Frame",
                'sku' => "APP-IP13-LCD",
                'retail_price' => 59.99,
                'wholesale_price' => 48.00,
                'brand_id' => $brandMap['Apple'],
                'category_id' => $catMap['LCD Screens'],
                'compatibility' => "iPhone 13",
                'is_featured' => false,
                'stock' => 300,
                'images' => ["https://via.placeholder.com/400x400?text=iPhone+13"],
            ],
            [
                'name' => "iPhone 11 LCD Display Assembly",
                'sku' => "APP-IP11-LCD",
                'retail_price' => 39.99,
                'wholesale_price' => 30.00,
                'brand_id' => $brandMap['Apple'],
                'category_id' => $catMap['LCD Screens'],
                'compatibility' => "iPhone 11",
                'is_featured' => false,
                'stock' => 400,
                'images' => ["https://via.placeholder.com/400x400?text=iPhone+11"],
            ],
            [
                'name' => "iPhone XR LCD Display Assembly",
                'sku' => "APP-IPXR-LCD",
                'retail_price' => 34.99,
                'wholesale_price' => 26.00,
                'brand_id' => $brandMap['Apple'],
                'category_id' => $catMap['LCD Screens'],
                'compatibility' => "iPhone XR",
                'is_featured' => false,
                'stock' => 500,
                'images' => ["https://via.placeholder.com/400x400?text=iPhone+XR"],
            ],
            [
                'name' => "Google Pixel 9 Pro OLED Display Assembly",
                'sku' => "GOO-P9P-OLED",
                'retail_price' => 99.99,
                'wholesale_price' => 80.00,
                'brand_id' => $brandMap['Google'],
                'category_id' => $catMap['OLED Displays'],
                'compatibility' => "Google Pixel 9 Pro",
                'is_featured' => true,
                'stock' => 30,
                'images' => ["https://via.placeholder.com/400x400?text=Pixel+9+Pro"],
            ],
            [
                'name' => "Google Pixel 8 Pro OLED Display Assembly",
                'sku' => "GOO-P8P-OLED",
                'retail_price' => 89.99,
                'wholesale_price' => 72.00,
                'brand_id' => $brandMap['Google'],
                'category_id' => $catMap['OLED Displays'],
                'compatibility' => "Google Pixel 8 Pro",
                'is_featured' => false,
                'stock' => 50,
                'images' => ["https://via.placeholder.com/400x400?text=Pixel+8+Pro"],
            ],
            [
                'name' => "NCC Wireless Earbuds",
                'sku' => "NCC-EARBUD-001",
                'retail_price' => 19.99,
                'wholesale_price' => 12.00,
                'brand_id' => $brandMap['NCC'],
                'category_id' => $catMap['Wireless Earbuds'],
                'compatibility' => "Universal",
                'is_featured' => true,
                'stock' => 1000,
                'images' => ["https://via.placeholder.com/400x400?text=NCC+Earbuds"],
            ],
            [
                'name' => "NCC Power Bank 10000mAh",
                'sku' => "NCC-PB-10K",
                'retail_price' => 24.99,
                'wholesale_price' => 16.00,
                'brand_id' => $brandMap['NCC'],
                'category_id' => $catMap['Power Banks'],
                'compatibility' => "Universal",
                'is_featured' => false,
                'stock' => 500,
                'images' => ["https://via.placeholder.com/400x400?text=NCC+Power+Bank"],
            ],
            [
                'name' => "WEGA CELL Fast Car Charger 20W",
                'sku' => "WEG-CC-20W",
                'retail_price' => 12.99,
                'wholesale_price' => 8.00,
                'brand_id' => $brandMap['WEGA CELL'],
                'category_id' => $catMap['Car Chargers'],
                'compatibility' => "Universal",
                'is_featured' => false,
                'stock' => 800,
                'images' => ["https://via.placeholder.com/400x400?text=WEGA+Car+Charger"],
            ],
            [
                'name' => "Mobile Repair Tools Kit Professional",
                'sku' => "TOOL-KIT-PRO",
                'retail_price' => 29.99,
                'wholesale_price' => 22.00,
                'brand_id' => $brandMap['Generic'],
                'category_id' => $catMap['Tools'],
                'compatibility' => "All Devices",
                'is_featured' => true,
                'stock' => 150,
                'images' => ["https://via.placeholder.com/400x400?text=Repair+Tools"],
            ],
        ];

        foreach ($products as $p) {
            Product::create([
                'name' => $p['name'],
                'slug' => \Str::slug($p['name']),
                'sku' => $p['sku'],
                'brand_id' => $p['brand_id'],
                'category_id' => $p['category_id'],
                'retail_price' => $p['retail_price'],
                'wholesale_price' => $p['wholesale_price'],
                'stock' => $p['stock'],
                'compatibility' => $p['compatibility'],
                'is_featured' => $p['is_featured'],
                'images' => $p['images'],
            ]);
        }

        // 5. Create Banners
        Banner::create([
            'title' => "Premium Mobile LCD & OLED Parts",
            'subtitle' => "iPhone, Samsung, Motorola & Google — Wholesale Pricing Available",
            'link' => "/shop",
            'sort_order' => 1
        ]);
        Banner::create([
            'title' => "Samsung Galaxy S24 Ultra — Soft OLED",
            'subtitle' => "Now Available — $88.50 Retail | Wholesale Pricing for Bulk Orders",
            'link' => "/shop?brand=samsung",
            'sort_order' => 2
        ]);
        Banner::create([
            'title' => "New 2026 Motorola Parts In Stock",
            'subtitle' => "Moto G Play 2026 LCD Display Assembly — Fast Same Day Dispatch",
            'link' => "/shop?brand=motorola",
            'sort_order' => 3
        ]);

        // 6. Create Menu Items
        $this->seedMenu();

        // 7. Seed sections
        DB::table('section_contents')->insert([
            ['section' => 'featured_products', 'key' => 'title', 'value' => 'Discount Products', 'updated_at' => now()],
            ['section' => 'featured_products', 'key' => 'subtitle', 'value' => 'Premium Quality Parts', 'updated_at' => now()],
            ['section' => 'latest_arrivals', 'key' => 'title', 'value' => 'Latest Arrivals', 'updated_at' => now()],
        ]);
    }

    private function seedMenu()
    {
        $topLevel = [
            'Apple' => 'brand',
            'Samsung' => 'brand',
            'Motorola' => 'brand',
            'Other Brands' => 'custom',
            'WEGA CELL' => 'brand',
            'NCC' => 'brand',
            'Speakers' => 'category',
            'Tools' => 'category',
            'Game Accessories' => 'category'
        ];

        $parents = [];
        $order = 0;
        foreach ($topLevel as $name => $type) {
            $parents[$name] = MenuItem::create([
                'label' => $name,
                'slug' => \Str::slug($name),
                'type' => $type,
                'sort_order' => $order++
            ]);
        }

        // Apple -> iPhone
        $iphoneMenu = MenuItem::create([
            'label' => 'iPhone',
            'slug' => 'iphone',
            'type' => 'custom',
            'parent_id' => $parents['Apple']->id,
            'sort_order' => 0
        ]);

        $iphones = [
            'iPhone 17 Pro Max' => 'NEW', 'iPhone 17 Pro' => 'NEW', 'iPhone 17 Air' => 'NEW',
            'iPhone 17' => 'NEW', 'iPhone 16 Pro Max' => null, 'iPhone 16 Plus' => null,
            'iPhone 16 Pro' => null, 'iPhone 16' => null, 'iPhone 15 Pro Max' => 'HOT',
            'iPhone 15 Pro' => 'HOT', 'iPhone 15 Plus' => 'HOT', 'iPhone 15' => 'HOT',
            'iPhone 14 Pro Max' => null, 'iPhone 14 Pro' => null, 'iPhone 14 Plus' => null,
            'iPhone 14' => null, 'iPhone 13 Pro Max' => null, 'iPhone 13 Pro' => null,
            'iPhone 13 Mini' => null, 'iPhone 13' => null, 'iPhone 12 Pro Max' => null,
            'iPhone 12 Mini' => null, 'iPhone 12' => null, 'iPhone 11 Pro Max' => null,
            'iPhone 11 Pro' => null, 'iPhone 11' => 'SALE', 'iPhone XR' => 'SALE',
            'iPhone XS Max' => null, 'iPhone XS' => null, 'iPhone X' => null,
            'iPhone SE' => null, 'iPhone 8 Plus' => null, 'iPhone 8' => null,
            'iPhone 7 Plus' => null, 'iPhone 7' => null
        ];

        $order = 0;
        foreach ($iphones as $name => $badge) {
            MenuItem::create([
                'label' => $name,
                'slug' => \Str::slug($name),
                'type' => 'custom',
                'parent_id' => $iphoneMenu->id,
                'badge' => $badge,
                'sort_order' => $order++
            ]);
        }
        
        // Similarly add Samsung S Series, etc. (Just adding a few for completeness without bloating file too much)
        $samsungMenu = MenuItem::create([
            'label' => 'S Series',
            'slug' => 's-series',
            'type' => 'custom',
            'parent_id' => $parents['Samsung']->id,
            'sort_order' => 0
        ]);

        $samsungSSeries = ['Galaxy S25 Ultra 5G' => 'NEW', 'Galaxy S24 Ultra' => 'HOT', 'S23 Ultra' => null];
        $order = 0;
        foreach ($samsungSSeries as $name => $badge) {
            MenuItem::create([
                'label' => $name,
                'slug' => \Str::slug($name),
                'type' => 'custom',
                'parent_id' => $samsungMenu->id,
                'badge' => $badge,
                'sort_order' => $order++
            ]);
        }
    }
}
