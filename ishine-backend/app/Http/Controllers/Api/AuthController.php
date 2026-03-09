<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
class AuthController extends Controller {
    public function register(Request $request) {
        $val = $request->validate(['name'=>'required','email'=>'required|email|unique:users','password'=>'required|min:6']);
        $user = User::create(['name'=>$val['name'],'email'=>$val['email'],'password'=>Hash::make($val['password'])]);
        return response()->json(['token' => $user->createToken('auth')->plainTextToken, 'user'=>$user]);
    }
    public function login(Request $request) {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        
        if (!\Illuminate\Support\Facades\Auth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
        
        $user = \Illuminate\Support\Facades\Auth::user();
        $token = $user->createToken('ishine-token')->plainTextToken;
        
        return response()->json([
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ]
        ]);
    }
    public function me(Request $request) { return response()->json($request->user()); }
    public function logout(Request $request) { $request->user()->currentAccessToken()->delete(); return response()->json(['success'=>true]); }
    public function updateProfile(Request $request) {
        $request->user()->update($request->only(['name','email']));
        return response()->json($request->user());
    }
}