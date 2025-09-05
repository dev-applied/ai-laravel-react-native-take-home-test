<?php

namespace App\Services;

use Http;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Client\RequestException;
use Illuminate\Pagination\LengthAwarePaginator;

class DatafinityService
{
    public PendingRequest $client;

    public function __construct($apiKey)
    {
        $this->client = Http::contentType('application/json')
            ->baseUrl('https://api.datafiniti.co/v4')
            ->withToken($apiKey);
    }

    /**
     * @throws RequestException
     */
    public function properties($page = 1, $numberOfRecords = 9): LengthAwarePaginator
    {
        $response = $this->client
            ->withQueryParameters([
                'limit' => $numberOfRecords,
                'page' => $page
            ])
            ->post("/properties/paginate", [
                'query' => "country:US",
                'view' => [
                    ["name" => "address"],
                    ["name" => "city"],
                    ["name" => "province"],
                    ["name" => "postalCode"],
                    ["name" => "features"],
                    ["name" => "imageURLs"],
                    ["name" => "dateAdded"],
                    ["name" => "dateUpdated"]
                ]
            ])->throw();

        $data = $response->json();
        foreach ($data['records'] as &$record) {
            // @TODO: Need to implement this
            $record['distance_from_search'] = 0;
        }

        return new LengthAwarePaginator($data['records'], $data['num_found'], $numberOfRecords, $page);
    }
}
