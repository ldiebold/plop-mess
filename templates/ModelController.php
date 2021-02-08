<?php


namespace App\Http\Controllers;

use App\\{{properCase modelName}};
use Illuminate\Http\Request;

class {{properCase modelName}}Controller extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = {{properCase modelName}}::query();

        if($request->has('with')) {
            $query->with($request->with);
        }

        return $query->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return {{properCase modelName}}::create($request->input());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\{{properCase modelName}}  ${{camelCase modelName}}
     * @return \Illuminate\Http\Response
     */
    public function show({{properCase modelName}} ${{camelCase modelName}})
    {
        return ${{camelCase modelName}};
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\{{properCase modelName}}  ${{camelCase modelName}}
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, {{properCase modelName}} ${{camelCase modelName}})
    {
        ${{camelCase modelName}}->update($request->input());
        return ${{camelCase modelName}};
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\{{properCase modelName}}  ${{camelCase modelName}}
     * @return \Illuminate\Http\Response
     */
    public function destroy({{properCase modelName}} ${{camelCase modelName}})
    {
        ${{camelCase modelName}}->delete();
        return ${{camelCase modelName}};
    }
}