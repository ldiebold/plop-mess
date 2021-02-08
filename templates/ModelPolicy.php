<?php

namespace App\Policies;

use App\\{{pascalCase modelName}};
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class {{pascalCase modelName}}Policy
{
    use HandlesAuthorization;

    {{#if adminFullAccess}}
    /**
     * Admins have full access of a {{sentenceCase modelName}}
     *
     * @param [type] $user
     * @param [type] $ability
     * @return void
     */
    public function before($user, $ability)
    {
        if($user->isAdmin()) {
            return true;
        };
    }
    
    {{/if}}
    /**
     * Determine whether the user can view any {{sentenceCase modelNamePlural}}.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        {{#if clientAccess.index}}
        return true;
        {{else}}
        return false;
        {{/if}}
    }

    /**
     * Determine whether the user can view the {{sentenceCase modelName}}.
     *
     * @param  \App\User  $user
     * @param  \App\{{pascalCase modelName}}  ${{camelCase modelName}}
     * @return mixed
     */
    public function view(User $user, {{pascalCase modelName}} ${{camelCase modelName}})
    {
        {{#if clientAccess.read}}
        return true;
        {{else}}
        return false;
        {{/if}}
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return false;
    }

    /**
     * Determine whether the user can update the {{sentenceCase modelName}}.
     *
     * @param  \App\User  $user
     * @param  \App\{{pascalCase modelName}}  ${{camelCase modelName}}
     * @return mixed
     */
    public function update(User $user, {{pascalCase modelName}} ${{camelCase modelName}})
    {
        return false;
    }

    /**
     * Determine whether the user can delete the {{sentenceCase modelName}}.
     *
     * @param  \App\User  $user
     * @param  \App\{{pascalCase modelName}}  ${{camelCase modelName}}
     * @return mixed
     */
    public function delete(User $user, {{pascalCase modelName}} ${{camelCase modelName}})
    {
        return false;
    }

    /**
     * Determine whether the user can restore the {{sentenceCase modelName}}.
     *
     * @param  \App\User  $user
     * @param  \App\{{pascalCase modelName}}  ${{camelCase modelName}}
     * @return mixed
     */
    public function restore(User $user, {{pascalCase modelName}} ${{camelCase modelName}})
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the {{sentenceCase modelName}}.
     *
     * @param  \App\User  $user
     * @param  \App\{{pascalCase modelName}}  ${{camelCase modelName}}
     * @return mixed
     */
    public function forceDelete(User $user, {{pascalCase modelName}} ${{camelCase modelName}})
    {
        return false;
    }
}
