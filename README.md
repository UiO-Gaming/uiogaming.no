# uiogaming.no

Dette er repoet for UiO Gaming sin nettside. Nettsiden består av tre deler hvorav to av disse er i dette repoet. Her finner du frontend for nettsiden samt et webhook API. Dette APIet brukes til å trigge bygging av nettsiden når innhold endrer seg i CMS, backenden. Repoet for dette CMSet er [her](https://github.com/UiO-Gaming/uiogaming.no-backend). Nettsiden er bygget med GatsbyJS.

## Oppsett

### Frontend

1. Installer avhengigheter

```bash
yarn install
```

2. Kjør nettsiden

```bash
yarn start
```

### Webhook API

Om du vil at innhold skal oppdatere seg når innholdet endres i backend må du kjøre dette APIet. Dette gjelder bare om du bruker en produksjonsversjon av nettsiden (`yarn serve`)

```bash
cd webhook-api
yarn install
yarn start
```

Du må også spesifisere URL for webhook i Sanity sitt dashbord. Du kan lese mer om det [her](https://www.sanity.io/docs/webhooks). Denne URLen skal peke på APIet ditt.

### Docker

Docker er for øyeblikket ikke støttet, men vil støttes fremtiden.

## Vil du bidra?

Ta gjerne kontakt eller send inn en PR om du vil forbedre nettsiden.
