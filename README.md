# uiogaming.no

Dette er repoet for UiO Gaming sin nettside. Nettsiden består av to deler. Her finner du frontend for nettsiden. Repoet for CMSet er [her](https://github.com/UiO-Gaming/uiogaming.no-backend).

## Oppsett

1. Lag konfigurasjonsfil

I repoet er det en fil som heter [env.example](env.example). Kopier denne og sett navnet på den nye filen til `.env`.

Fyll så ut verdiene.

2. Installer avhengigheter

```bash
npm install
```

3. Bygg nettsiden

```bash
npm run build
```

4. Kjør nettsiden

```bash
npm start
```

Om du skal utvikle kan du kjøre følgende istedenfor steg 3 og 4

```bash
npm run dev
```

### Webhook API

Om du vil at innhold skal oppdatere seg når innholdet endres i backend må du kjøre dette APIet. Dette gjelder bare om du kjører en produksjonsversjon av nettsiden

Du må spesifisere URL for webhook i Sanity sitt dashbord. URLen dette webhooket skal peke på er `https://uiogaming.no/api/revalidate` med _POST_ forespørselstype.

Du kan lese mer om det [her](https://www.sanity.io/docs/webhooks).

## Vil du bidra?

Ta gjerne kontakt eller send inn en PR om du vil forbedre nettsiden.

Sjekk også ut [bidgragsguiden](CONTRIBUTING.md) vår før du sender noe som helst inn.
