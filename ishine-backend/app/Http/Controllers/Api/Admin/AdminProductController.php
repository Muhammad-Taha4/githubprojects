<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AdminProductController extends Controller
{
    public function index()
    {
        return Product::latest()->paginate(20);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'sku' => 'required|unique:products',
            'brand_id' => 'required',
            'category_id' => 'required',
            'retail_price' => 'required|numeric',
            'wholesale_price' => 'required|numeric',
            'stock' => 'required|integer',
            'description' => 'nullable',
            'compatibility' => 'nullable',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'image' => 'nullable|image|max:2048',
        ]);
        
        $images = [];
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $images[] = 'http://localhost:8000/storage/' . $path;
        }
        
        $data['images'] = json_encode($images);
        $data['slug'] = Str::slug($data['name']) . '-' . uniqid();
        unset($data['image']);
        unset($data['_method']);
        
        $product = Product::create($data);
        return response()->json($product, 201);
    }

    public function show(Product $product)
    {
        return $product;
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        
        $data = $request->all();
        
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $data['images'] = json_encode(['http://localhost:8000/storage/' . $path]);
        }
        unset($data['image']);
        unset($data['_method']);
        
        $product->update($data);
        return response()->json($product);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return response()->json(['message' => 'deleted']);
    }
}