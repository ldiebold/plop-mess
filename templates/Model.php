<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class {{properCase modelName}} extends Model
{
    protected $fillable = [
        {{#each fields}}
        '{{this.name}}',
        {{/each}}
    ];
    
    protected $dates = [
        {{#each timestampFields}}
        '{{this.name}}',
        {{/each}}
    ];
}
