<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
class ProductController extends Controller {
    public function index(Request $request) {
        $query = Product::with(['brand', 'category'])->where('is_active', true);
        
        if ($request->search) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'like', '%'.$request->search.'%')
                  ->orWhere('sku', 'like', '%'.$request->search.'%')
                  ->orWhere('compatibility', 'like', '%'.$request->search.'%');
            });
        }
        
        if ($request->brand) {
            $query->whereHas('brand', fn($q) => $q->where('slug', $request->brand));
        }
        
        if ($request->category) {
            $query->whereHas('category', fn($q) => $q->where('slug', $request->category));
        }
        
        if ($request->featured) {
            $query->where('is_featured', true);
        }
        
        $sort = $request->sort ?? 'latest';
        if ($sort === 'latest') $query->orderBy('created_at', 'desc');
        if ($sort === 'price_low') $query->orderBy('retail_price', 'asc');
        if ($sort === 'price_high') $query->orderBy('retail_price', 'desc');
        
        return $query->paginate($request->limit ?? 12);
    }

    public function show($slug) {
        $product = Product::with(['brand', 'category'])
            ->where('slug', $slug)
            ->orWhere('id', $slug)
            ->firstOrFail();
        return response()->json($product);
    }
}