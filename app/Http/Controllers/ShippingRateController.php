<?php

namespace App\Http\Controllers;

use App\Models\ShippingRate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShippingRateController extends Controller
{
    public function getShippingRates()
    {
        $shipping_rates = ShippingRate::all();
        return Inertia::render('Admin/ShippingRates', [
            'shipping_data' => $shipping_rates
        ]);
    }
}
