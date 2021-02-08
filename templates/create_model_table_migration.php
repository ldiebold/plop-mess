<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Create{{properCase modelNamePlural}}Table extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('{{snakeCase modelNamePlural}}', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            
        {{#each fields}}
            $table->{{this.type}}('{{this.name}}'{{#if this.hasDecimals}}, {{this.digits}}, {{this.decimals}} {{/if}}){{#if isUnsigned}}->unsigned(){{/if}}{{#if nullable}}->nullable(){{/if}};
        {{/each}}
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('{{snakeCase modelNamePlural}}');
    }
}
