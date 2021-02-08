<?php

namespace Tests\Feature\API;

use App\\{{pascalCase modelName}};
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class {{pascalCase modelName}}Test extends TestCase
{
    use RefreshDatabase;
    
    {{#if adminAccess.create}}
    /**
     * @test
     * An admin can create a {{snakeCase modelName}}
     */
    public function an_admin_can_create_a_{{snakeCase modelName}}()
    {
        $this->loginAsAdmin();

        $this->assertCanCreate({{pascalCase modelName}}::class);
    }
    {{else}}
    /**
     * @test
     * An admin cannot create a {{snakeCase modelName}}
     */
    public function an_admin_cannot_create_a_{{snakeCase modelName}}()
    {
        $this->loginAsAdmin();
        
        $this->assertCannotCreate({{pascalCase modelName}}::class);
    }
    {{/if}}
    {{#if adminAccess.index}}
    /**
     * @test
     * An admin can view any {{snakeCase modelName}}
     */
    public function an_admin_can_view_any_{{snakeCase modelName}}()
    {
        $this->loginAsAdmin();

        $this->assertCanViewAny({{pascalCase modelName}}::class);
    }
    {{else}}
    /**
     * @test
     * An admin cannot view any {{snakeCase modelName}}
     */
    public function an_admin_cannot_view_any_{{snakeCase modelName}}()
    {
        $this->loginAsAdmin();

        $this->assertCannotViewAny({{pascalCase modelName}}::class);
    }
    {{/if}}

    {{#if adminAccess.read}}
    /**
     * @test
     * An admin can view a {{snakeCase modelName}}
     */
    public function an_admin_can_view_a_{{snakeCase modelName}}()
    {
        $this->loginAsAdmin();

        $this->assertCanView({{pascalCase modelName}}::class);
    }
    {{else}}
    /**
     * @test
     * An admin cannot view a {{snakeCase modelName}}
     */
    public function an_admin_cannot_view_a_{{snakeCase modelName}}()
    {
        $this->loginAsAdmin();

        $this->assertCannotView({{pascalCase modelName}}::class);
    }
    {{/if}}

    {{#if adminAccess.update}}
    /**
     * @test
     * An admin can update a {{snakeCase modelName}}
     */
    public function an_admin_can_update_a_{{snakeCase modelName}}()
    {
        $this->loginAsAdmin();

        $this->assertCanUpdate({{pascalCase modelName}}::class);
    }
    {{else}}
    /**
     * @test
     * An admin cannot update a {{snakeCase modelName}}
     */
    public function an_admin_cannot_update_a_{{snakeCase modelName}}()
    {
        $this->loginAsAdmin();

        $this->assertCannotUpdate({{pascalCase modelName}}::class);
    }
    {{/if}}

    {{#if adminAccess.delete}}
    /**
     * @test
     * An admin can delete a {{snakeCase modelName}}
     */
    public function an_admin_can_delete_a_{{snakeCase modelName}}()
    {
        $this->loginAsAdmin();

        $this->assertCanDelete({{pascalCase modelName}}::class);
    }
    {{else}}
    /**
     * @test
     * An admin cannot delete a {{snakeCase modelName}}
     */
    public function an_admin_cannot_delete_a_{{snakeCase modelName}}()
    {
        $this->loginAsAdmin();

        $this->assertCannotDelete({{pascalCase modelName}}::class);
    }
    {{/if}}

    {{#unless clientAccess}}
    /**
     * @test
     * A client has no access to the {{snakeCase modelNamePlural}} api
     */
    public function a_client_has_no_access_to_the_{{snakeCase modelNamePlural}}_api()
    {
        $this->loginAsClient();

        $this->assertResourceAccessUnauthorized({{pascalCase modelName}}::class);
    }
    {{/unless}}
    {{#if clientAccess}}
    
    {{#if clientAccess.create}}
    /**
     * @test
     * A client can create a {{snakeCase modelName}}
     */
    public function a_client_can_create_a_{{snakeCase modelName}}()
    {
        $this->loginAsClient();

        $this->assertCanCreate({{pascalCase modelName}}::class);
    }
    {{else}}
    /**
     * @test
     * A client cannot create a {{snakeCase modelName}}
     */
    public function a_client_cannot_create_a_{{snakeCase modelName}}()
    {
        $this->loginAsClient();

        $this->assertCannotCreate({{pascalCase modelName}}::class);
    }
    {{/if}}
    {{#if clientAccess.index}}
    /**
     * @test
     * A client can view any {{snakeCase modelName}}
     */
    public function a_client_can_view_any_{{snakeCase modelName}}()
    {
        $this->loginAsClient();

        $this->assertCanViewAny({{pascalCase modelName}}::class);
    }
    {{else}}
    /**
     * @test
     * A client cannot view any {{snakeCase modelName}}
     */
    public function a_client_cannot_view_any_{{snakeCase modelName}}()
    {
        $this->loginAsClient();

        $this->assertCannotViewAny({{pascalCase modelName}}::class);
    }
    {{/if}}

    {{#if clientAccess.read}}
    /**
     * @test
     * A client can view a {{snakeCase modelName}}
     */
    public function a_client_can_view_a_{{snakeCase modelName}}()
    {
        $this->loginAsClient();

        $this->assertCanView({{pascalCase modelName}}::class);
    }
    {{else}}
    /**
     * @test
     * A client cannot view a {{snakeCase modelName}}
     */
    public function a_client_cannot_view_a_{{snakeCase modelName}}()
    {
        $this->loginAsClient();

        $this->assertCannotView({{pascalCase modelName}}::class);
    }
    {{/if}}

    /**
     * @test
     * A client cannot update a {{snakeCase modelName}}
     */
    public function a_client_cannot_update_a_{{snakeCase modelName}}()
    {
        $this->loginAsClient();

        $this->assertCannotUpdate({{pascalCase modelName}}::class);
    }

    /**
     * @test
     * A client cannot delete a {{snakeCase modelName}}
     */
    public function a_client_cannot_delete_a_{{snakeCase modelName}}()
    {
        $this->loginAsClient();

        $this->assertCannotDelete({{pascalCase modelName}}::class);
    }
    {{/if}}
}