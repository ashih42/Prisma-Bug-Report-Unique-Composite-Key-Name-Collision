# Prisma Bug Report Example Repo

https://github.com/prisma/prisma/issues/4296

## Instruction

Set up database.

```
yarn setup-db
```

Run the example in `scripts/ex01.ts`:

```
yarn ex01
```

It produces this error:

```
TSError: ⨯ Unable to compile TypeScript:
scripts/ex01.ts:19:9 - error TS2322: Type 'string' is not assignable to type 'number'.

19         api_id: "asdf",
           ~~~~~~

  node_modules/.prisma/client/index.d.ts:2130:3
    2130   api_id: number
           ~~~~~~
    The expected type comes from property 'api_id' which is declared here on type 'Api_idWorkspace_idCompoundUniqueInput'
```

This can be traced to these lines in the generated `index.d.ts`:

```
export type Api_idWorkspace_idCompoundUniqueInput = {
  api_id: number
  workspace_id: string
}
```

## Analysis

The problem is name collision of the intermediate variable `api_id_workspace_id` common to both `Cat` and `Dog`.

In `prisma/schema.prisma`, we defined `Cat` with a unique composite key combining fields `api_id` **_(Int)_** and `workspace_id` (String). We also defined `Dog` with a unique composite key combining fields `api_id` **_(String)_** and `workspace_id` (String).

Both of these composite keys were generated with the same name `Api_idWorkspace_idCompoundUniqueInput`, so only one was created (the `Cat` version where `api_id` is `number`), and the other (the `Dog` version where `api_id` is `string`) was silently dropped.. As a result, `Dog`'s `api_id_workspace_id` incorrectly resolves to the wrong type.
