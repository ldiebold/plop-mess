<?php

use Illuminate\Database\Seeder;
use App\\{{pascalCase modelName}};

class {{pascalCase modelName}}Seeder extends Seeder
{
    /**
     * Run the {{sentenceCase modelNamePlural}} database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory({{pascalCase modelName}}::class, 3)->create();
    }
}
