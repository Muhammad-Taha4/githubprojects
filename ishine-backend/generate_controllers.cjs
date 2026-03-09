const fs = require('fs');
const path = require('path');

const controllersDir = path.join(__dirname, 'app', 'Http', 'Controllers', 'Api');
const adminControllersDir = path.join(controllersDir, 'Admin');

if (!fs.existsSync(adminControllersDir)) {
    fs.mkdirSync(adminControllersDir, { recursive: true });
}

const templates = {
    'ProductController.php': `<?php
namespace App\\Http\\Controllers\\Api;
use App\\Http\\Controllers\\Controller;
use App\\Models\\Product;
use Illuminate\\Http\\Request;
class ProductController extends Controller {
    public function index(Request $request) {
        $query = Product::with(['brand', 'category'])->where('is_active', true);
        if ($request->has('featured')) $query->where('is_featured', true);
        if ($request->has('brand')) $query->whereHas('brand', fn($q) => $q->where('slug', $request->brand));
        if ($request->has('category')) $query->whereHas('category', fn($q) => $q->where('slug', $request->category));
        if ($request->search) $query->where('name', 'like', '%'.$request->search.'%');
        if ($request->sort === 'latest') $query->latest();
        return response()->json($request->has('limit') ? $query->paginate($request->limit) : $query->get());
    }
    public function show($slug) {
        $product = Product::with(['brand', 'category'])->where('slug', $slug)->firstOrFail();
        return response()->json($product);
    }
}`,
    'CategoryController.php': `<?php
namespace App\\Http\\Controllers\\Api;
use App\\Http\\Controllers\\Controller;
use App\\Models\\Category;
class CategoryController extends Controller {
    public function index() {
        return response()->json(Category::where('is_active', true)->get());
    }
}`,
    'BrandController.php': `<?php
namespace App\\Http\\Controllers\\Api;
use App\\Http\\Controllers\\Controller;
use App\\Models\\Brand;
class BrandController extends Controller {
    public function index() {
        return response()->json(Brand::where('is_active', true)->get());
    }
}`,
    'BannerController.php': `<?php
namespace App\\Http\\Controllers\\Api;
use App\\Http\\Controllers\\Controller;
use App\\Models\\Banner;
class BannerController extends Controller {
    public function index() {
        return response()->json(Banner::where('is_active', true)->orderBy('sort_order')->get());
    }
}`,
    'MenuController.php': `<?php
namespace App\\Http\\Controllers\\Api;
use App\\Http\\Controllers\\Controller;
use App\\Models\\MenuItem;
class MenuController extends Controller {
    public function index() {
        $items = MenuItem::whereNull('parent_id')->where('is_active', true)->orderBy('sort_order')->get();
        // Just return a flat structure for now or map it
        $menu = $items->map(function($item) {
            $children = MenuItem::where('parent_id', $item->id)->orderBy('sort_order')->get();
            $item->children = $children;
            return $item;
        });
        return response()->json(['menu' => $menu]);
    }
}`,
    'SectionController.php': `<?php
namespace App\\Http\\Controllers\\Api;
use App\\Http\\Controllers\\Controller;
use App\\Models\\SectionContent;
use Illuminate\\Http\\Request;
class SectionController extends Controller {
    public function show($section) {
        return response()->json(SectionContent::where('section', $section)->get()->pluck('value', 'key'));
    }
    public function update(Request $request, $section) {
        foreach($request->all() as $key => $value) {
            SectionContent::updateOrCreate(['section' => $section, 'key' => $key], ['value' => is_array($value) ? json_encode($value) : $value]);
        }
        return response()->json(['success' => true]);
    }
}`,
    'AuthController.php': `<?php
namespace App\\Http\\Controllers\\Api;
use App\\Http\\Controllers\\Controller;
use App\\Models\\User;
use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\Hash;
class AuthController extends Controller {
    public function register(Request $request) {
        $val = $request->validate(['name'=>'required','email'=>'required|email|unique:users','password'=>'required|min:6']);
        $user = User::create(['name'=>$val['name'],'email'=>$val['email'],'password'=>Hash::make($val['password'])]);
        return response()->json(['token' => $user->createToken('auth')->plainTextToken, 'user'=>$user]);
    }
    public function login(Request $request) {
        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) return response()->json(['message'=>'Invalid'], 401);
        return response()->json(['token' => $user->createToken('auth')->plainTextToken, 'user'=>$user]);
    }
    public function me(Request $request) { return response()->json($request->user()); }
    public function logout(Request $request) { $request->user()->currentAccessToken()->delete(); return response()->json(['success'=>true]); }
    public function updateProfile(Request $request) {
        $request->user()->update($request->only(['name','email']));
        return response()->json($request->user());
    }
}`,
    'OrderController.php': `<?php
namespace App\\Http\\Controllers\\Api;
use App\\Http\\Controllers\\Controller;
use App\\Models\\Order;
use Illuminate\\Http\\Request;
class OrderController extends Controller {
    public function index(Request $request) {
        return response()->json($request->user()->orders()->latest()->get());
    }
    public function store(Request $request) {
        $order = Order::create([
            'user_id' => $request->user()->id,
            'total' => $request->total,
            'shipping_address' => json_encode($request->shipping_address),
            'items' => json_encode($request->items),
            'payment_method' => $request->payment_method,
            'status' => 'pending'
        ]);
        return response()->json($order, 201);
    }
    public function show(Request $request, $id) {
        return response()->json($request->user()->orders()->findOrFail($id));
    }
}`,
    'CartController.php': `<?php
namespace App\\Http\\Controllers\\Api;
use App\\Http\\Controllers\\Controller;
use Illuminate\\Http\\Request;
class CartController extends Controller {
    public function index(Request $request) {
        return response()->json([]); // Simplified for this mockup
    }
    public function store(Request $request) {
        return response()->json(['success'=>true]);
    }
    public function update(Request $request, $id) {
        return response()->json(['success'=>true]);
    }
    public function destroy($id) {
        return response()->json(['success'=>true]);
    }
}`,
};

