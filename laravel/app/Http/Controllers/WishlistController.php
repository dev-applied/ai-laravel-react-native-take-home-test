<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Validation\ValidationException;

class WishlistController extends Controller
{
    public function index(Request $request): LengthAwarePaginator
    {
        $data = $this->validate($request, [
            'page' => 'integer'
        ]);

        $properties = collect($request->session()->get('properties', []));

        return new LengthAwarePaginator($properties->forPage($data['page'], 10), $properties->count(), 10, $data['page']);
    }

    /**
     * @throws ValidationException
     */
    public function store(Request $request): JsonResponse
    {
        $data = $this->validate($request, [
            'property' => 'required|array'
        ]);
        $request->session()->push('properties', $data['property']);

        return response()->json()->setStatusCode(201);
    }

    /**
     * @throws ValidationException
     */
    public function destroy(Request $request, string $id): JsonResponse
    {
        $properties = collect($request->session()->get('properties', []));
        $properties = $properties->reject(fn($property) => $property['id'] === $id);
        $request->session()->put('properties', $properties);

        return response()->json()->setStatusCode(201);
    }
}
