<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\AddressBook;
use App\Http\Resources\AddressBookResource;

class AddressBookController extends Controller
{
    public function index()
    {
        $user = $this->authUser();
        //Admin
        if ($user->role == 2) {
            $addressBooks = AddressBook::all();
            $addressBooks2 = AddressBookResource::collection($addressBooks->sortByDesc('id'));
            return $this->paginate($addressBooks2, 2);
        } else {
            $addressBooks = AddressBookResource::collection($user->addressBook->sortByDesc('id'));
            return $this->paginate($addressBooks, 2);
        }
    }

    public function paginate($items, $perPage = 15, $page = null, $options = [])
    {
        $page = $page ?: (\Illuminate\Pagination\Paginator::resolveCurrentPage() ?: 1);
        $items = $items instanceof Collection ? $items : \Illuminate\Support\Collection::make($items);
        return new \Illuminate\Pagination\LengthAwarePaginator($items->forPage($page, $perPage), $items->count(), $perPage, $page, $options);
    }

    public function store(Request $request)
    {
        $user = $this->authUser();
        $posts = $user->addressbook()->create([
            'name' => $request->name,
            'email' => $request->email,
            'socialId' => $request->socialId,
            'pathToImage' => $request->pathToImage,
            'user_id' => $request->user()->id,
        ]);

        return $posts;
    }

    public function show(Request $request)
    {
        $user = $this->authUser();

        if ($user->role == 2) {
            $addressBook = AddressBook::find($request->id);
        } else {
            $addressBook = $user->addressBook->find($request->id);
        }
        
        return $addressBook;
    }

    public function update(Request $request)
    {
        $user = $this->authUser();
        if ($user->role == 2) {
            $addressBook = AddressBook::find($request->id);
            if (!$addressBook) {
                return response()->json(['error' => 'You can only edit your own address book.'], 403);
            }
        } else {
            $addressBook = $user->addressBook->find($request->id);
            if (!$addressBook || ($request->user()->id !== $addressBook->user_id)) {
                return response()->json(['error' => 'You can only edit your own address book.'], 403);
            }
        }
        $addressBook->update($request->only(['name', 'email', 'socialId', 'pathToImage']));

        return new AddressBookResource($addressBook);
    }

    public function delete(Request $request)
    {
        $user = $this->authUser();
        if ($user->role == 2) {
            $addressBook = AddressBook::find($request->id);
        } else {
            $addressBook = $user->addressBook->find($request->id);
        }
        $addressBook->delete();

        return response()->json(['status' => 'success'], 204);
    }
}