const adminTemplates = {
    'AdminProductController.php': `<?php namespace App\\Http\\Controllers\\Api\\Admin; use App\\Http\\Controllers\\Controller; use App\\Models\\Product; use Illuminate\\Http\\Request; class AdminProductController extends Controller { public function index() { return Product::latest()->paginate(20); } public function store(Request $request) { return Product::create($request->all()); } public function show(Product $product) { return $product; } public function update(Request $request, Product $product) { $product->update($request->all()); return $product; } public function destroy(Product $product) { $product->delete(); return response()->noContent(); } }`,
    'AdminOrderController.php': `<?php namespace App\\Http\\Controllers\\Api\\Admin; use App\\Http\\Controllers\\Controller; use App\\Models\\Order; use Illuminate\\Http\\Request; class AdminOrderController extends Controller { public function index() { return Order::latest()->paginate(20); } public function update(Request $request, Order $order) { $order->update($request->all()); return $order; } public function show(Order $order) { return $order; } }`,
    'AdminUserController.php': `<?php namespace App\\Http\\Controllers\\Api\\Admin; use App\\Http\\Controllers\\Controller; use App\\Models\\User; use Illuminate\\Http\\Request; class AdminUserController extends Controller { public function index() { return User::latest()->paginate(20); } public function update(Request $request, User $user) { $user->update($request->all()); return $user; } public function destroy(User $user) { $user->delete(); return response()->noContent(); } }`,
    'AdminStatsController.php': `<?php namespace App\\Http\\Controllers\\Api\\Admin; use App\\Http\\Controllers\\Controller; class AdminStatsController extends Controller { public function index() { return response()->json(['total_orders'=>\\App\\Models\\Order::count(), 'total_revenue'=>\\App\\Models\\Order::sum('total'), 'products_count'=>\\App\\Models\\Product::count(), 'users_count'=>\\App\\Models\\User::count(), 'recent_orders'=>\\App\\Models\\Order::latest()->take(5)->get()]); } }`,
    'AdminMenuController.php': `<?php namespace App\\Http\\Controllers\\Api\\Admin; use App\\Http\\Controllers\\Controller; use App\\Models\\MenuItem; use Illuminate\\Http\\Request; class AdminMenuController extends Controller { public function index() { return MenuItem::all(); } public function store(Request $request) { return MenuItem::create($request->all()); } public function update(Request $request, MenuItem $menuItem) { $menuItem->update($request->all()); return $menuItem; } public function destroy($id) { MenuItem::destroy($id); return response()->noContent(); } }`,
    'AdminBannerController.php': `<?php namespace App\\Http\\Controllers\\Api\\Admin; use App\\Http\\Controllers\\Controller; use App\\Models\\Banner; use Illuminate\\Http\\Request; class AdminBannerController extends Controller { public function index() { return Banner::all(); } public function store(Request $request) { return Banner::create($request->all()); } public function update(Request $request, Banner $banner) { $banner->update($request->all()); return $banner; } public function destroy(Banner $banner) { $banner->delete(); return response()->noContent(); } }`,
    'AdminCategoryController.php': `<?php namespace App\\Http\\Controllers\\Api\\Admin; use App\\Http\\Controllers\\Controller; use App\\Models\\Category; use Illuminate\\Http\\Request; class AdminCategoryController extends Controller { public function index() { return Category::all(); } public function store(Request $request) { return Category::create($request->all()); } public function update(Request $request, Category $category) { $category->update($request->all()); return $category; } public function destroy(Category $category) { $category->delete(); return response()->noContent(); } }`,
    'AdminBrandController.php': `<?php namespace App\\Http\\Controllers\\Api\\Admin; use App\\Http\\Controllers\\Controller; use App\\Models\\Brand; use Illuminate\\Http\\Request; class AdminBrandController extends Controller { public function index() { return Brand::all(); } public function store(Request $request) { return Brand::create($request->all()); } public function update(Request $request, Brand $brand) { $brand->update($request->all()); return $brand; } public function destroy(Brand $brand) { $brand->delete(); return response()->noContent(); } }`,
};

for (const [file, content] of Object.entries(templates)) {
    fs.writeFileSync(path.join(controllersDir, file), content);
}

for (const [file, content] of Object.entries(adminTemplates)) {
    fs.writeFileSync(path.join(adminControllersDir, file), content);
}

console.log('Controllers generated successfully.');
