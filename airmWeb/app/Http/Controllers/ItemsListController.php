<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

// model for the table
use App\Models\ItemList;

class ItemsListController extends Controller
{
    public function fetchItemByItemId(Request $request)
    {
        // get the id from the req
        $itemRowId = $request->input("id");

        if (!$itemRowId)
        {
            return response()->json(["error" => "ID is missing"], 400);
        }

        // eloquent for doc
        $itemRow = ItemList::where("id", $itemRowId);

        return (json_encode($itemRow));
    }
    
    // to get all the items that a user added:
    public function fetchItemsByUser()
    {
        $user = Auth::user();

        if (!$user)
        {
            return redirect('/login');
        }

        $username = auth()->user()->name;

        // eloquent
        $itemsByUser = ItemList::where("username", $username)->get();

        return ($itemsByUser);
    }

    public function addItem(Request $request)
    {
        // Make sure the request is valid
        /// These values better be present!
        $validated = $request->validate([
            'item_name' => 'required',
            'item_description' => 'nullable',
            'item_category' => 'required',
            'item_price' => 'required',
            'item_stock' => 'required',
            'item_currency' => 'required'
        ]);

        // Get username
        $username = auth()->user()->name;

        // For adding the item:
        $items = new ItemList();
        $items->username = $username;
        $items->item_name = $validated['item_name'];
        $items->item_description = $validated['item_description'];
        $items->item_category = $validated['item_category'];
        $items->item_price = $validated['item_price'];
        $items->item_stock = $validated['item_stock'];
        $items->item_currency = $validated['item_currency'];

        // Save the model - insert into database
        $items->save();

        // Success!
        return response()->json([
            'message' => 'Item added successfully!',
        ], 201);
    }

    public function deleteItem(Request $delete)
    {
        // model
        $items = new ItemList();

        $data = $items::find($delete); 

        $items::where('id', $delete)->first();
        $data->delete();

        // Success! weifuewhfuow yay!
        return response()->json([
            'message' => 'Item deleted successfully!',
        ], 201);
    }
}
