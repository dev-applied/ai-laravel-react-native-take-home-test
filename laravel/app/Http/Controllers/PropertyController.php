<?php

namespace App\Http\Controllers;

use App\Services\DatafinityService;
use Illuminate\Http\Client\RequestException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Validation\ValidationException;

class PropertyController extends Controller
{
    /**
     * @throws ValidationException
     * @throws RequestException
     */
    public function index(Request $request, DatafinityService $datafinityService): LengthAwarePaginator
    {
        $data = $this->validate($request, [
            'page' => 'integer'
        ]);

        return $datafinityService->properties($data['page']);
    }
}
