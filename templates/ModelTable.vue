<template>
  <QTable
    :data="{{camelCase model_pluralized}}"
    :columns="columns"
    title="{{titleCase model_pluralized}}"
    separator="cell"
    :pagination.sync="pagination"
    :rows-per-page-options="[0]"
    hide-bottom
    dense
  >
    <QTr
      slot="body"
      slot-scope="props"
      :props="props"
    >
      {{#each fields}}
      <!-- {{titleCase this.field}} -->
      {{#if this.isTimestamp}}
      <QTd key="{{this.field}}">
        <UpdateDatetimePopupEdit
          :model="props.row"
          field="{{this.field}}"
          hide-underline
        />
      </QTd>
      {{else}}
      <QTd key="{{this.field}}">
        <UpdateModelFieldInput
          :model="props.row"
          field="{{this.field}}"
          hide-underline
        />
      </QTd>
      {{/if}}

      {{/each}}
      <!-- Delete -->
      <QTd key="delete" class="text-center">
        <DeleteModelButton
          :model="props.row"
          round flat icon="mdi-delete" color="grey-8"
        />
      </QTd>
    </QTr>

    <!-- Create {{titleCase model}} -->
    <QTr slot="bottom-row" slot-scope="props">
      <QTd colspan="100%" class="text-center">
        <OnClickCreate{{properCase model}}
          @creating="creating_{{snakeCase model}} = true"
          @created="handle{{properCase model}}Created"
          class="row justify-center"
        >
          <QBtn
            icon="mdi-plus"
            size="lg"
            class="q-ma-sm"
            :loading="creating_{{snakeCase model}}"
          />
        </OnClickCreate{{properCase model}}>
      </QTd>
    </QTr>
  </QTable>
</template>

<script>
import DeleteModelButton from 'components/DeleteModelButton.vue'
import {{properCase model}} from 'classes/{{properCase model}}'
import UpdateModelFieldInput from 'components/UpdateModelFieldInput.vue'
import UpdateDatetimePopupEdit from 'components/UpdateDatetimePopupEdit.vue'
import OnClickCreate{{properCase model}} from 'components/OnClickCreate{{properCase model}}.vue'

export default {
  props: {
    {{camelCase model_pluralized}}: {
      required: true,
      type: Array,
    }
  },

  components: {
    DeleteModelButton,
    UpdateModelFieldInput,
    UpdateDatetimePopupEdit,
    OnClickCreate{{properCase model}},
  },

  computed: {
    columns() {
      return [
        {{#each fields}}
        {
          label: '{{sentenceCase this.field}}',
          field: '{{this.field}}',
          name: '{{this.field}}',
          align: 'left'
        },
        {{/each}}
        {
          label: 'Delete',
          name: 'delete',
          align: 'center',
          field: 'delete',
        },
      ]
    }
  },

  methods: {
    handle{{properCase model}}Created(response) {
      this.creating_{{snakeCase model}} = false
    }
  },

  data () {
    return {
      pagination: {
        rowsPerPage: 0
      },

      creating_{{snakeCase model}}: false,
    }
  }
}
</script>