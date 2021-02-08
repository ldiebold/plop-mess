<?php

use App\\{{properCase modelName}};
use Faker\Generator as Faker;

$factory->define(App\\{{properCase modelName}}::class, function (Faker $faker) {
    return [
      {{#each fields}}
        {{#if this.isString}}
        '{{this.name}}' => $faker->sentence($nbWords = 3, $variableNbWords = true),
        {{/if}}
        {{#if this.isText}}
        '{{this.name}}' => $faker->paragraph($nbSentences = 3, $variableNbSentences = true),
        {{/if}}
        {{#if this.isJson}}
        '{{this.name}}' => null,
        {{/if}}
        {{#if this.isBoolean}}
        '{{this.name}}' => $faker->boolean($chanceOfGettingTrue = 50),
        {{/if}}
        {{#if this.isTimestamp}}
        '{{this.name}}' => $faker->unixTime($max = 'now'),
        {{/if}}
        {{#if this.isFloat}}
        '{{this.name}}' => $faker->randomFloat($nbMaxDecimals = {{this.decimals}}, $min = 0, $max = NULL),
        {{/if}}
        {{#if this.isDouble}}
        '{{this.name}}' => $faker->randomFloat($nbMaxDecimals = {{this.decimals}}, $min = 0, $max = NULL),
        {{/if}}
        {{#if this.isDecimal}}
        '{{this.name}}' => $faker->randomFloat($nbMaxDecimals = {{this.decimals}}, $min = 0, $max = NULL),
        {{/if}}
        {{#if this.isTinyInteger}}
          {{#if this.isUnsigned}}
        '{{this.name}}' => $faker->numberBetween($min = 0, $max = 255),
          {{else}}
        '{{this.name}}' => $faker->numberBetween($min = -128, $max = 127),
          {{/if}}
        {{/if}}
        {{#if this.isSmallInteger}}
          {{#if this.isUnsigned}}
        '{{this.name}}' => $faker->numberBetween($min = 0, $max = 65535),
          {{else}}
        '{{this.name}}' => $faker->numberBetween($min = -32768, $max = 32767),
          {{/if}}
        {{/if}}
        {{#if this.isMediumInteger}}
          {{#if this.isUnsigned}}
        '{{this.name}}' => $faker->numberBetween($min = 0, $max = 16777215),
          {{else}}
        '{{this.name}}' => $faker->numberBetween($min = -8388608, $max = 8388607),
          {{/if}}
        {{/if}}
        {{#if this.isInteger}}
          {{#if this.isUnsigned}}
        '{{this.name}}' => $faker->numberBetween($min = 0, $max = 4294967295),
          {{else}}
        '{{this.name}}' => $faker->numberBetween($min = -2147483648, $max = 2147483647),
          {{/if}}
        {{/if}}
        {{#if this.isBigInteger}}
          {{#if this.isUnsigned}}
        '{{this.name}}' => $faker->numberBetween($min = 0, $max = 18446744073709551615),
          {{else}}
        '{{this.name}}' => $faker->numberBetween($min = -9223372036854775808, $max = 9223372036854775807),
          {{/if}}
        {{/if}}
      {{/each}}
    ];
});