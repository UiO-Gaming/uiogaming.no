# uiogaming.no

<img width="1280" height="720" alt="image" src="https://github.com/user-attachments/assets/574daf4d-085c-4df0-ab86-7f843a1a403c" />

<br>
<br>

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

Om du vil at innhold skal oppdatere seg når innholdet endres i backend må du kjøre dette APIet. Det kjører automatisk når du starter applikasjonen.

MEN

Du må sette opp et webhook i [Sanity sitt dashbord](https://www.sanity.io/manage) under _API → Webhooks_:

- **URL:** `https://uiogaming.no/api/revalidate`
- **HTTP method:** POST
- **Projection:** Må minst inneholde `_type` og `slug`, f.eks `{_type, slug}`
- **Secret:** Samme verdi som `SANITY_REVALIDATE_SECRET` i `.env`

Sanity bruker _Secret_ til å signere hver forespørsel med headeren `sanity-webhook-signature`, og APIet avviser forespørsler uten gyldig signatur med `401`. Hemmeligheten skal altså ligge i _Secret_-feltet, ikke i URLen.

Webhooket oppdaterer blogginnlegg, arrangementer og forfattere med en gang. Annet innhold oppdateres først når cachen går ut (opptil en time).

Du kan lese mer om webhooks [her](https://www.sanity.io/docs/webhooks).

## Vil du bidra?

Ta gjerne kontakt eller send inn en PR om du vil forbedre nettsiden.

Sjekk også ut [bidgragsguiden](CONTRIBUTING.md) vår før du sender noe som helst inn.
