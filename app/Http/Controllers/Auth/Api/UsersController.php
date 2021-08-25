<?php

namespace App\Http\Controllers\Auth\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UsersController extends Controller {

    public function index() {
        $users = User::all();
        return response()->json($users);
    }

    public function delete (User $user) {
        $user->delete();
        return response()->json(null, 204);
    }

    public function update(Request $request, User $user)
    {
        $user->update($request->all());

        return response()->json($user, 200);
    }

    public function store(Request $request)
    {
        return Article::create($request->all());
    }
}

?>